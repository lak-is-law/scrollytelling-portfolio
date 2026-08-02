"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Language Data
const LANGUAGES = [
  {
    id: "eng",
    name: "English",
    level: "Fluent",
    usage: "Professional Communication & Technical Documentation",
    region: "Global",
    colorHex: "#22d3ee", // cyan-400
    lat: 40,
    lng: -74,
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
    lng: 91,
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
    colorHex: "#38bdf8", // sky-400
    lat: 35,
    lng: 139,
    isLearning: true,
  },
];

const langStyles: Record<string, { border: string; bg: string; text: string }> = {
  eng: { border: "border-cyan-400", bg: "bg-cyan-400/10", text: "text-cyan-400" },
  hin: { border: "border-amber-400", bg: "bg-amber-400/10", text: "text-amber-400" },
  asm: { border: "border-emerald-400", bg: "bg-emerald-400/10", text: "text-emerald-400" },
  nag: { border: "border-rose-400", bg: "bg-rose-400/10", text: "text-rose-400" },
  kor: { border: "border-violet-400", bg: "bg-violet-400/10", text: "text-violet-400" },
  jap: { border: "border-sky-400", bg: "bg-sky-400/10", text: "text-sky-400" },
};

const TelemetryHUD = ({ activeLinks }: { activeLinks: number }) => {
  return (
    <div className="mt-8 border border-white/10 bg-black/40 backdrop-blur-md p-4 rounded-xl flex flex-col gap-2 font-mono text-xs uppercase relative overflow-hidden">
      {/* Scan line effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-white/20 blur-[1px]"
        animate={{ y: [0, 200] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <div className="flex justify-between items-center text-white/50 mb-2 border-b border-white/10 pb-2">
        <span>sys.telemetry_hud</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          ONLINE
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-white/80">
        <div className="flex flex-col">
          <span className="text-white/40">Total Channels</span>
          <span className="text-xl text-white">06</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white/40">Active Links</span>
          <span className="text-xl text-cyan-400">
            {activeLinks < 10 ? `0${activeLinks}` : activeLinks}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-white/40">Fluent/Native</span>
          <span className="text-emerald-400">03</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white/40">Learning/Dev</span>
          <span className="text-violet-400">02</span>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-white/10 flex flex-col">
        <span className="text-white/40">Network Coverage</span>
        <span className="text-white tracking-widest">MULTI-CONTINENTAL</span>
      </div>
    </div>
  );
};

export default function GlobalMatrix() {
  const [selectedLangs, setSelectedLangs] = useState<Set<string>>(new Set());
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  // Auto rotate globe
  useEffect(() => {
    let animationFrame: number;
    const rotate = () => {
      if (!isDragging.current) {
        setRotation((prev) => (prev + 0.1) % 360);
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
    setRotation((prev) => (prev + delta * 0.5) % 360);
    startX.current = currentX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  const toggleLanguage = (id: string) => {
    setSelectedLangs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Convert lat/lng to x,y on globe
  const getCoordinates = (lat: number, lng: number, globeRotation: number) => {
    const r = 160; // radius
    const latRad = (lat * Math.PI) / 180;
    const lngRad = ((lng + globeRotation) * Math.PI) / 180;

    // Orthographic projection
    const x = r * Math.cos(latRad) * Math.sin(lngRad);
    const y = -r * Math.sin(latRad);
    const z = r * Math.cos(latRad) * Math.cos(lngRad);

    return { x: x + 200, y: y + 200, z, isVisible: z > 0 };
  };

  // Home position (India roughly)
  const homeCoords = getCoordinates(20, 79, rotation);

  return (
    <section className="min-h-screen bg-[#09090b] text-white py-24 relative overflow-hidden flex items-center">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full z-10">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-4 text-cyan-400 font-mono text-sm tracking-widest uppercase">
              <span>09</span>
              <span className="w-12 h-px bg-cyan-400/50" />
              <span>Global Network</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Communication Matrix</h2>
            <p className="text-white/50 text-lg">Select your frequency. Map the network.</p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
          {/* Globe Container */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div
              className="relative w-[400px] h-[400px] cursor-grab active:cursor-grabbing scale-75 md:scale-100"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {/* Atmospheric Glow */}
              <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <svg width="400" height="400" className="relative z-10 pointer-events-none">
                <defs>
                  <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="80%" stopColor="rgba(0, 200, 255, 0.05)" />
                    <stop offset="100%" stopColor="rgba(0, 200, 255, 0.3)" />
                  </radialGradient>
                </defs>

                {/* Base Sphere */}
                <circle cx="200" cy="200" r="160" fill="url(#globeGlow)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                {/* Longitude lines */}
                {[0, 30, 60, 90, 120, 150].map((deg) => {
                  const rotatedLng = (deg + rotation) % 180;
                  const rx = 160 * Math.sin((rotatedLng * Math.PI) / 180);
                  return (
                    <ellipse
                      key={`lng-${deg}`}
                      cx="200"
                      cy="200"
                      rx={Math.abs(rx)}
                      ry="160"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Latitude lines */}
                {[-60, -30, 0, 30, 60].map((lat) => {
                  const ry = 160 * Math.cos((lat * Math.PI) / 180);
                  const y = 200 - 160 * Math.sin((lat * Math.PI) / 180);
                  return (
                    <ellipse
                      key={`lat-${lat}`}
                      cx="200"
                      cy={y}
                      rx={ry}
                      ry="0"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Connection Bridges */}
                {LANGUAGES.map((lang) => {
                  const isSelected = selectedLangs.has(lang.id) || hoveredLang === lang.id;
                  if (!isSelected) return null;

                  const target = getCoordinates(lang.lat, lang.lng, rotation);
                  if (!target.isVisible || !homeCoords.isVisible) return null;

                  const midX = (homeCoords.x + target.x) / 2;
                  const midY = (homeCoords.y + target.y) / 2 - 60;

                  return (
                    <motion.path
                      key={`bridge-${lang.id}`}
                      d={`M ${homeCoords.x} ${homeCoords.y} Q ${midX} ${midY} ${target.x} ${target.y}`}
                      fill="none"
                      stroke={lang.colorHex}
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    />
                  );
                })}

                {/* Home Node */}
                {homeCoords.isVisible && (
                  <g>
                    <circle cx={homeCoords.x} cy={homeCoords.y} r="4" fill="#fff" />
                    <circle cx={homeCoords.x} cy={homeCoords.y} r="12" fill="none" stroke="#fff" strokeWidth="1" opacity="0.3" className="animate-ping" />
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
                      style={{ pointerEvents: "auto", cursor: "pointer" }}
                      onClick={() => toggleLanguage(lang.id)}
                      onMouseEnter={() => setHoveredLang(lang.id)}
                      onMouseLeave={() => setHoveredLang(null)}
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isSelected || isHovered ? "6" : "3"}
                        fill={lang.colorHex}
                        className="transition-all duration-300"
                      />
                      {(isSelected || isHovered) && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="14"
                          fill="none"
                          stroke={lang.colorHex}
                          strokeWidth="1"
                          opacity="0.5"
                          className="animate-ping"
                        />
                      )}

                      {/* Floating Label */}
                      <text
                        x={pos.x + 12}
                        y={pos.y + 4}
                        fill="rgba(255,255,255,0.8)"
                        fontSize="10"
                        fontFamily="monospace"
                        className="pointer-events-none tracking-widest uppercase drop-shadow-md"
                      >
                        {lang.id}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="w-full max-w-sm mt-4 md:mt-8">
              <TelemetryHUD activeLinks={selectedLangs.size} />
              
              {selectedLangs.size > 0 && (
                <div className="mt-4 text-center font-mono text-[10px] text-cyan-400 animate-pulse tracking-widest">
                  &gt; COMMUNICATION BRIDGE ESTABLISHED
                </div>
              )}
            </div>
          </div>

          {/* Details Panel */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LANGUAGES.map((lang) => {
                const isSelected = selectedLangs.has(lang.id);
                const styles = langStyles[lang.id];

                return (
                  <motion.div
                    key={lang.id}
                    onClick={() => toggleLanguage(lang.id)}
                    onHoverStart={() => setHoveredLang(lang.id)}
                    onHoverEnd={() => setHoveredLang(null)}
                    className={`p-4 rounded-xl border cursor-pointer backdrop-blur-md transition-all duration-300 ${
                      isSelected
                        ? `${styles.border} ${styles.bg}`
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-lg font-bold ${styles.text}`}>{lang.name}</h3>
                      {lang.isLearning && (
                        <span className="text-[10px] font-mono border border-violet-500/50 text-violet-400 px-2 py-1 rounded bg-violet-500/10 uppercase">
                          Learning
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 text-xs font-mono mb-2">
                      <div className="flex justify-between">
                        <span className="text-white/40">LEVEL</span>
                        <span className="text-white/80">{lang.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">REGION</span>
                        <span className="text-white/80 text-right">{lang.region}</span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 border-t border-white/10 mt-3">
                            <span className="text-[10px] text-white/40 font-mono block mb-1">
                              USAGE
                            </span>
                            <p className="text-xs text-white/70 leading-relaxed font-sans">
                              {lang.usage}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
