"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

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

    // Attach to highly privileged user interaction events in the capture phase.
    // This allows the event to propagate down to buttons/links normally, but triggers audio first!
    window.addEventListener("click", playAudio, { capture: true });
    window.addEventListener("touchstart", playAudio, { capture: true });
    window.addEventListener("keydown", playAudio, { capture: true });

    // Note: We intentionally DO NOT use 'scroll' or 'mousemove' because browsers 
    // explicitly do not count those as user activation, and spamming play() on scroll 
    // will cause the browser to permanently shadow-ban the audio element.

    return () => {
      window.removeEventListener("click", playAudio, { capture: true });
      window.removeEventListener("touchstart", playAudio, { capture: true });
      window.removeEventListener("keydown", playAudio, { capture: true });
    };
  }, [hasPlayed]);

  return (
    <audio 
      ref={audioRef}
      src="/audio/bgm.wav" 
      preload="auto"
      // Removed autoPlay to prevent browser from instantly blacklisting the element
    />
  );
}
