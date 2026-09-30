import { repo } from './index';
import {
  seedCommunities,
  seedKingdoms,
  seedPolities,
  seedPlaces,
  seedEvents,
  seedArtefacts,
  seedRelationships,
  seedSources,
} from '@/data/seed';

export function seedRepository() {
  repo.clear();

  seedSources.forEach((source) => repo.insertSource(source));

  [
    ...seedCommunities,
    ...seedKingdoms,
    ...seedPolities,
    ...seedPlaces,
    ...seedEvents,
    ...seedArtefacts,
  ].forEach((entity) => repo.insertEntity(entity as any));

  seedRelationships.forEach((rel) => repo.insertRelationship(rel));
}

// Auto-seed repository on import
seedRepository();
