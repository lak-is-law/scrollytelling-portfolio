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
  const playAttempted = useRef(false);
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
    if (!audio || isPlaying || playAttempted.current) return;

    playAttempted.current = true;

    try {
      audio.volume = 0;
      await audio.play();
      setIsPlaying(true);
      if (!isMutedRef.current) {
        fadeTo(TARGET_VOLUME, FADE_IN_DURATION);
      }
    } catch {
      playAttempted.current = false;
    }
  }, [isPlaying, fadeTo]);

  // Listen for user interaction to begin smooth audio playback
  useEffect(() => {
    const handleInteraction = () => {
      if (!isPlaying) {
        startPlayback();
      }
    };

    window.addEventListener("click", handleInteraction, { capture: true });
    window.addEventListener("touchstart", handleInteraction, { capture: true });
    window.addEventListener("keydown", handleInteraction, { capture: true });
    window.addEventListener("scroll", handleInteraction, { capture: true });

    // Initial attempt in case policy allows
    startPlayback();

    return () => {
      window.removeEventListener("click", handleInteraction, { capture: true });
      window.removeEventListener("touchstart", handleInteraction, { capture: true });
      window.removeEventListener("keydown", handleInteraction, { capture: true });
      window.removeEventListener("scroll", handleInteraction, { capture: true });
    };
  }, [isPlaying, startPlayback]);

  // Graceful fade out on tab switch / window blur / page leave, and fade in on return
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio || !isPlaying || isMutedRef.current) return;

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
  }, [isPlaying, fadeTo]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      setIsMuted(false);
      isMutedRef.current = false;
      audio.muted = false;
      if (audio.paused) {
        audio.play().then(() => {
          fadeTo(TARGET_VOLUME, 1000);
        }).catch(() => {});
      } else {
        fadeTo(TARGET_VOLUME, 1000);
      }
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

  // Equalizer waveform bars
  const barHeights = ["16px", "24px", "12px", "20px"];

  return (
    <>
      <audio 
        ref={audioRef}
        src="/audio/joyinsound-training-for-success-music-500270.mp3" 
        preload="auto"
        loop
      />
      
      {/* Audio Visualizer & Mute Toggle */}
      <div 
        onClick={toggleMute}
        className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 flex items-center justify-center gap-1 w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-white/10 transition-colors group hover-magnetic"
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-1 bg-white rounded-full"
            animate={{
              height: !isMuted && isPlaying ? ["4px", barHeights[i], "4px"] : "4px",
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </>
  );
}
