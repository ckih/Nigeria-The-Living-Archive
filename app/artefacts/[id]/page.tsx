import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Artefact3DViewer from '@/components/Artefact3DViewer';
import { notFound } from 'next/navigation';
import { ShieldCheck, Layers, BookOpen } from 'lucide-react';
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
    <main className="min-h-screen bg-[#0A0B0D] text-[#E8E3D9] pt-24">
      <Header />

      {/* Hero Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-[#2A2D36] relative archival-grid">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>3D ARTEFACT DOSSIER • {artefact.period}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#E8E3D9]">
            {artefact.title}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#9CA3AF] italic">
            &ldquo;{artefact.summary}&rdquo;
          </p>
        </div>
      </section>

      {/* 3D Viewer Experience */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <Artefact3DViewer
          model={artefact.model3D}
          title={artefact.title}
          material={artefact.material}
          period={artefact.period}
          provenance={artefact.provenanceHistory}
        />
      </section>

      {/* Historical Context & Sources */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">

        {/* Context */}
        <div className="space-y-3 bg-[#121418] p-6 rounded border border-[#2A2D36]">
          <h3 className="font-serif text-2xl text-[#C85A17]">01 / HISTORICAL CONTEXT & COURT USE</h3>
          <p className="text-sm text-[#E8E3D9]/90 leading-relaxed">{artefact.context}</p>
        </div>

        {/* Provenance */}
        <div className="space-y-3 bg-[#121418] p-6 rounded border border-[#2A2D36]">
          <h3 className="font-serif text-2xl text-[#C85A17]">02 / PROVENANCE & COLLECTION HISTORY</h3>
          <p className="text-sm text-[#E8E3D9]/90 leading-relaxed">{artefact.provenanceHistory}</p>
        </div>

        {/* Sources */}
        <div className="space-y-4 bg-[#181A20] p-6 rounded border border-[#2A2D36]">
          <div className="flex items-center space-x-2 text-[#C85A17]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-serif text-2xl text-[#E8E3D9]">SOURCES & CITATIONS</h3>
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
