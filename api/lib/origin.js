/**
 * Origin / Referer / Sec-Fetch-Site checks voor cookie-loze POST endpoints.
 * Voorkomt cross-site form spam zonder CSRF-tokens/sessies.
 */

const DEFAULT_ALLOWED = ["https://axaweb.nl", "https://www.axaweb.nl"];

function parseOriginList(value) {
  if (!value || typeof value !== "string") return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getAllowedOrigins() {
  const fromEnv = parseOriginList(process.env.ALLOWED_ORIGINS);
  const list = fromEnv.length ? [...fromEnv] : [...DEFAULT_ALLOWED];

  if (process.env.VERCEL_ENV === "preview") {
    if (process.env.VERCEL_URL) {
      list.push(`https://${process.env.VERCEL_URL}`);
    }
    if (process.env.VERCEL_BRANCH_URL) {
      list.push(`https://${process.env.VERCEL_BRANCH_URL}`);
    }
  }

  if (process.env.NODE_ENV !== "production") {
    list.push(
      "http://127.0.0.1:4173",
      "http://localhost:4173",
      "http://127.0.0.1:3000",
      "http://localhost:3000"
    );
  }

  return [...new Set(list)];
}

function originFromReferer(referer) {
  if (!referer || typeof referer !== "string") return "";
  try {
    return new URL(referer).origin;
  } catch {
    return "";
  }
}

/**
 * @returns {{ ok: true } | { ok: false, reason: string }}
 */
export function assertTrustedOrigin(req) {
  const allowed = getAllowedOrigins();
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : "";
  const refererOrigin = originFromReferer(req.headers.referer);
  const fetchSite =
    typeof req.headers["sec-fetch-site"] === "string" ? req.headers["sec-fetch-site"] : "";

  if (fetchSite === "cross-site") {
    return { ok: false, reason: "sec_fetch_site" };
  }

  if (origin) {
    return allowed.includes(origin) ? { ok: true } : { ok: false, reason: "origin" };
  }

  if (refererOrigin) {
    return allowed.includes(refererOrigin) ? { ok: true } : { ok: false, reason: "referer" };
  }

  /* Geen Origin/Referer: weiger in productie; lokaal toestaan voor curl-tests. */
  if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
    return { ok: false, reason: "missing_origin" };
  }

  return { ok: true };
}
