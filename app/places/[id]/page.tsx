import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedHistorySection from '@/components/RelatedHistorySection';
import { notFound } from 'next/navigation';
import { MapPin, ShieldCheck, ArrowLeftRight } from 'lucide-react';
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
    <main className="min-h-screen bg-[#063B2A] text-[#F7F5ED] pt-24">
      <Header />

      {/* Hero Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-[rgba(247,245,237,0.15)] relative">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase font-mono font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>HISTORICAL PLACE DOSSIER • {place.region}</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl text-[#F7F5ED]">
            {place.name}
          </h1>

          {place.historicalNames && (
            <p className="text-xs font-mono text-[#C85A17] italic">
              Historical Names: {place.historicalNames.join(', ')}
            </p>
          )}

          <p className="font-serif text-xl sm:text-2xl text-[#C2BDAF] italic font-light">
            &ldquo;{place.summary}&rdquo;
          </p>

          {place.coordinates && (
            <p className="text-xs font-mono text-[#C2BDAF]">
              Coordinates: {place.coordinates.lat}° N, {place.coordinates.lng}° E
            </p>
          )}
        </div>
      </section>

      {/* Structured Sections */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">

        {/* Significance */}
        <div className="space-y-3 bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)]">
          <h3 className="font-serif text-2xl text-[#C85A17]">01 / HISTORICAL SIGNIFICANCE</h3>
          <p className="text-sm text-[#C2BDAF] font-light leading-relaxed">{place.historicalSignificance}</p>
        </div>

        {/* Then & Now Comparison */}
        {place.thenNowData && (
          <div className="space-y-4 bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)]">
            <h3 className="font-serif text-2xl text-[#C85A17] flex items-center space-x-2">
              <ArrowLeftRight className="w-5 h-5" />
              <span>02 / THEN & NOW COMPARISON</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-[#063B2A] p-4 border border-[rgba(247,245,237,0.1)]">
                <span className="text-[10px] font-mono text-[#C85A17] uppercase font-bold">HISTORICAL STATE</span>
                <h4 className="font-serif text-xl text-[#F7F5ED] mt-1">{place.thenNowData.thenTitle}</h4>
                <p className="text-xs text-[#C2BDAF] font-light mt-2 leading-relaxed">{place.thenNowData.thenDescription}</p>
              </div>

              <div className="bg-[#063B2A] p-4 border border-[rgba(247,245,237,0.1)]">
                <span className="text-[10px] font-mono text-[#C85A17] uppercase font-bold">MODERN METROPOLIS</span>
                <h4 className="font-serif text-xl text-[#F7F5ED] mt-1">{place.thenNowData.nowTitle}</h4>
                <p className="text-xs text-[#C2BDAF] font-light mt-2 leading-relaxed">{place.thenNowData.nowDescription}</p>
              </div>
            </div>
          </div>
        )}

        {/* Connected Relationships Engine */}
        <RelatedHistorySection entityId={resolvedParams.id} />

        {/* Sources */}
        <div className="space-y-4 bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)]">
          <div className="flex items-center space-x-2 text-[#C85A17]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-serif text-2xl text-[#F7F5ED]">SOURCES & ARCHIVAL DOCUMENTS</h3>
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
