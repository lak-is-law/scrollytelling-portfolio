"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVGs / Icons
const LocationIcon = () => (
  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const CornerBracket = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const classes = {
    "top-left": "top-0 left-0 border-t-2 border-l-2 rounded-tl-lg",
    "top-right": "top-0 right-0 border-t-2 border-r-2 rounded-tr-lg",
    "bottom-left": "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg",
    "bottom-right": "bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg",
  };

  return (
    <motion.div
      className={`absolute w-8 h-8 border-cyan-500/50 ${classes[position]}`}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
  );
};

export default function DigitalIdentity() {
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    { id: 0, label: "01 // CORE MISSION" },
    { id: 1, label: "02 // COGNITIVE STACK" },
    { id: 2, label: "03 // PHILOSOPHY" },
  ];

  const stats = [
    "3+ Years Engineering",
    "15+ Projects Shipped",
    "5+ Languages",
    "Multi-Continental"
  ];

  const cognitiveStack = [
    { title: "Deep Learning & Neural Networks", desc: "TensorFlow, PyTorch, transformer architectures" },
    { title: "Heuristic Search & Game AI", desc: "Minimax, Alpha-Beta Pruning, Monte Carlo Tree Search" },
    { title: "Full-Stack Engineering", desc: "React, Next.js, Node.js, Firebase, PostgreSQL" },
    { title: "Systems & Performance", desc: "Algorithm optimization, data structures, low-latency systems" },
    { title: "Data Science & Analytics", desc: "Python, Pandas, statistical modeling, visualization" },
    { title: "Creative Engineering", desc: "UI/UX design, motion design, procedural audio synthesis" },
  ];

  if (!mounted) return null;

  return (
    <section className="relative w-full min-h-screen bg-[#09090b] text-neutral-200 py-24 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl w-full z-10 flex flex-col gap-12">
        {/* Header */}
        <motion.div 
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
            10 // Identity
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">
            Digital Identity
          </h2>
          <div className="text-neutral-400 text-sm font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            Clearance Level: Full Access
          </div>
        </motion.div>

        {/* Identity Card */}
        <motion.div 
          className="relative w-full rounded-2xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Holographic shimmer */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-indigo-500/5 opacity-50 mix-blend-overlay pointer-events-none"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-start md:items-center border-b border-neutral-800/50">
            {/* Corner Brackets */}
            <CornerBracket position="top-left" />
            <CornerBracket position="top-right" />
            <CornerBracket position="bottom-left" />
            <CornerBracket position="bottom-right" />

            {/* Profile Monogram */}
            <div className="relative flex-shrink-0 flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-neutral-950 border border-neutral-800 z-10">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-cyan-500/50"
                  strokeDasharray="20 10 30 10 10 20"
                  animate={{ strokeDashoffset: [0, -100] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-indigo-500/30"
                  strokeDasharray="4 8"
                  animate={{ strokeDashoffset: [100, 0] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
              </svg>
              <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500 tracking-tighter">
                LK
              </span>
            </div>

            {/* Identity Info */}
            <div className="flex flex-col gap-3 z-10 flex-grow">
              <div className="flex flex-col">
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-wider uppercase">
                  Lakshya Agarwal
                </h3>
                <p className="text-cyan-400 font-mono text-sm md:text-base tracking-widest uppercase">
                  Creative AI Engineer
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  STATUS: AVAILABLE FOR OPPORTUNITIES
                </div>
                <div className="flex items-center text-neutral-400 text-xs font-mono uppercase">
                  <LocationIcon />
                  Chennai, India
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Tabs Section */}
          <div className="relative p-6 sm:p-10 bg-neutral-950/50">
            {/* Tabs List */}
            <div className="flex overflow-x-auto gap-2 mb-8 border-b border-neutral-800/50 pb-px [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-3 text-xs sm:text-sm font-mono whitespace-nowrap transition-colors outline-none focus:outline-none ${
                    activeTab === tab.id ? "text-cyan-400" : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[250px] relative">
              <AnimatePresence mode="wait">
                {activeTab === 0 && (
                  <motion.div
                    key="tab0"
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                    className="text-neutral-300 text-base md:text-lg leading-relaxed font-light"
                  >
                    <p>
                      Bridging the gap between artificial intelligence research and production-grade user experiences. 
                      I architect systems where cognitive agents, heuristic search algorithms, and neural inference engines 
                      converge with ultra-responsive, handcrafted interfaces — creating software that doesn&apos;t just function, 
                      but feels intentional and alive.
                    </p>
                  </motion.div>
                )}

                {activeTab === 1 && (
                  <motion.div
                    key="tab1"
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {cognitiveStack.map((item, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                        className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800/80 group hover:border-cyan-500/30 transition-colors"
                      >
                        <h4 className="text-cyan-100 text-sm font-semibold mb-1 group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                        <p className="text-neutral-500 text-xs font-mono">{item.desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 2 && (
                  <motion.div
                    key="tab2"
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                    className="text-neutral-300 text-base md:text-lg leading-relaxed font-light"
                  >
                    <p>
                      Software shouldn&apos;t just function. It should feel intentional, precise, and handcrafted. 
                      Every pixel matters. Every interaction should make the user smile. I don&apos;t build minimum 
                      viable products — I build experiences that set standards. The difference between good software 
                      and great software is obsession with detail.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Telemetry Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-neutral-800/50 bg-neutral-950/80 divide-x divide-y md:divide-y-0 divide-neutral-800/50">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 flex items-center justify-center text-center">
                <span className="text-neutral-400 font-mono text-[10px] sm:text-xs tracking-widest uppercase">
                  {stat}
                </span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
