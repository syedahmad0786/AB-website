'use client';

import { useState, useEffect, useCallback } from 'react';
import { Lead, SearchResult, DashboardStats, SocialPlatform, LeadStatus } from '@/lib/leads/types';
import SearchPanel from './SearchPanel';
import LeadCard from './LeadCard';
import LeadDetailModal from './LeadDetailModal';

type Tab = 'search' | 'leads' | 'settings';

const PLATFORM_OPTIONS: { value: SocialPlatform; label: string }[] = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'github', label: 'GitHub' },
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'medium', label: 'Medium' },
  { value: 'reddit', label: 'Reddit' },
];

export default function LeadsDashboard() {
  const [tab, setTab] = useState<Tab>('search');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<LeadStatus | 'all'>('all');
  const [isLoading, setIsLoading] = useState(false);

  const fetchLeads = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (filterStatus !== 'all') params.set('status', filterStatus);

      const res = await fetch(`/api/leads?${params}`);
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    }
  }, [searchQuery, filterStatus]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/leads?action=stats');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, [fetchLeads, fetchStats]);

  const handleSaveResult = async (result: SearchResult) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_result', result }),
      });
      const data = await res.json();
      if (data.lead) {
        setLeads((prev) => [data.lead, ...prev]);
        fetchStats();
      }
    } catch (err) {
      console.error('Failed to save lead:', err);
    }
  };

  const handleSaveAll = async (results: SearchResult[]) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_results', results }),
      });
      const data = await res.json();
      if (data.leads) {
        setLeads((prev) => [...data.leads, ...prev]);
        fetchStats();
      }
    } catch (err) {
      console.error('Failed to save leads:', err);
    }
  };

  const handleEnrich = async (leadId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId }),
      });
      const data = await res.json();
      if (data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === data.lead.id ? data.lead : l)));
        if (selectedLead?.id === data.lead.id) setSelectedLead(data.lead);
        fetchStats();
      }
    } catch (err) {
      console.error('Enrichment failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfile = async (leadId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId }),
      });
      const data = await res.json();
      if (data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === data.lead.id ? data.lead : l)));
        if (selectedLead?.id === data.lead.id) setSelectedLead(data.lead);
        fetchStats();
      }
    } catch (err) {
      console.error('Profiling failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (leadId: string) => {
    try {
      await fetch(`/api/leads?id=${leadId}`, { method: 'DELETE' });
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      if (selectedLead?.id === leadId) setSelectedLead(null);
      fetchStats();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleStatusChange = async (leadId: string, status: LeadStatus) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, action: 'status', status }),
      });
      const data = await res.json();
      if (data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === data.lead.id ? data.lead : l)));
        if (selectedLead?.id === data.lead.id) setSelectedLead(data.lead);
      }
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const handleExport = async (format: 'csv' | 'json') => {
    window.open(`/api/leads/export?format=${format}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-surface pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
            LeadEngine AI
          </h1>
          <p className="text-white/50 mt-2 font-sans">
            Find leads, discover contacts, build psychological profiles
          </p>
        </div>

        {/* Stats Bar */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
            {[
              { label: 'Total Leads', value: stats.totalLeads, color: 'text-white' },
              { label: 'New', value: stats.newLeads, color: 'text-green-400' },
              { label: 'Enriched', value: stats.enrichedLeads, color: 'text-accent-blue' },
              { label: 'Profiled', value: stats.profiledLeads, color: 'text-accent-purple' },
              { label: 'Emails Found', value: stats.emailsFound, color: 'text-accent-cyan' },
              { label: 'Phones Found', value: stats.phonesFound, color: 'text-yellow-400' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-surface-100 border border-white/5 rounded-lg p-3 text-center"
              >
                <div className={`text-2xl font-mono font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 bg-surface-100 rounded-lg p-1 w-fit">
          {[
            { id: 'search' as Tab, label: 'Search Leads', icon: '>' },
            { id: 'leads' as Tab, label: `My Leads (${leads.length})`, icon: '#' },
            { id: 'settings' as Tab, label: 'Settings', icon: '*' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-md text-sm font-sans transition-all ${
                tab === t.id
                  ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <span className="font-mono mr-1.5 text-xs">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === 'search' && (
          <SearchPanel
            platforms={PLATFORM_OPTIONS}
            onSaveResult={handleSaveResult}
            onSaveAll={handleSaveAll}
          />
        )}

        {tab === 'leads' && (
          <div>
            {/* Filters & Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-100 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-purple/50 font-sans text-sm"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as LeadStatus | 'all')}
                className="bg-surface-100 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm font-sans focus:outline-none focus:border-accent-purple/50"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="archived">Archived</option>
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => handleExport('csv')}
                  className="px-3 py-2.5 bg-surface-100 border border-white/10 rounded-lg text-white/60 hover:text-white text-sm font-sans transition-colors"
                >
                  Export CSV
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="px-3 py-2.5 bg-surface-100 border border-white/10 rounded-lg text-white/60 hover:text-white text-sm font-sans transition-colors"
                >
                  Export JSON
                </button>
              </div>
            </div>

            {/* Lead Cards Grid */}
            {leads.length === 0 ? (
              <div className="text-center py-20 text-white/30 font-sans">
                <div className="text-4xl mb-4 font-mono">&gt;_</div>
                <p className="text-lg">No leads yet</p>
                <p className="text-sm mt-2">Search for leads to get started</p>
                <button
                  onClick={() => setTab('search')}
                  className="mt-4 px-6 py-2 bg-accent-purple/20 border border-accent-purple/30 rounded-lg text-accent-purple text-sm hover:bg-accent-purple/30 transition-colors"
                >
                  Start Searching
                </button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {leads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onView={() => setSelectedLead(lead)}
                    onEnrich={() => handleEnrich(lead.id)}
                    onProfile={() => handleProfile(lead.id)}
                    onDelete={() => handleDelete(lead.id)}
                    onStatusChange={(status) => handleStatusChange(lead.id, status)}
                    isLoading={isLoading}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'settings' && <SettingsPanel />}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onEnrich={() => handleEnrich(selectedLead.id)}
          onProfile={() => handleProfile(selectedLead.id)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

// ---- Settings Panel ----

function SettingsPanel() {
  const [keys, setKeys] = useState({
    serpApiKey: '',
    openaiApiKey: '',
    githubToken: '',
    hunterApiKey: '',
    proxycurlApiKey: '',
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leads/config')
      .then((r) => r.json())
      .then((data) => {
        if (data.keys) {
          setKeys((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(data.keys).map(([k, v]) => [k, v || ''])
            ),
          }));
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    try {
      await fetch('/api/leads/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keys }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save config:', err);
    }
  };

  if (loading) {
    return <div className="text-white/30 text-center py-10 font-sans">Loading configuration...</div>;
  }

  const fields = [
    {
      key: 'serpApiKey',
      label: 'SerpAPI Key',
      description: 'For Google search. Free: 100 searches/month.',
      link: 'https://serpapi.com',
    },
    {
      key: 'openaiApiKey',
      label: 'OpenAI API Key',
      description: 'For AI psychological profiling. Uses GPT-4o-mini (~$0.15/1M tokens).',
      link: 'https://platform.openai.com',
    },
    {
      key: 'githubToken',
      label: 'GitHub Token',
      description: 'For GitHub search & email discovery. Free: 5000 req/hour.',
      link: 'https://github.com/settings/tokens',
    },
    {
      key: 'hunterApiKey',
      label: 'Hunter.io Key',
      description: 'For email discovery. Free: 25 searches/month.',
      link: 'https://hunter.io',
    },
    {
      key: 'proxycurlApiKey',
      label: 'Proxycurl Key (Optional)',
      description: 'For LinkedIn profile enrichment. 10 free credits.',
      link: 'https://nubela.co/proxycurl',
    },
  ];

  return (
    <div className="max-w-2xl">
      <div className="bg-surface-100 border border-white/5 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-sans font-semibold text-white mb-1">API Keys Configuration</h2>
        <p className="text-white/40 text-sm font-sans mb-6">
          Configure your API keys to enable lead search and enrichment. All keys are stored locally and encrypted.
        </p>

        <div className="space-y-5">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-sans text-white/70 mb-1.5">
                {field.label}
              </label>
              <input
                type="password"
                value={keys[field.key as keyof typeof keys]}
                onChange={(e) => setKeys((prev) => ({ ...prev, [field.key]: e.target.value }))}
                placeholder={`Enter ${field.label}`}
                className="w-full bg-surface-200 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-purple/50 font-mono text-sm"
              />
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-white/30 font-sans">{field.description}</span>
                <a
                  href={field.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent-blue hover:text-accent-blue/80 font-sans"
                >
                  Get key &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="mt-6 px-6 py-2.5 bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg text-white font-sans text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {saved ? 'Saved!' : 'Save Configuration'}
        </button>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-surface-100 border border-white/5 rounded-xl p-6">
        <h2 className="text-lg font-sans font-semibold text-white mb-4">Monthly Cost Breakdown</h2>
        <div className="space-y-3 font-sans text-sm">
          {[
            { service: 'SerpAPI (Google Search)', cost: 'Free: 100/mo | $50/5000', tier: 'free' },
            { service: 'GitHub API', cost: 'Free: 5000 req/hour', tier: 'free' },
            { service: 'Hunter.io (Email)', cost: 'Free: 25/mo | $49/500', tier: 'free' },
            { service: 'OpenAI GPT-4o-mini', cost: '~$0.15 per 1M tokens', tier: 'cheap' },
            { service: 'DNS/MX Checks', cost: 'Free (Google DoH)', tier: 'free' },
            { service: 'Data Storage', cost: 'Free (local JSON)', tier: 'free' },
          ].map((item) => (
            <div key={item.service} className="flex items-center justify-between">
              <span className="text-white/60">{item.service}</span>
              <span
                className={
                  item.tier === 'free' ? 'text-green-400' : 'text-yellow-400'
                }
              >
                {item.cost}
              </span>
            </div>
          ))}
          <div className="border-t border-white/10 pt-3 mt-3 flex items-center justify-between font-medium">
            <span className="text-white">Estimated Monthly Total</span>
            <span className="text-green-400">$0 - $5 (typical usage)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
