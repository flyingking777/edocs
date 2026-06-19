/**
 * Tiny in-memory token-bucket rate limiter.
 *
 * Good enough for a single Node instance. If you scale horizontally,
 * swap the backing store for Redis (the API surface stays the same).
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

const SWEEP_AT = 1000;
let opsSinceSweep = 0;
function maybeSweep(now: number) {
  if (++opsSinceSweep < SWEEP_AT) return;
  opsSinceSweep = 0;
  for (const [k, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(k);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Take one token from the bucket identified by `key`.
 * Buckets refill on a fixed window (e.g. 5 tokens per 60s).
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  maybeSweep(now);

  let bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))
    };
  }

  return {
    allowed: true,
    remaining: Math.max(0, limit - bucket.count),
    retryAfterSeconds: 0
  };
}

/** Manually clear a key (e.g. after a successful login, to reset attempts). */
export function clearRateLimit(key: string) {
  buckets.delete(key);
}

/** Pull a stable identifier off the request for use as a bucket key. */
export function rateLimitKeyFor(req: Request, scope: string): string {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  return `${scope}:${ip}`;
}
