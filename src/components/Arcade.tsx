"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { arcadeAudio } from "@/utils/arcadeAudio";
import PixelFootballGame from "./minigames/PixelFootballGame";
import TechFactoryGame from "./minigames/TechFactoryGame";
import TerminalHackerGame from "./minigames/TerminalHackerGame";
import DeveloperVault from "./minigames/DeveloperVault";

interface Cartridge {
  id: "football" | "factory" | "terminal";
  title: string;
  subtitle: string;
  tag: string;
  badge: string;
  badgeKey: string;
  color: string;
  glow: string;
  artIcon: string;
}

const CARTRIDGES: Cartridge[] = [
  {
    id: "football",
    title: "PIXEL FOOTBALL",
    subtitle: "16-Bit Retro Arcade Striker",
    tag: "PHYSICS ENGINE",
    badge: "🏆 Football Champion",
    badgeKey: "badge_football",
    color: "from-red-600 via-amber-500 to-yellow-400",
    glow: "rgba(245, 158, 11, 0.4)",
    artIcon: "⚽"
  },
  {
    id: "factory",
    title: "TECH FACTORY",
    subtitle: "AI Cybernetic Assembly Lab",
    tag: "MODULAR FABRICATION",
    badge: "🤖 AI Architect",
    badgeKey: "badge_ai_engineer",
    color: "from-cyan-500 via-blue-600 to-indigo-700",
    glow: "rgba(6, 182, 212, 0.4)",
    artIcon: "🤖"
  },
  {
    id: "terminal",
    title: "TERMINAL HACKER",
    subtitle: "Matrix Mainframe Shell",
    tag: "CYBER SECURITY",
    badge: "💻 System Breacher",
    badgeKey: "badge_system_hacker",
    color: "from-emerald-500 via-teal-600 to-zinc-900",
    glow: "rgba(16, 185, 129, 0.4)",
    artIcon: "⚡"
  }
];

export default function Arcade() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<"football" | "factory" | "terminal" | "vault" | null>(null);
  const [insertingId, setInsertingId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [badges, setBadges] = useState({
    football: false,
    ai_engineer: false,
    system_hacker: false
  });

  // Sync badges and sound from localStorage
  const refreshBadges = () => {
    if (typeof window === "undefined") return;
    setBadges({
      football: localStorage.getItem("badge_football") === "true",
      ai_engineer: localStorage.getItem("badge_ai_engineer") === "true",
      system_hacker: localStorage.getItem("badge_system_hacker") === "true"
    });
    setIsMuted(arcadeAudio.getMuted());
  };

  useEffect(() => {
    refreshBadges();
  }, [isOpen, activeGame]);

  const handleOpenArcade = () => {
    arcadeAudio.playBoot();
    refreshBadges();
    setIsOpen(true);
  };

  const handleCloseArcade = () => {
    arcadeAudio.playClick();
    setIsOpen(false);
    setActiveGame(null);
    setInsertingId(null);
  };

  const handleSelectCartridge = (id: "football" | "factory" | "terminal") => {
    arcadeAudio.playInsertCartridge();
    setInsertingId(id);

    // Cinematic delay for cartridge insertion into slot
    setTimeout(() => {
      setActiveGame(id);
      setInsertingId(null);
    }, 450);
  };

  const handleToggleMute = () => {
    const muted = arcadeAudio.toggleMute();
    setIsMuted(muted);
  };

  const unlockedCount = Object.values(badges).filter(Boolean).length;

  return (
    <>
      {/* 1. Persistent Floating Quick-Launch Pill (Fixed Bottom Right on whole site) */}
      <motion.button
        onClick={handleOpenArcade}
        onMouseEnter={() => arcadeAudio.playHover()}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-[8000] px-4 py-2.5 rounded-full bg-zinc-950/80 hover:bg-white text-white hover:text-black border border-amber-500/40 hover:border-white shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] backdrop-blur-xl flex items-center gap-2.5 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 group cursor-pointer"
        title="Open Arcade Zone"
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span className="text-amber-400 group-hover:text-black transition-colors">🎮 ARCADE</span>
        {unlockedCount > 0 && (
          <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-black text-[9px] font-black">
            {unlockedCount}/3
          </span>
        )}
      </motion.button>

      {/* 2. Massive Glowing Trigger Button (In Contact Section) */}
      <button
        onClick={handleOpenArcade}
        onMouseEnter={() => arcadeAudio.playHover()}
        className="mt-8 px-8 py-4 rounded-full border border-zinc-700 bg-zinc-900/60 text-white font-medium tracking-[0.2em] hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_45px_rgba(255,255,255,0.4)] uppercase w-full max-w-md mx-auto relative group overflow-hidden"
      >
        {/* Shimmer reflection */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 group-hover:text-black transition-colors">
          <line x1="6" y1="12" x2="10" y2="12"></line>
          <line x1="8" y1="10" x2="8" y2="14"></line>
          <line x1="15" y1="13" x2="15.01" y2="13"></line>
          <line x1="18" y1="11" x2="18.01" y2="11"></line>
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
        </svg>
        <span>ENTER THE ARCADE</span>
        {unlockedCount > 0 && (
          <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-bold">
            {unlockedCount}/3
          </span>
        )}
      </button>

      {/* ARCADE FULLSCREEN CABINET MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[9000] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 md:p-8 overflow-hidden select-none"
          >
            {/* Ambient Background Lighting */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

            {/* TOP HEADER HUD */}
            <div className="relative z-20 w-full max-w-6xl flex items-center justify-between py-2 border-b border-zinc-800/80">
              {/* Cabinet Brand */}
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
                  ARCADE 2.0 // SYSTEM ONLINE
                </span>
              </div>

              {/* Badge Collection Status & Vault Trigger */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono">
                  <span className={badges.football ? "text-amber-400" : "text-zinc-600"}>🏆 15 Goals</span>
                  <span className="text-zinc-700">•</span>
                  <span className={badges.ai_engineer ? "text-cyan-400" : "text-zinc-600"}>🤖 AI Bot</span>
                  <span className="text-zinc-700">•</span>
                  <span className={badges.system_hacker ? "text-emerald-400" : "text-zinc-600"}>💻 Shell</span>
                </div>

                <button
                  onClick={() => {
                    arcadeAudio.playClick();
                    setActiveGame("vault");
                  }}
                  onMouseEnter={() => arcadeAudio.playHover()}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500 hover:to-yellow-400 border border-amber-500/40 text-amber-300 hover:text-black font-mono text-[11px] uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Vault</span>
                  <span>🏆</span>
                </button>

                {/* Sound Toggle */}
                <button
                  onClick={handleToggleMute}
                  onMouseEnter={() => arcadeAudio.playHover()}
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title={isMuted ? "Unmute Sound" : "Mute Sound"}
                >
                  {isMuted ? "🔇" : "🔊"}
                </button>

                {/* Close Cabinet */}
                <button
                  onClick={handleCloseArcade}
                  onMouseEnter={() => arcadeAudio.playHover()}
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500/50 transition-colors cursor-pointer"
                  title="Exit Arcade"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* MAIN STAGE: HUB OR GAME */}
            <div className="relative z-10 w-full max-w-6xl flex-1 flex flex-col items-center justify-center my-4 overflow-hidden">
              {!activeGame ? (
                /* 3D CARTRIDGE SELECTION HUB */
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full flex flex-col items-center justify-center space-y-10"
                >
                  <div className="text-center space-y-3">
                    <span className="text-xs uppercase font-mono tracking-[0.4em] text-cyan-400/90 font-bold block">
                      INSERT CARTRIDGE TO PLAY
                    </span>
                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]">
                      SELECT YOUR CARTRIDGE
                    </h2>
                  </div>

                  {/* Cartridges 3D Shelf */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl px-4">
                    {CARTRIDGES.map((c) => {
                      const isInserting = insertingId === c.id;
                      const hasBadge = badges[c.id === "football" ? "football" : c.id === "factory" ? "ai_engineer" : "system_hacker"];

                      return (
                        <motion.div
                          key={c.id}
                          onClick={() => handleSelectCartridge(c.id)}
                          onMouseEnter={() => arcadeAudio.playHover()}
                          animate={isInserting ? { y: -40, scale: 0.9, opacity: 0 } : { y: 0, scale: 1, opacity: 1 }}
                          whileHover={{ y: -12, scale: 1.03 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          className="relative cursor-pointer group rounded-3xl p-1 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 shadow-2xl border border-zinc-700 hover:border-white transition-all duration-300"
                        >
                          {/* Inner Cartridge Body */}
                          <div className="w-full h-80 rounded-[22px] bg-zinc-950 p-6 flex flex-col justify-between relative overflow-hidden">
                            {/* Metallic Edge Grip Ribs */}
                            <div className="absolute top-0 right-4 flex gap-1 pointer-events-none">
                              {[...Array(6)].map((_, i) => (
                                <div key={i} className="w-1 h-6 bg-zinc-800 rounded-b" />
                              ))}
                            </div>

                            {/* Cartridge Header */}
                            <div className="space-y-1">
                              <span className="text-[9px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                                {c.tag}
                              </span>
                              <div className="pt-2 flex items-center justify-between">
                                <h3 className="text-xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
                                  {c.title}
                                </h3>
                                <span className="text-2xl">{c.artIcon}</span>
                              </div>
                              <p className="text-xs text-zinc-400 font-light">
                                {c.subtitle}
                              </p>
                            </div>

                            {/* Cartridge Art Centerpiece */}
                            <div className={`w-full h-24 rounded-2xl bg-gradient-to-tr ${c.color} p-0.5 shadow-lg group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow`}>
                              <div className="w-full h-full bg-black/60 backdrop-blur-md rounded-[14px] flex items-center justify-center">
                                <span className="text-xs font-mono tracking-widest text-white/90 uppercase font-bold">
                                  {hasBadge ? "★ UNLOCKED" : "INSERT TO PLAY ➔"}
                                </span>
                              </div>
                            </div>

                            {/* Metallic Gold Connector Pins (Bottom) */}
                            <div className="w-full pt-2 flex justify-center gap-1.5 border-t border-zinc-900">
                              {[...Array(12)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-2.5 h-3 bg-amber-500/80 rounded-t-sm shadow-[0_0_5px_rgba(245,158,11,0.5)] group-hover:bg-amber-300 transition-colors"
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                /* ACTIVE GAME DISPLAY CONTAINER */
                <div className="w-full h-full flex flex-col">
                  {/* Sub-Header Back Navigation */}
                  <div className="flex items-center justify-between mb-3 px-2">
                    <button
                      onClick={() => {
                        arcadeAudio.playClick();
                        setActiveGame(null);
                      }}
                      onMouseEnter={() => arcadeAudio.playHover()}
                      className="text-xs uppercase font-mono tracking-widest text-zinc-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>←</span>
                      <span>Eject Cartridge & Return to Shelf</span>
                    </button>

                    <span className="text-xs font-mono text-zinc-500 uppercase">
                      ACTIVE: {activeGame.toUpperCase()}
                    </span>
                  </div>

                  {/* Active Screen Frame */}
                  <div className="flex-1 w-full bg-zinc-950/80 border border-zinc-800 rounded-3xl overflow-hidden relative shadow-[0_0_60px_rgba(0,0,0,0.9)]">
                    {activeGame === "football" && (
                      <PixelFootballGame onUnlockVault={() => setActiveGame("vault")} />
                    )}
                    {activeGame === "factory" && (
                      <TechFactoryGame onUnlockVault={() => setActiveGame("vault")} />
                    )}
                    {activeGame === "terminal" && (
                      <TerminalHackerGame onUnlockVault={() => setActiveGame("vault")} />
                    )}
                    {activeGame === "vault" && (
                      <DeveloperVault
                        onClose={() => setActiveGame(null)}
                        unlockedBadges={Object.entries(badges).filter(([, v]) => v).map(([k]) => k)}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* CABINET BASE FOOTER */}
            <div className="relative z-20 w-full max-w-6xl text-center py-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-600">
                Lakshya Agarwal • Creative Engineering Portfolio • Arcade System 2.0
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
