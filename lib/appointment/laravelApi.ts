const DEFAULT_BASE = 'http://127.0.0.1:8000';

export function appointmentApiBase(): string {
  return (process.env.APPOINTMENT_API_BASE || DEFAULT_BASE).replace(/\/$/, '');
}

/**
 * The public calendar paths are not open on Laravel. They match the logged-in
 * client route `/appointments/{id}`, which answers 401. 404 means that lookup
 * is not published. Either way the website calendar can answer the visitor.
 */
export function publicCalendarClosed(response: Response): boolean {
  return response.status === 401 || response.status === 404;
}

/** Forward a public appointment request to the Laravel appointment system. Null when it is not running. */
export async function forwardToLaravel(path: string, init?: RequestInit): Promise<Response | null> {
  try {
    return await fetch(`${appointmentApiBase()}${path}`, {
      ...init,
      cache: 'no-store',
      signal: AbortSignal.timeout(12000),
    });
  } catch {
    return null;
  }
}
