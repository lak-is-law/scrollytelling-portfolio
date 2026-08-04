"use client";

import ProjectCard from "@/components/ui/ProjectCard";

export default function ElevateHub() {
  return (
    <ProjectCard
      id="elevatehub"
      sectionNumber="05 // Community"
      title="ElevateHub."
      subtitle="Bridging the gap between talent and opportunity."
      description={
        <>
          <p>
            ElevateHub is a professional networking platform designed to eliminate the noise of traditional job boards. It focuses purely on <span className="text-white font-medium">verification</span> and high-signal opportunity listings, creating a trusted environment for students and recruiters.
          </p>
          <p>
            Built entirely on <span className="text-white font-medium">React</span> and <span className="text-white font-medium">Firebase</span>, the full-stack architecture supports secure user authentication, real-time community forums, and deep profile-based networking.
          </p>
        </>
      }
      tags={["React", "Firebase", "Full-Stack", "Auth", "Networking"]}
      launchUrl="https://elevatehub-1.web.app"
      launchLabel="Explore Network"
      imageSrc="/projects/elevate-hub-v2.jpg"
      imageAlt="ElevateHub Collaboration Platform"
      accent="amber"
      layout="story-first"
    />
  );
}
