"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Defines the graph edges (connections between nodes)
const EDGES = [
  [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5], [1, 5]
];

// Fixed visual coordinates for nodes (percentages 0-100)
const NODES = [
  { x: 20, y: 30 }, // 0
  { x: 50, y: 15 }, // 1
  { x: 25, y: 70 }, // 2
  { x: 75, y: 40 }, // 3
  { x: 50, y: 85 }, // 4
  { x: 85, y: 75 }, // 5
];

export default function NeuralNetworkGame() {
  const [activeNodes, setActiveNodes] = useState<boolean[]>(Array(6).fill(false));
  const [isWon, setIsWon] = useState(false);

  // Initialize random puzzle state that is solvable
  useEffect(() => {
    let state = Array(6).fill(true); // start solved
    // simulate random clicks to scramble it
    for (let i = 0; i < 10; i++) {
      const clickIdx = Math.floor(Math.random() * 6);
      state = toggleNode(state, clickIdx);
    }
    // prevent it being solved initially
    if (state.every(n => n)) state = toggleNode(state, 0);
    setActiveNodes(state);
  }, []);

  const toggleNode = (state: boolean[], index: number) => {
    const newState = [...state];
    newState[index] = !newState[index]; // toggle self
    // toggle neighbors
    EDGES.forEach(([a, b]) => {
      if (a === index) newState[b] = !newState[b];
      if (b === index) newState[a] = !newState[a];
    });
    return newState;
  };

  const handleNodeClick = (index: number) => {
    if (isWon) return;
    const newState = toggleNode(activeNodes, index);
    setActiveNodes(newState);
    
    if (newState.every(n => n)) {
      setIsWon(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0a0a0a] relative font-mono select-none">
      <div className="absolute top-8 left-8">
        <h3 className="text-2xl text-white font-bold tracking-tight">Neural Connect</h3>
        <p className="text-zinc-500 text-sm">Activate all nodes to bypass.</p>
      </div>

      <div className="relative w-full max-w-lg aspect-square mt-8">
        {/* Draw Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {EDGES.map(([a, b], i) => {
            const isActive = activeNodes[a] && activeNodes[b];
            return (
              <motion.line
                key={i}
                x1={`${NODES[a].x}%`} y1={`${NODES[a].y}%`}
                x2={`${NODES[b].x}%`} y2={`${NODES[b].y}%`}
                stroke={isActive ? "#ffffff" : "#333333"}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, stroke: isActive ? "#ffffff" : "#333333" }}
                transition={{ duration: 0.5 }}
              />
            );
          })}
        </svg>

        {/* Draw Nodes */}
        {NODES.map((node, i) => (
          <motion.button
            key={i}
            onClick={() => handleNodeClick(i)}
            className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-2 flex items-center justify-center transition-colors hover-magnetic z-10 ${
              activeNodes[i] 
                ? "bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.5)]" 
                : "bg-black border-zinc-700 text-zinc-500 hover:border-zinc-400 hover:text-white"
            }`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {i}
          </motion.button>
        ))}
      </div>

      {isWon && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-12 bg-white text-black px-6 py-3 rounded-full font-bold tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.3)]"
        >
          ACCESS GRANTED: NETWORK ACTIVE
        </motion.div>
      )}
    </div>
  );
}
