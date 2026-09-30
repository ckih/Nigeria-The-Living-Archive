'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Landmark, Calendar, ShieldCheck, UserCheck } from 'lucide-react';

const colonialAdministrators = [
  { name: 'Frederick Lugard', office: 'Governor-General of Nigeria', era: 'Colonial Administration' },
  { name: 'Hugh Clifford', office: 'Governor of Nigeria', era: 'Colonial Administration' },
  { name: 'Graeme Thomson', office: 'Governor of Nigeria', era: 'Colonial Administration' },
  { name: 'Donald Cameron', office: 'Governor of Nigeria', era: 'Colonial Administration' },
  { name: 'Bernard Bourdillon', office: 'Governor of Nigeria', era: 'Colonial Administration' },
  { name: 'John Shuckburgh', office: 'Colonial Administrator Shell', era: 'Colonial Administration' },
  { name: 'Alan Burns', office: 'Colonial Administrator Shell', era: 'Colonial Administration' },
  { name: 'Arthur Richards', office: 'Governor of Nigeria', era: 'Colonial Administration' },
  { name: 'John Macpherson', office: 'Governor-General of Nigeria', era: 'Colonial Administration' },
  { name: 'James Wilson Robertson', office: 'Governor-General of Nigeria', era: 'Colonial Administration' },
];

const postIndependenceAdministrations = [
  { name: 'Abubakar Tafawa Balewa', office: 'Prime Minister of Nigeria', era: 'First Republic' },
  { name: 'Nnamdi Azikiwe', office: 'President / Governor-General', era: 'First Republic' },
  { name: 'Johnson Aguiyi-Ironsi', office: 'Military Head of State', era: 'Military Governments' },
  { name: 'Yakubu Gowon', office: 'Military Head of State', era: 'Military Governments' },
  { name: 'Murtala Muhammed', office: 'Military Head of State', era: 'Military Governments' },
  { name: 'Olusegun Obasanjo (Military Tenure)', office: 'Military Head of State', era: 'Military Governments' },
  { name: 'Shehu Shagari', office: 'Executive President', era: 'Second Republic' },
  { name: 'Muhammadu Buhari (Military Tenure)', office: 'Military Head of State', era: 'Later Military Governments' },
  { name: 'Ibrahim Babangida', office: 'Military President', era: 'Later Military Governments' },
  { name: 'Ernest Shonekan', office: 'Head of Interim National Government', era: 'Interim Government' },
  { name: 'Sani Abacha', office: 'Military Head of State', era: 'Later Military Governments' },
  { name: 'Abdulsalami Abubakar', office: 'Military Head of State', era: 'Later Military Governments' },
  { name: 'Olusegun Obasanjo (Civilian Tenure)', office: 'Executive President', era: 'Fourth Republic' },
  { name: 'Umaru Musa Yar’Adua', office: 'Executive President', era: 'Fourth Republic' },
  { name: 'Goodluck Jonathan', office: 'Executive President', era: 'Fourth Republic' },
  { name: 'Muhammadu Buhari (Civilian Tenure)', office: 'Executive President', era: 'Fourth Republic' },
  { name: 'Bola Ahmed Tinubu', office: 'Executive President', era: 'Fourth Republic' },
];

export default function LeadersPage() {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  const allLeaders = [
    ...colonialAdministrators,
    ...postIndependenceAdministrations,
  ];

  const filtered = selectedGroup === 'all'
    ? allLeaders
    : allLeaders.filter((l) => l.era === selectedGroup);

  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <Landmark className="w-3.5 h-3.5" />
            <span>TENURE-BASED LEADERSHIP & GOVERNANCE ARCHIVE</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED] mb-6">
            Leaders & Governors
          </h1>

          <p className="text-lg sm:text-xl text-[#C2BDAF] font-light max-w-3xl leading-relaxed">
            Tenure-based leadership modeling. Non-contiguous tenures (e.g. Obasanjo military vs civilian) are tracked as distinct records. All tenure dates remain SOURCE_REQUIRED until verified archival citations are linked.
          </p>
        </div>

        {/* Group Filter */}
        <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 mb-12 font-mono text-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[#C2BDAF] uppercase font-bold">FILTER GOVERNANCE ERA:</span>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="bg-[#063B2A] border border-[rgba(247,245,237,0.2)] px-4 py-2.5 text-xs text-[#F7F5ED] focus:outline-none focus:border-[#C85A17] w-full sm:w-auto"
            >
              <option value="all">All Governance Eras</option>
              <option value="Colonial Administration">Colonial Administration</option>
              <option value="Independence Transition">Independence Transition</option>
              <option value="First Republic">First Republic</option>
              <option value="Military Governments">Military Governments</option>
              <option value="Interim Government">Interim Government</option>
              <option value="Second Republic">Second Republic</option>
              <option value="Later Military Governments">Later Military Governments</option>
              <option value="Fourth Republic">Fourth Republic</option>
            </select>
          </div>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((leader, index) => (
            <div
              key={`${leader.name}-${index}`}
              className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-8 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#C85A17] font-bold uppercase">
                  <span>{leader.era}</span>
                  <span className="text-[#C2BDAF]">SOURCE REQUIRED</span>
                </div>

                <h2 className="font-serif text-2xl text-[#F7F5ED]">
                  {leader.name}
                </h2>

                <p className="text-xs font-mono text-[#C85A17] uppercase tracking-wider">
                  Office: {leader.office}
                </p>

                <div className="p-3 bg-[#063B2A] border border-[rgba(247,245,237,0.1)] text-[11px] font-mono text-[#C2BDAF] space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#C85A17]">
                    <Calendar className="w-3 h-3" />
                    <span>TENURE DATES: AWAITING GAZETTE CITATION</span>
                  </div>
                  <p className="text-[10px] text-[#C2BDAF]/80">
                    Tenure start/end dates stay null until verified primary sources are attached.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[rgba(247,245,237,0.1)] flex items-center justify-between text-xs font-mono text-[#075E45] mt-6">
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>TENURE SHELL REGISTERED</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
