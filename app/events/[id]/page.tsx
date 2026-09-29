import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, MapPin, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
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
    <main className="min-h-screen bg-[#0A0B0D] text-[#E8E3D9] pt-24">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#2A2D36] relative archival-grid">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase">
            <Clock className="w-3.5 h-3.5" />
            <span>HISTORICAL EVENT DOSSIER • {event.dateDisplay}</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl text-[#E8E3D9]">
            {event.title}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#9CA3AF] italic">
            &ldquo;{event.summary}&rdquo;
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-[#9CA3AF] pt-2">
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
        <div className="space-y-3 bg-[#121418] p-6 rounded border border-[#2A2D36]">
          <h3 className="font-serif text-2xl text-[#C85A17]">01 / HISTORICAL CONTEXT & BACKGROUND</h3>
          <p className="text-sm text-[#E8E3D9]/90 leading-relaxed">{event.context}</p>
        </div>

        {/* Consequences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 bg-[#121418] p-6 rounded border border-[#2A2D36]">
            <h4 className="font-serif text-xl text-[#E8E3D9]">IMMEDIATE CONSEQUENCES</h4>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">{event.immediateConsequences}</p>
          </div>

          <div className="space-y-3 bg-[#121418] p-6 rounded border border-[#2A2D36]">
            <h4 className="font-serif text-xl text-[#E8E3D9]">LONG-TERM CONSEQUENCES</h4>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">{event.longTermConsequences}</p>
          </div>
        </div>

        {/* Follow the Story Navigation */}
        <div className="bg-[#181A20] p-6 rounded border border-[#C85A17]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest">
              FOLLOW THE STORY
            </span>
            <h4 className="font-serif text-xl text-[#E8E3D9]">Explore Next Connected Historical Event</h4>
          </div>
          <Link
            href="/timeline"
            className="px-6 py-3 bg-[#C85A17] hover:bg-[#A04000] text-[#E8E3D9] text-xs font-medium tracking-widest uppercase rounded flex items-center space-x-2"
          >
            <span>OPEN TIMELINE STEPPER</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Sources */}
        <div className="space-y-4 bg-[#181A20] p-6 rounded border border-[#2A2D36]">
          <div className="flex items-center space-x-2 text-[#C85A17]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-serif text-2xl text-[#E8E3D9]">PRIMARY & SECONDARY SOURCES</h3>
          </div>

          <div className="space-y-3">
            {linkedSources.map((src) => (
              <div key={src.id} className="bg-[#121418] p-4 rounded border border-[#2A2D36] text-xs text-[#9CA3AF]">
                <p className="text-sm text-[#E8E3D9] font-serif">{src.title}</p>
                <p>Author: {src.author} ({src.publicationDate})</p>
                <p className="text-[10px] text-[#C85A17] mt-1">Source Type: {src.sourceType} • Confidence: {src.confidence}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
