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
    labelOffset: { dx: -68, dy: -35 },
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
    labelOffset: { dx: -65, dy: -35 },
  },
  {
    id: "guj",
    name: "Gujarati",
    level: "Conversational / Heritage",
    usage: "Regional Business Communication & Heritage Fluency",
    region: "Western India",
    colorHex: "#f97316", // orange-400
    lng: 72.6,
    lat: 23.0,
    isLearning: false,
    labelOffset: { dx: -65, dy: 35 },
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
    labelOffset: { dx: 55, dy: 25 },
  },
  {
    id: "man",
    name: "Mandarin Chinese",
    level: "Elementary / Active Study",
    usage: "Active Study — Hanzi Characters, Pinyin & Global Commerce",
    region: "East Asia",
    colorHex: "#22d3ee", // cyan-400
    lng: 116.4,
    lat: 39.9,
    isLearning: true,
    labelOffset: { dx: -60, dy: -40 },
  },
];

// Origin Hub: India (New Delhi base: 77.2°E, 28.6°N)
const ORIGIN_LNG = 77.2;
const ORIGIN_LAT = 28.6;

// Pre-computed Land Feature geometry
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CACHED_LAND_FEATURE = topojson.feature(worldData as any, worldData.objects.land as any);

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export default function GlobalMatrix() {
  const [selectedLangs, setSelectedLangs] = useState<Set<string>>(new Set(["eng", "hin", "guj"]));
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentRotation = useRef<[number, number]>([-75, -18]);
  const targetRotation = useRef<[number, number]>([-75, -18]);
  const isDragging = useRef(false);
  const lastPointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pulseTimer = useRef<number>(0);

  const graticule = useMemo(() => geoGraticule10(), []);

  // Globe dimensions
  const size = 440;
  const radius = 175;

  // Intersection Observer to suspend 60fps RAF when section is offscreen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getProjection = useCallback((rot: [number, number]) => {
    return geoOrthographic()
      .scale(radius)
      .translate([size / 2, size / 2])
      .clipAngle(90)
      .rotate(rot);
  }, [radius, size]);

  const renderGlobe = useCallback((rot: [number, number], pulse: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    if (canvas.width !== Math.floor(size * dpr)) {
      canvas.width = Math.floor(size * dpr);
      canvas.height = Math.floor(size * dpr);
    }
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    const proj = getProjection(rot);
    const path = geoPath(proj, ctx);
    const cx = size / 2;
    const cy = size / 2;

    // 1. Deep Ocean Sphere Background
    const oceanGrad = ctx.createRadialGradient(cx - 35, cy - 35, 20, cx, cy, radius);
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

    // 3. Continents Landmass Fill & High-Contrast Cyberpunk Borders
    ctx.beginPath();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    path(CACHED_LAND_FEATURE as any);
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

    // 5. Origin Beacon Marker (India)
    const originPos = proj([ORIGIN_LNG, ORIGIN_LAT]);
    if (originPos) {
      const pingRadius = 6 + (pulse % 1) * 12;
      const pingAlpha = Math.max(0, 1 - (pulse % 1));
      
      // Ping ring
      ctx.beginPath();
      ctx.arc(originPos[0], originPos[1], pingRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(56, 189, 248, ${pingAlpha * 0.7})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Core dot
      ctx.beginPath();
      ctx.arc(originPos[0], originPos[1], 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 6. Geographic Pins, Angled Leader Lines, and Badges
    LANGUAGES.forEach((lang) => {
      const pos = proj([lang.lng, lang.lat]);
      if (!pos) return;

      const isSelected = selectedLangs.has(lang.id);
      const isHovered = hoveredLang === lang.id;
      const isActive = isSelected || isHovered;

      const targetX = pos[0] + lang.labelOffset.dx;
      const targetY = pos[1] + lang.labelOffset.dy;
      const midX = pos[0] + lang.labelOffset.dx * 0.4;

      // Draw Angled Leader Line
      ctx.beginPath();
      ctx.moveTo(pos[0], pos[1]);
      ctx.lineTo(midX, targetY);
      ctx.lineTo(targetX, targetY);
      ctx.strokeStyle = isActive ? lang.colorHex : "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = isActive ? 1.75 : 1;
      if (!isActive) ctx.setLineDash([2, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Geographic Pin Dot
      if (isActive) {
        const pingR = 5 + (pulse % 1) * 10;
        const pingA = Math.max(0, 1 - (pulse % 1));
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], pingR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${parseInt(lang.colorHex.slice(1,3),16)}, ${parseInt(lang.colorHex.slice(3,5),16)}, ${parseInt(lang.colorHex.slice(5,7),16)}, ${pingA * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(pos[0], pos[1], isActive ? 5 : 3.5, 0, Math.PI * 2);
      ctx.fillStyle = lang.colorHex;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = isActive ? 2 : 1;
      ctx.stroke();

      // Floating Badge Pill
      const badgeW = 58;
      const badgeH = 22;
      const badgeR = 11;
      const badgeX = lang.labelOffset.dx > 0 ? targetX : targetX - badgeW;
      const badgeY = targetY - badgeH / 2;

      drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, badgeR);
      ctx.fillStyle = isActive ? "#0f172a" : "rgba(15, 23, 42, 0.9)";
      ctx.fill();
      ctx.strokeStyle = isActive ? lang.colorHex : "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = isActive ? 1.5 : 1;
      ctx.stroke();

      // Status indicator dot inside badge
      const dotX = badgeX + 10;
      const dotY = badgeY + badgeH / 2;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
      ctx.fillStyle = lang.colorHex;
      ctx.fill();

      // Language Code Text inside badge
      ctx.font = "bold 10px monospace";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(lang.id.toUpperCase(), badgeX + 18, dotY + 0.5);
    });

    // 7. Sphere Outlines
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.85)";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, radius - 1, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, radius + 12, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 7]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.restore();
  }, [getProjection, graticule, hoveredLang, radius, selectedLangs, size]);

  // Unified Animation Loop with Intersection Pause
  useEffect(() => {
    if (!isIntersecting) return;

    let animationId: number;

    const loop = () => {
      if (!isDragging.current) {
        targetRotation.current[0] += 0.15;
      }

      const cur = currentRotation.current;
      const tgt = targetRotation.current;
      cur[0] += (tgt[0] - cur[0]) * 0.1;
      cur[1] += (tgt[1] - cur[1]) * 0.1;

      pulseTimer.current = (pulseTimer.current + 0.02) % 1;

      renderGlobe(cur, pulseTimer.current);
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [isIntersecting, renderGlobe]);

  const toggleLanguage = (id: string) => {
    setSelectedLangs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const focusLanguage = (lang: Language) => {
    targetRotation.current = [-lang.lng, -lang.lat * 0.5];
    toggleLanguage(lang.id);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging.current) {
      const dx = e.clientX - lastPointerPos.current.x;
      const dy = e.clientY - lastPointerPos.current.y;
      lastPointerPos.current = { x: e.clientX, y: e.clientY };

      targetRotation.current = [
        targetRotation.current[0] + dx * 0.45,
        Math.max(-60, Math.min(60, targetRotation.current[1] - dy * 0.45)),
      ];
    } else {
      const rect = canvas.getBoundingClientRect();
      const scale = size / rect.width;
      const mouseX = (e.clientX - rect.left) * scale;
      const mouseY = (e.clientY - rect.top) * scale;

      const proj = getProjection(currentRotation.current);
      let found: string | null = null;

      LANGUAGES.forEach((lang) => {
        const pos = proj([lang.lng, lang.lat]);
        if (!pos) return;

        const targetX = pos[0] + lang.labelOffset.dx;
        const targetY = pos[1] + lang.labelOffset.dy;
        const badgeW = 58;
        const badgeH = 22;
        const badgeX = lang.labelOffset.dx > 0 ? targetX : targetX - badgeW;
        const badgeY = targetY - badgeH / 2;

        const inBadge =
          mouseX >= badgeX &&
          mouseX <= badgeX + badgeW &&
          mouseY >= badgeY &&
          mouseY <= badgeY + badgeH;
        const inPin = Math.hypot(mouseX - pos[0], mouseY - pos[1]) <= 14;

        if (inBadge || inPin) {
          found = lang.id;
        }
      });

      setHoveredLang(found);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging.current) {
      const dx = Math.abs(e.clientX - lastPointerPos.current.x);
      const dy = Math.abs(e.clientY - lastPointerPos.current.y);

      if (dx < 5 && dy < 5) {
        const rect = canvas.getBoundingClientRect();
        const scale = size / rect.width;
        const mouseX = (e.clientX - rect.left) * scale;
        const mouseY = (e.clientY - rect.top) * scale;
        const proj = getProjection(currentRotation.current);

        LANGUAGES.forEach((lang) => {
          const pos = proj([lang.lng, lang.lat]);
          if (!pos) return;

          const targetX = pos[0] + lang.labelOffset.dx;
          const targetY = pos[1] + lang.labelOffset.dy;
          const badgeW = 58;
          const badgeH = 22;
          const badgeX = lang.labelOffset.dx > 0 ? targetX : targetX - badgeW;
          const badgeY = targetY - badgeH / 2;

          const inBadge =
            mouseX >= badgeX &&
            mouseX <= badgeX + badgeW &&
            mouseY >= badgeY &&
            mouseY <= badgeY + badgeH;
          const inPin = Math.hypot(mouseX - pos[0], mouseY - pos[1]) <= 14;

          if (inBadge || inPin) {
            focusLanguage(lang);
          }
        });
      }
    }

    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="matrix"
      className="relative bg-transparent py-20 md:py-32 px-4 sm:px-6 md:px-24 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Signature Indigo Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-500/[0.07] rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl w-full relative z-10">
        
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-indigo-400 uppercase mb-4 md:mb-6">
            <span>11 // Global Network</span>
            <div className="h-px w-12 bg-indigo-500/30" />
          </div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6">
            Communication Matrix.
          </h2>
          <p className="text-xl text-zinc-400 font-light max-w-2xl">
            Multilingual fluency spanning 7 languages across international technical documentation, regional heritage dialects, and active studies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Globe Canvas Container */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div
              className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] select-none flex items-center justify-center touch-none"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Outer Atmosphere Ambient Halo */}
              <div className="absolute inset-4 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

              {/* D3 Orthographic Unified World Map Canvas */}
              <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "100%", touchAction: "none" }}
                className="relative z-10 w-full h-full rounded-full cursor-grab active:cursor-grabbing"
              />
            </div>

            {/* Drag Tip */}
            <p className="text-xs text-indigo-400/80 font-mono tracking-wider mt-4 text-center">
              [ DRAG TO ROTATE GLOBE • CLICK NODES TO INSPECT ]
            </p>
          </div>

          {/* Language Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLangs.has(lang.id);
              const isHovered = hoveredLang === lang.id;

              return (
                <motion.button
                  key={lang.id}
                  type="button"
                  onClick={() => focusLanguage(lang)}
                  onHoverStart={() => setHoveredLang(lang.id)}
                  onHoverEnd={() => setHoveredLang(null)}
                  whileHover={{ y: -3 }}
                  className={`p-6 rounded-3xl backdrop-blur-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between text-left focus:outline-none focus:ring-2 focus:ring-indigo-400/50 ${
                    isSelected || isHovered
                      ? "bg-zinc-900/60 border-indigo-400/50 shadow-[0_0_35px_-5px_rgba(99,102,241,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                      : "bg-zinc-900/30 border-indigo-500/20 shadow-[0_0_30px_-10px_rgba(99,102,241,0.15),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:border-indigo-400/40 hover:bg-zinc-900/50 hover:shadow-[0_0_40px_-8px_rgba(99,102,241,0.25)]"
                  }`}
                  style={{
                    boxShadow: isSelected ? `0 0 35px -5px ${lang.colorHex}55` : undefined,
                  }}
                  aria-pressed={isSelected}
                  aria-label={`${lang.name}: ${lang.level}, ${lang.region}`}
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
                </motion.button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
