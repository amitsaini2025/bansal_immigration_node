import { NextRequest, NextResponse } from 'next/server';
import { searchOccupations } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const limit = Math.min(Number(searchParams.get('limit')) || 20, 50);

    if (!q || q.trim().length < 2) {
      return NextResponse.json({
        success: false,
        message: 'Search query must be at least 2 characters',
        data: [],
        count: 0,
      }, { status: 400 });
    }

    const data = await searchOccupations(q, limit);

    return NextResponse.json({
      success: true,
      data,
      count: data.length,
    });
  } catch (error) {
    console.error('Anzsco search error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to search occupations',
      data: [],
      count: 0,
    }, { status: 500 });
  }
}
