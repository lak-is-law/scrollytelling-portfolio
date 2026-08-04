"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { arcadeAudio } from "@/utils/arcadeAudio";

// --- WEAPON SYSTEM INTERFACES ---
interface Weapon {
  id: "blaster" | "pulse" | "cannon" | "sniper";
  name: string;
  type: string;
  damage: number;
  cooldownMs: number;
  color: string;
  glowColor: string;
  desc: string;
  hotkey: string;
}

const WEAPONS: Weapon[] = [
  {
    id: "blaster",
    name: "Dev Blaster",
    type: "Plasma Pistol",
    damage: 60,
    cooldownMs: 180,
    color: "#38bdf8",
    glowColor: "rgba(56,189,248,0.6)",
    desc: "Standard issue rapid-fire plasma bolt.",
    hotkey: "1"
  },
  {
    id: "pulse",
    name: "AI Pulse Rifle",
    type: "Burst Beam",
    damage: 130,
    cooldownMs: 320,
    color: "#c084fc",
    glowColor: "rgba(192,132,252,0.6)",
    desc: "3-round high frequency neural laser burst.",
    hotkey: "2"
  },
  {
    id: "cannon",
    name: "Cloud Cannon",
    type: "Heavy Cluster",
    damage: 260,
    cooldownMs: 650,
    color: "#fbbf24",
    glowColor: "rgba(251,191,36,0.6)",
    desc: "Kubernetes cluster heavy impact mortar.",
    hotkey: "3"
  },
  {
    id: "sniper",
    name: "Cyber Railgun",
    type: "Quantum Sniper",
    damage: 500,
    cooldownMs: 850,
    color: "#34d399",
    glowColor: "rgba(52,211,153,0.6)",
    desc: "Instant hitscan superconductive railgun.",
    hotkey: "4"
  }
];

// --- TARGET LANGUAGE DATA ---
interface LanguageTarget {
  id: string;
  name: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  xpValue: number;
  projects: number;
  years: string;
  color: string;
  secondaryColor: string;
  description: string;
  maxHp: number;
  svgType: string;
}

const TARGETS: LanguageTarget[] = [
  {
    id: "python",
    name: "Python",
    category: "AI / ML & Algorithmic Backend",
    difficulty: "Advanced",
    xpValue: 950,
    projects: 12,
    years: "3+ Years",
    color: "#38bdf8",
    secondaryColor: "#facc15",
    description: "Deep neural networks, KataGo/Stockfish agents, and PyTorch research pipelines.",
    maxHp: 180,
    svgType: "python"
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Type-Safe Architecture",
    difficulty: "Advanced",
    xpValue: 920,
    projects: 15,
    years: "3+ Years",
    color: "#3178c6",
    secondaryColor: "#60a5fa",
    description: "Strictly typed high-scale web applications, microservices, and design systems.",
    maxHp: 160,
    svgType: "typescript"
  },
  {
    id: "react",
    name: "React / Next.js",
    category: "Modern UI Engineering",
    difficulty: "Advanced",
    xpValue: 960,
    projects: 18,
    years: "3+ Years",
    color: "#00d8ff",
    secondaryColor: "#38bdf8",
    description: "Server components, 60 FPS Framer Motion canvas physics, and reactive architectures.",
    maxHp: 170,
    svgType: "react"
  },
  {
    id: "cpp",
    name: "C++",
    category: "High-Performance Systems",
    difficulty: "Advanced",
    xpValue: 980,
    projects: 8,
    years: "2+ Years",
    color: "#00599c",
    secondaryColor: "#3b82f6",
    description: "Memory optimization, low-level minimax game trees, and zero-copy compute.",
    maxHp: 200,
    svgType: "cpp"
  },
  {
    id: "tensorflow",
    name: "TensorFlow / PyTorch",
    category: "Deep Learning & Tensors",
    difficulty: "Advanced",
    xpValue: 940,
    projects: 10,
    years: "2+ Years",
    color: "#ff6f00",
    secondaryColor: "#fbbf24",
    description: "CNN / Transformer model training, gradient optimization, and inference acceleration.",
    maxHp: 190,
    svgType: "tensorflow"
  },
  {
    id: "javascript",
    name: "JavaScript (ESNext)",
    category: "Core Dynamic Engine",
    difficulty: "Intermediate",
    xpValue: 880,
    projects: 20,
    years: "4+ Years",
    color: "#f7df1e",
    secondaryColor: "#fef08a",
    description: "Asynchronous event loop, Web Audio API synthesis, and DOM acceleration.",
    maxHp: 140,
    svgType: "javascript"
  },
  {
    id: "sql",
    name: "SQL & PostgreSQL",
    category: "Relational Data Systems",
    difficulty: "Intermediate",
    xpValue: 860,
    projects: 14,
    years: "3+ Years",
    color: "#336791",
    secondaryColor: "#38bdf8",
    description: "Complex aggregations, indexing strategies, ACID compliance, and schema scaling.",
    maxHp: 150,
    svgType: "sql"
  },
  {
    id: "java",
    name: "Java",
    category: "Enterprise OOP & Concurrency",
    difficulty: "Intermediate",
    xpValue: 840,
    projects: 6,
    years: "2+ Years",
    color: "#f89820",
    secondaryColor: "#5382a1",
    description: "Object-oriented design patterns, multithreading, and JVM systems.",
    maxHp: 150,
    svgType: "java"
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Event-Driven Runtime",
    difficulty: "Intermediate",
    xpValue: 890,
    projects: 16,
    years: "3+ Years",
    color: "#5fa04e",
    secondaryColor: "#86efac",
    description: "High-throughput RESTful streaming APIs, WebSocket clusters, and microservices.",
    maxHp: 150,
    svgType: "nodejs"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Design Token Systems",
    difficulty: "Beginner",
    xpValue: 820,
    projects: 22,
    years: "3+ Years",
    color: "#38bdf8",
    secondaryColor: "#06b6d4",
    description: "Fluid utility systems, glassmorphic interfaces, and dark theme variables.",
    maxHp: 120,
    svgType: "tailwind"
  },
  {
    id: "html5",
    name: "HTML5 & WebGL",
    category: "Semantic & GPU Shaders",
    difficulty: "Beginner",
    xpValue: 800,
    projects: 25,
    years: "4+ Years",
    color: "#e34f26",
    secondaryColor: "#f97316",
    description: "Hardware-accelerated HTML5 Canvas pipelines and accessible semantic trees.",
    maxHp: 120,
    svgType: "html5"
  },
  {
    id: "redis",
    name: "Redis & Supabase",
    category: "Realtime In-Memory Cache",
    difficulty: "Intermediate",
    xpValue: 870,
    projects: 11,
    years: "2+ Years",
    color: "#dc2626",
    secondaryColor: "#34d399",
    description: "Sub-millisecond key-value caching, Pub/Sub channels, and realtime auth.",
    maxHp: 140,
    svgType: "redis"
  }
];

// --- AUTHENTIC VECTOR LOGOS ---
function LanguageSvgIcon({ type, size = 28 }: { type: string; size?: number }) {
  switch (type) {
    case "python":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M11.91 2C6.44 2 6.78 4.38 6.78 4.38L6.79 6.85H12V7.6H4.27S2 7.34 2 12.78c0 5.45 1.97 5.25 1.97 5.25h1.18v-2.47s-.06-2.95 2.89-2.95h5.05s2.78.04 2.78-2.69V4.69S16.34 2 11.91 2zm-2.07 1.83a.92.92 0 1 1 0 1.84.92.92 0 0 1 0-1.84z" fill="#38BDF8"/>
          <path d="M12.09 22c5.47 0 5.13-2.38 5.13-2.38l-.01-2.47H12v-.75h7.73s2.27.26 2.27-5.18c0-5.45-1.97-5.25-1.97-5.25h-1.18v2.47s.06 2.95-2.89 2.95h-5.05s-2.78-.04-2.78 2.69v5.23S7.66 22 12.09 22zm2.07-1.83a.92.92 0 1 1 0-1.84.92.92 0 0 1 0 1.84z" fill="#FACC15"/>
        </svg>
      );
    case "typescript":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect width="22" height="22" x="1" y="1" rx="4" fill="#3178C6"/>
          <path d="M11.2 13.6h-2.1v6.4H6.8v-6.4H4.7V11.8h6.5v1.8zm3.6 4.6c.7.4 1.5.7 2.3.7.8 0 1.3-.3 1.3-.8 0-.5-.4-.7-1.4-1.1-1.4-.5-2.3-1.2-2.3-2.4 0-1.5 1.2-2.7 3.1-2.7 1 0 1.8.2 2.4.6l-.6 1.7c-.5-.3-1.2-.5-1.8-.5-.7 0-1.1.3-1.1.7 0 .5.4.7 1.4 1.1 1.5.6 2.3 1.3 2.3 2.5 0 1.6-1.3 2.7-3.3 2.7-1.1 0-2.1-.3-2.8-.8l.5-1.7z" fill="#FFFFFF"/>
        </svg>
      );
    case "react":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00D8FF" strokeWidth="1.6"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00D8FF" strokeWidth="1.6" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00D8FF" strokeWidth="1.6" transform="rotate(120 12 12)"/>
          <circle cx="12" cy="12" r="2.2" fill="#00D8FF"/>
        </svg>
      );
    case "cpp":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7.7v10.6L12 24l10-5.7V7.7L12 2zm-1.8 14.5c-2.3 0-4-1.7-4-4.2s1.7-4.2 4-4.2c1.3 0 2.4.5 3 1.4l-1.4 1.1c-.4-.6-1-.9-1.6-.9-1.2 0-2.2 1-2.2 2.5s1 2.5 2.2 2.5c.6 0 1.2-.3 1.6-.9l1.4 1.1c-.6.9-1.7 1.6-3 1.6zm5.8-3.3h-1.2v1.2h-.8v-1.2h-1.2v-.8h1.2v-1.2h.8v1.2H16v.8zm3.2 0H18v1.2h-.8v-1.2H16v-.8h1.2v-1.2h.8v1.2h1.2v.8z" fill="#00599C"/>
        </svg>
      );
    case "tensorflow":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 2l9 5.2v5.3l-3-1.7V8.5l-6-3.5-6 3.5v7l3 1.8v-3.5l3 1.8v3.5l-6 3.4L3 17.5V7.2L12 2z" fill="#FF6F00"/>
          <path d="M12 9.2l6 3.5v7l-6 3.5v-3.5l3-1.8v-3.5l-3-1.7v-3.5z" fill="#FFA800"/>
        </svg>
      );
    case "javascript":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect width="22" height="22" x="1" y="1" rx="4" fill="#F7DF1E"/>
          <path d="M7.5 17.5c.6.9 1.5 1.5 2.8 1.5 1.5 0 2.4-.7 2.4-2.4v-6.8H10v6.8c0 .8-.4 1.1-1.1 1.1-.4 0-.8-.1-1.1-.3l-.3 1.3zm7.2-.2c.8.5 1.8.8 2.8.8 1.6 0 2.5-.8 2.5-2 0-1.2-.8-1.7-2.2-2.3-1.4-.6-2-1.1-2-2 0-1 .9-1.9 2.4-1.9 1 0 1.8.3 2.4.7l.4-1.3c-.6-.4-1.6-.7-2.7-.7-2.3 0-3.6 1.4-3.6 3.1 0 1.3.8 2 2.3 2.6 1.3.6 1.9 1 1.9 1.8 0 .9-.8 1.4-1.8 1.4-1.1 0-2-.4-2.6-.9l-.6 1.7z" fill="#000000"/>
        </svg>
      );
    case "sql":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#336791" strokeWidth="1.8"/>
          <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#336791" strokeWidth="1.8"/>
          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke="#336791" strokeWidth="1.8"/>
        </svg>
      );
    case "java":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M8.8 19.5c3.2.2 6.5-.2 9.5-1.5-2.5.8-5.3 1-8 1-.5 0-1 0-1.5.5zm-1-2.4c3.8.3 7.8-.1 11.4-1.5-3.1.9-6.4 1.2-9.6 1.1-.6 0-1.2 0-1.8.4zm9.3-5.2c.4 1.1-.3 2.1-1.3 2.6-1.5.7-3.3.5-4.8.1-1.8-.4-3.5-1.1-5.3-1.6 1.5 1.5 3.5 2.6 5.6 3 1.9.4 4 .2 5.8-.6 1.4-.7 2.3-2 1.8-3.5h-1.8zm-1.8-3.1c.3.5.3 1 .1 1.5-.7 1.3-2.3 1.9-3.7 2-1.5.1-3-.3-4.4-.9 1.2.9 2.7 1.3 4.2 1.4 1.6 0 3.2-.5 4.3-1.7.5-.6.7-1.4.3-2.1l-.8-.2z" fill="#F89820"/>
          <path d="M12.8 2.5c-.8 1.4-1.5 2.9-1.2 4.5.3 1.5 1.5 2.6 2.5 3.7.8.8 1.5 1.8 1.6 2.9.1 1.5-.7 2.9-1.9 3.7 1.4-.9 2.3-2.4 2.1-4-.2-1.3-1-2.3-1.8-3.2-1.1-1.2-2.1-2.6-2-4.2.1-1.2.7-2.3.7-3.4z" fill="#5382A1"/>
        </svg>
      );
    case "nodejs":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 2l10 5.8v11.4L12 25 2 19.2V7.8L12 2z" stroke="#5FA04E" strokeWidth="1.8"/>
          <path d="M12 6.5l6 3.5v7l-6 3.5-6-3.5v-7l6-3.5z" fill="#5FA04E" fillOpacity="0.2"/>
        </svg>
      );
    case "tailwind":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 6c-3 0-5 1.5-6 4.5 1.5-1.5 3.2-2.1 5.2-1.8 1.2.2 2 1 3 2 1.5 1.6 3.2 3.3 6.8 3.3 3 0 5-1.5 6-4.5-1.5 1.5-3.2 2.1-5.2 1.8-1.2-.2-2-1-3-2-1.5-1.6-3.2-3.3-6.8-3.3zM6 12c-3 0-5 1.5-6 4.5 1.5-1.5 3.2-2.1 5.2-1.8 1.2.2 2 1 3 2 1.5 1.6 3.2 3.3 6.8 3.3 3 0 5-1.5 6-4.5-1.5 1.5-3.2 2.1-5.2 1.8-1.2-.2-2-1-3-2-1.5-1.6-3.2-3.3-6.8-3.3z" fill="#38BDF8"/>
        </svg>
      );
    case "html5":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3zm14.6 5.8H9.3l.2 2.4h7.9l-.6 6.7-4.8 1.3-4.8-1.3-.3-3.6h2.2l.2 1.9 2.7.7 2.7-.7.3-3.4H7.2L6.6 5.6h11.2l-.2 2.2z" fill="#E34F26"/>
        </svg>
      );
    case "redis":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M21.5 15.5l-9.5 5.5-9.5-5.5V8.5l9.5-5.5 9.5 5.5v7z" fill="#DC2626"/>
          <ellipse cx="12" cy="11.5" rx="5" ry="2.5" fill="#FFFFFF" fillOpacity="0.8"/>
          <path d="M12 9v5" stroke="#DC2626" strokeWidth="1.5"/>
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
        </svg>
      );
  }
}

// Particle interface for Canvas shooting sparks
interface HitParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface FloatingPopup {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  isCrit?: boolean;
}

export default function Languages() {
  // Range State
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon>(WEAPONS[0]);
  const [targetHp, setTargetHp] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    TARGETS.forEach((t) => (initial[t.id] = t.maxHp));
    return initial;
  });
  const [masteredTargets, setMasteredTargets] = useState<string[]>([]);
  const [totalXp, setTotalXp] = useState(0);
  const [combo, setCombo] = useState(0);
  const [shotsFired, setShotsFired] = useState(0);
  const [shotsHit, setShotsHit] = useState(0);
  const [lastShotTime, setLastShotTime] = useState(0);
  const [isAllUnlocked, setIsAllUnlocked] = useState(false);
  const [popups, setPopups] = useState<FloatingPopup[]>([]);
  const [aimPos, setAimPos] = useState({ x: 0, y: 0 });
  const [isAimingInside, setIsAimingInside] = useState(false);
  const [muzzleFlash, setMuzzleFlash] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<HitParticle[]>([]);

  // Check milestone when all 12 targets are mastered
  useEffect(() => {
    if (masteredTargets.length === TARGETS.length && !isAllUnlocked) {
      setIsAllUnlocked(true);
      arcadeAudio.playVictoryFanfare();
    }
  }, [masteredTargets, isAllUnlocked]);

  // Keyboard Hotkeys (1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const found = WEAPONS.find((w) => w.hotkey === e.key);
      if (found) {
        arcadeAudio.playWeaponSwitch();
        setSelectedWeapon(found);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Canvas particle animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
        p.life++;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - p.life / p.maxLife * 0.4), 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife) {
          particles.current.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const spawnParticles = (x: number, y: number, color: string, count: number = 22) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 1.5;
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        color,
        size: Math.random() * 4 + 2,
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 25 + 20
      });
    }
  };

  const spawnPopup = (x: number, y: number, text: string, color: string, isCrit = false) => {
    const id = Date.now() + Math.random();
    setPopups((prev) => [...prev, { id, x, y, text, color, isCrit }]);
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id));
    }, 1100);
  };

  // Weapon Sound Dispatcher
  const playWeaponSound = useCallback((wId: Weapon["id"]) => {
    switch (wId) {
      case "blaster":
        arcadeAudio.playBlaster();
        break;
      case "pulse":
        arcadeAudio.playPulseRifle();
        break;
      case "cannon":
        arcadeAudio.playCannon();
        break;
      case "sniper":
        arcadeAudio.playSniper();
        break;
    }
  }, []);

  // Shoot Target Action
  const handleShootTarget = (target: LanguageTarget, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastShotTime < selectedWeapon.cooldownMs) return;
    setLastShotTime(now);

    setShotsFired((prev) => prev + 1);
    setShotsHit((prev) => prev + 1);

    // Weapon SFX
    playWeaponSound(selectedWeapon.id);

    // Muzzle flash
    setMuzzleFlash(true);
    setTimeout(() => setMuzzleFlash(false), 80);

    const rect = e.currentTarget.getBoundingClientRect();
    const hitX = e.clientX - rect.left;
    const hitY = e.clientY - rect.top;

    // Critical Hit calculation
    const isCrit = selectedWeapon.id === "sniper" || Math.random() > 0.75;
    const multiplier = combo >= 6 ? 3 : combo >= 3 ? 2 : 1;
    const damageDealt = Math.round(selectedWeapon.damage * (isCrit ? 1.8 : 1));

    // Particle FX
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect && canvasRef.current) {
      const canvasX = e.clientX - containerRect.left;
      const canvasY = e.clientY - containerRect.top;
      spawnParticles(canvasX, canvasY, target.color, isCrit ? 35 : 20);
    }

    // Impact Sound
    arcadeAudio.playTargetHit(isCrit);

    // New Combo
    const nextCombo = combo + 1;
    setCombo(nextCombo);
    if (nextCombo % 3 === 0) {
      arcadeAudio.playComboChime(nextCombo);
    }

    // Calculate XP
    const earnedXp = Math.round((damageDealt + 50) * multiplier);
    setTotalXp((prev) => prev + earnedXp);

    // Popups
    spawnPopup(
      hitX + rect.left - (containerRect?.left || 0),
      hitY + rect.top - (containerRect?.top || 0),
      isCrit ? `CRIT +${earnedXp} XP` : `+${earnedXp} XP`,
      target.color,
      isCrit
    );

    // Target Health Reduction & Mastery Check
    setTargetHp((prev) => {
      const currentHp = prev[target.id] || target.maxHp;
      const newHp = Math.max(0, currentHp - damageDealt);

      if (newHp === 0 && !masteredTargets.includes(target.id)) {
        setMasteredTargets((m) => [...m, target.id]);
        arcadeAudio.playComboChime(8);
        spawnPopup(
          rect.left + rect.width / 2 - (containerRect?.left || 0),
          rect.top - 20 - (containerRect?.top || 0),
          `★ ${target.name.toUpperCase()} MASTERED!`,
          "#fbbf24",
          true
        );
      }
      return { ...prev, [target.id]: newHp };
    });
  };

  // Blank Shot (Miss)
  const handleRangeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastShotTime < selectedWeapon.cooldownMs) return;
    setLastShotTime(now);

    setShotsFired((prev) => prev + 1);
    setCombo(0); // reset combo streak on miss

    playWeaponSound(selectedWeapon.id);
    setMuzzleFlash(true);
    setTimeout(() => setMuzzleFlash(false), 80);

    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      const clickX = e.clientX - containerRect.left;
      const clickY = e.clientY - containerRect.top;
      spawnParticles(clickX, clickY, selectedWeapon.color, 8);
      spawnPopup(clickX, clickY - 10, "SYNTAX MISS", "#ef4444");
    }
  };

  // Mouse Move Tracking for HUD Crosshair
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setAimPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Reset Range
  const handleResetArsenal = (e: React.MouseEvent) => {
    e.stopPropagation();
    arcadeAudio.playClick();
    const freshHp: Record<string, number> = {};
    TARGETS.forEach((t) => (freshHp[t.id] = t.maxHp));
    setTargetHp(freshHp);
    setMasteredTargets([]);
    setCombo(0);
    setIsAllUnlocked(false);
  };

  // Accuracy Calculation
  const accuracy = shotsFired > 0 ? Math.round((shotsHit / shotsFired) * 100) : 100;

  // Rank Calculation
  const rank =
    totalXp > 8000
      ? "STACK MASTER"
      : totalXp > 4500
      ? "CYBER ARCHITECT"
      : totalXp > 2000
      ? "SYSTEM SPECIALIST"
      : totalXp > 800
      ? "CODE OPERATOR"
      : "JUNIOR RECRUIT";

  return (
    <section
      ref={containerRef}
      id="languages"
      onClick={handleRangeClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsAimingInside(true)}
      onMouseLeave={() => setIsAimingInside(false)}
      className="relative bg-transparent py-20 md:py-32 px-4 sm:px-6 md:px-16 overflow-hidden border-t border-white/[0.08] select-none cursor-crosshair"
    >
      {/* Background Depth Glow (Seamlessly on Global Grid) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Muzzle Flash Ambient Glare */}
      {muzzleFlash && (
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-75"
          style={{ backgroundColor: `${selectedWeapon.glowColor}` }}
        />
      )}

      {/* Canvas for dynamic hit particles */}
      <canvas
        ref={canvasRef}
        width={typeof window !== "undefined" ? window.innerWidth : 1200}
        height={1400}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* Floating Damage / XP Popups */}
      {popups.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, y: 0, scale: 0.8 }}
          animate={{ opacity: 0, y: -45, scale: p.isCrit ? 1.4 : 1.1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className={`absolute pointer-events-none z-40 font-mono font-black text-xs md:text-sm tracking-wider px-2 py-0.5 rounded backdrop-blur-sm ${
            p.isCrit
              ? "text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.9)] scale-110"
              : "drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
          }`}
          style={{ left: p.x, top: p.y, color: p.color }}
        >
          {p.text}
        </motion.div>
      ))}

      {/* HUD Crosshair (Desktop Only) */}
      {isAimingInside && (
        <div
          className="hidden md:block absolute pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
          style={{ left: aimPos.x, top: aimPos.y }}
        >
          <div
            className="w-10 h-10 rounded-full border border-dashed flex items-center justify-center animate-spin-slow"
            style={{ borderColor: selectedWeapon.color }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedWeapon.color }} />
          </div>
          <div
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-2 w-2 h-0.5"
            style={{ backgroundColor: selectedWeapon.color }}
          />
          <div
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-2 w-2 h-0.5"
            style={{ backgroundColor: selectedWeapon.color }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0.5 h-2"
            style={{ backgroundColor: selectedWeapon.color }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-0.5 h-2"
            style={{ backgroundColor: selectedWeapon.color }}
          />
        </div>
      )}

      <div className="mx-auto max-w-7xl w-full relative z-10">
        {/* RANGE HEADER & TITLE */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>10 // INTERACTIVE ARSENAL</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-4 uppercase drop-shadow-[0_0_35px_rgba(6,182,212,0.3)]">
            LANGUAGE ARSENAL
          </h2>
          <p className="text-sm sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto">
            Select your weapon. Target the stack. Master the architecture.
          </p>
        </div>

        {/* GLASS HUD STATUS BAR */}
        <div className="mb-10 p-4 md:p-6 rounded-3xl bg-zinc-950/80 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-wrap items-center justify-between gap-4 font-mono">
          {/* XP & Score */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">CODE XP</span>
              <span className="text-2xl md:text-3xl font-black text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                {totalXp.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Combo Multiplier */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-zinc-900/90 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 uppercase">COMBO:</span>
            <span
              className={`text-lg md:text-xl font-black ${
                combo >= 6
                  ? "text-amber-400 animate-pulse drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                  : combo >= 3
                  ? "text-cyan-400"
                  : "text-zinc-300"
              }`}
            >
              {combo}x STREAK
            </span>
          </div>

          {/* Accuracy Gauge */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-zinc-900/90 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 uppercase">ACCURACY:</span>
            <span className="text-lg md:text-xl font-black text-emerald-400">{accuracy}%</span>
          </div>

          {/* Developer Rank & Target Progress */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">OPERATOR RANK</span>
              <span className="text-xs md:text-sm font-bold text-amber-300 tracking-wide">{rank}</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
              {masteredTargets.length} / {TARGETS.length} MASTERED
            </div>
          </div>
        </div>

        {/* WEAPON SELECTION WHEEL / HUD */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs uppercase font-mono tracking-widest text-zinc-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Armory Loadout (Keys: 1, 2, 3, 4)
            </span>
            <button
              onClick={handleResetArsenal}
              className="text-[11px] font-mono text-zinc-500 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
            >
              ↺ Reset Targets
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {WEAPONS.map((w) => {
              const isCurrent = selectedWeapon.id === w.id;

              return (
                <button
                  key={w.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    arcadeAudio.playWeaponSwitch();
                    setSelectedWeapon(w);
                  }}
                  onMouseEnter={() => arcadeAudio.playHover()}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden font-mono ${
                    isCurrent
                      ? "bg-zinc-900 border-white/80 shadow-[0_0_25px_rgba(255,255,255,0.15)] scale-[1.02]"
                      : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:bg-zinc-900/40"
                  }`}
                >
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-zinc-500 font-bold">[{w.hotkey}] {w.type}</span>
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: w.color, boxShadow: isCurrent ? `0 0 10px ${w.color}` : "none" }}
                    />
                  </div>

                  <h4 className={`text-base font-black tracking-tight ${isCurrent ? "text-white" : "text-zinc-300"}`}>
                    {w.name}
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-light mt-1 line-clamp-1">{w.desc}</p>

                  {/* Weapon Stats Bar */}
                  <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-500 pt-2 border-t border-zinc-800">
                    <span>DMG: <strong className="text-white">{w.damage}</strong></span>
                    <span>RATE: <strong className="text-white">{w.cooldownMs}ms</strong></span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* HOLOGRAPHIC TARGETS RANGE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TARGETS.map((target) => {
            const hp = targetHp[target.id] ?? target.maxHp;
            const isMastered = masteredTargets.includes(target.id);
            const hpPercent = Math.max(0, (hp / target.maxHp) * 100);

            return (
              <motion.div
                key={target.id}
                role="button"
                tabIndex={0}
                aria-label={`Target ${target.name}: ${target.difficulty}, ${target.years}`}
                onClick={(e) => handleShootTarget(target, e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    handleShootTarget(target, e as any);
                  }
                }}
                whileHover={{ scale: 1.04, y: -6 }}
                whileTap={{ scale: 0.96 }}
                className={`relative rounded-3xl p-5 border backdrop-blur-xl transition-all duration-300 cursor-crosshair group overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-400/60 ${
                  isMastered
                    ? "bg-amber-950/20 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                    : "bg-zinc-950/80 border-zinc-800 hover:border-cyan-400/80 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
                }`}
              >
                {/* Holographic Ambient Glow Ring */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[40px] opacity-20 pointer-events-none transition-opacity group-hover:opacity-60"
                  style={{ backgroundColor: target.color }}
                />

                {/* Target Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center shadow-inner group-hover:border-white/30 transition-colors">
                      <LanguageSvgIcon type={target.svgType} size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                        {target.name}
                      </h3>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                        {target.difficulty} • {target.years}
                      </span>
                    </div>
                  </div>

                  {/* Target Status Badge */}
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-1 rounded-full border ${
                      isMastered
                        ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                        : "bg-zinc-900 border-zinc-700 text-zinc-400 group-hover:border-cyan-400 group-hover:text-cyan-300"
                    }`}
                  >
                    {isMastered ? "★ MASTERED" : "ACTIVE TARGET"}
                  </span>
                </div>

                {/* Target Description */}
                <p className="text-xs text-zinc-400 font-light mb-4 min-h-[36px] line-clamp-2">
                  {target.description}
                </p>

                {/* Health & Shield Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>STRUCTURE INTEGRITY</span>
                    <span>{Math.round(hpPercent)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <motion.div
                      className="h-full"
                      style={{
                        width: `${hpPercent}%`,
                        backgroundColor: isMastered ? "#fbbf24" : target.color
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </div>

                {/* Target Footer Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-zinc-900 font-mono text-[11px]">
                  <span className="text-zinc-500">
                    PROJECTS: <strong className="text-zinc-200">{target.projects}</strong>
                  </span>
                  <span className="text-cyan-400 font-bold">
                    +{target.xpValue} XP
                  </span>
                </div>

                {/* Crosshair Lock Reticle Indicator on Hover */}
                <div className="absolute inset-0 border-2 border-cyan-400/0 group-hover:border-cyan-400/40 rounded-3xl pointer-events-none transition-colors duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* GRAND MASTERY NOTIFICATION MODAL */}
        <AnimatePresence>
          {isAllUnlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-b from-zinc-900 via-black to-zinc-950 border border-amber-500/50 shadow-[0_0_80px_rgba(245,158,11,0.25)] text-center max-w-3xl mx-auto space-y-6"
            >
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-[0_0_40px_rgba(245,158,11,0.6)] flex items-center justify-center">
                <div className="w-full h-full bg-black/80 rounded-[22px] flex items-center justify-center text-amber-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase font-mono tracking-[0.3em] text-amber-400 font-bold">
                  TECH STACK FULLY MASTERED
                </span>
                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                  ALL WEAPON TARGETS ELIMINATED
                </h3>
                <p className="text-sm text-zinc-400 max-w-lg mx-auto font-light">
                  You conquered the entire developer range and unlocked the <strong>Stack Master</strong> badge!
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <span className="px-4 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
                  ⚡ Frontend Architect
                </span>
                <span className="px-4 py-2 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                  🤖 AI Engineer
                </span>
                <span className="px-4 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                  🗄 Data Specialist
                </span>
                <span className="px-4 py-2 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
                  ⚙ Systems Builder
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
