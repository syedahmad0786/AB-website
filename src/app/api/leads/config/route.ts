import { NextRequest, NextResponse } from 'next/server';
import { getApiKeys, saveApiKeys } from '@/lib/leads/store';
import { ApiKeysConfig } from '@/lib/leads/types';

export async function GET() {
  try {
    const keys = await getApiKeys();
    // Mask keys for security - only show last 4 chars
    const masked: Record<string, string | null> = {};
    for (const [key, value] of Object.entries(keys)) {
      if (value && value.length > 4) {
        masked[key] = '••••••••' + value.slice(-4);
      } else {
        masked[key] = null;
      }
    }
    return NextResponse.json({ keys: masked });
  } catch (error) {
    console.error('Config get error:', error);
    return NextResponse.json({ error: 'Failed to get config' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const keys = body.keys as Partial<ApiKeysConfig>;

    // Only save non-empty keys that aren't masked
    const toSave: Partial<ApiKeysConfig> = {};
    for (const [key, value] of Object.entries(keys)) {
      if (value && typeof value === 'string' && !value.startsWith('••••')) {
        (toSave as Record<string, string>)[key] = value;
      }
    }

    await saveApiKeys(toSave);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Config save error:', error);
    return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
  }
}
