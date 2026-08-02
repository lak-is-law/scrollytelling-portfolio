import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import RedGambit from "@/components/work/RedGambit";
import Todar from "@/components/work/Todar";
import ElevateHub from "@/components/work/ElevateHub";
import CareerTimeline from "@/components/CareerTimeline";
import Languages from "@/components/Languages";
import GlobalMatrix from "@/components/GlobalMatrix";
import DigitalIdentity from "@/components/DigitalIdentity";
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
      <CareerTimeline />
      <Languages />
      <GlobalMatrix />
      <DigitalIdentity />
      <Contact />
    </main>
  );
}
