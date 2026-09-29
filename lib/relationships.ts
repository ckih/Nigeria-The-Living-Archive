import {
  seedCommunities,
  seedKingdoms,
  seedPlaces,
  seedEvents,
  seedArtefacts,
  seedRelationships,
} from '@/data/seed';
import { BaseEntity, Relationship } from '@/types/archive';

export interface RelatedEntityResult {
  entity: BaseEntity;
  relationshipDescription: string;
  relationshipType: string;
  certaintyStatus: string;
}

export function getRelatedEntities(entityId: string): RelatedEntityResult[] {
  const allEntitiesMap = new Map<string, BaseEntity>();

  [
    ...seedCommunities,
    ...seedKingdoms,
    ...seedPlaces,
    ...seedEvents,
    ...seedArtefacts,
  ].forEach((e) => allEntitiesMap.set(e.id, e as any));

  const results: RelatedEntityResult[] = [];

  for (const rel of seedRelationships) {
    if (rel.fromEntityId === entityId) {
      const targetEntity = allEntitiesMap.get(rel.toEntityId);
      if (targetEntity) {
        results.push({
          entity: targetEntity,
          relationshipDescription: rel.description,
          relationshipType: rel.type,
          certaintyStatus: rel.certaintyStatus,
        });
      }
    } else if (rel.toEntityId === entityId) {
      const sourceEntity = allEntitiesMap.get(rel.fromEntityId);
      if (sourceEntity) {
        results.push({
          entity: sourceEntity,
          relationshipDescription: rel.description,
          relationshipType: rel.type,
          certaintyStatus: rel.certaintyStatus,
        });
      }
    }
  }

  return results;
}
