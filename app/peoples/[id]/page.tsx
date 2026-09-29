import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldCheck, MapPin, ArrowRight, BookOpen, Layers, ExternalLink } from 'lucide-react';
import { seedCommunities, seedKingdoms, seedSources } from '@/data/seed';

export async function generateStaticParams() {
  return seedCommunities.map((c) => ({ id: c.id }));
}

export default async function PeopleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const community = seedCommunities.find((c) => c.id === resolvedParams.id);

  if (!community) {
    notFound();
  }

  const linkedSources = seedSources.filter((s) => community.sourceIds.includes(s.id));

  return (
    <main className="min-h-screen bg-[#0A0B0D] text-[#E8E3D9] pt-24">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#2A2D36] relative archival-grid">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>PEOPLES & COMMUNITIES DOSSIER • {community.region}</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl text-[#E8E3D9]">
            {community.name}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#9CA3AF] italic">
            &ldquo;{community.summary}&rdquo;
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-[#9CA3AF] pt-2">
            <div>
              <span className="text-[#C85A17]">Language Family:</span> {community.languageFamily}
            </div>
            <div>
              <span className="text-[#C85A17]">Languages Spoken:</span> {community.languagesSpoken.join(', ')}
            </div>
            <div>
              <span className="text-[#C85A17]">Coordinates:</span> {community.coordinates.lat}° N, {community.coordinates.lng}° E
            </div>
          </div>
        </div>
      </section>

      {/* Structured Sections Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">

        {/* Table of Contents Sticky Bar */}
        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#9CA3AF] bg-[#121418] p-3 rounded border border-[#2A2D36]">
          <span className="text-[#C85A17] font-bold uppercase mr-2">DOSSIER INDEX:</span>
          <a href="#overview" className="hover:text-[#E8E3D9]">01 OVERVIEW</a>
          <span>•</span>
          <a href="#origins" className="hover:text-[#E8E3D9]">02 ORIGINS</a>
          <span>•</span>
          <a href="#political" className="hover:text-[#E8E3D9]">03 POLITICAL SYSTEMS</a>
          <span>•</span>
          <a href="#art" className="hover:text-[#E8E3D9]">07 ART & TECH</a>
          <span>•</span>
          <a href="#sources" className="hover:text-[#E8E3D9]">16 SOURCES</a>
        </div>

        {/* 01 Overview */}
        <div id="overview" className="space-y-3 bg-[#121418] p-6 rounded border border-[#2A2D36]">
          <h3 className="font-serif text-2xl text-[#C85A17]">01 / OVERVIEW</h3>
          <p className="text-sm text-[#E8E3D9]/90 leading-relaxed">{community.sections.overview}</p>
        </div>

        {/* 02 Origins */}
        <div id="origins" className="space-y-3 bg-[#121418] p-6 rounded border border-[#2A2D36]">
          <h3 className="font-serif text-2xl text-[#C85A17]">02 / ORIGINS & EARLY HISTORY</h3>
          <p className="text-sm text-[#E8E3D9]/90 leading-relaxed">{community.sections.origins}</p>
        </div>

        {/* 03 Political Systems */}
        <div id="political" className="space-y-3 bg-[#121418] p-6 rounded border border-[#2A2D36]">
          <h3 className="font-serif text-2xl text-[#C85A17]">03 / POLITICAL SYSTEMS & GOVERNANCE</h3>
          <p className="text-sm text-[#E8E3D9]/90 leading-relaxed">{community.sections.politicalSystems}</p>
        </div>

        {/* 07 Art & Tech */}
        <div id="art" className="space-y-3 bg-[#121418] p-6 rounded border border-[#2A2D36]">
          <h3 className="font-serif text-2xl text-[#C85A17]">07 / ART & METALLURGICAL TECHNOLOGY</h3>
          <p className="text-sm text-[#E8E3D9]/90 leading-relaxed">{community.sections.artAndTechnology}</p>
        </div>

        {/* Sources & Evidence */}
        <div id="sources" className="space-y-4 bg-[#181A20] p-6 rounded border border-[#2A2D36]">
          <div className="flex items-center space-x-2 text-[#C85A17]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-serif text-2xl text-[#E8E3D9]">16 / SOURCES & PROVENANCE</h3>
          </div>

          <div className="space-y-3">
            {linkedSources.map((src) => (
              <div key={src.id} className="bg-[#121418] p-4 rounded border border-[#2A2D36] text-xs text-[#9CA3AF] space-y-1">
                <p className="text-sm text-[#E8E3D9] font-serif">{src.title}</p>
                <p>Author: {src.author} ({src.publicationDate})</p>
                <p className="text-[10px] text-[#C85A17]">Source Type: {src.sourceType} • Confidence: {src.confidence}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
