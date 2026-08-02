"use client";

import { useState, useRef, useEffect } from "react";
import { arcadeAudio } from "@/utils/arcadeAudio";

interface TerminalHackerGameProps {
  onUnlockVault?: () => void;
}

interface CommandHistory {
  cmd: string;
  res: string | React.ReactNode;
  isSpecial?: boolean;
}

const QUICK_COMMANDS = [
  { label: "⚡ hire lakshya", cmd: "hire lakshya", highlight: true },
  { label: "help", cmd: "help" },
  { label: "whoami", cmd: "whoami" },
  { label: "skills", cmd: "skills" },
  { label: "projects", cmd: "projects" },
  { label: "resume", cmd: "resume" },
  { label: "matrix", cmd: "matrix" },
  { label: "vault", cmd: "vault" },
  { label: "clear", cmd: "clear" }
];

export default function TerminalHackerGame({ onUnlockVault }: TerminalHackerGameProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      cmd: "system --boot",
      res: (
        <div className="space-y-1.5 text-emerald-400">
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-[11px] sm:text-xs space-y-1">
            <div className="flex items-center justify-between text-[10px] text-emerald-400/70 border-b border-emerald-500/20 pb-1">
              <span>LAKSHYA.OS v2.6.0</span>
              <span className="font-mono">x86_64-QUANTUM</span>
            </div>
            <p className="font-bold text-white tracking-wide">MAINFRAME SECURITY STATUS: RESTRICTED ACCESS</p>
            <p className="text-zinc-400 text-[10px] sm:text-xs">
              Type commands or tap quick actions below. Tap <span className="text-amber-400 font-bold">&apos;hire lakshya&apos;</span> to unlock developer credentials.
            </p>
          </div>
        </div>
      )
    }
  ]);
  const [showMatrixRain, setShowMatrixRain] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Matrix Rain Canvas Effect
  useEffect(() => {
    if (!showMatrixRain) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 400;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const chars = "010101LAKSHYAAIQUANTUM2026";
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let animationId: number;

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(drawMatrix);
    };

    animationId = requestAnimationFrame(drawMatrix);
    return () => cancelAnimationFrame(animationId);
  }, [showMatrixRain]);

  const executeCommandString = (cmdToRun: string) => {
    const cleanCmd = cmdToRun.trim().toLowerCase();
    if (!cleanCmd) return;

    arcadeAudio.playKeyClick();
    let response: React.ReactNode = "";

    switch (cleanCmd) {
      case "help":
        response = (
          <div className="space-y-1 text-zinc-300 text-[11px] sm:text-xs">
            <p className="text-emerald-400 font-bold">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1">
              <p><span className="text-emerald-300 font-bold">whoami</span> - Developer Dossier</p>
              <p><span className="text-emerald-300 font-bold">skills</span> - Technical Index</p>
              <p><span className="text-emerald-300 font-bold">projects</span> - Featured Works</p>
              <p><span className="text-emerald-300 font-bold">resume</span> - Download PDF</p>
              <p><span className="text-emerald-300 font-bold">matrix</span> - Toggle Rain FX</p>
              <p><span className="text-emerald-300 font-bold">contact</span> - Direct Channels</p>
              <p><span className="text-emerald-300 font-bold">vault</span> - Open Dev Vault</p>
              <p><span className="text-emerald-300 font-bold">clear</span> - Clear Window</p>
            </div>
            <p className="pt-1.5 text-amber-400 font-bold">
              ⚡ <span className="underline">hire lakshya</span> - Unlock System Breacher Badge
            </p>
          </div>
        );
        break;

      case "whoami":
        response = (
          <div className="space-y-1 text-zinc-300 text-[11px] sm:text-xs">
            <p className="text-white font-bold">LAKSHYA AGARWAL</p>
            <p className="text-emerald-400">Role: Creative AI Engineer & Full Stack Architect</p>
            <p className="text-zinc-400">Domain: lakshya.uk</p>
            <p className="text-zinc-400">Philosophy: Bridging mathematical rigor with intuitive interface design.</p>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-1.5 text-zinc-300 text-[11px] sm:text-xs">
            <p className="text-emerald-400 font-bold">DIRECT COMMUNICATIONS:</p>
            <p>• Portfolio: <a href="https://lakshya.uk" className="underline text-cyan-400">https://lakshya.uk</a></p>
            <p>• GitHub: <a href="https://github.com/lak-is-law" target="_blank" rel="noreferrer" className="underline text-cyan-400">github.com/lak-is-law</a></p>
            <p>• Secret VIP Mail: Gated inside the <span className="text-amber-300 font-bold">Developer Vault</span></p>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-1 text-zinc-300 text-[11px] sm:text-xs">
            <p><span className="text-cyan-400 font-semibold">[AI / ML]:</span> PyTorch, Stockfish/KataGo, Minimax, Zobrist Hashing</p>
            <p><span className="text-cyan-400 font-semibold">[Frontend]:</span> Next.js 14, React, TypeScript, Framer Motion, Canvas</p>
            <p><span className="text-cyan-400 font-semibold">[Backend]:</span> Node.js, REST APIs, Redis, Supabase, Cloud Infra</p>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-1 text-zinc-300 text-[11px] sm:text-xs">
            <p><span className="text-red-400 font-semibold">1. Red Gambit:</span> AI research playground with KataGo/Stockfish agents.</p>
            <p><span className="text-amber-400 font-semibold">2. Todar 2.0:</span> FinTech real-time high-throughput transaction platform.</p>
            <p><span className="text-blue-400 font-semibold">3. ElevateHub:</span> High-signal community networking system.</p>
          </div>
        );
        break;

      case "resume":
        response = (
          <div className="text-emerald-400 space-y-1 text-[11px] sm:text-xs">
            <p>Downloading verified resume...</p>
            <a href="/Resume.pdf" download="Lakshya_Resume.pdf" className="underline text-amber-300 hover:text-white">
              Click here if download doesn&apos;t start automatically.
            </a>
          </div>
        );
        const link = document.createElement("a");
        link.href = "/Resume.pdf";
        link.download = "Lakshya_Agarwal_Resume.pdf";
        link.click();
        break;

      case "matrix":
        setShowMatrixRain((prev) => !prev);
        response = <p className="text-emerald-400 text-[11px] sm:text-xs">Matrix rain {showMatrixRain ? "DEACTIVATED" : "ACTIVATED"}.</p>;
        break;

      case "ping":
        response = <p className="text-emerald-400 text-[11px] sm:text-xs">64 bytes from lakshya.uk: icmp_seq=1 ttl=58 time=11.2ms [EXCELLENT]</p>;
        break;

      case "vault":
        if (onUnlockVault) {
          onUnlockVault();
          response = <p className="text-amber-300 text-[11px] sm:text-xs">Opening Developer Vault...</p>;
        } else {
          response = <p className="text-zinc-400 text-[11px] sm:text-xs">Use the Vault button in the top bar to open.</p>;
        }
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "hire":
      case "hire lakshya":
        arcadeAudio.playTerminalBreach();
        localStorage.setItem("badge_system_hacker", "true");
        response = (
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-950/40 border border-amber-500/50 text-amber-300 space-y-1.5 text-[11px] sm:text-xs">
            <p className="font-bold text-xs sm:text-sm tracking-wide text-amber-300 flex items-center gap-1.5">
              <span>★</span>
              <span>ACCESS GRANTED: SYSTEM BREACHER BADGE UNLOCKED</span>
            </p>
            <p className="text-zinc-300">
              System credentials verified. You have earned the <strong className="text-amber-400">System Breacher Badge</strong>!
            </p>
            <p className="text-emerald-400">
              Confidential recruiter rewards and direct priority email are now unlocked in the <strong>Developer Vault</strong>. Tap <span className="text-white font-bold">&apos;vault&apos;</span> or use the top VAULT button to enter.
            </p>
          </div>
        );
        break;

      default:
        response = (
          <p className="text-red-400 text-[11px] sm:text-xs">
            command not found: {cleanCmd}. Type <span className="text-emerald-400 font-bold">&apos;help&apos;</span> or tap <span className="text-amber-400 font-bold">&apos;hire lakshya&apos;</span>.
          </p>
        );
    }

    setHistory((prev) => [...prev, { cmd: cmdToRun, res: response }]);
    setInput("");
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommandString(input);
  };

  return (
    <div 
      className="relative w-full h-full min-h-[380px] md:min-h-[500px] p-3 sm:p-4 md:p-6 bg-black text-emerald-400 font-mono text-[11px] sm:text-xs md:text-sm flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Scanline CRT Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px] pointer-events-none z-20 opacity-70" />

      {/* Matrix Rain Canvas */}
      {showMatrixRain && (
        <canvas
          ref={matrixCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-25"
        />
      )}

      {/* Terminal Screen Body */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="relative z-10 flex-1 overflow-y-auto space-y-3 pr-1 pb-2 scrollbar-thin scrollbar-thumb-zinc-800"
      >
        {history.map((h, i) => (
          <div key={i} className="space-y-1 break-words">
            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] sm:text-xs">
              <span className="text-emerald-500 font-bold">lakshya:~#</span>
              <span className="text-white font-medium">{h.cmd}</span>
            </div>
            <div className="pl-2 sm:pl-3 border-l border-emerald-500/20">{h.res}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* FOOTER: Quick Touch Actions & Input Bar */}
      <div className="relative z-10 pt-2 border-t border-emerald-950 space-y-2 shrink-0">
        {/* Mobile Quick-Command Bar (Horizontal Scrollable) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[10px] sm:text-[11px]">
          <span className="text-zinc-600 uppercase tracking-wider text-[9px] shrink-0 mr-1 hidden sm:inline">
            QUICK:
          </span>
          {QUICK_COMMANDS.map((qc) => (
            <button
              key={qc.cmd}
              type="button"
              onClick={() => executeCommandString(qc.cmd)}
              onMouseEnter={() => arcadeAudio.playHover()}
              className={`shrink-0 px-2.5 py-1 rounded-lg border font-mono transition-all cursor-pointer ${
                qc.highlight
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-300 hover:bg-amber-500 hover:text-black font-bold shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                  : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-emerald-500/50 hover:bg-zinc-800"
              }`}
            >
              {qc.label}
            </button>
          ))}
        </div>

        {/* Command Input Prompt Form */}
        <form onSubmit={handleCommand} className="flex items-center gap-2">
          <span className="text-emerald-500 font-bold shrink-0 text-[11px] sm:text-xs">
            lakshya:~#
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              arcadeAudio.playKeyClick();
              setInput(e.target.value);
            }}
            placeholder="type 'hire lakshya' or tap chips..."
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            className="flex-1 bg-zinc-950/80 border border-zinc-800/80 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-emerald-500/60 placeholder-zinc-600 caret-emerald-400 text-xs sm:text-sm"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-400 text-emerald-300 hover:text-black border border-emerald-500/40 text-xs font-bold font-mono transition-all cursor-pointer shrink-0"
          >
            RUN ↵
          </button>
        </form>
      </div>
    </div>
  );
}
