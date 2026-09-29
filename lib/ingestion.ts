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

  // 1. Validate Entities
  for (const entity of entities) {
    if (!entity.canonicalName) {
      issues.push({
        entityId: entity.id,
        type: 'ERROR',
        message: 'Entity lacks a canonicalName.',
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
