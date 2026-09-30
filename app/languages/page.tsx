'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, Globe, ShieldCheck, MapPin, Users, BookOpen } from 'lucide-react';
import { Language } from '@/types/archive';

const seedLanguagesList: Language[] = [
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
    approximateSpeakersDisplay: '45,000,000+ (Cited: National Library of Nigeria)',
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
    approximateSpeakersDisplay: '30,000,000+ (Cited: National Library of Nigeria)',
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
    approximateSpeakersDisplay: '70,000,000+ (Cited: National Library of Nigeria)',
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
    approximateSpeakersDisplay: '2,000,000+ (Cited: National Library of Nigeria)',
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

export default function LanguagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');

  const filteredLanguages = seedLanguagesList.filter((lang) => {
    const matchesSearch =
      lang.canonicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lang.endonym && lang.endonym.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lang.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFamily = selectedFamily === 'all' || lang.family === selectedFamily;

    return matchesSearch && matchesFamily;
  });

  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>LINGUISTIC ATLAS & ARCHIVE (CITATIONS: NLN.GOV.NG)</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED] mb-6">
            Languages of Nigeria
          </h1>

          <p className="text-lg sm:text-xl text-[#C2BDAF] font-light max-w-3xl leading-relaxed">
            Explore Nigeria’s indigenous languages, writing systems, orthographies, and dialects with cited speaker data from the National Library of Nigeria.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 mb-12 space-y-6 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C2BDAF]" />
              <input
                type="text"
                placeholder="Search language by name, endonym, or summary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#063B2A] border border-[rgba(247,245,237,0.2)] pl-11 pr-4 py-3 text-sm text-[#F7F5ED] placeholder-[#C2BDAF]/60 focus:outline-none focus:border-[#C85A17]"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={selectedFamily}
                onChange={(e) => setSelectedFamily(e.target.value)}
                className="w-full bg-[#063B2A] border border-[rgba(247,245,237,0.2)] px-4 py-3 text-sm text-[#F7F5ED] focus:outline-none focus:border-[#C85A17]"
              >
                <option value="all">All Language Families</option>
                <option value="Niger-Congo">Niger-Congo</option>
                <option value="Afroasiatic">Afroasiatic</option>
                <option value="Nilo-Saharan">Nilo-Saharan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredLanguages.map((lang) => (
            <Link
              key={lang.id}
              href={`/languages/${lang.id}`}
              className="group bg-[#032218] border border-[rgba(247,245,237,0.15)] hover:border-[#C85A17] p-8 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#C85A17] mb-3 uppercase tracking-wider font-bold">
                  <span>{lang.family}</span>
                  <span className="flex items-center space-x-1 text-[#075E45]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>STATUS: {lang.languageStatus}</span>
                  </span>
                </div>

                <div className="flex items-baseline space-x-3 mb-2">
                  <h2 className="font-serif text-3xl font-normal text-[#F7F5ED] group-hover:text-[#C85A17] transition-colors">
                    {lang.name}
                  </h2>
                  {lang.endonym && (
                    <span className="font-serif italic text-lg text-[#C85A17]">
                      ({lang.endonym})
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#C2BDAF] font-light leading-relaxed mb-6">
                  {lang.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-[rgba(247,245,237,0.1)] space-y-2 text-xs font-mono text-[#C2BDAF]">
                <div className="flex items-center space-x-2">
                  <Users className="w-3.5 h-3.5 text-[#C85A17]" />
                  <span>Estimated Speakers: {lang.approximateSpeakersDisplay}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C85A17]" />
                  <span className="truncate">States Spoken: {lang.statesSpoken.join(', ')}</span>
                </div>

                {lang.writingSystems && (
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#C85A17]" />
                    <span>Scripts: {lang.writingSystems.join(', ')}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
