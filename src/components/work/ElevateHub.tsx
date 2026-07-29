"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import Image from "next/image";

export default function ElevateHub() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const x = useTransform(scrollYProgress, (v) => Math.sin(v * 200) * 8);

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

        {/* Project Image */}
        <div className="relative aspect-[4/3] lg:aspect-square z-10 perspective-1000">
          <motion.div 
            style={{ y, x }} 
            className="w-full h-full relative rounded-[2.5rem] overflow-hidden bg-transparent flex items-center justify-center group shadow-2xl"
          >
            <div className="relative w-full h-full border border-zinc-800/50 rounded-[2.5rem] overflow-hidden bg-black/50">
              <Image 
                src="/projects/elevate-hub.jpg"
                alt="Elevate Hub"
                fill
                className="object-contain scale-[0.6] drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
