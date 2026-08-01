"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function TerminalHackerGame() {
  const [history, setHistory] = useState<string[]>([
    "INITIALIZING SECURE CONNECTION...",
    "ESTABLISHED.",
    "TYPE 'help' FOR AVAILABLE COMMANDS."
  ]);
  const [input, setInput] = useState("");
  const [isWon, setIsWon] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (isWon || !input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `guest@lakshya.tech:~$ ${input}`];

    if (cmd === "help") {
      newHistory.push("COMMANDS: help, clear, ls, decrypt [file]");
    } else if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (cmd === "ls") {
      newHistory.push("classified_resume.pdf   lakshya.bin   logs/");
    } else if (cmd.startsWith("decrypt")) {
      if (cmd === "decrypt lakshya.bin") {
        newHistory.push("DECRYPTING...", "ACCESS GRANTED.");
        setIsWon(true);
      } else {
        newHistory.push("ERROR: INVALID FILE OR PERMISSION DENIED.");
      }
    } else {
      newHistory.push(`command not found: ${cmd}`);
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div 
      className="w-full h-full flex flex-col p-8 bg-black relative font-mono text-green-500 cursor-text text-left"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="absolute top-4 left-8 right-8 flex justify-between border-b border-green-900 pb-2 mb-4 opacity-50 text-xs">
        <span>terminal_session_881</span>
        <span>ENCRYPTED</span>
      </div>

      <div className="flex-1 overflow-y-auto mt-8 flex flex-col justify-end">
        {history.map((line, i) => (
          <div key={i} className="mb-1 break-all opacity-80">{line}</div>
        ))}
        
        {!isWon && (
          <form onSubmit={handleCommand} className="flex items-center mt-2">
            <span className="mr-2">guest@lakshya.tech:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none border-none text-green-500 font-mono caret-green-500"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        )}
        <div ref={endRef} />
      </div>

      {isWon && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-black/90 flex items-center justify-center backdrop-blur-sm z-10"
        >
          <div className="border border-green-500 p-8 text-center bg-black shadow-[0_0_40px_rgba(34,197,94,0.3)]">
            <h2 className="text-4xl font-bold mb-4">SYSTEM BREACHED</h2>
            <p className="text-green-800">Welcome, Administrator.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
