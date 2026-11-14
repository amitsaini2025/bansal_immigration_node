import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Returns the visitor's country from the hosting platform's request headers (no third-party lookup).
 * Returns { country: null } when the host does not provide one (local development).
 */
export async function GET(request: Request) {
  const h = request.headers;
  const raw =
    h.get('x-vercel-ip-country') ||
    h.get('cf-ipcountry') ||
    h.get('cloudfront-viewer-country') ||
    h.get('x-country-code') ||
    '';
  const country = /^[A-Za-z]{2}$/.test(raw) && raw.toUpperCase() !== 'XX' ? raw.toUpperCase() : null;
  return NextResponse.json({ country }, { headers: { 'Cache-Control': 'no-store' } });
}
