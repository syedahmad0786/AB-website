'use client';

import { Lead, SocialPlatform, PsychologicalProfile, TraitScore } from '@/lib/leads/types';

interface LeadDetailModalProps {
  lead: Lead;
  onClose: () => void;
  onEnrich: () => void;
  onProfile: () => void;
  isLoading: boolean;
}

export default function LeadDetailModal({
  lead,
  onClose,
  onEnrich,
  onProfile,
  isLoading,
}: LeadDetailModalProps) {
  const platformColor = (platform: SocialPlatform): string => {
    const colors: Partial<Record<SocialPlatform, string>> = {
      linkedin: 'text-blue-400',
      github: 'text-gray-300',
      twitter: 'text-sky-400',
    };
    return colors[platform] || 'text-white/40';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 pb-10">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-surface-50 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-glow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-surface-200 text-white/40 hover:text-white transition-colors z-10"
        >
          x
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            {lead.avatarUrl ? (
              <img
                src={lead.avatarUrl}
                alt={lead.fullName}
                className="w-16 h-16 rounded-xl object-cover border border-white/10"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-sans font-bold text-lg">
                {lead.firstName[0]}{lead.lastName[0]}
              </div>
            )}

            <div>
              <h2 className="text-2xl font-serif font-bold text-white">{lead.fullName}</h2>
              {lead.title && <p className="text-white/50 font-sans mt-0.5">{lead.title}</p>}
              <div className="flex items-center gap-3 mt-2 text-xs text-white/30 font-sans">
                {lead.company && <span>@ {lead.company}</span>}
                {lead.location && <span># {lead.location}</span>}
                {lead.industry && <span>{lead.industry}</span>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={onEnrich}
              disabled={isLoading}
              className="px-5 py-2.5 bg-accent-cyan/10 border border-accent-cyan/20 rounded-lg text-accent-cyan text-sm font-sans hover:bg-accent-cyan/20 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Find Emails & Phones'}
            </button>
            <button
              onClick={onProfile}
              disabled={isLoading}
              className="px-5 py-2.5 bg-accent-purple/10 border border-accent-purple/20 rounded-lg text-accent-purple text-sm font-sans hover:bg-accent-purple/20 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Analyzing...' : 'Generate Psych Profile'}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Section title="Contact Information">
                {lead.emails.length > 0 ? (
                  <div className="space-y-2">
                    {lead.emails.map((email, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm text-accent-cyan font-mono">{email.email}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                            email.verified ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/30'
                          }`}>
                            {email.confidence}%
                          </span>
                          <span className="text-[10px] text-white/20 font-sans">{email.source}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-white/20 font-sans">
                    No emails found yet. Click &quot;Find Emails &amp; Phones&quot; to discover contacts.
                  </p>
                )}

                {lead.phones.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
                    {lead.phones.map((phone, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm text-yellow-400 font-mono">{phone.phone}</span>
                        <span className="text-xs text-white/20 font-sans">{phone.source}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Section>

              {/* Social Profiles */}
              <Section title="Social Profiles">
                <div className="space-y-2">
                  {lead.socialProfiles.map((profile, idx) => (
                    <a
                      key={idx}
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 bg-surface-200 rounded-lg hover:bg-surface-300 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold ${platformColor(profile.platform)}`}>
                          {profile.platform}
                        </span>
                        {profile.username && (
                          <span className="text-xs text-white/30 font-mono">@{profile.username}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-white/20 font-sans">
                        {profile.followers !== undefined && <span>{profile.followers} followers</span>}
                        <span className="group-hover:text-white/50 transition-colors">&rarr;</span>
                      </div>
                    </a>
                  ))}
                </div>
              </Section>

              {/* Enrichment Data */}
              {lead.enrichment && (
                <Section title="Enrichment Data">
                  {lead.enrichment.skills && lead.enrichment.skills.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-xs text-white/30 font-sans mb-1.5">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {lead.enrichment.skills.map((skill) => (
                          <span key={skill} className="text-[10px] font-sans px-2 py-0.5 bg-accent-blue/10 text-accent-blue/60 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {lead.enrichment.companyInfo && (
                    <div>
                      <h4 className="text-xs text-white/30 font-sans mb-1.5">Company</h4>
                      <p className="text-sm text-white/50 font-sans">
                        {lead.enrichment.companyInfo.name}
                        {lead.enrichment.companyInfo.size && ` (${lead.enrichment.companyInfo.size})`}
                        {lead.enrichment.companyInfo.industry && ` - ${lead.enrichment.companyInfo.industry}`}
                      </p>
                    </div>
                  )}
                </Section>
              )}
            </div>

            {/* Right Column - Psychological Profile */}
            <div className="space-y-6">
              {lead.psychProfile ? (
                <PsychProfileView profile={lead.psychProfile} />
              ) : (
                <Section title="Psychological Profile">
                  <div className="text-center py-8">
                    <div className="text-3xl font-mono text-white/10 mb-3">OCEAN</div>
                    <p className="text-xs text-white/20 font-sans">
                      Click &quot;Generate Psych Profile&quot; to analyze this lead&apos;s personality, communication style, and ideal outreach strategy.
                    </p>
                  </div>
                </Section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Section Component ----

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface-100 border border-white/5 rounded-xl p-4">
      <h3 className="text-sm font-sans font-medium text-white/70 mb-3">{title}</h3>
      {children}
    </div>
  );
}

// ---- Psychological Profile View ----

function PsychProfileView({ profile }: { profile: PsychologicalProfile }) {
  return (
    <>
      {/* Summary */}
      <Section title="Personality Summary">
        <p className="text-sm text-white/60 font-sans leading-relaxed">{profile.summary}</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] text-white/20 font-sans">Confidence:</span>
          <div className="flex-1 h-1.5 bg-surface-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"
              style={{ width: `${profile.confidence}%` }}
            />
          </div>
          <span className="text-xs text-white/30 font-mono">{profile.confidence}%</span>
        </div>
      </Section>

      {/* OCEAN */}
      <Section title="OCEAN Personality Traits">
        <div className="space-y-3">
          {[
            { key: 'openness', label: 'Openness', trait: profile.ocean.openness },
            { key: 'conscientiousness', label: 'Conscientiousness', trait: profile.ocean.conscientiousness },
            { key: 'extraversion', label: 'Extraversion', trait: profile.ocean.extraversion },
            { key: 'agreeableness', label: 'Agreeableness', trait: profile.ocean.agreeableness },
            { key: 'neuroticism', label: 'Neuroticism', trait: profile.ocean.neuroticism },
          ].map(({ key, label, trait }) => (
            <OceanBar key={key} label={label} trait={trait} />
          ))}
        </div>
      </Section>

      {/* Communication Style */}
      <Section title="Communication Style">
        <div className="space-y-2 text-sm font-sans">
          <div className="flex justify-between">
            <span className="text-white/40">Type</span>
            <span className="text-white/70 capitalize">{profile.communicationStyle.primary}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">Tone</span>
            <span className="text-white/70 capitalize">
              {profile.communicationStyle.tonePreference.replace('_', ' ')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">Detail</span>
            <span className="text-white/70 capitalize">{profile.communicationStyle.detailOrientation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">Speed</span>
            <span className="text-white/70 capitalize">{profile.communicationStyle.responseSpeed}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">Channels</span>
            <span className="text-white/70">{profile.communicationStyle.preferredChannels.join(', ')}</span>
          </div>
        </div>
        {profile.communicationStyle.description && (
          <p className="text-xs text-white/30 font-sans mt-3">{profile.communicationStyle.description}</p>
        )}
      </Section>

      {/* Decision Making */}
      <Section title="Decision Making">
        <div className="space-y-2 text-sm font-sans">
          <div className="flex justify-between">
            <span className="text-white/40">Style</span>
            <span className="text-white/70 capitalize">{profile.decisionMaking.style}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">Risk Tolerance</span>
            <span className="text-white/70 capitalize">{profile.decisionMaking.riskTolerance}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">Speed</span>
            <span className="text-white/70 capitalize">{profile.decisionMaking.decisionSpeed}</span>
          </div>
        </div>
        {profile.decisionMaking.influencers.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/5">
            <span className="text-xs text-white/30 font-sans">Influenced by:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {profile.decisionMaking.influencers.map((inf) => (
                <span key={inf} className="text-[10px] font-sans px-2 py-0.5 bg-accent-blue/10 text-accent-blue/60 rounded">
                  {inf}
                </span>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* Values & Motivators */}
      <Section title="Values & Motivators">
        <div className="space-y-3">
          <div>
            <span className="text-xs text-white/30 font-sans">Core Values</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {profile.values.topValues.map((v) => (
                <span key={v} className="text-[10px] font-sans px-2 py-0.5 bg-green-500/10 text-green-400/70 rounded">
                  {v}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs text-white/30 font-sans">Motivators</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {profile.values.motivators.map((m) => (
                <span key={m} className="text-[10px] font-sans px-2 py-0.5 bg-accent-purple/10 text-accent-purple/70 rounded">
                  {m}
                </span>
              ))}
            </div>
          </div>
          {profile.values.painPoints.length > 0 && (
            <div>
              <span className="text-xs text-white/30 font-sans">Pain Points</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {profile.values.painPoints.map((p) => (
                  <span key={p} className="text-[10px] font-sans px-2 py-0.5 bg-red-500/10 text-red-400/70 rounded">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Professional Persona */}
      <Section title="Professional Persona">
        <div className="mb-3">
          <span className="text-lg font-serif font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
            {profile.professionalPersona.archetype}
          </span>
        </div>
        <div className="space-y-2 text-sm font-sans">
          <div>
            <span className="text-xs text-white/30">Strengths:</span>
            <span className="text-white/60 ml-2">{profile.professionalPersona.strengths.join(', ')}</span>
          </div>
          <div>
            <span className="text-xs text-white/30">Influence:</span>
            <span className="text-white/60 ml-2">{profile.professionalPersona.influenceStyle}</span>
          </div>
        </div>
      </Section>

      {/* Outreach Strategy */}
      <Section title="Outreach Strategy">
        <div className="space-y-4">
          <div>
            <span className="text-xs text-white/30 font-sans">Best Approach</span>
            <p className="text-sm text-white/60 font-sans mt-1">{profile.outreachStrategy.bestApproach}</p>
          </div>

          <div>
            <span className="text-xs text-white/30 font-sans">Opening Lines</span>
            <div className="space-y-2 mt-1">
              {profile.outreachStrategy.openingLines.map((line, idx) => (
                <div
                  key={idx}
                  className="text-xs text-white/50 font-sans p-2 bg-surface-200 rounded-lg border border-white/5 italic"
                >
                  &quot;{line}&quot;
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs text-white/30 font-sans">Topics to Lead With</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {profile.outreachStrategy.topicsToLead.map((t) => (
                <span key={t} className="text-[10px] font-sans px-2 py-0.5 bg-green-500/10 text-green-400/60 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {profile.outreachStrategy.topicsToAvoid.length > 0 && (
            <div>
              <span className="text-xs text-white/30 font-sans">Topics to Avoid</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {profile.outreachStrategy.topicsToAvoid.map((t) => (
                  <span key={t} className="text-[10px] font-sans px-2 py-0.5 bg-red-500/10 text-red-400/60 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <span className="text-xs text-white/30 font-sans">Follow-up</span>
            <p className="text-xs text-white/40 font-sans mt-1">{profile.outreachStrategy.followUpStrategy}</p>
          </div>

          <div>
            <span className="text-xs text-white/30 font-sans">Best Time</span>
            <p className="text-xs text-white/40 font-sans mt-1">{profile.outreachStrategy.bestTimeToReach}</p>
          </div>
        </div>
      </Section>

      {/* Key Insights */}
      {profile.keyInsights.length > 0 && (
        <Section title="Key Insights">
          <ul className="space-y-1.5">
            {profile.keyInsights.map((insight, idx) => (
              <li key={idx} className="text-xs text-white/50 font-sans flex items-start gap-2">
                <span className="text-accent-cyan font-mono shrink-0">-&gt;</span>
                {insight}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Warnings */}
      {profile.warnings.length > 0 && (
        <Section title="Warnings">
          <ul className="space-y-1.5">
            {profile.warnings.map((warning, idx) => (
              <li key={idx} className="text-xs text-yellow-400/60 font-sans flex items-start gap-2">
                <span className="text-yellow-400 font-mono shrink-0">!!</span>
                {warning}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}

// ---- OCEAN Bar Chart ----

function OceanBar({ label, trait }: { label: string; trait: TraitScore }) {
  const color =
    trait.score >= 70
      ? 'from-green-500 to-emerald-500'
      : trait.score >= 40
      ? 'from-accent-blue to-accent-purple'
      : 'from-orange-500 to-red-500';

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-white/50 font-sans">{label}</span>
        <span className="text-xs text-white/30 font-mono">{trait.score}</span>
      </div>
      <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-500`}
          style={{ width: `${trait.score}%` }}
        />
      </div>
      {trait.indicators.length > 0 && trait.indicators[0] !== 'Insufficient data' && (
        <div className="flex flex-wrap gap-1 mt-1">
          {trait.indicators.slice(0, 2).map((ind) => (
            <span key={ind} className="text-[9px] text-white/20 font-sans">
              {ind}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
