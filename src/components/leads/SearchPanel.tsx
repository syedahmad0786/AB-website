'use client';

import { useState } from 'react';
import { SearchResult, SocialPlatform } from '@/lib/leads/types';

interface SearchPanelProps {
  platforms: { value: SocialPlatform; label: string }[];
  onSaveResult: (result: SearchResult) => void;
  onSaveAll: (results: SearchResult[]) => void;
}

export default function SearchPanel({ platforms, onSaveResult, onSaveAll }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([
    'linkedin',
    'github',
    'twitter',
  ]);
  const [filters, setFilters] = useState({
    title: '',
    company: '',
    location: '',
    industry: '',
  });
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const togglePlatform = (platform: SocialPlatform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setError('');
    setResults([]);

    try {
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v.trim())
      );

      const res = await fetch('/api/leads/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query.trim(),
          platforms: selectedPlatforms,
          filters: Object.keys(activeFilters).length > 0 ? activeFilters : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Search failed');
        return;
      }

      setResults(data.results || []);
      if (data.results?.length === 0) {
        setError('No results found. Try different search terms or configure API keys in Settings.');
      }
    } catch (err) {
      setError(`Search failed: ${err}`);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSave = (result: SearchResult) => {
    onSaveResult(result);
    setSavedIds((prev) => new Set([...prev, result.url]));
  };

  const handleSaveAll = () => {
    const unsaved = results.filter((r) => !savedIds.has(r.url));
    onSaveAll(unsaved);
    setSavedIds(new Set(results.map((r) => r.url)));
  };

  const platformIcon = (platform: SocialPlatform): string => {
    const icons: Partial<Record<SocialPlatform, string>> = {
      linkedin: 'in',
      github: 'GH',
      twitter: 'X',
      facebook: 'fb',
      medium: 'M',
      reddit: 'r/',
    };
    return icons[platform] || platform[0]?.toUpperCase() || '?';
  };

  const platformColor = (platform: SocialPlatform): string => {
    const colors: Partial<Record<SocialPlatform, string>> = {
      linkedin: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
      github: 'bg-gray-600/20 text-gray-300 border-gray-500/30',
      twitter: 'bg-sky-600/20 text-sky-400 border-sky-500/30',
      facebook: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30',
      medium: 'bg-green-600/20 text-green-400 border-green-500/30',
      reddit: 'bg-orange-600/20 text-orange-400 border-orange-500/30',
    };
    return colors[platform] || 'bg-white/10 text-white/60 border-white/20';
  };

  return (
    <div>
      {/* Search Box */}
      <div className="bg-surface-100 border border-white/5 rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for leads... (e.g., 'AI engineer San Francisco' or 'CEO SaaS startup')"
              className="w-full bg-surface-200 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-accent-purple/50 font-sans text-sm"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
            className="px-8 py-3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg text-white font-sans text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isSearching ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Searching...
              </span>
            ) : (
              'Search Leads'
            )}
          </button>
        </div>

        {/* Platform Selector */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-xs text-white/40 font-sans mr-1">Platforms:</span>
          {platforms.map((p) => (
            <button
              key={p.value}
              onClick={() => togglePlatform(p.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-sans transition-all border ${
                selectedPlatforms.includes(p.value)
                  ? platformColor(p.value)
                  : 'bg-surface-200 text-white/30 border-white/5 hover:text-white/50'
              }`}
            >
              <span className="font-mono mr-1">{platformIcon(p.value)}</span>
              {p.label}
            </button>
          ))}
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mt-3 text-xs text-white/40 hover:text-white/60 font-sans transition-colors"
        >
          {showFilters ? '- Hide' : '+ Show'} advanced filters
        </button>

        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            {[
              { key: 'title', placeholder: 'Job Title (e.g., CTO)' },
              { key: 'company', placeholder: 'Company' },
              { key: 'location', placeholder: 'Location' },
              { key: 'industry', placeholder: 'Industry' },
            ].map((f) => (
              <input
                key={f.key}
                type="text"
                placeholder={f.placeholder}
                value={filters[f.key as keyof typeof filters]}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, [f.key]: e.target.value }))
                }
                className="bg-surface-200 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-purple/50 font-sans text-xs"
              />
            ))}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-red-400 text-sm font-sans">
          {error}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-sans text-white/60">
              Found <span className="text-white font-medium">{results.length}</span> results
            </h3>
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 bg-accent-purple/20 border border-accent-purple/30 rounded-lg text-accent-purple text-xs font-sans hover:bg-accent-purple/30 transition-colors"
            >
              Save All to Leads
            </button>
          </div>

          <div className="space-y-3">
            {results.map((result, idx) => (
              <div
                key={`${result.url}-${idx}`}
                className="bg-surface-100 border border-white/5 rounded-lg p-4 hover:border-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Platform Badge */}
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 border ${platformColor(
                        result.platform
                      )}`}
                    >
                      {platformIcon(result.platform)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-sans font-medium truncate">
                          {result.name}
                        </h4>
                        <span className="text-xs text-white/30 font-mono">
                          {result.confidence}%
                        </span>
                      </div>

                      {result.title && (
                        <p className="text-sm text-white/50 font-sans truncate mt-0.5">
                          {result.title}
                        </p>
                      )}

                      <div className="flex items-center gap-3 mt-1 text-xs text-white/30 font-sans">
                        {result.company && <span>{result.company}</span>}
                        {result.location && <span>{result.location}</span>}
                        {result.email && (
                          <span className="text-accent-cyan">{result.email}</span>
                        )}
                      </div>

                      {result.snippet && (
                        <p className="text-xs text-white/25 mt-1.5 line-clamp-2 font-sans">
                          {result.snippet}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-surface-200 border border-white/10 rounded-md text-white/50 hover:text-white text-xs font-sans transition-colors"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleSave(result)}
                      disabled={savedIds.has(result.url)}
                      className={`px-3 py-1.5 rounded-md text-xs font-sans transition-colors ${
                        savedIds.has(result.url)
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30 hover:bg-accent-purple/30'
                      }`}
                    >
                      {savedIds.has(result.url) ? 'Saved' : '+ Save'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isSearching && results.length === 0 && !error && (
        <div className="text-center py-16 text-white/20 font-sans">
          <div className="text-5xl mb-4 font-mono">&gt;_</div>
          <p className="text-lg">Search for leads across platforms</p>
          <p className="text-sm mt-2 max-w-md mx-auto text-white/15">
            Try searches like &quot;AI engineer San Francisco&quot;, &quot;SaaS founder&quot;, or &quot;marketing director New York&quot;
          </p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {[
              'AI engineer Bay Area',
              'SaaS CEO Series A',
              'VP Marketing fintech',
              'CTO healthcare startup',
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion);
                }}
                className="px-3 py-1.5 bg-surface-100 border border-white/5 rounded-lg text-white/30 hover:text-white/50 text-xs font-sans transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
