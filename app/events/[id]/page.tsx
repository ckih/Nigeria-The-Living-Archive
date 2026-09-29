import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedHistorySection from '@/components/RelatedHistorySection';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { seedEvents, seedPlaces, seedSources } from '@/data/seed';

export async function generateStaticParams() {
  return seedEvents.map((e) => ({ id: e.id }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const event = seedEvents.find((e) => e.id === resolvedParams.id);

  if (!event) {
    notFound();
  }

  const linkedSources = seedSources.filter((s) => event.sourceIds.includes(s.id));
  const locationPlace = seedPlaces.find((p) => p.id === event.locationPlaceId);

  return (
    <main className="min-h-screen bg-[#063B2A] text-[#F7F5ED] pt-24">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[rgba(247,245,237,0.15)] relative">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase font-mono font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>HISTORICAL EVENT DOSSIER • {event.dateDisplay}</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl text-[#F7F5ED]">
            {event.title}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#C2BDAF] italic font-light">
            &ldquo;{event.summary}&rdquo;
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-[#C2BDAF] pt-2">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-[#C85A17]" />
              <span>Location: {locationPlace?.name || event.locationPlaceId}</span>
            </div>
            <div>
              <span className="text-[#C85A17]">Participants:</span> {event.participants.join(', ')}
            </div>
          </div>
        </div>
      </section>

      {/* Structured Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">

        {/* Context */}
        <div className="space-y-3 bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)]">
          <h3 className="font-serif text-2xl text-[#C85A17]">01 / HISTORICAL CONTEXT & BACKGROUND</h3>
          <p className="text-sm text-[#C2BDAF] font-light leading-relaxed">{event.context}</p>
        </div>

        {/* Consequences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)]">
            <h4 className="font-serif text-xl text-[#F7F5ED]">IMMEDIATE CONSEQUENCES</h4>
            <p className="text-xs text-[#C2BDAF] font-light leading-relaxed">{event.immediateConsequences}</p>
          </div>

          <div className="space-y-3 bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)]">
            <h4 className="font-serif text-xl text-[#F7F5ED]">LONG-TERM CONSEQUENCES</h4>
            <p className="text-xs text-[#C2BDAF] font-light leading-relaxed">{event.longTermConsequences}</p>
          </div>
        </div>

        {/* Follow the Story Navigation */}
        <div className="bg-[#032218] p-6 border border-[#C85A17]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest font-bold">
              FOLLOW THE STORY
            </span>
            <h4 className="font-serif text-xl text-[#F7F5ED]">Explore Next Connected Historical Event</h4>
          </div>
          <Link
            href="/timeline"
            className="px-6 py-3 bg-[#C85A17] hover:bg-[#a64811] text-[#F7F5ED] text-xs font-mono font-bold tracking-widest uppercase flex items-center space-x-2"
          >
            <span>OPEN TIMELINE STEPPER</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Connected Relationships Engine */}
        <RelatedHistorySection entityId={resolvedParams.id} />

        {/* Sources */}
        <div className="space-y-4 bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)]">
          <div className="flex items-center space-x-2 text-[#C85A17]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-serif text-2xl text-[#F7F5ED]">PRIMARY & SECONDARY SOURCES</h3>
          </div>

          <div className="space-y-3">
            {linkedSources.map((src) => (
              <div key={src.id} className="bg-[#063B2A] p-4 border border-[rgba(247,245,237,0.1)] text-xs text-[#C2BDAF]">
                <p className="text-sm text-[#F7F5ED] font-serif">{src.title}</p>
                <p>Author: {src.author} ({src.publicationDate})</p>
                <p className="text-[10px] text-[#C85A17] font-mono mt-1">Source Type: {src.sourceType} • Confidence: {src.confidence}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
