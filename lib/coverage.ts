import { repo } from '@/lib/repo';
import { BaseEntity, CoverageMetrics, CoverageStatus } from '@/types/archive';

export interface DynamicEntityCoverage {
  entityId: string;
  canonicalName: string;
  type: string;
  coverageStatus: CoverageStatus;
  coverageMetrics: CoverageMetrics;
  hasSources: boolean;
  hasMedia: boolean;
  hasRelationships: boolean;
}

export function computeEntityCoverage(entityId: string): DynamicEntityCoverage | null {
  const entity = repo.getEntity(entityId);
  if (!entity) return null;

  const rels = repo.getRelationshipsForEntity(entityId);
  const hasSources = Boolean(entity.sourceIds && entity.sourceIds.length > 0);
  const hasMedia = Boolean(entity.mediaIds && entity.mediaIds.length > 0);
  const hasRelationships = rels.length > 0;

  const defaultMetrics: CoverageMetrics = {
    contentCoverage: entity.description ? 'VERIFIED' : 'NOT_AVAILABLE',
    sourceCoverage: hasSources ? 'VERIFIED' : 'NOT_AVAILABLE',
    oralHistoryCoverage: 'NOT_AVAILABLE',
    documentCoverage: 'NOT_AVAILABLE',
    model3DCoverage: 'NOT_AVAILABLE',
    translationCoverage: 'NOT_AVAILABLE',
  };

  return {
    entityId: entity.id,
    canonicalName: entity.canonicalName,
    type: entity.type,
    coverageStatus: entity.coverageStatus || 'INDEXED',
    coverageMetrics: entity.coverageMetrics || defaultMetrics,
    hasSources,
    hasMedia,
    hasRelationships,
  };
}

export function computeGlobalCoverageStats() {
  const allEntities = repo.getAllEntities();
  const allSources = repo.getAllSources();
  const allRelationships = repo.getAllRelationships();

  const totalIndexed = allEntities.length;
  const totalVerified = allEntities.filter((e) => e.coverageStatus === 'VERIFIED').length;
  const entitiesMissingSources = allEntities.filter((e) => !e.sourceIds || e.sourceIds.length === 0);
  const entitiesMissingMedia = allEntities.filter((e) => !e.mediaIds || e.mediaIds.length === 0);

  return {
    totalIndexed,
    totalVerified,
    totalSources: allSources.length,
    totalRelationships: allRelationships.length,
    missingSourcesCount: entitiesMissingSources.length,
    missingMediaCount: entitiesMissingMedia.length,
    entitiesMissingSources,
    entitiesMissingMedia,
  };
}
