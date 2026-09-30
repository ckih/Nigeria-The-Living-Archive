'use client';

import Link from 'next/link';
import { ArrowUpRight, Compass, Landmark } from 'lucide-react';

export default function BeforeNigeriaSection() {
  const societies = [
    {
      id: 'nok',
      name: 'Nok Culture',
      period: 'c. 1500 BCE – 500 CE',
      region: 'Central Savannah / Kaduna River Valley',
      summary: 'Early West African iron-smelting society celebrated for remarkable terracotta sculptures.',
      link: '/events/event-nok-epoch',
      category: 'Archaeological Epoch',
    },
    {
      id: 'benin',
      name: 'Kingdom of Benin',
      period: 'c. 1180 – 1897 CE',
      region: 'Forest Belt / Modern Edo State',
      summary: 'Renowned empire characterized by colossal earthwork ramparts, sacred kingship, and brass casting.',
      link: '/peoples/edo',
      category: 'Empire',
    },
    {
      id: 'ife',
      name: 'Kingdom of Ife',
      period: 'c. 800 CE – Present',
      region: 'Southwestern Forest / Osun State',
      summary: 'Spiritual cradle of Yoruba civilization and home to world-renowned naturalistic brass and terracotta art.',
      link: '/places/place-ife',
      category: 'Sacred Kingdom',
    },
    {
      id: 'kanem-bornu',
      name: 'Kanem-Bornu Empire',
      period: 'c. 700 – 1900 CE',
      region: 'Lake Chad Basin / Northeast',
      summary: 'Millennium-spanning Islamic empire supported by heavy cavalry and trans-Saharan trade dominance.',
      link: '/peoples/hausa',
      category: 'Sahelian Empire',
    },
    {
      id: 'nri',
      name: 'Kingdom of Nri',
      period: 'c. 948 – 1911 CE',
      region: 'Anambra Basin / Igboland',
      summary: 'Ancient sacred hegemony governed through peace covenants, ritual purity, and non-military authority.',
      link: '/places/place-igbo-ukwu',
      category: 'Ritual Kingdom',
    },
    {
      id: 'hausa-states',
      name: 'Hausa City-States',
      period: 'c. 1000 CE – Present',
      region: 'Northern Plains (Kano, Katsina, Zaria)',
      summary: 'Commercial, walled city-states famous for indigo dyeing, leatherwork, and Sahelian scholarship.',
      link: '/peoples/hausa',
      category: 'City-State Network',
    },
    {
      id: 'sukur',
      name: 'Sukur Cultural Landscape',
      period: 'c. 1600 CE – Present',
      region: 'Mandara Mountains / Adamawa',
      summary: 'Dry-stone architecture and sacred iron smelting, inscribed as Africa’s first UNESCO Cultural Landscape.',
      link: '/places/place-kano',
      category: 'UNESCO Heritage',
    },
    {
      id: 'oyo',
      name: 'Oyo Empire',
      period: 'c. 1300 – 1896 CE',
      region: 'Southwestern Savannah',
      summary: 'Formidable imperial state utilizing cavalry forces and sophisticated constitutional checks-and-balances.',
      link: '/peoples/yoruba',
      category: 'Cavalry Empire',
    },
  ];

  return (
    <section id="before-nigeria" className="py-24 bg-[#032218] text-[#F7F5ED] border-t border-[rgba(247,245,237,0.15)] relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase font-mono font-bold">
            <Landmark className="w-3.5 h-3.5" />
            <span>02 / PRE-COLONIAL EPOCHS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F7F5ED] leading-tight">
            &ldquo;Before there was Nigeria, there were hundreds of histories.&rdquo;
          </h2>

          <p className="text-sm sm:text-base text-[#C2BDAF] leading-relaxed">
            Long before the 1914 colonial amalgamation, the territories of contemporary Nigeria were home to diverse empires, sacred kingdoms, autonomous city-states, and independent lineage confederations.
          </p>
        </div>

        {/* Societies Grid / Markers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {societies.map((society, idx) => (
            <Link
              key={society.id}
              href={society.link}
              className="group bg-[#063B2A] hover:bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)] hover:border-[#C85A17] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-4 z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-widest text-[#C85A17] uppercase font-mono font-bold">
                    0{idx + 1} // {society.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#C2BDAF] group-hover:text-[#C85A17] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-[#F7F5ED] group-hover:text-[#C85A17] transition-colors">
                    {society.name}
                  </h3>
                  <p className="text-[11px] font-mono text-[#C85A17] mt-1">
                    {society.period}
                  </p>
                </div>

                <p className="text-xs text-[#C2BDAF] leading-relaxed line-clamp-3">
                  {society.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-[rgba(247,245,237,0.1)] mt-6 z-10 flex items-center justify-between text-[10px] text-[#C2BDAF] font-mono">
                <span>{society.region}</span>
                <span className="text-[#C85A17] group-hover:underline uppercase tracking-wider font-bold">Inspect Profile</span>
              </div>

              {/* Faint background index */}
              <span className="absolute right-2 bottom-0 font-serif text-7xl font-bold text-[rgba(247,245,237,0.05)] group-hover:text-[#C85A17]/10 transition-colors pointer-events-none">
                0{idx + 1}
              </span>
            </Link>
          ))}
        </div>

        {/* Disclaimer / Historiography Note */}
        <div className="bg-[#063B2A] border border-[rgba(247,245,237,0.15)] p-4 text-xs text-[#C2BDAF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
          <div className="flex items-center space-x-3">
            <Compass className="w-4 h-4 text-[#C85A17] shrink-0" />
            <p>
              <strong className="text-[#F7F5ED]">Historiographical Notice:</strong> Historical borders were fluid, ecological, and tributary rather than static modern Westphalian state lines.
            </p>
          </div>
          <Link
            href="/editorial-policy"
            className="text-[10px] tracking-widest text-[#C85A17] uppercase hover:underline shrink-0 font-bold"
          >
            Editorial Provenance
          </Link>
        </div>

      </div>

    </section>
  );
}
