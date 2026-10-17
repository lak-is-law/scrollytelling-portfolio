"use client";

import ProjectCard from "@/components/ui/ProjectCard";

export default function LocateArt() {
  return (
    <ProjectCard
      id="projects"
      sectionNumber="03 // Cultural Mapping"
      title="Locate Art."
      subtitle="Cataloging 120+ cultural art forms across India."
      description={
        <>
          <p>
            India&apos;s traditional art forms have historically been documented in fragmented archives. Locate Art is a solo-engineered cultural GIS map cataloging 120+ traditional art forms across the Indian subcontinent.
          </p>
          <p>
            Built on <span className="text-white font-medium">Next.js 16</span>, <span className="text-white font-medium">React 19</span>, and <span className="text-white font-medium">Supabase / PostgreSQL</span> with MapLibre GL, featuring 3 switchable tile layers, smooth fly-to animations, Row-Level Security, and enterprise security hardening (CSP, HSTS).
          </p>
        </>
      }
      tags={["Next.js 16", "React 19", "Supabase", "PostgreSQL", "MapLibre GL", "Geospatial", "Security"]}
      launchUrl="https://locate.art.lakshya.uk"
      launchLabel="Explore Heritage"
      imageSrc="/projects/locate-art.png"
      imageAlt="Locate Art Cultural-Heritage Mapping Platform"
      accent="amber"
      layout="image-first"
      imageBg="#fbf9f4"
    />
  );
}
