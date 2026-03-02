import { NextRequest, NextResponse } from 'next/server';
import { searchLeads } from '@/lib/leads/search-engines';
import { getApiKeys } from '@/lib/leads/store';
import { SocialPlatform, SearchFilters } from '@/lib/leads/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      query,
      platforms = ['linkedin', 'github', 'twitter'],
      filters,
    } = body as {
      query: string;
      platforms?: SocialPlatform[];
      filters?: SearchFilters;
    };

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Search query must be at least 2 characters' },
        { status: 400 }
      );
    }

    const apiKeys = await getApiKeys();
    const results = await searchLeads(query, platforms, filters, apiKeys);

    return NextResponse.json({
      results,
      count: results.length,
      query,
      platforms,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed', details: String(error) },
      { status: 500 }
    );
  }
}
