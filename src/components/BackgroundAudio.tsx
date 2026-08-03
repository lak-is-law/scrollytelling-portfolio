"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const TARGET_VOLUME = 0.18; // Subtle 18% volume for an elegant, non-distracting background ambiance
const FADE_IN_DURATION = 2000; // 2.0s smooth fade-in
const FADE_OUT_DURATION = 800; // 800ms graceful fade-out

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const fadeAnimationRef = useRef<number | null>(null);
  const hasUserInteracted = useRef(false);
  const isMutedRef = useRef(false);

  const clearFade = () => {
    if (fadeAnimationRef.current !== null) {
      cancelAnimationFrame(fadeAnimationRef.current);
      fadeAnimationRef.current = null;
    }
  };

  const fadeTo = useCallback((targetVol: number, duration: number, onComplete?: () => void) => {
    if (!audioRef.current) return;
    clearFade();

    const audio = audioRef.current;
    const startVol = audio.volume;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth cubic easing curve
      const eased = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentVol = startVol + (targetVol - startVol) * Math.max(0, Math.min(1, eased));
      audio.volume = Math.max(0, Math.min(1, currentVol));

      if (progress < 1) {
        fadeAnimationRef.current = requestAnimationFrame(step);
      } else {
        audio.volume = targetVol;
        fadeAnimationRef.current = null;
        if (onComplete) onComplete();
      }
    };

    fadeAnimationRef.current = requestAnimationFrame(step);
  }, []);

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.muted = false;
      audio.volume = 0;
      await audio.play();
      setIsPlaying(true);
      hasUserInteracted.current = true;
      if (!isMutedRef.current) {
        fadeTo(TARGET_VOLUME, FADE_IN_DURATION);
      }
    } catch {
      // Autoplay blocked by browser policy until next interaction
    }
  }, [fadeTo]);

  // Robust gesture listeners for mobile Safari & desktop browsers
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasUserInteracted.current) {
        startPlayback();
      }
    };

    window.addEventListener("click", handleInteraction, { capture: true, passive: true });
    window.addEventListener("touchstart", handleInteraction, { capture: true, passive: true });
    window.addEventListener("touchend", handleInteraction, { capture: true, passive: true });
    window.addEventListener("pointerdown", handleInteraction, { capture: true, passive: true });
    window.addEventListener("keydown", handleInteraction, { capture: true, passive: true });

    // Initial attempt in case autoplay is permitted
    startPlayback();

    return () => {
      window.removeEventListener("click", handleInteraction, { capture: true });
      window.removeEventListener("touchstart", handleInteraction, { capture: true });
      window.removeEventListener("touchend", handleInteraction, { capture: true });
      window.removeEventListener("pointerdown", handleInteraction, { capture: true });
      window.removeEventListener("keydown", handleInteraction, { capture: true });
    };
  }, [startPlayback]);

  // Graceful fade out on tab switch / window blur / page leave, and fade in on return
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio || !hasUserInteracted.current || isMutedRef.current) return;

      if (document.hidden) {
        fadeTo(0, FADE_OUT_DURATION, () => {
          audio.pause();
        });
      } else {
        audio.play().then(() => {
          fadeTo(TARGET_VOLUME, 1200);
        }).catch(() => {});
      }
    };

    const handlePageHide = () => {
      const audio = audioRef.current;
      if (!audio) return;
      fadeTo(0, 400, () => {
        audio.pause();
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
      clearFade();
    };
  }, [fadeTo]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasUserInteracted.current || audio.paused) {
      hasUserInteracted.current = true;
      setIsMuted(false);
      isMutedRef.current = false;
      audio.muted = false;
      audio.play().then(() => {
        setIsPlaying(true);
        fadeTo(TARGET_VOLUME, 1000);
      }).catch(() => {});
      return;
    }

    if (isMuted) {
      setIsMuted(false);
      isMutedRef.current = false;
      audio.muted = false;
      fadeTo(TARGET_VOLUME, 1000);
    } else {
      setIsMuted(true);
      isMutedRef.current = true;
      fadeTo(0, 400, () => {
        if (audioRef.current) {
          audioRef.current.muted = true;
        }
      });
    }
  };

  const isAudioActive = isPlaying && !isMuted;

  return (
    <>
      <audio 
        ref={audioRef}
        src="/audio/joyinsound-training-for-success-music-500270.mp3" 
        preload="auto"
        loop
      />
      
      {/* Audio Visualizer & Mute Toggle — Positioned at bottom right */}
      <motion.button
        type="button"
        onClick={toggleMute}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center justify-center gap-1 w-11 h-11 rounded-full bg-zinc-950/80 border border-white/15 backdrop-blur-xl cursor-pointer hover:bg-zinc-900 hover:border-emerald-400/50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] focus:outline-none"
        title={isAudioActive ? "Mute Background Music" : "Play Background Music"}
        aria-label={isAudioActive ? "Mute Background Music" : "Play Background Music"}
      >
        {isAudioActive ? (
          <div className="flex items-center justify-center gap-0.5 h-4">
            {[0.6, 1, 0.4, 0.8].map((scale, i) => (
              <motion.span
                key={i}
                className="w-0.5 bg-emerald-400 rounded-full"
                animate={{
                  height: ["4px", `${Math.round(16 * scale)}px`, "4px"],
                }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-400"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </motion.button>
    </>
  );
}
