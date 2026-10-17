"use client";

import ProjectCard from "@/components/ui/ProjectCard";

export default function SpiderVerse() {
  return (
    <ProjectCard
      id="spiderverse"
      sectionNumber="05.1 // AR & Computer Vision"
      title="Spider-Verse."
      subtitle="GPU-native AR portal with edge gesture tracking."
      description={
        <>
          <p>
            An independent, privacy-first augmented reality portal experience engineered with client-side computer vision and GPU-native procedural rendering inspired by the Spider-Verse visual language.
          </p>
          <p>
            Zero-latency hand landmark tracking runs entirely client-side via <span className="text-white font-medium">MediaPipe WASM</span> with 1-Euro temporal smoothing. Dynamic 4-corner perspective warping is achieved through a custom 20×20 <span className="text-white font-medium">Three.js BilinearPortalGeometry</span> paired with GLSL shaders generating chromatic aberration, halftone screens, Spider-Gwen watercolor blooms, and real-time Web Audio API frequency-reactive bass uniforms.
          </p>
        </>
      }
      tags={["Three.js", "WebGL", "GLSL Shaders", "MediaPipe WASM", "Computer Vision", "1-Euro Filter", "Web Audio API"]}
      launchUrl="https://spiderverse.lakshya.uk"
      launchLabel="Open Portal"
      imageSrc="/projects/spiderverse.svg"
      imageAlt="Spider-Verse AR Portal Experience"
      accent="purple"
      layout="story-first"
    />
  );
}
