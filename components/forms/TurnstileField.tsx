'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';

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

const SiteKeyContext = createContext<string | null>(null);

export function TurnstileSiteKeyProvider({
  siteKey,
  children,
}: {
  siteKey: string | null;
  children: React.ReactNode;
}) {
  return <SiteKeyContext.Provider value={siteKey}>{children}</SiteKeyContext.Provider>;
}

export function useTurnstileSiteKey(): string | null {
  return useContext(SiteKeyContext);
}

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

/** Cloudflare Turnstile widget. Renders nothing when the site key is unavailable. */
export function TurnstileField({
  resetKey,
  onToken,
}: {
  resetKey: number;
  onToken: (token: string) => void;
}) {
  const siteKey = useTurnstileSiteKey();
  if (!siteKey) return null;
  return (
    <div className="min-h-[65px]">
      <TurnstileWidget key={resetKey} siteKey={siteKey} onToken={onToken} />
    </div>
  );
}
