import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Lakshya Agarwal",
  description: "Privacy commitments and zero-surveillance architecture of lakshya.uk.",
};

export default function PrivacyPage() {
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
          LEGAL DOSSIER // PRIVACY POLICY
        </span>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm font-mono text-zinc-400">Effective Date: October 2026</p>
      </header>

      <article className="space-y-8 text-zinc-300 font-light text-base leading-relaxed">
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-emerald-500/20 text-emerald-300">
          <strong className="block text-white font-medium mb-1">Zero-Surveillance Core:</strong>
          lakshya.uk is designed from first principles with client-side execution and strict privacy boundaries. No tracking cookies, no fingerprinting scripts, and zero advertising beacons are ever executed.
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">1. Edge & Client-Side Inference</h2>
          <p>
            Interactive computer vision experiences (such as the Spider-Verse AR Portal) run locally on your device via compiled WebAssembly (MediaPipe WASM). Camera telemetry and landmark coordinates are processed entirely inside browser memory and are never streamed, recorded, or transmitted over any network socket.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">2. Local Storage Persistence</h2>
          <p>
            The website uses HTML5 <code className="text-emerald-300 font-mono text-xs">localStorage</code> solely to persist user interface state preferences—such as your chosen audio mute status and local interactive mini-game high scores. This data remains on your physical client device.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">3. Direct Correspondence</h2>
          <p>
            If you initiate direct correspondence via <code className="text-emerald-300 font-mono text-xs">contact@lakshya.uk</code>, your communication details are used solely to conduct reciprocal professional communication and are never retained for marketing or commercial redistribution.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">4. External Links</h2>
          <p>
            This website provides links to subdomains (e.g. <code className="text-emerald-300 font-mono text-xs">resume.lakshya.uk</code>, <code className="text-emerald-300 font-mono text-xs">locate.art.lakshya.uk</code>) and third-party credential verification registries (Coursera, HackerRank, NTU). When navigating to external domains, their respective privacy standards govern.
          </p>
        </section>
      </article>

      <footer className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center text-xs font-mono text-zinc-500">
        <span>© {new Date().getFullYear()} Lakshya Agarwal</span>
        <Link href="/" className="text-cyan-400 hover:text-white transition-colors">
          lakshya.uk
        </Link>
      </footer>
    </main>
  );
}
