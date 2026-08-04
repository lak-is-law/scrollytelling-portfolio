"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { arcadeAudio } from "@/utils/arcadeAudio";

export default function ScrollOnboardingOverlay() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth 60 FPS fade out as user scrolls (visible at top, fades out completely by 100px)
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const y = useTransform(scrollY, [0, 100], [0, 20]);
  const backdropOpacity = useTransform(scrollY, [0, 90], [1, 0]);
  const pointerEvents = useTransform<number, "auto" | "none">(scrollY, (v) => (v < 25 ? "auto" : "none"));

  if (!mounted) return null;

  const handleClickToScroll = () => {
    arcadeAudio.playClick();
    window.scrollBy({ top: window.innerHeight * 0.7, behavior: "smooth" });
  };

  return (
    <>
      {/* 1. Ambient Tinted Translucent Glass Backdrop Vignette (Starting Overlay) */}
      <motion.div
        style={{ opacity: backdropOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-20 pointer-events-none select-none bg-gradient-to-t from-black/85 via-black/40 to-black/50 backdrop-blur-[3px]"
        aria-hidden="true"
      >
        {/* Ambient Radial Spotlight Bloom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[400px] bg-cyan-500/[0.09] rounded-full blur-[140px] pointer-events-none" />
      </motion.div>

      {/* 2. Absolute Bottom Center Container across Laptop, iPad, and Phone */}
      <div 
        className="fixed bottom-6 sm:bottom-8 left-0 right-0 w-full flex items-center justify-center pointer-events-none z-30 px-4 select-none"
        style={{ margin: "0 auto" }}
      >
        <motion.div 
          style={{ opacity, y, pointerEvents }}
          initial={{ opacity: 0, y: 32, scale: 0.92, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex flex-col items-center justify-center"
        >
          <div
            role="button"
            tabIndex={0}
            onClick={handleClickToScroll}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClickToScroll();
              }
            }}
            onMouseEnter={() => arcadeAudio.playHover()}
            className="group cursor-pointer relative flex flex-col items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-zinc-950/85 backdrop-blur-2xl border border-white/20 hover:border-cyan-400/60 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.85),0_0_30px_-5px_rgba(56,189,248,0.3)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.95),0_0_35px_rgba(56,189,248,0.5)] transition-all duration-500 overflow-hidden text-center"
          >
            {/* Top Specular Shimmer Beam */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

            {/* Subtle Hover Light Sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none" />

            {/* Onboarding Text & Pulsing Status Node */}
            <div className="flex items-center justify-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
              </span>
              
              <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.22em] text-zinc-300 group-hover:text-white uppercase transition-colors whitespace-nowrap">
                Scroll to Experience
              </span>
            </div>

            {/* Apple-grade Kinetic Glowing Scroll Indicator */}
            <div className="relative w-5 h-7 rounded-full border border-white/25 group-hover:border-cyan-400/60 transition-colors flex items-start justify-center p-1 bg-black/40 shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]">
              {/* Laser Guide Center Track */}
              <div className="absolute top-1 bottom-1 w-[1px] bg-gradient-to-b from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 pointer-events-none" />

              {/* 60 FPS Flowing Liquid Light Capsule */}
              <motion.div
                animate={{
                  y: [0, 12, 0],
                  opacity: [0.4, 1, 0.4],
                  scaleY: [1, 1.35, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-2 rounded-full bg-gradient-to-b from-cyan-300 to-cyan-500 shadow-[0_0_10px_#22d3ee] z-10"
              />

              {/* Radiating Micro Ambient Glow at Base */}
              <motion.div
                animate={{
                  scale: [0.8, 1.4, 0.8],
                  opacity: [0.2, 0.7, 0.2],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-1 w-2 h-2 rounded-full bg-cyan-400/40 blur-[2px] pointer-events-none"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
