'use client';

import { useState } from 'react';
import { Model3D } from '@/types/archive';
import { Box, Sparkles, RotateCw, ZoomIn, Maximize2, ShieldCheck, Info } from 'lucide-react';

interface Artefact3DViewerProps {
  model3D?: Model3D;
  model?: Model3D;
  title?: string;
  material?: string;
  period?: string;
  provenance?: string;
}

export default function Artefact3DViewer({
  model3D,
  model,
  title,
  material,
  period,
  provenance,
}: Artefact3DViewerProps) {
  const activeModel = model3D || model;
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [modelType, setModelType] = useState<Model3D['modelType']>(
    activeModel?.modelType || 'placeholder'
  );

  const activeHotspot = activeModel?.hotspots.find((h) => h.id === activeHotspotId);

  return (
    <div className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 sm:p-8 space-y-6 text-[#F7F5ED]">
      {/* Viewer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(247,245,237,0.1)] pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono text-[#C85A17] uppercase tracking-widest font-bold">
            <Box className="w-3.5 h-3.5" />
            <span>INTERACTIVE 3D ARTEFACT EXHIBITION</span>
          </div>
          <h2 className="font-serif text-2xl text-[#F7F5ED]">
            {activeModel?.title || title || '3D Reconstruction / Model Stage'}
          </h2>
        </div>

        {/* Model Type Selector */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="text-[#C2BDAF]">CLASSIFICATION:</span>
          <select
            value={modelType}
            onChange={(e) => setModelType(e.target.value as any)}
            className="bg-[#063B2A] border border-[rgba(247,245,237,0.2)] px-3 py-1.5 text-xs text-[#F7F5ED] focus:outline-none focus:border-[#C85A17]"
          >
            <option value="scan">Photogrammetry Scan</option>
            <option value="reconstruction">Digital Reconstruction</option>
            <option value="illustration">3D Illustration</option>
            <option value="placeholder">3D Placeholder State</option>
          </select>
        </div>
      </div>

      {/* Main 3D Canvas Stage Container */}
      <div className="relative aspect-square sm:aspect-[16/10] bg-[#063B2A] border border-[rgba(247,245,237,0.15)] flex flex-col items-center justify-center p-8 text-center space-y-6 overflow-hidden">

        {/* Background Radial Glow */}
        <div className="absolute w-64 h-64 rounded-full bg-[#075E45]/40 blur-3xl pointer-events-none" />

        {/* 3D Model Representation Stage */}
        <div className="relative z-10 space-y-4 max-w-md">
          <div className="w-24 h-24 mx-auto rounded-full border-2 border-[#C85A17] flex items-center justify-center bg-[#032218]/80 shadow-2xl animate-pulse">
            <Box className="w-10 h-10 text-[#C85A17]" />
          </div>

          <div>
            <span className="px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] font-mono text-[#C85A17] uppercase tracking-widest font-bold">
              ASSET STATUS: {modelType.toUpperCase()}
            </span>
            <p className="text-xs text-[#C2BDAF] font-mono mt-3 leading-relaxed">
              {activeModel?.provenance || provenance || 'Interactive 3D asset pipeline supporting CC BY photogrammetry scans and digital reconstructions.'}
            </p>
          </div>
        </div>

        {/* Hotspots Control Overlay */}
        {activeModel?.hotspots && activeModel.hotspots.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 bg-[#032218]/90 backdrop-blur-md border border-[rgba(247,245,237,0.15)] p-4 text-left z-20 space-y-3">
            <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest block font-bold">
              ANNOTATED ANATOMY HOTSPOTS (CLICK TO INSPECT)
            </span>
            <div className="flex flex-wrap gap-2">
              {activeModel.hotspots.map((h) => (
                <button
                  key={h.id}
                  onClick={() =>
                    setActiveHotspotId(activeHotspotId === h.id ? null : h.id)
                  }
                  className={`px-3 py-1 text-xs font-mono border transition-all ${
                    activeHotspotId === h.id
                      ? 'bg-[#C85A17] text-[#F7F5ED] border-[#C85A17]'
                      : 'bg-[#063B2A] text-[#C2BDAF] border-[rgba(247,245,237,0.2)] hover:border-[#C85A17]'
                  }`}
                >
                  [{h.title}]
                </button>
              ))}
            </div>

            {/* Active Hotspot Drawer */}
            {activeHotspot && (
              <div className="pt-3 border-t border-[rgba(247,245,237,0.1)] space-y-1">
                <h4 className="font-serif text-base text-[#F7F5ED]">
                  {activeHotspot.title}
                </h4>
                <p className="text-xs text-[#C2BDAF] font-sans font-light leading-relaxed">
                  {activeHotspot.description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* License & Provenance Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-[#C2BDAF] gap-2 pt-2 border-t border-[rgba(247,245,237,0.1)]">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#075E45]" />
          <span>LICENSE: {activeModel?.license || 'CC BY 4.0 Open Cultural Asset'}</span>
        </div>
        <div>
          <span>PROVENANCE: {activeModel?.material || material || 'Brass / Bronze Metallurgy'}</span>
        </div>
      </div>
    </div>
  );
}
