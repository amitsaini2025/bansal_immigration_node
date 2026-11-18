const DEFAULT_BASE = 'http://127.0.0.1:8000';

export function appointmentApiBase(): string {
  return (process.env.APPOINTMENT_API_BASE || DEFAULT_BASE).replace(/\/$/, '');
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
