"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { arcadeAudio } from "@/utils/arcadeAudio";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  type: string;
  status: string;
  verifyUrl?: string;
  certificateImage?: string;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOP 3 PRIORITY CREDENTIALS (Highest Prestige & AI Impact)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const priorityCertifications: Certification[] = [
  {
    title: "Foundations of Agentic AI & GitHub Copilot SDK",
    issuer: "GitHub (Coursera)",
    date: "Oct 2026",
    type: "AI & Agentic Systems",
    status: "VERIFIED",
    verifyUrl: "https://coursera.org/verify/Z41UAY0P7TKE",
    certificateImage: "/certificates/github-agentic-ai.jpeg"
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic Academy (Coursera)",
    date: "Oct 2026",
    type: "Generative AI & Tool Use",
    status: "VERIFIED",
    verifyUrl: "https://coursera.org/verify/GU4NEK84K5XB",
    certificateImage: "/certificates/anthropic-claude-code.jpeg"
  },
  {
    title: "Introduction to Complexity Science",
    issuer: "Nanyang Technological University, Singapore",
    date: "Oct 2026",
    type: "Complex Systems & Physics",
    status: "VERIFIED",
    verifyUrl: "https://coursera.org/verify/DHQF79FO3BL6",
    certificateImage: "/certificates/ntu-complexity-science.jpeg"
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXTENDED CERTIFICATION ARCHIVE (Expandable on Demand)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const remainingCertifications: Certification[] = [
  {
    title: "Cybersecurity Job Simulation",
    issuer: "Mastercard (Forage)",
    date: "Sep 2026",
    type: "Security & Phishing Defense",
    status: "VERIFIED",
    certificateImage: "/certificates/mastercard-cybersecurity.png"
  },
  {
    title: "Software Engineer Intern Role Certification",
    issuer: "HackerRank",
    date: "Aug 2026",
    type: "Software Engineering",
    status: "VERIFIED",
    certificateImage: "/certificates/hackerrank-swe-intern.jpg"
  },
  {
    title: "Front-End Software Engineering Job Simulation",
    issuer: "Skyscanner (Forage)",
    date: "Aug 2026",
    type: "Frontend Engineering",
    status: "COMPLETED"
  },
  {
    title: "Engineering Job Simulation",
    issuer: "British Airways",
    date: "Aug 2026",
    type: "Engineering",
    status: "COMPLETED"
  },
  {
    title: "Korean Language — Intermediate 1",
    issuer: "Sungkyunkwan University, Coursera",
    date: "Mar 2025",
    type: "Linguistic",
    status: "COMPLETED"
  },
  {
    title: "Full Stack Internship Certificate",
    issuer: "BufferTech",
    date: "Mar 2025",
    type: "Technical",
    status: "COMPLETED"
  },
  {
    title: "Certified Game Developer",
    issuer: "WhiteHat Jr",
    date: "Jan 2021",
    type: "Game Engineering",
    status: "COMPLETED"
  },
  {
    title: "Certified Mobile App-Developer",
    issuer: "WhiteHat Jr, Mumbai",
    date: "Jan 2021",
    type: "Technical",
    status: "COMPLETED"
  }
];

export default function Certifications() {
  const containerRef = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const handleToggle = () => {
    arcadeAudio.playClick();
    setIsExpanded((prev) => !prev);
  };

  const renderCertCard = (cert: Certification, i: number) => (
    <motion.div 
      key={cert.title + i}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-zinc-900/30 backdrop-blur-2xl border border-purple-500/20 shadow-[0_0_40px_-12px_rgba(139,92,246,0.18),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:bg-zinc-900/50 hover:border-purple-400/50 hover:shadow-[0_0_50px_-8px_rgba(139,92,246,0.3)] hover:-translate-y-1 transition-all duration-500"
    >
      <div>
        <p className="text-xs font-mono font-medium text-purple-400 uppercase tracking-wider mb-2">{cert.type}</p>
        <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors mb-1">{cert.title}</h3>
        <p className="text-zinc-400 font-light">{cert.issuer}</p>
        {(cert.verifyUrl || cert.certificateImage) && (
          <div className="mt-3 flex items-center gap-3">
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-300 hover:text-white transition-colors underline decoration-purple-500/50 underline-offset-4"
              >
                <span>Verify Credential ↗</span>
              </a>
            )}
            {cert.certificateImage && (
              <a
                href={cert.certificateImage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              >
                <span>View Certificate</span>
              </a>
            )}
          </div>
        )}
      </div>
      <div className="sm:text-right flex flex-col items-end gap-2">
        <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-sm font-mono font-medium text-purple-300 shadow-[0_0_15px_-3px_rgba(139,92,246,0.2)]">
          {cert.date}
        </span>
        {cert.status && (
          <span className="inline-block px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-[10px] font-mono font-bold text-emerald-400 tracking-wider">
            {cert.status}
          </span>
        )}
      </div>
    </motion.div>
  );

  return (
    <section ref={containerRef} id="credentials" className="relative bg-transparent py-20 md:py-32 px-4 sm:px-6 md:px-24 overflow-hidden border-t border-white/[0.08]">
      {/* Signature Purple Ambient Glow */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[500px] bg-purple-500/[0.07] rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl w-full flex flex-col lg:flex-row gap-12 lg:gap-16 relative z-10">
        
        {/* Header Side */}
        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-purple-400 uppercase mb-4 md:mb-6">
              <span>08 // Credentials</span>
              <div className="h-px w-12 bg-purple-500/30" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-4 md:mb-6">
              Verified<br className="hidden sm:inline"/> Certifications.
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 font-light">
              Continuous upskilling across agentic AI, complexity science, and high-performance software engineering.
            </p>
          </div>
        </div>

        {/* List Side */}
        <motion.div style={{ y }} className="lg:w-2/3 flex flex-col gap-4 sm:gap-6">
          {/* Top 3 Prioritized Credentials */}
          {priorityCertifications.map((cert, i) => renderCertCard(cert, i))}

          {/* Expandable Remaining Credentials */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                key="remaining-certs"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden flex flex-col gap-4 sm:gap-6"
              >
                {remainingCertifications.map((cert, i) => renderCertCard(cert, i + 3))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive View More Button */}
          <div className="pt-4 flex justify-center sm:justify-start">
            <motion.button
              type="button"
              onClick={handleToggle}
              onMouseEnter={() => arcadeAudio.playHover()}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-purple-500/30 text-white font-mono text-xs tracking-wider uppercase shadow-[0_0_25px_-5px_rgba(168,85,247,0.25)] hover:border-purple-400 hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all duration-300 cursor-pointer overflow-hidden"
              aria-expanded={isExpanded}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent pointer-events-none" />
              
              <span className="font-semibold text-zinc-200 group-hover:text-purple-300 transition-colors">
                {isExpanded ? "Collapse Credentials" : `View All Certifications (${remainingCertifications.length} More)`}
              </span>

              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-400 transition-transform duration-300"
                animate={{ rotate: isExpanded ? 180 : 0 }}
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </motion.button>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
