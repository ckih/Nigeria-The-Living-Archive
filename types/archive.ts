export type EntityType =
  | 'person'
  | 'community'
  | 'ethnic_group'
  | 'kingdom'
  | 'polity'
  | 'political_state'
  | 'government'
  | 'office'
  | 'leader'
  | 'place'
  | 'city'
  | 'state'
  | 'lga'
  | 'region'
  | 'language'
  | 'dialect'
  | 'event'
  | 'era'
  | 'archaeological_site'
  | 'historical_site'
  | 'artefact'
  | 'document'
  | 'photograph'
  | 'audio'
  | 'video'
  | 'map'
  | 'trade_route'
  | 'migration'
  | 'battle'
  | 'festival'
  | 'institution'
  | 'sport_event'
  | 'musician'
  | 'film'
  | 'writer'
  | 'story'
  | 'claim'
  | 'source'
  | 'research_topic'
  | 'team'
  | 'collection';

export type CoverageStatus =
  | 'INDEXED'
  | 'PARTIALLY_DOCUMENTED'
  | 'UNDER_RESEARCH'
  | 'RESEARCHED'
  | 'SOURCE_REQUIRED'
  | 'VERIFIED'
  | 'COMMUNITY_CONTRIBUTION'
  | 'DISPUTED';

export type ContentCoverageDimension = 'AVAILABLE' | 'PARTIAL' | 'NOT_AVAILABLE' | 'VERIFIED';

export interface CoverageMetrics {
  contentCoverage: ContentCoverageDimension;
  sourceCoverage: ContentCoverageDimension;
  oralHistoryCoverage: ContentCoverageDimension;
  documentCoverage: ContentCoverageDimension;
  model3DCoverage: ContentCoverageDimension;
  translationCoverage: ContentCoverageDimension;
}

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
  | 'ARCHAEOLOGICAL'
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
  | 'influenced'
  | 'held_office'
  | 'moved_between'
  | 'connects'
  | 'authored';

export type CertaintyLevel =
  | 'VERIFIED'
  | 'SUPPORTED'
  | 'DISPUTED'
  | 'ORAL_TRADITION'
  | 'SCHOLARLY_INTERPRETATION'
  | 'UNVERIFIED';

export interface BaseEntity {
  id: string;
  type: EntityType;
  canonicalName: string;
  alternativeNames?: string[];
  description: string;
  region?: string | string[];
  state?: string[];
  lga?: string[];
  coordinates?: Coordinates;
  startDate?: string;
  endDate?: string;
  status?: 'DRAFT' | 'RESEARCH' | 'EDITORIAL_REVIEW' | 'VERIFIED' | 'PUBLISHED';
  coverageStatus: CoverageStatus;
  coverageMetrics?: CoverageMetrics;
  sourceIds: string[];
  relatedEntityIds: string[];
  mediaIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

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
  certaintyStatus: CertaintyLevel;
}

export interface Claim {
  id: string;
  statement: string;
  entityId: string;
  evidenceType: 'DOCUMENTARY' | 'ARCHAEOLOGICAL' | 'ORAL_GENEALOGY' | 'LINGUISTIC' | 'CONTESTED';
  confidence: CertaintyLevel;
  sourceIds: string[];
  disputedAccounts?: DisputedAccount[];
  editorNotes?: string;
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
  modelUrl?: string;
  modelType: 'scan' | 'photogrammetry' | 'reconstruction' | 'digital_model' | 'illustration' | 'placeholder';
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

export interface Tenure {
  id: string;
  personId: string;
  office: string;
  governmentType: 'COLONIAL_GOVERNOR' | 'CONSTITUTIONAL_MONARCH' | 'PARLIAMENTARY_PM' | 'MILITARY_HEAD_OF_STATE' | 'EXECUTIVE_PRESIDENT';
  startDate?: string;
  endDate?: string;
  predecessorTenureId?: string;
  successorTenureId?: string;
  keyPoliciesAndEvents?: string[];
}

export interface Era extends BaseEntity {
  type: 'era';
  slug: string;
}

export interface Person extends BaseEntity {
  type: 'person';
  name: string;
  titleOrRole?: string;
  birthYear?: string;
  deathYear?: string;
  era: string;
  summary: string;
  biography: string;
  tenureIds?: string[];
  associatedCommunities: string[];
  associatedKingdoms: string[];
  associatedPlaces: string[];
}

export interface Community extends BaseEntity {
  type: 'community';
  name: string;
  alternateNames?: string[];
  endonyms?: string[];
  region: string;
  states: string[];
  lgas?: string[];
  coordinates: Coordinates;
  languageFamily?: string;
  languagesSpoken: string[];
  documentationStatus?: string;
  summary: string;
  historicallyAssociatedArea?: string;
  documentedSettlementArea?: string;
  languageDistribution?: string;
  historicalPoliticalExtent?: string;
  originTraditions?: string;
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
}

export interface Kingdom extends BaseEntity {
  type: 'kingdom';
  name: string;
  historicalPeriod: string;
  startYear?: number;
  endYear?: number;
  capitalPlaceId: string;
  summary: string;
  detailedHistory: string;
  politicalStructure: string;
  associatedCommunities: string[];
  approximateExtentNotice: string;
}

export interface Polity extends BaseEntity {
  type: 'polity';
  polityType: 'kingdom' | 'empire' | 'caliphate' | 'city-state' | 'chiefdom' | 'federation' | 'confederation' | 'traditional_system' | 'colonial_administrative_territory';
  period?: string;
  capital?: string;
  historicalPoliticalExtent?: string;
  governmentStructure?: string;
  economy?: string;
  trade?: string;
  military?: string;
  religion?: string;
  architecture?: string;
  languageAssociations?: string[];
}

export interface Place extends BaseEntity {
  type: 'place';
  placeType?: 'city' | 'town' | 'village' | 'historical_settlement' | 'capital' | 'archaeological_settlement';
  name: string;
  historicalNames?: string[];
  summary: string;
  historicalSignificance: string;
  coordinates: Coordinates;
  thenNowData?: {
    thenTitle: string;
    thenDescription: string;
    thenImageUrl?: string;
    nowTitle: string;
    nowDescription: string;
    nowImageUrl?: string;
  };
  associatedEntityIds: string[];
  chapters?: {
    origin?: string;
    precolonial?: string;
    colonial?: string;
    urbanDevelopment?: string;
    economy?: string;
    transport?: string;
    architecture?: string;
    culture?: string;
    politics?: string;
  };
}

export interface Event extends BaseEntity {
  type: 'event';
  title: string;
  dateDisplay?: string;
  year?: number;
  locationPlaceId?: string;
  summary: string;
  context?: string;
  participants?: string[];
  politicalBackground?: string;
  immediateConsequences?: string;
  longTermConsequences?: string;
  connectedEventIds?: string[];
  affectedArtefactIds?: string[];
}

export interface Artefact extends BaseEntity {
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
}

export interface Language extends BaseEntity {
  type: 'language';
  name: string;
  endonym?: string;
  family: 'Niger-Congo' | 'Afroasiatic' | 'Nilo-Saharan' | 'Creole / Pidgin' | 'Other';
  subfamily?: string;
  statesSpoken: string[];
  approximateSpeakersDisplay?: string;
  languageStatus: 'VIBRANT' | 'LOW_RESOURCE' | 'ENDANGERED' | 'DOCUMENTED';
  dialects?: string[];
  summary: string;
  orthography?: string;
  writingSystems?: string[];
}

export interface Leader extends BaseEntity {
  type: 'leader';
  name: string;
  titleOrOffice: string;
  era: 'COLONIAL' | 'INDEPENDENCE_ERA' | 'FIRST_REPUBLIC' | 'MILITARY_GOVT' | 'SECOND_THIRD_REPUBLIC' | 'FOURTH_REPUBLIC';
  tenureStart: string;
  tenureEnd: string;
  governmentType: 'COLONIAL_GOVERNOR' | 'CONSTITUTIONAL_MONARCH' | 'PARLIAMENTARY_PM' | 'MILITARY_HEAD_OF_STATE' | 'EXECUTIVE_PRESIDENT';
  summary: string;
  biography: string;
  keyPoliciesAndEvents: string[];
  predecessor?: string;
  successor?: string;
}

export interface DocumentRecord extends BaseEntity {
  type: 'document';
  title: string;
  documentType: 'NEWSPAPER' | 'GAZETTE' | 'TREATY' | 'LETTER' | 'CONSTITUTION' | 'SPEECH' | 'ARCHIVAL_REPORT';
  dateDisplay: string;
  year?: number;
  creatorOrInstitution: string;
  summary: string;
  excerptOrTranscript?: string;
  license: string;
}

export interface OralHistory extends BaseEntity {
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
}

export interface VideoDocument extends BaseEntity {
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

export interface TradeRoute extends BaseEntity {
  type: 'trade_route';
  name: string;
  origin: string;
  destination: string;
  commodities: string[];
  historicalPeriod: string;
  summary: string;
  mapGeometry?: {
    type: 'LineString';
    coordinates: [number, number][];
  };
}

export interface HistoricalMap extends BaseEntity {
  type: 'map';
  title: string;
  cartographer?: string;
  yearDisplay: string;
  layerType: 'COLONIAL_BOUNDARIES' | 'POLITY_EXTENT' | 'RAILWAYS' | 'TRADE_ROUTES';
  summary: string;
  license: string;
}

export interface Photograph extends BaseEntity {
  type: 'photograph';
  title: string;
  photographer?: string;
  yearDisplay: string;
  caption: string;
  license: string;
}

export interface ArchaeologicalSite extends BaseEntity {
  type: 'archaeological_site';
  siteName: string;
  culturalAffiliation: string;
  excavationDates?: string;
  keyFindings: string[];
  summary: string;
}

export interface ResearchTopic extends BaseEntity {
  type: 'research_topic';
  slug: string;
  theme: 'political' | 'economic' | 'trade' | 'religion' | 'technology' | 'metallurgy' | 'agriculture' | 'architecture' | 'warfare' | 'diplomacy' | 'social_organisation' | 'gender' | 'education_scholarship' | 'migration' | 'colonial_administration' | 'economic_history' | 'niger_delta';
  title: string;
  summary: string;
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
