"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TECH_SYMBOLS = ["⚛️", "🐍", "🔷", "🚀", "⚛️", "🐍", "🔷", "🚀"];

export default function MemoryMatchGame() {
  const [cards, setCards] = useState<{ symbol: string; id: number; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    // Shuffle and initialize cards
    const shuffled = [...TECH_SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, idx) => ({ symbol, id: idx, isFlipped: false, isMatched: false }));
    setCards(shuffled);
  }, []);

  const handleCardClick = (id: number) => {
    // Prevent clicking if 2 cards are already flipped, or if card is already flipped/matched
    if (flippedIds.length === 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    // Flip the selected card
    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedIds = [...flippedIds, id];
    setFlippedIds(newFlippedIds);

    if (newFlippedIds.length === 2) {
      const [firstId, secondId] = newFlippedIds;
      if (newCards[firstId].symbol === newCards[secondId].symbol) {
        // Match found
        setTimeout(() => {
          setCards(prev => {
            const matched = [...prev];
            matched[firstId].isMatched = true;
            matched[secondId].isMatched = true;
            
            // Check win condition
            if (matched.every(c => c.isMatched)) {
              setIsWon(true);
            }
            return matched;
          });
          setFlippedIds([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => {
            const reset = [...prev];
            reset[firstId].isFlipped = false;
            reset[secondId].isFlipped = false;
            return reset;
          });
          setFlippedIds([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0a0a0a] relative font-sans">
      <div className="absolute top-8 left-8">
        <h3 className="text-2xl text-white font-bold tracking-tight">Tech Match</h3>
        <p className="text-zinc-500 text-sm">Find all pairs.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8 w-full max-w-md">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className="aspect-square relative cursor-pointer group"
            style={{ perspective: 1000 }}
          >
            <motion.div
              className="w-full h-full relative"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
            >
              {/* Card Back (Hidden state) */}
              <div className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-xl backface-hidden group-hover:border-zinc-700 transition-colors hover-magnetic" />
              
              {/* Card Front (Revealed state) */}
              <div 
                className="absolute inset-0 bg-white rounded-xl backface-hidden flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                style={{ transform: "rotateY(180deg)" }}
              >
                <span className={card.isMatched ? "opacity-50" : ""}>{card.symbol}</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {isWon && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-12 bg-white text-black px-6 py-3 rounded-full font-bold tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.3)]"
        >
          MEMORY ALLOCATED
        </motion.div>
      )}
    </div>
  );
}
