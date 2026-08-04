<div align="center">

  # ♟️ RED GAMBIT // AI Adversarial Chess & Game Research Platform

  [![Live Platform](https://img.shields.io/badge/Live_Engine-redgambit.lakshya.uk-ef4444?style=for-the-badge&logo=vercel&logoColor=white)](https://redgambit.lakshya.uk)
  [![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Stockfish / WASM](https://img.shields.io/badge/Stockfish-WASM_Engine-000000?style=for-the-badge)](https://stockfishchess.org/)
  [![KataGo Neural](https://img.shields.io/badge/KataGo-Neural_Net-10b981?style=for-the-badge)](https://github.com/lightvector/KataGo)

  <p align="center">
    <b>A high-performance adversarial AI research environment featuring multi-engine evaluations, real-time board heuristics, Zobrist transposition caching, and interactive neural move heatmaps.</b>
  </p>

</div>

---

## 🏛️ System Architecture

```mermaid
flowchart TD
    subgraph UI ["🎨 React & WebGL Board Interface"]
        Board["Interactive Chessboard Component"]
        Heatmap["Neural Move Heatmap & Probability Visualizer"]
        EvaluationGraph["Real-Time Advantage Bar & Heuristic Curves"]
    end

    subgraph CoreEngine ["⚙️ Evaluation & AI Decision Pipeline"]
        FEN["FEN & PGN Game State Parser"]
        Zobrist["Zobrist Hashing & Transposition Table Cache"]
        AlphaBeta["Minimax Algorithm with Alpha-Beta Pruning (Depth 12+)"]
        Heuristics["Dynamic Piece-Square Tables & Mobility Weights"]
    end

    subgraph NeuralBridge ["🧠 Engine Integration Layer"]
        WASMWorker["Stockfish 16 Engine (WebAssembly Thread Pool)"]
        KataGoBridge["KataGo Policy/Value Neural Net API Connector"]
    end

    Board --> FEN
    FEN --> Zobrist
    Zobrist --> AlphaBeta
    AlphaBeta --> Heuristics
    FEN --> WASMWorker
    FEN --> KataGoBridge
    WASMWorker --> EvaluationGraph
    KataGoBridge --> Heatmap
```

---

## ✨ Core Features

- **Multi-Engine Evaluation Pipeline**: Dual-engine analysis simultaneously running WebAssembly-compiled Stockfish 16 and KataGo neural value networks.
- **Deep Minimax Engine with Alpha-Beta Pruning**: Custom client-side evaluation engine featuring quiescence search, null-move heuristic, and move ordering optimizations.
- **Transposition Tables via 64-bit Zobrist Hashing**: Drastically eliminates redundant tree search computations across identical positions.
- **Interactive Move Heatmaps**: Visualizes legal move probabilities, tactical blunder alerts, and positional control zones in real time.
- **Dynamic FEN/PGN Serialization**: Instant board state import/export with full game tree branching history.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
- **Engines & AI**: WebAssembly Stockfish 16, Custom Alpha-Beta Minimax Engine, KataGo Neural Network API
- **State & Algorithms**: Zobrist Hashing, Bitboard Representations, Quiescence Search
- **Deployment**: Vercel Edge Network, Web Workers for Non-Blocking CPU Threads

---

## 🚀 Installation & Local Development

```bash
# 1. Clone the repository
git clone https://github.com/lak-is-law/red-gambit.git
cd red-gambit

# 2. Install dependencies
npm install

# 3. Launch local dev server
npm run dev
```

---

## 🧗 Challenges Faced & Solutions

### 1. Main-Thread Stalls During Deep Engine Search
- **Challenge**: Running Minimax computations with depth > 6 on the main UI thread froze DOM animations and user drag events.
- **Solution**: Offloaded all search algorithms and WASM Stockfish instances to dedicated Web Workers (`WorkerPool`), keeping the main thread strictly at 60 FPS.

### 2. High Memory Consumption with Transposition Tables
- **Challenge**: Uncapped transposition table caches during rapid blunder-check analysis consumed excessive RAM on mobile browsers.
- **Solution**: Implemented an LRU eviction policy with a bounded 64MB 64-bit Zobrist hash table.

---

## 💡 Lessons Learned

- Bitboard representations (`BigInt` / `Uint32Array`) offer a 4x throughput improvement over 2D array board representation.
- Multi-threaded Web Workers require structured memory cloning (`SharedArrayBuffer` with COOP/COEP headers) to achieve sub-millisecond evaluation exchange.

---

## 📄 License & Contact

Distributed under the **MIT License**.
Developed by **Lakshya Agarwal** ([contact@lakshya.uk](mailto:contact@lakshya.uk) • [lakshya.uk](https://lakshya.uk)).
