'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  seedCommunities,
  seedKingdoms,
  seedPlaces,
  seedEvents,
  seedArtefacts,
} from '@/data/seed';
import { Search, Map, Clock, Database, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchesQuery = (text?: string) =>
    text ? text.toLowerCase().includes(query.toLowerCase()) : false;

  const filteredCommunities = query
    ? seedCommunities.filter(
        (c) =>
          matchesQuery(c.canonicalName) ||
          matchesQuery(c.name) ||
          matchesQuery(c.summary) ||
          (Array.isArray(c.region) ? c.region.some((r) => matchesQuery(r)) : matchesQuery(c.region))
      )
    : [];

  const filteredKingdoms = query
    ? seedKingdoms.filter(
        (k) =>
          matchesQuery(k.canonicalName) ||
          matchesQuery(k.name) ||
          matchesQuery(k.summary) ||
          matchesQuery(k.historicalPeriod)
      )
    : [];

  const filteredPlaces = query
    ? seedPlaces.filter(
        (p) =>
          matchesQuery(p.canonicalName) ||
          matchesQuery(p.name) ||
          matchesQuery(p.summary) ||
          (Array.isArray(p.region) ? p.region.some((r) => matchesQuery(r)) : matchesQuery(p.region))
      )
    : [];

  const filteredEvents = query
    ? seedEvents.filter(
        (e) =>
          matchesQuery(e.canonicalName) ||
          matchesQuery(e.title) ||
          matchesQuery(e.summary) ||
          matchesQuery(e.dateDisplay)
      )
    : [];

  const filteredArtefacts = query
    ? seedArtefacts.filter(
        (a) =>
          matchesQuery(a.canonicalName) ||
          matchesQuery(a.title) ||
          matchesQuery(a.summary) ||
          matchesQuery(a.period)
      )
    : [];

  const hasResults =
    filteredCommunities.length > 0 ||
    filteredKingdoms.length > 0 ||
    filteredPlaces.length > 0 ||
    filteredEvents.length > 0 ||
    filteredArtefacts.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-[#063B2A]/90 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-fadeIn">
      <div className="bg-[#032218] border border-[rgba(247,245,237,0.2)] max-w-3xl w-full p-6 shadow-2xl space-y-6 relative text-[#F7F5ED]">

        {/* Search Input */}
        <div className="flex items-center space-x-3 border-b border-[rgba(247,245,237,0.2)] pb-4">
          <Search className="w-5 h-5 text-[#C85A17]" />
          <input
            type="text"
            placeholder="Search across communities, kingdoms, places, events, artefacts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-lg text-[#F7F5ED] placeholder-[#C2BDAF]/60 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-[#C2BDAF] hover:text-[#F7F5ED]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto space-y-6 custom-scrollbar pr-2 font-mono text-xs">
          {!query && (
            <div className="text-center py-12 text-[#C2BDAF] space-y-2">
              <Database className="w-8 h-8 text-[#C85A17] mx-auto opacity-80" />
              <p className="font-serif text-lg text-[#F7F5ED]">Search the Living Archive</p>
              <p className="text-xs">Type a keyword like &quot;Benin&quot;, &quot;Ife&quot;, &quot;1897&quot;, or &quot;Yoruba&quot;</p>
            </div>
          )}

          {query && !hasResults && (
            <div className="text-center py-12 text-[#C2BDAF]">
              <p>No verified entities matched &ldquo;{query}&rdquo;.</p>
            </div>
          )}

          {/* Communities */}
          {filteredCommunities.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] text-[#C85A17] uppercase tracking-widest block font-bold">
                COMMUNITIES & PEOPLES ({filteredCommunities.length})
              </span>
              <div className="space-y-2">
                {filteredCommunities.map((c) => (
                  <Link
                    key={c.id}
                    href={`/peoples/${c.id}`}
                    onClick={onClose}
                    className="block bg-[#063B2A] border border-[rgba(247,245,237,0.1)] hover:border-[#C85A17] p-3 transition-colors"
                  >
                    <div className="flex justify-between items-center text-[#F7F5ED] font-serif text-base mb-1">
                      <span>{c.canonicalName}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C85A17]" />
                    </div>
                    <p className="text-xs text-[#C2BDAF] font-sans font-light line-clamp-1">{c.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Kingdoms */}
          {filteredKingdoms.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] text-[#C85A17] uppercase tracking-widest block font-bold">
                KINGDOMS & POLITIES ({filteredKingdoms.length})
              </span>
              <div className="space-y-2">
                {filteredKingdoms.map((k) => (
                  <Link
                    key={k.id}
                    href={`/#kingdoms`}
                    onClick={onClose}
                    className="block bg-[#063B2A] border border-[rgba(247,245,237,0.1)] hover:border-[#C85A17] p-3 transition-colors"
                  >
                    <div className="flex justify-between items-center text-[#F7F5ED] font-serif text-base mb-1">
                      <span>{k.canonicalName}</span>
                      <span className="text-xs text-[#C2BDAF]">{k.historicalPeriod}</span>
                    </div>
                    <p className="text-xs text-[#C2BDAF] font-sans font-light line-clamp-1">{k.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {filteredEvents.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] text-[#C85A17] uppercase tracking-widest block font-bold">
                HISTORICAL EVENTS ({filteredEvents.length})
              </span>
              <div className="space-y-2">
                {filteredEvents.map((e) => (
                  <Link
                    key={e.id}
                    href={`/events/${e.id}`}
                    onClick={onClose}
                    className="block bg-[#063B2A] border border-[rgba(247,245,237,0.1)] hover:border-[#C85A17] p-3 transition-colors"
                  >
                    <div className="flex justify-between items-center text-[#F7F5ED] font-serif text-base mb-1">
                      <span>{e.canonicalName}</span>
                      <span className="text-xs text-[#C85A17]">{e.dateDisplay}</span>
                    </div>
                    <p className="text-xs text-[#C2BDAF] font-sans font-light line-clamp-1">{e.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Artefacts */}
          {filteredArtefacts.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] text-[#C85A17] uppercase tracking-widest block font-bold">
                ARTEFACTS & 3D OBJECTS ({filteredArtefacts.length})
              </span>
              <div className="space-y-2">
                {filteredArtefacts.map((a) => (
                  <Link
                    key={a.id}
                    href={`/artefacts/${a.id}`}
                    onClick={onClose}
                    className="block bg-[#063B2A] border border-[rgba(247,245,237,0.1)] hover:border-[#C85A17] p-3 transition-colors"
                  >
                    <div className="flex justify-between items-center text-[#F7F5ED] font-serif text-base mb-1">
                      <span>{a.canonicalName}</span>
                      <span className="text-xs text-[#C85A17]">{a.period}</span>
                    </div>
                    <p className="text-xs text-[#C2BDAF] font-sans font-light line-clamp-1">{a.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
