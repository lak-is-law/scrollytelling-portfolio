"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const internships = [
  {
    company: "BufferTech",
    role: "Full Stack Developer Intern",
    date: "Feb 2024 – Aug 2024",
    desc: "Developed and maintained full-stack web applications in a professional production environment. Awarded verified Certificate of Internship.",
    tech: ["React.js", "Firebase", "RESTful APIs", "JavaScript"]
  },
  {
    company: "6Pistons",
    role: "Co-lead, Design, Media & Editing",
    date: "Dec 2024 – Sep 2025",
    desc: "Co-led design, media production, and content editing across creative projects in a hybrid environment.",
    tech: ["Design", "Media Production", "Editing"]
  }
];

export default function Internships() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={containerRef} className="relative bg-[#09090b] py-32 px-6 md:px-24 overflow-hidden border-t border-zinc-900/50">
      <div className="mx-auto max-w-7xl w-full">
        <div className="mb-20">
          <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-zinc-500 uppercase mb-6">
            <span>06 // Professional Experience</span>
            <div className="h-px w-12 bg-zinc-800" />
          </div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6">
            Industry Internships.
          </h2>
          <p className="text-xl text-zinc-400 font-light max-w-2xl">
            Real-world execution across full-stack engineering, media production, and corporate public relations.
          </p>
        </div>

        <motion.div style={{ y }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {internships.map((intern, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group rounded-[2rem] bg-zinc-900/20 backdrop-blur-3xl border border-white/5 p-8 flex flex-col justify-between hover:bg-zinc-900/40 transition-colors duration-500"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-semibold text-white group-hover:text-zinc-300 transition-colors">
                    {intern.company}
                  </h3>
                  <span className="text-xs font-medium text-zinc-500 px-3 py-1 rounded-full bg-zinc-800/50">
                    {intern.date}
                  </span>
                </div>
                <p className="text-lg text-zinc-300 font-medium mb-4">{intern.role}</p>
                <p className="text-zinc-400 leading-relaxed font-light mb-8">
                  {intern.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {intern.tech.map((t, idx) => (
                  <span key={idx} className="text-xs font-medium text-zinc-400 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50">
                    {t}
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
