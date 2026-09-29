import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedHistorySection from '@/components/RelatedHistorySection';
import { notFound } from 'next/navigation';
import { ShieldCheck, MapPin } from 'lucide-react';
import { seedCommunities, seedSources } from '@/data/seed';

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
    <main className="min-h-screen bg-[#063B2A] text-[#F7F5ED] pt-24">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[rgba(247,245,237,0.15)] relative">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase font-mono font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>PEOPLES & COMMUNITIES DOSSIER • {community.region}</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl text-[#F7F5ED]">
            {community.name}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#C2BDAF] italic font-light">
            &ldquo;{community.summary}&rdquo;
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-[#C2BDAF] pt-2">
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
        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#C2BDAF] bg-[#032218] p-3 border border-[rgba(247,245,237,0.15)]">
          <span className="text-[#C85A17] font-bold uppercase mr-2">DOSSIER INDEX:</span>
          <a href="#overview" className="hover:text-[#F7F5ED]">01 OVERVIEW</a>
          <span>•</span>
          <a href="#origins" className="hover:text-[#F7F5ED]">02 ORIGINS</a>
          <span>•</span>
          <a href="#political" className="hover:text-[#F7F5ED]">03 POLITICAL SYSTEMS</a>
          <span>•</span>
          <a href="#art" className="hover:text-[#F7F5ED]">07 ART & TECH</a>
          <span>•</span>
          <a href="#sources" className="hover:text-[#F7F5ED]">16 SOURCES</a>
        </div>

        {/* 01 Overview */}
        <div id="overview" className="space-y-3 bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)]">
          <h3 className="font-serif text-2xl text-[#C85A17]">01 / OVERVIEW</h3>
          <p className="text-sm text-[#C2BDAF] font-light leading-relaxed">{community.sections.overview}</p>
        </div>

        {/* 02 Origins */}
        <div id="origins" className="space-y-3 bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)]">
          <h3 className="font-serif text-2xl text-[#C85A17]">02 / ORIGINS & EARLY HISTORY</h3>
          <p className="text-sm text-[#C2BDAF] font-light leading-relaxed">{community.sections.origins}</p>
        </div>

        {/* 03 Political Systems */}
        <div id="political" className="space-y-3 bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)]">
          <h3 className="font-serif text-2xl text-[#C85A17]">03 / POLITICAL SYSTEMS & GOVERNANCE</h3>
          <p className="text-sm text-[#C2BDAF] font-light leading-relaxed">{community.sections.politicalSystems}</p>
        </div>

        {/* 07 Art & Tech */}
        <div id="art" className="space-y-3 bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)]">
          <h3 className="font-serif text-2xl text-[#C85A17]">07 / ART & METALLURGICAL TECHNOLOGY</h3>
          <p className="text-sm text-[#C2BDAF] font-light leading-relaxed">{community.sections.artAndTechnology}</p>
        </div>

        {/* Connected Relationships Engine */}
        <RelatedHistorySection entityId={resolvedParams.id} />

        {/* Sources & Evidence */}
        <div id="sources" className="space-y-4 bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)]">
          <div className="flex items-center space-x-2 text-[#C85A17]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-serif text-2xl text-[#F7F5ED]">16 / SOURCES & PROVENANCE</h3>
          </div>

          <div className="space-y-3">
            {linkedSources.map((src) => (
              <div key={src.id} className="bg-[#063B2A] p-4 border border-[rgba(247,245,237,0.1)] text-xs text-[#C2BDAF] space-y-1">
                <p className="text-sm text-[#F7F5ED] font-serif">{src.title}</p>
                <p>Author: {src.author} ({src.publicationDate})</p>
                <p className="text-[10px] text-[#C85A17] font-mono">Source Type: {src.sourceType} • Confidence: {src.confidence}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
