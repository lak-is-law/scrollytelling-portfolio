"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll } from "framer-motion";

const FRAME_COUNT = 300;
const CRITICAL_FRAME_COUNT = 15; // Unlocks instant interaction after 15 keyframes (~1.1MB)
const CACHE_WINDOW_BACK = 15;
const CACHE_WINDOW_FWD = 30;
const CACHE_BOUNDS = 45; // Evict outside of +/- 45 frames

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

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }

    const currentFrame = lastDrawnFrameRef.current >= 0 
      ? lastDrawnFrameRef.current 
      : Math.min(FRAME_COUNT - 1, Math.floor(scrollYProgress.get() * FRAME_COUNT));
    
    drawFrame(currentFrame);
  }, [scrollYProgress, drawFrame]);

  // Unified Progressive Chunk Loader and RAF Scheduler
  useEffect(() => {
    let isCancelled = false;
    let animationId: number;
    let loadedCount = 0;

    const loadSingleImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        if (imagesRef.current[index]) {
          return resolve(imagesRef.current[index] as HTMLImageElement);
        }
        
        const img = new Image();
        img.src = getFramePath(index);
        imagesRef.current[index] = img;
        
        img.decode().then(() => {
          if (!isCancelled) {
            loadedCount++;
            if (!isCriticalReady) {
               setLoadPercent(Math.min(100, Math.round((loadedCount / CRITICAL_FRAME_COUNT) * 100)));
            }
          }
          resolve(img);
        }).catch(() => {
          if (!isCancelled && img.complete) {
            loadedCount++;
          }
          resolve(img);
        });
      });
    };

    const loadCriticalKeyframes = async () => {
      const criticalPromises: Promise<HTMLImageElement>[] = [];
      for (let i = 0; i < CRITICAL_FRAME_COUNT; i++) {
        criticalPromises.push(loadSingleImage(i));
      }
      
      await Promise.all(criticalPromises);
      if (isCancelled) return;

      setIsCriticalReady(true);
      setLoadPercent(100);
      updateCanvasSize();
      drawFrame(0);

      // Start the scroll-aware dynamic RAF loop
      startDynamicLoop();
    };

    const startDynamicLoop = () => {
      const loop = () => {
        if (isCancelled) return;
        
        // 1. Calculate Target Frame directly from motion value to avoid React state
        const target = Math.min(FRAME_COUNT - 1, Math.floor(scrollYProgress.get() * FRAME_COUNT));
        
        // 2. Proactive Fetching (bounded window)
        const fetchStart = Math.max(0, target - CACHE_WINDOW_BACK);
        const fetchEnd = Math.min(FRAME_COUNT - 1, target + CACHE_WINDOW_FWD);
        
        for (let i = fetchStart; i <= fetchEnd; i++) {
          if (!imagesRef.current[i]) {
            loadSingleImage(i);
          }
        }
        
        // 3. Garbage Collect old frames (memory bounding)
        for (let i = 0; i < FRAME_COUNT; i++) {
          if (imagesRef.current[i] && Math.abs(i - target) > CACHE_BOUNDS) {
            // Explicitly release memory
            imagesRef.current[i]!.src = "";
            imagesRef.current[i] = null;
          }
        }

        // 4. Render
        if (target !== lastDrawnFrameRef.current) {
           drawFrame(target);
        }

        animationId = requestAnimationFrame(loop);
      };
      animationId = requestAnimationFrame(loop);
    };

    loadCriticalKeyframes();

    return () => {
      isCancelled = true;
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [updateCanvasSize, drawFrame, scrollYProgress, isCriticalReady]);

  // Window Resize Listener with Debounce
  useEffect(() => {
    updateCanvasSize();
    
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateCanvasSize, 100); // slightly longer debounce
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateCanvasSize]);

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
