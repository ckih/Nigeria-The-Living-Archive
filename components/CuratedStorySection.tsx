'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, ChevronRight, BookOpen, Layers } from 'lucide-react';

export default function CuratedStorySection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const storySteps = [
    {
      stepNumber: '01',
      title: 'The Kingdom of Benin',
      period: 'c. 1180 – 1897 CE',
      summary: 'Benin flourishes as a powerful sovereign empire ruled by the Oba, renowned across West Africa and early Europe for statecraft, defensive walls, and sacred courts.',
      entityLink: '/peoples/edo',
      details: 'The Oba relied on specialized court guilds including the Igun Eronmwon (bronze casters) who held divine royal patronage.',
    },
    {
      stepNumber: '02',
      title: 'Royal Court Guilds & Lost-Wax Bronze Metallurgy',
      period: '15th – 17th Century',
      summary: 'Master artisans produce thousands of intricate cast brass relief plaques, head sculptures, and ceremonial insignia recording royal genealogy and military victories.',
      entityLink: '/artefacts/artefact-benin-bronze',
      details: 'Plaques were mounted on wooden pillars throughout the royal palace, serving as a visual historical record of dynastic history.',
    },
    {
      stepNumber: '03',
      title: 'European Contact & Trans-Coastal Commerce',
      period: '1485 – 1800s',
      summary: 'Portuguese, Dutch, and English traders establish diplomatic relations with Benin, exchanging copper manillas, coral, and textiles for pepper and ivory.',
      entityLink: '/events/event-1897-benin-expedition',
      details: 'Despite European contact, Benin strictly regulated foreign access and maintained complete territorial sovereignty until 1897.',
    },
    {
      stepNumber: '04',
      title: 'The 1897 British Invasion & Sack of Benin',
      period: 'February 1897',
      summary: 'Following a fatal dispute with a British delegation, Britain launches a Punitive Expedition. Troops destroy Benin City, exile Oba Ovonramwen, and loot royal treasures.',
      entityLink: '/events/event-1897-benin-expedition',
      details: 'Over 3,000 royal brass, ivory, and wood artefacts were confiscated by the British Admiralty and auctioned to defray expedition costs.',
    },
    {
      stepNumber: '05',
      title: 'Global Dispersal & Modern Restitution Movement',
      period: '1897 – Present',
      summary: 'Benin Bronzes entered over 160 international museums. Today, Nigeria and the Benin Royal Court lead global restitution negotiations for total repatriation.',
      entityLink: '/artefacts/artefact-benin-bronze',
      details: 'Major institutions in Germany, the UK, and the USA have begun legally transferring ownership back to Nigeria.',
    },
  ];

  const currentStep = storySteps[activeStepIndex];

  return (
    <section className="py-24 bg-[#0A0B0D] text-[#E8E3D9] border-t border-[#2A2D36] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>05 / CURATED NARRATIVE JOURNEY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#E8E3D9]">
            Trace A Story: The Benin Bronzes
          </h2>

          <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
            Follow an interconnected historical sequence from 15th-century court production to 1897 colonial looting and 21st-century global restitution.
          </p>
        </div>

        {/* Interactive Stepper Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#121418] border border-[#2A2D36] rounded-lg p-6 sm:p-8 shadow-2xl">

          {/* Stepper Navigation List */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-[10px] tracking-widest text-[#9CA3AF] uppercase mb-4">
              STORY CHAPTERS (CLICK TO ADVANCE)
            </p>

            {storySteps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`w-full text-left p-4 rounded border transition-all duration-300 flex items-start space-x-3 ${
                    isActive
                      ? 'bg-[#181A20] border-[#C85A17] text-[#E8E3D9] shadow-md'
                      : 'bg-[#0A0B0D]/60 border-[#2A2D36] text-[#9CA3AF] hover:bg-[#181A20] hover:text-[#E8E3D9]'
                  }`}
                >
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isActive ? 'bg-[#C85A17] text-[#E8E3D9]' : 'bg-[#2A2D36] text-[#9CA3AF]'
                  }`}>
                    {step.stepNumber}
                  </span>
                  <div>
                    <h4 className="font-serif text-base">{step.title}</h4>
                    <p className="text-[10px] text-[#C85A17] font-mono mt-0.5">{step.period}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Chapter Display Board */}
          <div className="lg:col-span-7 bg-[#181A20] border border-[#2A2D36] rounded p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#2A2D36] pb-3">
                <span className="text-[10px] font-mono text-[#C85A17] tracking-widest uppercase">
                  CHAPTER {currentStep.stepNumber} OF 05
                </span>
                <span className="text-[10px] font-mono text-[#9CA3AF]">{currentStep.period}</span>
              </div>

              <h3 className="font-serif text-3xl text-[#E8E3D9]">
                {currentStep.title}
              </h3>

              <p className="text-sm text-[#E8E3D9]/90 leading-relaxed font-light">
                {currentStep.summary}
              </p>

              <div className="bg-[#121418] p-4 rounded border border-[#2A2D36] text-xs text-[#9CA3AF] space-y-2">
                <p className="text-[10px] text-[#C85A17] font-semibold uppercase tracking-wider">
                  ARCHIVAL CONTEXT & PROVENANCE
                </p>
                <p className="leading-relaxed">{currentStep.details}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A2D36] flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href={currentStep.entityLink}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#C85A17] hover:bg-[#A04000] text-[#E8E3D9] text-xs font-medium tracking-widest uppercase rounded transition-colors flex items-center justify-center space-x-2"
              >
                <span>INSPECT CONNECTED ENTITY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center space-x-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 bg-[#121418] border border-[#2A2D36] rounded text-xs text-[#9CA3AF] hover:text-[#E8E3D9] disabled:opacity-40"
                >
                  PREV
                </button>
                <button
                  disabled={activeStepIndex === storySteps.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(storySteps.length - 1, prev + 1))}
                  className="px-3 py-1.5 bg-[#121418] border border-[#2A2D36] rounded text-xs text-[#9CA3AF] hover:text-[#E8E3D9] disabled:opacity-40"
                >
                  NEXT
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
