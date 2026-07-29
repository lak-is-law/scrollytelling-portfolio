import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import RedGambit from "@/components/work/RedGambit";
import Todar from "@/components/work/Todar";
import ElevateHub from "@/components/work/ElevateHub";
import Leadership from "@/components/Leadership";
import Internships from "@/components/Internships";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Languages from "@/components/Languages";
import Contact from "@/components/Contact";
import BackgroundAudio from "@/components/BackgroundAudio";

export default function Home() {
  return (
    <main className="bg-[#09090b] min-h-screen">
      <BackgroundAudio />
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
      <Contact />
    </main>
  );
}
