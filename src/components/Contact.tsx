"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FuturisticSocialLink, FuturisticLaunchGlyph } from "@/components/ui/FuturisticNavigation";
import { arcadeAudio } from "@/utils/arcadeAudio";
import LegalModal, { LegalDocType } from "@/components/ui/LegalModal";

export default function Contact() {
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);

  const openLegal = (type: LegalDocType) => {
    arcadeAudio.playClick();
    setLegalDoc(type);
  };

  return (
    <>
      <footer id="contact" className="relative bg-transparent pt-20 md:pt-32 pb-12 px-4 sm:px-6 md:px-24 border-t border-white/[0.08] overflow-hidden">
        {/* Signature Ambient Bloom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10 flex flex-col space-y-16 md:space-y-24">
          
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              HERO CALL TO ACTION
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="text-center space-y-6 md:space-y-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 text-sm font-medium tracking-widest text-emerald-400 uppercase">
              <span>12 // Open Network</span>
              <div className="h-px w-12 bg-emerald-500/30" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
              Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">exceptional.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
              I build sophisticated software, high-performance graphics engines, and applied AI systems. If you share that philosophy, my inbox is open.
            </p>

            {/* Futuristic Command CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <motion.a 
                href="mailto:contact@lakshya.uk" 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => arcadeAudio.playHover()}
                onClick={() => arcadeAudio.playClick()}
                className="group relative inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-white text-black font-mono font-bold tracking-wider uppercase text-sm shadow-[0_0_40px_rgba(255,255,255,0.35),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />

                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,1)]" />
                </span>

                <span>Start a Conversation</span>
                <FuturisticLaunchGlyph size={16} color="#000000" />
              </motion.a>

              <motion.a 
                href="https://resume.lakshya.uk"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => arcadeAudio.playHover()}
                onClick={() => arcadeAudio.playClick()}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/15 text-zinc-200 font-mono text-sm tracking-wider uppercase hover:border-cyan-400 hover:text-white transition-all duration-300 cursor-pointer"
              >
                <span>Interactive Résumé ↗</span>
              </motion.a>
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              APPLE-INSPIRED 5-COLUMN DIRECTORY GRID
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="pt-12 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-xs font-mono">
            {/* Column 1: Navigation */}
            <div className="space-y-3">
              <h4 className="text-zinc-100 font-semibold tracking-wider uppercase text-[11px] pb-1 border-b border-white/5">
                Navigation
              </h4>
              <ul className="space-y-2 text-zinc-400 font-light">
                <li><a href="#" className="hover:text-emerald-300 transition-colors">Top // Manifesto</a></li>
                <li><a href="#projects" className="hover:text-emerald-300 transition-colors">03 // Featured Projects</a></li>
                <li><a href="#research" className="hover:text-emerald-300 transition-colors">04 // Applied Research</a></li>
                <li><a href="#experience" className="hover:text-emerald-300 transition-colors">05 // Experience</a></li>
                <li><a href="#leadership" className="hover:text-emerald-300 transition-colors">06 // Leadership</a></li>
                <li><a href="#achievements" className="hover:text-emerald-300 transition-colors">07 // Honors & Awards</a></li>
                <li><a href="#credentials" className="hover:text-emerald-300 transition-colors">08 // Verified Credentials</a></li>
                <li><a href="#languages" className="hover:text-emerald-300 transition-colors">09 // Tech Arsenal</a></li>
                <li><a href="#matrix" className="hover:text-emerald-300 transition-colors">10 // Global Matrix</a></li>
                <li><a href="#arcade" className="hover:text-emerald-300 transition-colors">11 // Interactive Arcade</a></li>
              </ul>
            </div>

            {/* Column 2: Selected Systems */}
            <div className="space-y-3">
              <h4 className="text-zinc-100 font-semibold tracking-wider uppercase text-[11px] pb-1 border-b border-white/5">
                Systems & Projects
              </h4>
              <ul className="space-y-2 text-zinc-400 font-light">
                <li><a href="https://locate.art.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">Locate Art // GIS</a></li>
                <li><a href="https://trackyourflight.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">Skyward // Radar</a></li>
                <li><a href="https://todar.finance.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">Todar 2.0 // FinTech</a></li>
                <li><a href="https://spiderverse.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">Spider-Verse // AR</a></li>
                <li><a href="https://jinn.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">Jinn // Cognitive AI</a></li>
                <li><a href="https://craftme.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">CraftMe // 3D Voxel</a></li>
                <li><a href="https://redgambit.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">Red Gambit // Minimax</a></li>
                <li><a href="https://elevatehub-1.web.app" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">ElevateHub // Network</a></li>
                <li><a href="https://gta.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors">Los Santos // GTA Dossier</a></li>
              </ul>
            </div>

            {/* Column 3: Research Foundations */}
            <div className="space-y-3">
              <h4 className="text-zinc-100 font-semibold tracking-wider uppercase text-[11px] pb-1 border-b border-white/5">
                Research & AI
              </h4>
              <ul className="space-y-2 text-zinc-400 font-light">
                <li><a href="#research" className="hover:text-purple-300 transition-colors">SRMIST Rockfall ML</a></li>
                <li><a href="#research" className="hover:text-purple-300 transition-colors">Edge Neural Inference</a></li>
                <li><a href="#research" className="hover:text-purple-300 transition-colors">Distributed ADS-B Telemetry</a></li>
                <li><a href="#research" className="hover:text-purple-300 transition-colors">Zobrist Hashing Minimax</a></li>
                <li><a href="#research" className="hover:text-purple-300 transition-colors">MediaPipe WASM & 1-Euro</a></li>
                <li><a href="#research" className="hover:text-purple-300 transition-colors">Great-Circle Geodesics</a></li>
                <li><a href="#credentials" className="hover:text-purple-300 transition-colors">Agentic AI Copilot SDK</a></li>
                <li><a href="#credentials" className="hover:text-purple-300 transition-colors">NTU Complexity Science</a></li>
              </ul>
            </div>

            {/* Column 4: Ecosystem & Live Domains */}
            <div className="space-y-3">
              <h4 className="text-zinc-100 font-semibold tracking-wider uppercase text-[11px] pb-1 border-b border-white/5">
                Live Ecosystem
              </h4>
              <ul className="space-y-2 text-zinc-400 font-light">
                <li>
                  <a href="https://resume.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 font-semibold text-emerald-400">
                    <span>resume.lakshya.uk</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://locate.art.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>locate.art.lakshya.uk</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://trackyourflight.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>trackyourflight.lakshya.uk</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://todar.finance.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>todar.finance.lakshya.uk</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://spiderverse.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>spiderverse.lakshya.uk</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://jinn.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>jinn.lakshya.uk</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://craftme.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>craftme.lakshya.uk</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </li>
                <li>
                  <a href="https://gta.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>gta.lakshya.uk</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: Connect */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="text-zinc-100 font-semibold tracking-wider uppercase text-[11px] pb-1 border-b border-white/5">
                Direct Channels
              </h4>
              <ul className="space-y-2 text-zinc-400 font-light">
                <li>
                  <a href="mailto:contact@lakshya.uk" className="hover:text-white transition-colors text-zinc-200">
                    contact@lakshya.uk
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/lakshya-success" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a href="https://github.com/lak-is-law" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                    GitHub ↗
                  </a>
                </li>
                <li>
                  <span className="text-zinc-500">Based in Chennai, India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              APPLE-GRADE BOTTOM LEGAL & REGIONAL BAR
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center text-xs font-mono text-zinc-500 gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
              <p>© {new Date().getFullYear()} LAKSHYA AGARWAL. ALL RIGHTS RESERVED.</p>
              <div className="flex items-center gap-3 text-zinc-400">
                <button
                  type="button"
                  onClick={() => openLegal("privacy")}
                  className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Privacy Policy
                </button>
                <span className="text-zinc-600">|</span>
                <button
                  type="button"
                  onClick={() => openLegal("terms")}
                  className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Terms of Use
                </button>
                <span className="text-zinc-600">|</span>
                <button
                  type="button"
                  onClick={() => openLegal("sitemap")}
                  className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Site Map
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>India (Global)</span>
              </div>

              {/* Social Pills */}
              <div className="flex gap-2 items-center">
                <FuturisticSocialLink
                  href="https://linkedin.com/in/lakshya-success"
                  type="linkedin"
                  label="LinkedIn"
                  accent="emerald"
                />
                <FuturisticSocialLink
                  href="https://github.com/lak-is-law"
                  type="github"
                  label="GitHub"
                  accent="cyan"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive In-Place Legal Modal */}
      <LegalModal type={legalDoc} onClose={() => setLegalDoc(null)} />
    </>
  );
}
