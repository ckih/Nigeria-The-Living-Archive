'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Sparkles, ShieldCheck, BookOpen, ExternalLink, Send, Info } from 'lucide-react';
import { seedAskArchive } from '@/data/seed';

export default function AskArchivePage() {
  const [question, setQuestion] = useState('What happened to the Kingdom of Benin in 1897?');
  const [isQuerying, setIsQuerying] = useState(false);
  const [response, setResponse] = useState(seedAskArchive['benin']);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsQuerying(true);

    setTimeout(() => {
      setIsQuerying(false);
      setResponse(seedAskArchive['benin']);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-[#0A0B0D] text-[#E8E3D9] pt-24 pb-12">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase bg-[#121418] px-3 py-1 rounded border border-[#2A2D36]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GROUNDED RETRIEVAL ARCHIVE ASSISTANT</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#E8E3D9]">
            Ask The Archive
          </h1>

          <p className="text-sm text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
            Query our structured knowledge graph. Answers are grounded exclusively on verified academic, primary, and oral sources—never free-form hallucinated facts.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="bg-[#121418] border border-[#2A2D36] rounded-lg p-2 flex items-center space-x-2 shadow-2xl">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question (e.g. What happened to Benin in 1897?)..."
            className="w-full bg-transparent text-[#E8E3D9] placeholder-[#9CA3AF] focus:outline-none px-4 py-3 font-serif text-lg"
          />
          <button
            type="submit"
            disabled={isQuerying}
            className="px-6 py-3 bg-[#C85A17] hover:bg-[#A04000] text-[#E8E3D9] text-xs font-medium tracking-widest uppercase rounded flex items-center space-x-2 transition-colors shrink-0 disabled:opacity-50"
          >
            <span>{isQuerying ? 'RETRIEVING...' : 'QUERY'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Response Area */}
        {response && (
          <div className="bg-[#121418] border border-[#2A2D36] rounded-lg p-6 sm:p-8 space-y-8 shadow-2xl animate-fadeIn">

            {/* Header / Notice */}
            <div className="flex items-center justify-between border-b border-[#2A2D36] pb-4 text-xs">
              <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C85A17]" />
                <span>GROUNDED RETRIEVAL ANSWER (CONFIDENCE: {response.confidence})</span>
              </span>
              <span className="text-[10px] font-mono text-[#9CA3AF] bg-[#181A20] px-2 py-0.5 rounded border border-[#2A2D36]">
                {response.isDemoNotice}
              </span>
            </div>

            {/* Answer Content */}
            <div className="space-y-3">
              <h3 className="font-serif text-2xl text-[#E8E3D9]">{response.question}</h3>
              <p className="text-base text-[#E8E3D9]/90 leading-relaxed font-light">
                {response.answer}
              </p>
            </div>

            {/* Sources Used */}
            <div className="space-y-3 bg-[#181A20] p-5 rounded border border-[#2A2D36]">
              <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>PRIMARY & ACADEMIC SOURCES USED</span>
              </span>

              <div className="space-y-2">
                {response.sourcesUsed.map((src, i) => (
                  <div key={src.id} className="bg-[#121418] p-3 rounded border border-[#2A2D36] text-xs text-[#9CA3AF] flex items-start justify-between">
                    <div>
                      <p className="text-sm text-[#E8E3D9] font-serif">{i + 1}. {src.title}</p>
                      <p className="text-[11px]">Author: {src.author} ({src.publicationDate}) • Publisher: {src.publisher}</p>
                    </div>
                    <span className="text-[9px] font-mono bg-[#2A2D36] px-2 py-0.5 rounded text-[#E8E3D9]">
                      {src.sourceType}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connected Graph Entities */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-[#9CA3AF] uppercase tracking-widest">
                CONNECTED GRAPH ENTITIES
              </span>

              <div className="flex flex-wrap gap-3">
                {response.relatedEntities.map((ent) => (
                  <Link
                    key={ent.id}
                    href={`/${ent.type === 'event' ? 'events' : ent.type === 'artefact' ? 'artefacts' : 'peoples'}/${ent.id}`}
                    className="bg-[#181A20] hover:bg-[#C85A17]/20 text-[#E8E3D9] hover:text-[#C85A17] px-3.5 py-2 rounded border border-[#2A2D36] text-xs flex items-center space-x-2 transition-all"
                  >
                    <span>{ent.title}</span>
                    <ExternalLink className="w-3 h-3 text-[#9CA3AF]" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}
