import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

interface SuburbSuggestRow extends RowDataPacket {
  suburb: string;
  postcode: number;
  state: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() || '';

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  if (q.length > 100) {
    return NextResponse.json({ error: 'Search query too long' }, { status: 400 });
  }

  try {
    const db = getDb();
    let rows: SuburbSuggestRow[] = [];

    if (/^\d+$/.test(q)) {
      const [res] = await db.execute<SuburbSuggestRow[]>(
        'SELECT suburb, postcode, state FROM suburbs WHERE postcode LIKE ? ORDER BY postcode ASC, suburb ASC LIMIT 15',
        [`${q}%`]
      );
      rows = res;
    } else {
      const [res] = await db.execute<SuburbSuggestRow[]>(
        'SELECT suburb, postcode, state FROM suburbs WHERE suburb LIKE ? ORDER BY suburb ASC LIMIT 15',
        [`%${q}%`]
      );
      rows = res;
    }

    const payload = rows.map((r) => ({
      suburb: r.suburb,
      postcode: String(r.postcode),
      state: r.state,
    }));

    return NextResponse.json(payload);
  } catch (error) {
    console.error('Error suggesting postcode:', error);
    return NextResponse.json({ error: 'Failed to suggest postcodes' }, { status: 500 });
  }
}
