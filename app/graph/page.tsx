'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Database, Network, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { seedRelationships, seedCommunities, seedKingdoms, seedPlaces, seedEvents, seedArtefacts } from '@/data/seed';

export default function KnowledgeGraphPage() {
  const [selectedEntityId, setSelectedEntityId] = useState<string>('kingdom-of-benin');

  const nodes = [
    { id: 'kingdom-of-benin', label: 'Kingdom of Benin', type: 'Kingdom', x: 400, y: 250, color: '#C85A17' },
    { id: 'edo', label: 'The Edo People', type: 'Community', x: 220, y: 150, color: '#A04000' },
    { id: 'benin-city', label: 'Benin City', type: 'Place', x: 580, y: 150, color: '#14532D' },
    { id: 'artefact-benin-bronze', label: 'Benin Bronzes', type: 'Artefact', x: 250, y: 380, color: '#B87333' },
    { id: 'event-1897-benin-expedition', label: '1897 Expedition', type: 'Event', x: 550, y: 380, color: '#1F2937' },
    { id: 'kingdom-of-ife', label: 'Kingdom of Ife', type: 'Kingdom', x: 120, y: 260, color: '#C85A17' },
  ];

  const links = [
    { source: 'edo', target: 'kingdom-of-benin', label: 'associated_with' },
    { source: 'kingdom-of-benin', target: 'benin-city', label: 'located_in' },
    { source: 'artefact-benin-bronze', target: 'kingdom-of-benin', label: 'created_by' },
    { source: 'event-1897-benin-expedition', target: 'benin-city', label: 'occurred_at' },
    { source: 'event-1897-benin-expedition', target: 'artefact-benin-bronze', label: 'depicts/looted' },
    { source: 'kingdom-of-ife', target: 'edo', label: 'historical_origin_link' },
  ];

  const activeNode = nodes.find((n) => n.id === selectedEntityId) || nodes[0];
  const connectedLinks = links.filter((l) => l.source === selectedEntityId || l.target === selectedEntityId);

  return (
    <main className="min-h-screen bg-[#0A0B0D] text-[#E8E3D9] pt-24 pb-12">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase">
            <Network className="w-3.5 h-3.5" />
            <span>KNOWLEDGE NETWORK VISUALIZER</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#E8E3D9]">
            Historical Relationship Graph
          </h1>

          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            The Living Archive operates as an interconnected graph rather than isolated articles. Click any node to explore its historical edges.
          </p>
        </div>

        {/* Graph Explorer Canvas & Node Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Interactive SVG Network Canvas */}
          <div className="lg:col-span-8 bg-[#121418] border border-[#2A2D36] rounded-lg p-6 relative h-[500px] flex items-center justify-center overflow-hidden archival-grid shadow-2xl">

            <svg className="w-full h-full" viewBox="0 0 800 500">
              {/* Relationship Edges */}
              {links.map((link, idx) => {
                const sourceNode = nodes.find((n) => n.id === link.source)!;
                const targetNode = nodes.find((n) => n.id === link.target)!;
                const isHighlighted = link.source === selectedEntityId || link.target === selectedEntityId;

                return (
                  <g key={idx}>
                    <line
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isHighlighted ? '#C85A17' : '#2A2D36'}
                      strokeWidth={isHighlighted ? 2.5 : 1.5}
                      strokeDasharray={isHighlighted ? '0' : '4 4'}
                    />
                    {/* Edge Label */}
                    <text
                      x={(sourceNode.x + targetNode.x) / 2}
                      y={(sourceNode.y + targetNode.y) / 2 - 6}
                      fill={isHighlighted ? '#C85A17' : '#9CA3AF'}
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {link.label}
                    </text>
                  </g>
                );
              })}

              {/* Entity Nodes */}
              {nodes.map((node) => {
                const isSelected = node.id === selectedEntityId;
                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedEntityId(node.id)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? 26 : 20}
                      fill={node.color}
                      stroke={isSelected ? '#E8E3D9' : '#0A0B0D'}
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all"
                    />
                    <text
                      x={node.x}
                      y={node.y + 36}
                      fill={isSelected ? '#E8E3D9' : '#9CA3AF'}
                      fontSize="11"
                      fontFamily="serif"
                      textAnchor="middle"
                      className="font-medium"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Controls Badge */}
            <div className="absolute top-4 left-4 bg-[#0A0B0D]/80 backdrop-blur-md p-2 rounded border border-[#2A2D36] text-[10px] text-[#9CA3AF] flex items-center space-x-2">
              <Info className="w-3.5 h-3.5 text-[#C85A17]" />
              <span>Click nodes to expand relationships</span>
            </div>

          </div>

          {/* Node Inspector Panel */}
          <div className="lg:col-span-4 bg-[#181A20] border border-[#2A2D36] rounded-lg p-6 space-y-6">
            <div className="space-y-2 border-b border-[#2A2D36] pb-3">
              <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest">
                NODE INSPECTOR
              </span>
              <h3 className="font-serif text-3xl text-[#E8E3D9]">{activeNode.label}</h3>
              <p className="text-xs font-mono text-[#9CA3AF]">Class: {activeNode.type}</p>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-mono text-[#E8E3D9] uppercase tracking-wider">
                CONNECTED RELATIONSHIPS ({connectedLinks.length})
              </p>

              {connectedLinks.map((link, i) => {
                const otherId = link.source === activeNode.id ? link.target : link.source;
                const otherNode = nodes.find((n) => n.id === otherId)!;
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedEntityId(otherNode.id)}
                    className="p-3 bg-[#121418] rounded border border-[#2A2D36] hover:border-[#C85A17] cursor-pointer transition-all flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="text-[9px] font-mono text-[#C85A17] uppercase block">
                        {link.label}
                      </span>
                      <span className="text-[#E8E3D9] font-serif">{otherNode.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href={`/${activeNode.type === 'Event' ? 'events' : activeNode.type === 'Artefact' ? 'artefacts' : activeNode.type === 'Place' ? 'places' : 'peoples'}/${activeNode.id}`}
                className="w-full py-3 bg-[#C85A17] hover:bg-[#A04000] text-[#E8E3D9] text-xs font-medium tracking-widest uppercase rounded transition-colors flex items-center justify-center space-x-2"
              >
                <span>OPEN ENTITY PROFILE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>

      <Footer />
    </main>
  );
}
