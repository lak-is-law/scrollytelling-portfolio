"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { arcadeAudio } from "@/utils/arcadeAudio";

export type LegalDocType = "privacy" | "terms" | "sitemap" | null;

interface LegalModalProps {
  type: LegalDocType;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  const handleClose = () => {
    arcadeAudio.playClick();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-zinc-950/95 border border-white/15 p-6 sm:p-10 shadow-[0_0_80px_rgba(0,0,0,0.95)] text-white focus:outline-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <span className="text-xs font-mono font-medium uppercase tracking-widest text-emerald-400">
              LAKSHYA.UK // LEGAL & DIRECTORY
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-zinc-900 border border-white/15 hover:border-emerald-400 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              ✕
            </button>
          </div>

          {/* Privacy Policy Content */}
          {type === "privacy" && (
            <div className="space-y-6 text-zinc-300 font-light text-sm sm:text-base leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Privacy Policy
              </h2>
              <p className="text-xs font-mono text-zinc-400">Last updated: October 2026</p>
              
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 text-sm">
                <strong>Zero Surveillance Philosophy:</strong> lakshya.uk is designed from first principles with client-side privacy. No tracking cookies, no fingerprinting scripts, and zero advertising pixels are ever executed.
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1. Information We Do Not Collect</h3>
                <p>
                  We do not collect personal identities, physical locations, or tracking beacons. All computer vision and audio analysis runs locally on your device via client-side WebAssembly (MediaPipe WASM) and the Web Audio API without uploading video or audio streams.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2. Local Browser Storage</h3>
                <p>
                  The platform utilizes client-side <code className="text-emerald-300 font-mono text-xs">localStorage</code> solely to preserve user preferences such as background ambient music mute states and interactive game scores. This data never leaves your device.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">3. Direct Correspondence</h3>
                <p>
                  If you choose to initiate outreach via <code className="text-emerald-300 font-mono text-xs">contact@lakshya.uk</code>, your email address is used exclusively for professional correspondence and is never sold or shared.
                </p>
              </div>
            </div>
          )}

          {/* Terms of Use Content */}
          {type === "terms" && (
            <div className="space-y-6 text-zinc-300 font-light text-sm sm:text-base leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Terms of Use
              </h2>
              <p className="text-xs font-mono text-zinc-400">Last updated: October 2026</p>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1. Intellectual Property</h3>
                <p>
                  All engineering architectures, custom canvas shaders, WebGL engines, and written technical case studies on lakshya.uk are created by Lakshya Agarwal unless otherwise attributed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2. Independent Non-Commercial Works</h3>
                <p>
                  Projects such as the Spider-Verse AR Portal and Los Santos Portfolio are independent, non-commercial engineering experiments created for educational and technical portfolio demonstration purposes. All respective third-party trademarks remain the property of their rightful owners.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">3. Fair Use & Open Source</h3>
                <p>
                  Public repositories are available on GitHub under their respective licenses. Verification credentials and academic research citations are published for authentic review.
                </p>
              </div>
            </div>
          )}

          {/* Site Map Content */}
          {type === "sitemap" && (
            <div className="space-y-6 text-zinc-300 font-light text-sm sm:text-base leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Site Map
              </h2>
              <p className="text-xs font-mono text-zinc-400">Index of all portfolio directories and live deployments</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Primary Sections
                  </h3>
                  <ul className="text-sm space-y-1.5 text-zinc-300">
                    <li><a href="#projects" onClick={handleClose} className="hover:text-white underline">03 // Featured Projects</a></li>
                    <li><a href="#research" onClick={handleClose} className="hover:text-white underline">04 // Applied Research</a></li>
                    <li><a href="#experience" onClick={handleClose} className="hover:text-white underline">05 // Professional Experience</a></li>
                    <li><a href="#leadership" onClick={handleClose} className="hover:text-white underline">06 // Leadership</a></li>
                    <li><a href="#achievements" onClick={handleClose} className="hover:text-white underline">07 // Pinnacle Honors</a></li>
                    <li><a href="#credentials" onClick={handleClose} className="hover:text-white underline">08 // Verified Credentials</a></li>
                    <li><a href="#languages" onClick={handleClose} className="hover:text-white underline">09 // Tech Stack Arsenal</a></li>
                    <li><a href="#matrix" onClick={handleClose} className="hover:text-white underline">10 // Global Telemetry</a></li>
                    <li><a href="#arcade" onClick={handleClose} className="hover:text-white underline">11 // Arcade Zone</a></li>
                    <li><a href="#contact" onClick={handleClose} className="hover:text-white underline">12 // Open Network</a></li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Ecosystem & Live Nodes
                  </h3>
                  <ul className="text-sm space-y-1.5 text-zinc-300 font-mono text-xs">
                    <li><a href="https://resume.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">resume.lakshya.uk ↗</a></li>
                    <li><a href="https://locate.art.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">locate.art.lakshya.uk ↗</a></li>
                    <li><a href="https://trackyourflight.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">trackyourflight.lakshya.uk ↗</a></li>
                    <li><a href="https://todar.finance.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">todar.finance.lakshya.uk ↗</a></li>
                    <li><a href="https://spiderverse.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">spiderverse.lakshya.uk ↗</a></li>
                    <li><a href="https://jinn.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">jinn.lakshya.uk ↗</a></li>
                    <li><a href="https://craftme.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">craftme.lakshya.uk ↗</a></li>
                    <li><a href="https://redgambit.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">redgambit.lakshya.uk ↗</a></li>
                    <li><a href="https://gta.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">gta.lakshya.uk ↗</a></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Footer Close */}
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-emerald-300 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
