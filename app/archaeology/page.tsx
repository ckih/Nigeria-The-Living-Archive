'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Pickaxe, ShieldCheck, MapPin, Calendar, BookOpen, ArrowRight } from 'lucide-react';

export default function ArchaeologyPage() {
  const sites = [
    {
      id: 'nok-sites',
      name: 'Nok Terracotta Complex (Taruga, Ham Land)',
      location: 'Kaduna & Plateau States',
      period: 'c. 1500 BCE – 500 CE',
      findings: ['Intricate Terracotta Sculptures', 'Iron Smelting Furnaces', 'Stone Tuyeres & Slag'],
      summary: 'One of Africa’s oldest iron-age civilizations, producing naturalistic terracotta heads and pioneering metallurgy in West Africa.',
    },
    {
      id: 'dufuna-canoe',
      name: 'Dufuna Canoe Site',
      location: 'Yobe State (Komadugu Gana River)',
      period: 'c. 6500 BCE (8,000 Years Old)',
      findings: ['Mahogany Monoxyle Canoe (8 meters)', 'Stone Axes', 'Bone Harpoons'],
      summary: 'Africa’s oldest known boat and the world’s third-oldest canoe, proving sophisticated maritime navigation and woodworking in ancient Lake Chad basin.',
    },
    {
      id: 'igbo-ukwu-sites',
      name: 'Igbo-Ukwu (Igbo Isaiah, Igbo Richard, Igbo Jonah)',
      location: 'Anambra State',
      period: 'c. 9th Century CE',
      findings: ['Roped Bronze Vessels', 'Sacred Burial Chambers', 'Over 100,000 Glass Beads'],
      summary: 'Excavated by Thurstan Shaw, demonstrating high-lead lost-wax bronze casting technology and international trade connections predating European contact.',
    },
    {
      id: 'kom-monoliths',
      name: 'Ikom (Akwanshi) Stone Monoliths',
      location: 'Cross River State',
      period: 'c. 200 CE – 1900 CE',
      findings: ['Carved Volcanic Basalt Monoliths', 'Anthropomorphic Stylized Heads', 'Geometric Inscriptions'],
      summary: 'Over 300 carved basalt monoliths representing ancestral leaders and calendar rituals along the Cross River basin.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <Pickaxe className="w-3.5 h-3.5" />
            <span>EXCAVATION & ARCHAEOLOGICAL REPOSITORY</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED] mb-6">
            Archaeology of Nigeria
          </h1>

          <p className="text-lg sm:text-xl text-[#C2BDAF] font-light max-w-3xl leading-relaxed">
            Uncover 8,000 years of excavated material culture, iron-smelting furnaces, monoxyle maritime craft, and classical bronze burial chambers.
          </p>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sites.map((site) => (
            <div
              key={site.id}
              className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-8 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#C85A17]">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{site.location}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-[#C2BDAF]">
                    <Calendar className="w-3.5 h-3.5 text-[#C85A17]" />
                    <span>{site.period}</span>
                  </span>
                </div>

                <h2 className="font-serif text-3xl text-[#F7F5ED]">{site.name}</h2>

                <p className="text-sm text-[#C2BDAF] font-light leading-relaxed">{site.summary}</p>

                <div className="bg-[#063B2A] border border-[rgba(247,245,237,0.1)] p-4 space-y-2">
                  <span className="block text-[10px] font-mono text-[#C85A17] uppercase tracking-widest font-bold">
                    EXCAVATED ARTEFACTS & FINDINGS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {site.findings.map((f, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#032218] border border-[rgba(247,245,237,0.1)] px-2.5 py-1 text-[#F7F5ED] font-mono"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[rgba(247,245,237,0.1)] flex items-center justify-between text-xs font-mono text-[#075E45] mt-6">
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>PEER-REVIEWED EXCAVATION RECORD</span>
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
