'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { History, ShieldCheck, ArrowRight, Pickaxe } from 'lucide-react';

const specifiedEras = [
  { slug: 'prehistory', name: 'Prehistory' },
  { slug: 'archaeological-nigeria', name: 'Archaeological Nigeria' },
  { slug: 'early-societies-states', name: 'Early Societies & States' },
  { slug: 'regional-kingdoms-polities', name: 'Regional Kingdoms & Polities' },
  { slug: 'trade-trans-saharan', name: 'Trade & Trans-Saharan Connections' },
  { slug: 'atlantic-slave-trade', name: 'Atlantic Slave Trade' },
  { slug: 'nineteenth-century-transformations', name: '19th-Century Transformations' },
  { slug: 'colonial-conquest', name: 'Colonial Conquest' },
  { slug: 'nineteen-fourteen-amalgamation', name: '1914 Amalgamation' },
  { slug: 'colonial-nigeria', name: 'Colonial Nigeria' },
  { slug: 'nationalism', name: 'Nationalism' },
  { slug: 'independence', name: 'Independence' },
  { slug: 'first-republic', name: 'First Republic' },
  { slug: 'coups-military-rule', name: 'Coups & Military Rule' },
  { slug: 'civil-war', name: 'Civil War' },
  { slug: 'post-war-nigeria', name: 'Post-War Nigeria' },
  { slug: 'oil-state-formation', name: 'Oil & State Formation' },
  { slug: 'second-republic', name: 'Second Republic' },
  { slug: 'later-military-rule', name: 'Later Military Rule' },
  { slug: 'transition-democracy', name: 'Transition to Democracy' },
  { slug: 'fourth-republic', name: 'Fourth Republic' },
  { slug: 'contemporary-nigeria', name: 'Contemporary Nigeria' },
];

export default function HistoryErasPage() {
  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <History className="w-3.5 h-3.5" />
            <span>NATIONAL CHRONOLOGICAL ERAS INDEX</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED] mb-6">
            History Eras of Nigeria
          </h1>

          <p className="text-lg sm:text-xl text-[#C2BDAF] font-light max-w-3xl leading-relaxed">
            Trace twenty-two chronological epochs of Nigerian history. Start and end dates are populated strictly when supported by verified archival sources.
          </p>

          <div className="mt-8 flex items-center space-x-4">
            <Link
              href="/archaeology"
              className="px-6 py-3 bg-[#032218] border border-[rgba(247,245,237,0.2)] hover:border-[#C85A17] text-xs font-mono text-[#F7F5ED] uppercase tracking-widest flex items-center space-x-2"
            >
              <Pickaxe className="w-4 h-4 text-[#C85A17]" />
              <span>ARCHAEOLOGY HUB</span>
            </Link>
          </div>
        </div>

        {/* Eras List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specifiedEras.map((era, index) => (
            <Link
              key={era.slug}
              href={`/history/${era.slug}`}
              className="group bg-[#032218] border border-[rgba(247,245,237,0.15)] hover:border-[#C85A17] p-6 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#C85A17]">
                  <span>ERA {index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                  <span className="text-[#C2BDAF]">SOURCE REQUIRED FOR DATES</span>
                </div>

                <h2 className="font-serif text-2xl text-[#F7F5ED] group-hover:text-[#C85A17] transition-colors">
                  {era.name}
                </h2>

                <p className="text-xs text-[#C2BDAF] font-mono italic">
                  Dates pending archival claim verification.
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(247,245,237,0.1)] flex items-center justify-between text-[11px] font-mono text-[#C85A17] uppercase font-bold mt-6">
                <span>VIEW CONNECTED RECORDS</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
