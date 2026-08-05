"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const TARGET_VOLUME = 0.65; // Clear, comfortable ambient volume (65%)

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const startAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    audio.volume = TARGET_VOLUME;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch((err) => {
          console.warn("Audio autoplay blocked by browser policy until interaction:", err);
        });
    }
  }, []);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    setIsMuted(true);
  }, []);

  const togglePlayback = useCallback(() => {
    if (isMuted || !isPlaying) {
      startAudio();
    } else {
      pauseAudio();
    }
  }, [isMuted, isPlaying, startAudio, pauseAudio]);

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

  // Listen for custom global events to start audio (e.g. from onboarding or dashboard)
  useEffect(() => {
    const handleStartEvent = () => {
      startAudio();
    };

    window.addEventListener("start-ambient-audio", handleStartEvent);
    return () => window.removeEventListener("start-ambient-audio", handleStartEvent);
  }, [startAudio]);

  // Autoplay on first user interaction (click anywhere on page)
  useEffect(() => {
    const handleFirstInteraction = () => {
      startAudio();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [startAudio]);

  // Graceful pause on tab switch / window blur
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio || isMuted || !isPlaying) return;

      if (document.hidden) {
        audio.pause();
      } else {
        audio.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isMuted, isPlaying]);

  const isAudioActive = isPlaying && !isMuted;

  return (
    <>
      <audio 
        ref={audioRef}
        src="/audio/joyinsound-training-for-success-music-500270.mp3" 
        preload="auto"
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
