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
    scale: 1.6, // Zoom in a bit so it's visible, but not overly cropped
  },
  {
    role: "Editorial Associate",
    org: "Coding Ninjas 10X Club",
    desc: "Led editorial strategy and organized technical events, shifting from execution to strategic planning.",
    logo: "/logos/images-2.jpeg",
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
    logo: "/logos/images.png",
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

  // Oscillates rapidly between -10 and 10 degrees as we scroll
  const rotate = useTransform(scrollYProgress, (v) => Math.sin(v * 200) * 10);

  return (
    <section ref={containerRef} className="relative bg-[#09090b] py-40 px-6 md:px-24 overflow-hidden border-t border-zinc-900/50">
      <div className="mx-auto max-w-4xl w-full">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6">
            The Leadership Progression.
          </h2>
          <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
            Leadership is earned through consistency. It starts with showing up, and evolves into setting the standard.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line - passes perfectly under the center of logos */}
          <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent z-0 pointer-events-none" />

          <div className="space-y-24 md:space-y-32">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative flex items-center w-full z-10"
                >
                  {/* Logo Node - Absolutely Centered on Desktop, Left on Mobile */}
                  <div className="absolute left-[28px] md:left-1/2 w-14 h-14 md:w-20 md:h-20 -translate-x-1/2 z-10 flex items-center justify-center cursor-default">
                    <motion.div 
                      style={{ rotate }}
                      className="relative w-full h-full rounded-full bg-[#09090b] shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                      <div className="relative w-full h-full" style={{ transform: `scale(${item.scale})`, transformOrigin: 'center' }}>
                        <Image 
                          src={item.logo} 
                          alt={item.org}
                          fill
                          sizes="(max-width: 768px) 56px, 80px"
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Responsive Text Block */}
                  <div className={`w-full md:w-[calc(50%-40px)] pl-[80px] md:pl-0 ${isEven ? 'md:pr-8 md:text-right md:mr-auto' : 'md:pl-8 md:text-left md:ml-auto'}`}>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">{item.role}</h3>
                    <p className="text-sm tracking-widest text-zinc-500 uppercase font-medium mb-4">{item.org}</p>
                    <p className="text-zinc-400 text-lg leading-relaxed">{item.desc}</p>
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
