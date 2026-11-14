'use client';

import React, { useEffect, useState } from 'react';

/** Shows "Open now" or when the office next opens, using the office's own time zone. Hours: Mon to Fri, 9:30 am to 6:00 pm. */
export default function OfficeStatus({ timeZone }: { timeZone: string }) {
  const [text, setText] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    const compute = () => {
      const parts = new Intl.DateTimeFormat('en-AU', {
        timeZone,
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      }).formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
      const day = get('weekday');
      const mins = (parseInt(get('hour'), 10) % 24) * 60 + parseInt(get('minute'), 10);
      const weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day);
      const opens = 9 * 60 + 30;
      const closes = 18 * 60;
      if (weekday && mins >= opens && mins < closes) {
        setText({ open: true, label: 'Open now, closes 6:00 pm' });
      } else if (weekday && mins < opens) {
        setText({ open: false, label: 'Closed, opens today at 9:30 am' });
      } else if (day === 'Fri' || day === 'Sat' || day === 'Sun') {
        setText({ open: false, label: 'Closed, opens Monday at 9:30 am' });
      } else {
        setText({ open: false, label: 'Closed, opens tomorrow at 9:30 am' });
      }
    };
    compute();
    const id = setInterval(compute, 60000);
    return () => clearInterval(id);
  }, [timeZone]);

  if (!text) return <span className="inline-block h-5" aria-hidden="true" />;
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
      <span
        aria-hidden="true"
        className={`w-2.5 h-2.5 rounded-full ${text.open ? 'bg-emerald-500' : 'bg-slate-400'}`}
      />
      {text.label}
    </span>
  );
}
