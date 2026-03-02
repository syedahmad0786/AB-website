'use client';

import { Lead, LeadStatus, SocialPlatform } from '@/lib/leads/types';

interface LeadCardProps {
  lead: Lead;
  onView: () => void;
  onEnrich: () => void;
  onProfile: () => void;
  onDelete: () => void;
  onStatusChange: (status: LeadStatus) => void;
  isLoading: boolean;
}

const statusConfig: Record<LeadStatus, { label: string; color: string }> = {
  new: { label: 'New', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  contacted: { label: 'Contacted', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  qualified: { label: 'Qualified', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  converted: { label: 'Converted', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  archived: { label: 'Archived', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
};

const platformColors: Partial<Record<SocialPlatform, string>> = {
  linkedin: 'text-blue-400',
  github: 'text-gray-300',
  twitter: 'text-sky-400',
  facebook: 'text-indigo-400',
  medium: 'text-green-400',
  reddit: 'text-orange-400',
};

export default function LeadCard({
  lead,
  onView,
  onEnrich,
  onProfile,
  onDelete,
  onStatusChange,
  isLoading,
}: LeadCardProps) {
  const primaryEmail = lead.emails[0];
  const primaryPhone = lead.phones[0];
  const status = statusConfig[lead.status];

  return (
    <div className="bg-surface-100 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 min-w-0">
          {lead.avatarUrl ? (
            <img
              src={lead.avatarUrl}
              alt={lead.fullName}
              className="w-10 h-10 rounded-full object-cover border border-white/10"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-sans font-bold text-sm">
              {lead.firstName[0]}{lead.lastName[0]}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-white font-sans font-medium truncate">{lead.fullName}</h3>
            {lead.title && (
              <p className="text-xs text-white/40 font-sans truncate">{lead.title}</p>
            )}
          </div>
        </div>

        {/* Score */}
        <div
          className={`text-xs font-mono font-bold px-2 py-1 rounded-md ${
            lead.score >= 70
              ? 'bg-green-500/20 text-green-400'
              : lead.score >= 40
              ? 'bg-yellow-500/20 text-yellow-400'
              : 'bg-white/5 text-white/30'
          }`}
        >
          {lead.score}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1.5 mb-3">
        {lead.company && (
          <div className="text-xs text-white/40 font-sans flex items-center gap-1.5">
            <span className="text-white/20 font-mono text-[10px]">@</span>
            {lead.company}
          </div>
        )}
        {lead.location && (
          <div className="text-xs text-white/40 font-sans flex items-center gap-1.5">
            <span className="text-white/20 font-mono text-[10px]">#</span>
            {lead.location}
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="space-y-1 mb-3">
        {primaryEmail && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-accent-cyan font-mono truncate">{primaryEmail.email}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                primaryEmail.verified
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-white/5 text-white/30'
              }`}
            >
              {primaryEmail.confidence}%
            </span>
          </div>
        )}
        {primaryPhone && (
          <div className="text-xs text-yellow-400 font-mono">{primaryPhone.phone}</div>
        )}
      </div>

      {/* Social Profiles */}
      <div className="flex items-center gap-1.5 mb-4">
        {lead.socialProfiles.map((profile, idx) => (
          <a
            key={idx}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs font-mono px-2 py-1 bg-surface-200 rounded border border-white/5 hover:border-white/20 transition-colors ${
              platformColors[profile.platform] || 'text-white/40'
            }`}
          >
            {profile.platform}
          </a>
        ))}
      </div>

      {/* Tags */}
      {lead.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {lead.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-sans px-2 py-0.5 bg-accent-purple/10 text-accent-purple/60 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Status + Psych Badge */}
      <div className="flex items-center gap-2 mb-4">
        <select
          value={lead.status}
          onChange={(e) => onStatusChange(e.target.value as LeadStatus)}
          className={`text-xs font-sans px-2 py-1 rounded border cursor-pointer bg-transparent ${status.color}`}
        >
          {Object.entries(statusConfig).map(([key, cfg]) => (
            <option key={key} value={key} className="bg-surface-200 text-white">
              {cfg.label}
            </option>
          ))}
        </select>

        {lead.psychProfile && (
          <span className="text-[10px] font-sans px-2 py-1 bg-accent-purple/10 text-accent-purple border border-accent-purple/20 rounded">
            {lead.psychProfile.communicationStyle?.primary || 'Profiled'}
          </span>
        )}

        {lead.enrichment && (
          <span className="text-[10px] font-sans px-2 py-1 bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 rounded">
            Enriched
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
        <button
          onClick={onView}
          className="flex-1 px-3 py-2 bg-surface-200 border border-white/10 rounded-lg text-white/60 hover:text-white text-xs font-sans transition-colors text-center"
        >
          View Profile
        </button>
        <button
          onClick={onEnrich}
          disabled={isLoading}
          className="px-3 py-2 bg-accent-cyan/10 border border-accent-cyan/20 rounded-lg text-accent-cyan text-xs font-sans hover:bg-accent-cyan/20 transition-colors disabled:opacity-50"
        >
          Enrich
        </button>
        <button
          onClick={onProfile}
          disabled={isLoading}
          className="px-3 py-2 bg-accent-purple/10 border border-accent-purple/20 rounded-lg text-accent-purple text-xs font-sans hover:bg-accent-purple/20 transition-colors disabled:opacity-50"
        >
          Profile
        </button>
        <button
          onClick={onDelete}
          className="px-2 py-2 text-red-400/40 hover:text-red-400 text-xs transition-colors"
          title="Delete"
        >
          x
        </button>
      </div>
    </div>
  );
}
