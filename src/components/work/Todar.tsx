"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Todar() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#09090b] flex items-center py-32 px-6 md:px-24 overflow-hidden border-t border-zinc-900/50">
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Abstract Visual Presentation (Parallaxing) */}
        <motion.div style={{ y }} className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-zinc-900/50 border border-zinc-800/50 flex flex-col p-8 group order-last lg:order-first">
          {/* Subtle dashboard lines */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="flex-1 flex flex-col justify-end space-y-4 relative z-10">
             <div className="w-full h-1/3 bg-zinc-800/30 backdrop-blur-md rounded-2xl border border-zinc-700/30 flex items-end p-6 gap-2">
                {[40, 70, 45, 90, 60, 100].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 bg-zinc-600/20 rounded-t-sm"
                  />
                ))}
             </div>
          </div>
        </motion.div>

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
