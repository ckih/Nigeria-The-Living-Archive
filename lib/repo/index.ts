import {
  BaseEntity,
  Relationship,
  Claim,
  Source,
  MediaAsset,
  Leader,
} from '@/types/archive';

export interface RepositoryStore {
  entities: Map<string, BaseEntity>;
  relationships: Relationship[];
  claims: Claim[];
  sources: Map<string, Source>;
  mediaAssets: Map<string, MediaAsset>;
  tenures: Array<{
    id: string;
    personId: string;
    office: string;
    governmentType: string;
    startDate: string;
    endDate: string;
    predecessorTenureId?: string;
    successorTenureId?: string;
  }>;
}

class LivingArchiveRepository {
  private store: RepositoryStore = {
    entities: new Map(),
    relationships: [],
    claims: [],
    sources: new Map(),
    mediaAssets: new Map(),
    tenures: [],
  };

  public insertEntity(entity: BaseEntity): void {
    this.store.entities.set(entity.id, entity);
  }

  public getEntity<T extends BaseEntity = BaseEntity>(id: string): T | undefined {
    return this.store.entities.get(id) as T | undefined;
  }

  public getAllEntities(): BaseEntity[] {
    return Array.from(this.store.entities.values());
  }

  public getEntitiesByType<T extends BaseEntity = BaseEntity>(type: string): T[] {
    return Array.from(this.store.entities.values()).filter((e) => e.type === type) as T[];
  }

  public insertRelationship(relationship: Relationship): void {
    this.store.relationships.push(relationship);
  }

  public getRelationshipsForEntity(entityId: string): Relationship[] {
    return this.store.relationships.filter(
      (r) => r.fromEntityId === entityId || r.toEntityId === entityId
    );
  }

  public getAllRelationships(): Relationship[] {
    return [...this.store.relationships];
  }

  public insertSource(source: Source): void {
    this.store.sources.set(source.id, source);
  }

  public getSource(id: string): Source | undefined {
    return this.store.sources.get(id);
  }

  public getAllSources(): Source[] {
    return Array.from(this.store.sources.values());
  }

  public insertTenure(tenure: {
    id: string;
    personId: string;
    office: string;
    governmentType: string;
    startDate: string;
    endDate: string;
    predecessorTenureId?: string;
    successorTenureId?: string;
  }): void {
    this.store.tenures.push(tenure);
  }

  public getTenuresForPerson(personId: string) {
    return this.store.tenures.filter((t) => t.personId === personId);
  }

  public getAllTenures() {
    return [...this.store.tenures];
  }

  public clear(): void {
    this.store.entities.clear();
    this.store.relationships = [];
    this.store.claims = [];
    this.store.sources.clear();
    this.store.mediaAssets.clear();
    this.store.tenures = [];
  }
}

export const repo = new LivingArchiveRepository();
