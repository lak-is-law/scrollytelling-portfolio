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

  useEffect(() => {
    arcadeAudio.playVaultUnlock();

    // Check if golden theme was previously active
    const savedTheme = localStorage.getItem("portfolio_theme");
    if (savedTheme === "gold") {
      setIsGoldenTheme(true);
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
          <div className="w-full h-full bg-black/80 backdrop-blur-xl rounded-[22px] flex items-center justify-center text-3xl">
            🏆
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
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-lg">
              📄
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors">
              Official Resume
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Direct high-resolution PDF download with full internship credentials and technical index.
            </p>
          </div>
          <a
            href="/Resume.pdf"
            download="Lakshya_Agarwal_Resume.pdf"
            onClick={() => arcadeAudio.playClick()}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black text-xs font-semibold uppercase tracking-wider transition-all duration-300 text-center flex items-center justify-center gap-2"
          >
            Download PDF ↗
          </a>
        </div>

        {/* Reward 2: Golden Cyber Theme Switcher */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-lg">
              ✨
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors">
              24K Cyber Theme
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Unlock the golden VIP aesthetic with customized neon lighting across the entire portfolio.
            </p>
          </div>
          <button
            onClick={toggleGoldenTheme}
            className={`mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
              isGoldenTheme 
                ? "bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.5)]" 
                : "bg-white/10 hover:bg-white text-white hover:text-black"
            }`}
          >
            {isGoldenTheme ? "★ Golden Mode Active" : "Activate 24K Gold"}
          </button>
        </div>

        {/* Reward 3: Fast-Track Priority Interview */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-lg">
              ⚡
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors">
              Direct Contact
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Skip traditional screening queues and start a direct conversation with Lakshya.
            </p>
          </div>
          <a
            href="mailto:contact.lakshya.tech@gmail.com?subject=Found%20Your%20Hidden%20Arcade%20Vault%20-%20Let's%20Talk"
            onClick={() => arcadeAudio.playClick()}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black text-xs font-semibold uppercase tracking-wider transition-all duration-300 text-center flex items-center justify-center gap-2"
          >
            Send Priority Email ✉
          </a>
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
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-semibold text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Dispatching..." : "Send Dossier 🚀"}
          </button>
        </form>

        <AnimatePresence>
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs text-center"
            >
              🎉 Success! Dossier dispatched to {email}. Check your inbox!
            </motion.div>
          )}
          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400 text-xs text-center"
            >
              ❌ Could not dispatch dossier. Please verify your email or click Direct Email above.
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
        className="mt-8 text-xs uppercase font-mono tracking-widest text-zinc-400 hover:text-white transition-colors"
      >
        ← Return to Arcade Machine
      </button>
    </motion.div>
  );
}
