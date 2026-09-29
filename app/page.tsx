import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import BeforeNigeriaSection from '@/components/BeforeNigeriaSection';
import InteractiveMapSection from '@/components/InteractiveMapSection';
import PeoplesSection from '@/components/PeoplesSection';
import CuratedStorySection from '@/components/CuratedStorySection';
import ArtefactsMediaSection from '@/components/ArtefactsMediaSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0B0D] text-[#E8E3D9]">
      <Header />

      {/* SECTION 1: OPENING HERO */}
      <HeroSection />

      {/* SECTION 2: BEFORE NIGERIA */}
      <BeforeNigeriaSection />

      {/* SECTION 3: INTERACTIVE HISTORICAL MAP */}
      <InteractiveMapSection />

      {/* SECTION 4: PEOPLES & COMMUNITIES */}
      <PeoplesSection />

      {/* SECTION 5: CURATED NARRATIVE JOURNEY */}
      <CuratedStorySection />

      {/* SECTIONS 6, 7 & 8: 3D ARTEFACTS, THEN/NOW & MEDIA */}
      <ArtefactsMediaSection />

      <Footer />
    </main>
  );
}
