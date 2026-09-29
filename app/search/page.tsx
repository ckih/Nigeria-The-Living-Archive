'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  seedCommunities,
  seedKingdoms,
  seedPlaces,
  seedEvents,
  seedArtefacts,
} from '@/data/seed';
import { Search, ShieldCheck, ArrowRight, Database } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const matchesQuery = (text?: string) =>
    text ? text.toLowerCase().includes(query.toLowerCase()) : false;

  const filteredCommunities = seedCommunities.filter(
    (c) =>
      (selectedType === 'all' || selectedType === 'community') &&
      (!query ||
        matchesQuery(c.canonicalName) ||
        matchesQuery(c.name) ||
        matchesQuery(c.summary))
  );

  const filteredKingdoms = seedKingdoms.filter(
    (k) =>
      (selectedType === 'all' || selectedType === 'kingdom') &&
      (!query ||
        matchesQuery(k.canonicalName) ||
        matchesQuery(k.name) ||
        matchesQuery(k.summary))
  );

  const filteredPlaces = seedPlaces.filter(
    (p) =>
      (selectedType === 'all' || selectedType === 'place') &&
      (!query ||
        matchesQuery(p.canonicalName) ||
        matchesQuery(p.name) ||
        matchesQuery(p.summary))
  );

  const filteredEvents = seedEvents.filter(
    (e) =>
      (selectedType === 'all' || selectedType === 'event') &&
      (!query ||
        matchesQuery(e.canonicalName) ||
        matchesQuery(e.title) ||
        matchesQuery(e.summary))
  );

  const filteredArtefacts = seedArtefacts.filter(
    (a) =>
      (selectedType === 'all' || selectedType === 'artefact') &&
      (!query ||
        matchesQuery(a.canonicalName) ||
        matchesQuery(a.title) ||
        matchesQuery(a.summary))
  );

  const totalResults =
    filteredCommunities.length +
    filteredKingdoms.length +
    filteredPlaces.length +
    filteredEvents.length +
    filteredArtefacts.length;

  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <Search className="w-3.5 h-3.5" />
            <span>GLOBAL ARCHIVE SEARCH ENGINE</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED] mb-6">
            Search the Archive
          </h1>

          <p className="text-lg sm:text-xl text-[#C2BDAF] font-light max-w-3xl leading-relaxed">
            Query across all 20+ historical entity categories with category filtering and verified source provenance.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 mb-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C2BDAF]" />
              <input
                type="text"
                placeholder="Search by keyword, community, place, event, or artefact..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-[#063B2A] border border-[rgba(247,245,237,0.2)] pl-11 pr-4 py-3 text-sm text-[#F7F5ED] placeholder-[#C2BDAF]/60 focus:outline-none focus:border-[#C85A17]"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#063B2A] border border-[rgba(247,245,237,0.2)] px-4 py-3 text-sm text-[#F7F5ED] focus:outline-none focus:border-[#C85A17]"
              >
                <option value="all">All Entity Categories</option>
                <option value="community">Communities & Peoples</option>
                <option value="kingdom">Kingdoms & Polities</option>
                <option value="place">Cities & Places</option>
                <option value="event">Historical Events</option>
                <option value="artefact">Artefacts & 3D Models</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-[#C2BDAF]">
            <span>FOUND {totalResults} MATCHING ARCHIVAL ENTITIES</span>
            {query && (
              <button onClick={() => setQuery('')} className="text-[#C85A17] hover:underline">
                CLEAR QUERY
              </button>
            )}
          </div>
        </div>

        {/* Search Results Display */}
        <div className="space-y-8">
          {filteredCommunities.map((c) => (
            <Link
              key={c.id}
              href={`/peoples/${c.id}`}
              className="block bg-[#032218] border border-[rgba(247,245,237,0.15)] hover:border-[#C85A17] p-6 transition-all space-y-2"
            >
              <div className="flex justify-between items-center text-xs font-mono text-[#C85A17] uppercase">
                <span>COMMUNITY</span>
                <span className="flex items-center space-x-1 text-[#075E45]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>VERIFIED RECORD</span>
                </span>
              </div>
              <h3 className="font-serif text-2xl text-[#F7F5ED]">{c.canonicalName}</h3>
              <p className="text-sm text-[#C2BDAF] font-light leading-relaxed">{c.summary}</p>
            </Link>
          ))}

          {filteredEvents.map((e) => (
            <Link
              key={e.id}
              href={`/events/${e.id}`}
              className="block bg-[#032218] border border-[rgba(247,245,237,0.15)] hover:border-[#C85A17] p-6 transition-all space-y-2"
            >
              <div className="flex justify-between items-center text-xs font-mono text-[#C85A17] uppercase">
                <span>HISTORICAL EVENT • {e.dateDisplay}</span>
                <span className="flex items-center space-x-1 text-[#075E45]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>VERIFIED RECORD</span>
                </span>
              </div>
              <h3 className="font-serif text-2xl text-[#F7F5ED]">{e.canonicalName}</h3>
              <p className="text-sm text-[#C2BDAF] font-light leading-relaxed">{e.summary}</p>
            </Link>
          ))}

          {filteredArtefacts.map((a) => (
            <Link
              key={a.id}
              href={`/artefacts/${a.id}`}
              className="block bg-[#032218] border border-[rgba(247,245,237,0.15)] hover:border-[#C85A17] p-6 transition-all space-y-2"
            >
              <div className="flex justify-between items-center text-xs font-mono text-[#C85A17] uppercase">
                <span>ARTEFACT • {a.period}</span>
                <span className="flex items-center space-x-1 text-[#075E45]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>VERIFIED RECORD</span>
                </span>
              </div>
              <h3 className="font-serif text-2xl text-[#F7F5ED]">{a.canonicalName}</h3>
              <p className="text-sm text-[#C2BDAF] font-light leading-relaxed">{a.summary}</p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
