export type EntityType =
  | 'person'
  | 'community'
  | 'kingdom'
  | 'place'
  | 'language'
  | 'event'
  | 'era'
  | 'artefact'
  | 'document'
  | 'photo'
  | 'video'
  | 'audio'
  | 'festival'
  | 'institution'
  | 'battle'
  | 'migration'
  | 'trade_route'
  | 'historical_site'
  | 'source';

export type SourceType =
  | 'PRIMARY'
  | 'SECONDARY'
  | 'ACADEMIC'
  | 'MUSEUM'
  | 'ARCHIVE'
  | 'ORAL_HISTORY'
  | 'GOVERNMENT'
  | 'UNESCO'
  | 'COMMUNITY'
  | 'OTHER';

export type RelationshipType =
  | 'ruled'
  | 'located_in'
  | 'occurred_at'
  | 'associated_with'
  | 'participated_in'
  | 'describes'
  | 'depicts'
  | 'supports'
  | 'created_by'
  | 'originated_from'
  | 'traded_with'
  | 'succeeded_by'
  | 'part_of'
  | 'spoke_language'
  | 'influenced';

export interface Source {
  id: string;
  title: string;
  sourceType: SourceType;
  author?: string;
  publisher?: string;
  publicationDate?: string;
  url?: string;
  archive?: string;
  license?: string;
  confidence: 'HIGH' | 'MEDIUM' | 'DISPUTED' | 'UNVERIFIED';
  notes?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
  label?: string;
}

export interface Relationship {
  id: string;
  fromEntityId: string;
  toEntityId: string;
  type: RelationshipType;
  startDate?: string;
  endDate?: string;
  description: string;
  sourceIds: string[];
}

export interface Claim {
  id: string;
  statement: string;
  entityId: string;
  confidence: 'CONFIRMED' | 'SCHOLARLY_CONSENSUS' | 'ORAL_TRADITION' | 'DISPUTED';
  sourceIds: string[];
  disputedAccounts?: DisputedAccount[];
}

export interface DisputedAccount {
  accountName: string;
  perspective: string;
  sourceIds: string[];
}

export interface MediaAsset {
  id: string;
  url: string;
  thumbnailUrl?: string;
  title: string;
  type: 'image' | 'video' | 'audio' | 'model_3d';
  caption?: string;
  creator?: string;
  date?: string;
  source?: string;
  license?: string;
  credit?: string;
}

export interface Hotspot3D {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
  sourceIds?: string[];
}

export interface Model3D {
  id: string;
  modelUrl?: string; // If null, fallback to styled parametric 3D representation
  modelType: 'scan' | 'reconstruction' | 'illustration' | 'placeholder';
  title: string;
  material: string;
  period: string;
  dimensions?: string;
  provenance: string;
  hotspots: Hotspot3D[];
  license: string;
  creator?: string;
  source?: string;
}

export interface Person {
  id: string;
  type: 'person';
  name: string;
  titleOrRole?: string;
  birthYear?: string;
  deathYear?: string;
  era: string;
  summary: string;
  biography: string;
  associatedCommunities: string[]; // community IDs
  associatedKingdoms: string[]; // kingdom IDs
  associatedPlaces: string[]; // place IDs
  mediaIds: string[];
  sourceIds: string[];
}

export interface Community {
  id: string;
  type: 'community';
  name: string;
  alternateNames?: string[];
  region: string;
  coordinates: Coordinates;
  languageFamily?: string;
  languagesSpoken: string[];
  summary: string;
  sections: {
    overview: string;
    origins: string;
    politicalSystems: string;
    kingdomsAndStates: string;
    language: string;
    religionAndWorldview: string;
    artAndTechnology: string;
    trade: string;
    warAndDiplomacy: string;
    colonialEncounter: string;
    modernHistory: string;
    diaspora: string;
  };
  featuredMediaIds: string[];
  sourceIds: string[];
}

export interface Kingdom {
  id: string;
  type: 'kingdom';
  name: string;
  historicalPeriod: string;
  startYear?: number;
  endYear?: number;
  capitalPlaceId: string;
  coordinates: Coordinates;
  summary: string;
  detailedHistory: string;
  politicalStructure: string;
  associatedCommunities: string[];
  approximateExtentNotice: string;
  mediaIds: string[];
  sourceIds: string[];
}

export interface Place {
  id: string;
  type: 'place';
  name: string;
  historicalNames?: string[];
  coordinates: Coordinates;
  region: string;
  summary: string;
  historicalSignificance: string;
  thenNowData?: {
    thenTitle: string;
    thenDescription: string;
    thenImageUrl?: string;
    nowTitle: string;
    nowDescription: string;
    nowImageUrl?: string;
  };
  associatedEntityIds: string[];
  mediaIds: string[];
  sourceIds: string[];
}

export interface Event {
  id: string;
  type: 'event';
  title: string;
  dateDisplay: string;
  year: number;
  locationPlaceId: string;
  coordinates?: Coordinates;
  summary: string;
  context: string;
  participants: string[];
  politicalBackground: string;
  immediateConsequences: string;
  longTermConsequences: string;
  connectedEventIds: string[]; // "Follow the Story" path
  affectedArtefactIds: string[];
  mediaIds: string[];
  sourceIds: string[];
}

export interface Artefact {
  id: string;
  type: 'artefact';
  title: string;
  period: string;
  material: string;
  associatedCultureId: string;
  currentLocation: string;
  summary: string;
  context: string;
  provenanceHistory: string;
  model3D?: Model3D;
  mediaIds: string[];
  sourceIds: string[];
}

export interface OralHistory {
  id: string;
  type: 'audio';
  title: string;
  speaker: string;
  location: string;
  date: string;
  language: string;
  audioUrl?: string;
  waveformPeaks?: number[];
  transcript: string;
  englishTranslation: string;
  summary: string;
  sourceIds: string[];
}

export interface VideoDocument {
  id: string;
  type: 'video';
  title: string;
  duration: string;
  date: string;
  topic: string;
  thumbnailUrl: string;
  videoUrl?: string;
  summary: string;
  source: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  year: number;
  dateDisplay: string;
  category: 'Kingdom' | 'Event' | 'Artefact' | 'Epoch' | 'Political';
  summary: string;
  entityId: string;
  entityType: EntityType;
  coordinates?: Coordinates;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: EntityType;
  color: string;
  radius: number;
}

export interface KnowledgeGraphLink {
  source: string;
  target: string;
  relationship: RelationshipType;
  label: string;
}

export interface SearchResult {
  id: string;
  title: string;
  type: EntityType;
  subtitle: string;
  summary: string;
  url: string;
  matchingScore?: number;
}

export interface AskArchiveResponse {
  question: string;
  answer: string;
  confidence: 'HIGH' | 'MEDIUM' | 'QUALIFIED';
  sourcesUsed: Source[];
  relatedEntities: { id: string; title: string; type: EntityType }[];
  isDemoNotice: string;
}
