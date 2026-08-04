"use client";

import ProjectCard from "@/components/ui/ProjectCard";

export default function RedGambit() {
  return (
    <ProjectCard
      id="projects"
      sectionNumber="03 // Research"
      title="Red Gambit."
      subtitle="Where AI red-teaming meets grandmaster chess."
      description={
        <>
          <p>
            Traditional gaming platforms focus on rendering. Red Gambit focuses on cognition. By integrating <span className="text-white font-medium">KataGo</span> and <span className="text-white font-medium">Stockfish</span> agents, the platform strips away the illusion of casual gameplay, presenting the user with an almost insurmountable strategic challenge.
          </p>
          <p>
            Underneath the immersive interface lies a custom engine powered by <span className="text-white font-medium">Minimax</span>, <span className="text-white font-medium">Alpha-Beta Pruning</span>, and <span className="text-white font-medium">Iterative Deepening</span>. Moves are calculated with surgical precision, leveraging Zobrist hash transposition tables to achieve real-time algorithmic thinking.
          </p>
        </>
      }
      tags={["KataGo", "Stockfish", "Minimax", "Alpha-Beta Pruning", "Zobrist Hashing", "React"]}
      launchUrl="https://redgambit.lakshya.uk"
      launchLabel="Launch Experience"
      imageSrc="/projects/red-gambit-v2.jpg"
      imageAlt="Red Gambit Adversarial Platform"
      accent="cyan"
      layout="story-first"
    />
  );
}
