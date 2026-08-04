"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { arcadeAudio } from "@/utils/arcadeAudio";

const ONBOARDING_DISMISSED_KEY = "lakshya_scroll_onboarding_dismissed";

export default function ScrollOnboardingOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Helper to check if already dismissed anywhere in this tab / session
    const isAlreadyDismissed = () => {
      try {
        if (sessionStorage.getItem(ONBOARDING_DISMISSED_KEY) === "true") return true;
      } catch {}
      if ((window as unknown as { __onboardingDismissed?: boolean }).__onboardingDismissed) return true;
      if (window.scrollY > 5) return true;
      return false;
    };

    // 1. If already dismissed in this session or page is loaded while scrolled down, never show
    if (isAlreadyDismissed()) {
      try {
        sessionStorage.setItem(ONBOARDING_DISMISSED_KEY, "true");
      } catch {}
      (window as unknown as { __onboardingDismissed?: boolean }).__onboardingDismissed = true;
      return;
    }

    let timer: NodeJS.Timeout | null = null;

    // 2. Dismiss immediately on any interaction and persist to sessionStorage & window
    const dismiss = () => {
      try {
        sessionStorage.setItem(ONBOARDING_DISMISSED_KEY, "true");
      } catch {}
      (window as unknown as { __onboardingDismissed?: boolean }).__onboardingDismissed = true;
      setIsVisible(false);
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      removeListeners();
    };

    const handleScroll = () => {
      if (window.scrollY > 5) {
        dismiss();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 2 || Math.abs(e.deltaX) > 2) {
        dismiss();
      }
    };

    const handleTouchMove = () => {
      dismiss();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space", " ", "Home", "End"];
      if (scrollKeys.includes(e.key)) {
        dismiss();
      }
    };

    const removeListeners = () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };

    // Attach listeners immediately
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown, { passive: true });

    // Delayed reveal after initial hero title animation ONLY if user hasn't scrolled
    timer = setTimeout(() => {
      if (!isAlreadyDismissed() && window.scrollY <= 5) {
        setIsVisible(true);
      } else {
        dismiss();
      }
    }, 700);

    // On full page unload / refresh, clear the session storage flag so next fresh page load can show it if at top
    const handleBeforeUnload = () => {
      try {
        sessionStorage.removeItem(ONBOARDING_DISMISSED_KEY);
      } catch {}
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      if (timer) clearTimeout(timer);
      removeListeners();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleClickToScroll = () => {
    arcadeAudio.playClick();
    try {
      sessionStorage.setItem(ONBOARDING_DISMISSED_KEY, "true");
    } catch {}
    (window as unknown as { __onboardingDismissed?: boolean }).__onboardingDismissed = true;
    setIsVisible(false);
    window.scrollBy({ top: window.innerHeight * 0.6, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* 1. Ambient Tinted Translucent Glass Backdrop Vignette */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 z-20 pointer-events-none select-none bg-gradient-to-t from-black/70 via-black/25 to-black/40 backdrop-blur-[2px]"
            aria-hidden="true"
          >
            {/* Ambient Radial Spotlight Bloom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/[0.06] rounded-full blur-[120px] pointer-events-none" />
          </motion.div>

          {/* 2. Floating VisionOS Onboarding Pill */}
          <div 
            className="fixed bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none"
            aria-hidden={!isVisible}
          >
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 32, scale: 0.92, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={handleClickToScroll}
              onMouseEnter={() => arcadeAudio.playHover()}
              className="group pointer-events-auto cursor-pointer relative flex flex-col items-center gap-3 px-6 py-3.5 rounded-full bg-zinc-950/80 backdrop-blur-2xl border border-white/15 hover:border-cyan-400/50 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.8),0_0_30px_-5px_rgba(56,189,248,0.25)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.9),0_0_35px_rgba(56,189,248,0.45)] transition-all duration-500 overflow-hidden"
            >
              {/* Top Specular Shimmer Beam */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              {/* Subtle Hover Light Sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none" />

              {/* Onboarding Text & Pulsing Status Node */}
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
                </span>
                
                <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.25em] text-zinc-300 group-hover:text-white uppercase transition-colors">
                  Scroll Down to Experience
                </span>
              </div>

              {/* Apple-grade Kinetic Glowing Scroll Indicator */}
              <div className="relative w-5 h-8 rounded-full border border-white/25 group-hover:border-cyan-400/60 transition-colors flex items-start justify-center p-1 bg-black/40 shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]">
                {/* Laser Guide Center Track */}
                <div className="absolute top-1.5 bottom-1.5 w-[1px] bg-gradient-to-b from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 pointer-events-none" />

                {/* 60 FPS Flowing Liquid Light Capsule */}
                <motion.div
                  animate={{
                    y: [0, 14, 0],
                    opacity: [0.4, 1, 0.4],
                    scaleY: [1, 1.35, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-1.5 h-2.5 rounded-full bg-gradient-to-b from-cyan-300 to-cyan-500 shadow-[0_0_10px_#22d3ee] z-10"
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
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
