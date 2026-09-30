'use client';

import { useState } from 'react';
import Link from 'next/link';
import { repo } from '@/lib/repo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, MapPin, Users, ArrowRight, Filter, ShieldCheck } from 'lucide-react';
import { Community } from '@/types/archive';

export default function PeoplesDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCoverage, setSelectedCoverage] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const communities = repo.getEntitiesByType<Community>('community');

  const filtered = communities.filter((c) => {
    const matchesSearch =
      c.canonicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion = selectedRegion === 'all' || c.region === selectedRegion;
    const matchesCoverage = selectedCoverage === 'all' || c.coverageStatus === selectedCoverage;

    return matchesSearch && matchesRegion && matchesCoverage;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedCommunities = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>NATIONAL ETHNOGRAPHIC REGISTRY (250+ COMMUNITY CAPACITY)</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED] mb-6">
            Peoples & Communities
          </h1>

          <p className="text-lg sm:text-xl text-[#C2BDAF] font-light max-w-3xl leading-relaxed">
            Explore Nigeria’s ethnic communities, oral origins, political systems, and material culture without flattening taxonomies or modern Westphalian border assumptions.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 mb-12 space-y-6 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C2BDAF]" />
              <input
                type="text"
                placeholder="Search community by name or summary..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#063B2A] border border-[rgba(247,245,237,0.2)] pl-11 pr-4 py-3 text-sm text-[#F7F5ED] placeholder-[#C2BDAF]/60 focus:outline-none focus:border-[#C85A17]"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#063B2A] border border-[rgba(247,245,237,0.2)] px-4 py-3 text-sm text-[#F7F5ED] focus:outline-none focus:border-[#C85A17]"
              >
                <option value="all">All Regions</option>
                <option value="South-South / Forest">South-South</option>
                <option value="South-West">South-West</option>
                <option value="South-East">South-East</option>
                <option value="North-West">North-West</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedCoverage}
                onChange={(e) => {
                  setSelectedCoverage(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#063B2A] border border-[rgba(247,245,237,0.2)] px-4 py-3 text-sm text-[#F7F5ED] focus:outline-none focus:border-[#C85A17]"
              >
                <option value="all">All Coverage Statuses</option>
                <option value="VERIFIED">Verified</option>
                <option value="INDEXED">Indexed</option>
                <option value="SOURCE_REQUIRED">Source Required</option>
              </select>
            </div>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedCommunities.map((community) => (
            <Link
              key={community.id}
              href={`/peoples/${community.id}`}
              className="group bg-[#032218] border border-[rgba(247,245,237,0.15)] hover:border-[#C85A17] transition-all duration-300 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#C85A17] mb-3 uppercase tracking-wider font-bold">
                  <span>{community.region || 'Nigeria'}</span>
                  <span className="flex items-center space-x-1 text-[#075E45]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{community.coverageStatus}</span>
                  </span>
                </div>

                <h2 className="font-serif text-3xl font-normal text-[#F7F5ED] group-hover:text-[#C85A17] transition-colors mb-3">
                  {community.canonicalName}
                </h2>

                <p className="text-sm text-[#C2BDAF] font-light leading-relaxed line-clamp-3 mb-6">
                  {community.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-[rgba(247,245,237,0.1)] flex items-center justify-between text-[#F7F5ED] group-hover:text-[#C85A17] font-semibold text-[11px] font-mono tracking-widest uppercase">
                <span>EXPLORE PROFILE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-between border-t border-[rgba(247,245,237,0.15)] pt-6 font-mono text-xs text-[#C2BDAF]">
            <span>PAGE {currentPage} OF {totalPages}</span>
            <div className="flex space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-4 py-2 bg-[#032218] border border-[rgba(247,245,237,0.2)] disabled:opacity-40"
              >
                PREVIOUS
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 bg-[#032218] border border-[rgba(247,245,237,0.2)] disabled:opacity-40"
              >
                NEXT
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
