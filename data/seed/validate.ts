import {
  seedCommunities,
  seedKingdoms,
  seedPlaces,
  seedEvents,
  seedArtefacts,
  seedSources,
  seedRelationships,
} from './index';

function validateSeedData() {
  console.log('Validating Living Archive Seed Dataset...');

  const entityIds = new Set<string>();
  const sourceIds = new Set(seedSources.map((s) => s.id));

  const allEntities = [
    ...seedCommunities,
    ...seedKingdoms,
    ...seedPlaces,
    ...seedEvents,
    ...seedArtefacts,
  ];

  for (const entity of allEntities) {
    if (entityIds.has(entity.id)) {
      throw new Error(`Duplicate Entity ID found: ${entity.id}`);
    }
    entityIds.add(entity.id);

    // Validate that linked sources exist
    if ('sourceIds' in entity && Array.isArray(entity.sourceIds)) {
      for (const srcId of entity.sourceIds) {
        if (!sourceIds.has(srcId)) {
          console.warn(`Warning: Entity ${entity.id} references missing source ${srcId}`);
        }
      }
    }
  }

  // Validate relationships
  for (const rel of seedRelationships) {
    if (!entityIds.has(rel.fromEntityId)) {
      console.warn(`Relationship ${rel.id} fromEntityId ${rel.fromEntityId} not found in entity registry.`);
    }
    if (!entityIds.has(rel.toEntityId)) {
      console.warn(`Relationship ${rel.id} toEntityId ${rel.toEntityId} not found in entity registry.`);
    }
  }

  console.log(`✓ Seed validation passed. Verified ${allEntities.length} core entities and ${seedRelationships.length} relationships.`);
}

validateSeedData();
