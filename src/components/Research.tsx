"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { arcadeAudio } from "@/utils/arcadeAudio";

interface ResearchProject {
  id: string;
  badge: string;
  title: string;
  affiliation: string;
  guide?: string;
  abstract: string;
  methodology: string[];
  metrics: string;
  status: string;
  tags: string[];
  accentColor: "cyan" | "emerald" | "purple" | "amber";
}

const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: "rockfall",
    badge: "AI & Geological Hazard Mitigation",
    title: "Rockfall Risk Mitigation: Predictive Machine Learning & Sensor Fusion",
    affiliation: "SRM School of Computing, SRMIST",
    guide: "Guided by Dr. Abirami G., Associate Professor",
    abstract:
      "Developing an advanced Machine Learning predictive model utilizing geological sensor telemetry, environmental precipitation metrics, and multi-modal terrain slope analysis to forecast hazardous rockfall risks before critical infrastructure damage occurs.",
    methodology: [
      "Terrain Slope Gradient Extraction & Geological GIS Mapping",
      "Gradient Boosting & Random Forest Multi-Sensor Ensembles",
      "SHAP Interpretability for Critical Geological Feature Attribution",
      "Real-Time Warning Threshold Optimization for Mountain Transit Corridors"
    ],
    metrics: "High Recall Hazard Classification • Active Academic Investigation",
    status: "ONGOING INVESTIGATION",
    tags: ["Machine Learning", "Hazard Mitigation", "Sensor Fusion", "Geological GIS", "Python"],
    accentColor: "emerald",
  },
  {
    id: "flight-telemetry",
    badge: "Distributed Systems & 3D Geodesics",
    title: "High-Throughput Global Flight Telemetry & Spherical Projection Math",
    affiliation: "Skyward Architecture Research",
    abstract:
      "Engineered real-time edge ingestion endpoints consuming ADS-B transponder telemetry across 12,000+ simultaneous global aircraft, paired with a custom zero-dependency 3D canvas rendering engine executing great-circle geodesic flight paths and 9,000-point Fibonacci spheres at locked 60 FPS in a bundle under 50KB.",
    methodology: [
      "Great-Circle Geodesic Spherical Trigonometry & Arc Interpolation",
      "9,000-Point Uniform Fibonacci Lattice Generation on HTML5 Canvas",
      "High-Frequency ADS-B Transponder Stream Parsing & Coordinate Caching",
      "Zero-DOM Re-render Architecture for High Frame-Rate Visualization"
    ],
    metrics: "12,000+ Active Aircraft • <50KB Engine • Locked 60 FPS",
    status: "DEPLOYED SYSTEM",
    tags: ["Distributed Telemetry", "Geodesic Math", "Canvas API", "ADS-B", "Vanilla JS"],
    accentColor: "cyan",
  },
  {
    id: "edge-ai",
    badge: "Edge Inference & Data Privacy",
    title: "Client-Side Edge AI for Financial Anomaly Detection & Privacy",
    affiliation: "Todar Neural Architecture Subsystem",
    abstract:
      "Implemented lightweight neural network models running entirely client-side in browser memory via TensorFlow.js to perform real-time spending anomaly detection with zero telemetry egress, safeguarding sensitive user banking records.",
    methodology: [
      "In-Browser Tensor Operations via WebGL Backend Accelerators",
      "Quantized Heuristic Vectors for Personal Spending Anomaly Scoring",
      "Zero-Telemetry Client-Side Data Isolation Architecture",
      "Sub-15ms Local Inference Latency on Low-Power Mobile Hardware"
    ],
    metrics: "100% Client-Side Privacy • Zero Network Egress • <15ms Inference",
    status: "PRODUCTION ENGINE",
    tags: ["TensorFlow.js", "Edge Inference", "Anomaly Detection", "Client Privacy", "TypeScript"],
    accentColor: "emerald",
  },
  {
    id: "adversarial-ai",
    badge: "Adversarial Search & Decision Theory",
    title: "Cognitive Game-Tree Optimization & Adversarial AI Systems",
    affiliation: "Red Gambit Engine Research",
    abstract:
      "Investigated multi-tier game-tree optimization techniques, synthesizing KataGo deep neural evaluations with Stockfish minimax search, alpha-beta pruning with iterative deepening, and Zobrist hash transposition tables to evaluate real-time strategic cognition under strict time bounds.",
    methodology: [
      "Minimax Search Tree with Heuristic Move Ordering",
      "Alpha-Beta Pruning with Iterative Deepening Search",
      "64-Bit Zobrist Hashing for O(1) Transposition Table Lookups",
      "Dual KataGo & Stockfish Neural Evaluation Blending"
    ],
    metrics: "O(1) Transposition Lookups • Real-Time Heuristic Depth",
    status: "PUBLISHED ENGINE",
    tags: ["Minimax", "Alpha-Beta Pruning", "Zobrist Hashing", "KataGo", "Stockfish"],
    accentColor: "cyan",
  },
  {
    id: "spiderverse-ar",
    badge: "Spatial Computing & Computer Vision",
    title: "GPU-Accelerated Spatial Deformation & Edge Computer Vision",
    affiliation: "Spider-Verse AR Engineering Lab",
    abstract:
      "Developed a privacy-preserving augmented reality pipeline executing local MediaPipe hand tracking compiled to WebAssembly, paired with 1-Euro temporal smoothing filters and dynamic 20×20 bilinear Three.js mesh warping with procedural GLSL halftone and bloom shaders.",
    methodology: [
      "Local WASM MediaPipe Hand Landmarker (0 External Network Requests)",
      "1-Euro Temporal Adaptive Low-Pass Filter for Jitter Elimination",
      "Bilinear 20×20 Grid Mesh Deformation with Distance-Anchored Corners",
      "Web Audio API Bass Frequency Reactive Uniforms for Dynamic Bloom"
    ],
    metrics: "100% Local WASM Inference • Locked 60 FPS • Real-Time GLSL",
    status: "EXPERIMENT COMPLETED",
    tags: ["MediaPipe WASM", "Three.js", "GLSL Shaders", "1-Euro Filter", "Web Audio API"],
    accentColor: "purple",
  },
];

const ACCENT_STYLES = {
  emerald: {
    border: "border-emerald-500/20 hover:border-emerald-400/50",
    glow: "shadow-[0_0_40px_-10px_rgba(16,185,129,0.15)] hover:shadow-[0_0_50px_rgba(16,185,129,0.3)]",
    tagText: "text-emerald-400",
    pillBg: "bg-emerald-950/40 text-emerald-300 border-emerald-500/30",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
  cyan: {
    border: "border-cyan-500/20 hover:border-cyan-400/50",
    glow: "shadow-[0_0_40px_-10px_rgba(6,182,212,0.15)] hover:shadow-[0_0_50px_rgba(6,182,212,0.3)]",
    tagText: "text-cyan-400",
    pillBg: "bg-cyan-950/40 text-cyan-300 border-cyan-500/30",
    badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  },
  purple: {
    border: "border-purple-500/20 hover:border-purple-400/50",
    glow: "shadow-[0_0_40px_-10px_rgba(168,85,247,0.15)] hover:shadow-[0_0_50px_rgba(168,85,247,0.3)]",
    tagText: "text-purple-400",
    pillBg: "bg-purple-950/40 text-purple-300 border-purple-500/30",
    badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  },
  amber: {
    border: "border-amber-500/20 hover:border-amber-400/50",
    glow: "shadow-[0_0_40px_-10px_rgba(245,158,11,0.15)] hover:shadow-[0_0_50px_rgba(245,158,11,0.3)]",
    tagText: "text-amber-400",
    pillBg: "bg-amber-950/40 text-amber-300 border-amber-500/30",
    badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  },
};

export default function Research() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedResearch, setSelectedResearch] = useState<ResearchProject | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section
      ref={containerRef}
      id="research"
      className="relative bg-transparent py-20 md:py-32 px-4 sm:px-6 md:px-24 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Signature Ambient Bloom */}
      <div className="absolute top-1/3 left-1/3 w-[700px] h-[500px] bg-cyan-500/[0.05] rounded-full blur-[170px] pointer-events-none" />

      <div className="mx-auto max-w-7xl w-full flex flex-col lg:flex-row gap-12 lg:gap-16 relative z-10">
        {/* Header Column */}
        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-cyan-400 uppercase mb-4 md:mb-6">
              <span>06 // Research & Publications</span>
              <div className="h-px w-12 bg-cyan-500/30" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-4 md:mb-6 leading-tight">
              Applied<br className="hidden sm:inline" /> Research.
            </h2>

            <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed mb-6">
              Investigating applied machine learning, edge neural inference, distributed telemetry pipelines, and real-time GPU spatial deformation.
            </p>

            <div className="hidden lg:flex flex-col gap-3 pt-4 border-t border-white/10 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active Research Assistant @ SRMIST</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Edge Inference & Privacy-First AI</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Procedural Graphics & Spatial Math</span>
              </div>
            </div>
          </div>
        </div>

        {/* Research List Column */}
        <motion.div style={{ y }} className="lg:w-2/3 flex flex-col gap-6">
          {RESEARCH_PROJECTS.map((item, index) => {
            const styles = ACCENT_STYLES[item.accentColor];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => {
                  arcadeAudio.playClick();
                  setSelectedResearch(item);
                }}
                className={`group relative p-6 sm:p-8 rounded-3xl bg-zinc-950/40 backdrop-blur-2xl border ${styles.border} ${styles.glow} transition-all duration-500 cursor-pointer overflow-hidden`}
              >
                {/* Subtle Hover Gradient Sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${styles.badgeBg}`}>
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-mono px-3 py-0.5 rounded-full border border-zinc-700/60 bg-zinc-900/60 text-zinc-400">
                    {item.status}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-cyan-200 transition-colors mb-2">
                  {item.title}
                </h3>

                <div className="text-sm font-mono text-zinc-400 mb-4 flex flex-wrap items-center gap-2">
                  <span>{item.affiliation}</span>
                  {item.guide && (
                    <>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-300">{item.guide}</span>
                    </>
                  )}
                </div>

                <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed mb-6">
                  {item.abstract}
                </p>

                {/* Key Methodologies Highlight */}
                <div className="space-y-2 mb-6 p-4 rounded-2xl bg-black/40 border border-white/5">
                  <p className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                    Core Methodologies & Architecture
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300 font-light">
                    {item.methodology.map((m, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2">
                        <span className={`mt-1 h-1 w-1 rounded-full ${styles.tagText} shrink-0`} />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags & Action Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-xs font-mono border backdrop-blur-sm ${styles.pillBg}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Inspect Details</span>
                    <span>→</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          INTERACTIVE RESEARCH DETAIL MODAL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {selectedResearch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                arcadeAudio.playClick();
                setSelectedResearch(null);
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-zinc-950/95 border border-white/15 p-6 sm:p-10 shadow-[0_0_80px_rgba(0,0,0,0.9)] text-white focus:outline-none"
            >
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                <span className="text-xs font-mono font-medium uppercase tracking-widest text-cyan-400">
                  {selectedResearch.badge}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    arcadeAudio.playClick();
                    setSelectedResearch(null);
                  }}
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-white/15 hover:border-cyan-400 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Research Modal"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold mb-3 leading-snug">
                {selectedResearch.title}
              </h3>

              <div className="text-sm font-mono text-zinc-400 mb-6 space-y-1">
                <p>{selectedResearch.affiliation}</p>
                {selectedResearch.guide && <p className="text-cyan-300">{selectedResearch.guide}</p>}
                <p className="text-xs text-zinc-500 pt-1">Status: {selectedResearch.status}</p>
              </div>

              <div className="space-y-6 text-zinc-300 font-light text-base leading-relaxed">
                <div>
                  <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white mb-2">
                    Abstract & Scientific Context
                  </h4>
                  <p>{selectedResearch.abstract}</p>
                </div>

                <div>
                  <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white mb-2">
                    Methodologies & Algorithmic Pipelines
                  </h4>
                  <ul className="space-y-2 list-disc list-inside">
                    {selectedResearch.methodology.map((m, i) => (
                      <li key={i} className="text-zinc-300">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white mb-2">
                    Telemetry & Empirical Outcomes
                  </h4>
                  <p className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 font-mono text-sm text-cyan-300">
                    {selectedResearch.metrics}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    arcadeAudio.playClick();
                    setSelectedResearch(null);
                  }}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
