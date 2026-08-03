"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { FuturisticLaunchLink } from "@/components/ui/FuturisticNavigation";

export default function RedGambit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  // 3D Hover Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]), { stiffness: 400, damping: 30 });
  const glareOpacity = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 0.3]), { stiffness: 400, damping: 30 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["-100%", "100%"]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;
    mouseX.set(mouseXPos / width - 0.5);
    mouseY.set(mouseYPos / height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section ref={ref} className="relative min-h-screen bg-transparent flex items-center py-32 px-6 md:px-24 overflow-hidden border-t border-white/[0.08]">
      {/* Signature Cyan Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/[0.07] rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Story */}
        <div className="space-y-12 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-cyan-400 uppercase">
              <span>03 // Research</span>
              <div className="h-px w-12 bg-cyan-500/30" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
              Red Gambit.
            </h2>
            
            <p className="text-2xl text-zinc-400 font-light leading-relaxed">
              An AI research playground disguised as a strategy game.
            </p>
          </div>

          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
            <p>
              Traditional gaming platforms focus on rendering. Red Gambit focuses on cognition. By integrating <span className="text-white font-medium">KataGo</span> and <span className="text-white font-medium">Stockfish</span> agents, the platform strips away the illusion of casual gameplay, presenting the user with an almost insurmountable strategic challenge.
            </p>
            <p>
              Underneath the immersive interface lies a custom engine powered by <span className="text-white font-medium">Minimax</span>, <span className="text-white font-medium">Alpha-Beta Pruning</span>, and <span className="text-white font-medium">Iterative Deepening</span>. Moves are calculated with surgical precision, leveraging Zobrist hash transposition tables to achieve real-time algorithmic thinking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <div className="flex flex-wrap gap-3">
              {["KataGo", "Stockfish", "Minimax", "Alpha-Beta Pruning", "Zobrist Hashing", "React"].map((tech) => (
                <span key={tech} className="px-4 py-1.5 rounded-full border border-cyan-500/20 text-sm font-medium text-zinc-300 bg-cyan-950/20 backdrop-blur-sm shadow-[0_0_15px_-3px_rgba(6,182,212,0.15)]">
                  {tech}
                </span>
              ))}
            </div>
            <div className="pt-2 w-full">
              <FuturisticLaunchLink 
                href="https://red-gambit.vercel.app" 
                label="Launch Experience" 
                accent="cyan" 
              />
            </div>
          </div>
        </div>

        {/* 3D Project Image */}
        <div className="relative aspect-square z-10 perspective-[2000px]">
          <motion.div 
            style={{ y, scale, opacity, rotateX, rotateY, transformStyle: "preserve-3d" }} 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full relative rounded-[2rem] md:rounded-[2.5rem] bg-zinc-900/30 backdrop-blur-3xl border border-cyan-500/20 shadow-[0_0_50px_-15px_rgba(6,182,212,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-cyan-400/50 hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.35)] transition-all duration-500 flex items-center justify-center group overflow-hidden"
          >
            {/* Dynamic Glare Overlay */}
            <motion.div 
              style={{ opacity: glareOpacity, x: glareX }}
              className="absolute inset-0 z-50 pointer-events-none rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 mix-blend-overlay"
            />

            {/* Inner Floating Image container in Z-space */}
            <div 
              style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
              className="relative w-full h-full border border-white/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
            >
              <Image 
                src="/projects/red-gambit-v2.jpg"
                alt="Red Gambit"
                fill
                quality={100}
                priority
                className="object-contain"
              />
            </div>
            
            <div 
              style={{ transform: "translateZ(80px)" }}
              className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50"
            >
              <FuturisticLaunchLink 
                href="https://red-gambit.vercel.app" 
                label="Launch" 
                accent="cyan" 
              />
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
