"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { arcadeAudio } from "@/utils/arcadeAudio";

interface PixelFootballGameProps {
  onUnlockVault?: () => void;
}

interface Target {
  x: number;
  y: number;
  radius: number;
  speed: number;
  dir: number;
  points: number;
  label: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
}

export default function PixelFootballGame({ onUnlockVault }: PixelFootballGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Game State
  const [goals, setGoals] = useState(0);
  const [attemptsRemaining, setAttemptsRemaining] = useState(5);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWonVault, setHasWonVault] = useState(false);
  const [isSlowMo, setIsSlowMo] = useState(false);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  // Drag and Aim state
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 300, y: 350 });
  const dragCurrent = useRef({ x: 300, y: 350 });

  // Physics & Animation refs
  const ball = useRef({
    x: 300,
    y: 350,
    z: 0,
    vx: 0,
    vy: 0,
    vz: 0,
    radius: 11,
    inFlight: false,
    scored: false,
    saved: false,
    hitPost: false,
    trail: [] as { x: number; y: number; z: number }[]
  });

  const keeper = useRef({
    x: 300,
    y: 110,
    width: 44,
    height: 64,
    vx: 0,
    targetX: 300,
    state: "idle" as "idle" | "dive_left" | "dive_right" | "dive_high" | "save" | "concede",
    diveProgress: 0
  });

  const targets = useRef<Target[]>([
    { x: 175, y: 78, radius: 20, speed: 0.6, dir: 1, points: 500, label: "TOP LEFT" },
    { x: 425, y: 78, radius: 20, speed: 0.6, dir: -1, points: 500, label: "TOP RIGHT" }
  ]);

  const particles = useRef<Particle[]>([]);
  const screenShake = useRef(0);
  const wind = useRef(0);

  // Initialize and load high score
  useEffect(() => {
    const saved = localStorage.getItem("football_highscore");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const triggerBanner = (msg: string) => {
    setBannerMessage(msg);
    setTimeout(() => {
      setBannerMessage(null);
    }, 1800);
  };

  const spawnConfetti = (x: number, y: number, golden: boolean = false) => {
    const colors = golden 
      ? ["#FBBF24", "#F59E0B", "#FEF08A", "#FFFFFF"] 
      : ["#38BDF8", "#34D399", "#F43F5E", "#FBBF24", "#A855F7", "#FFFFFF"];

    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 2;
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 5 + 3,
        life: 1,
        maxLife: 60 + Math.random() * 25
      });
    }
  };

  const resetBall = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ball.current = {
      x: 300,
      y: 350,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      radius: 11,
      inFlight: false,
      scored: false,
      saved: false,
      hitPost: false,
      trail: []
    };

    keeper.current.state = "idle";
    keeper.current.x = 300;
    keeper.current.diveProgress = 0;
    wind.current = (Math.random() - 0.5) * 1.2;
  }, []);

  const handleMiss = useCallback(() => {
    setStreak(0);
    setAttemptsRemaining((prev) => {
      const next = prev - 1;
      if (next <= 0) {
        setIsGameOver(true);
      }
      return next;
    });
  }, []);

  const handleGoal = useCallback((hitX: number, hitY: number) => {
    arcadeAudio.playGoal();
    screenShake.current = streak >= 2 ? 12 : 7;

    // Check Bonus Targets
    let bonusPoints = 0;
    let hitTargetLabel = "";
    targets.current.forEach((t) => {
      if (Math.hypot(hitX - t.x, hitY - t.y) < t.radius + 18) {
        bonusPoints += t.points;
        hitTargetLabel = t.label;
      }
    });

    const isPower = streak >= 2;
    const newStreak = streak + 1;
    const goalPoints = (1000 + bonusPoints) * newStreak;

    setStreak(newStreak);
    setScore((prev) => {
      const updated = prev + goalPoints;
      if (updated > highScore) {
        setHighScore(updated);
        localStorage.setItem("football_highscore", String(updated));
      }
      return updated;
    });

    const nextGoals = goals + 1;
    setGoals(nextGoals);

    // Confetti
    spawnConfetti(hitX, hitY, isPower);

    // Trigger Slow-Mo on Top-Bins or High Streak
    if (bonusPoints > 0 || isPower) {
      setIsSlowMo(true);
      setTimeout(() => setIsSlowMo(false), 800);
    }

    if (hitTargetLabel) {
      triggerBanner(`🎯 ${hitTargetLabel}! +${bonusPoints * newStreak} PTS`);
    } else if (isPower) {
      triggerBanner("⚡ SUPERSONIC GOAL! ⚡");
    } else {
      triggerBanner("⚽ GOAL!!!");
    }

    // Check 15 Goals Victory
    if (nextGoals >= 15 && !hasWonVault) {
      setHasWonVault(true);
      arcadeAudio.playVictoryFanfare();
      localStorage.setItem("badge_football", "true");
      if (onUnlockVault) {
        setTimeout(onUnlockVault, 2200);
      }
    }

    setTimeout(() => {
      resetBall();
    }, 1400);
  }, [goals, highScore, onUnlockVault, resetBall, streak, hasWonVault]);

  // Main Canvas Setup and Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fixed 600x420 standard resolution
    canvas.width = 600;
    canvas.height = 420;

    resetBall();

    let animationFrameId: number;

    const drawStadium = (w: number, h: number) => {
      // Crowd Stand (Top)
      const crowdGrad = ctx.createLinearGradient(0, 0, 0, 100);
      crowdGrad.addColorStop(0, "#080c14");
      crowdGrad.addColorStop(1, "#182234");
      ctx.fillStyle = crowdGrad;
      ctx.fillRect(0, 0, w, 100);

      // Animated Pixel Crowd heads
      const time = Date.now() * 0.003;
      for (let x = 12; x < w - 10; x += 14) {
        for (let y = 14; y < 85; y += 12) {
          const bob = Math.sin(time + x * 0.12) * 2;
          ctx.fillStyle = (x + y) % 3 === 0 ? "#cbd5e1" : (x % 2 === 0 ? "#ef4444" : "#3b82f6");
          ctx.fillRect(x, y + bob, 6, 6);
        }
      }

      // Stadium Floodlights
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      ctx.beginPath();
      ctx.moveTo(30, 0);
      ctx.lineTo(w / 2 - 80, 160);
      ctx.lineTo(0, 240);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(w - 30, 0);
      ctx.lineTo(w / 2 + 80, 160);
      ctx.lineTo(w, 240);
      ctx.fill();

      // Pitch Grass with Lush Stripes
      const pitchTop = 95;
      const pitchH = h - pitchTop;
      const stripeCount = 6;
      for (let i = 0; i < stripeCount; i++) {
        const y1 = pitchTop + (i * pitchH) / stripeCount;
        const stripeH = pitchH / stripeCount;
        ctx.fillStyle = i % 2 === 0 ? "#15803d" : "#166534";
        ctx.fillRect(0, y1, w, stripeH);
      }

      // Penalty Box Outline
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = 2.5;
      ctx.strokeRect(w / 2 - 180, 115, 360, 220);
      ctx.strokeRect(w / 2 - 100, 115, 200, 90);

      // Penalty Arc
      ctx.beginPath();
      ctx.arc(w / 2, 270, 45, Math.PI * 0.15, Math.PI * 0.85);
      ctx.stroke();

      // Penalty Spot
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(300, 350, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawGoal = (w: number) => {
      const goalX = w / 2 - 150;
      const goalY = 55;
      const goalW = 300;
      const goalH = 110;

      // Rear Net Background
      ctx.fillStyle = "rgba(10, 15, 29, 0.85)";
      ctx.fillRect(goalX + 15, goalY - 12, goalW - 30, goalH);

      // Net Grid Mesh
      ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
      ctx.lineWidth = 1;
      for (let x = goalX + 15; x <= goalX + goalW - 15; x += 10) {
        ctx.beginPath();
        ctx.moveTo(x, goalY - 12);
        ctx.lineTo(x, goalY + goalH);
        ctx.stroke();
      }
      for (let y = goalY - 12; y <= goalY + goalH; y += 10) {
        ctx.beginPath();
        ctx.moveTo(goalX + 15, y);
        ctx.lineTo(goalX + goalW - 15, y);
        ctx.stroke();
      }

      // White Posts and Crossbar
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";

      // Left Post
      ctx.beginPath();
      ctx.moveTo(goalX, goalY + goalH);
      ctx.lineTo(goalX, goalY);
      // Crossbar
      ctx.lineTo(goalX + goalW, goalY);
      // Right Post
      ctx.lineTo(goalX + goalW, goalY + goalH);
      ctx.stroke();

      // Depth angle posts (back corners)
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.beginPath();
      ctx.moveTo(goalX, goalY);
      ctx.lineTo(goalX + 15, goalY - 12);
      ctx.lineTo(goalX + goalW - 15, goalY - 12);
      ctx.lineTo(goalX + goalW, goalY);
      ctx.stroke();
    };

    const drawTargets = () => {
      targets.current.forEach((t) => {
        t.x += t.speed * t.dir;
        if (t.x < 170 || t.x > 430) t.dir *= -1;

        ctx.save();
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(239, 68, 68, 0.35)";
        ctx.fill();
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = "#fbbf24";
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 8.5px monospace";
        ctx.textAlign = "center";
        ctx.fillText(t.label, t.x, t.y - t.radius - 3);
        ctx.restore();
      });
    };

    const drawGoalkeeper = () => {
      const k = keeper.current;
      ctx.save();
      ctx.translate(k.x, 140);

      // Shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
      ctx.beginPath();
      ctx.ellipse(0, 18, 18, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Dive rotation
      const isDiving = k.state.includes("dive");
      const diveAngle = k.state === "dive_left" ? -0.35 : k.state === "dive_right" ? 0.35 : 0;
      ctx.rotate(diveAngle);

      // Body (Neon Green Keeper Jersey)
      ctx.fillStyle = "#22c55e";
      ctx.fillRect(-11, -24, 22, 26);

      // Shorts & Legs
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(-9, 2, 8, 12);
      ctx.fillRect(1, 2, 8, 12);

      // Head
      ctx.fillStyle = "#fcd34d";
      ctx.fillRect(-7, -38, 14, 14);
      ctx.fillStyle = "#451a03";
      ctx.fillRect(-7, -41, 14, 5);

      // Gloves
      ctx.fillStyle = "#fbbf24";
      if (isDiving) {
        ctx.fillRect(-20, -32, 9, 9);
        ctx.fillRect(11, -32, 9, 9);
      } else {
        ctx.fillRect(-16, -12, 7, 7);
        ctx.fillRect(9, -12, 7, 7);
      }

      ctx.restore();
    };

    const drawStriker = (w: number, h: number) => {
      if (ball.current.inFlight) return;

      ctx.save();
      ctx.translate(w / 2 - 32, h - 70);

      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.beginPath();
      ctx.ellipse(0, 16, 14, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ef4444";
      ctx.fillRect(-9, -26, 18, 24);

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-7, -2, 6, 11);
      ctx.fillRect(1, -2, 6, 11);

      ctx.fillStyle = "#fcd34d";
      ctx.fillRect(-6, -38, 12, 12);
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(-7, -41, 14, 5);

      ctx.fillStyle = "#f59e0b";
      ctx.fillRect(-8, 9, 8, 5);
      ctx.fillRect(2, 9, 8, 5);

      ctx.restore();
    };

    const drawBall = () => {
      const b = ball.current;

      if (b.inFlight && b.trail.length > 0) {
        b.trail.forEach((pos, i) => {
          const alpha = (i / b.trail.length) * 0.45;
          ctx.fillStyle = streak >= 2 ? `rgba(251, 191, 36, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y - pos.z, b.radius * (1 - (pos.z / 250) * 0.35), 0, Math.PI * 2);
          ctx.fill();
        });
      }

      const shadowScale = Math.max(0.3, 1 - b.z / 160);
      ctx.fillStyle = `rgba(0, 0, 0, ${0.4 * shadowScale})`;
      ctx.beginPath();
      ctx.ellipse(b.x, b.y, b.radius * shadowScale, b.radius * 0.4 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fill();

      const drawY = b.y - b.z;
      const currentRadius = Math.max(6, b.radius * (1 - (b.y < 180 ? 0.25 : 0)));

      ctx.save();
      ctx.beginPath();
      ctx.arc(b.x, drawY, currentRadius, 0, Math.PI * 2);
      
      if (streak >= 2) {
        const goldGrad = ctx.createRadialGradient(b.x - 2, drawY - 2, 2, b.x, drawY, currentRadius);
        goldGrad.addColorStop(0, "#FEF08A");
        goldGrad.addColorStop(0.5, "#FBBF24");
        goldGrad.addColorStop(1, "#D97706");
        ctx.fillStyle = goldGrad;
      } else {
        ctx.fillStyle = "#ffffff";
      }
      ctx.fill();

      ctx.strokeStyle = streak >= 2 ? "#78350f" : "#0f172a";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = streak >= 2 ? "#78350f" : "#0f172a";
      ctx.beginPath();
      ctx.arc(b.x, drawY, currentRadius * 0.35, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawAimingGuide = () => {
      const b = ball.current;
      const dx = dragStart.current.x - dragCurrent.current.x;
      const dy = dragStart.current.y - dragCurrent.current.y;
      const rawDist = Math.hypot(dx, dy);
      const power = Math.min(rawDist, 85);

      // Only show guide if user started pulling back
      if (power < 8) return;

      const angle = Math.atan2(dy, dx);
      const speed = power * 0.125;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const vz = Math.max(2.5, speed * 0.7);

      ctx.save();

      // Accurately simulate real physics steps
      const steps = 15;
      for (let i = 1; i <= steps; i++) {
        const progress = i / steps;
        const simX = b.x + vx * i * 3.4 + (wind.current * i * i * 0.08);
        const simY = b.y + vy * i * 3.4;
        const simZ = Math.max(0, vz * i * 3.4 - 0.5 * 0.35 * (i * 3.4) ** 2);
        const drawSimY = simY - simZ;

        // Keep inside top frame
        if (drawSimY < 40 || simY < 50) break;

        ctx.fillStyle = streak >= 2 ? "rgba(251, 191, 36, 0.85)" : "rgba(255, 255, 255, 0.75)";
        ctx.beginPath();
        ctx.arc(simX, drawSimY, Math.max(2, 5.5 * (1 - progress * 0.5)), 0, Math.PI * 2);
        ctx.fill();
      }

      // Drag power circle around penalty spot (clamped cleanly)
      const clampedDragX = b.x - Math.cos(angle) * power;
      const clampedDragY = b.y - Math.sin(angle) * power;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(clampedDragX, clampedDragY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = power > 70 ? "#ef4444" : power > 40 ? "#fbbf24" : "#38bdf8";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(clampedDragX, clampedDragY, 8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    const updateParticles = () => {
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life++;

        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.globalAlpha = 1;

        if (p.life >= p.maxLife) {
          particles.current.splice(i, 1);
        }
      }
    };

    const updatePhysics = (w: number) => {
      const b = ball.current;
      if (!b.inFlight) return;

      b.trail.push({ x: b.x, y: b.y, z: b.z });
      if (b.trail.length > 8) b.trail.shift();

      b.x += b.vx + wind.current * 0.35;
      b.y += b.vy;
      b.z += b.vz;
      b.vz -= 0.32; // smooth gravity

      if (b.z < 0) {
        b.z = 0;
        b.vz = -b.vz * 0.45; // bounce
      }

      // Goalkeeper AI reaction
      const k = keeper.current;
      if (b.y < 260 && k.state === "idle") {
        const targetSide = b.x < w / 2 ? "dive_left" : "dive_right";
        k.state = targetSide;
        k.targetX = b.x;
        k.vx = (b.x - k.x) * 0.08;
      }

      if (k.state.includes("dive")) {
        k.x += k.vx;
        k.x = Math.max(w / 2 - 110, Math.min(w / 2 + 110, k.x));
      }

      const goalLeft = w / 2 - 150;
      const goalRight = w / 2 + 150;

      // Goal line at y = 110
      if (b.y <= 112 && !b.scored && !b.saved && !b.hitPost) {
        // Check Post Hit
        if ((Math.abs(b.x - goalLeft) < 14 || Math.abs(b.x - goalRight) < 14) && b.z <= 110) {
          b.hitPost = true;
          b.vx = -b.vx * 0.6;
          b.vy = 3.5;
          arcadeAudio.playClick();
          triggerBanner("💥 OFF THE POST!");
          handleMiss();
          return;
        }

        // Check Goalkeeper Save
        const keeperDist = Math.hypot(b.x - k.x, (b.y - b.z) - (140 - 20));
        const saveThreshold = streak >= 2 ? 20 : 34;

        if (keeperDist < saveThreshold) {
          b.saved = true;
          k.state = "save";
          b.vx = (Math.random() - 0.5) * 5;
          b.vy = 4;
          arcadeAudio.playClick();
          triggerBanner("🧤 SAVED BY KEEPER!");
          handleMiss();
          return;
        }

        // Goal Check
        if (b.x > goalLeft + 15 && b.x < goalRight - 15 && b.z <= 105) {
          b.scored = true;
          k.state = "concede";
          handleGoal(b.x, b.y - b.z);
          return;
        }

        handleMiss();
        triggerBanner("OUT OF BOUNDS!");
      }

      // Ball out of bounds or stopped
      if (b.y < 35 || b.y > 440 || (b.saved && b.y > 320)) {
        setTimeout(() => {
          resetBall();
        }, 900);
      }
    };

    const render = () => {
      ctx.save();
      if (screenShake.current > 0) {
        const shakeX = (Math.random() - 0.5) * screenShake.current;
        const shakeY = (Math.random() - 0.5) * screenShake.current;
        ctx.translate(shakeX, shakeY);
        screenShake.current *= 0.88;
        if (screenShake.current < 0.2) screenShake.current = 0;
      }

      drawStadium(canvas.width, canvas.height);
      drawGoal(canvas.width);
      drawTargets();
      drawGoalkeeper();
      drawStriker(canvas.width, canvas.height);
      drawBall();

      if (isDragging.current && !ball.current.inFlight) {
        drawAimingGuide();
      }

      updateParticles();
      updatePhysics(canvas.width);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [resetBall, handleGoal, handleMiss, streak]);

  const handleRestart = () => {
    arcadeAudio.playClick();
    setGoals(0);
    setScore(0);
    setStreak(0);
    setAttemptsRemaining(5);
    setIsGameOver(false);
    resetBall();
  };

  // Mouse & Touch Input Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (ball.current.inFlight || isGameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = (e.clientX - rect.left) * scaleX;
    const clientY = (e.clientY - rect.top) * scaleY;

    // Start drag anywhere near bottom half or around ball
    if (clientY > 250) {
      isDragging.current = true;
      dragStart.current = { x: 300, y: 350 };
      dragCurrent.current = { x: clientX, y: clientY };
      arcadeAudio.playHover();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    dragCurrent.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const dx = dragStart.current.x - dragCurrent.current.x;
    const dy = dragStart.current.y - dragCurrent.current.y;
    const rawDist = Math.hypot(dx, dy);
    const power = Math.min(rawDist, 85);

    if (power < 12) return;

    const angle = Math.atan2(dy, dx);
    const speed = power * 0.125;
    const isPower = streak >= 2;

    arcadeAudio.playKick(isPower);

    ball.current.vx = Math.cos(angle) * speed;
    ball.current.vy = Math.sin(angle) * speed;
    ball.current.vz = Math.max(2.5, speed * 0.7);
    ball.current.inFlight = true;
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 bg-zinc-950 text-white select-none">
      {/* Retro 16-Bit HUD Header */}
      <div className="w-full max-w-2xl flex items-center justify-between px-4 py-2 bg-zinc-900/90 border border-zinc-800 rounded-2xl shadow-xl font-mono">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Goals</span>
            <span className="text-xl font-bold text-emerald-400">{goals} <span className="text-xs text-zinc-600">/ 15</span></span>
          </div>
          <div className="h-6 w-px bg-zinc-800" />
          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Score</span>
            <span className="text-xl font-bold text-amber-400">{score.toLocaleString()}</span>
          </div>
        </div>

        {/* Streak & Chances Indicator */}
        <div className="flex items-center gap-4 text-right">
          {streak >= 2 && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-black text-xs font-black uppercase tracking-wider"
            >
              🔥 {streak}x Combo
            </motion.div>
          )}

          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Chances</span>
            <div className="flex gap-1 justify-end">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i < attemptsRemaining ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "bg-zinc-800"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas Screen */}
      <div className="relative my-auto w-full max-w-2xl aspect-[600/420] rounded-2xl overflow-hidden border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] touch-none">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-full cursor-crosshair"
        />

        {/* Banner Overlay */}
        <AnimatePresence>
          {bannerMessage && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            >
              <div className="px-6 py-3 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20 text-white font-mono font-black text-xl md:text-2xl shadow-2xl tracking-widest uppercase">
                {bannerMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slow Motion Vignette */}
        {isSlowMo && (
          <div className="absolute inset-0 pointer-events-none border-4 border-amber-400/60 shadow-[inset_0_0_40px_rgba(251,191,36,0.5)] animate-pulse" />
        )}

        {/* Game Over Screen */}
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-40 space-y-4"
          >
            <h3 className="text-3xl font-bold font-mono text-red-500">FULL TIME</h3>
            <p className="text-zinc-400 text-sm max-w-xs">
              You scored {goals} goals with a final score of {score.toLocaleString()} points.
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
            >
              Play Again ↺
            </button>
          </motion.div>
        )}

        {/* 15 Goals Victory Screen */}
        {hasWonVault && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center z-50 space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center text-3xl animate-bounce">
              🏆
            </div>
            <h3 className="text-3xl font-bold font-mono text-amber-400">15 GOALS SCORED!</h3>
            <p className="text-zinc-300 text-sm max-w-sm">
              Legendary performance! You unlocked the <strong>Football Champion Badge</strong> and earned access to the Developer Vault.
            </p>
            {onUnlockVault && (
              <button
                onClick={onUnlockVault}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-black font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(245,158,11,0.6)]"
              >
                Enter Developer Vault ➔
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Footer Instructions */}
      <div className="text-center text-[11px] text-zinc-500 font-mono">
        💡 Drag back from ball to aim & power • Release to shoot • Curve the ball past the keeper!
      </div>
    </div>
  );
}
