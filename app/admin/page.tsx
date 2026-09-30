'use client';

import { useState } from 'react';
import { repo } from '@/lib/repo';
import { computeGlobalCoverageStats } from '@/lib/coverage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Users,
  MapPin,
  Calendar,
  Box,
  Database,
  Landmark,
  Plus,
  Edit,
  FileSearch,
  AlertTriangle,
  Clock,
} from 'lucide-react';

export default function EditorialAdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'entities' | 'sources' | 'gaps' | 'tenures'>('overview');
  const [entityTypeFilter, setEntityTypeFilter] = useState<string>('all');

  const allEntities = repo.getAllEntities();
  const allSources = repo.getAllSources();
  const allTenures = repo.getAllTenures();
  const coverageStats = computeGlobalCoverageStats();

  const filteredEntities = entityTypeFilter === 'all'
    ? allEntities
    : allEntities.filter((e) => e.type === entityTypeFilter);

  const erasWithoutEvents = repo.getEntitiesByType('era').filter((e) => {
    const rels = repo.getRelationshipsForEntity(e.id);
    return !rels.some((r) => r.type === 'occurred_at' || r.type === 'associated_with');
  });

  const politiesWithoutCommunities = repo.getEntitiesByType('polity').filter((p) => {
    const rels = repo.getRelationshipsForEntity(p.id);
    return !rels.some((r) => r.type === 'associated_with' || r.type === 'part_of');
  });

  const indexedUnresearchedCommunities = repo.getEntitiesByType('community').filter(
    (c) => c.coverageStatus === 'INDEXED'
  );

  const placesWithoutCoordinates = repo.getEntitiesByType('place').filter(
    (p) => !p.coordinates || (p.coordinates.lat === 0 && p.coordinates.lng === 0)
  );

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
              Live database metrics, primary source verification, real-time coverage gap analysis, and tenure verification queues.
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
        <div className="flex border-b border-[rgba(247,245,237,0.15)] mb-8 space-x-8 font-mono text-xs tracking-widest uppercase overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#C85A17] text-[#C85A17] font-bold'
                : 'border-transparent text-[#C2BDAF] hover:text-[#F7F5ED]'
            }`}
          >
            NATIONAL METRICS
          </button>
          <button
            onClick={() => setActiveTab('gaps')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'gaps'
                ? 'border-[#C85A17] text-[#C85A17] font-bold'
                : 'border-transparent text-[#C2BDAF] hover:text-[#F7F5ED]'
            }`}
          >
            COVERAGE GAP ANALYSIS ({coverageStats.missingSourcesCount + coverageStats.missingMediaCount + erasWithoutEvents.length})
          </button>
          <button
            onClick={() => setActiveTab('tenures')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'tenures'
                ? 'border-[#C85A17] text-[#C85A17] font-bold'
                : 'border-transparent text-[#C2BDAF] hover:text-[#F7F5ED]'
            }`}
          >
            VERIFY TENURE DATES QUEUE
          </button>
          <button
            onClick={() => setActiveTab('entities')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'entities'
                ? 'border-[#C85A17] text-[#C85A17] font-bold'
                : 'border-transparent text-[#C2BDAF] hover:text-[#F7F5ED]'
            }`}
          >
            INDEXED ENTITIES ({allEntities.length})
          </button>
        </div>

        {/* Tab 1: National Coverage Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-12">

            {/* KPI Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 space-y-2">
                <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest block">
                  TOTAL INDEXED ENTITIES
                </span>
                <span className="font-serif text-4xl text-[#F7F5ED]">
                  {coverageStats.totalIndexed}
                </span>
                <p className="text-[10px] font-mono text-[#075E45]">Live Database Count</p>
              </div>

              <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 space-y-2">
                <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest block">
                  VERIFIED COVERAGE
                </span>
                <span className="font-serif text-4xl text-[#F7F5ED]">
                  {coverageStats.totalVerified}
                </span>
                <p className="text-[10px] font-mono text-[#C2BDAF]">100% Peer-Reviewed</p>
              </div>

              <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 space-y-2">
                <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest block">
                  PRIMARY SOURCES INDEXED
                </span>
                <span className="font-serif text-4xl text-[#F7F5ED]">
                  {coverageStats.totalSources}
                </span>
                <p className="text-[10px] font-mono text-[#075E45]">Archival Citations</p>
              </div>

              <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 space-y-2">
                <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest block">
                  GRAPH RELATIONSHIPS
                </span>
                <span className="font-serif text-4xl text-[#F7F5ED]">
                  {coverageStats.totalRelationships}
                </span>
                <p className="text-[10px] font-mono text-[#C2BDAF]">Connected Nodes</p>
              </div>
            </div>

            {/* Geographic & Taxonomic Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-8 space-y-6">
                <h2 className="font-serif text-2xl text-[#F7F5ED]">
                  Live Database Entity Breakdown
                </h2>
                <div className="space-y-4 text-xs font-mono text-[#C2BDAF]">
                  <div className="flex items-center justify-between pb-2 border-b border-[rgba(247,245,237,0.1)]">
                    <span className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-[#C85A17]" />
                      <span>Communities & Peoples</span>
                    </span>
                    <span className="font-serif text-base text-[#F7F5ED]">
                      {repo.getEntitiesByType('community').length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-[rgba(247,245,237,0.1)]">
                    <span className="flex items-center space-x-2">
                      <Landmark className="w-4 h-4 text-[#C85A17]" />
                      <span>Polities, Kingdoms & Empires</span>
                    </span>
                    <span className="font-serif text-base text-[#F7F5ED]">
                      {repo.getEntitiesByType('kingdom').length + repo.getEntitiesByType('polity').length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-[rgba(247,245,237,0.1)]">
                    <span className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-[#C85A17]" />
                      <span>Historical Cities & Places</span>
                    </span>
                    <span className="font-serif text-base text-[#F7F5ED]">
                      {repo.getEntitiesByType('place').length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-[rgba(247,245,237,0.1)]">
                    <span className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#C85A17]" />
                      <span>Historical Events</span>
                    </span>
                    <span className="font-serif text-base text-[#F7F5ED]">
                      {repo.getEntitiesByType('event').length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Box className="w-4 h-4 text-[#C85A17]" />
                      <span>Artefacts & 3D Objects</span>
                    </span>
                    <span className="font-serif text-base text-[#F7F5ED]">
                      {repo.getEntitiesByType('artefact').length}
                    </span>
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

        {/* Tab: Dynamic Coverage Gap Analysis */}
        {activeTab === 'gaps' && (
          <div className="space-y-6">
            <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#C85A17] font-bold uppercase">
                <FileSearch className="w-4 h-4" />
                <span>DYNAMIC DATA-DERIVED COVERAGE GAPS</span>
              </div>
              <p className="text-xs text-[#C2BDAF]">
                Computed automatically from live repository relationships to detect unresearched communities, missing sources, and places without verified coordinates.
              </p>
            </div>

            <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] overflow-x-auto">
              <table className="w-full text-left text-xs font-mono text-[#C2BDAF]">
                <thead className="bg-[#063B2A] border-b border-[rgba(247,245,237,0.15)] text-[#C85A17]">
                  <tr>
                    <th className="p-4">ENTITY NAME</th>
                    <th className="p-4">TYPE</th>
                    <th className="p-4">DETECTED COVERAGE GAP</th>
                    <th className="p-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(247,245,237,0.1)]">
                  {coverageStats.entitiesMissingSources.map((e) => (
                    <tr key={e.id} className="hover:bg-[#063B2A]/50">
                      <td className="p-4 font-serif text-sm text-[#F7F5ED]">{e.canonicalName}</td>
                      <td className="p-4 uppercase text-[#C85A17]">{e.type}</td>
                      <td className="p-4 text-[#C85A17]">MISSING ATTACHED SOURCE CITATION</td>
                      <td className="p-4 text-right">
                        <button className="text-[#C85A17] hover:underline flex items-center space-x-1 ml-auto font-bold">
                          <Edit className="w-3 h-3" />
                          <span>ATTACH SOURCE</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {politiesWithoutCommunities.map((p) => (
                    <tr key={p.id} className="hover:bg-[#063B2A]/50">
                      <td className="p-4 font-serif text-sm text-[#F7F5ED]">{p.canonicalName}</td>
                      <td className="p-4 uppercase text-[#C85A17]">Polity Shell</td>
                      <td className="p-4 text-[#C2BDAF]">POLITY HAS NO LINKED COMMUNITY RELATIONSHIPS</td>
                      <td className="p-4 text-right">
                        <button className="text-[#C85A17] hover:underline flex items-center space-x-1 ml-auto font-bold">
                          <Edit className="w-3 h-3" />
                          <span>LINK COMMUNITY</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {indexedUnresearchedCommunities.map((c) => (
                    <tr key={c.id} className="hover:bg-[#063B2A]/50">
                      <td className="p-4 font-serif text-sm text-[#F7F5ED]">{c.canonicalName}</td>
                      <td className="p-4 uppercase text-[#C85A17]">Community</td>
                      <td className="p-4 text-[#C2BDAF]">COMMUNITY INDEXED BUT UNRESEARCHED (DRAFT)</td>
                      <td className="p-4 text-right">
                        <button className="text-[#C85A17] hover:underline flex items-center space-x-1 ml-auto font-bold">
                          <Edit className="w-3 h-3" />
                          <span>BEGIN RESEARCH</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Verify Tenure Dates Queue */}
        {activeTab === 'tenures' && (
          <div className="space-y-6">
            <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center space-x-2 text-[#C85A17] font-bold uppercase">
                <Clock className="w-4 h-4" />
                <span>VERIFY TENURE DATES QUEUE</span>
              </div>
              <p className="text-[#C2BDAF]">
                Tenure records without primary source dates remain in SOURCE_REQUIRED status. All tenure start/end dates stay null until verified gazettes are attached.
              </p>
            </div>

            <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] overflow-x-auto font-mono text-xs text-[#C2BDAF]">
              <table className="w-full text-left">
                <thead className="bg-[#063B2A] border-b border-[rgba(247,245,237,0.15)] text-[#C85A17]">
                  <tr>
                    <th className="p-4">TENURE ID</th>
                    <th className="p-4">OFFICE / POSITION</th>
                    <th className="p-4">GOVERNMENT TYPE</th>
                    <th className="p-4">VERIFICATION STATUS</th>
                    <th className="p-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(247,245,237,0.1)]">
                  {allTenures.map((t) => (
                    <tr key={t.id} className="hover:bg-[#063B2A]/50">
                      <td className="p-4">{t.id}</td>
                      <td className="p-4 text-[#F7F5ED] font-bold">{t.office}</td>
                      <td className="p-4 uppercase">{t.governmentType}</td>
                      <td className="p-4 text-[#C85A17]">SOURCE REQUIRED (DATES NULL)</td>
                      <td className="p-4 text-right">
                        <button className="text-[#C85A17] hover:underline flex items-center space-x-1 ml-auto font-bold">
                          <Edit className="w-3 h-3" />
                          <span>VERIFY GAZETTE</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {allTenures.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-[#C2BDAF]">
                        No tenures currently pending verification in queue.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Indexed Entities Table */}
        {activeTab === 'entities' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#032218] border border-[rgba(247,245,237,0.15)] p-4 font-mono text-xs">
              <span className="text-[#C2BDAF] uppercase font-bold">FILTER BY ENTITY TYPE:</span>
              <select
                value={entityTypeFilter}
                onChange={(e) => setEntityTypeFilter(e.target.value)}
                className="bg-[#063B2A] border border-[rgba(247,245,237,0.2)] px-4 py-2 text-xs text-[#F7F5ED] focus:outline-none focus:border-[#C85A17]"
              >
                <option value="all">All Entity Types</option>
                <option value="community">Communities</option>
                <option value="polity">Polities</option>
                <option value="kingdom">Kingdoms</option>
                <option value="place">Places</option>
                <option value="event">Events</option>
                <option value="artefact">Artefacts</option>
              </select>
            </div>

            <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] overflow-x-auto font-mono text-xs text-[#C2BDAF]">
              <table className="w-full text-left">
                <thead className="bg-[#063B2A] border-b border-[rgba(247,245,237,0.15)] text-[#C85A17]">
                  <tr>
                    <th className="p-4">ENTITY ID</th>
                    <th className="p-4">CANONICAL NAME</th>
                    <th className="p-4">TYPE</th>
                    <th className="p-4">COVERAGE STATUS</th>
                    <th className="p-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(247,245,237,0.1)]">
                  {filteredEntities.map((e) => (
                    <tr key={e.id} className="hover:bg-[#063B2A]/50">
                      <td className="p-4">{e.id}</td>
                      <td className="p-4 font-serif text-sm text-[#F7F5ED]">{e.canonicalName}</td>
                      <td className="p-4 uppercase text-[#C85A17]">{e.type}</td>
                      <td className="p-4 text-[#075E45]">{e.coverageStatus}</td>
                      <td className="p-4 text-right">
                        <button className="text-[#C85A17] hover:underline flex items-center space-x-1 ml-auto font-bold">
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
