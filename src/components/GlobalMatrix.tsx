"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { geoOrthographic, geoPath, geoGraticule10, geoInterpolate } from "d3-geo";
import * as topojson from "topojson-client";
import worldData from "world-atlas/land-110m.json";

// Language Data with smart non-overlapping label offsets
interface Language {
  id: string;
  name: string;
  level: string;
  usage: string;
  region: string;
  colorHex: string;
  lng: number;
  lat: number;
  isLearning: boolean;
  labelOffset: { dx: number; dy: number };
}

const LANGUAGES: Language[] = [
  {
    id: "eng",
    name: "English",
    level: "Fluent",
    usage: "Professional Communication & Technical Documentation",
    region: "Global",
    colorHex: "#38bdf8", // sky-400
    lng: -77.0,
    lat: 38.9,
    isLearning: false,
    labelOffset: { dx: -65, dy: -35 },
  },
  {
    id: "hin",
    name: "Hindi",
    level: "Native / Bilingual",
    usage: "Pan-India & South Asian Network",
    region: "South Asia",
    colorHex: "#fbbf24", // amber-400
    lng: 77.2,
    lat: 28.6,
    isLearning: false,
    labelOffset: { dx: -60, dy: -35 },
  },
  {
    id: "asm",
    name: "Assamese",
    level: "Native / Heritage",
    usage: "Northeast India Regional Communication",
    region: "Northeast India",
    colorHex: "#34d399", // emerald-400
    lng: 91.7,
    lat: 26.1,
    isLearning: false,
    labelOffset: { dx: 35, dy: -45 },
  },
  {
    id: "nag",
    name: "Nagamese",
    level: "Conversational",
    usage: "Nagaland Inter-tribal Lingua Franca",
    region: "Nagaland",
    colorHex: "#fb7185", // rose-400
    lng: 94.1,
    lat: 25.7,
    isLearning: false,
    labelOffset: { dx: 55, dy: 30 },
  },
  {
    id: "kor",
    name: "Korean",
    level: "Intermediate 1 (Certified)",
    usage: "Active Study — Sungkyunkwan University, Coursera",
    region: "South Korea",
    colorHex: "#a78bfa", // violet-400
    lng: 127.0,
    lat: 37.5,
    isLearning: true,
    labelOffset: { dx: -55, dy: -40 },
  },
  {
    id: "jap",
    name: "Japanese",
    level: "Introductory",
    usage: "Cultural Immersion — Scripts, Phonetics & Technical Lexicon",
    region: "Japan",
    colorHex: "#22d3ee", // cyan-400
    lng: 139.7,
    lat: 35.7,
    isLearning: true,
    labelOffset: { dx: 55, dy: 25 },
  },
];

// Origin Hub: India (New Delhi base: 77.2°E, 28.6°N)
const ORIGIN_LNG = 77.2;
const ORIGIN_LAT = 28.6;

export default function GlobalMatrix() {
  const [selectedLangs, setSelectedLangs] = useState<Set<string>>(new Set(["eng", "hin"]));
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const [rotation, setRotation] = useState<[number, number]>([-70, -15]); // [lambda, phi]
  const isDragging = useRef(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetRotation = useRef<[number, number]>([-70, -15]);
  const animationFrameRef = useRef<number | null>(null);

  // Convert TopoJSON land to GeoJSON Feature
  const landFeature = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return topojson.feature(worldData as any, worldData.objects.land as any);
  }, []);

  const graticule = useMemo(() => geoGraticule10(), []);

  // Globe dimensions
  const size = 420;
  const radius = 175;

  // Projection
  const projection = useMemo(() => {
    return geoOrthographic()
      .scale(radius)
      .translate([size / 2, size / 2])
      .clipAngle(90)
      .rotate(rotation);
  }, [rotation, radius, size]);

  // Render Canvas World Map
  const renderMap = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Support High DPI
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    if (canvas.width !== size * dpr) {
      canvas.width = size * dpr;
      canvas.height = size * dpr;
    }
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    const path = geoPath(projection, ctx);

    // 1. Outer Deep Ocean Sphere Background
    const cx = size / 2;
    const cy = size / 2;
    const oceanGrad = ctx.createRadialGradient(cx - 40, cy - 40, 20, cx, cy, radius);
    oceanGrad.addColorStop(0, "#1e293b");
    oceanGrad.addColorStop(0.5, "#0f172a");
    oceanGrad.addColorStop(1, "#020617");

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = oceanGrad;
    ctx.fill();

    // 2. Graticule Lat/Long Grid Lines
    ctx.beginPath();
    path(graticule);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
    ctx.lineWidth = 0.75;
    ctx.stroke();

    // 3. Real Continents Landmass Fill & High-Contrast Cyberpunk Borders
    ctx.beginPath();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    path(landFeature as any);
    ctx.fillStyle = "rgba(30, 41, 59, 0.85)";
    ctx.fill();
    ctx.strokeStyle = "rgba(56, 189, 248, 0.55)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 4. Geodesic Flight Arcs between Origin (India) and active languages
    LANGUAGES.forEach((lang) => {
      const isSelected = selectedLangs.has(lang.id) || hoveredLang === lang.id;
      if (!isSelected) return;

      const interpolator = geoInterpolate([ORIGIN_LNG, ORIGIN_LAT], [lang.lng, lang.lat]);
      const points: [number, number][] = [];
      const steps = 40;
      for (let i = 0; i <= steps; i++) {
        points.push(interpolator(i / steps));
      }

      ctx.beginPath();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      path({ type: "LineString", coordinates: points } as any);
      ctx.strokeStyle = lang.colorHex;
      ctx.lineWidth = isSelected ? 2.5 : 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // 5. Crisp Glowing Sphere Outlines
    // Main boundary
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.85)";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Inner subtle glow rim
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 1, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Outer coordinate ticks
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 12, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 7]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.restore();
  }, [graticule, hoveredLang, landFeature, projection, radius, selectedLangs, size]);

  // Smooth rotation animation loop
  useEffect(() => {
    const tick = () => {
      if (!isDragging.current) {
        // Continuous slow rotation
        targetRotation.current[0] += 0.15;
      }

      // Smooth lerp
      setRotation((prev) => {
        const dLambda = (targetRotation.current[0] - prev[0]) * 0.1;
        const dPhi = (targetRotation.current[1] - prev[1]) * 0.1;
        return [prev[0] + dLambda, prev[1] + dPhi];
      });

      renderMap();
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [renderMap]);

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    targetRotation.current = [
      targetRotation.current[0] + dx * 0.4,
      Math.max(-60, Math.min(60, targetRotation.current[1] - dy * 0.4)),
    ];
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
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

  // Focus globe towards language when clicked
  const focusLanguage = (lang: Language) => {
    targetRotation.current = [-lang.lng, -lang.lat * 0.5];
    toggleLanguage(lang.id);
  };

  // Node position helper: projects [lng, lat] to [x, y], returns null if on backside
  const getNodePos = (lng: number, lat: number) => {
    const coords = projection([lng, lat]);
    if (!coords) return null;

    // Check if point is on visible hemisphere
    const r = projection.rotate();
    const centerLng = -r[0];
    const centerLat = -r[1];

    // Spherical distance from center of visible hemisphere
    const dLng = ((lng - centerLng) * Math.PI) / 180;
    const lat1 = (lat * Math.PI) / 180;
    const lat2 = (centerLat * Math.PI) / 180;
    const cosDistance = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLng);

    if (cosDistance <= 0.05) return null; // hidden on the backside

    return { x: coords[0], y: coords[1], opacity: Math.min(1, cosDistance * 2) };
  };

  const originPos = getNodePos(ORIGIN_LNG, ORIGIN_LAT);

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
          
          {/* Globe Canvas & Interactive Overlay */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div
              className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] select-none cursor-grab active:cursor-grabbing flex items-center justify-center touch-none"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Outer Atmosphere Ambient Halo */}
              <div className="absolute inset-4 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

              {/* D3 Orthographic World Map Canvas */}
              <canvas
                ref={canvasRef}
                style={{ width: size, height: size }}
                className="relative z-10 w-full h-full rounded-full pointer-events-none"
              />

              {/* SVG Overlay: Non-overlapping Pins, Leader Lines, and Pill Badges */}
              <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="absolute inset-0 z-20 w-full h-full pointer-events-none"
              >
                {/* Origin Marker (India) */}
                {originPos && (
                  <g style={{ opacity: originPos.opacity }}>
                    <circle cx={originPos.x} cy={originPos.y} r="14" fill="none" stroke="#38bdf8" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
                    <circle cx={originPos.x} cy={originPos.y} r="5" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
                  </g>
                )}

                {/* Language Nodes with Leader Lines and Non-Overlapping Labels */}
                {LANGUAGES.map((lang) => {
                  const pos = getNodePos(lang.lng, lang.lat);
                  if (!pos) return null;

                  const isSelected = selectedLangs.has(lang.id);
                  const isHovered = hoveredLang === lang.id;
                  const isActive = isSelected || isHovered;

                  const targetX = pos.x + lang.labelOffset.dx;
                  const targetY = pos.y + lang.labelOffset.dy;
                  const midX = pos.x + lang.labelOffset.dx * 0.4;

                  return (
                    <g
                      key={lang.id}
                      style={{ opacity: pos.opacity, pointerEvents: "auto", cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        focusLanguage(lang);
                      }}
                      onMouseEnter={() => setHoveredLang(lang.id)}
                      onMouseLeave={() => setHoveredLang(null)}
                      className="group"
                    >
                      {/* Angled Leader Line from Dot to Label */}
                      <path
                        d={`M ${pos.x} ${pos.y} L ${midX} ${targetY} L ${targetX} ${targetY}`}
                        fill="none"
                        stroke={isActive ? lang.colorHex : "rgba(255,255,255,0.3)"}
                        strokeWidth={isActive ? "1.75" : "1"}
                        strokeDasharray={isActive ? "none" : "2 3"}
                        className="transition-all duration-300"
                      />

                      {/* Geographic Pin Dot */}
                      {isActive && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="12"
                          fill="none"
                          stroke={lang.colorHex}
                          strokeWidth="1.5"
                          opacity="0.7"
                          className="animate-ping"
                        />
                      )}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isActive ? "5" : "3.5"}
                        fill={lang.colorHex}
                        stroke="#ffffff"
                        strokeWidth={isActive ? "2" : "1"}
                        className="transition-all duration-300"
                      />

                      {/* Floating Non-Overlapping Badge at leader tip */}
                      <g transform={`translate(${targetX}, ${targetY})`}>
                        {/* Background Pill */}
                        <rect
                          x={lang.labelOffset.dx > 0 ? 0 : -56}
                          y="-10"
                          width="56"
                          height="20"
                          rx="10"
                          fill={isActive ? "#0f172a" : "rgba(15, 23, 42, 0.85)"}
                          stroke={isActive ? lang.colorHex : "rgba(255,255,255,0.2)"}
                          strokeWidth="1"
                          className="shadow-lg backdrop-blur-md transition-all duration-300"
                        />

                        {/* Status Light */}
                        <circle
                          cx={lang.labelOffset.dx > 0 ? 9 : -47}
                          cy="0"
                          r="3"
                          fill={lang.colorHex}
                        />

                        {/* Language Code */}
                        <text
                          x={lang.labelOffset.dx > 0 ? 17 : -39}
                          y="3.5"
                          fill="#ffffff"
                          fontSize="9.5"
                          fontWeight="700"
                          fontFamily="monospace"
                          className="tracking-wider uppercase pointer-events-none"
                        >
                          {lang.id}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Drag Tip */}
            <p className="text-xs text-zinc-500 font-mono tracking-wider mt-4 text-center">
              [ DRAG TO ROTATE GLOBE • CLICK NODES TO INSPECT ]
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
                  onClick={() => focusLanguage(lang)}
                  onHoverStart={() => setHoveredLang(lang.id)}
                  onHoverEnd={() => setHoveredLang(null)}
                  whileHover={{ y: -3 }}
                  className={`p-6 rounded-3xl backdrop-blur-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected || isHovered
                      ? "bg-zinc-900/60 border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.6)]"
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
