'use client';

import { useState } from 'react';
import {
  seedCommunities,
  seedKingdoms,
  seedPlaces,
  seedEvents,
  seedArtefacts,
  seedSources,
} from '@/data/seed';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Users,
  MapPin,
  Calendar,
  Box,
  Database,
  Globe,
  Landmark,
  Plus,
  Edit,
  AlertTriangle,
  CheckCircle2,
  FileSearch,
} from 'lucide-react';

export default function EditorialAdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'entities' | 'sources' | 'gaps'>('overview');
  const [entityTypeFilter, setEntityTypeFilter] = useState<string>('all');

  const coverageGaps = [
    { id: 'gap-1', category: 'Peoples & Communities', item: 'Middle Belt / Benue Valley Communities', status: 'RESEARCH_REQUIRED', priority: 'HIGH' },
    { id: 'gap-2', category: '3D Artefact Assets', item: 'Esie Soapstone Monoliths 3D Scans', status: 'MODEL_PENDING', priority: 'MEDIUM' },
    { id: 'gap-3', category: 'Audio / Oral Histories', item: 'Kanuri Elder Oral Genealogies (Yerwa)', status: 'RECORDING_PENDING', priority: 'HIGH' },
    { id: 'gap-4', category: 'Primary Documents', item: '1929 Aba Women’s War Colonial Inquiry Minutes', status: 'TRANSCRIPT_REQUIRED', priority: 'MEDIUM' },
  ];

  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">

        {/* Editorial Top Banner */}
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-3">
              <Database className="w-3.5 h-3.5" />
              <span>EDITORIAL CONTROL & ARCHIVAL CMS</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#F7F5ED]">
              Editorial Dashboard
            </h1>
            <p className="text-sm text-[#C2BDAF] font-light mt-2 max-w-2xl">
              Manage national heritage records, verify primary sources, track coverage gap analysis, and monitor entity relationship graph integrity.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button className="px-5 py-3 bg-[#C85A17] text-[#F7F5ED] font-mono text-xs tracking-widest uppercase font-bold hover:bg-[#a64811] transition-all flex items-center space-x-2 shadow-lg">
              <Plus className="w-4 h-4" />
              <span>CREATE ENTITY</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-[rgba(247,245,237,0.15)] mb-8 space-x-8 font-mono text-xs tracking-widest uppercase">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-[#C85A17] text-[#C85A17] font-bold'
                : 'border-transparent text-[#C2BDAF] hover:text-[#F7F5ED]'
            }`}
          >
            NATIONAL COVERAGE METRICS
          </button>
          <button
            onClick={() => setActiveTab('gaps')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'gaps'
                ? 'border-[#C85A17] text-[#C85A17] font-bold'
                : 'border-transparent text-[#C2BDAF] hover:text-[#F7F5ED]'
            }`}
          >
            COVERAGE GAP ANALYSIS
          </button>
          <button
            onClick={() => setActiveTab('entities')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'entities'
                ? 'border-[#C85A17] text-[#C85A17] font-bold'
                : 'border-transparent text-[#C2BDAF] hover:text-[#F7F5ED]'
            }`}
          >
            INDEXED ENTITIES ({seedCommunities.length + seedKingdoms.length + seedPlaces.length + seedEvents.length + seedArtefacts.length})
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'sources'
                ? 'border-[#C85A17] text-[#C85A17] font-bold'
                : 'border-transparent text-[#C2BDAF] hover:text-[#F7F5ED]'
            }`}
          >
            SOURCES & PROVENANCE ({seedSources.length})
          </button>
        </div>

        {/* Tab 1: National Coverage Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-12">

            {/* KPI Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 space-y-2">
                <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest block">
                  COMMUNITIES REGISTERED
                </span>
                <span className="font-serif text-4xl text-[#F7F5ED]">
                  {seedCommunities.length} / 250
                </span>
                <div className="w-full bg-[#063B2A] h-1.5 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C85A17] h-full"
                    style={{
                      width: `${(seedCommunities.length / 250) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 space-y-2">
                <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest block">
                  KINGDOMS & STATES
                </span>
                <span className="font-serif text-4xl text-[#F7F5ED]">
                  {seedKingdoms.length}
                </span>
                <p className="text-[10px] font-mono text-[#C2BDAF]">Across classical eras</p>
              </div>

              <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 space-y-2">
                <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest block">
                  HISTORICAL CITIES & SITES
                </span>
                <span className="font-serif text-4xl text-[#F7F5ED]">
                  {seedPlaces.length}
                </span>
                <p className="text-[10px] font-mono text-[#075E45]">100% Georeferenced</p>
              </div>

              <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 space-y-2">
                <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest block">
                  PRIMARY SOURCES INDEXED
                </span>
                <span className="font-serif text-4xl text-[#F7F5ED]">
                  {seedSources.length}
                </span>
                <p className="text-[10px] font-mono text-[#C2BDAF]">Peer-reviewed provenance</p>
              </div>
            </div>

            {/* Geographic & Taxonomic Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-8 space-y-6">
                <h2 className="font-serif text-2xl text-[#F7F5ED]">
                  Archive Entity Taxonomy Breakdown
                </h2>
                <div className="space-y-4 text-xs font-mono text-[#C2BDAF]">
                  <div className="flex items-center justify-between pb-2 border-b border-[rgba(247,245,237,0.1)]">
                    <span className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-[#C85A17]" />
                      <span>Peoples & Communities</span>
                    </span>
                    <span className="font-serif text-base text-[#F7F5ED]">{seedCommunities.length}</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-[rgba(247,245,237,0.1)]">
                    <span className="flex items-center space-x-2">
                      <Landmark className="w-4 h-4 text-[#C85A17]" />
                      <span>Kingdoms, Caliphates & States</span>
                    </span>
                    <span className="font-serif text-base text-[#F7F5ED]">{seedKingdoms.length}</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-[rgba(247,245,237,0.1)]">
                    <span className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-[#C85A17]" />
                      <span>Historical Cities & Sites</span>
                    </span>
                    <span className="font-serif text-base text-[#F7F5ED]">{seedPlaces.length}</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-[rgba(247,245,237,0.1)]">
                    <span className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#C85A17]" />
                      <span>Key Historical Events</span>
                    </span>
                    <span className="font-serif text-base text-[#F7F5ED]">{seedEvents.length}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Box className="w-4 h-4 text-[#C85A17]" />
                      <span>Artefacts & 3D Models</span>
                    </span>
                    <span className="font-serif text-base text-[#F7F5ED]">{seedArtefacts.length}</span>
                  </div>
                </div>
              </div>

              {/* Quality & Provenance Policy Status */}
              <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-8 space-y-6">
                <h2 className="font-serif text-2xl text-[#F7F5ED]">
                  Editorial Provenance Standards
                </h2>
                <div className="space-y-4 text-xs font-mono text-[#C2BDAF]">
                  <div className="p-4 bg-[#063B2A] border border-[rgba(247,245,237,0.1)] space-y-1">
                    <span className="text-[#C85A17] font-bold block">100% SOURCED FACTS</span>
                    <p className="text-[#C2BDAF] font-light">
                      Every statement in published entity profiles links directly to primary gazettes, museum archives, or peer-reviewed scholarship.
                    </p>
                  </div>

                  <div className="p-4 bg-[#063B2A] border border-[rgba(247,245,237,0.1)] space-y-1">
                    <span className="text-[#075E45] font-bold block">DISPUTED ACCOUNTS REGISTRY</span>
                    <p className="text-[#C2BDAF] font-light">
                      Contested oral traditions and colonial boundary disputes are marked with transparent &ldquo;Accounts Differ&rdquo; panels rather than forced single narratives.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab: Coverage Gap Analysis */}
        {activeTab === 'gaps' && (
          <div className="space-y-6">
            <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#C85A17] font-bold uppercase">
                <FileSearch className="w-4 h-4" />
                <span>EDITORIAL RESEARCH PRIORITIES & COVERAGE GAPS</span>
              </div>
              <p className="text-xs text-[#C2BDAF]">
                The archive transparently tracks missing primary sources, pending oral history recordings, and unresearched communities to guide institutional research priorities.
              </p>
            </div>

            <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] overflow-x-auto">
              <table className="w-full text-left text-xs font-mono text-[#C2BDAF]">
                <thead className="bg-[#063B2A] border-b border-[rgba(247,245,237,0.15)] text-[#C85A17]">
                  <tr>
                    <th className="p-4">CATEGORY</th>
                    <th className="p-4">COVERAGE GAP ITEM</th>
                    <th className="p-4">REQUIRED ACTION</th>
                    <th className="p-4">PRIORITY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(247,245,237,0.1)]">
                  {coverageGaps.map((gap) => (
                    <tr key={gap.id} className="hover:bg-[#063B2A]/50">
                      <td className="p-4 uppercase text-[#F7F5ED]">{gap.category}</td>
                      <td className="p-4 font-serif text-sm text-[#F7F5ED]">{gap.item}</td>
                      <td className="p-4 text-[#C85A17]">{gap.status.replace(/_/g, ' ')}</td>
                      <td className="p-4 font-bold text-[#075E45]">{gap.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Indexed Entities Table */}
        {activeTab === 'entities' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#032218] border border-[rgba(247,245,237,0.15)] p-4">
              <span className="text-xs font-mono text-[#C2BDAF]">FILTER BY ENTITY TYPE:</span>
              <select
                value={entityTypeFilter}
                onChange={(e) => setEntityTypeFilter(e.target.value)}
                className="bg-[#063B2A] border border-[rgba(247,245,237,0.2)] px-4 py-2 text-xs font-mono text-[#F7F5ED] focus:outline-none focus:border-[#C85A17]"
              >
                <option value="all">All Entity Types</option>
                <option value="community">Communities</option>
                <option value="kingdom">Kingdoms</option>
                <option value="place">Places</option>
                <option value="event">Events</option>
                <option value="artefact">Artefacts</option>
              </select>
            </div>

            <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] overflow-x-auto">
              <table className="w-full text-left text-xs font-mono text-[#C2BDAF]">
                <thead className="bg-[#063B2A] border-b border-[rgba(247,245,237,0.15)] text-[#C85A17]">
                  <tr>
                    <th className="p-4">ENTITY ID</th>
                    <th className="p-4">NAME / TITLE</th>
                    <th className="p-4">TYPE</th>
                    <th className="p-4">PROVENANCE STATUS</th>
                    <th className="p-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(247,245,237,0.1)]">
                  {seedCommunities.map((c) => (
                    <tr key={c.id} className="hover:bg-[#063B2A]/50">
                      <td className="p-4 font-mono text-[#C2BDAF]">{c.id}</td>
                      <td className="p-4 font-serif text-sm text-[#F7F5ED]">{c.canonicalName}</td>
                      <td className="p-4 uppercase text-[#C85A17]">Community</td>
                      <td className="p-4 text-[#075E45]">VERIFIED</td>
                      <td className="p-4 text-right">
                        <button className="text-[#C85A17] hover:underline flex items-center space-x-1 ml-auto">
                          <Edit className="w-3 h-3" />
                          <span>EDIT</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {seedKingdoms.map((k) => (
                    <tr key={k.id} className="hover:bg-[#063B2A]/50">
                      <td className="p-4 font-mono text-[#C2BDAF]">{k.id}</td>
                      <td className="p-4 font-serif text-sm text-[#F7F5ED]">{k.canonicalName}</td>
                      <td className="p-4 uppercase text-[#C85A17]">Kingdom</td>
                      <td className="p-4 text-[#075E45]">VERIFIED</td>
                      <td className="p-4 text-right">
                        <button className="text-[#C85A17] hover:underline flex items-center space-x-1 ml-auto">
                          <Edit className="w-3 h-3" />
                          <span>EDIT</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
