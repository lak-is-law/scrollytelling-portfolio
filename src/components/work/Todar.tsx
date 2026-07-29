"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

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
    <section ref={ref} className="relative min-h-screen bg-[#09090b] flex items-center py-32 px-6 md:px-24 overflow-hidden border-t border-zinc-900/50">
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* 3D Project Image */}
        <div className="relative aspect-[4/3] lg:aspect-square z-10 perspective-[2000px] order-last lg:order-first">
          <motion.div 
            style={{ y, scale, opacity, rotateX, rotateY, transformStyle: "preserve-3d" }} 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full relative rounded-[2.5rem] bg-zinc-900/40 border border-zinc-800/50 flex items-center justify-center group shadow-[0_30px_100px_-20px_rgba(0,0,0,1)]"
          >
            {/* Dynamic Glare Overlay */}
            <motion.div 
              style={{ opacity: glareOpacity, x: glareX }}
              className="absolute inset-0 z-50 pointer-events-none rounded-[2.5rem] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 mix-blend-overlay"
            />

            {/* Inner Floating Image container in Z-space */}
            <div 
              style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
              className="relative w-full h-full border border-zinc-800/30 rounded-[2.5rem] overflow-hidden bg-white/5"
            >
              <Image 
                src="/projects/todar.png"
                alt="Todar 2.0"
                fill
                quality={100}
                className="object-contain scale-[0.6] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500"
              />
            </div>
            
            <div 
              style={{ transform: "translateZ(100px)" }}
              className="absolute bottom-8 left-8 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50 bg-zinc-900/90 px-5 py-3 rounded-full backdrop-blur-xl border border-zinc-800 shadow-2xl"
            >
               <a href="https://todar.vercel.app" target="_blank" rel="noreferrer" className="text-sm font-medium tracking-wider text-white uppercase hover:text-zinc-400 transition-colors">
                 View Data Platform ↗
               </a>
            </div>
          </motion.div>
        </div>

        {/* Story */}
        <div className="space-y-12 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-zinc-500 uppercase">
              <span>04 // FinTech</span>
              <div className="h-px w-12 bg-zinc-800" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
              Todar 2.0.
            </h2>
            
            <p className="text-2xl text-zinc-400 font-light leading-relaxed">
              Transforming chaos into financial clarity.
            </p>
          </div>

          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
            <p>
              Todar 2.0 is a next-generation financial data visualization dashboard built to handle high-frequency transaction logs. I engineered the architecture to parse and render complex financial streams instantly without browser bottleneck.
            </p>
            <p>
              By leveraging <span className="text-white font-medium">Recharts</span> for WebGL-accelerated graphing and <span className="text-white font-medium">Redux</span> for state management, Todar 2.0 offers unparalleled insight into fiscal health, asset allocation, and liquidity thresholds.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {["React", "Redux", "Recharts", "Data Vis", "FinTech", "Analytics"].map((tech) => (
              <span key={tech} className="px-4 py-1.5 rounded-full border border-zinc-800 text-sm font-medium text-zinc-400 bg-zinc-900/50 backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
