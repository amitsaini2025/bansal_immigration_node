import { NextRequest, NextResponse } from 'next/server';
import { blockedDatesInRange } from '@/lib/appointment/availability';
import { forwardToLaravel } from '@/lib/appointment/laravelApi';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get('start_date') || '';
  const endDate = searchParams.get('end_date') || '';
  const location = searchParams.get('location') || 'melbourne';
  const serviceType = searchParams.get('service_type');
  const specificService = searchParams.get('specific_service');
  const isPaid = searchParams.get('is_paid') === '1' || searchParams.get('is_paid') === 'true';

  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate) || endDate < startDate) {
    return NextResponse.json({ success: false, message: 'Please choose a valid date range.' }, { status: 422 });
  }
  if (location !== 'melbourne' && location !== 'adelaide') {
    return NextResponse.json({ success: false, message: 'Please choose an office.' }, { status: 422 });
  }

  try {
    const forwarded = await forwardToLaravel(`/api/appointments/check-blocked-dates?${searchParams.toString()}`);
    if (forwarded) {
      const data = await forwarded.json().catch(() => ({ success: false, message: 'Could not check the calendar.' }));
      return NextResponse.json(data, { status: forwarded.status });
    }

    const blocked = await blockedDatesInRange({
      startDate,
      endDate,
      location,
      serviceType,
      specificService,
      isPaid,
    });
    return NextResponse.json({
      success: true,
      blocked_dates: blocked,
      start_date: startDate,
      end_date: endDate,
    });
  } catch (error) {
    console.error('check-blocked-dates', error);
    return NextResponse.json(
      { success: false, message: 'We could not check the calendar. Please try again.' },
      { status: 500 }
    );
  }
}
