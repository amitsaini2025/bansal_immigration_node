import { NextRequest, NextResponse } from 'next/server';
import { slotsForDate } from '@/lib/appointment/availability';
import { forwardToLaravel, publicCalendarClosed } from '@/lib/appointment/laravelApi';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date') || '';
  const location = searchParams.get('location') || 'melbourne';
  const serviceType = searchParams.get('service_type');
  const specificService = searchParams.get('specific_service');
  const isPaid = searchParams.get('is_paid') === '1' || searchParams.get('is_paid') === 'true';

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ success: false, message: 'Please choose a valid date.' }, { status: 422 });
  }
  if (location !== 'melbourne' && location !== 'adelaide') {
    return NextResponse.json({ success: false, message: 'Please choose an office.' }, { status: 422 });
  }

  try {
    const forwarded = await forwardToLaravel(`/api/appointments/available-slots?${searchParams.toString()}`);
    if (forwarded && !publicCalendarClosed(forwarded)) {
      const data = await forwarded.json().catch(() => ({ success: false, message: 'Could not load appointment times.' }));
      return NextResponse.json(data, { status: forwarded.status });
    }
    await forwarded?.body?.cancel().catch(() => undefined);

    const data = await slotsForDate({
      date,
      location,
      serviceType,
      specificService,
      isPaid,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('available-slots', error);
    return NextResponse.json(
      { success: false, message: 'We could not load appointment times. Please try again.' },
      { status: 500 }
    );
  }
}
