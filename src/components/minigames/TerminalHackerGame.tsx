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

export default function TerminalHackerGame({ onUnlockVault }: TerminalHackerGameProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      cmd: "system --boot",
      res: (
        <div className="space-y-1 text-emerald-400">
          <p>╔════════════════════════════════════════════════════════════════╗</p>
          <p>║  LAKSHYA.OS v2.6.0 (x86_64-quantum-linux)                     ║</p>
          <p>║  MAINFRAME SECURITY STATUS: RESTRICTED ACCESS                  ║</p>
          <p>╚════════════════════════════════════════════════════════════════╝</p>
          <p className="text-zinc-400 mt-2">
            Type <span className="text-emerald-300 font-bold">&apos;help&apos;</span> to list available commands.
            Try executing <span className="text-amber-400 font-bold">&apos;hire lakshya&apos;</span> for recruiter VIP access.
          </p>
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

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const chars = "010101LAKSHYAAIQUANTUM2026";
    const fontSize = 14;
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

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = input.trim().toLowerCase();
    if (!cleanCmd) return;

    arcadeAudio.playKeyClick();
    let response: React.ReactNode = "";

    switch (cleanCmd) {
      case "help":
        response = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-emerald-400 font-bold">AVAILABLE COMMANDS:</p>
            <p><span className="text-emerald-300 font-bold">whoami</span>       : Profile dossier of Lakshya Agarwal</p>
            <p><span className="text-emerald-300 font-bold">skills</span>       : Core technical capabilities</p>
            <p><span className="text-emerald-300 font-bold">projects</span>     : Deep dive on featured works</p>
            <p><span className="text-emerald-300 font-bold">resume</span>       : Download verified PDF resume</p>
            <p><span className="text-emerald-300 font-bold">matrix</span>       : Toggle cyberpunk Matrix rain</p>
            <p><span className="text-emerald-300 font-bold">contact</span>      : Official & direct channels</p>
            <p><span className="text-emerald-300 font-bold">vault</span>        : Open Developer Vault rewards</p>
            <p><span className="text-emerald-300 font-bold">ping</span>         : Test network telemetry latency</p>
            <p><span className="text-emerald-300 font-bold">clear</span>        : Wipe terminal window</p>
            <p><span className="text-amber-400 font-bold">hire lakshya</span> : [CONFIDENTIAL] Unlock System Breacher badge</p>
          </div>
        );
        break;

      case "whoami":
        response = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-white font-bold">LAKSHYA AGARWAL</p>
            <p className="text-emerald-400">Role: Creative AI Engineer & Full Stack Architect</p>
            <p className="text-zinc-400">Domain: lakshya.uk</p>
            <p className="text-zinc-400">Philosophy: Bridging mathematical rigor with intuitive interface design.</p>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-2 text-zinc-300">
            <p className="text-emerald-400 font-bold">DIRECT COMMUNICATIONS:</p>
            <p>• Portfolio: <a href="https://lakshya.uk" className="underline text-cyan-400">https://lakshya.uk</a></p>
            <p>• GitHub: <a href="https://github.com/lak-is-law" target="_blank" rel="noreferrer" className="underline text-cyan-400">github.com/lak-is-law</a></p>
            <p>• Secret VIP Mail: Available exclusively inside the <span className="text-amber-300 font-bold">Developer Vault</span></p>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-2 text-zinc-300">
            <p><span className="text-cyan-400 font-semibold">[AI / ML]:</span> PyTorch, Stockfish/KataGo Integration, Minimax, Zobrist Hashing, Prompt Engineering</p>
            <p><span className="text-cyan-400 font-semibold">[Frontend]:</span> Next.js 14, React, TypeScript, Framer Motion, HTML5 Canvas, WebGL/Three.js</p>
            <p><span className="text-cyan-400 font-semibold">[Backend]:</span> Node.js, RESTful APIs, Firebase, Redis, Supabase, Cloud Infrastructure</p>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-2 text-zinc-300">
            <p><span className="text-red-400 font-semibold">1. Red Gambit:</span> AI research playground with KataGo/Stockfish agents and algorithmic thinking.</p>
            <p><span className="text-amber-400 font-semibold">2. Todar 2.0:</span> FinTech real-time high-throughput transaction visualization platform.</p>
            <p><span className="text-blue-400 font-semibold">3. ElevateHub:</span> High-signal community networking system built with React & Firebase.</p>
          </div>
        );
        break;

      case "resume":
        response = (
          <div className="text-emerald-400 space-y-1">
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
        response = <p className="text-emerald-400">Matrix rain {showMatrixRain ? "DEACTIVATED" : "ACTIVATED"}.</p>;
        break;

      case "ping":
        response = <p className="text-emerald-400">64 bytes from lakshya.uk: icmp_seq=1 ttl=58 time=11.2ms [EXCELLENT]</p>;
        break;

      case "vault":
        if (onUnlockVault) {
          onUnlockVault();
          response = <p className="text-amber-300">Opening Developer Vault...</p>;
        } else {
          response = <p className="text-zinc-400">Use the Vault button in the top bar to open.</p>;
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
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/50 text-amber-300 space-y-2">
            <p className="font-bold text-base tracking-wide">ACCESS GRANTED: SYSTEM BREACHER BADGE UNLOCKED</p>
            <p className="text-xs text-zinc-300">
              System credentials verified. You have earned the <strong className="text-amber-400">System Breacher Badge</strong>!
            </p>
            <p className="text-xs text-emerald-400">
              Your confidential recruiter rewards and priority direct email channel are now accessible inside the <strong>Developer Vault</strong>. Click the Vault button in the top header or type <span className="text-white font-bold">&apos;vault&apos;</span> to enter.
            </p>
          </div>
        );
        break;

      default:
        response = (
          <p className="text-red-400">
            command not found: {cleanCmd}. Type <span className="text-emerald-400 font-bold">&apos;help&apos;</span> or <span className="text-amber-400 font-bold">&apos;hire lakshya&apos;</span>.
          </p>
        );
    }

    setHistory((prev) => [...prev, { cmd: input, res: response }]);
    setInput("");
  };

  return (
    <div 
      onClick={() => inputRef.current?.focus()}
      className="relative w-full h-full min-h-[560px] p-6 bg-black text-emerald-400 font-mono text-xs md:text-sm flex flex-col justify-between overflow-hidden cursor-text select-none"
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
      <div className="relative z-10 flex-1 overflow-y-auto space-y-4 pr-2">
        {history.map((h, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-500">
              <span className="text-emerald-500 font-bold">root@lakshya-mainframe:~#</span>
              <span className="text-white">{h.cmd}</span>
            </div>
            <div className="pl-4">{h.res}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Command Input Prompt */}
      <form onSubmit={handleCommand} className="relative z-10 flex items-center gap-2 pt-4 border-t border-emerald-950">
        <span className="text-emerald-500 font-bold shrink-0">root@lakshya-mainframe:~#</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            arcadeAudio.playKeyClick();
            setInput(e.target.value);
          }}
          placeholder="type 'hire lakshya' or 'help'..."
          className="flex-1 bg-transparent text-white focus:outline-none placeholder-zinc-700 caret-emerald-400"
          autoFocus
        />
      </form>
    </div>
  );
}
