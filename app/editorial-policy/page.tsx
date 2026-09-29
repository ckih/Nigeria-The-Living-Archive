import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ShieldCheck, BookOpen, AlertCircle, Sparkles } from 'lucide-react';

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0A0B0D] text-[#E8E3D9] pt-24 pb-12">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase bg-[#121418] px-3 py-1 rounded border border-[#2A2D36]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL GOVERNANCE & PROVENANCE</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#E8E3D9]">
            Editorial Standards & Policy
          </h1>

          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            How Nigeria — The Living Archive evaluates historical sources, handles disputed claims, maintains cultural respect, and governs artificial intelligence features.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 text-xs text-[#9CA3AF] leading-relaxed">

          <div className="bg-[#121418] p-6 rounded border border-[#2A2D36] space-y-3">
            <h3 className="font-serif text-xl text-[#E8E3D9]">1. Source Hierarchy & Citation Standards</h3>
            <p>
              Every historical record, claims statement, and 3D reconstruction is explicitly linked to one or more primary documents, peer-reviewed academic publications, UNESCO dossiers, or documented oral histories.
            </p>
          </div>

          <div id="contested" className="bg-[#121418] p-6 rounded border border-[#2A2D36] space-y-3">
            <h3 className="font-serif text-xl text-[#E8E3D9]">2. Contested History & Differing Accounts</h3>
            <p>
              Where historical evidence is ambiguous, incomplete, or interpreted differently by different scholarly or community traditions, The Living Archive displays an explicit &ldquo;Accounts Differ&rdquo; panel presenting both perspectives alongside their respective citations.
            </p>
          </div>

          <div className="bg-[#121418] p-6 rounded border border-[#2A2D36] space-y-3">
            <h3 className="font-serif text-xl text-[#E8E3D9]">3. Cultural Sensitivity & Terminology</h3>
            <p>
              The platform rejects reductive colonial classifications (such as &ldquo;tribes&rdquo;) in favor of &ldquo;Peoples & Communities&rdquo;. We respect sacred traditions, royal court protocols, and local naming conventions.
            </p>
          </div>

          <div id="ai" className="bg-[#121418] p-6 rounded border border-[#2A2D36] space-y-3">
            <h3 className="font-serif text-xl text-[#E8E3D9]">4. Artificial Intelligence Principles</h3>
            <p>
              Our AI features (&ldquo;Ask the Archive&rdquo;) operate strictly as retrieval-augmented search interfaces over our verified seed database. The AI is forbidden from functioning as an ungrounded, uncited generative history tool.
            </p>
          </div>

        </div>

      </div>

      <Footer />
    </main>
  );
}
