'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';

const themeShells = [
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

export default function ThemesPage() {
  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>THEMATIC HISTORICAL RESEARCH TOPICS</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED] mb-6">
            Thematic Histories
          </h1>

          <p className="text-lg sm:text-xl text-[#C2BDAF] font-light max-w-3xl leading-relaxed">
            Explore overlapping thematic dimensions of Nigerian history. Thematic shells link dynamically to eras, polities, and primary documents without unverified prose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themeShells.map((theme) => (
            <Link
              key={theme.slug}
              href={`/history/themes/${theme.slug}`}
              className="group bg-[#032218] border border-[rgba(247,245,237,0.15)] hover:border-[#C85A17] p-6 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-wider font-bold block">
                  RESEARCH TOPIC SHELL
                </span>
                <h2 className="font-serif text-2xl text-[#F7F5ED] group-hover:text-[#C85A17] transition-colors">
                  {theme.title}
                </h2>
                <p className="text-xs text-[#C2BDAF] font-mono italic">
                  Awaiting linked primary source claims.
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(247,245,237,0.1)] flex items-center justify-between text-[11px] font-mono text-[#C85A17] uppercase font-bold mt-6">
                <span>EXPLORE THEME</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
