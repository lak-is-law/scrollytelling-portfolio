import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import RedGambit from "@/components/work/RedGambit";
import Todar from "@/components/work/Todar";
import ElevateHub from "@/components/work/ElevateHub";
import Leadership from "@/components/Leadership";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#09090b] min-h-screen">
      <div className="relative">
        <ScrollyCanvas />
        <Overlay />
      </div>
      <RedGambit />
      <Todar />
      <ElevateHub />
      <Leadership />
      <Contact />
    </main>
  );
}
