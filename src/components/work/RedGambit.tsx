"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function RedGambit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

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

        {/* Abstract Visual Presentation (Parallaxing) */}
        <motion.div style={{ y }} className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center group">
          {/* Subtle glowing orb / mesh simulation */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(100,50,50,0.05),transparent_70%)]" />
          
          <div className="absolute w-full h-full p-12">
            <div className="w-full h-full border border-zinc-800/50 rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]">
              <div className="w-3/4 h-3/4 border border-zinc-800/50 rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]">
                <div className="w-1/2 h-1/2 bg-zinc-800/20 backdrop-blur-xl rounded-full" />
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 right-8 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <a href="https://red-gambit.vercel.app" target="_blank" rel="noreferrer" className="text-sm font-medium tracking-wider text-white uppercase hover:text-zinc-400 transition-colors">
               View Live Experience ↗
             </a>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
