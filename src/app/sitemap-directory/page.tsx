import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Map Directory — Lakshya Agarwal",
  description: "Complete architectural directory and live network nodes for lakshya.uk.",
};

export default function SitemapDirectoryPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 sm:py-32 max-w-4xl mx-auto font-sans">
      <div className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
        >
          <span>←</span>
          <span>Return to Portfolio</span>
        </Link>
      </div>

      <header className="mb-12 pb-6 border-b border-white/10">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2">
          SYSTEM TOPOGRAPHY // SITE MAP DIRECTORY
        </span>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
          Site Map Directory
        </h1>
        <p className="text-sm font-mono text-zinc-400">Complete index of sections, nodes, and research papers</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
        {/* Core Portfolio Sections */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
          <h2 className="text-base font-semibold text-white uppercase tracking-wider font-mono text-emerald-400 border-b border-white/5 pb-2">
            Portfolio Sections
          </h2>
          <ul className="space-y-2.5 text-zinc-300 font-mono text-xs">
            <li><Link href="/#projects" className="hover:text-cyan-300 underline">03 // Featured Projects</Link></li>
            <li><Link href="/#research" className="hover:text-cyan-300 underline">06 // Applied Research & Publications</Link></li>
            <li><Link href="/#experience" className="hover:text-cyan-300 underline">07 // Professional Experience</Link></li>
            <li><Link href="/#leadership" className="hover:text-cyan-300 underline">08 // Leadership & Public Relations</Link></li>
            <li><Link href="/#achievements" className="hover:text-cyan-300 underline">09 // Pinnacle Honors & Awards</Link></li>
            <li><Link href="/#credentials" className="hover:text-cyan-300 underline">10 // Verified Certifications</Link></li>
            <li><Link href="/#languages" className="hover:text-cyan-300 underline">11 // Interactive Tech Arsenal</Link></li>
            <li><Link href="/#matrix" className="hover:text-cyan-300 underline">12 // Global Geodesic Network</Link></li>
            <li><Link href="/#arcade" className="hover:text-cyan-300 underline">13 // Interactive Vault & Minigames</Link></li>
            <li><Link href="/#contact" className="hover:text-cyan-300 underline">14 // Open Network & Communications</Link></li>
          </ul>
        </div>

        {/* Live Deployments & Ecosystem */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
          <h2 className="text-base font-semibold text-white uppercase tracking-wider font-mono text-cyan-400 border-b border-white/5 pb-2">
            Live Subdomains & Ecosystem
          </h2>
          <ul className="space-y-2.5 text-zinc-300 font-mono text-xs">
            <li><a href="https://resume.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 underline font-semibold text-emerald-400">resume.lakshya.uk ↗ (Direct Résumé)</a></li>
            <li><a href="https://locate.art.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">locate.art.lakshya.uk ↗ (Cultural GIS)</a></li>
            <li><a href="https://trackyourflight.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">trackyourflight.lakshya.uk ↗ (Skyward Radar)</a></li>
            <li><a href="https://todar.finance.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">todar.finance.lakshya.uk ↗ (Todar 2.0 FinTech)</a></li>
            <li><a href="https://spiderverse.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">spiderverse.lakshya.uk ↗ (Spider-Verse AR)</a></li>
            <li><a href="https://jinn.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">jinn.lakshya.uk ↗ (Jinn Cognitive AI)</a></li>
            <li><a href="https://craftme.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">craftme.lakshya.uk ↗ (CraftMe 3D Voxel)</a></li>
            <li><a href="https://redgambit.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">redgambit.lakshya.uk ↗ (Red Gambit Minimax)</a></li>
            <li><a href="https://gta.lakshya.uk" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 underline">gta.lakshya.uk ↗ (Los Santos Dossier)</a></li>
          </ul>
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center text-xs font-mono text-zinc-500">
        <span>© {new Date().getFullYear()} Lakshya Agarwal</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </footer>
    </main>
  );
}
