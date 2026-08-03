"use client";

import { motion } from "framer-motion";
import { FuturisticSocialLink, FuturisticLaunchGlyph } from "@/components/ui/FuturisticNavigation";

export default function Contact() {
  return (
    <footer className="relative bg-transparent py-32 px-6 md:px-24 border-t border-white/[0.08] overflow-hidden">
      {/* Signature Ambient Bloom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl flex flex-col items-center text-center space-y-12 relative z-10">
        
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4 text-sm font-medium tracking-widest text-emerald-400 uppercase mb-4">
            <span>13 // Open Network</span>
            <div className="h-px w-12 bg-emerald-500/30" />
          </div>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
            Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">exceptional.</span>
          </h2>
          <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
            I build sophisticated software and care deeply about quality. If you share that philosophy, my inbox is open.
          </p>
        </div>

        {/* Futuristic Command CTA */}
        <div className="flex flex-col items-center gap-6 mt-8">
          <motion.a 
            href="mailto:contact.lakshya.tech@gmail.com" 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-white text-black font-mono font-bold tracking-wider uppercase text-sm shadow-[0_0_40px_rgba(255,255,255,0.35),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />

            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,1)]" />
            </span>

            <span>Start a Conversation</span>

            <FuturisticLaunchGlyph size={16} color="#000000" />
          </motion.a>
        </div>

        <div className="pt-24 w-full flex flex-col md:flex-row justify-between items-center text-sm font-medium tracking-widest text-zinc-500 uppercase gap-6">
          <p>© {new Date().getFullYear()} LAKSHYA AGARWAL</p>
          
          {/* Custom Futuristic Social Links */}
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <FuturisticSocialLink
              href="https://linkedin.com/in/lakshya-success"
              type="linkedin"
              label="LinkedIn"
              accent="emerald"
            />
            <FuturisticSocialLink
              href="https://github.com/lak-is-law"
              type="github"
              label="GitHub"
              accent="cyan"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
