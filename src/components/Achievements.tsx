"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

const otherAchievements = [
  { title: "1st Runner Up", context: "Language Exchange, SRM PBL 2024 (Represented Korea)" },
  { title: "Semi-Finalist", context: "TechXcelerate, BITS Hyderabad" },
  { title: "Special Mention", context: "ICA Model United Nations (MUN)" },
  { title: "Nominee", context: "International Award for Young People (IAYP)" },
  { title: "Flight Experience", context: "Commercial Jet Airliner, Singapore Flyer" },
];

export default function Achievements() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  // 3D Hover Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]), { stiffness: 400, damping: 30 });
  const glareOpacity = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 0.2]), { stiffness: 400, damping: 30 });
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
    <section ref={containerRef} className="relative bg-transparent py-32 px-6 md:px-24 overflow-hidden border-t border-white/[0.08]">
      {/* Signature 24K Gold Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-yellow-500/[0.07] rounded-full blur-[180px] pointer-events-none" />

      <div className="mx-auto max-w-7xl w-full relative z-10">
        
        {/* Spotlight UCSI Achievement */}
        <div 
          className="relative rounded-[2.5rem] bg-gradient-to-br from-zinc-900/50 via-zinc-900/30 to-black/80 backdrop-blur-3xl border border-yellow-500/30 p-10 md:p-16 flex flex-col xl:flex-row items-center justify-between gap-16 shadow-[0_0_60px_-10px_rgba(234,179,8,0.22),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-yellow-400/50 hover:shadow-[0_0_70px_-5px_rgba(234,179,8,0.32)] transition-all duration-500"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-yellow-500/15 via-transparent to-transparent pointer-events-none rounded-[2.5rem]" />
          
          <motion.div style={{ opacity }} className="relative z-10 w-full xl:w-1/2 space-y-6">
            <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-yellow-400 uppercase mb-4">
              <span>08 // Pinnacle Achievement</span>
              <div className="h-px w-12 bg-yellow-500/30" />
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
              Most Innovative Solution
            </h2>
            <p className="text-2xl text-yellow-300/90 font-light">
              UCSI Consulting Group Pitch Competition
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
              Awarded during an intensive Entrepreneurship Immersion Programme at UCSI University in Kuala Lumpur, Malaysia (Jan 2025). Recognized for delivering a groundbreaking strategic solution under high-pressure consulting constraints.
            </p>
          </motion.div>
          
          {/* 3D Image Container */}
          <div className="relative z-10 w-full xl:w-1/2 perspective-[2000px] h-[300px] sm:h-[400px] lg:h-[500px]">
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-full h-full relative rounded-3xl bg-zinc-900/30 backdrop-blur-3xl border border-yellow-500/25 flex items-center justify-center group shadow-[0_0_30px_rgba(234,179,8,0.2)]"
            >
              {/* Dynamic Glare Overlay */}
              <motion.div 
                style={{ opacity: glareOpacity, x: glareX }}
                className="absolute inset-0 z-50 pointer-events-none rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 mix-blend-overlay"
              />

              {/* Inner Floating Image container in Z-space */}
              <div 
                style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
              >
                {/* Permanent Glossy Edge Gradient */}
                <div className="absolute inset-0 z-20 bg-gradient-to-br from-white/10 via-transparent to-black/60 mix-blend-overlay pointer-events-none" />
                
                <Image 
                  src="/images/ucsi-award.jpg"
                  alt="UCSI Award Achievement"
                  fill
                  quality={100}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Other Accolades Grid */}
        <div className="mt-24">
          <h3 className="text-2xl font-semibold text-white mb-10 text-center md:text-left flex items-center gap-3">
            <span>Other Accolades</span>
            <div className="h-px flex-1 max-w-[120px] bg-yellow-500/20" />
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {otherAchievements.map((achieve, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 md:p-7 rounded-3xl bg-zinc-900/30 backdrop-blur-2xl border border-yellow-500/20 shadow-[0_0_35px_-10px_rgba(234,179,8,0.15),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:border-yellow-400/50 hover:bg-zinc-900/50 hover:shadow-[0_0_45px_-8px_rgba(234,179,8,0.28)] hover:-translate-y-1.5 transition-all duration-500 group"
              >
                <div className="w-2 h-2 rounded-full bg-yellow-400 mb-4 shadow-[0_0_8px_#fde047]" />
                <h4 className="text-lg font-semibold text-white group-hover:text-yellow-300 transition-colors mb-2">{achieve.title}</h4>
                <p className="text-sm text-zinc-400 font-light">{achieve.context}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
