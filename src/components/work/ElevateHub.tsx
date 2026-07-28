"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ElevateHub() {
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
              <span>05 // Community</span>
              <div className="h-px w-12 bg-zinc-800" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
              ElevateHub.
            </h2>
            
            <p className="text-2xl text-zinc-400 font-light leading-relaxed">
              Bridging the gap between talent and opportunity.
            </p>
          </div>

          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
            <p>
              ElevateHub is a professional networking platform designed to eliminate the noise of traditional job boards. It focuses purely on <span className="text-white font-medium">verification</span> and high-signal opportunity listings, creating a trusted environment for students and recruiters.
            </p>
            <p>
              Built entirely on <span className="text-white font-medium">React</span> and <span className="text-white font-medium">Firebase</span>, the full-stack architecture supports secure user authentication, real-time community forums, and deep profile-based networking.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {["React", "Firebase", "Full-Stack", "Auth", "Networking"].map((tech) => (
              <span key={tech} className="px-4 py-1.5 rounded-full border border-zinc-800 text-sm font-medium text-zinc-400 bg-zinc-900/50 backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Abstract Visual Presentation (Parallaxing) */}
        <motion.div style={{ y }} className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center p-12">
          
          <div className="relative w-full h-full">
            {/* Networking nodes simulation */}
            <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700/50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-zinc-200 shadow-[0_0_40px_rgba(255,255,255,0.1)] z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full bg-zinc-800 border border-zinc-700/50" />
            
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
              <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="75%" y1="75%" x2="50%" y2="50%" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </div>
          
        </motion.div>
        
      </div>
    </section>
  );
}
