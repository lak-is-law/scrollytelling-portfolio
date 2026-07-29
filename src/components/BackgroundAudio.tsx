"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const playAudio = async () => {
      if (hasPlayed || !audioRef.current) return;
      
      try {
        await audioRef.current.play();
        setHasPlayed(true);
        // Once playback successfully starts, detach all listeners
        window.removeEventListener("scroll", playAudio);
        window.removeEventListener("click", playAudio);
        window.removeEventListener("touchstart", playAudio);
        window.removeEventListener("keydown", playAudio);
      } catch {
        // Browsers block autoplay until user interaction. 
        // We catch the error and keep the listeners active.
      }
    };

    // Browsers block audio unless the user has interacted. 
    // We try to play it the millisecond they do literally anything.
    window.addEventListener("scroll", playAudio, { passive: true });
    window.addEventListener("click", playAudio, { passive: true });
    window.addEventListener("touchstart", playAudio, { passive: true });
    window.addEventListener("keydown", playAudio, { passive: true });

    return () => {
      window.removeEventListener("scroll", playAudio);
      window.removeEventListener("click", playAudio);
      window.removeEventListener("touchstart", playAudio);
      window.removeEventListener("keydown", playAudio);
    };
  }, [hasPlayed]);

  return (
    <audio 
      ref={audioRef}
      src="/audio/bgm.m4a" 
      preload="auto"
    />
  );
}
