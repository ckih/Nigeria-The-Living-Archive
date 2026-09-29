'use client';

import Link from 'next/link';
import { getGroupedRelationshipsForEntity } from '@/lib/relationships';
import { Network, ShieldCheck, ArrowRight } from 'lucide-react';

interface RelatedHistoryProps {
  entityId: string;
}

export default function RelatedHistorySection({ entityId }: RelatedHistoryProps) {
  const grouped = getGroupedRelationshipsForEntity(entityId);

  const categories = [
    { title: 'RELATED COMMUNITIES', items: grouped.communities, hrefPrefix: '/peoples' },
    { title: 'RELATED PLACES', items: grouped.places, hrefPrefix: '/places' },
    { title: 'RELATED EVENTS', items: grouped.events, hrefPrefix: '/events' },
    { title: 'RELATED ARTEFACTS', items: grouped.artefacts, hrefPrefix: '/artefacts' },
  ];

  const hasAnyRelated = categories.some((cat) => cat.items.length > 0);

  if (!hasAnyRelated) {
    return null;
  }

  return (
    <div className="mt-16 pt-12 border-t border-[rgba(247,245,237,0.15)] space-y-8">
      <div className="flex items-center space-x-2 text-xs font-mono text-[#C85A17] uppercase tracking-widest font-bold">
        <Network className="w-4 h-4" />
        <span>KNOWLEDGE GRAPH • CONNECTED HISTORICAL ENTITIES</span>
      </div>

      <h3 className="font-serif text-3xl text-[#F7F5ED]">
        Related History & Knowledge Network
      </h3>

      <div className="space-y-8">
        {categories.map((cat) => {
          if (cat.items.length === 0) return null;

          return (
            <div key={cat.title} className="space-y-4">
              <span className="text-xs font-mono text-[#C85A17] uppercase tracking-wider block font-bold">
                {cat.title} ({cat.items.length})
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((entity) => (
                  <Link
                    key={entity.id}
                    href={`${cat.hrefPrefix}/${entity.id}`}
                    className="bg-[#032218] border border-[rgba(247,245,237,0.15)] hover:border-[#C85A17] p-6 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#C85A17] uppercase tracking-wider mb-2">
                        <span>{entity.type.toUpperCase()}</span>
                        <span className="flex items-center space-x-1 text-[#075E45]">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{entity.coverageStatus}</span>
                        </span>
                      </div>

                      <h4 className="font-serif text-xl text-[#F7F5ED] mb-2">
                        {entity.canonicalName}
                      </h4>

                      <p className="text-xs text-[#C2BDAF] font-light leading-relaxed line-clamp-2">
                        {entity.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[rgba(247,245,237,0.1)] flex items-center justify-between text-[11px] font-mono text-[#C85A17] mt-4">
                      <span className="uppercase">EXPLORE ENTITY</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
