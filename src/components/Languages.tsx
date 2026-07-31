"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

const languages = [
  { level: "Native / Bilingual", langs: ["English", "Hindi"] },
  { level: "Full Professional", langs: ["Korean (한국어)"] },
  { level: "Professional Working", langs: ["Assamese", "Gujarati", "Mizo"] },
  { level: "Limited Working", langs: ["Mandarin Chinese", "Meiteilon (Manipuri)", "Tagalog"] },
];

function MagneticPill({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Very snappy physics for magnetic snapping
  const springConfig = { stiffness: 200, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Displacement logic (moves a fraction of the distance towards the mouse)
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.25);
    y.set(distanceY * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="px-5 py-2.5 rounded-full border border-zinc-700/50 bg-zinc-800/40 text-zinc-200 text-lg font-medium cursor-default shadow-sm backdrop-blur-md hover:bg-zinc-700/60 hover:border-zinc-500/80 hover:text-white transition-colors duration-300"
    >
      {children}
    </motion.div>
  );
}

function GlowCard({ group, index }: { group: typeof languages[0], index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  // Spotlight glow using Framer Motion template
  const background = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 40%)`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden p-8 md:p-10 rounded-3xl bg-zinc-900/20 border border-zinc-800/50 backdrop-blur-sm group-hover/grid:opacity-30 hover:!opacity-100 hover:scale-[1.02] hover:border-zinc-700/80 hover:shadow-2xl hover:shadow-white/5 transition-all duration-500 ease-out"
    >
      {/* Interactive Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-in-out"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{ background }}
      />

      <h3 className="relative z-10 text-sm font-medium text-zinc-500 uppercase tracking-widest mb-8">
        {group.level}
      </h3>
      <div className="relative z-10 flex flex-wrap gap-4">
        {group.langs.map((lang, idx) => (
          <MagneticPill key={idx}>{lang}</MagneticPill>
        ))}
      </div>
    </motion.div>
  );
}

export default function Languages() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={containerRef} className="relative bg-[#09090b] py-40 px-6 md:px-24 overflow-hidden border-t border-zinc-900/50">
      <div className="mx-auto max-w-7xl w-full">
        
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-4 text-sm font-medium tracking-widest text-zinc-500 uppercase mb-6">
            <div className="h-px w-12 bg-zinc-800" />
            <span>09 // Linguistic Range</span>
            <div className="h-px w-12 bg-zinc-800" />
          </div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6">
            Global Communication.
          </h2>
          <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
            Code connects machines, but language connects people.
          </p>
        </div>

        {/* The 'group/grid' class enables the sibling dimming focus effect */}
        <motion.div style={{ y }} className="group/grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {languages.map((group, i) => (
            <GlowCard key={i} group={group} index={i} />
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
