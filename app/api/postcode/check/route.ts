import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

interface SuburbRow extends RowDataPacket {
  suburb: string;
  postcode: number;
  state: string;
}

interface RangeRow extends RowDataPacket {
  category: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.trim() || '';

  if (!search) {
    return NextResponse.json([]);
  }

  try {
    const db = getDb();
    let suburbs: SuburbRow[] = [];

    if (/^\d+$/.test(search)) {
      const pc = parseInt(search, 10);
      const [rows] = await db.execute<SuburbRow[]>(
        'SELECT suburb, postcode, state FROM suburbs WHERE postcode = ? ORDER BY suburb ASC LIMIT 50',
        [pc]
      );
      suburbs = rows;
    } else {
      const [rows] = await db.execute<SuburbRow[]>(
        'SELECT suburb, postcode, state FROM suburbs WHERE suburb LIKE ? ORDER BY suburb ASC LIMIT 50',
        [`%${search}%`]
      );
      suburbs = rows;
    }

    if (suburbs.length === 0) {
      // If it's a numeric postcode not in the suburbs table, still check if it falls in a range
      if (/^\d{4}$/.test(search)) {
        const pc = parseInt(search, 10);
        const [ranges] = await db.execute<RangeRow[]>(
          'SELECT category FROM postcode_ranges WHERE start_postcode <= ? AND end_postcode >= ? ORDER BY start_postcode ASC LIMIT 1',
          [pc, pc]
        );
        const category = ranges[0]?.category || 'Category 1, Not Regional – Major Cities';
        const regional = category.includes('Category 2') || category.includes('Category 3');
        return NextResponse.json([
          {
            suburb: 'General Area',
            postcode: String(pc),
            state: 'Australia',
            category,
            regional,
          },
        ]);
      }
      return NextResponse.json([]);
    }

    // Cache ranges to avoid repeated queries
    const results = await Promise.all(
      suburbs.map(async (s) => {
        const [ranges] = await db.execute<RangeRow[]>(
          'SELECT category FROM postcode_ranges WHERE start_postcode <= ? AND end_postcode >= ? ORDER BY start_postcode ASC LIMIT 1',
          [s.postcode, s.postcode]
        );
        const category = ranges[0]?.category || 'Category 1, Not Regional – Major Cities';
        const regional = category.includes('Category 2') || category.includes('Category 3');

        return {
          suburb: s.suburb,
          postcode: String(s.postcode),
          state: s.state,
          category,
          regional,
        };
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error checking postcode:', error);
    return NextResponse.json({ error: 'Failed to check postcode' }, { status: 500 });
  }
}
