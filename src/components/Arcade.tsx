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
  iconType: "football" | "factory" | "terminal";
}

const CARTRIDGES: Cartridge[] = [
  {
    id: "football",
    title: "PIXEL FOOTBALL",
    subtitle: "16-Bit Retro Arcade Striker",
    tag: "PHYSICS ENGINE",
    badge: "Football Champion",
    badgeKey: "badge_football",
    color: "from-red-600 via-amber-500 to-yellow-400",
    glow: "rgba(245, 158, 11, 0.4)",
    iconType: "football"
  },
  {
    id: "factory",
    title: "TECH FACTORY",
    subtitle: "AI Cybernetic Assembly Lab",
    tag: "MODULAR FABRICATION",
    badge: "AI Architect",
    badgeKey: "badge_ai_engineer",
    color: "from-cyan-500 via-blue-600 to-indigo-700",
    glow: "rgba(6, 182, 212, 0.4)",
    iconType: "factory"
  },
  {
    id: "terminal",
    title: "TERMINAL HACKER",
    subtitle: "Matrix Mainframe Shell",
    tag: "CYBER SECURITY",
    badge: "System Breacher",
    badgeKey: "badge_system_hacker",
    color: "from-emerald-500 via-teal-600 to-zinc-900",
    glow: "rgba(16, 185, 129, 0.4)",
    iconType: "terminal"
  }
];

function CartridgeSvg({ type, size = 28 }: { type: string; size?: number }) {
  switch (type) {
    case "football":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
          <circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>
        </svg>
      );
    case "factory":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
          <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8.5 9h7"/><path d="M8.5 15h7"/><path d="M9 8.5v7"/><path d="M15 8.5v7"/>
        </svg>
      );
    case "terminal":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
          <polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>
        </svg>
      );
    default:
      return null;
  }
}

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

  // Ensure fresh progress (0) on every reload and sync audio state
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("football_highscore");
        localStorage.removeItem("badge_football");
        localStorage.removeItem("badge_ai_engineer");
        localStorage.removeItem("badge_system_hacker");
        localStorage.removeItem("badge_frontend_architect");
        localStorage.removeItem("badge_stack_master");
        localStorage.removeItem("arsenal_xp");
      } catch {}
    }
    setIsMuted(arcadeAudio.getMuted());
  }, []);

  const handleOpenArcade = () => {
    arcadeAudio.playBoot();
    setIsMuted(arcadeAudio.getMuted());
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
      {/* 1. Congruent Circular Arcade Launcher Button (Same size as audio visualizer & vertically stacked right above audio icon) */}
      <motion.div
        onClick={handleOpenArcade}
        onMouseEnter={() => arcadeAudio.playHover()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed bottom-20 right-6 md:bottom-28 md:right-12 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-white/10 transition-colors group hover-magnetic"
        title="Open Arcade Machine"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white group-hover:text-amber-400 transition-colors"
        >
          <line x1="6" y1="12" x2="10" y2="12"></line>
          <line x1="8" y1="10" x2="8" y2="14"></line>
          <line x1="15" y1="13" x2="15.01" y2="13"></line>
          <line x1="18" y1="11" x2="18.01" y2="11"></line>
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
        </svg>

        {/* Small subtle amber badge count badge */}
        {unlockedCount > 0 && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-amber-400 text-black text-[8px] font-black flex items-center justify-center border border-black">
            {unlockedCount}
          </span>
        )}
      </motion.div>

      {/* 2. Massive Glowing Trigger Button (In Contact Section) */}
      <button
        onClick={handleOpenArcade}
        onMouseEnter={() => arcadeAudio.playHover()}
        className="mt-8 px-8 py-4 rounded-full border border-zinc-700 bg-zinc-900/60 text-white font-medium tracking-[0.2em] hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_45px_rgba(255,255,255,0.4)] uppercase w-full max-w-md mx-auto relative group overflow-hidden cursor-pointer"
      >
        {/* Shimmer reflection */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 group-hover:text-black transition-colors">
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
            className="fixed inset-0 z-[9000] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-2 sm:p-4 md:p-8 overflow-hidden select-none"
          >
            {/* Ambient Background Lighting */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

            {/* TOP HEADER HUD */}
            <div className="relative z-20 w-full max-w-6xl flex items-center justify-between py-1.5 sm:py-2 border-b border-zinc-800/80">
              {/* Cabinet Brand */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-zinc-400">
                  ARCADE 2.0 // SYSTEM ONLINE
                </span>
              </div>

              {/* Badge Collection Status & Vault Trigger */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono">
                  <span className={`flex items-center gap-1.5 ${badges.football ? "text-amber-400 font-semibold" : "text-zinc-600"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><circle cx="12" cy="12" r="4"/></svg>
                    <span>15 Goals</span>
                  </span>
                  <span className="text-zinc-700">•</span>
                  <span className={`flex items-center gap-1.5 ${badges.ai_engineer ? "text-cyan-400 font-semibold" : "text-zinc-600"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8.5 9h7"/><path d="M8.5 15h7"/><path d="M9 8.5v7"/><path d="M15 8.5v7"/></svg>
                    <span>AI Bot</span>
                  </span>
                  <span className="text-zinc-700">•</span>
                  <span className={`flex items-center gap-1.5 ${badges.system_hacker ? "text-emerald-400 font-semibold" : "text-zinc-600"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
                    <span>Shell</span>
                  </span>
                </div>

                <button
                  onClick={() => {
                    arcadeAudio.playClick();
                    setActiveGame("vault");
                  }}
                  onMouseEnter={() => arcadeAudio.playHover()}
                  className="px-2.5 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500 hover:to-yellow-400 border border-amber-500/40 text-amber-300 hover:text-black font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7.5a1.5 1.5 0 0 0 0 3h9a1.5 1.5 0 0 0 0-3H15c-.55 0-1-.45-1-1v-2.34"/><path d="M6 4h12v5a6 6 0 0 1-12 0V4Z"/></svg>
                  <span>VAULT</span>
                </button>

                {/* Sound Toggle */}
                <button
                  onClick={handleToggleMute}
                  onMouseEnter={() => arcadeAudio.playHover()}
                  className="p-1.5 sm:p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title={isMuted ? "Unmute Sound" : "Mute Sound"}
                >
                  {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                  )}
                </button>

                {/* Close Cabinet */}
                <button
                  onClick={handleCloseArcade}
                  onMouseEnter={() => arcadeAudio.playHover()}
                  className="p-1.5 sm:p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500/50 transition-colors cursor-pointer"
                  title="Exit Arcade"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
                </button>
              </div>
            </div>

            {/* MAIN STAGE: HUB OR GAME */}
            <div className="relative z-10 w-full max-w-6xl flex-1 flex flex-col items-center justify-center my-2 sm:my-4 overflow-hidden">
              {!activeGame ? (
                /* 3D CARTRIDGE SELECTION HUB */
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full flex flex-col items-center justify-center space-y-6 sm:space-y-10"
                >
                  <div className="text-center space-y-2 sm:space-y-3">
                    <span className="text-[10px] sm:text-xs uppercase font-mono tracking-[0.3em] sm:tracking-[0.4em] text-cyan-400/90 font-bold block">
                      INSERT CARTRIDGE TO PLAY
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-tighter text-white uppercase drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]">
                      SELECT YOUR CARTRIDGE
                    </h2>
                  </div>

                  {/* Cartridges 3D Shelf */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-5xl px-2 sm:px-4 max-h-[65vh] overflow-y-auto sm:max-h-none">
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
                          <div className="w-full h-72 sm:h-80 rounded-[22px] bg-zinc-950 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
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
                                <h3 className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
                                  {c.title}
                                </h3>
                                <CartridgeSvg type={c.iconType} size={24} />
                              </div>
                              <p className="text-xs text-zinc-400 font-light">
                                {c.subtitle}
                              </p>
                            </div>

                            {/* Cartridge Art Centerpiece */}
                            <div className={`w-full h-20 sm:h-24 rounded-2xl bg-gradient-to-tr ${c.color} p-0.5 shadow-lg group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow`}>
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
                  <div className="flex items-center justify-between mb-2 sm:mb-3 px-1 sm:px-2">
                    <button
                      onClick={() => {
                        arcadeAudio.playClick();
                        setActiveGame(null);
                      }}
                      onMouseEnter={() => arcadeAudio.playHover()}
                      className="text-[11px] sm:text-xs uppercase font-mono tracking-wider text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>←</span>
                      <span>Eject Cartridge</span>
                      <span className="hidden sm:inline">& Return to Shelf</span>
                    </button>

                    <span className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase">
                      ACTIVE: {activeGame.toUpperCase()}
                    </span>
                  </div>

                  {/* Active Screen Frame */}
                  <div className="flex-1 w-full bg-zinc-950/80 border border-zinc-800 rounded-2xl md:rounded-3xl overflow-hidden relative shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col">
                    {activeGame === "football" && (
                      <PixelFootballGame
                        onUnlockVault={() => {
                          setBadges((b) => ({ ...b, football: true }));
                          setActiveGame("vault");
                        }}
                      />
                    )}
                    {activeGame === "factory" && (
                      <TechFactoryGame
                        onWin={() => setBadges((b) => ({ ...b, ai_engineer: true }))}
                        onUnlockVault={() => {
                          setBadges((b) => ({ ...b, ai_engineer: true }));
                          setActiveGame("vault");
                        }}
                      />
                    )}
                    {activeGame === "terminal" && (
                      <TerminalHackerGame
                        onWin={() => setBadges((b) => ({ ...b, system_hacker: true }))}
                        onUnlockVault={() => {
                          setBadges((b) => ({ ...b, system_hacker: true }));
                          setActiveGame("vault");
                        }}
                      />
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
