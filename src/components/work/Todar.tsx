"use client";

import ProjectCard from "@/components/ui/ProjectCard";

export default function Todar() {
  return (
    <ProjectCard
      id="todar"
      sectionNumber="04 // FinTech"
      title="Todar 2.0."
      subtitle="Transforming chaos into financial clarity."
      description={
        <>
          <p>
            Most personal finance apps suffer from one fatal flaw: friction. Todar 2.0 was architected from first principles to turn tedious financial accounting into an effortless, visual ritual.
          </p>
          <p>
            Engineered with <span className="text-white font-medium">Next.js 14</span>, <span className="text-white font-medium">TypeScript</span>, and <span className="text-white font-medium">Supabase</span>, the platform features instant ledger recalculations, dynamic budgeting vectors, and predictive burn-rate telemetry.
          </p>
        </>
      }
      tags={["Next.js 14", "TypeScript", "Tailwind CSS", "Supabase", "FinTech", "Analytics"]}
      launchUrl="https://todar.finance.lakshya.uk"
      launchLabel="Access Platform"
      imageSrc="/projects/todar-v2.jpg"
      imageAlt="Todar 2.0 Financial Terminal"
      accent="emerald"
      layout="image-first"
    />
  );
}
