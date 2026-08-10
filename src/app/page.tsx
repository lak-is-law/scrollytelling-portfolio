import dynamic from "next/dynamic";
import DashboardMenu from "@/components/ui/DashboardMenu";
import BackgroundAudio from "@/components/BackgroundAudio";
import ScrollOnboardingOverlay from "@/components/ui/ScrollOnboardingOverlay";

const ScrollyCanvas = dynamic(() => import("@/components/ScrollyCanvas"), { ssr: false });
const Overlay = dynamic(() => import("@/components/Overlay"), { ssr: false });
const RedGambit = dynamic(() => import("@/components/work/RedGambit"));
const Todar = dynamic(() => import("@/components/work/Todar"));
const ElevateHub = dynamic(() => import("@/components/work/ElevateHub"));
const Internships = dynamic(() => import("@/components/Internships"));
const Leadership = dynamic(() => import("@/components/Leadership"));
const Achievements = dynamic(() => import("@/components/Achievements"));
const Certifications = dynamic(() => import("@/components/Certifications"));
const Languages = dynamic(() => import("@/components/Languages"));
const GlobalMatrix = dynamic(() => import("@/components/GlobalMatrix"), { ssr: false });
const Arcade = dynamic(() => import("@/components/Arcade"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-global-grid min-h-screen text-white relative focus:outline-none">
      <BackgroundAudio />
      <DashboardMenu />
      <ScrollOnboardingOverlay />
      <div className="relative">
        <ScrollyCanvas />
        <Overlay />
      </div>
      <RedGambit />
      <Todar />
      <ElevateHub />
      <Internships />
      <Leadership />
      <Achievements />
      <Certifications />
      <Languages />
      <GlobalMatrix />
      <Arcade />
      <Contact />
    </main>
  );
}
