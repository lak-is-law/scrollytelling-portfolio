"use client";

import React from "react";
import { motion } from "framer-motion";

export type AccentColor = "cyan" | "emerald" | "gold" | "indigo" | "purple" | "amber" | "green" | "white";

interface ColorMap {
  border: string;
  glow: string;
  hoverGlow: string;
  text: string;
  hoverText: string;
  bg: string;
  badge: string;
  beam: string;
  hex: string;
}

const ACCENT_MAP: Record<AccentColor, ColorMap> = {
  cyan: {
    border: "border-cyan-500/30",
    glow: "shadow-[0_0_25px_-5px_rgba(6,182,212,0.25)]",
    hoverGlow: "group-hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] group-hover:border-cyan-400/70",
    text: "text-zinc-200",
    hoverText: "group-hover:text-cyan-300",
    bg: "bg-zinc-950/80 hover:bg-cyan-950/30",
    badge: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
    beam: "from-cyan-500/0 via-cyan-400/30 to-cyan-500/0",
    hex: "#06b6d4",
  },
  emerald: {
    border: "border-emerald-500/30",
    glow: "shadow-[0_0_25px_-5px_rgba(16,185,129,0.25)]",
    hoverGlow: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.45)] group-hover:border-emerald-400/70",
    text: "text-zinc-200",
    hoverText: "group-hover:text-emerald-300",
    bg: "bg-zinc-950/80 hover:bg-emerald-950/30",
    badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    beam: "from-emerald-500/0 via-emerald-400/30 to-emerald-500/0",
    hex: "#10b981",
  },
  gold: {
    border: "border-yellow-500/30",
    glow: "shadow-[0_0_25px_-5px_rgba(234,179,8,0.25)]",
    hoverGlow: "group-hover:shadow-[0_0_35px_rgba(234,179,8,0.45)] group-hover:border-yellow-400/70",
    text: "text-zinc-200",
    hoverText: "group-hover:text-yellow-300",
    bg: "bg-zinc-950/80 hover:bg-yellow-950/30",
    badge: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
    beam: "from-yellow-500/0 via-yellow-400/30 to-yellow-500/0",
    hex: "#eab308",
  },
  indigo: {
    border: "border-indigo-500/30",
    glow: "shadow-[0_0_25px_-5px_rgba(99,102,241,0.25)]",
    hoverGlow: "group-hover:shadow-[0_0_35px_rgba(99,102,241,0.45)] group-hover:border-indigo-400/70",
    text: "text-zinc-200",
    hoverText: "group-hover:text-indigo-300",
    bg: "bg-zinc-950/80 hover:bg-indigo-950/30",
    badge: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400",
    beam: "from-indigo-500/0 via-indigo-400/30 to-indigo-500/0",
    hex: "#6366f1",
  },
  purple: {
    border: "border-purple-500/30",
    glow: "shadow-[0_0_25px_-5px_rgba(168,85,247,0.25)]",
    hoverGlow: "group-hover:shadow-[0_0_35px_rgba(168,85,247,0.45)] group-hover:border-purple-400/70",
    text: "text-zinc-200",
    hoverText: "group-hover:text-purple-300",
    bg: "bg-zinc-950/80 hover:bg-purple-950/30",
    badge: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    beam: "from-purple-500/0 via-purple-400/30 to-purple-500/0",
    hex: "#a855f7",
  },
  amber: {
    border: "border-amber-500/30",
    glow: "shadow-[0_0_25px_-5px_rgba(245,158,11,0.25)]",
    hoverGlow: "group-hover:shadow-[0_0_35px_rgba(245,158,11,0.45)] group-hover:border-amber-400/70",
    text: "text-zinc-200",
    hoverText: "group-hover:text-amber-300",
    bg: "bg-zinc-950/80 hover:bg-amber-950/30",
    badge: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    beam: "from-amber-500/0 via-amber-400/30 to-amber-500/0",
    hex: "#f59e0b",
  },
  green: {
    border: "border-emerald-500/30",
    glow: "shadow-[0_0_25px_-5px_rgba(16,185,129,0.25)]",
    hoverGlow: "group-hover:shadow-[0_0_35px_rgba(16,185,129,0.45)] group-hover:border-emerald-400/70",
    text: "text-zinc-200",
    hoverText: "group-hover:text-emerald-300",
    bg: "bg-zinc-950/80 hover:bg-emerald-950/30",
    badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    beam: "from-emerald-500/0 via-emerald-400/30 to-emerald-500/0",
    hex: "#10b981",
  },
  white: {
    border: "border-white/30",
    glow: "shadow-[0_0_25px_-5px_rgba(255,255,255,0.2)]",
    hoverGlow: "group-hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] group-hover:border-white/70",
    text: "text-zinc-200",
    hoverText: "group-hover:text-white",
    bg: "bg-zinc-950/80 hover:bg-zinc-900/60",
    badge: "bg-white/10 border-white/30 text-white",
    beam: "from-white/0 via-white/30 to-white/0",
    hex: "#ffffff",
  },
};

/**
 * Precision Futuristic Launch Glyph (Replacing generic ↗)
 */
export function FuturisticLaunchGlyph({ 
  size = 18, 
  color,
  className = "" 
}: { 
  size?: number; 
  color?: string;
  className?: string; 
}) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
      >
        {/* Outer Corner Precision Reticle */}
        <path
          d="M4 10V4H10"
          stroke={color || "currentColor"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.4"
        />
        <path
          d="M20 14V20H14"
          stroke={color || "currentColor"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.4"
        />

        {/* Dynamic Angled Launcher Vector Beam */}
        <path
          d="M6 18L18 6"
          stroke={color || "currentColor"}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
        <path
          d="M8.5 6H18V15.5"
          stroke={color || "currentColor"}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />

        {/* Core Quantum Energy Node */}
        <circle
          cx="6.5"
          cy="17.5"
          r="1.5"
          fill={color || "currentColor"}
          className="animate-pulse"
        />
      </svg>
    </div>
  );
}

/**
 * Futuristic Launch Link Button
 */
export function FuturisticLaunchLink({
  href,
  label,
  accent = "cyan",
  className = "",
  target = "_blank",
}: {
  href: string;
  label: string;
  accent?: AccentColor;
  className?: string;
  target?: string;
}) {
  const theme = ACCENT_MAP[accent] || ACCENT_MAP.cyan;

  return (
    <motion.a
      href={href}
      target={target}
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => {
        if (href) {
          if (target === "_blank") {
            window.open(href, "_blank", "noopener,noreferrer");
          } else {
            window.location.href = href;
          }
        }
      }}
      className={`group relative inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-2xl ${theme.bg} ${theme.border} ${theme.glow} ${theme.hoverGlow} transition-all duration-500 overflow-hidden cursor-pointer z-30 pointer-events-auto ${className}`}
    >
      {/* Light Sweep Shimmer */}
      <div 
        className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r ${theme.beam} pointer-events-none`} 
      />

      {/* Pulsing Status Dot */}
      <span className="relative flex h-2 w-2 pointer-events-none">
        <span 
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: theme.hex }}
        />
        <span 
          className="relative inline-flex rounded-full h-2 w-2 shadow-[0_0_8px_currentColor]"
          style={{ backgroundColor: theme.hex, color: theme.hex }}
        />
      </span>

      {/* Label Text */}
      <span className={`text-xs sm:text-sm font-mono font-semibold tracking-widest uppercase ${theme.text} ${theme.hoverText} transition-colors pointer-events-none`}>
        {label}
      </span>

      {/* Precision Launch Glyph */}
      <div className="pointer-events-none flex items-center">
        <FuturisticLaunchGlyph size={16} color={theme.hex} />
      </div>
    </motion.a>
  );
}

/**
 * Futuristic Optical Dismiss / Close Button (Replacing generic x)
 */
export function FuturisticCloseButton({
  onClick,
  size = 36,
  accent = "amber",
  label,
  className = "",
}: {
  onClick: () => void;
  size?: number;
  accent?: AccentColor;
  label?: string;
  className?: string;
}) {
  const theme = ACCENT_MAP[accent] || ACCENT_MAP.amber;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-2xl border ${theme.border} ${theme.glow} ${theme.hoverGlow} transition-all duration-300 cursor-pointer ${className}`}
      title={label || "Dismiss"}
    >
      {label && (
        <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-400 group-hover:text-white uppercase transition-colors">
          {label}
        </span>
      )}

      {/* Optical Close Reticle Icon */}
      <div 
        className="relative flex items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition-colors"
        style={{ width: size ? size * 0.6 : 22, height: size ? size * 0.6 : 22 }}
      >
        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:rotate-90 transition-transform duration-300">
          <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className={`${theme.text} transition-colors`} />
          <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className={`${theme.text} transition-colors`} />
        </svg>
      </div>
    </motion.button>
  );
}

/**
 * Precision Social Vector Glyph (Replacing default UI library icons)
 */
export function FuturisticSocialLink({
  href,
  type,
  label,
  accent = "cyan",
  className = "",
}: {
  href: string;
  type: "linkedin" | "github" | "mail";
  label: string;
  accent?: AccentColor;
  className?: string;
}) {
  const theme = ACCENT_MAP[accent] || ACCENT_MAP.cyan;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-zinc-900/40 backdrop-blur-xl border border-white/10 hover:border-white/30 ${theme.hoverGlow} transition-all duration-300 ${className}`}
    >
      {/* Precision Vector Icon */}
      {type === "linkedin" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-cyan-400 transition-colors">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" rx="1" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )}

      {type === "github" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-cyan-400 transition-colors">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      )}

      {type === "mail" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-cyan-400 transition-colors">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      )}

      <span className="text-xs font-mono font-medium tracking-wider text-zinc-400 group-hover:text-white transition-colors uppercase">
        {label}
      </span>
    </motion.a>
  );
}

/**
 * Directional Holographic Pointer (Replacing simple chevrons & arrows)
 */
export function DirectionalPointer({
  direction = "right",
  size = 18,
  accent = "cyan",
  className = "",
}: {
  direction?: "up" | "down" | "left" | "right";
  size?: number;
  accent?: AccentColor;
  className?: string;
}) {
  const theme = ACCENT_MAP[accent] || ACCENT_MAP.cyan;

  const rotations = {
    right: "rotate-0",
    down: "rotate-90",
    left: "rotate-180",
    up: "-rotate-90",
  };

  return (
    <div 
      className={`relative inline-flex items-center justify-center transform ${rotations[direction]} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke={theme.hex} strokeWidth="1.75" strokeLinecap="round" />
        <path d="M13 6L19 12L13 18" stroke={theme.hex} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="5" cy="12" r="1.5" fill={theme.hex} />
      </svg>
    </div>
  );
}
