'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Database, Plus, ShieldCheck, Edit3, Trash2, CheckCircle, FileText, Layers } from 'lucide-react';
import { seedCommunities, seedArtefacts, seedSources } from '@/data/seed';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'entities' | 'sources' | 'review'>('entities');

  return (
    <main className="min-h-screen bg-[#0A0B0D] text-[#E8E3D9] pt-24 pb-12">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Dashboard Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2D36] pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase">
              <Database className="w-3.5 h-3.5" />
              <span>EDITORIAL CMS & ARCHIVE CURATION DASHBOARD</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#E8E3D9] mt-1">
              Archive Admin CMS
            </h1>
          </div>

          <button className="px-5 py-2.5 bg-[#C85A17] hover:bg-[#A04000] text-[#E8E3D9] text-xs font-medium tracking-widest uppercase rounded flex items-center space-x-2 transition-colors self-start sm:self-auto">
            <Plus className="w-4 h-4" />
            <span>CREATE NEW ENTITY</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-b border-[#2A2D36]">
          <button
            onClick={() => setActiveTab('entities')}
            className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'entities'
                ? 'border-[#C85A17] text-[#C85A17] font-bold'
                : 'border-transparent text-[#9CA3AF] hover:text-[#E8E3D9]'
            }`}
          >
            ENTITIES (25)
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'sources'
                ? 'border-[#C85A17] text-[#C85A17] font-bold'
                : 'border-transparent text-[#9CA3AF] hover:text-[#E8E3D9]'
            }`}
          >
            SOURCES & PROVENANCE (8)
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'review'
                ? 'border-[#C85A17] text-[#C85A17] font-bold'
                : 'border-transparent text-[#9CA3AF] hover:text-[#E8E3D9]'
            }`}
          >
            REVIEW QUEUE (2)
          </button>
        </div>

        {/* Table View */}
        {activeTab === 'entities' && (
          <div className="bg-[#121418] border border-[#2A2D36] rounded-lg overflow-hidden shadow-2xl">
            <table className="w-full text-left text-xs text-[#9CA3AF]">
              <thead className="bg-[#181A20] text-[10px] font-mono text-[#E8E3D9] uppercase tracking-widest border-b border-[#2A2D36]">
                <tr>
                  <th className="p-4">ENTITY NAME</th>
                  <th className="p-4">TYPE</th>
                  <th className="p-4">REGION / PERIOD</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2D36]">
                {seedCommunities.map((c) => (
                  <tr key={c.id} className="hover:bg-[#181A20] transition-colors">
                    <td className="p-4 font-serif text-sm text-[#E8E3D9]">{c.name}</td>
                    <td className="p-4 font-mono text-[10px] text-[#C85A17]">Community</td>
                    <td className="p-4">{c.region}</td>
                    <td className="p-4">
                      <span className="bg-[#14532D]/40 text-emerald-400 border border-[#14532D] px-2 py-0.5 rounded text-[9px] font-mono uppercase">
                        PUBLISHED & VERIFIED
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button className="p-1 text-[#9CA3AF] hover:text-[#C85A17]">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {seedArtefacts.map((a) => (
                  <tr key={a.id} className="hover:bg-[#181A20] transition-colors">
                    <td className="p-4 font-serif text-sm text-[#E8E3D9]">{a.title}</td>
                    <td className="p-4 font-mono text-[10px] text-[#C85A17]">Artefact (3D)</td>
                    <td className="p-4">{a.period}</td>
                    <td className="p-4">
                      <span className="bg-[#14532D]/40 text-emerald-400 border border-[#14532D] px-2 py-0.5 rounded text-[9px] font-mono uppercase">
                        PUBLISHED & VERIFIED
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button className="p-1 text-[#9CA3AF] hover:text-[#C85A17]">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Sources Tab */}
        {activeTab === 'sources' && (
          <div className="bg-[#121418] border border-[#2A2D36] rounded-lg p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-xl text-[#E8E3D9]">Archival Sources Registry</h3>
            <div className="space-y-3">
              {seedSources.map((src) => (
                <div key={src.id} className="bg-[#181A20] p-4 rounded border border-[#2A2D36] text-xs text-[#9CA3AF] flex items-start justify-between">
                  <div>
                    <h4 className="font-serif text-base text-[#E8E3D9]">{src.title}</h4>
                    <p className="mt-0.5">Author: {src.author} • Publisher: {src.publisher} ({src.publicationDate})</p>
                    <p className="text-[10px] text-[#C85A17] font-mono mt-1">Confidence: {src.confidence}</p>
                  </div>
                  <button className="text-[10px] font-mono text-[#C85A17] hover:underline uppercase">
                    EDIT SOURCE
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review Queue Tab */}
        {activeTab === 'review' && (
          <div className="bg-[#121418] border border-[#2A2D36] rounded-lg p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-xl text-[#E8E3D9]">Editorial Peer Review Queue</h3>
            <div className="bg-[#181A20] p-5 rounded border border-[#C85A17]/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif text-lg text-[#E8E3D9]">Oral Testimony Draft: Sukur Iron Smelters</span>
                <span className="bg-amber-900/40 text-amber-300 border border-amber-700 px-2 py-0.5 rounded text-[9px] font-mono">
                  PENDING PEER REVIEW
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF]">
                Submitted by Guest Community Historian. Awaiting archival validation against UNESCO documentation.
              </p>
              <div className="flex space-x-3 pt-2">
                <button className="px-4 py-1.5 bg-[#C85A17] text-[#E8E3D9] text-[10px] font-mono uppercase rounded">
                  APPROVE & PUBLISH
                </button>
                <button className="px-4 py-1.5 bg-[#121418] border border-[#2A2D36] text-[#9CA3AF] text-[10px] font-mono uppercase rounded">
                  REQUEST REVISION
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}
