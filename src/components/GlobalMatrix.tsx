"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Language Data
const LANGUAGES = [
  {
    id: "eng",
    name: "English",
    level: "Fluent",
    usage: "Professional Communication & Technical Documentation",
    region: "Global",
    colorHex: "#38bdf8", // sky-400
    lat: 38,
    lng: -77,
    isLearning: false,
  },
  {
    id: "hin",
    name: "Hindi",
    level: "Native / Bilingual",
    usage: "Pan-India & South Asian Network",
    region: "South Asia",
    colorHex: "#fbbf24", // amber-400
    lat: 28,
    lng: 77,
    isLearning: false,
  },
  {
    id: "asm",
    name: "Assamese",
    level: "Native / Heritage",
    usage: "Northeast India Regional Communication",
    region: "Northeast India",
    colorHex: "#34d399", // emerald-400
    lat: 26,
    lng: 92,
    isLearning: false,
  },
  {
    id: "nag",
    name: "Nagamese",
    level: "Conversational",
    usage: "Nagaland Inter-tribal Lingua Franca",
    region: "Nagaland",
    colorHex: "#fb7185", // rose-400
    lat: 26,
    lng: 94,
    isLearning: false,
  },
  {
    id: "kor",
    name: "Korean",
    level: "Intermediate 1 (Certified)",
    usage: "Active Study — Sungkyunkwan University, Coursera",
    region: "South Korea",
    colorHex: "#a78bfa", // violet-400
    lat: 37,
    lng: 127,
    isLearning: true,
  },
  {
    id: "jap",
    name: "Japanese",
    level: "Introductory",
    usage: "Cultural Immersion — Scripts, Phonetics & Technical Lexicon",
    region: "Japan",
    colorHex: "#22d3ee", // cyan-400
    lat: 36,
    lng: 138,
    isLearning: true,
  },
];

// Simplified continent land points for rotating globe geometry
const LAND_POINTS = [
  // North America
  { lat: 45, lng: -100 }, { lat: 55, lng: -110 }, { lat: 35, lng: -90 }, { lat: 30, lng: -100 }, { lat: 40, lng: -75 },
  // South America
  { lat: -10, lng: -55 }, { lat: -20, lng: -60 }, { lat: -30, lng: -65 }, { lat: 0, lng: -70 },
  // Europe
  { lat: 50, lng: 10 }, { lat: 48, lng: 2 }, { lat: 55, lng: 37 }, { lat: 40, lng: -3 }, { lat: 60, lng: 15 },
  // Africa
  { lat: 0, lng: 25 }, { lat: 20, lng: 15 }, { lat: -25, lng: 28 }, { lat: 10, lng: 40 }, { lat: 5, lng: 0 },
  // Middle East / Central Asia
  { lat: 30, lng: 45 }, { lat: 35, lng: 55 }, { lat: 45, lng: 65 },
  // India / South Asia
  { lat: 22, lng: 78 }, { lat: 13, lng: 80 }, { lat: 28, lng: 77 }, { lat: 24, lng: 88 },
  // East Asia
  { lat: 35, lng: 105 }, { lat: 40, lng: 116 }, { lat: 31, lng: 121 }, { lat: 37, lng: 127 }, { lat: 36, lng: 138 },
  // Southeast Asia & Australia
  { lat: 15, lng: 100 }, { lat: 1, lng: 104 }, { lat: -25, lng: 135 }, { lat: -33, lng: 151 },
];

export default function GlobalMatrix() {
  const [selectedLangs, setSelectedLangs] = useState<Set<string>>(new Set(["eng", "hin"]));
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  // Auto rotate globe
  useEffect(() => {
    let animationFrame: number;
    const rotate = () => {
      if (!isDragging.current) {
        setRotation((prev) => (prev + 0.15) % 360);
      }
      animationFrame = requestAnimationFrame(rotate);
    };
    rotate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    startX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const delta = currentX - startX.current;
    setRotation((prev) => (prev + delta * 0.6) % 360);
    startX.current = currentX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  const toggleLanguage = (id: string) => {
    setSelectedLangs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id); // keep at least one selected
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Convert lat/lng to x,y on globe
  const getCoordinates = (lat: number, lng: number, globeRotation: number) => {
    const r = 150; // sphere radius
    const latRad = (lat * Math.PI) / 180;
    const lngRad = ((lng + globeRotation) * Math.PI) / 180;

    // Orthographic projection
    const x = r * Math.cos(latRad) * Math.sin(lngRad);
    const y = -r * Math.sin(latRad);
    const z = r * Math.cos(latRad) * Math.cos(lngRad);

    return { x: x + 200, y: y + 200, z, isVisible: z > 0 };
  };

  // Home position (India roughly: 20° N, 78° E)
  const homeCoords = getCoordinates(20, 78, rotation);

  return (
    <section className="relative bg-[#09090b] py-32 px-6 md:px-24 overflow-hidden border-t border-zinc-900/50">
      <div className="mx-auto max-w-7xl w-full">
        
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-zinc-500 uppercase mb-6">
            <span>11 // Global Network</span>
            <div className="h-px w-12 bg-zinc-800" />
          </div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6">
            Communication Matrix.
          </h2>
          <p className="text-xl text-zinc-400 font-light max-w-2xl">
            Multilingual fluency spanning 6 languages across international technical documentation, regional dialects, and active studies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Globe Display */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div
              className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] select-none cursor-grab active:cursor-grabbing flex items-center justify-center"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {/* Outer Atmosphere Ambient Halo */}
              <div className="absolute inset-4 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

              <svg width="400" height="400" viewBox="0 0 400 400" className="relative z-10 w-full h-full">
                <defs>
                  {/* Sphere Deep Space Gradient */}
                  <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#0f172a" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
                  </radialGradient>

                  {/* Outer Rim Glow Filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Coordinate Rim (Ticks) */}
                <circle
                  cx="200"
                  cy="200"
                  r="164"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                />

                {/* PROMINENT GLOBE OUTLINE 1: Primary Outer Ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="url(#sphereGrad)"
                  stroke="rgba(56, 189, 248, 0.7)"
                  strokeWidth="2.5"
                  filter="url(#glow)"
                />

                {/* Secondary Sharp Inner Rim */}
                <circle
                  cx="200"
                  cy="200"
                  r="149"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="1"
                />

                {/* Longitude Grid Lines */}
                {[0, 30, 60, 90, 120, 150].map((deg) => {
                  const rotatedLng = (deg + rotation) % 180;
                  const rx = 150 * Math.sin((rotatedLng * Math.PI) / 180);
                  return (
                    <ellipse
                      key={`lng-${deg}`}
                      cx="200"
                      cy="200"
                      rx={Math.max(1, Math.abs(rx))}
                      ry="150"
                      fill="none"
                      stroke="rgba(56, 189, 248, 0.15)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Latitude Grid Lines */}
                {[-60, -30, 0, 30, 60].map((lat) => {
                  const rLat = 150 * Math.cos((lat * Math.PI) / 180);
                  const yLat = 200 - 150 * Math.sin((lat * Math.PI) / 180);
                  const isEquator = lat === 0;
                  return (
                    <ellipse
                      key={`lat-${lat}`}
                      cx="200"
                      cy={yLat}
                      rx={rLat}
                      ry={rLat * 0.25}
                      fill="none"
                      stroke={isEquator ? "rgba(56, 189, 248, 0.4)" : "rgba(255, 255, 255, 0.08)"}
                      strokeWidth={isEquator ? 1.5 : 1}
                      strokeDasharray={isEquator ? "none" : "3 3"}
                    />
                  );
                })}

                {/* Rotating Land Points */}
                {LAND_POINTS.map((pt, idx) => {
                  const coords = getCoordinates(pt.lat, pt.lng, rotation);
                  if (!coords.isVisible) return null;
                  return (
                    <circle
                      key={`land-${idx}`}
                      cx={coords.x}
                      cy={coords.y}
                      r="2"
                      fill="rgba(56, 189, 248, 0.35)"
                    />
                  );
                })}

                {/* Connection Bridge Flight Paths */}
                {LANGUAGES.map((lang) => {
                  const isSelected = selectedLangs.has(lang.id) || hoveredLang === lang.id;
                  if (!isSelected) return null;

                  const target = getCoordinates(lang.lat, lang.lng, rotation);
                  if (!target.isVisible || !homeCoords.isVisible) return null;

                  const midX = (homeCoords.x + target.x) / 2;
                  const midY = (homeCoords.y + target.y) / 2 - 40;

                  return (
                    <motion.path
                      key={`bridge-${lang.id}`}
                      d={`M ${homeCoords.x} ${homeCoords.y} Q ${midX} ${midY} ${target.x} ${target.y}`}
                      fill="none"
                      stroke={lang.colorHex}
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.9 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  );
                })}

                {/* Home Position Dot (Origin) */}
                {homeCoords.isVisible && (
                  <g>
                    <circle cx={homeCoords.x} cy={homeCoords.y} r="5" fill="#ffffff" />
                    <circle cx={homeCoords.x} cy={homeCoords.y} r="14" fill="none" stroke="#38bdf8" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
                  </g>
                )}

                {/* Language Nodes */}
                {LANGUAGES.map((lang) => {
                  const pos = getCoordinates(lang.lat, lang.lng, rotation);
                  if (!pos.isVisible) return null;

                  const isSelected = selectedLangs.has(lang.id);
                  const isHovered = hoveredLang === lang.id;

                  return (
                    <g
                      key={lang.id}
                      className="cursor-pointer"
                      onClick={() => toggleLanguage(lang.id)}
                      onMouseEnter={() => setHoveredLang(lang.id)}
                      onMouseLeave={() => setHoveredLang(null)}
                    >
                      {/* Node Outer Pulse */}
                      {(isSelected || isHovered) && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="16"
                          fill="none"
                          stroke={lang.colorHex}
                          strokeWidth="1.5"
                          opacity="0.6"
                          className="animate-ping"
                        />
                      )}

                      {/* Node Core */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isSelected || isHovered ? "6" : "4"}
                        fill={lang.colorHex}
                        stroke="#ffffff"
                        strokeWidth="1"
                      />

                      {/* Floating Text Label */}
                      <text
                        x={pos.x + 10}
                        y={pos.y + 4}
                        fill="#ffffff"
                        fontSize="11"
                        fontWeight="600"
                        fontFamily="monospace"
                        className="pointer-events-none tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                      >
                        {lang.id.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Instruction Tip */}
            <p className="text-xs text-zinc-500 font-mono tracking-wider mt-4">
              [ DRAG TO ROTATE GLOBE • CLICK NODES TO CONNECT ]
            </p>
          </div>

          {/* Language Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLangs.has(lang.id);
              const isHovered = hoveredLang === lang.id;

              return (
                <motion.div
                  key={lang.id}
                  onClick={() => toggleLanguage(lang.id)}
                  onHoverStart={() => setHoveredLang(lang.id)}
                  onHoverEnd={() => setHoveredLang(null)}
                  whileHover={{ y: -3 }}
                  className={`p-6 rounded-3xl backdrop-blur-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected || isHovered
                      ? "bg-zinc-900/50 border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                      : "bg-zinc-900/20 border-white/5 hover:border-zinc-700/50 hover:bg-zinc-900/30"
                  }`}
                  style={{
                    boxShadow: isSelected ? `0 0 25px -5px ${lang.colorHex}33` : undefined,
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: lang.colorHex, boxShadow: `0 0 10px ${lang.colorHex}` }}
                        />
                        <h3 className="text-xl font-semibold text-white tracking-tight">
                          {lang.name}
                        </h3>
                      </div>
                      {lang.isLearning && (
                        <span className="text-[10px] font-mono tracking-widest text-violet-400 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 uppercase">
                          Study
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mb-4 font-mono text-xs">
                      <div className="flex justify-between text-zinc-400">
                        <span className="text-zinc-500">LEVEL:</span>
                        <span className="text-zinc-200">{lang.level}</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span className="text-zinc-500">REGION:</span>
                        <span className="text-zinc-300">{lang.region}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 font-light leading-relaxed pt-3 border-t border-zinc-800/60">
                    {lang.usage}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
