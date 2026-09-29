import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { History, ShieldCheck, ArrowRight, Calendar } from 'lucide-react';

interface EraDetailProps {
  params: Promise<{
    era: string;
  }>;
}

const eraDetails: Record<string, any> = {
  'prehistory-archaeology': {
    title: 'Prehistory & Archaeological Epochs',
    dates: '1500 BCE – 500 CE',
    summary: 'The earliest documented human settlements, iron metallurgy, and artistic traditions in West Africa.',
    overview: 'This era covers the early developments across the Niger-Benue confluence, highlighted by the Nok terracotta tradition, early iron smelting at Taruga, and ancient maritime craft at Dufuna.',
    keyEvents: ['1500 BCE: Early Nok Terracotta Smelting', '800 BCE: Taruga Iron Furnaces', '6500 BCE: Dufuna Canoe Maritime Navigation'],
  },
  'classical-kingdoms': {
    title: 'Classical Empires & Polities',
    dates: '500 CE – 1500 CE',
    summary: 'The emergence of centralized urban statecraft, sacred monarchies, and royal bronze guilds.',
    overview: 'During this period, great urban powers such as Ile-Ife, Kingdom of Benin, Nri Kingdom, and Kanem-Bornu established sophisticated governance systems and monumental art.',
    keyEvents: ['800 CE: Flourishing of Ile-Ife Sacred Center', '900 CE: Igbo-Ukwu Bronze Burial Chambers', '1180 CE: Dynasty Transition in Benin'],
  },
  'precolonial-transformations': {
    title: 'Coastal Trade & Pre-Colonial Era',
    dates: '1500 CE – 1850 CE',
    summary: 'Trans-Saharan trade networks, Atlantic coastal commerce, and 19th-century caliphates.',
    overview: 'This epoch witnessed major geopolitical reorganizations, including the expansion of the Oyo Empire, the founding of the Sokoto Caliphate in 1804, and Oil Rivers commercial city-states.',
    keyEvents: ['1804 CE: Sokoto Jihad led by Usman dan Fodio', '1851 CE: British Bombardment of Lagos'],
  },
};

export async function generateStaticParams() {
  return [
    { era: 'prehistory-archaeology' },
    { era: 'classical-kingdoms' },
    { era: 'precolonial-transformations' },
    { era: 'colonial-conquest-amalgamation' },
    { era: 'independence-civil-war' },
    { era: 'postwar-republics' },
  ];
}

export default async function EraDetailPage({ params }: EraDetailProps) {
  const { era } = await params;
  const detail = eraDetails[era] || {
    title: `Historical Era: ${era.replace(/-/g, ' ').toUpperCase()}`,
    dates: 'Documented Timeline',
    summary: 'Detailed historical documentation and primary sources for this epoch.',
    overview: 'This section contains verified historical records, connected entities, and archival documents.',
    keyEvents: ['Documented Milestones Registered'],
  };

  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <History className="w-3.5 h-3.5" />
            <span>HISTORICAL EPOCH CHAPTER</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED] mb-6">
            {detail.title}
          </h1>

          <div className="flex items-center space-x-2 text-xs font-mono text-[#C2BDAF] mb-6">
            <Calendar className="w-4 h-4 text-[#C85A17]" />
            <span>CHRONOLOGY: {detail.dates}</span>
          </div>

          <p className="text-lg sm:text-xl text-[#C2BDAF] font-light max-w-3xl leading-relaxed">
            {detail.summary}
          </p>
        </div>

        {/* Detailed Narrative */}
        <div className="space-y-8 bg-[#032218] border border-[rgba(247,245,237,0.15)] p-8 sm:p-10">
          <h2 className="font-serif text-3xl text-[#F7F5ED]">Historical Overview</h2>
          <p className="text-base text-[#C2BDAF] font-light leading-relaxed max-w-4xl">
            {detail.overview}
          </p>

          <div className="pt-6 border-t border-[rgba(247,245,237,0.1)] space-y-4">
            <span className="block text-[10px] font-mono text-[#C85A17] uppercase tracking-widest font-bold">
              VERIFIED HISTORICAL MILESTONES
            </span>
            <ul className="space-y-2 font-mono text-xs text-[#C2BDAF]">
              {detail.keyEvents.map((evt: string, i: number) => (
                <li key={i} className="flex items-center space-x-2">
                  <span className="text-[#C85A17] font-bold">•</span>
                  <span>{evt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12">
          <Link
            href="/history"
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#C85A17] hover:underline uppercase tracking-widest"
          >
            <span>← RETURN TO ALL ERAS</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
