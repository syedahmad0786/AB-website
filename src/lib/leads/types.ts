// ============================================================================
// Lead Generation & Profiling System - Core Types
// ============================================================================

export interface Lead {
  id: string;
  createdAt: string;
  updatedAt: string;

  // Basic Info
  firstName: string;
  lastName: string;
  fullName: string;
  headline?: string;
  title?: string;
  company?: string;
  industry?: string;
  location?: string;
  avatarUrl?: string;

  // Contact Info
  emails: EmailRecord[];
  phones: PhoneRecord[];

  // Social Profiles
  socialProfiles: SocialProfile[];

  // Enrichment Data
  enrichment?: EnrichmentData;

  // Psychological Profile
  psychProfile?: PsychologicalProfile;

  // Lead Management
  tags: string[];
  score: number; // 0-100
  status: LeadStatus;
  source: string;
  notes: string;

  // Search metadata
  searchQuery?: string;
  rawData?: Record<string, unknown>;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';

export interface EmailRecord {
  email: string;
  type: 'personal' | 'work' | 'unknown';
  confidence: number; // 0-100
  verified: boolean;
  source: string;
}

export interface PhoneRecord {
  phone: string;
  type: 'mobile' | 'work' | 'home' | 'unknown';
  confidence: number;
  source: string;
}

export interface SocialProfile {
  platform: SocialPlatform;
  url: string;
  username?: string;
  bio?: string;
  followers?: number;
  following?: number;
  posts?: number;
  verified?: boolean;
  lastActive?: string;
  rawData?: Record<string, unknown>;
}

export type SocialPlatform =
  | 'linkedin'
  | 'twitter'
  | 'github'
  | 'facebook'
  | 'instagram'
  | 'reddit'
  | 'youtube'
  | 'tiktok'
  | 'medium'
  | 'website'
  | 'other';

export interface EnrichmentData {
  companyInfo?: CompanyInfo;
  education?: Education[];
  experience?: Experience[];
  skills?: string[];
  interests?: string[];
  languages?: string[];
  websites?: string[];
  publicRepos?: number;
  contributions?: number;
  enrichedAt: string;
}

export interface CompanyInfo {
  name: string;
  domain?: string;
  industry?: string;
  size?: string;
  location?: string;
  description?: string;
  founded?: string;
  linkedin?: string;
  website?: string;
}

export interface Education {
  school: string;
  degree?: string;
  field?: string;
  startYear?: number;
  endYear?: number;
}

export interface Experience {
  title: string;
  company: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

// ============================================================================
// Psychological Profiling Types
// ============================================================================

export interface PsychologicalProfile {
  generatedAt: string;
  confidence: number; // 0-100
  dataSourcesUsed: string[];

  // Big Five / OCEAN Model
  ocean: OceanProfile;

  // Communication Style
  communicationStyle: CommunicationStyle;

  // Decision Making
  decisionMaking: DecisionMakingProfile;

  // Values & Motivators
  values: ValuesProfile;

  // Professional Persona
  professionalPersona: ProfessionalPersona;

  // Outreach Recommendations
  outreachStrategy: OutreachStrategy;

  // Raw AI Analysis
  summary: string;
  keyInsights: string[];
  warnings: string[];
}

export interface OceanProfile {
  openness: TraitScore;
  conscientiousness: TraitScore;
  extraversion: TraitScore;
  agreeableness: TraitScore;
  neuroticism: TraitScore;
}

export interface TraitScore {
  score: number; // 1-100
  level: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
  indicators: string[];
}

export interface CommunicationStyle {
  primary: 'analytical' | 'driver' | 'expressive' | 'amiable';
  secondary?: 'analytical' | 'driver' | 'expressive' | 'amiable';
  preferredChannels: string[];
  tonePreference: 'formal' | 'semi_formal' | 'casual' | 'mixed';
  detailOrientation: 'high' | 'medium' | 'low';
  responseSpeed: 'fast' | 'moderate' | 'deliberate';
  description: string;
}

export interface DecisionMakingProfile {
  style: 'analytical' | 'intuitive' | 'collaborative' | 'directive';
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  influencers: string[];
  decisionSpeed: 'fast' | 'moderate' | 'slow';
  description: string;
}

export interface ValuesProfile {
  topValues: string[];
  motivators: string[];
  painPoints: string[];
  goals: string[];
  description: string;
}

export interface ProfessionalPersona {
  archetype: string;
  strengths: string[];
  blindSpots: string[];
  influenceStyle: string;
  networkingStyle: string;
  contentPreferences: string[];
  description: string;
}

export interface OutreachStrategy {
  bestApproach: string;
  openingLines: string[];
  topicsToLead: string[];
  topicsToAvoid: string[];
  bestTimeToReach: string;
  followUpStrategy: string;
  personalizedHooks: string[];
}

// ============================================================================
// Search & API Types
// ============================================================================

export interface SearchQuery {
  query: string;
  platforms: SocialPlatform[];
  filters?: SearchFilters;
}

export interface SearchFilters {
  location?: string;
  industry?: string;
  company?: string;
  title?: string;
  minFollowers?: number;
  hasEmail?: boolean;
}

export interface SearchResult {
  platform: SocialPlatform;
  name: string;
  title?: string;
  company?: string;
  location?: string;
  url: string;
  avatarUrl?: string;
  snippet?: string;
  email?: string;
  confidence: number;
  rawData?: Record<string, unknown>;
}

export interface EnrichmentRequest {
  leadId: string;
  findEmails: boolean;
  findPhones: boolean;
  enrichCompany: boolean;
  generateProfile: boolean;
}

export interface ApiKeysConfig {
  serpApiKey?: string;
  openaiApiKey?: string;
  githubToken?: string;
  hunterApiKey?: string;
  proxycurlApiKey?: string;
}

export interface LeadSearchState {
  query: string;
  platforms: SocialPlatform[];
  results: SearchResult[];
  isSearching: boolean;
  error?: string;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  enrichedLeads: number;
  profiledLeads: number;
  emailsFound: number;
  phonesFound: number;
}

// ============================================================================
// Export Types
// ============================================================================

export type ExportFormat = 'csv' | 'json' | 'xlsx';

export interface ExportOptions {
  format: ExportFormat;
  fields: string[];
  filters?: {
    status?: LeadStatus[];
    tags?: string[];
    minScore?: number;
  };
}
