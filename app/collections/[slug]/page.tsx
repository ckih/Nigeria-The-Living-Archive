import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Layers, ShieldCheck, AlertCircle } from 'lucide-react';

interface CollectionDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

const collectionsDataList = [
  { slug: 'colonial-history-hierarchy', title: 'Colonial History Hierarchy (Lagos Colony, RNC, Protectorates)' },
  { slug: '1914-amalgamation-collection', title: '1914 Amalgamation Major Chapter' },
  { slug: 'nigerian-civil-war-collection', title: 'The Nigerian Civil War (Multi-Part Disputed History)' },
  { slug: 'oil-and-niger-delta-collection', title: 'Oil Discovery, Environment & Niger Delta History' },
  { slug: 'post-independence-republics', title: 'Post-Independence Governance (1960 – Fourth Republic)' },
];

export async function generateStaticParams() {
  return collectionsDataList.map((c) => ({ slug: c.slug }));
}

export default async function CollectionDetailPage({ params }: CollectionDetailProps) {
  const { slug } = await params;
  const match = collectionsDataList.find((c) => c.slug === slug);
  const title = match ? match.title : `Collection: ${slug.replace(/-/g, ' ').toUpperCase()}`;

  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>HISTORICAL EVENT COLLECTION CHAPTERS</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED] mb-6">
            {title}
          </h1>

          <p className="text-sm font-mono text-[#C2BDAF] uppercase tracking-widest">
            COLLECTION STATUS: MULTI-CHAPTER ARCHIVAL CONTAINER (SOURCE_REQUIRED)
          </p>
        </div>

        {/* Chapters & Disputed Account Panel */}
        <div className="space-y-8 bg-[#032218] border border-[rgba(247,245,237,0.15)] p-8 sm:p-10 font-mono text-xs text-[#C2BDAF]">
          <div className="flex items-center space-x-2 text-[#C85A17] font-bold uppercase">
            <AlertCircle className="w-4 h-4" />
            <span>DISPUTED HISTORICAL ACCOUNTS PANEL</span>
          </div>

          <div className="p-4 bg-[#063B2A] border border-[rgba(247,245,237,0.1)] space-y-2">
            <span className="text-[#C85A17] font-bold block">HISTORICAL INTERPRETATION & PERSPECTIVES</span>
            <p className="text-[#C2BDAF] font-sans font-light text-sm leading-relaxed">
              Where reliable historical accounts or primary gazettes differ (such as political casualties or territorial extents), the platform renders separate accounts under a transparent DISPUTED status rather than imposing a single narrative.
            </p>
          </div>

          <div className="border border-dashed border-[rgba(247,245,237,0.2)] p-12 text-center space-y-3">
            <p className="font-serif text-xl text-[#F7F5ED]">Collection chapters loading from primary sources</p>
            <p className="max-w-md mx-auto">
              Ordered chapter structures for this collection are registered under editorial review. Linked documents, maps, and events render automatically upon source verification.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/collections"
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#C85A17] hover:underline uppercase tracking-widest font-bold"
          >
            <span>← RETURN TO ALL COLLECTIONS</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
