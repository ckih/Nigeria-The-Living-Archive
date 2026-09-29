'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Map as MapIcon, Clock, Layers, MapPin, ExternalLink, ShieldCheck, Info } from 'lucide-react';
import { seedPlaces, seedKingdoms } from '@/data/seed';

export default function InteractiveMapSection() {
  const [selectedTimeYear, setSelectedTimeYear] = useState<number>(1800);
  const [activePlaceId, setActivePlaceId] = useState<string>('benin-city');
  const [activeLayer, setActiveLayer] = useState<'all' | 'kingdoms' | 'archaeological' | 'trade'>('all');
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const timelineMilestones = [
    { year: -500, label: '500 BCE (Nok)' },
    { year: 900, label: '900 CE (Igbo-Ukwu)' },
    { year: 1200, label: '1200 CE (Ife)' },
    { year: 1500, label: '1500 CE (Benin/Kanem)' },
    { year: 1800, label: '1800 CE (Oyo/Sokoto)' },
    { year: 1897, label: '1897 CE (Expedition)' },
    { year: 1914, label: '1914 CE (Amalgamation)' },
    { year: 1960, label: '1960 CE (Independence)' },
    { year: 2025, label: 'TODAY' },
  ];

  const activePlace = seedPlaces.find((p) => p.id === activePlaceId) || seedPlaces[0];

  useEffect(() => {
    // Dynamic import of MapLibre GL JS to prevent SSR issues and initialize map canvas
    let mapInstance: any = null;

    async function initMapLibre() {
      if (!mapContainerRef.current) return;

      try {
        const maplibre = await import('maplibre-gl');
        import('maplibre-gl/dist/maplibre-gl.css');

        mapInstance = new maplibre.Map({
          container: mapContainerRef.current,
          style: 'https://demotiles.maplibre.org/style.json', // Open-source MapLibre demo tile server
          center: [8.6753, 9.082], // Nigeria centroid
          zoom: 5.2,
          interactive: true,
          attributionControl: false,
        });

        mapInstance.on('load', () => {
          setMapLoaded(true);

          // Add Markers for places
          seedPlaces.forEach((place) => {
            const el = document.createElement('div');
            el.className = 'maplibre-custom-marker';
            el.style.width = '14px';
            el.style.height = '14px';
            el.style.backgroundColor = '#C85A17';
            el.style.borderRadius = '50%';
            el.style.border = '2px solid #E8E3D9';
            el.style.cursor = 'pointer';

            el.addEventListener('click', () => {
              setActivePlaceId(place.id);
            });

            new maplibre.Marker({ element: el })
              .setLngLat([place.coordinates.lng, place.coordinates.lat])
              .addTo(mapInstance);
          });
        });
      } catch (err) {
        console.warn('MapLibre GL JS initialization fallback to SVG canvas:', err);
      }
    }

    initMapLibre();

    return () => {
      if (mapInstance && typeof mapInstance.remove === 'function') {
        mapInstance.remove();
      }
    };
  }, []);

  return (
    <section id="interactive-map" className="py-24 bg-[#0A0B0D] text-[#E8E3D9] border-t border-[#2A2D36] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C85A17] uppercase">
              <MapIcon className="w-3.5 h-3.5" />
              <span>03 / GEOGRAPHIC HISTORICAL ATLAS (MAPLIBRE GL JS)</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#E8E3D9]">
              Interactive Historical Atlas
            </h2>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Explore how settlements, trade routes, archaeological sites, and kingdoms evolved across the Nigerian landmass over two millennia.
            </p>
          </div>

          {/* Layer Filter Buttons */}
          <div className="flex flex-wrap gap-2 text-xs">
            {(['all', 'kingdoms', 'archaeological', 'trade'] as const).map((layer) => (
              <button
                key={layer}
                onClick={() => setActiveLayer(layer)}
                className={`px-3 py-1.5 rounded border text-[11px] tracking-wider uppercase transition-all ${
                  activeLayer === layer
                    ? 'bg-[#C85A17] text-[#E8E3D9] border-[#C85A17]'
                    : 'bg-[#121418] text-[#9CA3AF] border-[#2A2D36] hover:text-[#E8E3D9]'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>
        </div>

        {/* Main Map Visualization Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#121418] border border-[#2A2D36] rounded-lg p-4 sm:p-6 shadow-2xl relative">

          {/* Map Canvas Representation */}
          <div className="lg:col-span-8 h-[420px] sm:h-[500px] bg-[#0A0B0D] border border-[#2A2D36] rounded relative overflow-hidden flex items-center justify-center archival-grid">

            {/* MapLibre GL JS Container */}
            <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-10 opacity-90" />

            {/* Fallback Nigeria Boundary Contour Canvas/SVG Representation if WebGL map is loading */}
            {!mapLoaded && (
              <svg
                className="absolute inset-0 w-full h-full opacity-30 text-[#2A2D36]"
                viewBox="0 0 800 600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M 200,120 L 350,100 L 520,110 L 680,180 L 720,300 L 650,420 L 550,520 L 400,530 L 280,520 L 180,450 L 120,320 L 150,200 Z" />
                <path d="M 160,280 Q 300,320 400,350 Q 550,380 680,480" stroke="#C85A17" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
                <path d="M 400,350 Q 520,250 650,220" stroke="#C85A17" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
              </svg>
            )}

            {/* Clickable Map Markers (Fallback & Overlay) */}
            {seedPlaces.map((place) => {
              const isSelected = place.id === activePlaceId;

              const topPercent = Math.max(15, Math.min(85, 100 - ((place.coordinates.lat - 4) / 10) * 75 + 10));
              const leftPercent = Math.max(15, Math.min(85, ((place.coordinates.lng - 3) / 11) * 70 + 15));

              return (
                <button
                  key={place.id}
                  onClick={() => setActivePlaceId(place.id)}
                  style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 flex items-center space-x-1.5 p-1 rounded-full transition-all ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-[#C85A17] ring-4 ring-[#C85A17]/30' : 'bg-[#E8E3D9] group-hover:bg-[#C85A17]'
                  }`}>
                    <span className="w-1 h-1 rounded-full bg-[#0A0B0D]" />
                  </span>
                  <span className={`text-[10px] font-serif tracking-wider px-1.5 py-0.5 rounded backdrop-blur-md border ${
                    isSelected
                      ? 'bg-[#0A0B0D]/90 text-[#E8E3D9] border-[#C85A17]'
                      : 'bg-[#0A0B0D]/70 text-[#9CA3AF] border-[#2A2D36] group-hover:text-[#E8E3D9]'
                  }`}>
                    {place.name}
                  </span>
                </button>
              );
            })}

            {/* Map Disclosures Badge */}
            <div className="absolute top-4 left-4 bg-[#0A0B0D]/90 backdrop-blur-md p-2 rounded border border-[#2A2D36] text-[10px] text-[#9CA3AF] flex items-center space-x-2 z-30">
              <Info className="w-3.5 h-3.5 text-[#C85A17]" />
              <span>MapLibre GL JS Atlas • Boundaries represent approximate historical extent.</span>
            </div>
          </div>

          {/* Right Column: Selected Location Detail Card */}
          <div className="lg:col-span-4 bg-[#181A20] border border-[#2A2D36] rounded p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#2A2D36] pb-2">
                <span className="text-[10px] font-mono text-[#C85A17] uppercase tracking-widest">
                  LOCATION INSPECTOR
                </span>
                <span className="text-[10px] font-mono text-[#9CA3AF]">
                  {activePlace.coordinates.lat}° N, {activePlace.coordinates.lng}° E
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-[#E8E3D9]">{activePlace.name}</h3>
                {activePlace.historicalNames && (
                  <p className="text-[11px] text-[#C85A17] italic">
                    Historical Names: {activePlace.historicalNames.join(', ')}
                  </p>
                )}
                <p className="text-[11px] text-[#9CA3AF] mt-0.5">{activePlace.region}</p>
              </div>

              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                {activePlace.summary}
              </p>

              <div className="bg-[#121418] p-3 rounded border border-[#2A2D36] text-[11px] text-[#9CA3AF] space-y-1">
                <p className="text-[10px] text-[#E8E3D9] font-medium uppercase tracking-wider">HISTORICAL SIGNIFICANCE</p>
                <p className="leading-relaxed">{activePlace.historicalSignificance}</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/places/${activePlace.id}`}
                className="w-full py-2.5 bg-[#C85A17] hover:bg-[#A04000] text-[#E8E3D9] text-xs font-medium tracking-widest uppercase rounded transition-colors flex items-center justify-center space-x-2"
              >
                <span>OPEN FULL LOCATION PROFILE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Time Slider Controls */}
        <div className="bg-[#121418] border border-[#2A2D36] p-4 sm:p-6 rounded-lg space-y-4">
          <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#C85A17]" />
              <span className="text-[#E8E3D9] font-medium tracking-widest uppercase">HISTORICAL CHRONOLOGY SLIDER</span>
            </div>
            <span className="font-mono text-sm text-[#C85A17] font-bold">
              {selectedTimeYear < 0 ? `${Math.abs(selectedTimeYear)} BCE` : `${selectedTimeYear} CE`}
            </span>
          </div>

          <input
            type="range"
            min="-500"
            max="2025"
            step="50"
            value={selectedTimeYear}
            onChange={(e) => setSelectedTimeYear(Number(e.target.value))}
            className="w-full accent-[#C85A17] bg-[#2A2D36] h-2 rounded cursor-pointer"
          />

          <div className="flex justify-between text-[10px] font-mono text-[#9CA3AF] overflow-x-auto gap-2">
            {timelineMilestones.map((m) => (
              <button
                key={m.year}
                onClick={() => setSelectedTimeYear(m.year)}
                className={`hover:text-[#C85A17] transition-colors whitespace-nowrap ${
                  selectedTimeYear === m.year ? 'text-[#C85A17] font-bold underline' : ''
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
