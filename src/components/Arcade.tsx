"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeuralNetworkGame from "./minigames/NeuralNetworkGame";
import MemoryMatchGame from "./minigames/MemoryMatchGame";
import TerminalHackerGame from "./minigames/TerminalHackerGame";

export default function Arcade() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    { id: "neural", title: "Neural Connect", desc: "Activate the AI Architecture" },
    { id: "memory", title: "Tech Match", desc: "Glassmorphic Memory Challenge" },
    { id: "terminal", title: "Terminal Hacker", desc: "Bypass the Mainframe" }
  ];

  return (
    <>
      {/* Easter Egg Trigger */}
      <button 
        onClick={() => setIsOpen(true)}
        className="text-zinc-500 hover:text-white transition-colors flex items-center justify-center hover-magnetic"
        title="Arcade"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><rect x="2" y="6" width="20" height="12" rx="2"></rect></svg>
      </button>

      {/* Arcade Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-12 overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={() => { setIsOpen(false); setActiveGame(null); }}
              className="absolute top-8 right-8 text-zinc-400 hover:text-white hover-magnetic transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Menu or Active Game */}
            {!activeGame ? (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="max-w-4xl w-full"
              >
                <div className="text-center mb-16 space-y-4">
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">THE ARCADE</h2>
                  <p className="text-xl text-zinc-400 font-light tracking-widest uppercase">Select an Interface</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {games.map((game, i) => (
                    <motion.button
                      key={game.id}
                      onClick={() => setActiveGame(game.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative h-64 border border-zinc-800 bg-zinc-900/50 hover:bg-white hover:text-black rounded-2xl p-8 flex flex-col items-start justify-end transition-all duration-500 overflow-hidden text-left hover-magnetic cursor-none"
                    >
                      <h3 className="text-2xl font-semibold mb-2 relative z-10">{game.title}</h3>
                      <p className="text-sm font-light opacity-60 relative z-10">{game.desc}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="w-full h-full flex flex-col pt-16">
                <button 
                  onClick={() => setActiveGame(null)}
                  className="self-start mb-8 text-sm uppercase tracking-widest text-zinc-400 hover:text-white flex items-center gap-2 hover-magnetic"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Back to Menu
                </button>
                <div className="flex-1 w-full bg-black/50 border border-zinc-800 rounded-3xl overflow-hidden relative">
                  {activeGame === "neural" && <NeuralNetworkGame />}
                  {activeGame === "memory" && <MemoryMatchGame />}
                  {activeGame === "terminal" && <TerminalHackerGame />}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
