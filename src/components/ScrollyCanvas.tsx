"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 240;

const getFramePath = (index: number) => {
  return `/sequence/frame_${String(index).padStart(3, "0")}_delay-0.041s.webp`;
};

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const drawImage = useCallback((frameIndex: number) => {
    if (!canvasRef.current || !images[frameIndex]) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = images[frameIndex];
    if (!img.complete) return; // ensure it's fully loaded before drawing
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Object-fit: cover logic
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = img.width * (drawHeight / img.height);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = img.height * (drawWidth / img.width);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [images]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );
    // Use requestAnimationFrame for smooth execution
    requestAnimationFrame(() => drawImage(frameIndex));
  });

  // Initial draw and handle resize
  useEffect(() => {
    if (imagesLoaded > 0) {
      drawImage(0);
    }
    
    const handleResize = () => drawImage(Math.floor(scrollYProgress.get() * FRAME_COUNT));
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, scrollYProgress, drawImage]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        {imagesLoaded < FRAME_COUNT && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#121212]">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white/100" />
              <p className="text-sm uppercase tracking-widest text-white/50 font-light">Loading Experience {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%</p>
            </div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
        />
        {/* Cinematic vignette to elegantly obscure the watermark at the bottom */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
