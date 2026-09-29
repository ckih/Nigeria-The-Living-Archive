import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Artefact3DViewer from '@/components/Artefact3DViewer';
import RelatedHistorySection from '@/components/RelatedHistorySection';
import { notFound } from 'next/navigation';
import { ShieldCheck, Layers } from 'lucide-react';
import { seedArtefacts, seedSources } from '@/data/seed';

export async function generateStaticParams() {
  return seedArtefacts.map((a) => ({ id: a.id }));
}

export default async function ArtefactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const artefact = seedArtefacts.find((a) => a.id === resolvedParams.id);

  if (!artefact) {
    notFound();
  }

  const linkedSources = seedSources.filter((s) => artefact.sourceIds.includes(s.id));

  return (
    <main className="min-h-screen bg-[#063B2A] text-[#F7F5ED] pt-24">
      <Header />

      {/* Hero Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-[rgba(247,245,237,0.15)] relative">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase font-mono font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>3D ARTEFACT DOSSIER • {artefact.period}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#F7F5ED]">
            {artefact.title}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#C2BDAF] italic font-light">
            &ldquo;{artefact.summary}&rdquo;
          </p>
        </div>
      </section>

      {/* 3D Viewer Experience */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <Artefact3DViewer
          model3D={artefact.model3D}
          title={artefact.title}
          material={artefact.material}
          period={artefact.period}
          provenance={artefact.provenanceHistory}
        />
      </section>

      {/* Historical Context & Sources */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">

        {/* Context */}
        <div className="space-y-3 bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)]">
          <h3 className="font-serif text-2xl text-[#C85A17]">01 / HISTORICAL CONTEXT & COURT USE</h3>
          <p className="text-sm text-[#C2BDAF] font-light leading-relaxed">{artefact.context}</p>
        </div>

        {/* Provenance */}
        <div className="space-y-3 bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)]">
          <h3 className="font-serif text-2xl text-[#C85A17]">02 / PROVENANCE & COLLECTION HISTORY</h3>
          <p className="text-sm text-[#C2BDAF] font-light leading-relaxed">{artefact.provenanceHistory}</p>
        </div>

        {/* Connected Relationships Engine */}
        <RelatedHistorySection entityId={resolvedParams.id} />

        {/* Sources */}
        <div className="space-y-4 bg-[#032218] p-6 border border-[rgba(247,245,237,0.15)]">
          <div className="flex items-center space-x-2 text-[#C85A17]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-serif text-2xl text-[#F7F5ED]">SOURCES & CITATIONS</h3>
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
