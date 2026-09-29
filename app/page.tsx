'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BeforeNigeriaSection from '@/components/BeforeNigeriaSection';
import InteractiveMapSection from '@/components/InteractiveMapSection';
import PeoplesSection from '@/components/PeoplesSection';
import ArtefactsMediaSection from '@/components/ArtefactsMediaSection';
import CuratedStorySection from '@/components/CuratedStorySection';
import Footer from '@/components/Footer';
import { repo } from '@/lib/repo';
import { ShieldCheck, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function Home() {
  const totalEntities = repo.getAllEntities().length;
  const totalCommunities = repo.getEntitiesByType('community').length;
  const totalKingdoms = repo.getEntitiesByType('kingdom').length;
  const totalSources = repo.getAllSources().length;

  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main>
        {/* Fullscreen Hero Experience */}
        <HeroSection />

        {/* Database-Driven National Stats Bar */}
        <div className="bg-[#032218] border-y border-[rgba(247,245,237,0.15)] py-8 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-mono text-xs text-[#C2BDAF]">
            <div>
              <span className="block font-serif text-3xl text-[#F7F5ED]">{totalEntities}</span>
              <span className="tracking-widest uppercase text-[10px] text-[#C85A17]">INDEXED ENTITIES</span>
            </div>
            <div>
              <span className="block font-serif text-3xl text-[#F7F5ED]">{totalCommunities}</span>
              <span className="tracking-widest uppercase text-[10px] text-[#C85A17]">COMMUNITIES</span>
            </div>
            <div>
              <span className="block font-serif text-3xl text-[#F7F5ED]">{totalKingdoms}</span>
              <span className="tracking-widest uppercase text-[10px] text-[#C85A17]">KINGDOMS & POLITIES</span>
            </div>
            <div>
              <span className="block font-serif text-3xl text-[#F7F5ED]">{totalSources}</span>
              <span className="tracking-widest uppercase text-[10px] text-[#C85A17]">ARCHIVAL SOURCES</span>
            </div>
          </div>
        </div>

        {/* Section 2: Before Nigeria */}
        <div id="before-nigeria">
          <BeforeNigeriaSection />
        </div>

        {/* Section 3: Interactive Map */}
        <div id="map">
          <InteractiveMapSection />
        </div>

        {/* Section 4: Peoples & Communities */}
        <div id="peoples">
          <PeoplesSection />
        </div>

        {/* Section 5: Artefacts & 3D Viewer */}
        <div id="artefacts">
          <ArtefactsMediaSection />
        </div>

        {/* Section 6: Curated Story Journey */}
        <CuratedStorySection />
      </main>

      <Footer />
    </div>
  );
}
