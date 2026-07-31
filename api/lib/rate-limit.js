/**
 * Lichte in-memory rate limiting + dedupe per serverless-instance.
 * Eerste verdedigingslinie; voor schaal later te vervangen door KV/Redis.
 */

const hits = new Map();
const recentSubmissions = new Map();

function prune(now, windowMs) {
  for (const [key, timestamps] of hits) {
    const next = timestamps.filter((ts) => now - ts < windowMs);
    if (next.length) hits.set(key, next);
    else hits.delete(key);
  }

  for (const [key, ts] of recentSubmissions) {
    if (now - ts >= windowMs) recentSubmissions.delete(key);
  }
}

/**
 * @returns {{ allowed: boolean, retryAfterSec: number }}
 */
export function checkRateLimit(key, { limit = 5, windowMs = 15 * 60 * 1000 } = {}) {
  const now = Date.now();
  prune(now, windowMs);

  const timestamps = hits.get(key) || [];
  const recent = timestamps.filter((ts) => now - ts < windowMs);

  if (recent.length >= limit) {
    const oldest = recent[0];
    const retryAfterSec = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
    return { allowed: false, retryAfterSec };
  }

  recent.push(now);
  hits.set(key, recent);
  return { allowed: true, retryAfterSec: 0 };
}

/**
 * Voorkomt dubbele identieke submits binnen een korte window (per instance).
 * @returns {{ duplicate: boolean }}
 */
export function checkDuplicateSubmission(fingerprint, { windowMs = 60_000 } = {}) {
  const now = Date.now();
  prune(now, windowMs);

  const previous = recentSubmissions.get(fingerprint);
  if (previous && now - previous < windowMs) {
    return { duplicate: true };
  }

  recentSubmissions.set(fingerprint, now);
  return { duplicate: false };
}
