'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Layers, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const collectionsList = [
  { slug: 'colonial-history-hierarchy', title: 'Colonial History Hierarchy (Lagos Colony, RNC, Protectorates)' },
  { slug: '1914-amalgamation-collection', title: '1914 Amalgamation Major Chapter' },
  { slug: 'nigerian-civil-war-collection', title: 'The Nigerian Civil War (Multi-Part Disputed History)' },
  { slug: 'oil-and-niger-delta-collection', title: 'Oil Discovery, Environment & Niger Delta History' },
  { slug: 'post-independence-republics', title: 'Post-Independence Governance (1960 – Fourth Republic)' },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>CHAPTER-BASED HISTORICAL EVENT COLLECTIONS</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED] mb-6">
            Event Collections
          </h1>

          <p className="text-lg sm:text-xl text-[#C2BDAF] font-light max-w-3xl leading-relaxed">
            Explore major multi-part historical collections with ordered chapters, primary documents, map layers, and transparent DISPUTED claim panels where accounts differ.
          </p>
        </div>

        {/* Collections List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collectionsList.map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group bg-[#032218] border border-[rgba(247,245,237,0.15)] hover:border-[#C85A17] p-8 flex flex-col justify-between transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#C85A17] font-bold uppercase">
                  <span>CHAPTER-BASED COLLECTION</span>
                  <span className="flex items-center space-x-1 text-[#075E45]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>STRUCTURED</span>
                  </span>
                </div>

                <h2 className="font-serif text-3xl text-[#F7F5ED] group-hover:text-[#C85A17] transition-colors">
                  {col.title}
                </h2>

                <p className="text-xs text-[#C2BDAF] font-mono italic">
                  Chapters include primary document attachments and disputed account panels.
                </p>
              </div>

              <div className="pt-6 border-t border-[rgba(247,245,237,0.1)] flex items-center justify-between text-xs font-mono text-[#C85A17] font-bold uppercase mt-6">
                <span>EXPLORE COLLECTION CHAPTERS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
