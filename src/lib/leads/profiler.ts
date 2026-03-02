// ============================================================================
// AI-Powered Psychological Profiling Engine
// Analyzes social media presence to build comprehensive personality profiles
// ============================================================================

import {
  Lead,
  PsychologicalProfile,
  SocialProfile,
  OceanProfile,
  CommunicationStyle,
  DecisionMakingProfile,
  ValuesProfile,
  ProfessionalPersona,
  OutreachStrategy,
  TraitScore,
} from './types';

// ---- Main Profiling Function ----

export async function generatePsychProfile(
  lead: Lead,
  openaiApiKey?: string
): Promise<PsychologicalProfile> {
  // Gather all available data about the person
  const profileData = gatherProfileData(lead);

  // If OpenAI key is available, use AI for deep analysis
  if (openaiApiKey) {
    return generateAIProfile(lead, profileData, openaiApiKey);
  }

  // Otherwise, use rule-based analysis
  return generateRuleBasedProfile(lead, profileData);
}

// ---- Data Gathering ----

interface ProfileDataBundle {
  name: string;
  title: string;
  company: string;
  bio: string;
  allText: string;
  platforms: string[];
  followerCount: number;
  postCount: number;
  hasGitHub: boolean;
  hasLinkedIn: boolean;
  hasTwitter: boolean;
  githubData: Record<string, unknown>;
  skills: string[];
  interests: string[];
}

function gatherProfileData(lead: Lead): ProfileDataBundle {
  const allText: string[] = [];
  let followerCount = 0;
  let postCount = 0;
  let githubData: Record<string, unknown> = {};

  for (const profile of lead.socialProfiles) {
    if (profile.bio) allText.push(profile.bio);
    if (profile.followers) followerCount += profile.followers;
    if (profile.posts) postCount += profile.posts;
    if (profile.platform === 'github' && profile.rawData) {
      githubData = profile.rawData;
    }
  }

  if (lead.headline) allText.push(lead.headline);
  if (lead.title) allText.push(lead.title);
  if (lead.notes) allText.push(lead.notes);

  return {
    name: lead.fullName,
    title: lead.title || lead.headline || '',
    company: lead.company || '',
    bio: allText.join(' '),
    allText: allText.join('\n'),
    platforms: lead.socialProfiles.map((p) => p.platform),
    followerCount,
    postCount,
    hasGitHub: lead.socialProfiles.some((p) => p.platform === 'github'),
    hasLinkedIn: lead.socialProfiles.some((p) => p.platform === 'linkedin'),
    hasTwitter: lead.socialProfiles.some((p) => p.platform === 'twitter'),
    githubData,
    skills: lead.enrichment?.skills || [],
    interests: lead.enrichment?.interests || [],
  };
}

// ---- AI-Powered Profile Generation ----

async function generateAIProfile(
  lead: Lead,
  data: ProfileDataBundle,
  apiKey: string
): Promise<PsychologicalProfile> {
  const prompt = buildProfilePrompt(lead, data);

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini', // Cheapest capable model ~$0.15/1M tokens
      messages: [
        {
          role: 'system',
          content: `You are an expert behavioral psychologist and sales intelligence analyst.
You analyze publicly available social media data to create actionable psychological profiles for B2B outreach.
Always respond with valid JSON matching the exact schema requested. Be specific, actionable, and data-driven.
Base your analysis only on the data provided - never fabricate information.`,
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 3000,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`OpenAI API error: ${res.status} - ${error}`);
  }

  const result = await res.json();
  const content = result.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('No response from OpenAI');
  }

  try {
    const parsed = JSON.parse(content);
    return mapAIResponseToProfile(parsed, data);
  } catch {
    // If JSON parsing fails, fall back to rule-based
    return generateRuleBasedProfile(lead, data);
  }
}

function buildProfilePrompt(lead: Lead, data: ProfileDataBundle): string {
  const socialSummary = lead.socialProfiles
    .map((p) => {
      const parts = [`Platform: ${p.platform}`];
      if (p.username) parts.push(`Username: ${p.username}`);
      if (p.bio) parts.push(`Bio: ${p.bio}`);
      if (p.followers) parts.push(`Followers: ${p.followers}`);
      if (p.posts) parts.push(`Posts: ${p.posts}`);
      if (p.rawData) parts.push(`Extra data: ${JSON.stringify(p.rawData)}`);
      return parts.join(', ');
    })
    .join('\n');

  return `Analyze this person's publicly available social media data and create a comprehensive psychological profile.

PERSON:
Name: ${data.name}
Title: ${data.title}
Company: ${data.company}
Location: ${lead.location || 'Unknown'}
Industry: ${lead.industry || 'Unknown'}

SOCIAL MEDIA PROFILES:
${socialSummary}

COMBINED BIO/ABOUT TEXT:
${data.allText || 'No bio available'}

SKILLS: ${data.skills.join(', ') || 'Unknown'}
INTERESTS: ${data.interests.join(', ') || 'Unknown'}

Total followers across platforms: ${data.followerCount}
Active platforms: ${data.platforms.join(', ')}
${data.hasGitHub ? `GitHub repos: ${data.githubData.publicRepos || 'unknown'}, Followers: ${data.githubData.followers || 'unknown'}` : ''}

Please analyze and return a JSON object with this exact structure:
{
  "ocean": {
    "openness": { "score": <1-100>, "level": "<very_low|low|moderate|high|very_high>", "indicators": ["<evidence>"] },
    "conscientiousness": { "score": <1-100>, "level": "<same>", "indicators": ["<evidence>"] },
    "extraversion": { "score": <1-100>, "level": "<same>", "indicators": ["<evidence>"] },
    "agreeableness": { "score": <1-100>, "level": "<same>", "indicators": ["<evidence>"] },
    "neuroticism": { "score": <1-100>, "level": "<same>", "indicators": ["<evidence>"] }
  },
  "communicationStyle": {
    "primary": "<analytical|driver|expressive|amiable>",
    "secondary": "<same or null>",
    "preferredChannels": ["<email|linkedin|twitter|phone|etc>"],
    "tonePreference": "<formal|semi_formal|casual|mixed>",
    "detailOrientation": "<high|medium|low>",
    "responseSpeed": "<fast|moderate|deliberate>",
    "description": "<2-3 sentences>"
  },
  "decisionMaking": {
    "style": "<analytical|intuitive|collaborative|directive>",
    "riskTolerance": "<conservative|moderate|aggressive>",
    "influencers": ["<what influences their decisions>"],
    "decisionSpeed": "<fast|moderate|slow>",
    "description": "<2-3 sentences>"
  },
  "values": {
    "topValues": ["<value1>", "<value2>", "<value3>"],
    "motivators": ["<what drives them>"],
    "painPoints": ["<likely frustrations>"],
    "goals": ["<professional goals>"],
    "description": "<2-3 sentences>"
  },
  "professionalPersona": {
    "archetype": "<e.g., The Innovator, The Builder, The Strategist>",
    "strengths": ["<strength1>", "<strength2>"],
    "blindSpots": ["<blindspot1>"],
    "influenceStyle": "<description>",
    "networkingStyle": "<description>",
    "contentPreferences": ["<what content they engage with>"],
    "description": "<2-3 sentences>"
  },
  "outreachStrategy": {
    "bestApproach": "<description of ideal outreach approach>",
    "openingLines": ["<3 personalized opening lines>"],
    "topicsToLead": ["<topics that would engage them>"],
    "topicsToAvoid": ["<topics to avoid>"],
    "bestTimeToReach": "<when they're most responsive>",
    "followUpStrategy": "<how to follow up>",
    "personalizedHooks": ["<3 hooks based on their interests/profile>"]
  },
  "summary": "<3-4 sentence overall personality summary>",
  "keyInsights": ["<5 key actionable insights>"],
  "warnings": ["<any red flags or things to be careful about>"]
}`;
}

function mapAIResponseToProfile(
  ai: Record<string, unknown>,
  data: ProfileDataBundle
): PsychologicalProfile {
  const ocean = ai.ocean as OceanProfile;
  const comm = ai.communicationStyle as CommunicationStyle;
  const decision = ai.decisionMaking as DecisionMakingProfile;
  const values = ai.values as ValuesProfile;
  const persona = ai.professionalPersona as ProfessionalPersona;
  const outreach = ai.outreachStrategy as OutreachStrategy;

  return {
    generatedAt: new Date().toISOString(),
    confidence: calculateConfidence(data),
    dataSourcesUsed: data.platforms,
    ocean: ocean || generateDefaultOcean(),
    communicationStyle: comm || generateDefaultCommStyle(),
    decisionMaking: decision || generateDefaultDecisionMaking(),
    values: values || generateDefaultValues(),
    professionalPersona: persona || generateDefaultPersona(),
    outreachStrategy: outreach || generateDefaultOutreach(data),
    summary: (ai.summary as string) || `Profile for ${data.name}`,
    keyInsights: (ai.keyInsights as string[]) || [],
    warnings: (ai.warnings as string[]) || [],
  };
}

// ---- Rule-Based Profile Generation (No API needed) ----

function generateRuleBasedProfile(
  lead: Lead,
  data: ProfileDataBundle
): PsychologicalProfile {
  const textLower = data.allText.toLowerCase();

  return {
    generatedAt: new Date().toISOString(),
    confidence: Math.min(calculateConfidence(data), 60), // Cap at 60% without AI
    dataSourcesUsed: data.platforms,
    ocean: analyzeOcean(data, textLower),
    communicationStyle: analyzeCommunicationStyle(data, textLower),
    decisionMaking: analyzeDecisionMaking(data, textLower),
    values: analyzeValues(data, textLower),
    professionalPersona: analyzePersona(data, textLower),
    outreachStrategy: generateDefaultOutreach(data),
    summary: generateSummary(lead, data),
    keyInsights: generateInsights(data),
    warnings: generateWarnings(data),
  };
}

function analyzeOcean(data: ProfileDataBundle, text: string): OceanProfile {
  // Openness analysis
  const opennessIndicators: string[] = [];
  let opennessScore = 50;

  if (data.hasGitHub) { opennessScore += 10; opennessIndicators.push('Active on GitHub (open source)'); }
  if (data.platforms.length > 2) { opennessScore += 10; opennessIndicators.push('Active on multiple platforms'); }
  if (text.includes('innovat') || text.includes('creat')) { opennessScore += 10; opennessIndicators.push('Innovation-oriented language'); }
  if (text.includes('entrepreneur') || text.includes('founder')) { opennessScore += 10; opennessIndicators.push('Entrepreneurial'); }
  if (text.includes('learn') || text.includes('curious')) { opennessScore += 5; opennessIndicators.push('Learning-oriented'); }

  // Conscientiousness analysis
  const consIndicators: string[] = [];
  let consScore = 50;

  if (data.hasLinkedIn) { consScore += 10; consIndicators.push('Maintains LinkedIn profile'); }
  if ((data.githubData.publicRepos as number) > 20) { consScore += 10; consIndicators.push('Maintains many repositories'); }
  if (text.includes('detail') || text.includes('quality')) { consScore += 10; consIndicators.push('Detail-oriented language'); }
  if (text.includes('process') || text.includes('system')) { consScore += 5; consIndicators.push('Process-oriented'); }

  // Extraversion analysis
  const extIndicators: string[] = [];
  let extScore = 40;

  if (data.followerCount > 1000) { extScore += 15; extIndicators.push(`Large following (${data.followerCount})`); }
  if (data.hasTwitter) { extScore += 10; extIndicators.push('Active on Twitter'); }
  if (data.postCount > 100) { extScore += 10; extIndicators.push('Frequent poster'); }
  if (text.includes('speaker') || text.includes('present')) { extScore += 10; extIndicators.push('Public speaker'); }
  if (text.includes('community') || text.includes('team')) { extScore += 5; extIndicators.push('Community/team oriented'); }

  // Agreeableness analysis
  const agreeIndicators: string[] = [];
  let agreeScore = 50;

  if (text.includes('help') || text.includes('mentor')) { agreeScore += 10; agreeIndicators.push('Helping orientation'); }
  if (text.includes('open source') || text.includes('volunteer')) { agreeScore += 10; agreeIndicators.push('Contributes to community'); }
  if (text.includes('collaborat') || text.includes('together')) { agreeScore += 5; agreeIndicators.push('Collaborative language'); }

  // Neuroticism (inversely inferred - lower is better)
  const neuroIndicators: string[] = [];
  let neuroScore = 35;

  if (data.platforms.length > 3) { neuroScore -= 5; neuroIndicators.push('Broad platform presence suggests confidence'); }
  if (text.includes('passion') || text.includes('love')) { neuroScore += 5; neuroIndicators.push('Emotionally expressive'); }

  const toLevel = (score: number): TraitScore['level'] => {
    if (score >= 80) return 'very_high';
    if (score >= 60) return 'high';
    if (score >= 40) return 'moderate';
    if (score >= 20) return 'low';
    return 'very_low';
  };

  const clamp = (n: number) => Math.max(1, Math.min(100, n));

  return {
    openness: { score: clamp(opennessScore), level: toLevel(opennessScore), indicators: opennessIndicators.length ? opennessIndicators : ['Insufficient data'] },
    conscientiousness: { score: clamp(consScore), level: toLevel(consScore), indicators: consIndicators.length ? consIndicators : ['Insufficient data'] },
    extraversion: { score: clamp(extScore), level: toLevel(extScore), indicators: extIndicators.length ? extIndicators : ['Insufficient data'] },
    agreeableness: { score: clamp(agreeScore), level: toLevel(agreeScore), indicators: agreeIndicators.length ? agreeIndicators : ['Insufficient data'] },
    neuroticism: { score: clamp(neuroScore), level: toLevel(neuroScore), indicators: neuroIndicators.length ? neuroIndicators : ['Insufficient data'] },
  };
}

function analyzeCommunicationStyle(data: ProfileDataBundle, text: string): CommunicationStyle {
  let primary: CommunicationStyle['primary'] = 'analytical';
  let tonePreference: CommunicationStyle['tonePreference'] = 'semi_formal';

  const isDriver = text.includes('result') || text.includes('growth') || text.includes('scale') || text.includes('revenue');
  const isExpressive = data.hasTwitter && data.followerCount > 500;
  const isAmiable = text.includes('help') || text.includes('team') || text.includes('people');
  const isAnalytical = data.hasGitHub || text.includes('data') || text.includes('engineer');

  if (isDriver) primary = 'driver';
  else if (isExpressive) primary = 'expressive';
  else if (isAmiable) primary = 'amiable';
  else if (isAnalytical) primary = 'analytical';

  if (data.hasGitHub || text.includes('engineer') || text.includes('developer')) {
    tonePreference = 'casual';
  } else if (text.includes('executive') || text.includes('director') || text.includes('ceo')) {
    tonePreference = 'formal';
  }

  const channels: string[] = [];
  if (data.hasLinkedIn) channels.push('linkedin');
  if (data.hasTwitter) channels.push('twitter');
  channels.push('email');

  return {
    primary,
    preferredChannels: channels,
    tonePreference,
    detailOrientation: isAnalytical ? 'high' : isDriver ? 'low' : 'medium',
    responseSpeed: isDriver ? 'fast' : isAnalytical ? 'deliberate' : 'moderate',
    description: `Based on their ${data.platforms.join('/')} presence, ${data.name} appears to be a ${primary} communicator who prefers ${tonePreference.replace('_', '-')} interactions.`,
  };
}

function analyzeDecisionMaking(data: ProfileDataBundle, text: string): DecisionMakingProfile {
  let style: DecisionMakingProfile['style'] = 'analytical';
  let riskTolerance: DecisionMakingProfile['riskTolerance'] = 'moderate';

  if (text.includes('founder') || text.includes('entrepreneur') || text.includes('startup')) {
    style = 'directive';
    riskTolerance = 'aggressive';
  } else if (text.includes('team') || text.includes('collaborat')) {
    style = 'collaborative';
  } else if (text.includes('data') || text.includes('research') || text.includes('analys')) {
    style = 'analytical';
    riskTolerance = 'conservative';
  }

  return {
    style,
    riskTolerance,
    influencers: inferInfluencers(text),
    decisionSpeed: style === 'directive' ? 'fast' : style === 'analytical' ? 'slow' : 'moderate',
    description: `${data.name} likely makes ${style} decisions with ${riskTolerance} risk tolerance.`,
  };
}

function analyzeValues(data: ProfileDataBundle, text: string): ValuesProfile {
  const values: string[] = [];
  const motivators: string[] = [];
  const painPoints: string[] = [];
  const goals: string[] = [];

  if (text.includes('innovat') || text.includes('creat')) { values.push('Innovation'); motivators.push('Creating new solutions'); }
  if (text.includes('growth') || text.includes('scale')) { values.push('Growth'); motivators.push('Scaling impact'); }
  if (text.includes('quality') || text.includes('excel')) { values.push('Excellence'); motivators.push('Delivering quality'); }
  if (text.includes('help') || text.includes('impact')) { values.push('Impact'); motivators.push('Making a difference'); }
  if (text.includes('team') || text.includes('people')) { values.push('People'); motivators.push('Team success'); }
  if (text.includes('efficienc') || text.includes('automat')) { values.push('Efficiency'); motivators.push('Optimizing processes'); painPoints.push('Manual repetitive tasks'); }
  if (text.includes('learn') || text.includes('educ')) { values.push('Learning'); motivators.push('Continuous improvement'); }

  if (data.title.toLowerCase().includes('ceo') || data.title.toLowerCase().includes('founder')) {
    goals.push('Business growth', 'Market leadership');
    painPoints.push('Time constraints', 'Scaling challenges');
  }
  if (data.title.toLowerCase().includes('engineer') || data.title.toLowerCase().includes('developer')) {
    goals.push('Technical excellence', 'Building great products');
    painPoints.push('Technical debt', 'Poor tooling');
  }

  return {
    topValues: values.length ? values.slice(0, 5) : ['Professional growth', 'Impact'],
    motivators: motivators.length ? motivators : ['Career advancement'],
    painPoints: painPoints.length ? painPoints : ['Insufficient data to determine'],
    goals: goals.length ? goals : ['Professional success'],
    description: `${data.name} appears to value ${values.slice(0, 3).join(', ') || 'professional growth'}.`,
  };
}

function analyzePersona(data: ProfileDataBundle, text: string): ProfessionalPersona {
  let archetype = 'The Professional';

  if (text.includes('founder') || text.includes('ceo')) archetype = 'The Visionary Leader';
  else if (text.includes('engineer') || text.includes('developer')) archetype = 'The Builder';
  else if (text.includes('market') || text.includes('growth')) archetype = 'The Growth Driver';
  else if (text.includes('design') || text.includes('creat')) archetype = 'The Creative';
  else if (text.includes('consult') || text.includes('advis')) archetype = 'The Strategist';
  else if (text.includes('sales') || text.includes('business dev')) archetype = 'The Dealmaker';
  else if (text.includes('data') || text.includes('analys')) archetype = 'The Analyst';
  else if (text.includes('product')) archetype = 'The Product Thinker';

  return {
    archetype,
    strengths: inferStrengths(text, data),
    blindSpots: ['May overlook perspectives outside their domain'],
    influenceStyle: data.followerCount > 1000 ? 'Thought leader with broad reach' : 'Peer-level influence through expertise',
    networkingStyle: data.hasLinkedIn ? 'Professional networking on LinkedIn' : 'Selective networking',
    contentPreferences: inferContentPrefs(data),
    description: `${data.name} fits the "${archetype}" archetype, bringing ${inferStrengths(text, data).slice(0, 2).join(' and ')} to their work.`,
  };
}

// ---- Helper Functions ----

function calculateConfidence(data: ProfileDataBundle): number {
  let confidence = 20; // Base
  if (data.hasLinkedIn) confidence += 20;
  if (data.hasGitHub) confidence += 15;
  if (data.hasTwitter) confidence += 10;
  if (data.allText.length > 100) confidence += 15;
  if (data.skills.length > 0) confidence += 10;
  if (data.followerCount > 100) confidence += 5;
  if (data.platforms.length > 2) confidence += 5;
  return Math.min(confidence, 95);
}

function inferInfluencers(text: string): string[] {
  const influencers: string[] = [];
  if (text.includes('data') || text.includes('metric')) influencers.push('Data and metrics');
  if (text.includes('customer') || text.includes('user')) influencers.push('Customer feedback');
  if (text.includes('team') || text.includes('peer')) influencers.push('Team input');
  if (text.includes('roi') || text.includes('revenue')) influencers.push('Financial impact');
  if (text.includes('innovat') || text.includes('trend')) influencers.push('Industry trends');
  return influencers.length ? influencers : ['Industry best practices', 'Peer recommendations'];
}

function inferStrengths(text: string, data: ProfileDataBundle): string[] {
  const strengths: string[] = [];
  if (data.hasGitHub) strengths.push('Technical expertise');
  if (data.followerCount > 500) strengths.push('Strong personal brand');
  if (text.includes('lead') || text.includes('manag')) strengths.push('Leadership');
  if (text.includes('strateg')) strengths.push('Strategic thinking');
  if (text.includes('creat') || text.includes('design')) strengths.push('Creativity');
  return strengths.length ? strengths : ['Domain expertise'];
}

function inferContentPrefs(data: ProfileDataBundle): string[] {
  const prefs: string[] = [];
  if (data.hasGitHub) prefs.push('Technical tutorials', 'Open source projects');
  if (data.hasTwitter) prefs.push('Short-form insights', 'Industry news');
  if (data.hasLinkedIn) prefs.push('Professional articles', 'Case studies');
  return prefs.length ? prefs : ['Industry-relevant content'];
}

function generateSummary(lead: Lead, data: ProfileDataBundle): string {
  const role = data.title || 'professional';
  const at = data.company ? ` at ${data.company}` : '';
  const platforms = data.platforms.length > 0
    ? `Active on ${data.platforms.join(', ')}.`
    : 'Limited online presence found.';

  return `${data.name} is a ${role}${at}. ${platforms} Based on available data, they appear to be ${data.followerCount > 500 ? 'an influential' : 'a focused'} professional who values ${data.hasGitHub ? 'technical excellence and open collaboration' : 'professional growth and impact'}.`;
}

function generateInsights(data: ProfileDataBundle): string[] {
  const insights: string[] = [];

  if (data.hasGitHub) insights.push('Technical background - lead with product/tech value propositions');
  if (data.hasLinkedIn) insights.push('Professionally active on LinkedIn - good channel for outreach');
  if (data.hasTwitter) insights.push('Twitter presence - consider engaging with their content first');
  if (data.followerCount > 1000) insights.push('Strong following - they value thought leadership and credibility');
  if (data.title.toLowerCase().includes('ceo') || data.title.toLowerCase().includes('founder')) {
    insights.push('C-level/Founder - focus on ROI, time savings, and strategic value');
  }

  return insights.length ? insights : ['Limited data available - more research recommended'];
}

function generateWarnings(data: ProfileDataBundle): string[] {
  const warnings: string[] = [];
  if (data.platforms.length < 2) warnings.push('Limited social media data - profile confidence is low');
  if (!data.allText) warnings.push('No bio/about text found - personality analysis is speculative');
  if (data.followerCount > 10000) warnings.push('High-profile individual - approach with extra care and personalization');
  return warnings;
}

function generateDefaultOutreach(data: ProfileDataBundle): OutreachStrategy {
  const channel = data.hasLinkedIn ? 'LinkedIn' : data.hasTwitter ? 'Twitter' : 'email';

  return {
    bestApproach: `Reach out via ${channel} with a personalized message referencing their ${data.title || 'work'}`,
    openingLines: [
      `Hi ${data.name.split(' ')[0]}, I came across your ${data.hasGitHub ? 'work on GitHub' : 'profile'} and was impressed by your ${data.title || 'expertise'}.`,
      `${data.name.split(' ')[0]}, I noticed your work${data.company ? ` at ${data.company}` : ''} and thought you might be interested in...`,
      `Hi ${data.name.split(' ')[0]}, as a fellow ${data.title ? data.title.split(' ').slice(-1)[0] : 'professional'}, I wanted to reach out about...`,
    ],
    topicsToLead: data.hasGitHub
      ? ['Technology trends', 'Developer productivity', 'Open source']
      : ['Industry challenges', 'Growth strategies', 'Efficiency'],
    topicsToAvoid: ['Hard selling', 'Generic pitches', 'Irrelevant products'],
    bestTimeToReach: 'Tuesday-Thursday, 9-11 AM their local time',
    followUpStrategy: 'Wait 3-5 business days, then follow up with additional value (article, case study, relevant insight)',
    personalizedHooks: [
      `Reference their ${data.company ? 'work at ' + data.company : 'professional background'}`,
      `Mention a specific ${data.hasGitHub ? 'repo or project' : 'post or achievement'} of theirs`,
      `Connect through shared ${data.interests.length > 0 ? 'interest in ' + data.interests[0] : 'industry connections'}`,
    ],
  };
}

function generateDefaultOcean(): OceanProfile {
  const defaultTrait = (score: number): TraitScore => ({
    score,
    level: score >= 60 ? 'moderate' : 'moderate',
    indicators: ['Insufficient data for detailed analysis'],
  });

  return {
    openness: defaultTrait(50),
    conscientiousness: defaultTrait(50),
    extraversion: defaultTrait(50),
    agreeableness: defaultTrait(50),
    neuroticism: defaultTrait(35),
  };
}

function generateDefaultCommStyle(): CommunicationStyle {
  return {
    primary: 'analytical',
    preferredChannels: ['email', 'linkedin'],
    tonePreference: 'semi_formal',
    detailOrientation: 'medium',
    responseSpeed: 'moderate',
    description: 'Insufficient data for detailed communication analysis.',
  };
}

function generateDefaultDecisionMaking(): DecisionMakingProfile {
  return {
    style: 'analytical',
    riskTolerance: 'moderate',
    influencers: ['Data', 'Peer recommendations'],
    decisionSpeed: 'moderate',
    description: 'Insufficient data for detailed decision-making analysis.',
  };
}

function generateDefaultValues(): ValuesProfile {
  return {
    topValues: ['Professional growth'],
    motivators: ['Career advancement'],
    painPoints: ['Unknown - more data needed'],
    goals: ['Professional success'],
    description: 'Insufficient data for detailed values analysis.',
  };
}

function generateDefaultPersona(): ProfessionalPersona {
  return {
    archetype: 'The Professional',
    strengths: ['Domain expertise'],
    blindSpots: ['Unknown'],
    influenceStyle: 'Professional expertise',
    networkingStyle: 'Standard professional networking',
    contentPreferences: ['Industry-relevant content'],
    description: 'Insufficient data for detailed persona analysis.',
  };
}
