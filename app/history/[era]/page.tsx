import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { History, ShieldCheck, Calendar, Info } from 'lucide-react';

interface EraDetailProps {
  params: Promise<{
    era: string;
  }>;
}

const specifiedErasList = [
  { slug: 'prehistory', name: 'Prehistory' },
  { slug: 'archaeological-nigeria', name: 'Archaeological Nigeria' },
  { slug: 'early-societies-states', name: 'Early Societies & States' },
  { slug: 'regional-kingdoms-polities', name: 'Regional Kingdoms & Polities' },
  { slug: 'trade-trans-saharan', name: 'Trade & Trans-Saharan Connections' },
  { slug: 'atlantic-slave-trade', name: 'Atlantic Slave Trade' },
  { slug: 'nineteenth-century-transformations', name: '19th-Century Transformations' },
  { slug: 'colonial-conquest', name: 'Colonial Conquest' },
  { slug: 'nineteen-fourteen-amalgamation', name: '1914 Amalgamation' },
  { slug: 'colonial-nigeria', name: 'Colonial Nigeria' },
  { slug: 'nationalism', name: 'Nationalism' },
  { slug: 'independence', name: 'Independence' },
  { slug: 'first-republic', name: 'First Republic' },
  { slug: 'coups-military-rule', name: 'Coups & Military Rule' },
  { slug: 'civil-war', name: 'Civil War' },
  { slug: 'post-war-nigeria', name: 'Post-War Nigeria' },
  { slug: 'oil-state-formation', name: 'Oil & State Formation' },
  { slug: 'second-republic', name: 'Second Republic' },
  { slug: 'later-military-rule', name: 'Later Military Rule' },
  { slug: 'transition-democracy', name: 'Transition to Democracy' },
  { slug: 'fourth-republic', name: 'Fourth Republic' },
  { slug: 'contemporary-nigeria', name: 'Contemporary Nigeria' },
];

export async function generateStaticParams() {
  return specifiedErasList.map((e) => ({ era: e.slug }));
}

export default async function EraDetailPage({ params }: EraDetailProps) {
  const { era } = await params;
  const match = specifiedErasList.find((e) => e.slug === era);
  const title = match ? match.name : `Era: ${era.replace(/-/g, ' ').toUpperCase()}`;

  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <History className="w-3.5 h-3.5" />
            <span>HISTORICAL ERA DOSSIER</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED] mb-6">
            {title}
          </h1>

          <div className="flex items-center space-x-2 text-xs font-mono text-[#C2BDAF] mb-6">
            <Calendar className="w-4 h-4 text-[#C85A17]" />
            <span>START/END DATES: SOURCE REQUIRED (AWAITING VERIFIED CLAIM)</span>
          </div>
        </div>

        {/* Dynamic Connected Records Section with Honest Empty State */}
        <div className="space-y-8 bg-[#032218] border border-[rgba(247,245,237,0.15)] p-8 sm:p-10">
          <div className="flex items-center space-x-2 text-[#C85A17] text-xs font-mono font-bold uppercase">
            <Info className="w-4 h-4" />
            <span>CONNECTED ERA RECORDS</span>
          </div>

          <div className="border border-dashed border-[rgba(247,245,237,0.2)] p-12 text-center space-y-3 font-mono text-xs text-[#C2BDAF]">
            <p className="font-serif text-xl text-[#F7F5ED]">No sourced records yet</p>
            <p className="max-w-md mx-auto">
              This historical era shell is registered in the national archive. Connected events, documents, leaders, and artefacts will render automatically once primary source citations are linked.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12">
          <Link
            href="/history"
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#C85A17] hover:underline uppercase tracking-widest font-bold"
          >
            <span>← RETURN TO ALL ERAS</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
