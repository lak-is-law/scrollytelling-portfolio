"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Instant values for the inner dot
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring values for the trailing outer ring
  const springConfig = { damping: 20, stiffness: 150, mass: 0.2 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer" ||
        target.classList.contains("hover-magnetic")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", () => setIsVisible(true));
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}} />
      
      {/* Outer trailing ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99999] border border-white/40 flex items-center justify-center mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
          borderWidth: isHovered ? "0px" : "1px"
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Inner precise dot (instant follow) */}
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999] bg-white mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          opacity: isHovered ? 0 : 1
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
