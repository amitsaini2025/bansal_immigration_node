'use client';

import { useEffect, useRef, useState } from 'react';
import { useTurnstileSiteKey } from '@/components/forms/TurnstileSiteKey';

export { useTurnstileSiteKey } from '@/components/forms/TurnstileSiteKey';

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme?: 'light' | 'dark' | 'auto';
      callback: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
    }
  ) => string;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile="true"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Turnstile failed to load')), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.fetchPriority = 'low';
    script.dataset.turnstile = 'true';
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('Turnstile failed to load'));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

function TurnstileWidget({ siteKey, onToken }: { siteKey: string; onToken: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let widgetId: string | undefined;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'light',
          callback: onToken,
          'expired-callback': () => onToken(''),
          'error-callback': () => onToken(''),
        });
      })
      .catch(() => onToken(''));

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [siteKey, onToken]);

  return <div ref={containerRef} />;
}

/**
 * The Cloudflare script stays off the first paint.
 * A form already on screen waits until the visitor focuses or clicks it.
 * A form below the fold waits until it scrolls into view.
 * `eager` is for a step that only appears after the visitor has already moved through the page.
 */
export function TurnstileField({
  resetKey,
  onToken,
  eager = false,
}: {
  resetKey: number;
  onToken: (token: string) => void;
  eager?: boolean;
}) {
  const siteKey = useTurnstileSiteKey();
  const anchorRef = useRef<HTMLDivElement>(null);
  const [engaged, setEngaged] = useState(eager);

  useEffect(() => {
    if (!siteKey || engaged) return;
    const node = anchorRef.current;
    if (!node) return;
    const host = node.closest('form') ?? node.parentElement;
    if (!host) return;

    const engage = () => setEngaged(true);
    const startedBelow = host.getBoundingClientRect().top >= window.innerHeight;
    host.addEventListener('focusin', engage);
    host.addEventListener('pointerdown', engage);
    const observer = startedBelow
      ? new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) engage();
        })
      : null;
    observer?.observe(host);

    return () => {
      host.removeEventListener('focusin', engage);
      host.removeEventListener('pointerdown', engage);
      observer?.disconnect();
    };
  }, [siteKey, engaged]);

  if (!siteKey) return null;

  return <div ref={anchorRef}>{engaged ? <TurnstileWidget key={resetKey} siteKey={siteKey} onToken={onToken} /> : null}</div>;
}
