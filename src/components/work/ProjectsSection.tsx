"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LocateArt from "@/components/work/LocateArt";
import TrackYourFlight from "@/components/work/TrackYourFlight";
import Todar from "@/components/work/Todar";
import SpiderVerse from "@/components/work/SpiderVerse";
import Jinn from "@/components/work/Jinn";
import CraftMe from "@/components/work/CraftMe";
import RedGambit from "@/components/work/RedGambit";
import ElevateHub from "@/components/work/ElevateHub";
import GtaPortfolio from "@/components/work/GtaPortfolio";
import { arcadeAudio } from "@/utils/arcadeAudio";

export default function ProjectsSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    arcadeAudio.playClick();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TOP 3 PRIORITY SHOWCASE (Locate Art, Skyward, Todar)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <LocateArt />
      <TrackYourFlight />
      <Todar />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          EXPANDABLE ARCHIVE DRAWER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="expanded-projects"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <SpiderVerse />
            <Jinn />
            <CraftMe />
            <RedGambit />
            <ElevateHub />
            <GtaPortfolio />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          INTERACTIVE "VIEW MORE / COLLAPSE" CONTROL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative z-30 py-12 flex justify-center items-center px-4">
        <motion.button
          type="button"
          onClick={handleToggle}
          onMouseEnter={() => arcadeAudio.playHover()}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="group relative inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-zinc-950/80 backdrop-blur-2xl border border-cyan-500/30 text-white font-mono text-sm tracking-wider uppercase shadow-[0_0_35px_-5px_rgba(6,182,212,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:border-cyan-400 hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] transition-all duration-300 cursor-pointer overflow-hidden"
          aria-expanded={isExpanded}
        >
          {/* Shimmer sweep */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none" />

          {/* Pulse Indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,1)]" />
          </span>

          <span className="font-semibold text-zinc-100 group-hover:text-cyan-300 transition-colors">
            {isExpanded ? "Collapse Projects" : "View All Projects (6 More)"}
          </span>

          {/* Morphing Animated Chevron */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cyan-400 transition-transform duration-300"
            animate={{ rotate: isExpanded ? 180 : 0 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </motion.button>
      </div>
    </div>
  );
}
