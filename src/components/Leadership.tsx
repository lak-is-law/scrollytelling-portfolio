"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const milestones = [
  {
    role: "Public Relations Intern",
    org: "Cherry+ Network",
    desc: "Managed PR campaigns, Instagram reel ideation, and contributed to corporate social responsibility initiatives.",
    logo: "/logos/cherry.png",
    scale: 0.5,
  },
  {
    role: "Editorial Associate",
    org: "Coding Ninjas 10X Club",
    desc: "Led editorial strategy and organized technical events, shifting from execution to strategic planning.",
    logo: "/logos/coding-ninjas.jpeg",
    scale: 1,
  },
  {
    role: "Committee Member",
    org: "Aaruush, SRM University",
    desc: "Planning and execution for Asia's largest student-run tech fest. Managed corporate communications and community events.",
    logo: "/logos/aaruush.png",
    scale: 1.1,
  },
  {
    role: "Official EMCEE",
    org: "SRMIST Directorate of Student Affairs",
    desc: "Anchored large-scale institutional events, mastering intercultural communication and stage presence.",
    logo: "/logos/srm-dsa.png",
    scale: 1.25,
  },
  {
    role: "Trainee Lead",
    org: "Alumni Relations (DAA)",
    desc: "Mentored recruits, spearheaded engagement strategy, and served as the primary POC for high-profile alumni.",
    logo: "/logos/daa.png",
    scale: 1.4,
  }
];

export default function Leadership() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth, refined inertial rotation across the scroll journey
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section ref={containerRef} id="leadership" className="relative bg-transparent py-20 md:py-40 px-4 sm:px-6 md:px-24 overflow-hidden border-t border-white/[0.08]">
      {/* Signature Amber Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-amber-500/[0.07] rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-4xl w-full relative z-10">
        <div className="mb-16 md:mb-24 text-center">
          <div className="flex items-center justify-center gap-4 text-sm font-medium tracking-widest text-amber-400 uppercase mb-4 md:mb-6">
            <span>07 // Leadership</span>
            <div className="h-px w-12 bg-amber-500/30" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight text-white mb-4 md:mb-6">
            The Leadership Progression.
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto">
            Leadership is earned through consistency. It starts with showing up, and evolves into setting the standard.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent z-0 pointer-events-none" />

          <div className="space-y-16 md:space-y-32">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="relative flex items-center w-full z-10"
                >
                  {/* Logo Node - Centered on Desktop, Left on Mobile */}
                  <div className="absolute left-[24px] md:left-1/2 w-12 h-12 md:w-20 md:h-20 -translate-x-1/2 z-10 flex items-center justify-center cursor-default">
                    <motion.div 
                      style={{ rotate }}
                      className="relative w-full h-full rounded-full bg-zinc-950 border border-amber-500/30 shadow-[0_0_25px_rgba(245,158,11,0.25)] overflow-hidden"
                    >
                      <div className="relative w-full h-full" style={{ transform: `scale(${item.scale})`, transformOrigin: 'center' }}>
                        <Image 
                          src={item.logo} 
                          alt={item.org}
                          fill
                          sizes="(max-width: 768px) 48px, 80px"
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Responsive Text Card Block with Amber Edge Lighting */}
                  <div className={`w-full md:w-[calc(50%-40px)] pl-[64px] md:pl-0 ${isEven ? 'md:pr-8 md:text-right md:mr-auto' : 'md:pl-8 md:text-left md:ml-auto'}`}>
                    <div className="p-5 sm:p-6 md:p-8 rounded-3xl bg-zinc-900/30 backdrop-blur-2xl border border-amber-500/20 shadow-[0_0_40px_-12px_rgba(245,158,11,0.18),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:border-amber-400/50 hover:bg-zinc-900/50 hover:shadow-[0_0_50px_-8px_rgba(245,158,11,0.3)] hover:-translate-y-1 transition-all duration-500 group">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white group-hover:text-amber-300 transition-colors mb-1.5">{item.role}</h3>
                      <p className="text-xs tracking-widest text-amber-400/90 font-mono uppercase font-semibold mb-3">{item.org}</p>
                      <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
