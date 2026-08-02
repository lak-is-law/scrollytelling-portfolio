"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

const otherAchievements = [
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
    <section ref={containerRef} className="relative bg-[#09090b] py-32 px-6 md:px-24 overflow-hidden border-t border-zinc-900/50">
      <div className="mx-auto max-w-7xl w-full">
        
        {/* Spotlight UCSI Achievement */}
        <div 
          className="relative rounded-[3rem] bg-gradient-to-br from-zinc-900/40 to-black border border-white/10 p-12 md:p-20 flex flex-col xl:flex-row items-center justify-between gap-16 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_30px_100px_-20px_rgba(0,0,0,1)]"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent pointer-events-none" />
          
          <motion.div style={{ opacity }} className="relative z-10 w-full xl:w-1/2 space-y-6">
            <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-zinc-500 uppercase mb-4">
              <span>08 // Pinnacle Achievement</span>
              <div className="h-px w-12 bg-zinc-800" />
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
              Most Innovative Solution
            </h2>
            <p className="text-2xl text-zinc-300 font-light">
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
              className="w-full h-full relative rounded-3xl bg-zinc-900/20 backdrop-blur-3xl border border-white/10 flex items-center justify-center group shadow-2xl"
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
          <h3 className="text-2xl font-medium text-white mb-10 text-center md:text-left">Other Accolades</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherAchievements.map((achieve, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-3xl bg-zinc-900/20 border border-zinc-800/50 hover:border-zinc-700 transition-colors"
              >
                <h4 className="text-lg font-medium text-zinc-200 mb-2">{achieve.title}</h4>
                <p className="text-sm text-zinc-500">{achieve.context}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
