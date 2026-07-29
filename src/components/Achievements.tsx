"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const otherAchievements = [
  { title: "Semi-Finalist", context: "TechXcelerate, BITS Hyderabad" },
  { title: "Special Mention", context: "ICA Model United Nations (MUN)" },
  { title: "Nominee", context: "International Award for Young People (IAYP)" },
  { title: "Flight Experience", context: "Commercial Jet Airliner, Singapore Flyer" },
];

export default function Achievements() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={containerRef} className="relative bg-[#09090b] py-32 px-6 md:px-24 overflow-hidden border-t border-zinc-900/50">
      <div className="mx-auto max-w-7xl w-full">
        
        {/* Spotlight UCSI Achievement */}
        <motion.div 
          style={{ scale, opacity }}
          className="relative rounded-[3rem] bg-gradient-to-br from-zinc-900/40 to-black border border-white/10 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_30px_100px_-20px_rgba(0,0,0,1)]"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 w-full md:w-2/3 space-y-6">
            <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-yellow-500/80 uppercase mb-4">
              <span>07 // Pinnacle Achievement</span>
              <div className="h-px w-12 bg-yellow-500/30" />
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
              Most Innovative Solution
            </h2>
            <p className="text-2xl text-zinc-300 font-light">
              UCSI Consulting Group Pitch Competition
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
              Awarded during an intensive Entrepreneurship Immersion Programme at UCSI University in Kuala Lumpur, Malaysia (Jan 2025). Recognized for delivering a groundbreaking strategic solution under high-pressure consulting constraints.
            </p>
          </div>
          
          <div className="relative z-10 w-full md:w-1/3 flex justify-center md:justify-end">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-center backdrop-blur-md shadow-[0_0_50px_rgba(234,179,8,0.1)]">
              <span className="text-7xl font-light text-yellow-500/40">🏆</span>
            </div>
          </div>
        </motion.div>

        {/* Other Accolades Grid */}
        <div className="mt-24">
          <h3 className="text-2xl font-medium text-white mb-10 text-center md:text-left">Other Accolades</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherAchievements.map((achieve, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-3xl bg-zinc-900/20 border border-zinc-800/50 hover:border-zinc-700 transition-colors"
              >
                <h4 className="text-lg font-medium text-zinc-200 mb-2">{achieve.title}</h4>
                <p className="text-sm text-zinc-500">{achieve.context}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
