import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Globe, Users, BookOpen, MapPin } from 'lucide-react';
import { Language } from '@/types/archive';

const languagesDataList: Language[] = [
  {
    id: 'lang-yoruba',
    type: 'language',
    canonicalName: 'Yoruba Language',
    name: 'Yoruba',
    description: 'A major Yoruboid language within the Niger-Congo family.',
    endonym: 'Èdè Yorùbá',
    family: 'Niger-Congo',
    subfamily: 'Defoid / Yoruboid',
    statesSpoken: ['Lagos', 'Oyo', 'Ogun', 'Osun', 'Ondo', 'Ekiti', 'Kwara', 'Kogi'],
    approximateSpeakersDisplay: '45,000,000+ (Source: National Library of Nigeria)',
    languageStatus: 'VIBRANT',
    dialects: ['Oyọ', 'Ijebu', 'Egba', 'Ondo', 'Ekiti', 'Ijesha', 'Yagba'],
    summary: 'A major Yoruboid language within the Niger-Congo family, featuring tonal pitch and an extensive literary and ceremonial tradition.',
    coverageStatus: 'VERIFIED',
    sourceIds: ['source-johnson-yoruba'],
    relatedEntityIds: ['yoruba', 'place-ife'],
    orthography: 'Standardized Latin orthography established by Bishop Samuel Ajayi Crowther (1840s).',
    writingSystems: ['Latin Script', 'Ajami (Historical)'],
  },
  {
    id: 'lang-igbo',
    type: 'language',
    canonicalName: 'Igbo Language',
    name: 'Igbo',
    description: 'A principal Igboid language with tonal inflections.',
    endonym: 'Asụsụ Igbo',
    family: 'Niger-Congo',
    subfamily: 'Igboid',
    statesSpoken: ['Anambra', 'Enugu', 'Imo', 'Abia', 'Ebonyi', 'Delta', 'Rivers'],
    approximateSpeakersDisplay: '30,000,000+ (Source: National Library of Nigeria)',
    languageStatus: 'VIBRANT',
    dialects: ['Onitsha', 'Owerri', 'Ngwa', 'Afiikpo', 'Akaeze', 'Ika', 'Ukwuani'],
    summary: 'A principal Igboid language with tonal inflections and a rich proverb-based oral and modern literary tradition.',
    coverageStatus: 'VERIFIED',
    sourceIds: ['source-afigbo-igbo'],
    relatedEntityIds: ['igbo', 'place-igbo-ukwu'],
    orthography: 'Onwu Orthography adopted in 1961.',
    writingSystems: ['Latin Script', 'Nsibidi (Historical Pictographic)'],
  },
  {
    id: 'lang-hausa',
    type: 'language',
    canonicalName: 'Hausa Language',
    name: 'Hausa',
    description: 'A major West African Chadic lingua franca.',
    endonym: 'Harshen Hausa',
    family: 'Afroasiatic',
    subfamily: 'Chadic',
    statesSpoken: ['Kano', 'Katsina', 'Sokoto', 'Zamfara', 'Kebbi', 'Jigawa', 'Kaduna'],
    approximateSpeakersDisplay: '70,000,000+ (Source: National Library of Nigeria)',
    languageStatus: 'VIBRANT',
    dialects: ['Kano (Kananci)', 'Katsina', 'Sokoto (Sakkwatanci)', 'Zazzau'],
    summary: 'A major West African Chadic lingua franca written historically in Ajami script and standardized modern Boko Latin script.',
    coverageStatus: 'VERIFIED',
    sourceIds: ['source-last-sokoto'],
    relatedEntityIds: ['hausa', 'place-kano'],
    orthography: 'Boko Latin script standardized in the early 20th century.',
    writingSystems: ['Boko (Latin)', 'Ajami (Arabic Script)'],
  },
  {
    id: 'lang-edo',
    type: 'language',
    canonicalName: 'Edo Language',
    name: 'Edo',
    description: 'The primary Edoid language of the Kingdom of Benin.',
    endonym: 'Èdè Ẹdo',
    family: 'Niger-Congo',
    subfamily: 'Edoid',
    statesSpoken: ['Edo'],
    approximateSpeakersDisplay: '2,000,000+ (Source: National Library of Nigeria)',
    languageStatus: 'DOCUMENTED',
    dialects: ['Central Edo', 'Iyekhee'],
    summary: 'The primary Edoid language of the Kingdom of Benin, preserving specialized royal court terminology and oral histories.',
    coverageStatus: 'VERIFIED',
    sourceIds: ['source-egharevba-benin'],
    relatedEntityIds: ['edo', 'benin-city'],
    orthography: 'Standard Edo orthography.',
    writingSystems: ['Latin Script'],
  },
];

export async function generateStaticParams() {
  return languagesDataList.map((l) => ({ id: l.id }));
}

export default async function LanguageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lang = languagesDataList.find((l) => l.id === id);

  if (!lang) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>LINGUISTIC PROFILE DOSSIER • {lang.family.toUpperCase()}</span>
          </div>

          <div className="flex items-baseline space-x-4 mb-4">
            <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED]">
              {lang.name}
            </h1>
            {lang.endonym && (
              <span className="font-serif italic text-2xl text-[#C85A17]">
                ({lang.endonym})
              </span>
            )}
          </div>

          <p className="text-lg sm:text-xl text-[#C2BDAF] font-light max-w-3xl leading-relaxed">
            {lang.summary}
          </p>
        </div>

        {/* Linguistic Details */}
        <div className="space-y-8 bg-[#032218] border border-[rgba(247,245,237,0.15)] p-8 sm:p-10 font-mono text-xs text-[#C2BDAF]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-[#C85A17] font-bold block uppercase">SPEAKER ESTIMATE & SOURCE</span>
              <p className="text-sm text-[#F7F5ED]">{lang.approximateSpeakersDisplay}</p>
            </div>

            <div className="space-y-2">
              <span className="text-[#C85A17] font-bold block uppercase">ORTHOGRAPHY & WRITING SCRIPTS</span>
              <p className="text-sm text-[#F7F5ED]">{lang.orthography || 'Standard orthography'}</p>
              <p className="text-xs text-[#C2BDAF]">Scripts: {lang.writingSystems?.join(', ')}</p>
            </div>
          </div>

          {lang.dialects && lang.dialects.length > 0 && (
            <div className="pt-6 border-t border-[rgba(247,245,237,0.1)] space-y-2">
              <span className="text-[#C85A17] font-bold block uppercase">DOCUMENTED DIALECT VARIETIES</span>
              <div className="flex flex-wrap gap-2 pt-2">
                {lang.dialects.map((d, i) => (
                  <span key={i} className="bg-[#063B2A] border border-[rgba(247,245,237,0.15)] px-3 py-1 text-[#F7F5ED]">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12">
          <Link
            href="/languages"
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#C85A17] hover:underline uppercase tracking-widest font-bold"
          >
            <span>← RETURN TO ALL LANGUAGES</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
