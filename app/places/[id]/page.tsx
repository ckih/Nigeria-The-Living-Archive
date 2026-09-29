import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { MapPin, ShieldCheck, ArrowLeftRight, BookOpen } from 'lucide-react';
import { seedPlaces, seedSources } from '@/data/seed';

export async function generateStaticParams() {
  return seedPlaces.map((p) => ({ id: p.id }));
}

export default async function PlaceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const place = seedPlaces.find((p) => p.id === resolvedParams.id);

  if (!place) {
    notFound();
  }

  const linkedSources = seedSources.filter((s) => place.sourceIds.includes(s.id));

  return (
    <main className="min-h-screen bg-[#0A0B0D] text-[#E8E3D9] pt-24">
      <Header />

      {/* Hero Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-[#2A2D36] relative archival-grid">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>HISTORICAL PLACE DOSSIER • {place.region}</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl text-[#E8E3D9]">
            {place.name}
          </h1>

          {place.historicalNames && (
            <p className="text-xs text-[#C85A17] italic">
              Historical Names: {place.historicalNames.join(', ')}
            </p>
          )}

          <p className="font-serif text-xl sm:text-2xl text-[#9CA3AF] italic">
            &ldquo;{place.summary}&rdquo;
          </p>

          <p className="text-xs font-mono text-[#9CA3AF]">
            Coordinates: {place.coordinates.lat}° N, {place.coordinates.lng}° E
          </p>
        </div>
      </section>

      {/* Structured Sections */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">

        {/* Significance */}
        <div className="space-y-3 bg-[#121418] p-6 rounded border border-[#2A2D36]">
          <h3 className="font-serif text-2xl text-[#C85A17]">01 / HISTORICAL SIGNIFICANCE</h3>
          <p className="text-sm text-[#E8E3D9]/90 leading-relaxed">{place.historicalSignificance}</p>
        </div>

        {/* Then & Now Comparison */}
        {place.thenNowData && (
          <div className="space-y-4 bg-[#121418] p-6 rounded border border-[#2A2D36]">
            <h3 className="font-serif text-2xl text-[#C85A17] flex items-center space-x-2">
              <ArrowLeftRight className="w-5 h-5" />
              <span>02 / THEN & NOW COMPARISON</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-[#181A20] p-4 rounded border border-[#2A2D36]">
                <span className="text-[10px] font-mono text-[#C85A17] uppercase">HISTORICAL STATE</span>
                <h4 className="font-serif text-xl text-[#E8E3D9] mt-1">{place.thenNowData.thenTitle}</h4>
                <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">{place.thenNowData.thenDescription}</p>
              </div>

              <div className="bg-[#181A20] p-4 rounded border border-[#2A2D36]">
                <span className="text-[10px] font-mono text-[#C85A17] uppercase">MODERN METROPOLIS</span>
                <h4 className="font-serif text-xl text-[#E8E3D9] mt-1">{place.thenNowData.nowTitle}</h4>
                <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">{place.thenNowData.nowDescription}</p>
              </div>
            </div>
          </div>
        )}

        {/* Sources */}
        <div className="space-y-4 bg-[#181A20] p-6 rounded border border-[#2A2D36]">
          <div className="flex items-center space-x-2 text-[#C85A17]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-serif text-2xl text-[#E8E3D9]">SOURCES & ARCHIVAL DOCUMENTS</h3>
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
