"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { arcadeAudio } from "@/utils/arcadeAudio";

interface DeveloperVaultProps {
  onClose: () => void;
  unlockedBadges: string[];
}

export default function DeveloperVault({ onClose, unlockedBadges }: DeveloperVaultProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isGoldenTheme, setIsGoldenTheme] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    arcadeAudio.playVaultUnlock();

    // Check if golden theme was previously active
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("portfolio_theme");
      const hasGoldClass = document.documentElement.classList.contains("gold-theme");
      if (savedTheme === "gold" || hasGoldClass) {
        setIsGoldenTheme(true);
        document.documentElement.classList.add("gold-theme");
      }
    }
  }, []);

  const toggleGoldenTheme = () => {
    arcadeAudio.playClick();
    const newTheme = !isGoldenTheme;
    setIsGoldenTheme(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("gold-theme");
      localStorage.setItem("portfolio_theme", "gold");
    } else {
      document.documentElement.classList.remove("gold-theme");
      localStorage.setItem("portfolio_theme", "default");
    }
  };

  const copySecretEmail = () => {
    arcadeAudio.playClick();
    navigator.clipboard.writeText("contact@lakshya.uk");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendReward = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    arcadeAudio.playClick();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          badgesUnlocked: unlockedBadges,
          gameScore: 15
        })
      });

      if (res.ok) {
        arcadeAudio.playVictoryFanfare();
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative w-full h-full min-h-[600px] flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto bg-gradient-to-b from-zinc-950 via-black to-zinc-950 text-white rounded-3xl border border-amber-500/30 shadow-[0_0_80px_rgba(245,158,11,0.15)]"
    >
      {/* Floating Golden Particles Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-400/30 blur-[1px]"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%"
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Header Badge & Title */}
      <div className="relative z-10 text-center max-w-2xl space-y-4 mb-8">
        <motion.div 
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 shadow-[0_0_40px_rgba(245,158,11,0.5)] flex items-center justify-center"
        >
          <div className="w-full h-full bg-black/80 backdrop-blur-xl rounded-[22px] flex items-center justify-center text-amber-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7.5a1.5 1.5 0 0 0 0 3h9a1.5 1.5 0 0 0 0-3H15c-.55 0-1-.45-1-1v-2.34"/><path d="M6 4h12v5a6 6 0 0 1-12 0V4Z"/></svg>
          </div>
        </motion.div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-amber-400/90 font-semibold px-4 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30">
            Developer Access Unlocked
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-amber-200">
            The Developer Vault
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light max-w-lg mx-auto">
            Congratulations! You broke past the surface level and unlocked the exclusive recruiter dossier.
          </p>
        </div>
      </div>

      {/* Vault Rewards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full mb-8">
        {/* Reward 1: Confidential Resume */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors">
              Official Resume
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Direct high-resolution PDF download with full credentials and technical index.
            </p>
          </div>
          <a
            href="/Resume.pdf"
            download="Lakshya_Agarwal_Resume.pdf"
            onClick={() => arcadeAudio.playClick()}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black text-xs font-semibold uppercase tracking-wider transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Download PDF</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </a>
        </div>

        {/* Reward 2: Golden Cyber Theme Switcher */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors">
              24K Cyber Theme
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Unlock the 24K Gold VIP aesthetic with customized neon lighting across the entire portfolio.
            </p>
          </div>
          <button
            onClick={toggleGoldenTheme}
            className={`mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              isGoldenTheme 
                ? "bg-amber-400 text-black font-black shadow-[0_0_25px_rgba(245,158,11,0.8)] border border-amber-300" 
                : "bg-white/10 hover:bg-white text-white hover:text-black"
            }`}
          >
            {isGoldenTheme ? "24K Gold Active" : "Activate 24K Gold"}
          </button>
        </div>

        {/* Reward 3: Fast-Track Priority Interview */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors">
              Secret Priority Mail
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Direct recruiter inbox: <span className="text-amber-300 font-mono font-bold">contact@lakshya.uk</span>
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={copySecretEmail}
              className="w-full py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-mono font-bold uppercase tracking-wider transition-colors border border-zinc-700 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
              <span>{copiedEmail ? "Copied" : "Copy Email"}</span>
            </button>
            <a
              href="mailto:contact@lakshya.uk?subject=Found%20Your%20Hidden%20Arcade%20Vault%20-%20Let's%20Talk"
              onClick={() => arcadeAudio.playClick()}
              className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-[11px] font-bold uppercase tracking-wider transition-colors text-center shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>Send Priority Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Email Dispatch Box */}
      <div className="relative z-10 max-w-xl w-full p-6 rounded-3xl bg-zinc-900/80 border border-amber-500/20 shadow-xl">
        <div className="text-center mb-4 space-y-1">
          <h4 className="text-sm uppercase tracking-wider font-semibold text-zinc-200">
            Dispatch Confidential Package to Your Inbox
          </h4>
          <p className="text-xs text-zinc-400">
            Enter your email to receive private developer notes, resume attachments, and project breakdowns.
          </p>
        </div>

        <form onSubmit={handleSendReward} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="recruiter@company.com"
            className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-semibold text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{isSubmitting ? "Dispatching..." : "Send Dossier"}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </form>

        <AnimatePresence>
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs text-center flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              <span>Success! Dossier dispatched to {email}. Check your inbox!</span>
            </motion.div>
          )}
          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400 text-xs text-center flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              <span>Could not dispatch dossier. Please verify your email or use direct mail: contact@lakshya.uk</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Return to Arcade Button */}
      <button
        onClick={() => {
          arcadeAudio.playClick();
          onClose();
        }}
        className="mt-8 text-xs uppercase font-mono tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
      >
        <span>←</span>
        <span>Return to Arcade Machine</span>
      </button>
    </motion.div>
  );
}
