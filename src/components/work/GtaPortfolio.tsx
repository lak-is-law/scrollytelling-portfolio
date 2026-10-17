"use client";

import ProjectCard from "@/components/ui/ProjectCard";

export default function GtaPortfolio() {
  return (
    <ProjectCard
      id="gta"
      sectionNumber="05.6 // Los Santos Simulation"
      title="Los Santos Portfolio."
      subtitle="Grand Theft Auto V inspired interactive dossier."
      description={
        <>
          <p>
            A themed interactive web experience transforming technical engineering experience into a high-stakes Grand Theft Auto V mission dossier.
          </p>
          <p>
            Features an interactive satellite GPS map with points of interest, a weapon wheel arsenal translating technical proficiencies into game stats, mission debriefs, and authentic atmospheric soundscapes.
          </p>
        </>
      }
      tags={["React", "TypeScript", "Tailwind CSS", "Interactive Maps", "Gamification", "Soundscapes"]}
      launchUrl="https://gta.lakshya.uk"
      launchLabel="Launch Los Santos"
      imageSrc="/projects/gta-map.png"
      imageAlt="GTA V Themed Interactive Portfolio"
      accent="purple"
      layout="story-first"
    />
  );
}
