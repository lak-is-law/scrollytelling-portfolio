"use client";

import ProjectCard from "@/components/ui/ProjectCard";

export default function CraftMe() {
  return (
    <ProjectCard
      id="craftme"
      category="3D Voxel World"
      title="CraftMe."
      subtitle="Interactive 3D voxel world portfolio."
      description={
        <>
          <p>
            An interactive 3D Minecraft voxel portfolio engineered from scratch with <span className="text-white font-medium">Three.js</span> and <span className="text-white font-medium">TypeScript</span>.
          </p>
          <p>
            Features procedural terrain chunking, custom voxel lighting shaders, over 50 architectural landmarks (including Eiffel Tower, Hollywood Sign, Taj Mahal, and Forbidden City), custom audio cues, companion pets, and responsive keyboard/touch movement.
          </p>
        </>
      }
      tags={["Three.js", "WebGL", "TypeScript", "Voxel Engine", "Procedural Graphics", "Audio DSP"]}
      launchUrl="https://craftme.lakshya.uk"
      launchLabel="Enter Voxel World"
      imageSrc="/projects/craftme.jpg"
      imageAlt="CraftMe 3D Minecraft Portfolio World"
      accent="emerald"
      layout="image-first"
    />
  );
}
