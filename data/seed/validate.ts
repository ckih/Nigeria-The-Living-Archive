import {
  seedCommunities,
  seedKingdoms,
  seedPlaces,
  seedEvents,
  seedArtefacts,
  seedRelationships,
  seedSources,
} from './index';
import { validateSeedDataset } from '../../lib/ingestion';

function validateDataset() {
  console.log('Validating Living Archive Seed Dataset via Ingestion Engine...');

  const allEntities = [
    ...seedCommunities,
    ...seedKingdoms,
    ...seedPlaces,
    ...seedEvents,
    ...seedArtefacts,
  ];

  const { issues, errorCount, warningCount } = validateSeedDataset(
    allEntities as any,
    seedRelationships,
    seedSources
  );

  if (issues.length > 0) {
    for (const issue of issues) {
      if (issue.type === 'ERROR') {
        console.error(`[ERROR] [Entity: ${issue.entityId}] ${issue.message}`);
      } else {
        console.warn(`[WARNING] [Entity: ${issue.entityId}] ${issue.message}`);
      }
    }
  }

  if (errorCount > 0) {
    console.error(`❌ Validation failed with ${errorCount} errors and ${warningCount} warnings.`);
    process.exit(1);
  }

  console.log(`✓ Seed validation passed cleanly. Verified ${allEntities.length} core entities and ${seedRelationships.length} relationships.`);
}

validateDataset();
