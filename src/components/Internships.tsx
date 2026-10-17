"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface Internship {
  company: string;
  role: string;
  date: string;
  desc: string;
  tech: string[];
  logo: string;
  logoContainerClass?: string;
}

const internships: Internship[] = [
  {
    company: "Genospark",
    role: "Full-Stack & AI Developer Intern",
    date: "Aug 2026 – Present",
    desc: "Co-developed Next.js frontend & Prisma backend with a server-authoritative data layer serving 1M+ aspirants for AWS/Microsoft certifications. Built the AWS Challenge Game with hybrid controls, database caching, and WebGL/Canvas 3D feedback across 5 themes, doubling hit rate and conversion.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "WebGL / Canvas", "AWS Game"],
    logo: "/logos/genospark.png",
    logoContainerClass: "w-11 h-11 bg-white p-1.5 border-white/20 shadow-md"
  },
  {
    company: "HackerRank",
    role: "Software Engineering Intern",
    date: "Jul 2026 – Sep 2026",
    desc: "Maintained Project Euler+, authoring over 50 algorithmic challenges and validating over 400 test cases for the widely used competitive programming platform.",
    tech: ["Algorithms", "Test Automation", "Python", "Competitive Programming"],
    logo: "/logos/hackerrank.svg",
    logoContainerClass: "w-11 h-11 bg-black/40 p-1 border-white/10"
  },
  {
    company: "6Pistons",
    role: "Creative Designer",
    date: "Dec 2024 – Aug 2025",
    desc: "Created automotive infographics for brand partners including Mercedes-Benz, VinFast, and Audi, translating vehicle engineering specs into high-impact visual guides for auto-expo coverage.",
    tech: ["Design Systems", "Media Production", "Automotive Infographics"],
    logo: "/logos/6pistons.png",
    logoContainerClass: "w-24 h-11 bg-zinc-950/80 px-2 py-1 border-white/15 shadow-md"
  },
  {
    company: "BufferTech",
    role: "Full Stack Developer Intern",
    date: "Feb 2024 – Aug 2024",
    desc: "Developed production web features using React.js, Firebase, and REST APIs, reducing checkout-page bounce rate by 25% and cutting latency by 20% through UX and performance optimization.",
    tech: ["React.js", "Firebase", "REST APIs", "Performance Tuning"],
    logo: "/logos/buffertech.svg",
    logoContainerClass: "w-11 h-11 bg-black/40 p-1 border-white/10"
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
    <section ref={containerRef} id="experience" className="relative bg-transparent py-20 md:py-32 px-4 sm:px-6 md:px-24 overflow-hidden border-t border-white/[0.08]">
      {/* Signature Emerald Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/[0.07] rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl w-full relative z-10">
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-emerald-400 uppercase mb-4 md:mb-6">
            <span>07 // Professional Experience</span>
            <div className="h-px w-12 bg-emerald-500/30" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight text-white mb-4 md:mb-6">
            Industry Internships.
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl">
            Real-world execution across full-stack engineering, media production, and corporate public relations.
          </p>
        </div>

        <motion.div style={{ y }} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {internships.map((intern, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group rounded-[2rem] bg-zinc-900/30 backdrop-blur-2xl border border-emerald-500/20 shadow-[0_0_40px_-12px_rgba(16,185,129,0.18),inset_0_1px_1px_rgba(255,255,255,0.15)] p-6 sm:p-8 md:p-10 flex flex-col justify-between hover:bg-zinc-900/50 hover:border-emerald-400/50 hover:shadow-[0_0_50px_-8px_rgba(16,185,129,0.3)] hover:-translate-y-1.5 transition-all duration-500"
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3.5">
                    <div className={`relative rounded-2xl overflow-hidden shrink-0 flex items-center justify-center border ${intern.logoContainerClass || "w-11 h-11 bg-black/40 p-1 border-white/10"}`}>
                      <Image 
                        src={intern.logo} 
                        alt={intern.company} 
                        width={96} 
                        height={44} 
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {intern.company}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-medium text-emerald-400 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 w-fit shrink-0">
                    {intern.date}
                  </span>
                </div>
                <p className="text-lg text-emerald-300/90 font-medium mb-4">{intern.role}</p>
                <p className="text-zinc-400 leading-relaxed font-light mb-8">
                  {intern.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {intern.tech.map((t, idx) => (
                  <span key={idx} className="text-xs font-medium text-emerald-300 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/20 shadow-[0_0_12px_-2px_rgba(16,185,129,0.12)]">
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
