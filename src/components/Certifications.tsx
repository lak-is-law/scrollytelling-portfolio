"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const certifications = [
  {
    title: "Full Stack Internship",
    issuer: "BufferTech",
    date: "Mar 2025",
    type: "Technical"
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
    <section ref={containerRef} className="relative bg-[#09090b] py-24 px-6 md:px-24 overflow-hidden border-t border-zinc-900/50">
      <div className="mx-auto max-w-7xl w-full flex flex-col lg:flex-row gap-16">
        
        {/* Header Side */}
        <div className="lg:w-1/3">
          <div className="sticky top-32">
            <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-zinc-500 uppercase mb-6">
              <span>08 // Credentials</span>
              <div className="h-px w-12 bg-zinc-800" />
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
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl bg-zinc-900/20 border border-zinc-800/50 hover:bg-zinc-900/40 transition-colors"
            >
              <div>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">{cert.type}</p>
                <h3 className="text-xl font-medium text-white mb-1">{cert.title}</h3>
                <p className="text-zinc-400">{cert.issuer}</p>
              </div>
              <div className="sm:text-right">
                <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-sm font-medium text-zinc-300">
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
