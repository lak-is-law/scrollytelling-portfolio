import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Lakshya Agarwal",
  description: "Terms of use and intellectual property notices for lakshya.uk.",
};

export default function TermsPage() {
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
          LEGAL DOSSIER // TERMS OF USE
        </span>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
          Terms of Use
        </h1>
        <p className="text-sm font-mono text-zinc-400">Effective Date: October 2026</p>
      </header>

      <article className="space-y-8 text-zinc-300 font-light text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">1. Ownership of Content</h2>
          <p>
            The software architectures, source code implementations, graphical shaders, bespoke canvas engines, and written case studies published on lakshya.uk represent proprietary engineering work authored by Lakshya Agarwal unless otherwise referenced.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">2. Fan-Made & Experimental Works Disclaimer</h2>
          <p>
            Selected interactive experiments (such as the Spider-Verse AR Portal and the Los Santos GTA Dossier) are independent, non-commercial educational portfolio demonstrations. They are not affiliated with, endorsed by, or connected to Marvel, Sony Pictures, Rockstar Games, or Take-Two Interactive. All respective intellectual properties and trademarks belong to their respective copyright holders.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">3. Code Repositories & Academic Research</h2>
          <p>
            Open-source code releases associated with this portfolio are governed by the open-source licenses specified in their respective GitHub repositories. Academic research models and pre-prints are cited with appropriate academic attribution.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">4. No Warranties</h2>
          <p>
            The interactive demos and systems are provided &ldquo;as is&rdquo; without warranties of continuous uninterrupted availability.
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
