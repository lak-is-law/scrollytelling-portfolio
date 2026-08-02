"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { arcadeAudio } from "@/utils/arcadeAudio";

interface TechFactoryGameProps {
  onUnlockVault?: () => void;
  onWin?: () => void;
}

interface RobotPart {
  id: string;
  name: string;
  category: string;
  iconType: string;
  color: string;
  slotX: number; // Percentage on blueprint
  slotY: number; // Percentage on blueprint
  description: string;
}

const ROBOT_PARTS: RobotPart[] = [
  {
    id: "npu",
    name: "Quantum NPU Core",
    category: "Cognition",
    iconType: "chip",
    color: "#38bdf8",
    slotX: 50,
    slotY: 28,
    description: "Multi-billion parameter neural inference chip."
  },
  {
    id: "gpu",
    name: "Tensor GPU Matrix",
    category: "Compute",
    iconType: "zap",
    color: "#a855f7",
    slotX: 50,
    slotY: 42,
    description: "Liquid-cooled matrix multiply tensor engine."
  },
  {
    id: "lidar",
    name: "LiDAR Vision Sensor",
    category: "Perception",
    iconType: "radar",
    color: "#34d399",
    slotX: 50,
    slotY: 18,
    description: "360-degree spatial depth sensing array."
  },
  {
    id: "battery",
    name: "Graphene Reactor",
    category: "Power",
    iconType: "battery",
    color: "#fbbf24",
    slotX: 50,
    slotY: 56,
    description: "Solid-state continuous atomic power cell."
  },
  {
    id: "ram",
    name: "Cryo RAM Modules",
    category: "Memory",
    iconType: "database",
    color: "#f43f5e",
    slotX: 38,
    slotY: 36,
    description: "Low-latency sub-nanosecond cache banks."
  },
  {
    id: "antenna",
    name: "Sub-THz Antenna",
    category: "Telemetry",
    iconType: "radio",
    color: "#38bdf8",
    slotX: 62,
    slotY: 10,
    description: "High-bandwidth edge mesh synchronization."
  },
  {
    id: "arm_l",
    name: "Servo Arm (Left)",
    category: "Actuation",
    iconType: "arm",
    color: "#94a3b8",
    slotX: 25,
    slotY: 46,
    description: "Carbon-titanium micro-dexterous manipulator."
  },
  {
    id: "arm_r",
    name: "Servo Arm (Right)",
    category: "Actuation",
    iconType: "arm",
    color: "#94a3b8",
    slotX: 75,
    slotY: 46,
    description: "Reinforced kinematic high-torque actuator."
  },
  {
    id: "legs",
    name: "Hydraulic Legs",
    category: "Mobility",
    iconType: "legs",
    color: "#64748b",
    slotX: 50,
    slotY: 80,
    description: "Dual-axis gyroscopic bipedal stabilizers."
  },
  {
    id: "cooling",
    name: "Cryogenic Cooling",
    category: "Thermal",
    iconType: "fan",
    color: "#06b6d4",
    slotX: 62,
    slotY: 36,
    description: "Superconductive heat pipe distribution grid."
  }
];

function PartSvgIcon({ type, color = "currentColor", size = 18 }: { type: string; color?: string; size?: number }) {
  switch (type) {
    case "chip":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8.5 9h7"/><path d="M8.5 15h7"/><path d="M9 8.5v7"/><path d="M15 8.5v7"/>
        </svg>
      );
    case "zap":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      );
    case "radar":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
        </svg>
      );
    case "battery":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="16" height="10" x="2" y="7" rx="2"/><line x1="22" x2="22" y1="11" y2="13"/><line x1="6" x2="6" y1="11" y2="13"/><line x1="10" x2="10" y1="11" y2="13"/>
        </svg>
      );
    case "database":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
        </svg>
      );
    case "radio":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>
        </svg>
      );
    case "arm":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
        </svg>
      );
    case "legs":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3v12l3 3v3"/><path d="M18 3v12l-3 3v3"/><line x1="6" y1="9" x2="18" y2="9"/>
        </svg>
      );
    case "fan":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12c-3.5 0-6.5-1.5-6.5-4s3-4 6.5-4 6.5 1.5 6.5 4-3 4-6.5 4Z"/><path d="M12 12c0 3.5-1.5 6.5-4 6.5s-4-3-4-6.5 1.5-6.5 4-6.5 4 3 4 6.5Z"/><path d="M12 12c3.5 0 6.5 1.5 6.5 4s-3 4-6.5 4-6.5-1.5-6.5-4 3-4 6.5-4Z"/><path d="M12 12c0-3.5 1.5-6.5 4-6.5s4 3 4 6.5-1.5 6.5-4 6.5-4-3-4-6.5Z"/>
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
        </svg>
      );
  }
}

export default function TechFactoryGame({ onUnlockVault, onWin }: TechFactoryGameProps) {
  const [placedParts, setPlacedParts] = useState<string[]>([]);
  const [selectedPart, setSelectedPart] = useState<RobotPart | null>(null);
  const [isAssembled, setIsAssembled] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);

  // Auto-select first unplaced part
  useEffect(() => {
    const unplaced = ROBOT_PARTS.find((p) => !placedParts.includes(p.id));
    setSelectedPart(unplaced || null);

    if (placedParts.length === ROBOT_PARTS.length && !isAssembled) {
      setIsAssembled(true);
      arcadeAudio.playRobotPowerOn();
      onWin?.();
    }
  }, [placedParts, isAssembled, onWin]);

  const handlePlacePart = (part: RobotPart) => {
    if (placedParts.includes(part.id)) return;

    arcadeAudio.playSnapPart();
    setPlacedParts((prev) => [...prev, part.id]);

    // Trigger Sparks at slot position
    const sparkId = Date.now();
    setSparks((prev) => [...prev, { id: sparkId, x: part.slotX, y: part.slotY }]);
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== sparkId));
    }, 600);
  };

  const handleReset = () => {
    arcadeAudio.playClick();
    setPlacedParts([]);
    setIsAssembled(false);
  };

  return (
    <div className="relative w-full h-full min-h-[560px] flex flex-col md:flex-row items-center justify-between p-4 md:p-8 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 text-white font-mono select-none overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-15 pointer-events-none" />

      {/* LEFT: Conveyor Parts Bay */}
      <div className="relative z-10 w-full md:w-80 flex flex-col justify-between h-full space-y-4 mb-4 md:mb-0">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Component Bay
            </span>
            <span className="text-xs text-zinc-500 font-bold">
              {placedParts.length} / {ROBOT_PARTS.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-4 border border-zinc-800">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400"
              style={{ width: `${(placedParts.length / ROBOT_PARTS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Parts List */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {ROBOT_PARTS.map((part) => {
              const isPlaced = placedParts.includes(part.id);
              const isCurrent = selectedPart?.id === part.id;

              return (
                <button
                  key={part.id}
                  onClick={() => {
                    if (!isPlaced) {
                      handlePlacePart(part);
                    }
                  }}
                  onMouseEnter={() => arcadeAudio.playHover()}
                  disabled={isPlaced}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                    isPlaced
                      ? "bg-zinc-900/40 border-zinc-800 text-zinc-600 opacity-60 cursor-default"
                      : isCurrent
                      ? "bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-white"
                      : "bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:bg-zinc-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <PartSvgIcon type={part.iconType} color={part.color} size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold">{part.name}</h4>
                      <p className="text-[10px] text-zinc-500">{part.category}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-zinc-700 bg-zinc-950">
                    {isPlaced ? "DOCKED" : "INSTALL ➔"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={handleReset}
          className="py-2 px-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          ↺ Reset Assembly
        </button>
      </div>

      {/* RIGHT: Blueprint Schematic Assembly View */}
      <div className="relative z-10 flex-1 w-full max-w-xl h-full flex flex-col items-center justify-center p-4">
        {/* Holographic Assembly Chamber */}
        <div className="relative w-full aspect-[4/5] max-h-[460px] rounded-3xl bg-zinc-950/90 border border-cyan-500/30 shadow-[inset_0_0_40px_rgba(6,182,212,0.1),0_0_40px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center">
          {/* Central Grid Coordinates */}
          <div className="absolute top-4 left-4 text-[10px] text-cyan-500/60 uppercase">
            SPEC: AI-BOT-V2 // LAKSHYA.OS
          </div>
          <div className="absolute top-4 right-4 text-[10px] text-emerald-400/80 uppercase">
            {isAssembled ? "ONLINE [READY TO HIRE]" : "ASSEMBLY IN PROGRESS"}
          </div>

          {/* Spark Particle Bursts */}
          {sparks.map((s) => (
            <motion.div
              key={s.id}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-8 h-8 rounded-full bg-cyan-400/80 blur-sm pointer-events-none z-30"
              style={{ left: `${s.x}%`, top: `${s.y}%`, transform: "translate(-50%, -50%)" }}
            />
          ))}

          {/* Robot Blueprint Wireframe SVG */}
          <svg className="absolute inset-0 w-full h-full p-8 pointer-events-none" viewBox="0 0 100 100">
            {/* Chassis Outline */}
            <path
              d="M 40 25 L 60 25 L 65 60 L 35 60 Z"
              fill="none"
              stroke={isAssembled ? "#22c55e" : "#0284c7"}
              strokeWidth="0.8"
              strokeDasharray="2, 2"
              className={isAssembled ? "transition-colors duration-1000" : ""}
            />

            {/* Arm Joint Lines */}
            <line x1="38" y1="36" x2="25" y2="46" stroke="#0369a1" strokeWidth="0.6" strokeDasharray="1, 1" />
            <line x1="62" y1="36" x2="75" y2="46" stroke="#0369a1" strokeWidth="0.6" strokeDasharray="1, 1" />

            {/* Leg Lines */}
            <line x1="42" y1="60" x2="42" y2="80" stroke="#0369a1" strokeWidth="0.8" strokeDasharray="1, 1" />
            <line x1="58" y1="60" x2="58" y2="80" stroke="#0369a1" strokeWidth="0.8" strokeDasharray="1, 1" />
          </svg>

          {/* Interactive Socket Target Nodes */}
          {ROBOT_PARTS.map((part) => {
            const isPlaced = placedParts.includes(part.id);

            return (
              <motion.div
                key={part.id}
                onClick={() => handlePlacePart(part)}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${part.slotX}%`, top: `${part.slotY}%` }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaced ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-zinc-900 border flex flex-col items-center justify-center shadow-lg relative"
                    style={{ borderColor: part.color, boxShadow: `0 0 20px ${part.color}40` }}
                  >
                    <PartSvgIcon type={part.iconType} color={part.color} size={18} />
                    <span className="text-[8px] font-bold" style={{ color: part.color }}>
                      {part.id.toUpperCase()}
                    </span>
                  </motion.div>
                ) : (
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl border-2 border-dashed border-cyan-500/40 bg-cyan-950/20 flex flex-col items-center justify-center text-cyan-400/60 group-hover:border-cyan-400 group-hover:bg-cyan-900/40 transition-all">
                    <span className="text-xs opacity-50">+</span>
                    <span className="text-[7px] uppercase font-bold tracking-tighter opacity-60">
                      {part.id}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Grand Activation Victory Sequence */}
          <AnimatePresence>
            {isAssembled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center z-40 space-y-4"
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-[0_0_50px_rgba(6,182,212,0.6)]">
                  <div className="w-full h-full bg-black/80 rounded-[22px] flex items-center justify-center text-cyan-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8.5 9h7"/><path d="M8.5 15h7"/><path d="M9 8.5v7"/><path d="M15 8.5v7"/></svg>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-bold">
                    System Fully Operational
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    AI ARCHITECTURE ASSEMBLED
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                    You assembled the full AI Architecture and earned the <strong>AI Architect Badge</strong>!
                  </p>
                </div>

                {onUnlockVault && (
                  <button
                    onClick={onUnlockVault}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(6,182,212,0.6)] cursor-pointer"
                  >
                    Open Developer Vault ➔
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
