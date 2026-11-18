'use client';

import { createContext, useContext } from 'react';

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
