"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const languages = [
  { level: "Native / Bilingual", langs: ["English", "Hindi"] },
  { level: "Full Professional", langs: ["Korean (한국어)"] },
  { level: "Professional Working", langs: ["Assamese", "Gujarati", "Mizo"] },
  { level: "Limited Working", langs: ["Mandarin Chinese", "Meiteilon (Manipuri)", "Tagalog"] },
];

export default function Languages() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={containerRef} className="relative bg-[#09090b] py-24 px-6 md:px-24 overflow-hidden border-t border-zinc-900/50">
      <div className="mx-auto max-w-7xl w-full">
        
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 text-sm font-medium tracking-widest text-zinc-500 uppercase mb-6">
            <div className="h-px w-8 bg-zinc-800" />
            <span>09 // Linguistic Range</span>
            <div className="h-px w-8 bg-zinc-800" />
          </div>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
            Global Communication.
          </h2>
        </div>

        <motion.div style={{ y }} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {languages.map((group, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-zinc-900/20 border border-zinc-800/50 backdrop-blur-sm hover:border-zinc-700 transition-colors"
            >
              <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-6">
                {group.level}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.langs.map((lang, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 rounded-full border border-zinc-700 bg-zinc-800/30 text-zinc-200 text-lg font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
