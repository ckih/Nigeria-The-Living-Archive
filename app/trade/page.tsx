'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Compass, MapPin, ShieldCheck } from 'lucide-react';

const tradeRoutesList = [
  {
    id: 'trans-saharan-kano',
    name: 'Trans-Saharan Kano-Ghadames Route',
    origin: 'Kano (Northern Savannah)',
    destination: 'Ghadames / Tripoli (North Africa)',
    commodities: ['Leather', 'Textiles', 'Indigo Dye', 'Kolanuts', 'Gold'],
    historicalPeriod: 'c. 1100 CE – 19th Century',
    summary: 'Major trans-Saharan caravan artery linking Kano’s textile and leather guilds with Mediterranean trade centers.',
    hasGeometry: true,
    coordinates: [
      [8.592, 12.002],
      [9.5, 18.0],
      [10.2, 30.1],
    ],
  },
  {
    id: 'river-niger-benue',
    type: 'trade_route',
    name: 'Niger-Benue Confluence River Commercial Route',
    origin: 'Lokoja / Onitsha',
    destination: 'Niger Delta Ports',
    commodities: ['Palm Oil', 'Yams', 'Iron Implements', 'Salt'],
    historicalPeriod: 'c. 1400 CE – Present',
    summary: 'Riverine trade highway connecting savannah agricultural producers with forest belt and coastal traders.',
    hasGeometry: false,
  },
];

export default function TradePage() {
  return (
    <div className="min-h-screen bg-[#063B2A] text-[#F7F5ED] flex flex-col selection:bg-[#C85A17] selection:text-[#F7F5ED]">
      <Header />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="border-b border-[rgba(247,245,237,0.15)] pb-12 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#032218] border border-[rgba(247,245,237,0.15)] text-[10px] tracking-widest text-[#C85A17] uppercase font-mono font-bold mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>HISTORICAL TRADE ROUTES & GEOJSON GEOMETRY</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-[#F7F5ED] mb-6">
            Trade Routes
          </h1>

          <p className="text-lg sm:text-xl text-[#C2BDAF] font-light max-w-3xl leading-relaxed">
            Trans-Saharan caravan trails, Niger-Benue river highways, and coastal palm-oil trade routes. GeoJSON map geometry renders strictly where historical coordinates are verified.
          </p>
        </div>

        {/* Trade Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tradeRoutesList.map((route) => (
            <div
              key={route.id}
              className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-8 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#C85A17] uppercase font-bold">
                  <span>{route.historicalPeriod}</span>
                  <span className="text-[#075E45] flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{route.hasGeometry ? 'GEOJSON GEOMETRY' : 'NO INVENTED GEOMETRY'}</span>
                  </span>
                </div>

                <h2 className="font-serif text-3xl text-[#F7F5ED]">{route.name}</h2>

                <p className="text-sm text-[#C2BDAF] font-light leading-relaxed">{route.summary}</p>

                <div className="p-4 bg-[#063B2A] border border-[rgba(247,245,237,0.1)] space-y-2 font-mono text-xs">
                  <div>
                    <span className="text-[#C85A17]">Origin → Destination:</span> {route.origin} → {route.destination}
                  </div>
                  <div>
                    <span className="text-[#C85A17]">Commodities:</span> {route.commodities.join(', ')}
                  </div>
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
