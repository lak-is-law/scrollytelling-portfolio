"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

type Category = "ALL TIMELINE" | "ENGINEERING" | "LEADERSHIP" | "AWARDS & HONORS" | "CREDENTIALS";

interface TimelineItem {
  id: string;
  category: Category;
  title: string;
  organization: string;
  date?: string;
  description?: string;
  tech?: string[];
  logo?: string;
  image?: string;
  spotlight?: boolean;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "int-1",
    category: "ENGINEERING",
    title: "Full Stack Developer Intern",
    organization: "BufferTech",
    date: "Feb 2024 to Aug 2024",
    description: "Developed and maintained full-stack web applications in a professional production environment. Awarded verified Certificate of Internship.",
    tech: ["React.js", "Firebase", "RESTful APIs", "JavaScript"],
  },
  {
    id: "int-2",
    category: "ENGINEERING",
    title: "Co-lead, Design, Media & Editing",
    organization: "6Pistons",
    date: "Dec 2024 to Sep 2025",
    description: "Co-led design, media production, and content editing across creative projects in a hybrid environment.",
    tech: ["Design", "Media Production", "Editing"],
  },
  {
    id: "lead-1",
    category: "LEADERSHIP",
    title: "Public Relations Intern",
    organization: "Cherry+ Network",
    description: "Managed PR campaigns, Instagram reel ideation, and contributed to corporate social responsibility initiatives.",
    logo: "/logos/cherry.png",
  },
  {
    id: "lead-2",
    category: "LEADERSHIP",
    title: "Editorial Associate",
    organization: "Coding Ninjas 10X Club",
    description: "Led editorial strategy and organized technical events, shifting from execution to strategic planning.",
    logo: "/logos/images-2.jpeg",
  },
  {
    id: "lead-3",
    category: "LEADERSHIP",
    title: "Committee Member",
    organization: "Aaruush, SRM University",
    description: "Planning and execution for Asia's largest student-run tech fest. Managed corporate communications and community events.",
    logo: "/logos/aaruush.png",
  },
  {
    id: "lead-4",
    category: "LEADERSHIP",
    title: "Official EMCEE",
    organization: "SRMIST Directorate of Student Affairs",
    description: "Anchored large-scale institutional events, mastering intercultural communication and stage presence.",
    logo: "/logos/images.png",
  },
  {
    id: "lead-5",
    category: "LEADERSHIP",
    title: "Trainee Lead",
    organization: "Alumni Relations (DAA)",
    description: "Mentored recruits, spearheaded engagement strategy, and served as the primary POC for high-profile alumni.",
    logo: "/logos/daa.png",
  },
  {
    id: "ach-1",
    category: "AWARDS & HONORS",
    title: "SPOTLIGHT: Most Innovative Solution",
    organization: "UCSI Consulting Group Pitch Competition, Malaysia",
    date: "Jan 2025",
    description: "Awarded during an intensive Entrepreneurship Immersion Programme at UCSI University in Kuala Lumpur, Malaysia. Recognized for delivering a groundbreaking strategic solution under high-pressure consulting constraints.",
    image: "/images/ucsi-award.jpg",
    spotlight: true,
  },
  {
    id: "ach-2",
    category: "AWARDS & HONORS",
    title: "Semi-Finalist",
    organization: "TechXcelerate, BITS Hyderabad",
  },
  {
    id: "ach-3",
    category: "AWARDS & HONORS",
    title: "Special Mention",
    organization: "ICA Model United Nations (MUN)",
  },
  {
    id: "ach-4",
    category: "AWARDS & HONORS",
    title: "Nominee",
    organization: "International Award for Young People (IAYP)",
  },
  {
    id: "ach-5",
    category: "AWARDS & HONORS",
    title: "Flight Experience",
    organization: "Commercial Jet Airliner, Singapore Flyer",
  },
  {
    id: "cert-1",
    category: "CREDENTIALS",
    title: "Full Stack Internship",
    organization: "BufferTech",
    date: "Mar 2025",
    tech: ["Technical"],
  },
  {
    id: "cert-2",
    category: "CREDENTIALS",
    title: "Korean Language — Intermediate 1",
    organization: "Sungkyunkwan University, Coursera",
    date: "Mar 2025",
    tech: ["Linguistic"],
  },
  {
    id: "cert-3",
    category: "CREDENTIALS",
    title: "National Education Policy 2020",
    organization: "SRMIST",
    date: "Feb 2025",
    tech: ["Academic"],
  },
  {
    id: "cert-4",
    category: "CREDENTIALS",
    title: "Most Innovative Solution",
    organization: "UCSI Consulting Group, Malaysia",
    date: "Jan 2025",
    tech: ["Business / Entrepreneurship"],
  },
  {
    id: "cert-5",
    category: "CREDENTIALS",
    title: "Certified Mobile App-Developer",
    organization: "WhiteHat Jr, Mumbai",
    date: "Jan 2021",
    tech: ["Technical"],
  },
];

const CATEGORIES: Category[] = [
  "ALL TIMELINE",
  "ENGINEERING",
  "LEADERSHIP",
  "AWARDS & HONORS",
  "CREDENTIALS",
];

const CATEGORY_COLORS = {
  "ENGINEERING": "from-cyan-500 to-blue-500 text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
  "LEADERSHIP": "from-purple-500 to-fuchsia-500 text-purple-400 border-purple-500/20 bg-purple-500/10",
  "AWARDS & HONORS": "from-amber-500 to-orange-500 text-amber-400 border-amber-500/20 bg-amber-500/10",
  "CREDENTIALS": "from-emerald-500 to-teal-500 text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
};

export default function CareerTimeline() {
  const [activeFilter, setActiveFilter] = useState<Category>("ALL TIMELINE");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const filteredData = TIMELINE_DATA.filter(
    (item) => activeFilter === "ALL TIMELINE" || item.category === activeFilter
  );

  return (
    <section className="relative min-h-screen bg-[#09090b] text-white py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tight"
          >
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Intelligence</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg"
          >
            A comprehensive telemetry feed of professional evolution, engineering impact, and verified credentials.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-nowrap overflow-x-auto md:flex-wrap justify-start md:justify-center gap-3 mb-20 pb-4 no-scrollbar">
          {CATEGORIES.map((cat, idx) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveFilter(cat)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
                ${activeFilter === cat 
                  ? "text-white" 
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                }
              `}
            >
              {activeFilter === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </motion.button>
          ))}
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Animated Center Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-cyan-500 via-purple-500 to-amber-500"
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, index) => {
                const isEven = index % 2 === 0;
                // Type assertion since we know these categories map to colors except ALL TIMELINE (which isn't assigned to items)
                const colorConfig = CATEGORY_COLORS[item.category as keyof typeof CATEGORY_COLORS];

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: isEven ? -50 : 50, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                    className="relative flex items-center justify-between md:justify-normal w-full group pl-16 md:pl-0"
                  >
                    {/* Desktop left empty spacer */}
                    {isEven && <div className="hidden md:block w-5/12" />}

                    {/* Timeline Node Pulse */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#09090b] border-2 border-zinc-800 z-20 group-hover:border-zinc-500 transition-colors duration-500">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-600 group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-all duration-500" />
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                      <div className={`
                        p-6 md:p-8 rounded-3xl 
                        bg-zinc-900/30 backdrop-blur-xl 
                        border border-white/5 group-hover:border-white/15
                        transition-all duration-500 
                        hover:bg-zinc-900/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50
                        ${item.spotlight ? 'ring-1 ring-amber-500/30 ring-offset-2 ring-offset-[#09090b]' : ''}
                      `}>
                        {/* Category Badge */}
                        <div className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border mb-4 ${colorConfig} ${isEven ? 'md:ml-auto' : ''}`}>
                          {item.category}
                        </div>

                        {/* Title & Organization */}
                        <h3 className={`text-xl md:text-2xl font-bold text-white mb-2 ${item.spotlight ? 'bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500' : ''}`}>
                          {item.title}
                        </h3>
                        
                        <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          {item.logo && (
                            <div className="w-8 h-8 rounded-full bg-white/10 p-1 flex-shrink-0 overflow-hidden relative border border-white/20">
                              <Image 
                                src={item.logo} 
                                alt={item.organization} 
                                fill 
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="text-zinc-300 font-medium">{item.organization}</div>
                        </div>

                        {/* Date */}
                        {item.date && (
                          <div className="text-sm font-mono text-zinc-500 mb-4 tracking-wider uppercase">
                            {item.date}
                          </div>
                        )}

                        {/* Spotlight Image */}
                        {item.spotlight && item.image && (
                          <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden mb-6 border border-white/10">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                        )}

                        {/* Description */}
                        {item.description && (
                          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                            {item.description}
                          </p>
                        )}

                        {/* Tech/Skills Chips */}
                        {item.tech && item.tech.length > 0 && (
                          <div className={`flex flex-wrap gap-2 mt-auto ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                            {item.tech.map((t) => (
                              <span 
                                key={t} 
                                className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/5 text-zinc-300 border border-white/10"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Desktop right empty spacer */}
                    {!isEven && <div className="hidden md:block w-5/12" />}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
