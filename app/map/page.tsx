import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveMapSection from '@/components/InteractiveMapSection';

export default function DedicatedMapPage() {
  return (
    <main className="min-h-screen bg-[#0A0B0D] text-[#E8E3D9] pt-20">
      <Header />
      <div className="py-8">
        <InteractiveMapSection />
      </div>
      <Footer />
    </main>
  );
}
