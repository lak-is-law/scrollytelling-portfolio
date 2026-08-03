"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const certifications = [
  {
    title: "Combinatorics and Probability",
    issuer: "UC San Diego Extended Studies",
    date: "Apr 2026",
    type: "Mathematics & CS"
  },
  {
    title: "Korean Language — Intermediate 1",
    issuer: "Sungkyunkwan University, Coursera",
    date: "Mar 2025",
    type: "Linguistic"
  },
  {
    title: "National Education Policy 2020",
    issuer: "SRMIST",
    date: "Feb 2025",
    type: "Academic"
  },
  {
    title: "Most Innovative Solution",
    issuer: "UCSI Consulting Group, Malaysia",
    date: "Jan 2025",
    type: "Business / Entrepreneurship"
  },
  {
    title: "Certified Game Developer",
    issuer: "WhiteHat Jr",
    date: "Jan 2021",
    type: "Game Engineering"
  },
  {
    title: "Certified Mobile App-Developer",
    issuer: "WhiteHat Jr, Mumbai",
    date: "Jan 2021",
    type: "Technical"
  }
];

export default function Certifications() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={containerRef} className="relative bg-transparent py-32 px-6 md:px-24 overflow-hidden border-t border-white/[0.08]">
      {/* Signature Purple Ambient Glow */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[500px] bg-purple-500/[0.07] rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl w-full flex flex-col lg:flex-row gap-16 relative z-10">
        
        {/* Header Side */}
        <div className="lg:w-1/3">
          <div className="sticky top-32">
            <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-purple-400 uppercase mb-6">
              <span>09 // Credentials</span>
              <div className="h-px w-12 bg-purple-500/30" />
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
              Verified<br/>Certifications.
            </h2>
            <p className="text-lg text-zinc-400 font-light">
              Continuous upskilling across full-stack development, entrepreneurship, and global languages.
            </p>
          </div>
        </div>

        {/* List Side */}
        <motion.div style={{ y }} className="lg:w-2/3 flex flex-col gap-6">
          {certifications.map((cert, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl bg-zinc-900/30 backdrop-blur-2xl border border-purple-500/20 shadow-[0_0_40px_-12px_rgba(139,92,246,0.18),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:bg-zinc-900/50 hover:border-purple-400/50 hover:shadow-[0_0_50px_-8px_rgba(139,92,246,0.3)] hover:-translate-y-1 transition-all duration-500"
            >
              <div>
                <p className="text-xs font-mono font-medium text-purple-400 uppercase tracking-wider mb-2">{cert.type}</p>
                <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors mb-1">{cert.title}</h3>
                <p className="text-zinc-400 font-light">{cert.issuer}</p>
              </div>
              <div className="sm:text-right">
                <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-sm font-mono font-medium text-purple-300 shadow-[0_0_15px_-3px_rgba(139,92,246,0.2)]">
                  {cert.date}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
