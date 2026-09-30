import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Pickaxe, Calendar, Info } from 'lucide-react';

export default function PrehistoryPage() {
  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <Pickaxe className="w-3.5 h-3.5" />
            <span>PREHISTORIC ERA DOSSIER</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED] mb-6">
            Prehistory
          </h1>

          <div className="flex items-center space-x-2 text-xs font-mono text-[#C2BDAF] mb-6">
            <Calendar className="w-4 h-4 text-[#C85A17]" />
            <span>CHRONOLOGY: DATES AWAITING ARCHIVAL CLAIM VERIFICATION</span>
          </div>
        </div>

        <div className="space-y-8 bg-[#032218] border border-[rgba(247,245,237,0.15)] p-8 sm:p-10 font-mono text-xs text-[#C2BDAF]">
          <div className="flex items-center space-x-2 text-[#C85A17] font-bold uppercase">
            <Info className="w-4 h-4" />
            <span>PREHISTORIC SITE INDEX</span>
          </div>

          <p className="text-sm font-sans text-[#F7F5ED] font-light leading-relaxed">
            The Prehistory era covers early stone tool technology, Pleistocene hominin habitation sites, and ancient riverine settlement evidence across the Niger and Benue basins.
          </p>

          <div className="border border-dashed border-[rgba(247,245,237,0.2)] p-8 text-center space-y-2">
            <p className="font-serif text-lg text-[#F7F5ED]">No sourced records yet</p>
            <p className="max-w-md mx-auto">
              Prehistoric archaeological claims and radiocarbon dates are registered under review. See the Archaeology Hub for peer-reviewed site reports.
            </p>
          </div>
        </div>

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
