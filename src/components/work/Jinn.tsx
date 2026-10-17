"use client";

import ProjectCard from "@/components/ui/ProjectCard";

export default function Jinn() {
  return (
    <ProjectCard
      id="jinn"
      sectionNumber="05.2 // Cognitive AI"
      title="Jinn."
      subtitle="The ancient oracle of minds."
      description={
        <>
          <p>
            An Akinator-style 20-questions personality-guessing oracle game engineered with an Egyptian and Arabian Nights aesthetic, featuring dynamic real-time ASCII canvas transition cinematics.
          </p>
          <p>
            Powered by a resilient multi-LLM serverless backend orchestrating <span className="text-white font-medium">NVIDIA NIM (Llama 3.3 70B)</span>, <span className="text-white font-medium">Claude Sonnet</span>, <span className="text-white font-medium">Groq</span>, and <span className="text-white font-medium">Gemini</span> with automatic fallback to an offline trait-matching heuristic engine.
          </p>
        </>
      }
      tags={["NVIDIA NIM", "Llama 3.3", "Claude", "Groq", "Gemini", "Canvas API", "Vercel Serverless"]}
      launchUrl="https://jinn.lakshya.uk"
      launchLabel="Consult Oracle"
      imageSrc="/projects/jinn-oracle.svg"
      imageAlt="Jinn Ancient Oracle of Minds"
      accent="gold"
      layout="story-first"
    />
  );
}
