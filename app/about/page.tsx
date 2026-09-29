import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Compass, BookOpen, ShieldCheck, Database, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0B0D] text-[#E8E3D9] pt-24 pb-12">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase bg-[#121418] px-3 py-1 rounded border border-[#2A2D36]">
            <Compass className="w-3.5 h-3.5" />
            <span>DIGITAL HERITAGE INSTITUTION</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#E8E3D9]">
            About The Living Archive
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#9CA3AF] italic">
            &ldquo;Exploring the people, places, stories and history that shaped Nigeria.&rdquo;
          </p>
        </div>

        {/* Story Content */}
        <div className="space-y-8 text-sm text-[#9CA3AF] leading-relaxed">

          <div className="bg-[#121418] p-6 rounded border border-[#2A2D36] space-y-3">
            <h3 className="font-serif text-2xl text-[#E8E3D9]">Why The Project Exists</h3>
            <p>
              Nigeria — The Living Archive was built to transcend conventional Wikipedia clones, marketing blogs, and static museum catalogs. It presents Nigerian history as a rich, living knowledge graph—connecting royal dynasties, trade routes, master metalworking guilds, oral histories, and 3D court artefacts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121418] p-6 rounded border border-[#2A2D36] space-y-2">
              <h4 className="font-serif text-xl text-[#C85A17]">3D Artefact Preservation</h4>
              <p className="text-xs">
                Interactive digital reconstructions and 3D scans allow users worldwide to examine royal court sculptures with annotation hotspots.
              </p>
            </div>

            <div className="bg-[#121418] p-6 rounded border border-[#2A2D36] space-y-2">
              <h4 className="font-serif text-xl text-[#C85A17]">Geographic Atlas</h4>
              <p className="text-xs">
                Time-aware historical maps demonstrate the evolution of pre-colonial empires, trade hubs, and cultural landscapes over thousands of years.
              </p>
            </div>
          </div>

          <div className="bg-[#181A20] p-6 rounded border border-[#2A2D36] space-y-4">
            <h3 className="font-serif text-2xl text-[#E8E3D9]">Core Principles</h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#C85A17]" />
                <span>Strictly grounded in primary documents, academic sources, and verified oral testimonies.</span>
              </li>
              <li className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#C85A17]" />
                <span>No fabricated AI hallucinations presented as authentic historical fact.</span>
              </li>
              <li className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#C85A17]" />
                <span>Respectful ethnographic terminology honoring African civilizational achievements.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      <Footer />
    </main>
  );
}
