"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const playAttempted = useRef(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1.0;
    }
  }, []);

  useEffect(() => {
    const playAudio = async () => {
      if (hasPlayed || !audioRef.current || playAttempted.current) return;
      
      playAttempted.current = true; // Lock to prevent spamming play()

      try {
        await audioRef.current.play();
        setHasPlayed(true);
        // Success! Remove listeners
        window.removeEventListener("click", playAudio, { capture: true });
        window.removeEventListener("touchstart", playAudio, { capture: true });
        window.removeEventListener("keydown", playAudio, { capture: true });
      } catch {
        // Failed due to strict autoplay. Unlock to allow next attempt.
        playAttempted.current = false;
        console.warn("Audio autoplay blocked by browser. Waiting for explicit click.");
      }
    };

    window.addEventListener("click", playAudio, { capture: true });
    window.addEventListener("touchstart", playAudio, { capture: true });
    window.addEventListener("keydown", playAudio, { capture: true });

    return () => {
      window.removeEventListener("click", playAudio, { capture: true });
      window.removeEventListener("touchstart", playAudio, { capture: true });
      window.removeEventListener("keydown", playAudio, { capture: true });
    };
  }, [hasPlayed]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  // Bar heights for the visualizer to create a waveform effect
  const barHeights = ["16px", "24px", "12px", "20px"];

  return (
    <>
      <audio 
        ref={audioRef}
        src="/audio/bgm.wav" 
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
              height: !isMuted && hasPlayed ? ["4px", barHeights[i], "4px"] : "4px",
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
