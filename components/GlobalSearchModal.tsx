'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, User, MapPin, Building, ShieldAlert, Sparkles, Clock, Globe } from 'lucide-react';
import {
  seedCommunities,
  seedKingdoms,
  seedPlaces,
  seedEvents,
  seedArtefacts,
} from '@/data/seed';
import { SearchResult } from '@/types/archive';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search Peoples
    seedCommunities.forEach((c) => {
      if (
        c.name.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q)
      ) {
        results.push({
          id: c.id,
          title: c.name,
          type: 'community',
          subtitle: `Peoples & Community • ${c.region}`,
          summary: c.summary,
          url: `/peoples/${c.id}`,
        });
      }
    });

    // Search Kingdoms
    seedKingdoms.forEach((k) => {
      if (
        k.name.toLowerCase().includes(q) ||
        k.historicalPeriod.toLowerCase().includes(q) ||
        k.summary.toLowerCase().includes(q)
      ) {
        results.push({
          id: k.id,
          title: k.name,
          type: 'kingdom',
          subtitle: `Kingdom & State • ${k.historicalPeriod}`,
          summary: k.summary,
          url: `/peoples/edo#kingdoms`, // Deep link or profile
        });
      }
    });

    // Search Places
    seedPlaces.forEach((p) => {
      if (
        p.name.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)
      ) {
        results.push({
          id: p.id,
          title: p.name,
          type: 'place',
          subtitle: `Historical Place • ${p.region}`,
          summary: p.summary,
          url: `/places/${p.id}`,
        });
      }
    });

    // Search Events
    seedEvents.forEach((e) => {
      if (
        e.title.toLowerCase().includes(q) ||
        e.dateDisplay.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q)
      ) {
        results.push({
          id: e.id,
          title: e.title,
          type: 'event',
          subtitle: `Historical Event • ${e.dateDisplay}`,
          summary: e.summary,
          url: `/events/${e.id}`,
        });
      }
    });

    // Search Artefacts
    seedArtefacts.forEach((a) => {
      if (
        a.title.toLowerCase().includes(q) ||
        a.material.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q)
      ) {
        results.push({
          id: a.id,
          title: a.title,
          type: 'artefact',
          subtitle: `Artefact • ${a.period} • ${a.material}`,
          summary: a.summary,
          url: `/artefacts/${a.id}`,
        });
      }
    });

    return results;
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0B0D]/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 animate-fadeIn">
      <div className="bg-[#121418] border border-[#2A2D36] w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">

        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#2A2D36] flex items-center space-x-3 bg-[#181A20]">
          <Search className="w-5 h-5 text-[#C85A17]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search archive (e.g. Benin, Bronze, Nok, Amalgamation, Ife)..."
            className="w-full bg-transparent text-[#E8E3D9] placeholder-[#9CA3AF] focus:outline-none font-serif text-lg sm:text-xl"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#9CA3AF] hover:text-[#E8E3D9]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs tracking-widest text-[#9CA3AF] hover:text-[#C85A17] uppercase px-2 py-1 border border-[#2A2D36] rounded"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-4">
          {!query && (
            <div className="py-8 text-center space-y-3">
              <p className="text-xs tracking-[0.2em] text-[#9CA3AF] uppercase">SUGGESTED HISTORICAL QUERIES</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Benin Bronze', 'Kingdom of Ife', '1897 Expedition', 'Nok Culture', 'Amalgamation 1914', 'Igbo-Ukwu'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs bg-[#181A20] hover:bg-[#C85A17]/20 text-[#E8E3D9] hover:text-[#C85A17] px-3 py-1.5 rounded border border-[#2A2D36] transition-all"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {query && searchResults.length === 0 && (
            <div className="py-12 text-center space-y-2">
              <p className="font-serif text-lg text-[#E8E3D9]">No archived records found for "{query}"</p>
              <p className="text-xs text-[#9CA3AF]">
                Try searching for broader terms like "Edo", "Hausa", "Ife", "1960", or "Benin".
              </p>
            </div>
          )}

          {searchResults.map((res) => (
            <Link
              key={res.id}
              href={res.url}
              onClick={onClose}
              className="block bg-[#181A20] hover:bg-[#1C1F27] p-4 rounded border border-[#2A2D36] hover:border-[#C85A17]/50 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] tracking-widest text-[#C85A17] uppercase font-semibold">
                    {res.subtitle}
                  </span>
                  <h4 className="font-serif text-lg text-[#E8E3D9] group-hover:text-[#C85A17] transition-colors mt-0.5">
                    {res.title}
                  </h4>
                </div>
                <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#C85A17] group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-[#9CA3AF] line-clamp-2 mt-1.5 leading-relaxed">
                {res.summary}
              </p>
            </Link>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#0A0B0D] border-t border-[#2A2D36] flex items-center justify-between text-[11px] text-[#9CA3AF]">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A17]" />
            <span>Structured Sourced Knowledge Graph</span>
          </div>
          <span>Press ESC or click outside to dismiss</span>
        </div>

      </div>
    </div>
  );
}
