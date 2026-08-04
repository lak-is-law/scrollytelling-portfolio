"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 300;
const CRITICAL_FRAME_COUNT = 15; // Unlocks instant interaction after 15 keyframes (~1.1MB)
const CHUNK_SIZE = 20; // Stream remaining frames in background idle chunks

const getFramePath = (index: number) => {
  return `/sequence/frame_${String(index).padStart(3, "0")}_delay-0.033s.webp`;
};

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const [isCriticalReady, setIsCriticalReady] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);
  
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const canvasDimensionsRef = useRef<{ width: number; height: number; dpr: number }>({
    width: 0,
    height: 0,
    dpr: 1
  });

  // Find nearest loaded frame if user fast-scrolls before background stream completes
  const getNearestLoadedFrame = useCallback((targetIndex: number): HTMLImageElement | null => {
    const list = imagesRef.current;
    if (list[targetIndex]?.complete) {
      return list[targetIndex];
    }
    // Search outwards for closest loaded frame
    for (let offset = 1; offset < FRAME_COUNT; offset++) {
      const left = targetIndex - offset;
      const right = targetIndex + offset;
      if (left >= 0 && list[left]?.complete) return list[left];
      if (right < FRAME_COUNT && list[right]?.complete) return list[right];
    }
    return null;
  }, []);

  // Optimized draw function with DPR scaling and object-fit: cover math
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    const img = getNearestLoadedFrame(frameIndex);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { width, height } = canvasDimensionsRef.current;
    if (width === 0 || height === 0) return;

    // Object-fit: cover logic based on logical CSS dimensions
    const canvasRatio = width / height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (imgRatio > canvasRatio) {
      drawHeight = height;
      drawWidth = img.naturalWidth * (drawHeight / img.naturalHeight);
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = width;
      drawHeight = img.naturalHeight * (drawWidth / img.naturalWidth);
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastDrawnFrameRef.current = frameIndex;
  }, [getNearestLoadedFrame]);

  // Handle Resize and configure high-DPI backing buffer
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for mobile efficiency

    canvasDimensionsRef.current = { width, height, dpr };

    // Backing store buffer (physical pixels)
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    // CSS display size (logical pixels)
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }

    // Redraw current frame with new dimensions
    const currentFrame = lastDrawnFrameRef.current >= 0 
      ? lastDrawnFrameRef.current 
      : Math.min(FRAME_COUNT - 1, Math.floor(scrollYProgress.get() * FRAME_COUNT));
    
    drawFrame(currentFrame);
  }, [scrollYProgress, drawFrame]);

  // Progressive Chunk Loader Engine
  useEffect(() => {
    let isCancelled = false;
    let totalLoaded = 0;

    const loadSingleImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
            totalLoaded++;
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(img); // Graceful recovery
        };
      });
    };

    // Phase 1: Critical Keyframes (First 15 frames)
    const loadCriticalKeyframes = async () => {
      const criticalPromises: Promise<HTMLImageElement>[] = [];
      for (let i = 0; i < CRITICAL_FRAME_COUNT; i++) {
        criticalPromises.push(loadSingleImage(i));
      }
      
      await Promise.all(criticalPromises);
      if (isCancelled) return;

      setIsCriticalReady(true);
      setLoadPercent(Math.round((CRITICAL_FRAME_COUNT / FRAME_COUNT) * 100));
      updateCanvasSize();
      drawFrame(0);

      // Phase 2: Stream remaining frames in idle background chunks
      streamRemainingChunks(CRITICAL_FRAME_COUNT);
    };

    const streamRemainingChunks = (startIndex: number) => {
      if (isCancelled || startIndex >= FRAME_COUNT) {
        if (!isCancelled) setLoadPercent(100);
        return;
      }

      const scheduleNext = typeof window !== "undefined" && "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 20);

      scheduleNext(async () => {
        if (isCancelled) return;
        
        const endIndex = Math.min(FRAME_COUNT, startIndex + CHUNK_SIZE);
        const chunkPromises: Promise<HTMLImageElement>[] = [];
        
        for (let i = startIndex; i < endIndex; i++) {
          chunkPromises.push(loadSingleImage(i));
        }

        await Promise.all(chunkPromises);
        if (isCancelled) return;

        // Throttled percentage update
        const percent = Math.min(100, Math.round((totalLoaded / FRAME_COUNT) * 100));
        setLoadPercent(percent);

        // Schedule next chunk
        streamRemainingChunks(endIndex);
      });
    };

    loadCriticalKeyframes();

    return () => {
      isCancelled = true;
    };
  }, [updateCanvasSize, drawFrame]);

  // Window Resize Listener with Debounce
  useEffect(() => {
    updateCanvasSize();
    
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateCanvasSize, 50);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateCanvasSize]);

  // 60 FPS Framer Motion Scroll Integration with RAF Cancellation
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );

    if (frameIndex === lastDrawnFrameRef.current) return;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      drawFrame(frameIndex);
      rafIdRef.current = null;
    });
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full" aria-hidden="true">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#07090e]">
        {/* Instant Non-Blocking Boot Splash */}
        {!isCriticalReady && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#07090e]">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400" />
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-mono">
                Initializing Experience {loadPercent}%
              </p>
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full pointer-events-none"
        />

        {/* Cinematic ambient depth gradient */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#07090e] via-[#07090e]/60 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
