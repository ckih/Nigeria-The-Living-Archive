'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { History, ShieldCheck, ArrowRight, Calendar, Layers } from 'lucide-react';

export default function HistoryErasPage() {
  const eras = [
    {
      id: 'pre-nok',
      slug: 'prehistory-archaeology',
      title: 'Prehistory & Archaeological Epochs',
      dates: '1500 BCE – 500 CE',
      summary: 'Early iron smelting in Nok culture, Dufuna canoe maritime archaeology, and stone monoliths of Cross River (Ikom).',
      highlights: ['Nok Terracotta Sculpture', 'Dufuna Canoe Discovery', 'Early Iron Smelting in Taruga'],
      badge: 'ARCHAEOLOGICAL',
    },
    {
      id: 'early-states',
      slug: 'classical-kingdoms',
      title: 'Classical Empires & Polities',
      dates: '500 CE – 1500 CE',
      summary: 'Rise of classical urban civilizations including Ife, Kingdom of Benin, Nri Kingdom, Hausa Bakwai city-states, and Kanem-Bornu Empire.',
      highlights: ['Ife Naturalistic Bronze Heads', 'Benin Earthworks & Royal Guilds', 'Trans-Saharan Trade Networks'],
      badge: 'CLASSICAL',
    },
    {
      id: 'pre-colonial',
      slug: 'precolonial-transformations',
      title: 'Coastal Trade & Pre-Colonial Era',
      dates: '1500 CE – 1850 CE',
      summary: 'Expansion of trans-Saharan and Atlantic trade routes, emergence of Sokoto Caliphate, Oyo Empire peak, and Oil Rivers city-states.',
      highlights: ['Sokoto Caliphate Governance', 'Calabar Palm Oil Commerce', 'Oyo Empire Cavalry Statecraft'],
      badge: 'PRE-COLONIAL',
    },
    {
      id: 'colonial-rule',
      slug: 'colonial-conquest-amalgamation',
      title: 'Colonial Conquest & Amalgamation',
      dates: '1851 CE – 1959 CE',
      summary: 'British royal charter administration, 1897 Benin Expedition, 1914 Amalgamation of Northern and Southern Protectorates, and nationalist movements.',
      highlights: ['1897 Benin Expedition', '1914 Lugard Amalgamation', '1929 Aba Women’s War'],
      badge: 'COLONIAL',
    },
    {
      id: 'independence-republic',
      slug: 'independence-civil-war',
      title: 'Independence & Civil War Era',
      dates: '1960 CE – 1970 CE',
      summary: '1960 Independence, First Republic parliamentary democracy, military coups of 1966, and the 1967–1970 Nigerian Civil War.',
      highlights: ['1960 Independence Proclamation', '1966 Constitutional Collapse', '1967-1970 Civil War & Reconciliation'],
      badge: 'NATIONAL',
    },
    {
      id: 'fourth-republic',
      slug: 'postwar-republics',
      title: 'Modern Federal Republics',
      dates: '1970 CE – Present',
      summary: 'Oil boom, transition to the Fourth Republic, civilian constitutional rule, and modern technological & cultural resurgence.',
      highlights: ['1999 Constitution', 'Nollywood & Afrobeat Global Rise', 'Digital Knowledge Archives'],
      badge: 'CONTEMPORARY',
    },
  ];

  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <History className="w-3.5 h-3.5" />
            <span>CHRONOLOGICAL SPINE OF NIGERIAN CIVILIZATION</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED] mb-6">
            History Eras of Nigeria
          </h1>

          <p className="text-lg sm:text-xl text-[#C2BDAF] font-light max-w-3xl leading-relaxed">
            Trace three millennia of human settlement, statecraft, trade, colonial conquest, and modern nationhood across the Niger-Benue basin.
          </p>
        </div>

        {/* Timeline Eras Stack */}
        <div className="space-y-8">
          {eras.map((era, index) => (
            <div
              key={era.id}
              className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-8 sm:p-10 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-4 max-w-3xl">
                  <div className="flex items-center space-x-3 text-xs font-mono text-[#C85A17]">
                    <span className="px-2.5 py-1 bg-[#063B2A] border border-[rgba(247,245,237,0.15)] font-bold">
                      0{index + 1} / {era.badge}
                    </span>
                    <span className="flex items-center space-x-1 text-[#C2BDAF]">
                      <Calendar className="w-3.5 h-3.5 text-[#C85A17]" />
                      <span>{era.dates}</span>
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F5ED]">
                    {era.title}
                  </h2>

                  <p className="text-base text-[#C2BDAF] font-light leading-relaxed">
                    {era.summary}
                  </p>

                  <div className="pt-2">
                    <span className="block text-[10px] font-mono text-[#C85A17] uppercase tracking-widest mb-2">
                      KEY HISTORICAL MILESTONES
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {era.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-xs bg-[#063B2A] border border-[rgba(247,245,237,0.1)] px-3 py-1 text-[#F7F5ED] font-mono"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end space-y-4">
                  <Link
                    href={`/history/${era.slug}`}
                    className="px-6 py-3 bg-[#063B2A] border border-[rgba(247,245,237,0.15)] hover:border-[#C85A17] text-[#F7F5ED] hover:text-[#C85A17] text-xs font-mono tracking-widest uppercase transition-all flex items-center space-x-2"
                  >
                    <span>EXPLORE ERA</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center space-x-1 text-[10px] font-mono text-[#075E45]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ACADEMIC CONSENSUS</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
