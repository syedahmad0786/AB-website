import { NextRequest, NextResponse } from 'next/server';
import { exportLeadsToCsv, exportLeadsToJson } from '@/lib/leads/store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format') || 'csv';
    const ids = searchParams.get('ids')?.split(',').filter(Boolean);

    if (format === 'json') {
      const data = await exportLeadsToJson(ids);
      return new NextResponse(data, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="leads_${Date.now()}.json"`,
        },
      });
    }

    // Default to CSV
    const data = await exportLeadsToCsv(ids);
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="leads_${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
