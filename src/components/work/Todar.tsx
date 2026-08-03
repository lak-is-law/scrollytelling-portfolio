"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { FuturisticLaunchLink } from "@/components/ui/FuturisticNavigation";

export default function Todar() {
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
    <section ref={ref} className="relative z-20 min-h-screen bg-transparent flex items-center py-20 md:py-32 px-4 sm:px-6 md:px-24 overflow-hidden border-t border-white/[0.08]">
      {/* Signature Cyan Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.07] rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-20">
        
        {/* 3D Project Image */}
        <div className="relative aspect-square z-20 perspective-[2000px] order-last lg:order-first">
          <motion.div 
            style={{ y, scale, opacity, rotateX, rotateY, transformStyle: "preserve-3d" }} 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => window.open("https://todar.finance.lakshya.uk", "_blank", "noopener,noreferrer")}
            className="w-full h-full relative rounded-[2rem] md:rounded-[2.5rem] bg-zinc-900/30 backdrop-blur-3xl border border-cyan-500/20 shadow-[0_0_50px_-15px_rgba(6,182,212,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-cyan-400/50 hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.35)] transition-all duration-500 flex items-center justify-center group overflow-hidden cursor-pointer"
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
                src="/projects/todar-v2.jpg"
                alt="Todar 2.0"
                fill
                quality={100}
                className="object-contain"
              />
            </div>
            
            <div 
              style={{ transform: "translateZ(80px)" }}
              className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50"
            >
              <FuturisticLaunchLink 
                href="https://todar.finance.lakshya.uk" 
                label="Access Platform" 
                accent="cyan" 
              />
            </div>
          </motion.div>
        </div>

        {/* Story */}
        <div className="space-y-8 md:space-y-12 relative z-20">
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-cyan-400 uppercase">
              <span>04 // FinTech</span>
              <div className="h-px w-12 bg-cyan-500/30" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
              Todar 2.0.
            </h2>
            
            <p className="text-xl sm:text-2xl text-zinc-400 font-light leading-relaxed">
              Transforming chaos into financial clarity.
            </p>
          </div>

          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
            <p>
              Most personal finance apps suffer from one fatal flaw: friction. Todar 2.0 was architected from first principles to turn tedious financial accounting into an effortless, visual ritual.
            </p>
            <p>
              Engineered with <span className="text-white font-medium">Next.js 14</span>, <span className="text-white font-medium">TypeScript</span>, and <span className="text-white font-medium">Supabase</span>, the platform features instant ledger recalculations, dynamic budgeting vectors, and predictive burn-rate telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <div className="flex flex-wrap gap-3">
              {["Next.js 14", "TypeScript", "Tailwind CSS", "Supabase", "FinTech", "Analytics"].map((tech) => (
                <span key={tech} className="px-4 py-1.5 rounded-full border border-cyan-500/20 text-sm font-medium text-zinc-300 bg-cyan-950/20 backdrop-blur-sm shadow-[0_0_15px_-3px_rgba(6,182,212,0.15)]">
                  {tech}
                </span>
              ))}
            </div>
            <div className="pt-2 w-full relative z-30">
              <FuturisticLaunchLink 
                href="https://todar.finance.lakshya.uk" 
                label="Access Platform" 
                accent="cyan" 
              />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
