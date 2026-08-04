"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { arcadeAudio } from "@/utils/arcadeAudio";
import { FuturisticLaunchGlyph, FuturisticSocialLink } from "@/components/ui/FuturisticNavigation";

interface DirectoryItem {
  number: string;
  label: string;
  targetId: string;
  tag: string;
}

const DIRECTORY_ITEMS: DirectoryItem[] = [
  { number: "01", label: "Featured Work", targetId: "projects", tag: "Case Studies" },
  { number: "02", label: "Experience", targetId: "experience", tag: "Engineering & AI" },
  { number: "03", label: "Leadership", targetId: "leadership", tag: "Tech Initiatives" },
  { number: "04", label: "Achievements", targetId: "achievements", tag: "Honors & Awards" },
  { number: "05", label: "Credentials", targetId: "credentials", tag: "Specializations" },
  { number: "06", label: "Tech Stack", targetId: "languages", tag: "Neural & Systems" },
  { number: "07", label: "Global Matrix", targetId: "matrix", tag: "3D Telemetry" },
  { number: "08", label: "Arcade Zone", targetId: "arcade", tag: "4 Minigames" },
];

export default function DashboardMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        arcadeAudio.playClick();
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock scroll or handle click outside when open
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        arcadeAudio.playClick();
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleToggle = () => {
    arcadeAudio.playClick();
    setIsOpen((prev) => !prev);
  };

  const handleNavigate = (targetId: string) => {
    arcadeAudio.playClick();
    setIsOpen(false);

    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. APPLE-INSPIRED DASHBOARD / MENU TRIGGER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        onMouseEnter={() => {
          setIsHovered(true);
          arcadeAudio.playHover();
        }}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        className="fixed top-6 right-6 md:top-8 md:right-8 z-50 group flex items-center justify-center w-11 h-11 rounded-full bg-zinc-950/80 backdrop-blur-2xl border border-white/15 hover:border-cyan-400/60 shadow-[0_4px_25px_rgba(0,0,0,0.6),0_0_20px_-5px_rgba(56,189,248,0.25)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 overflow-hidden select-none"
        aria-label={isOpen ? "Close Navigation Dashboard" : "Open Navigation Dashboard"}
        aria-expanded={isOpen}
        aria-controls="dashboard-menu-panel"
      >
        {/* Subtle Ambient Shimmer Sweep */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent pointer-events-none" />

        {/* Ambient Radial Hover Lighting */}
        <div className="absolute inset-0 bg-radial-gradient from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Three Apple/HIG Inspired Balanced Lines with Morphing Animation */}
        <div className="relative flex flex-col items-center justify-center w-5 h-4 pointer-events-none">
          {/* Top Line */}
          <motion.span
            className="block h-[1.75px] bg-zinc-200 group-hover:bg-cyan-300 rounded-full origin-center transition-colors duration-200"
            animate={
              isOpen
                ? { width: 18, rotate: 45, y: 5.5 }
                : { width: 18, rotate: 0, y: 0 }
            }
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
          />

          {/* Middle Line (Staggered length on rest, smoothly expands on hover, dissolves when open) */}
          <motion.span
            className="block h-[1.75px] bg-zinc-200 group-hover:bg-cyan-300 rounded-full origin-center my-[3.5px] transition-colors duration-200"
            animate={
              isOpen
                ? { width: 0, opacity: 0 }
                : {
                    width: isHovered ? 18 : 12,
                    opacity: 1,
                  }
            }
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
          />

          {/* Bottom Line */}
          <motion.span
            className="block h-[1.75px] bg-zinc-200 group-hover:bg-cyan-300 rounded-full origin-center transition-colors duration-200"
            animate={
              isOpen
                ? { width: 18, rotate: -45, y: -5.5 }
                : { width: 18, rotate: 0, y: 0 }
            }
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
          />
        </div>
      </motion.button>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. APPLE VISIONOS TRANSLUCENT DASHBOARD HUD
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Filter Dismiss Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md cursor-pointer"
              onClick={() => {
                arcadeAudio.playClick();
                setIsOpen(false);
              }}
              aria-hidden="true"
            />

            {/* VisionOS Floating Dashboard Panel */}
            <motion.div
              ref={menuRef}
              id="dashboard-menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Portfolio Navigation & System Dashboard"
              initial={{ opacity: 0, scale: 0.94, y: -16, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, y: -12, filter: "blur(8px)" }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="fixed top-20 right-4 sm:right-6 md:top-24 md:right-8 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[calc(100vh-6.5rem)] overflow-y-auto rounded-3xl bg-zinc-950/90 backdrop-blur-3xl border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.15)] p-5 sm:p-6 text-white"
            >
              {/* Header Telemetry Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
                  </span>
                  <span className="text-[11px] font-mono font-semibold tracking-widest text-cyan-400 uppercase">
                    System Directory
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase">
                  ESC to Dismiss
                </span>
              </div>

              <div className="space-y-4">
                {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    ITEM 1: LAKSHYA (Opens Start Page / Top)
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                <motion.button
                  type="button"
                  onClick={() => handleNavigate("top")}
                  onMouseEnter={() => arcadeAudio.playHover()}
                  whileHover={{ scale: 1.01, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group text-left p-3.5 rounded-2xl bg-white/[0.04] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 group-hover:text-cyan-400 uppercase transition-colors">
                        00 // Start Page
                      </p>
                      <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                        Lakshya Agarwal
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono">
                      <span>HOME</span>
                      <FuturisticLaunchGlyph size={12} color="#22d3ee" />
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 font-light">
                    Return to interactive 3D hero sequence & scrollytelling canvas.
                  </p>
                </motion.button>

                {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    ITEM 2: ABOUT ME (Rich Summary Card)
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                      Profile // Overview
                    </p>
                    <span className="text-[10px] font-mono text-zinc-400">London, UK • Remote</span>
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-200">
                    Creative AI Engineer & Full Stack Architect
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    Operating at the intersection of deep learning, spatial computing, and high-performance web systems. Obsessed with bridging engineering rigor with handcrafted, Apple-grade interface design.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["Next.js", "AI/ML Systems", "Computer Graphics", "Distributed Systems"].map((pill) => (
                      <span
                        key={pill}
                        className="px-2 py-0.5 rounded-full bg-zinc-900/80 border border-white/10 text-[10px] font-mono text-zinc-300"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    ITEM 3: CONTACT ME (Start a Conversation)
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                <motion.div
                  onMouseEnter={() => arcadeAudio.playHover()}
                  className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-zinc-950 to-zinc-950/80 border border-emerald-500/30 shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                      Channel // Open Network
                    </p>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Let&apos;s Build Something Exceptional
                    </h4>
                    <p className="text-xs text-zinc-400 font-light mt-0.5">
                      Open for high-impact engineering leadership & creative collaborations.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <motion.a
                      href="mailto:contact@lakshya.uk"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => arcadeAudio.playClick()}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-400 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:bg-emerald-300 transition-colors cursor-pointer"
                    >
                      <span>Start Conversation</span>
                      <FuturisticLaunchGlyph size={12} color="#000000" />
                    </motion.a>
                    <motion.button
                      type="button"
                      onClick={() => handleNavigate("contact")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-wider cursor-pointer"
                      title="Jump to Contact Section"
                    >
                      #contact
                    </motion.button>
                  </div>
                </motion.div>

                {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    SYSTEM DIRECTORY SECTIONS
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                <div className="pt-2">
                  <p className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase px-1 mb-2">
                    Section Navigation
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {DIRECTORY_ITEMS.map((item) => (
                      <motion.button
                        key={item.targetId}
                        type="button"
                        onClick={() => handleNavigate(item.targetId)}
                        onMouseEnter={() => arcadeAudio.playHover()}
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex flex-col text-left p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.07] border border-white/5 hover:border-white/20 transition-all duration-150 cursor-pointer group"
                      >
                        <span className="text-[9px] font-mono text-cyan-400/80 group-hover:text-cyan-300 font-bold">
                          {`${item.number} // ${item.tag}`}
                        </span>
                        <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors truncate">
                          {item.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Quick Social Links Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FuturisticSocialLink
                      href="https://linkedin.com/in/lakshya-success"
                      type="linkedin"
                      label="LinkedIn"
                      accent="emerald"
                      className="!px-3 !py-1.5 !text-[10px]"
                    />
                    <FuturisticSocialLink
                      href="https://github.com/lak-is-law"
                      type="github"
                      label="GitHub"
                      accent="cyan"
                      className="!px-3 !py-1.5 !text-[10px]"
                    />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600">v2.0 • 2026</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
