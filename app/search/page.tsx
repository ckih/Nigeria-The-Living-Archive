'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalSearchModal from '@/components/GlobalSearchModal';

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#0A0B0D] text-[#E8E3D9] pt-24 pb-12">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <GlobalSearchModal isOpen={true} onClose={() => {}} />
      </div>
      <Footer />
    </main>
  );
}
