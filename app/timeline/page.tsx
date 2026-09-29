'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Clock, Filter, ArrowRight, Layers, MapPin, ExternalLink } from 'lucide-react';
import { seedTimeline } from '@/data/seed';

export default function TimelinePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeItem, setActiveItem] = useState(seedTimeline[0]);

  const categories = ['ALL', 'Kingdom', 'Event', 'Artefact', 'Epoch', 'Political'];

  const filteredTimeline = selectedCategory === 'ALL'
    ? seedTimeline
    : seedTimeline.filter((t) => t.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#0A0B0D] text-[#E8E3D9] pt-24 pb-12">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Page Title */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase">
            <Clock className="w-3.5 h-3.5" />
            <span>CHRONOLOGICAL EXPLORER</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#E8E3D9]">
            Interactive Timeline of Nigeria
          </h1>

          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            Traverse over three millennia of historical milestones, from ancient Nok iron smelters to independence and the Fourth Republic.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded border text-[11px] tracking-wider uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-[#C85A17] text-[#E8E3D9] border-[#C85A17]'
                  : 'bg-[#121418] text-[#9CA3AF] border-[#2A2D36] hover:text-[#E8E3D9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timeline Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Vertical Timeline Stepper */}
          <div className="lg:col-span-7 bg-[#121418] border border-[#2A2D36] rounded-lg p-6 space-y-6 relative max-h-[650px] overflow-y-auto custom-scrollbar">

            <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-[#2A2D36]" />

            {filteredTimeline.map((item) => {
              const isSelected = activeItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`relative pl-10 pr-4 py-4 rounded border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#181A20] border-[#C85A17] text-[#E8E3D9]'
                      : 'bg-[#0A0B0D]/60 border-[#2A2D36] text-[#9CA3AF] hover:bg-[#181A20] hover:text-[#E8E3D9]'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-2.5 top-5 w-3 h-3 rounded-full border-2 ${
                      isSelected
                        ? 'bg-[#C85A17] border-[#E8E3D9]'
                        : 'bg-[#0A0B0D] border-[#9CA3AF]'
                    }`}
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#C85A17] font-bold uppercase tracking-widest">
                      {item.dateDisplay}
                    </span>
                    <span className="text-[9px] font-mono bg-[#2A2D36] px-2 py-0.5 rounded text-[#E8E3D9]">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[#E8E3D9] mt-1">{item.title}</h3>
                  <p className="text-xs text-[#9CA3AF] line-clamp-2 mt-1">{item.summary}</p>
                </div>
              );
            })}

          </div>

          {/* Timeline Detail Panel */}
          <div className="lg:col-span-5 bg-[#181A20] border border-[#2A2D36] rounded-lg p-6 space-y-6 sticky top-28">
            <div className="space-y-2 border-b border-[#2A2D36] pb-3">
              <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest">
                MILESTONE DETAILS
              </span>
              <h3 className="font-serif text-3xl text-[#E8E3D9]">{activeItem.title}</h3>
              <p className="text-xs font-mono text-[#C85A17]">{activeItem.dateDisplay}</p>
            </div>

            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              {activeItem.summary}
            </p>

            <div className="bg-[#121418] p-4 rounded border border-[#2A2D36] space-y-1 text-xs text-[#9CA3AF]">
              <span className="text-[10px] text-[#E8E3D9] uppercase font-semibold">
                LINKED ENTITY CLASSIFICATION
              </span>
              <p>Type: {activeItem.entityType} • Ref: {activeItem.entityId}</p>
            </div>

            <div>
              <Link
                href={`/${activeItem.entityType === 'event' ? 'events' : activeItem.entityType === 'artefact' ? 'artefacts' : 'peoples'}/${activeItem.entityId}`}
                className="w-full py-3 bg-[#C85A17] hover:bg-[#A04000] text-[#E8E3D9] text-xs font-medium tracking-widest uppercase rounded transition-colors flex items-center justify-center space-x-2"
              >
                <span>OPEN FULL DOSSIER</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </main>
  );
}
