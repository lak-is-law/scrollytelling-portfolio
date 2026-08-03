"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ElevateHub() {
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
              <span>05 // Community</span>
              <div className="h-px w-12 bg-cyan-500/30" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
              ElevateHub.
            </h2>
            
            <p className="text-2xl text-zinc-400 font-light leading-relaxed">
              Bridging the gap between talent and opportunity.
            </p>
          </div>

          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
            <p>
              ElevateHub is a professional networking platform designed to eliminate the noise of traditional job boards. It focuses purely on <span className="text-white font-medium">verification</span> and high-signal opportunity listings, creating a trusted environment for students and recruiters.
            </p>
            <p>
              Built entirely on <span className="text-white font-medium">React</span> and <span className="text-white font-medium">Firebase</span>, the full-stack architecture supports secure user authentication, real-time community forums, and deep profile-based networking.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {["React", "Firebase", "Full-Stack", "Auth", "Networking"].map((tech) => (
              <span key={tech} className="px-4 py-1.5 rounded-full border border-cyan-500/20 text-sm font-medium text-zinc-300 bg-cyan-950/20 backdrop-blur-sm shadow-[0_0_15px_-3px_rgba(6,182,212,0.15)]">
                {tech}
              </span>
            ))}
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
                src="/projects/elevate-hub-v2.jpg"
                alt="ElevateHub"
                fill
                quality={100}
                className="object-contain"
              />
            </div>
            
            <div 
              style={{ transform: "translateZ(80px)" }}
              className="absolute bottom-6 right-6 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50 bg-zinc-950/90 px-5 py-3 rounded-full backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.25)]"
            >
               <a href="https://elevatehub-1.web.app" target="_blank" rel="noreferrer" className="text-sm font-medium tracking-wider text-white uppercase hover:text-cyan-300 transition-colors">
                 View Community ↗
               </a>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
