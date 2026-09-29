import Link from 'next/link';
import { ShieldCheck, Compass, BookOpen, Layers } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A0B0D] border-t border-[#2A2D36] text-[#9CA3AF] text-xs pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand & Purpose */}
        <div className="space-y-4 md:col-span-1">
          <div>
            <h3 className="font-serif text-2xl text-[#E8E3D9] tracking-widest">NIGERIA</h3>
            <p className="text-[10px] tracking-[0.25em] text-[#C85A17] uppercase">THE LIVING ARCHIVE</p>
          </div>
          <p className="leading-relaxed text-[#9CA3AF]/90">
            An independent interactive digital museum, historical atlas, and visual encyclopedia exploring the people, places, artefacts, and events that shaped Nigeria.
          </p>
          <div className="text-[10px] font-mono text-[#2A2D36] hover:text-[#9CA3AF] transition-colors">
            ARCHIVAL REF: NGA-DIGITAL-HIST-9024
          </div>
        </div>

        {/* Core Exploration Modes */}
        <div className="space-y-3">
          <p className="text-[10px] tracking-[0.2em] text-[#E8E3D9] uppercase font-semibold flex items-center space-x-1.5">
            <Compass className="w-3.5 h-3.5 text-[#C85A17]" />
            <span>EXPLORATION MODES</span>
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/map" className="hover:text-[#C85A17] transition-colors">Geographic Historical Atlas</Link>
            </li>
            <li>
              <Link href="/timeline" className="hover:text-[#C85A17] transition-colors">Chronological Interactive Timeline</Link>
            </li>
            <li>
              <Link href="/graph" className="hover:text-[#C85A17] transition-colors">Knowledge Relationship Network</Link>
            </li>
            <li>
              <Link href="/peoples/edo" className="hover:text-[#C85A17] transition-colors">Peoples & Communities Profile</Link>
            </li>
            <li>
              <Link href="/artefacts/artefact-benin-bronze" className="hover:text-[#C85A17] transition-colors">3D Artefact Viewer</Link>
            </li>
          </ul>
        </div>

        {/* Governance & Policy */}
        <div className="space-y-3">
          <p className="text-[10px] tracking-[0.2em] text-[#E8E3D9] uppercase font-semibold flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#C85A17]" />
            <span>GOVERNANCE & SOURCES</span>
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-[#C85A17] transition-colors">About The Living Archive</Link>
            </li>
            <li>
              <Link href="/editorial-policy" className="hover:text-[#C85A17] transition-colors">Editorial & Provenance Standards</Link>
            </li>
            <li>
              <Link href="/editorial-policy#contested" className="hover:text-[#C85A17] transition-colors">Contested History Policy</Link>
            </li>
            <li>
              <Link href="/editorial-policy#ai" className="hover:text-[#C85A17] transition-colors">Grounded AI Retrieval Principles</Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-[#C85A17] transition-colors">Editorial CMS Prototype</Link>
            </li>
          </ul>
        </div>

        {/* Provenance Notice */}
        <div className="space-y-3 bg-[#121418] p-4 rounded border border-[#2A2D36]/80">
          <p className="text-[10px] tracking-[0.2em] text-[#C85A17] uppercase font-semibold flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C85A17]" />
            <span>PROVENANCE DISCLOSURE</span>
          </p>
          <p className="text-[11px] leading-relaxed text-[#9CA3AF]">
            Every historical record, claims statement, and 3D model is linked to primary, academic, or oral sources. Historical boundary representations are approximate.
          </p>
          <div className="pt-1">
            <Link
              href="/ask"
              className="inline-block text-[10px] tracking-widest uppercase bg-[#C85A17]/20 text-[#C85A17] px-2.5 py-1 rounded border border-[#C85A17]/40 hover:bg-[#C85A17] hover:text-[#0A0B0D] transition-colors"
            >
              QUERY DATASET (AI)
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#2A2D36]/60 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#9CA3AF]/70 space-y-2 sm:space-y-0">
        <p>© {new Date().getFullYear()} Nigeria — The Living Archive. All Rights Reserved.</p>
        <p className="flex items-center space-x-2">
          <span>Built with Next.js, Three.js & MapLibre</span>
          <span>•</span>
          <span className="text-[#C85A17]">Digital Cultural Institution</span>
        </p>
      </div>
    </footer>
  );
}
