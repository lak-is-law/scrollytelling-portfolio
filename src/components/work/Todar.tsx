"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import Image from "next/image";

export default function Todar() {
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
        
        {/* Project Image */}
        <div className="relative aspect-[4/3] lg:aspect-square z-10 perspective-1000 order-last lg:order-first">
          <motion.div 
            style={{ y, scale, opacity }} 
            className="w-full h-full relative rounded-[2.5rem] overflow-hidden bg-transparent flex items-center justify-center group shadow-2xl"
          >
            <div className="relative w-full h-full border border-zinc-800/50 rounded-[2.5rem] overflow-hidden bg-white/5">
              <Image 
                src="/projects/todar.png"
                alt="Todar 2.0"
                fill
                className="object-contain scale-[0.85] drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Story */}
        <div className="space-y-12 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-zinc-500 uppercase">
              <span>04 // Analytics</span>
              <div className="h-px w-12 bg-zinc-800" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
              TODAR 2.0
            </h2>
            
            <p className="text-2xl text-zinc-400 font-light leading-relaxed">
              Intelligent financial forecasting and automation.
            </p>
          </div>

          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
            <p>
              More than an expense tracker, TODAR functions as an intelligent financial assistant. Integrating <span className="text-white font-medium">Google AI APIs</span>, the platform predicts spending behaviors and automates manual tracking, reducing operational friction by 70%.
            </p>
            <p>
              The interface is heavily inspired by enterprise tools like Power BI. It features complex, interactive data visualizations and prioritizes <span className="text-white font-medium">accessibility</span> through strictly tested, high-contrast UI themes optimized for extended reading and analytical eye comfort.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {["Google AI", "React", "Data Visualization", "Accessibility", "Power BI UX"].map((tech) => (
              <span key={tech} className="px-4 py-1.5 rounded-full border border-zinc-800 text-sm font-medium text-zinc-400 bg-zinc-900/50 backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
