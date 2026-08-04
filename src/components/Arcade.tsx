"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { arcadeAudio } from "@/utils/arcadeAudio";
import PixelFootballGame from "./minigames/PixelFootballGame";
import TechFactoryGame from "./minigames/TechFactoryGame";
import TerminalHackerGame from "./minigames/TerminalHackerGame";
import DeveloperVault from "./minigames/DeveloperVault";
import { FuturisticCloseButton, DirectionalPointer } from "@/components/ui/FuturisticNavigation";

// Miniature Game Cartridge Canvas Preview Components
function MiniFootballPreview() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let ballX = 30;
    let ballY = 45;
    let vx = 1.8;
    let vy = 1.2;
    let sparks: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(draw);
      }
    }, { threshold: 0.1 });

    observer.observe(canvas);

    const draw = () => {
      if (!isVisible) return;
      ctx.fillStyle = "#0c1510";
      ctx.fillRect(0, 0, 180, 90);

      // Pitch Lines
      ctx.strokeStyle = "rgba(52, 211, 153, 0.2)";
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, 160, 70);
      ctx.beginPath();
      ctx.moveTo(90, 10);
      ctx.lineTo(90, 80);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(90, 45, 18, 0, Math.PI * 2);
      ctx.stroke();

      // Goal Post at right
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 2;
      ctx.strokeRect(160, 28, 10, 34);

      // Ball Physics
      ballX += vx;
      ballY += vy;

      if (ballY <= 15 || ballY >= 75) vy = -vy;
      if (ballX <= 15) vx = -vx;
      if (ballX >= 160) {
        vx = -vx;
        // Spawn sparks
        for (let i = 0; i < 8; i++) {
          sparks.push({
            x: 160,
            y: ballY,
            vx: (Math.random() - 0.8) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            color: "#fbbf24",
          });
        }
      }

      // Draw Sparks
      sparks = sparks.filter((s) => s.life > 0);
      sparks.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.05;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, s.life);
        ctx.fillRect(s.x, s.y, 2, 2);
      });
      ctx.globalAlpha = 1;

      // Draw Pixel Ball
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(ballX - 3, ballY - 3, 6, 6);
      ctx.fillStyle = "#000000";
      ctx.fillRect(ballX - 1, ballY - 1, 2, 2);

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} width={180} height={90} className="w-full h-full object-cover rounded-lg" />;
}

function MiniFactoryPreview() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let offset = 0;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(draw);
      }
    }, { threshold: 0.1 });

    observer.observe(canvas);

    const draw = () => {
      if (!isVisible) return;
      ctx.fillStyle = "#09131f";
      ctx.fillRect(0, 0, 180, 90);

      offset += 0.8;

      // Conveyor Tracks
      ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(10, 45);
      ctx.lineTo(170, 45);
      ctx.stroke();

      // Track Teeth
      for (let x = 10; x < 170; x += 16) {
        const drawX = ((x + offset) % 160) + 10;
        ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
        ctx.beginPath();
        ctx.moveTo(drawX, 40);
        ctx.lineTo(drawX, 50);
        ctx.stroke();
      }

      // Fabrication Nodes
      const nodes = [45, 90, 135];
      nodes.forEach((nx, i) => {
        const pulse = Math.sin(offset * 0.08 + i * 1.5) * 0.5 + 0.5;
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.4 + pulse * 0.5})`;
        ctx.strokeRect(nx - 12, 33, 24, 24);
        ctx.fillStyle = `rgba(6, 182, 212, ${0.15 + pulse * 0.3})`;
        ctx.fillRect(nx - 10, 35, 20, 20);

        // Core chip
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(nx - 3, 42, 6, 6);
      });

      // Data Stream Rays
      ctx.strokeStyle = "rgba(147, 197, 253, 0.6)";
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(15, 20);
      ctx.lineTo(165, 20);
      ctx.stroke();
      ctx.setLineDash([]);

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} width={180} height={90} className="w-full h-full object-cover rounded-lg" />;
}

function MiniTerminalPreview() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    const cols = 15;
    const drops = Array(cols).fill(0);
    const chars = "010189ABCDEF!><_#";

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(draw);
      }
    }, { threshold: 0.1 });

    observer.observe(canvas);

    const draw = () => {
      if (!isVisible) return;
      ctx.fillStyle = "rgba(6, 15, 10, 0.25)";
      ctx.fillRect(0, 0, 180, 90);

      ctx.fillStyle = "#34d399";
      ctx.font = "8px monospace";

      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 12 + 6;
        const y = drops[i] * 9;

        ctx.fillText(char, x, y);

        if (y > 90 && Math.random() > 0.95) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Prompt overlay
      ctx.fillStyle = "#10b981";
      ctx.font = "bold 9px monospace";
      ctx.fillText(">_ ROOT_ACCESS", 12, 80);

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} width={180} height={90} className="w-full h-full object-cover rounded-lg" />;
}

// Telemetry Live Visitor Counter
function LiveTelemetry() {
  const [visitors, setVisitors] = useState(97184);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors((v) => v + Math.floor(Math.random() * 2));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto mb-10 p-4 rounded-2xl bg-zinc-900/40 border border-white/10 backdrop-blur-2xl font-mono text-xs shadow-2xl">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] tracking-widest text-emerald-400 uppercase font-bold">
            PORTAL TELEMETRY
          </span>
        </div>
        <span className="text-[10px] text-zinc-500 tracking-wider">FREQ: 142.8 MHz</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-zinc-400">
          <span className="text-zinc-500">TOTAL VISITORS:</span>
          <span className="text-white font-semibold">{visitors.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-zinc-400">
          <span className="text-zinc-500">ARCADE DISCOVERED:</span>
          <span className="text-cyan-400 font-semibold">18.4%</span>
        </div>
        <div className="flex justify-between items-center text-zinc-400">
          <span className="text-zinc-500">SECRET VAULT UNLOCKED:</span>
          <span className="text-amber-400 font-semibold">2.1%</span>
        </div>
      </div>
    </div>
  );
}

export default function Arcade() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<"football" | "factory" | "terminal" | "vault" | null>(null);
  const [insertingId, setInsertingId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClickWarp, setIsClickWarp] = useState(false);

  const [badges] = useState({
    football: false,
    ai_engineer: false,
    system_hacker: false,
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleCloseArcade();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleOpenArcade = (preselectedGame?: "football" | "factory" | "terminal") => {
    arcadeAudio.playBoot();
    setIsMuted(arcadeAudio.getMuted());
    setIsClickWarp(true);

    setTimeout(() => {
      setIsOpen(true);
      setIsClickWarp(false);
      if (preselectedGame) {
        handleSelectCartridge(preselectedGame);
      }
    }, 350);
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
      {/* 1. Fixed Floating Mini Launcher in bottom-right */}
      <motion.div
        onClick={() => handleOpenArcade()}
        onMouseEnter={() => arcadeAudio.playHover()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed bottom-20 right-6 md:bottom-24 md:right-10 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-zinc-950/80 border border-white/15 backdrop-blur-xl cursor-pointer hover:bg-zinc-900 hover:border-amber-400/50 transition-all duration-300 group shadow-[0_4px_20px_rgba(0,0,0,0.6)] focus:outline-none"
        title="Open Developer Arcade"
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
          className="text-amber-400 group-hover:scale-110 transition-transform"
        >
          <line x1="6" y1="12" x2="10" y2="12"></line>
          <line x1="8" y1="10" x2="8" y2="14"></line>
          <line x1="15" y1="13" x2="15.01" y2="13"></line>
          <line x1="18" y1="11" x2="18.01" y2="11"></line>
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
        </svg>

        {unlockedCount > 0 && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-amber-400 text-black text-[8px] font-black flex items-center justify-center border border-black">
            {unlockedCount}
          </span>
        )}
      </motion.div>

      {/* 2. GRAND SHOWCASE SECTION: THE ARCADE PORTAL */}
      <section id="arcade" className="relative bg-transparent py-20 md:py-32 px-4 sm:px-6 md:px-24 overflow-hidden border-t border-white/[0.08]">
        
        {/* Immersive Environment: 3D Perspective Grid Floor */}
        <div className="absolute bottom-0 inset-x-0 h-80 overflow-hidden pointer-events-none [perspective:900px]">
          <div
            className="w-[200%] -left-1/2 h-[450px] absolute bottom-0 [transform:rotateX(68deg)] origin-bottom transition-opacity duration-700"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(56, 189, 248, 0.12) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(56, 189, 248, 0.12) 1px, transparent 1px)`,
              backgroundSize: "44px 44px",
              maskImage: "linear-gradient(to top, black 25%, transparent 95%)",
              opacity: isHovered ? 0.9 : 0.45,
            }}
          />
        </div>

        {/* Floating Ambient Starlight Particles */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-1/6 w-1 h-1 bg-violet-400 rounded-full animate-ping" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-col items-center text-center">
          
          {/* Section Header */}
          <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-amber-400 uppercase mb-6">
            <span>12 // Interactive Vault</span>
            <div className="h-px w-12 bg-amber-500/30" />
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-amber-300">
              DEVELOPER ARCADE.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            A hidden collection of interactive experiences built to showcase creativity, frontend engineering, and game design.
          </p>

          {/* Telemetry Indicator */}
          <LiveTelemetry />

          {/* Central Portal & CTA Trigger */}
          <div className="relative my-8 flex flex-col items-center justify-center">
            
            {/* Massive Circular Holographic Portal */}
            <div className="absolute -inset-28 sm:-inset-40 flex items-center justify-center pointer-events-none select-none">
              
              {/* Radial Energy Bloom */}
              <div
                className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-700"
                style={{
                  transform: isHovered ? "scale(1.35)" : "scale(1)",
                  backgroundColor: isHovered ? "rgba(6, 182, 212, 0.25)" : "rgba(6, 182, 212, 0.08)",
                }}
              />

              {/* Concentric Rotating Holographic Rings */}
              <svg
                viewBox="0 0 400 400"
                className="w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] transition-all duration-700"
                style={{
                  opacity: isHovered ? 0.95 : 0.4,
                  transform: isHovered ? "scale(1.08)" : "scale(1)",
                }}
              >
                {/* Ring 1: Outer Dashed Ticks (Slow Clockwise) */}
                <circle
                  cx="200"
                  cy="200"
                  r="185"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="4 12"
                  className="animate-[spin_40s_linear_infinite]"
                  style={{ transformOrigin: "200px 200px" }}
                />

                {/* Ring 2: Amber Geometric Segments (Counter-Clockwise) */}
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1.75"
                  strokeDasharray="30 45"
                  className="animate-[spin_25s_linear_infinite_reverse]"
                  style={{ transformOrigin: "200px 200px" }}
                />

                {/* Ring 3: Inner Cyan Core Orbit (Fast Clockwise) */}
                <circle
                  cx="200"
                  cy="200"
                  r="115"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="1"
                  strokeDasharray="6 8"
                  className="animate-[spin_15s_linear_infinite]"
                  style={{ transformOrigin: "200px 200px" }}
                />

                {/* Energy Rune Ticks */}
                <circle
                  cx="200"
                  cy="200"
                  r="85"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.75"
                  strokeDasharray="2 18"
                  opacity="0.6"
                />
              </svg>
            </div>

            {/* CTA Trigger Row (Upgraded Glass Button + Radar Audio Toggle) */}
            <div className="relative z-20 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              
              {/* Upgraded Multi-Layer Glass CTA Button */}
              <button
                onClick={() => handleOpenArcade()}
                onMouseEnter={() => {
                  setIsHovered(true);
                  arcadeAudio.playHover();
                }}
                onMouseLeave={() => setIsHovered(false)}
                className={`relative group px-10 py-5 rounded-full border transition-all duration-500 flex items-center gap-4 cursor-pointer overflow-hidden backdrop-blur-3xl select-none ${
                  isHovered
                    ? "bg-zinc-900/90 border-cyan-400/80 shadow-[0_0_50px_rgba(6,182,212,0.5)] scale-105"
                    : "bg-zinc-950/70 border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                }`}
                style={{
                  transform: isClickWarp ? "scale(0.92)" : undefined,
                }}
              >
                {/* Animated Shimmer Light Sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

                {/* Glowing Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-400 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
                >
                  <line x1="6" y1="12" x2="10" y2="12"></line>
                  <line x1="8" y1="10" x2="8" y2="14"></line>
                  <line x1="15" y1="13" x2="15.01" y2="13"></line>
                  <line x1="18" y1="11" x2="18.01" y2="11"></line>
                  <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                </svg>

                <span className="font-mono text-sm sm:text-base font-bold tracking-[0.25em] text-white uppercase">
                  ENTER THE ARCADE
                </span>

                {unlockedCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-black">
                    {unlockedCount}/3
                  </span>
                )}
              </button>

              {/* Upgraded Tactical Radar & Audio Toggle Widget */}
              <button
                onClick={handleToggleMute}
                onMouseEnter={() => arcadeAudio.playHover()}
                className="relative w-14 h-14 rounded-full bg-zinc-950/80 border border-white/20 backdrop-blur-2xl flex items-center justify-center hover:border-cyan-400/60 hover:scale-105 transition-all duration-300 group shadow-lg cursor-pointer"
                title={isMuted ? "Unmute Arcade Audio" : "Mute Arcade Audio"}
              >
                {/* Rotating Radar Sweep Line */}
                <div className="absolute inset-1 rounded-full border border-cyan-500/20 pointer-events-none overflow-hidden">
                  <div className="w-full h-full animate-[spin_4s_linear_infinite] origin-center bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(6,182,212,0.35)_360deg)]" />
                </div>

                {/* Speaker Icon & Frequency Bars */}
                {isMuted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 group-hover:text-white transition-colors">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                  </svg>
                ) : (
                  <div className="flex items-center gap-0.5">
                    <div className="w-1 h-3 bg-cyan-400 rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
                    <div className="w-1 h-5 bg-cyan-400 rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" />
                    <div className="w-1 h-2 bg-cyan-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* 3 Holographic Miniature Game Cartridges */}
          <div className="mt-16 w-full max-w-5xl">
            <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-8 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-zinc-800" />
              <span>LIVE GAME CARTRIDGES // SELECT PREVIEW</span>
              <div className="h-px w-8 bg-zinc-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Cartridge 1: Pixel Football */}
              <motion.div
                whileHover={{ y: -6 }}
                onClick={() => handleOpenArcade("football")}
                onMouseEnter={() => arcadeAudio.playHover()}
                className="group p-5 rounded-3xl bg-zinc-900/30 border border-white/10 hover:border-amber-400/50 hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg backdrop-blur-2xl"
              >
                <div>
                  <div className="h-28 w-full mb-4 rounded-xl overflow-hidden border border-amber-500/20 bg-black/40">
                    <MiniFootballPreview />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                      Pixel Football
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 uppercase">
                      NORMAL
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4 text-left">
                    16-Bit Retro Striker with realistic trajectory curve physics and goalie AI.
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-zinc-500">TARGET: 15 GOALS</span>
                  <span className="text-amber-400 font-semibold flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform">
                    <span>PLAY</span>
                    <DirectionalPointer direction="right" size={12} accent="amber" />
                  </span>
                </div>
              </motion.div>

              {/* Cartridge 2: Tech Factory */}
              <motion.div
                whileHover={{ y: -6 }}
                onClick={() => handleOpenArcade("factory")}
                onMouseEnter={() => arcadeAudio.playHover()}
                className="group p-5 rounded-3xl bg-zinc-900/30 border border-white/10 hover:border-cyan-400/50 hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg backdrop-blur-2xl"
              >
                <div>
                  <div className="h-28 w-full mb-4 rounded-xl overflow-hidden border border-cyan-500/20 bg-black/40">
                    <MiniFactoryPreview />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                      Tech Factory
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 uppercase">
                      HARD
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4 text-left">
                    AI Cybernetic Assembly Lab with modular chip fabrication and pipeline routing.
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-zinc-500">TARGET: 100% PURITY</span>
                  <span className="text-cyan-400 font-semibold flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform">
                    <span>PLAY</span>
                    <DirectionalPointer direction="right" size={12} accent="cyan" />
                  </span>
                </div>
              </motion.div>

              {/* Cartridge 3: Terminal Hacker */}
              <motion.div
                whileHover={{ y: -6 }}
                onClick={() => handleOpenArcade("terminal")}
                onMouseEnter={() => arcadeAudio.playHover()}
                className="group p-5 rounded-3xl bg-zinc-900/30 border border-white/10 hover:border-emerald-400/50 hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg backdrop-blur-2xl"
              >
                <div>
                  <div className="h-28 w-full mb-4 rounded-xl overflow-hidden border border-emerald-500/20 bg-black/40">
                    <MiniTerminalPreview />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                      Terminal Hacker
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 uppercase">
                      EXPERT
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4 text-left">
                    Matrix Mainframe Shell with cipher decryption, memory injection, and root exploits.
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-zinc-500">TARGET: ROOT_ACCESS</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform">
                    <span>PLAY</span>
                    <DirectionalPointer direction="right" size={12} accent="emerald" />
                  </span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. ARCADE FULLSCREEN CABINET MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Developer Arcade Cabinet"
            className="fixed inset-0 z-[9000] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-2 sm:p-4 md:p-8 overflow-hidden select-none"
          >
            {/* Ambient Background Lighting */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

            {/* TOP HEADER HUD */}
            <div className="relative z-20 w-full max-w-6xl flex items-center justify-between py-1.5 sm:py-2 border-b border-zinc-800/80">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-zinc-400">
                  ARCADE 2.0 // SYSTEM ONLINE
                </span>
              </div>

              {/* Sound & Exit Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleMute}
                  className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                  )}
                </button>

                <FuturisticCloseButton 
                  onClick={handleCloseArcade} 
                  accent="amber" 
                  label="ESC" 
                />
              </div>
            </div>

            {/* MAIN GAME DISPLAY CABINET */}
            <div className="relative z-10 w-full max-w-5xl flex-1 flex flex-col items-center justify-center my-2 sm:my-4">
              {activeGame && (
                <div className="w-full flex items-center justify-between px-4 py-2 mb-2 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono">
                  <motion.button
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveGame(null)}
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-2 transition-colors font-bold uppercase cursor-pointer"
                  >
                    <DirectionalPointer direction="left" size={14} accent="amber" />
                    <span>CARTRIDGE RACK</span>
                  </motion.button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSelectCartridge("football")}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        activeGame === "football" ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      FOOTBALL
                    </button>
                    <button
                      onClick={() => handleSelectCartridge("factory")}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        activeGame === "factory" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      FACTORY
                    </button>
                    <button
                      onClick={() => handleSelectCartridge("terminal")}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        activeGame === "terminal" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      HACKER
                    </button>
                  </div>
                </div>
              )}

              {activeGame === "football" && <PixelFootballGame onUnlockVault={() => setActiveGame("vault")} />}
              {activeGame === "factory" && <TechFactoryGame onUnlockVault={() => setActiveGame("vault")} />}
              {activeGame === "terminal" && <TerminalHackerGame onUnlockVault={() => setActiveGame("vault")} />}
              {activeGame === "vault" && (
                <DeveloperVault
                  onClose={() => setActiveGame(null)}
                  unlockedBadges={Object.keys(badges).filter((k) => badges[k as keyof typeof badges])}
                />
              )}

              {!activeGame && (
                <div className="w-full flex flex-col items-center justify-center text-center p-6">
                  <div className="text-amber-400 font-mono text-sm tracking-[0.3em] uppercase mb-3">
                    [ SELECT YOUR CARTRIDGE ]
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mt-4">
                    <button
                      onClick={() => handleSelectCartridge("football")}
                      disabled={insertingId === "football"}
                      className="p-6 rounded-2xl bg-zinc-900/60 border border-amber-500/30 hover:border-amber-400 hover:bg-zinc-900 transition-all group cursor-pointer text-left"
                    >
                      <div className="h-24 w-full mb-3 rounded-lg overflow-hidden bg-black/40">
                        <MiniFootballPreview />
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-amber-400">PIXEL FOOTBALL</h4>
                      <p className="text-xs text-zinc-400 mt-1 font-mono">16-Bit Striker</p>
                    </button>

                    <button
                      onClick={() => handleSelectCartridge("factory")}
                      disabled={insertingId === "factory"}
                      className="p-6 rounded-2xl bg-zinc-900/60 border border-cyan-500/30 hover:border-cyan-400 hover:bg-zinc-900 transition-all group cursor-pointer text-left"
                    >
                      <div className="h-24 w-full mb-3 rounded-lg overflow-hidden bg-black/40">
                        <MiniFactoryPreview />
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-cyan-400">TECH FACTORY</h4>
                      <p className="text-xs text-zinc-400 mt-1 font-mono">AI Assembly Lab</p>
                    </button>

                    <button
                      onClick={() => handleSelectCartridge("terminal")}
                      disabled={insertingId === "terminal"}
                      className="p-6 rounded-2xl bg-zinc-900/60 border border-emerald-500/30 hover:border-emerald-400 hover:bg-zinc-900 transition-all group cursor-pointer text-left"
                    >
                      <div className="h-24 w-full mb-3 rounded-lg overflow-hidden bg-black/40">
                        <MiniTerminalPreview />
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-emerald-400">TERMINAL HACKER</h4>
                      <p className="text-xs text-zinc-400 mt-1 font-mono">Matrix Shell</p>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* BOTTOM STATUS BAR */}
            <div className="relative z-20 w-full max-w-6xl py-2 flex items-center justify-between text-[11px] font-mono text-zinc-500 border-t border-zinc-900">
              <span>CONTROLS: [MOUSE / KEYBOARD]</span>
              <span>LAKSHYA DEVELOPER SUITE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
