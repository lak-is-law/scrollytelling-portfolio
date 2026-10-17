"use client";

import ProjectCard from "@/components/ui/ProjectCard";

export default function TrackYourFlight() {
  return (
    <ProjectCard
      id="skyward"
      sectionNumber="04 // Aviation Tech"
      title="Skyward."
      subtitle="Global flight observatory on live radar."
      description={
        <>
          <p>
            A high-performance real-time global flight observatory pulling transponder ADS-B telemetry across 12,000+ simultaneous aircraft.
          </p>
          <p>
            Features serverless edge ingestion endpoints, booking-reference routing across 60+ airlines, and a custom <span className="text-white font-medium">zero-dependency 3D Canvas engine</span> drawing great-circle geodesic flight paths and 9,000-point Fibonacci spheres at a rock-solid 60 FPS in a bundle under 50KB.
          </p>
        </>
      }
      tags={["Vanilla JS", "Canvas API", "Node.js", "Serverless", "ADS-B Telemetry", "Geodesic Math"]}
      launchUrl="https://trackyourflight.lakshya.uk"
      launchLabel="Launch Radar"
      imageSrc="/projects/trackyourflight.png"
      imageAlt="TrackYourFlight Global Flight Observatory"
      accent="cyan"
      layout="story-first"
      imageBg="#000908"
    />
  );
}
