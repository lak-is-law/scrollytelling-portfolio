"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const TARGET_VOLUME = 0.18; // Subtle 18% ambient volume
const FADE_IN_DURATION = 1500; // 1.5s smooth fade-in
const FADE_OUT_DURATION = 800; // 800ms fade-out

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default muted to respect WCAG 1.4.2
  const fadeAnimationRef = useRef<number | null>(null);

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

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted || !isPlaying) {
      audio.muted = false;
      audio.volume = 0;
      audio.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
        fadeTo(TARGET_VOLUME, FADE_IN_DURATION);
      }).catch((err) => {
        console.warn("Audio playback gesture required:", err);
      });
    } else {
      fadeTo(0, FADE_OUT_DURATION, () => {
        audio.pause();
        setIsPlaying(false);
        setIsMuted(true);
      });
    }
  }, [isMuted, isPlaying, fadeTo]);

  // Keyboard shortcut 'M' to toggle mute/play
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      if (e.key === "m" || e.key === "M") {
        togglePlayback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayback]);

  // Graceful pause on tab switch / window blur
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio || isMuted || !isPlaying) return;

      if (document.hidden) {
        fadeTo(0, FADE_OUT_DURATION, () => {
          audio.pause();
        });
      } else {
        audio.play().then(() => {
          fadeTo(TARGET_VOLUME, 1000);
        }).catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearFade();
    };
  }, [isMuted, isPlaying, fadeTo]);

  const isAudioActive = isPlaying && !isMuted;

  return (
    <>
      <audio 
        ref={audioRef}
        src="/audio/joyinsound-training-for-success-music-500270.mp3" 
        preload="none"
        loop
      />
      
      {/* Audio Visualizer & Toggle — Positioned with Safe Area insets */}
      <motion.button
        type="button"
        onClick={togglePlayback}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center gap-1.5 w-11 h-11 rounded-full bg-zinc-950/85 border border-white/20 backdrop-blur-2xl cursor-pointer hover:bg-zinc-900 hover:border-emerald-400/60 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.7)] focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
        title={isAudioActive ? "Mute Background Music (M)" : "Play Ambient Audio (M)"}
        aria-label={isAudioActive ? "Mute Background Music" : "Play Ambient Audio"}
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
            className="text-zinc-400 hover:text-emerald-400 transition-colors"
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
