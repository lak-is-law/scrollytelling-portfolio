"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Name: Visible at start, fades out during paragraphs, fades back in after.
  const nameOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    [1, 1, 0, 0, 1, 1]
  );
  const nameScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Subtext: behaves identically to the name, fading out during paragraphs and fading back in
  const subtextOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    [1, 1, 0, 0, 1, 1]
  );
  const subtextY = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.8, 0.9, 1], 
    [0, -50, -50, 0, 0]
  );

  // Section 2 (The Approach): 30% to 50%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [50, 0, 0, -50]);

  // Section 3 (The Standard): 60% to 80%
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [50, 0, 0, -50]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 h-[500vh] w-full pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full flex items-center p-8 md:p-24 overflow-hidden">
        
        {/* Name (Persistent) */}
        <motion.div 
          style={{ opacity: nameOpacity, scale: nameScale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-auto mix-blend-difference z-0"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl font-bold tracking-tighter text-white"
          >
            LAKSHYA
          </motion.h1>
        </motion.div>

        {/* Subtext (Fades out) */}
        <motion.div 
          style={{ opacity: subtextOpacity, y: subtextY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-auto mt-32 md:mt-48 z-10"
        >
          <motion.p 
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-zinc-400 font-light tracking-widest uppercase"
          >
            Creative AI Engineer
          </motion.p>
        </motion.div>

        {/* Philosophy */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex items-center justify-start p-8 md:p-32 pointer-events-auto z-20"
        >
          <div className="max-w-4xl space-y-8 bg-black/20 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/5">
            <p className="text-sm tracking-widest text-zinc-500 uppercase font-medium">01 // The Approach</p>
            <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-white leading-[1.1]">
              Bridging engineering rigor with <span className="text-zinc-500">product intuition.</span>
            </h2>
            <p className="text-xl md:text-3xl text-zinc-400 font-light max-w-2xl leading-relaxed">
              Operating at the intersection of Artificial Intelligence, data analytics, and interface design.
            </p>
          </div>
        </motion.div>

        {/* Quality */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex items-center justify-end p-8 md:p-32 pointer-events-auto z-20"
        >
          <div className="max-w-4xl space-y-8 text-right ml-auto bg-black/20 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/5">
            <p className="text-sm tracking-widest text-zinc-500 uppercase font-medium">02 // The Standard</p>
            <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-white leading-[1.1]">
              Obsessed with <br/> <span className="text-zinc-500">technical excellence.</span>
            </h2>
            <p className="text-xl md:text-3xl text-zinc-400 font-light max-w-2xl ml-auto leading-relaxed">
              Software shouldn&apos;t just function. It should feel intentional, precise, and handcrafted.
            </p>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
