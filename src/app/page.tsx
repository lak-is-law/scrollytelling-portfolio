import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import RedGambit from "@/components/work/RedGambit";
import Todar from "@/components/work/Todar";
import ElevateHub from "@/components/work/ElevateHub";
import Internships from "@/components/Internships";
import Leadership from "@/components/Leadership";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Languages from "@/components/Languages";
import GlobalMatrix from "@/components/GlobalMatrix";
import Arcade from "@/components/Arcade";
import Contact from "@/components/Contact";
import BackgroundAudio from "@/components/BackgroundAudio";
import DashboardMenu from "@/components/ui/DashboardMenu";
import ScrollOnboardingOverlay from "@/components/ui/ScrollOnboardingOverlay";

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
