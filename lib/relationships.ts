import { repo } from '@/lib/repo';
import { BaseEntity } from '@/types/archive';

export interface GroupedRelationships {
  people: BaseEntity[];
  places: BaseEntity[];
  events: BaseEntity[];
  communities: BaseEntity[];
  artefacts: BaseEntity[];
  documents: BaseEntity[];
  media: BaseEntity[];
  sources: BaseEntity[];
}

export function getGroupedRelationshipsForEntity(entityId: string): GroupedRelationships {
  const rels = repo.getRelationshipsForEntity(entityId);
  const grouped: GroupedRelationships = {
    people: [],
    places: [],
    events: [],
    communities: [],
    artefacts: [],
    documents: [],
    media: [],
    sources: [],
  };

  for (const rel of rels) {
    const targetId = rel.fromEntityId === entityId ? rel.toEntityId : rel.fromEntityId;
    const targetEntity = repo.getEntity(targetId);

    if (!targetEntity) continue;

    switch (targetEntity.type) {
      case 'person':
      case 'leader':
        grouped.people.push(targetEntity);
        break;
      case 'place':
      case 'city':
      case 'state':
        grouped.places.push(targetEntity);
        break;
      case 'event':
      case 'era':
      case 'battle':
        grouped.events.push(targetEntity);
        break;
      case 'community':
      case 'ethnic_group':
      case 'kingdom':
        grouped.communities.push(targetEntity);
        break;
      case 'artefact':
        grouped.artefacts.push(targetEntity);
        break;
      case 'document':
        grouped.documents.push(targetEntity);
        break;
      case 'audio':
      case 'video':
      case 'photograph':
      case 'map':
        grouped.media.push(targetEntity);
        break;
      case 'source':
        grouped.sources.push(targetEntity);
        break;
    }
  }

  return grouped;
}
