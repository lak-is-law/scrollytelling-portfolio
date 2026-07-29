"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import Image from "next/image";

export default function RedGambit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#09090b] flex items-center py-32 px-6 md:px-24 overflow-hidden border-t border-zinc-900/50">
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Story */}
        <div className="space-y-12 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-zinc-500 uppercase">
              <span>03 // Research</span>
              <div className="h-px w-12 bg-zinc-800" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
              Red Gambit.
            </h2>
            
            <p className="text-2xl text-zinc-400 font-light leading-relaxed">
              An AI research playground disguised as a strategy game.
            </p>
          </div>

          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
            <p>
              Traditional gaming platforms focus on rendering. Red Gambit focuses on cognition. By integrating <span className="text-white font-medium">KataGo</span> and <span className="text-white font-medium">Stockfish</span> agents, the platform strips away the illusion of casual gameplay, presenting the user with an almost insurmountable strategic challenge.
            </p>
            <p>
              Underneath the immersive interface lies a custom engine powered by <span className="text-white font-medium">Minimax</span>, <span className="text-white font-medium">Alpha-Beta Pruning</span>, and <span className="text-white font-medium">Iterative Deepening</span>. Moves are calculated with surgical precision, leveraging Zobrist hash transposition tables to achieve real-time algorithmic thinking.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {["KataGo", "Stockfish", "Minimax", "Alpha-Beta Pruning", "Zobrist Hashing", "React"].map((tech) => (
              <span key={tech} className="px-4 py-1.5 rounded-full border border-zinc-800 text-sm font-medium text-zinc-400 bg-zinc-900/50 backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Image */}
        <div className="relative aspect-[4/3] lg:aspect-square z-10 perspective-1000">
          <motion.div 
            style={{ y, scale, opacity }} 
            className="w-full h-full relative rounded-[2.5rem] overflow-hidden bg-transparent flex items-center justify-center group shadow-2xl"
          >
            <div className="relative w-full h-full border border-zinc-800/50 rounded-[2.5rem] overflow-hidden">
              <Image 
                src="/projects/red-gambit-v2.png"
                alt="Red Gambit"
                fill
                className="object-contain scale-110 drop-shadow-2xl"
              />
            </div>
            
            <div className="absolute bottom-8 right-8 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 bg-zinc-900/90 px-5 py-3 rounded-full backdrop-blur-md border border-zinc-800">
               <a href="https://red-gambit.vercel.app" target="_blank" rel="noreferrer" className="text-sm font-medium tracking-wider text-white uppercase hover:text-zinc-400 transition-colors">
                 View Live Experience ↗
               </a>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
