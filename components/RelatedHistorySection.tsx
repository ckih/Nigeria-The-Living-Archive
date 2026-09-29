'use client';

import Link from 'next/link';
import { getRelatedEntities } from '@/lib/relationships';
import { Network, ShieldCheck, ArrowRight } from 'lucide-react';

interface RelatedHistoryProps {
  entityId: string;
}

export default function RelatedHistorySection({ entityId }: RelatedHistoryProps) {
  const related = getRelatedEntities(entityId);

  if (!related || related.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-12 border-t border-[rgba(247,245,237,0.15)] space-y-8">
      <div className="flex items-center space-x-2 text-xs font-mono text-[#C85A17] uppercase tracking-widest font-bold">
        <Network className="w-4 h-4" />
        <span>KNOWLEDGE GRAPH • CONNECTED HISTORICAL ENTITIES</span>
      </div>

      <h3 className="font-serif text-3xl text-[#F7F5ED]">
        Related History & Connections
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((item) => (
          <div
            key={item.entity.id}
            className="bg-[#032218] border border-[rgba(247,245,237,0.15)] p-6 space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#C85A17] uppercase tracking-wider mb-2">
                <span>{item.relationshipType.replace(/_/g, ' ')}</span>
                <span className="flex items-center space-x-1 text-[#075E45]">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{item.certaintyStatus}</span>
                </span>
              </div>

              <h4 className="font-serif text-xl text-[#F7F5ED] mb-2">
                {item.entity.canonicalName}
              </h4>

              <p className="text-xs text-[#C2BDAF] font-light leading-relaxed">
                {item.relationshipDescription}
              </p>
            </div>

            <div className="pt-4 border-t border-[rgba(247,245,237,0.1)] flex items-center justify-between text-[11px] font-mono text-[#C85A17]">
              <span className="uppercase">EXPLORE ENTITY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
