import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BookOpen, Info } from 'lucide-react';

interface ThemeDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

const themeShellsList = [
  { slug: 'political', title: 'Political History & Statecraft' },
  { slug: 'economic', title: 'Economic Systems & Commerce' },
  { slug: 'trade', title: 'Trade Routes & Markets' },
  { slug: 'religion', title: 'Religion & Cosmology' },
  { slug: 'technology', title: 'Technology & Engineering' },
  { slug: 'metallurgy', title: 'Metallurgy & Bronze Guilds' },
  { slug: 'agriculture', title: 'Agriculture & Land Use' },
  { slug: 'architecture', title: 'Architecture & Urban Fortifications' },
  { slug: 'warfare', title: 'Warfare & Military Strategy' },
  { slug: 'diplomacy', title: 'Diplomacy & Treaties' },
  { slug: 'gender', title: 'Gender & Female Statecraft' },
  { slug: 'education-scholarship', title: 'Education & Indigenous Scholarship' },
  { slug: 'migration', title: 'Migration & Demographic Movements' },
  { slug: 'colonial-administration', title: 'Colonial Administration & Indirect Rule' },
  { slug: 'economic-history', title: 'Economic History (Oil, Palm, Tin, Coal, Banking)' },
  { slug: 'niger-delta', title: 'Niger Delta Cultural & Political History' },
];

export async function generateStaticParams() {
  return themeShellsList.map((t) => ({ slug: t.slug }));
}

export default async function ThemeDetailPage({ params }: ThemeDetailProps) {
  const { slug } = await params;
  const match = themeShellsList.find((t) => t.slug === slug);
  const title = match ? match.title : `Theme: ${slug.replace(/-/g, ' ').toUpperCase()}`;

  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>RESEARCH TOPIC DOSSIER</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED] mb-6">
            {title}
          </h1>

          <p className="text-sm font-mono text-[#C2BDAF] uppercase tracking-widest">
            STATUS: RESEARCH TOPIC SHELL (AWAITING LINKED PRIMARY SOURCE CLAIMS)
          </p>
        </div>

        <div className="space-y-8 bg-[#032218] border border-[rgba(247,245,237,0.15)] p-8 sm:p-10 font-mono text-xs text-[#C2BDAF]">
          <div className="flex items-center space-x-2 text-[#C85A17] font-bold uppercase">
            <Info className="w-4 h-4" />
            <span>THEMATIC ERA RELATIONSHIPS</span>
          </div>

          <div className="border border-dashed border-[rgba(247,245,237,0.2)] p-12 text-center space-y-3">
            <p className="font-serif text-xl text-[#F7F5ED]">No sourced records yet</p>
            <p className="max-w-md mx-auto">
              This thematic research topic shell is registered in the national ontology. Primary source claims, connected polities, and documents will render dynamically once citations are verified.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/history/themes"
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#C85A17] hover:underline uppercase tracking-widest font-bold"
          >
            <span>← RETURN TO ALL THEMES</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
