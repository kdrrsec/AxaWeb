/**
 * Lichte in-memory rate limiting per serverless-instance.
 * Goed genoeg als eerste verdedigingslinie; geen gedeelde store nodig.
 */

const hits = new Map();

function prune(now, windowMs) {
  for (const [key, timestamps] of hits) {
    const next = timestamps.filter((ts) => now - ts < windowMs);
    if (next.length) hits.set(key, next);
    else hits.delete(key);
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
