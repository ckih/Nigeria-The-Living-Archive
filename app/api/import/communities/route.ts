import { NextRequest, NextResponse } from 'next/server';
import { repo } from '@/lib/repo';
import { Community } from '@/types/archive';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const items = Array.isArray(data) ? data : [data];

    const importedIds: string[] = [];

    for (const item of items) {
      if (!item.id || !item.name) continue;

      const newCommunity: Community = {
        id: item.id,
        type: 'community',
        canonicalName: item.name,
        name: item.name,
        description: item.summary || 'Imported community record shell.',
        summary: item.summary || 'Imported community record shell awaiting primary source claims.',
        region: item.region || 'Nigeria',
        states: item.states || [],
        coordinates: item.coordinates || { lat: 9.082, lng: 8.675, label: item.name },
        coverageStatus: 'INDEXED',
        status: 'DRAFT',
        sourceIds: item.sourceIds || [],
        relatedEntityIds: item.relatedEntityIds || [],
        languagesSpoken: item.languagesSpoken || [],
        featuredMediaIds: [],
        sections: {
          overview: item.overview || 'Overview pending editorial research.',
          origins: item.origins || 'Origins pending oral tradition verification.',
          politicalSystems: 'Pending editorial research.',
          kingdomsAndStates: 'Pending editorial research.',
          language: 'Pending editorial research.',
          religionAndWorldview: 'Pending editorial research.',
          artAndTechnology: 'Pending editorial research.',
          trade: 'Pending editorial research.',
          warAndDiplomacy: 'Pending editorial research.',
          colonialEncounter: 'Pending editorial research.',
          modernHistory: 'Pending editorial research.',
          diaspora: 'Pending editorial research.',
        },
      };

      repo.insertEntity(newCommunity as any);
      importedIds.push(newCommunity.id);
    }

    return NextResponse.json({
      success: true,
      importedCount: importedIds.length,
      importedIds,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}
