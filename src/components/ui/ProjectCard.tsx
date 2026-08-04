"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { FuturisticLaunchLink, AccentColor } from "@/components/ui/FuturisticNavigation";

interface ProjectCardProps {
  id?: string;
  sectionNumber: string;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  tags: string[];
  launchUrl: string;
  launchLabel: string;
  imageSrc: string;
  imageAlt: string;
  accent?: AccentColor;
  layout?: "story-first" | "image-first";
}

const GLOW_COLOR_MAP: Record<AccentColor, string> = {
  cyan: "bg-cyan-500/[0.07]",
  emerald: "bg-emerald-500/[0.07]",
  gold: "bg-yellow-500/[0.07]",
  indigo: "bg-indigo-500/[0.07]",
  purple: "bg-purple-500/[0.07]",
  amber: "bg-amber-500/[0.07]",
  green: "bg-emerald-500/[0.07]",
  white: "bg-white/[0.05]",
};

const BORDER_COLOR_MAP: Record<AccentColor, string> = {
  cyan: "border-cyan-500/20 shadow-[0_0_50px_-15px_rgba(6,182,212,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-cyan-400/50 hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.35)]",
  emerald: "border-emerald-500/20 shadow-[0_0_50px_-15px_rgba(16,185,129,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-emerald-400/50 hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.35)]",
  gold: "border-yellow-500/20 shadow-[0_0_50px_-15px_rgba(234,179,8,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-yellow-400/50 hover:shadow-[0_0_60px_-10px_rgba(234,179,8,0.35)]",
  indigo: "border-indigo-500/20 shadow-[0_0_50px_-15px_rgba(99,102,241,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-indigo-400/50 hover:shadow-[0_0_60px_-10px_rgba(99,102,241,0.35)]",
  purple: "border-purple-500/20 shadow-[0_0_50px_-15px_rgba(168,85,247,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-purple-400/50 hover:shadow-[0_0_60px_-10px_rgba(168,85,247,0.35)]",
  amber: "border-amber-500/20 shadow-[0_0_50px_-15px_rgba(245,158,11,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-amber-400/50 hover:shadow-[0_0_60px_-10px_rgba(245,158,11,0.35)]",
  green: "border-emerald-500/20 shadow-[0_0_50px_-15px_rgba(16,185,129,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-emerald-400/50 hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.35)]",
  white: "border-white/20 shadow-[0_0_50px_-15px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-white/40 hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.3)]",
};

const HEADER_COLOR_MAP: Record<AccentColor, { text: string; line: string }> = {
  cyan: { text: "text-cyan-400", line: "bg-cyan-500/30" },
  emerald: { text: "text-emerald-400", line: "bg-emerald-500/30" },
  gold: { text: "text-yellow-400", line: "bg-yellow-500/30" },
  indigo: { text: "text-indigo-400", line: "bg-indigo-500/30" },
  purple: { text: "text-purple-400", line: "bg-purple-500/30" },
  amber: { text: "text-amber-400", line: "bg-amber-500/30" },
  green: { text: "text-emerald-400", line: "bg-emerald-500/30" },
  white: { text: "text-zinc-300", line: "bg-white/30" },
};

const PILL_COLOR_MAP: Record<AccentColor, string> = {
  cyan: "border-cyan-500/20 text-cyan-200 bg-cyan-950/20 shadow-[0_0_15px_-3px_rgba(6,182,212,0.15)]",
  emerald: "border-emerald-500/20 text-emerald-200 bg-emerald-950/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)]",
  gold: "border-yellow-500/20 text-yellow-200 bg-yellow-950/20 shadow-[0_0_15px_-3px_rgba(234,179,8,0.15)]",
  indigo: "border-indigo-500/20 text-indigo-200 bg-indigo-950/20 shadow-[0_0_15px_-3px_rgba(99,102,241,0.15)]",
  purple: "border-purple-500/20 text-purple-200 bg-purple-950/20 shadow-[0_0_15px_-3px_rgba(168,85,247,0.15)]",
  amber: "border-amber-500/20 text-amber-200 bg-amber-950/20 shadow-[0_0_15px_-3px_rgba(245,158,11,0.15)]",
  green: "border-emerald-500/20 text-emerald-200 bg-emerald-950/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)]",
  white: "border-white/20 text-zinc-200 bg-white/5 shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)]",
};

export default function ProjectCard({
  id,
  sectionNumber,
  title,
  subtitle,
  description,
  tags,
  launchUrl,
  launchLabel,
  imageSrc,
  imageAlt,
  accent = "cyan",
  layout = "story-first",
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
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

  const glowBg = GLOW_COLOR_MAP[accent] || GLOW_COLOR_MAP.cyan;
  const borderStyle = BORDER_COLOR_MAP[accent] || BORDER_COLOR_MAP.cyan;
  const headerStyle = HEADER_COLOR_MAP[accent] || HEADER_COLOR_MAP.cyan;
  const pillStyle = PILL_COLOR_MAP[accent] || PILL_COLOR_MAP.cyan;

  const StoryBlock = (
    <div className="space-y-8 md:space-y-12 relative z-20">
      <div className="space-y-4 md:space-y-6">
        <div className={`flex items-center gap-4 text-sm font-medium tracking-widest ${headerStyle.text} uppercase`}>
          <span>{sectionNumber}</span>
          <div className={`h-px w-12 ${headerStyle.line}`} />
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
          {title}
        </h2>

        <p className="text-xl sm:text-2xl text-zinc-400 font-light leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
        {description}
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-4">
        <div className="flex flex-wrap gap-3">
          {tags.map((tech) => (
            <span
              key={tech}
              className={`px-4 py-1.5 rounded-full border text-sm font-medium backdrop-blur-sm ${pillStyle}`}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="pt-2 w-full relative z-30">
          <FuturisticLaunchLink
            href={launchUrl}
            label={launchLabel}
            accent={accent}
          />
        </div>
      </div>
    </div>
  );

  const ImageBlock = (
    <div className="relative aspect-square z-20 perspective-[2000px]">
      <motion.div
        style={{ y, scale, opacity, rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`w-full h-full relative rounded-[2rem] md:rounded-[2.5rem] bg-zinc-900/30 backdrop-blur-3xl border ${borderStyle} transition-all duration-500 flex items-center justify-center group overflow-hidden`}
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
            src={imageSrc}
            alt={imageAlt}
            fill
            quality={95}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
          />
        </div>

        <div
          style={{ transform: "translateZ(80px)" }}
          className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50"
        >
          <FuturisticLaunchLink
            href={launchUrl}
            label="Launch"
            accent={accent}
          />
        </div>
      </motion.div>
    </div>
  );

  return (
    <section
      ref={ref}
      id={id}
      className="relative z-20 min-h-screen bg-transparent flex items-center py-20 md:py-32 px-4 sm:px-6 md:px-24 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Signature Ambient Glow */}
      <div
        className={`absolute top-1/3 ${
          layout === "story-first" ? "right-1/4" : "left-1/4"
        } w-[600px] h-[600px] ${glowBg} rounded-full blur-[160px] pointer-events-none`}
      />

      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-20">
        {layout === "story-first" ? (
          <>
            {StoryBlock}
            {ImageBlock}
          </>
        ) : (
          <>
            <div className="order-last lg:order-first">{ImageBlock}</div>
            {StoryBlock}
          </>
        )}
      </div>
    </section>
  );
}
