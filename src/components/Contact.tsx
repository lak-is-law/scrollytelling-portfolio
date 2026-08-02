"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Arcade from "./Arcade";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [transmissionState, setTransmissionState] = useState<
    "idle" | "encrypting" | "transmitting" | "complete"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transmissionState !== "idle") return;

    setTransmissionState("encrypting");

    setTimeout(() => {
      setTransmissionState("transmitting");
      setTimeout(() => {
        setTransmissionState("complete");
        setTimeout(() => {
          const mailtoLink = `mailto:contact.lakshya.tech@gmail.com?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(
            `Sender Frequency: ${email}\n\nTransmission Payload:\n${message}`
          )}`;
          window.location.href = mailtoLink;
          
          setTimeout(() => {
            setTransmissionState("idle");
            setEmail("");
            setSubject("");
            setMessage("");
          }, 1000);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative min-h-screen bg-[#09090b] flex flex-col items-center justify-center py-24 px-4 overflow-hidden selection:bg-cyan-900 selection:text-cyan-100 font-sans">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDE1Ii8+Cjwvc3ZnPg==')] opacity-30" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center flex flex-col items-center gap-4"
        >
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Initiate Connection
            </h2>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <p className="text-zinc-400 font-mono text-sm md:text-base mt-2">
            Encrypted channel ready. Establish contact to begin transmission.
          </p>
        </motion.div>

        {/* Terminal Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="w-full max-w-2xl mx-auto rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl overflow-hidden flex flex-col relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.05] before:to-transparent before:pointer-events-none"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/80 animate-pulse" />
              </div>
            </div>
            <div className="text-[10px] sm:text-xs font-mono text-zinc-500 tracking-widest font-semibold uppercase">
              Secure Channel // Transmission Portal
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col gap-6 font-mono">
            {/* Signal Strength */}
            <div className="flex items-center justify-between text-xs text-cyan-400/80">
              <span>SIGNAL: 99.8% OPTIMAL</span>
              <div className="flex gap-1 h-3 items-end">
                <motion.div className="w-1 bg-cyan-500/80" animate={{ height: ["40%", "100%", "60%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
                <motion.div className="w-1 bg-cyan-500/80" animate={{ height: ["80%", "40%", "100%"] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
                <motion.div className="w-1 bg-cyan-500/80" animate={{ height: ["100%", "70%", "90%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }} />
                <motion.div className="w-1 bg-cyan-500/80" animate={{ height: ["60%", "100%", "80%"] }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 relative group">
                <label className="text-xs text-zinc-500 tracking-wider">SENDER FREQUENCY</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-cyan-500/50">{">"}</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.signal@frequency.com"
                    className="w-full bg-black/40 border border-white/10 rounded-md py-3 pl-8 pr-4 text-sm text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all duration-300 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
                    disabled={transmissionState !== "idle"}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 relative group">
                <label className="text-xs text-zinc-500 tracking-wider">DISPATCH SUBJECT</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-cyan-500/50">{">"}</span>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Mission briefing..."
                    className="w-full bg-black/40 border border-white/10 rounded-md py-3 pl-8 pr-4 text-sm text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all duration-300 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
                    disabled={transmissionState !== "idle"}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 relative group">
                <label className="text-xs text-zinc-500 tracking-wider">TRANSMISSION PAYLOAD</label>
                <div className="relative flex">
                  <span className="absolute left-3 top-3 text-cyan-500/50">{">"}</span>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Compose your encrypted message..."
                    rows={4}
                    className="w-full bg-black/40 border border-white/10 rounded-md py-3 pl-8 pr-4 text-sm text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all duration-300 resize-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
                    disabled={transmissionState !== "idle"}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={transmissionState !== "idle"}
                className={`relative mt-2 w-full py-4 rounded-md font-bold tracking-widest text-sm transition-all duration-500 overflow-hidden ${
                  transmissionState === "idle"
                    ? "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-50"
                    : transmissionState === "complete"
                    ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400"
                    : "bg-cyan-500/20 border border-cyan-500/50 text-cyan-400"
                }`}
              >
                {/* Glow Effect */}
                {transmissionState === "idle" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                )}

                <AnimatePresence mode="wait">
                  {transmissionState === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      INITIALIZE TRANSMISSION
                    </motion.div>
                  )}
                  {transmissionState === "encrypting" && (
                    <motion.div
                      key="encrypting"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <span className="animate-spin text-cyan-400">⟳</span> ENCRYPTING PAYLOAD...
                    </motion.div>
                  )}
                  {transmissionState === "transmitting" && (
                    <motion.div
                      key="transmitting"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <span className="animate-pulse">↗</span> TRANSMITTING...
                    </motion.div>
                  )}
                  {transmissionState === "complete" && (
                    <motion.div
                      key="complete"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      TRANSMISSION COMPLETE
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </div>
        </motion.div>

        {/* Priority Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center gap-6 mt-4"
        >
          <div className="text-xs font-mono text-zinc-500 tracking-[0.3em] uppercase flex items-center gap-4">
            <div className="w-8 h-[1px] bg-zinc-800" />
            Priority Channels
            <div className="w-8 h-[1px] bg-zinc-800" />
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a
              href="mailto:contact.lakshya.tech@gmail.com"
              className="group flex items-center justify-center w-14 h-14 rounded-full bg-white/[0.03] border border-white/10 hover:border-cyan-500/50 hover:bg-white/[0.08] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] relative"
              aria-label="Email"
            >
              <svg className="w-5 h-5 text-zinc-400 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            
            <a
              href="https://linkedin.com/in/lakshya-success"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-14 h-14 rounded-full bg-white/[0.03] border border-white/10 hover:border-blue-500/50 hover:bg-white/[0.08] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] relative"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 text-zinc-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <a
              href="https://github.com/lak-is-law"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-14 h-14 rounded-full bg-white/[0.03] border border-white/10 hover:border-zinc-300 hover:bg-white/[0.08] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] relative"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      <Arcade />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 text-[10px] md:text-xs font-mono text-zinc-600 tracking-[0.2em] uppercase"
      >
        © {currentYear} LAKSHYA AGARWAL
      </motion.div>
    </footer>
  );
}
