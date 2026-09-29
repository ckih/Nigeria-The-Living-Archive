'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, ArrowLeftRight, Volume2, Play, Sparkles } from 'lucide-react';
import { seedArtefacts, seedOralHistories, seedVideos, seedPlaces } from '@/data/seed';
import Artefact3DViewer from './Artefact3DViewer';

export default function ArtefactsMediaSection() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  const activeArtefact = seedArtefacts[0];
  const placeThenNow = seedPlaces[0]; // Benin City

  return (
    <section id="artefacts" className="py-24 bg-[#0A0B0D] text-[#E8E3D9] border-t border-[#2A2D36] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* SECTION 6: 3D ARTEFACT GALLERY */}
        <div className="space-y-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>06 / THE OBJECTS THAT TELL THE STORY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#E8E3D9]">
              3D Interactive Artefact Gallery
            </h2>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Examine royal court bronzes, naturalistic copper sculptures, and iron-age terracottas in a dark digital museum stage equipped with annotation hotspots.
            </p>
          </div>

          <Artefact3DViewer
            model={activeArtefact.model3D}
            title={activeArtefact.title}
            material={activeArtefact.material}
            period={activeArtefact.period}
            provenance={activeArtefact.provenanceHistory}
          />
        </div>

        {/* SECTION 7: THEN / NOW MAP COMPARISON SLIDER */}
        <div className="space-y-8 border-t border-[#2A2D36] pt-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>07 / LANDSCAPE TRANSFORMATION</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#E8E3D9]">
              Then & Now Comparison: {placeThenNow.name}
            </h2>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Drag the interactive comparison slider to reveal the urban transformation of pre-colonial capitals into modern metropolitan centers.
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative h-[380px] sm:h-[450px] bg-[#121418] border border-[#2A2D36] rounded-lg overflow-hidden select-none shadow-2xl">

            {/* Left Layer (Then) */}
            <div className="absolute inset-0 bg-[#181A20] flex flex-col justify-between p-8 archival-grid">
              <div>
                <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest">
                  HISTORICAL RECONSTRUCTION
                </span>
                <h3 className="font-serif text-3xl text-[#E8E3D9] mt-1">
                  {placeThenNow.thenNowData?.thenTitle}
                </h3>
                <p className="text-xs text-[#9CA3AF] max-w-md mt-2 leading-relaxed">
                  {placeThenNow.thenNowData?.thenDescription}
                </p>
              </div>
              <div className="text-[10px] font-mono text-[#9CA3AF]">
                PRE-1897 BENIN CITY CITADEL RAMPARTS
              </div>
            </div>

            {/* Right Layer (Now) */}
            <div
              className="absolute inset-y-0 right-0 bg-[#0A0B0D] flex flex-col justify-between p-8 border-l border-[#C85A17] overflow-hidden"
              style={{ width: `${100 - sliderPosition}%` }}
            >
              <div>
                <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest">
                  MODERN METROPOLIS
                </span>
                <h3 className="font-serif text-3xl text-[#E8E3D9] mt-1">
                  {placeThenNow.thenNowData?.nowTitle}
                </h3>
                <p className="text-xs text-[#9CA3AF] max-w-md mt-2 leading-relaxed">
                  {placeThenNow.thenNowData?.nowDescription}
                </p>
              </div>
              <div className="text-[10px] font-mono text-[#9CA3AF]">
                CONTEMPORARY URBAN CORE & RING ROAD
              </div>
            </div>

            {/* Interactive Drag Bar */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />

            {/* Visual Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#C85A17] z-20 pointer-events-none flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-[#C85A17] text-[#E8E3D9] flex items-center justify-center shadow-lg border border-[#E8E3D9]">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 8: ORAL HISTORY & DOCUMENTARY VIDEOS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-[#2A2D36] pt-16">

          {/* Oral Histories */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase">
                <Volume2 className="w-3.5 h-3.5" />
                <span>08 / SPOKEN WORD & TESTIMONIALS</span>
              </div>
              <h3 className="font-serif text-2xl text-[#E8E3D9]">Oral Histories</h3>
            </div>

            <div className="space-y-4">
              {seedOralHistories.map((oh) => {
                const isPlaying = activeAudioId === oh.id;
                return (
                  <div
                    key={oh.id}
                    className="bg-[#121418] border border-[#2A2D36] rounded p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-lg text-[#E8E3D9]">{oh.title}</h4>
                        <p className="text-[10px] font-mono text-[#C85A17]">
                          Speaker: {oh.speaker} • Language: {oh.language}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveAudioId(isPlaying ? null : oh.id)}
                        className="p-3 rounded-full bg-[#C85A17] text-[#E8E3D9] hover:bg-[#A04000] transition-colors"
                      >
                        <Play className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    {/* Waveform Bar Graphic */}
                    <div className="flex items-center space-x-1 h-8 bg-[#0A0B0D] p-2 rounded border border-[#2A2D36]">
                      {oh.waveformPeaks?.map((peak, i) => (
                        <div
                          key={i}
                          style={{ height: `${peak}%` }}
                          className={`w-1 rounded-full transition-all ${
                            isPlaying ? 'bg-[#C85A17] animate-pulse' : 'bg-[#2A2D36]'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="space-y-1 text-xs text-[#9CA3AF] bg-[#0A0B0D] p-3 rounded border border-[#2A2D36]">
                      <p className="text-[10px] text-[#E8E3D9] uppercase font-semibold">
                        ENGLISH TRANSLATION
                      </p>
                      <p className="italic leading-relaxed">&ldquo;{oh.englishTranslation}&rdquo;</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Documentary Videos */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CINEMATIC DOCUMENTARY ARCHIVE</span>
              </div>
              <h3 className="font-serif text-2xl text-[#E8E3D9]">Documentary Films</h3>
            </div>

            <div className="space-y-4">
              {seedVideos.map((v) => (
                <div
                  key={v.id}
                  className="bg-[#121418] border border-[#2A2D36] rounded p-5 flex flex-col justify-between space-y-3 hover:border-[#C85A17]/60 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#C85A17] uppercase">
                        {v.topic} • {v.duration}
                      </span>
                      <h4 className="font-serif text-xl text-[#E8E3D9] group-hover:text-[#C85A17] transition-colors mt-0.5">
                        {v.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-[#9CA3AF]">{v.date}</span>
                  </div>

                  <p className="text-xs text-[#9CA3AF] leading-relaxed">{v.summary}</p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-[#C85A17] uppercase font-mono">
                    <span>Source: {v.source}</span>
                    <span className="group-hover:underline flex items-center space-x-1">
                      <span>Watch Film</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
