import { BaseEntity, Relationship, Source } from '@/types/archive';

export interface ValidationIssue {
  entityId: string;
  type: 'ERROR' | 'WARNING';
  message: string;
}

export function validateSeedDataset(
  entities: BaseEntity[],
  relationships: Relationship[],
  sources: Source[]
): { issues: ValidationIssue[]; errorCount: number; warningCount: number } {
  const issues: ValidationIssue[] = [];
  const sourceIdMap = new Set(sources.map((s) => s.id));
  const entityIdMap = new Set(entities.map((e) => e.id));
  const nameTypeSet = new Set<string>();

  // 1. Validate Entities
  for (const entity of entities) {
    if (!entity.canonicalName) {
      issues.push({
        entityId: entity.id,
        type: 'ERROR',
        message: 'Entity lacks a canonicalName.',
      });
    }

    // Duplicate canonicalName within the same type check
    const nameTypeKey = `${entity.type}:${(entity.canonicalName || '').toLowerCase()}`;
    if (nameTypeSet.has(nameTypeKey)) {
      issues.push({
        entityId: entity.id,
        type: 'WARNING',
        message: `Duplicate canonicalName '${entity.canonicalName}' within entity type '${entity.type}'.`,
      });
    } else {
      nameTypeSet.add(nameTypeKey);
    }

    // Leader office requirement check
    if (entity.type === 'leader' && !(entity as any).titleOrOffice) {
      issues.push({
        entityId: entity.id,
        type: 'ERROR',
        message: 'Leader entity has no specified titleOrOffice.',
      });
    }

    // Artefact source warning check
    if (entity.type === 'artefact' && (!entity.sourceIds || entity.sourceIds.length === 0)) {
      issues.push({
        entityId: entity.id,
        type: 'WARNING',
        message: 'Artefact entity has no attached source records.',
      });
    }

    // Missing coverageStatus
    if (!entity.coverageStatus) {
      issues.push({
        entityId: entity.id,
        type: 'WARNING',
        message: 'Entity is missing coverageStatus classification.',
      });
    }

    if (!entity.sourceIds || entity.sourceIds.length === 0) {
      issues.push({
        entityId: entity.id,
        type: 'WARNING',
        message: 'Entity has no attached primary/secondary sources.',
      });
    } else {
      for (const sid of entity.sourceIds) {
        if (!sourceIdMap.has(sid)) {
          issues.push({
            entityId: entity.id,
            type: 'WARNING',
            message: `Entity references missing sourceId '${sid}'.`,
          });
        }
      }
    }
  }

  // 2. Validate Relationships
  for (const rel of relationships) {
    if (!entityIdMap.has(rel.fromEntityId)) {
      issues.push({
        entityId: rel.id,
        type: 'ERROR',
        message: `Relationship references non-existent fromEntityId '${rel.fromEntityId}'.`,
      });
    }

    if (!entityIdMap.has(rel.toEntityId)) {
      issues.push({
        entityId: rel.id,
        type: 'ERROR',
        message: `Relationship references non-existent toEntityId '${rel.toEntityId}'.`,
      });
    }
  }

  const errorCount = issues.filter((i) => i.type === 'ERROR').length;
  const warningCount = issues.filter((i) => i.type === 'WARNING').length;

  return { issues, errorCount, warningCount };
}
