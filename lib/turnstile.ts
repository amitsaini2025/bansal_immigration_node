// Cloudflare's documented always-pass test keys. Production keys are locked to
// hostnames, so local development uses the test pair unless
// TURNSTILE_USE_PRODUCTION_KEYS=true.
const TEST_SITE_KEY = "1x00000000000000000000AA";
const TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

function useProductionKeys(): boolean {
  return (
    process.env.NODE_ENV === "production" ||
    /^(1|true|yes|on)$/i.test(process.env.TURNSTILE_USE_PRODUCTION_KEYS ?? "")
  );
}

function configuredKeys(): { siteKey: string; secretKey: string } | null {
  const siteKey = (process.env.TURNSTILE_SITE_KEY || "").trim();
  const secretKey = (process.env.TURNSTILE_SECRET_KEY || "").trim();
  if (!siteKey || !secretKey) return null;
  return useProductionKeys()
    ? { siteKey, secretKey }
    : { siteKey: TEST_SITE_KEY, secretKey: TEST_SECRET_KEY };
}

/** Public site key for enquiry forms. Null only when production keys are missing. */
export function getTurnstileSiteKey(): string | null {
  if (!useProductionKeys()) return TEST_SITE_KEY;
  return configuredKeys()?.siteKey ?? null;
}

export function clientIp(headers: { get(name: string): string | null }): string {
  return (
    headers.get("cf-connecting-ip")?.trim() ||
    headers.get("x-real-ip")?.trim() ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    ""
  );
}

/**
 * Verifies a Turnstile token. Production without keys fails closed.
 * Local test keys still require a token so empty bot posts are dropped.
 */
export async function verifyTurnstile(token: string, remoteIp: string): Promise<boolean> {
  const keys = configuredKeys();
  if (!keys) return false;
  if (!token) return false;
  if (keys.secretKey === TEST_SECRET_KEY) return true;

  try {
    const body = new URLSearchParams({ secret: keys.secretKey, response: token });
    if (remoteIp && remoteIp !== "127.0.0.1" && remoteIp !== "local") {
      body.set("remoteip", remoteIp);
    }
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
      body,
    });
    const json = (await response.json().catch(() => null)) as { success?: boolean } | null;
    return response.ok && json?.success === true;
  } catch (error) {
    console.warn("Turnstile verification failed:", error);
    return false;
  }
}
