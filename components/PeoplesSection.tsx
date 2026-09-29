'use client';

import Link from 'next/link';
import { Users, ArrowRight, Globe, Layers, BookOpen } from 'lucide-react';
import { seedCommunities } from '@/data/seed';

export default function PeoplesSection() {
  return (
    <section id="peoples" className="py-24 bg-[#0A0B0D] text-[#E8E3D9] border-t border-[#2A2D36] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase">
            <Users className="w-3.5 h-3.5" />
            <span>04 / ETHNOGRAPHIC & CULTURAL ANTHOLOGY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#E8E3D9]">
            Peoples & Communities
          </h2>

          <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
            A nuanced exploration of Nigeria&apos;s cultural communities—their origins, statecraft, language families, spiritual worldviews, and artistic heritage.
          </p>
        </div>

        {/* Horizontal/Grid Scroll Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {seedCommunities.map((community) => (
            <div
              key={community.id}
              className="bg-[#121418] hover:bg-[#181A20] border border-[#2A2D36] hover:border-[#C85A17]/60 rounded-lg p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#2A2D36] pb-3">
                  <span className="text-[10px] font-mono text-[#C85A17] tracking-widest uppercase">
                    {community.region}
                  </span>
                  <span className="text-[10px] font-mono text-[#9CA3AF]">
                    {community.languageFamily}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-3xl text-[#E8E3D9] group-hover:text-[#C85A17] transition-colors">
                    {community.name}
                  </h3>
                  {community.alternateNames && (
                    <p className="text-xs text-[#9CA3AF] italic mt-0.5">
                      Also known as: {community.alternateNames.join(', ')}
                    </p>
                  )}
                </div>

                <p className="text-xs text-[#9CA3AF] leading-relaxed line-clamp-4">
                  {community.summary}
                </p>

                <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] text-[#E8E3D9]">
                  {community.languagesSpoken.slice(0, 3).map((lang) => (
                    <span
                      key={lang}
                      className="bg-[#0A0B0D] px-2 py-0.5 rounded border border-[#2A2D36]"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#2A2D36] mt-6 flex items-center justify-between">
                <Link
                  href={`/peoples/${community.id}`}
                  className="text-xs tracking-widest text-[#C85A17] uppercase group-hover:underline flex items-center space-x-1.5"
                >
                  <span>EXPLORE ETHNOGRAPHIC PROFILE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Taxonomy Disclaimer */}
        <div className="bg-[#121418] border border-[#2A2D36] p-4 rounded text-xs text-[#9CA3AF] flex items-center space-x-3">
          <BookOpen className="w-4 h-4 text-[#C85A17] shrink-0" />
          <p>
            <strong className="text-[#E8E3D9]">Taxonomy Policy:</strong> The Living Archive rejects reductionist colonial labels such as &ldquo;tribes&rdquo; in favor of &ldquo;Peoples & Communities&rdquo;, reflecting sophisticated socio-political systems and rich historiography.
          </p>
        </div>

      </div>
    </section>
  );
}
