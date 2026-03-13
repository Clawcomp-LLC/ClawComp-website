import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limiter for sensitive endpoints (magic link, etc.).
 * Uses Upstash Redis when env vars are set; skips limiting in dev if not configured.
 */
function createRateLimiter() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[rate-limit] UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN not set. Rate limiting disabled."
      );
    }
    return null;
  }

  const redis = new Redis({ url, token });
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "15 m"), // 3 magic link requests per 15 min per identifier
    analytics: true,
  });
}

let rateLimiter: Ratelimit | null = null;

export function getRateLimiter(): Ratelimit | null {
  if (!rateLimiter) {
    rateLimiter = createRateLimiter();
  }
  return rateLimiter;
}

export async function checkRateLimit(identifier: string): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  const limiter = getRateLimiter();
  if (!limiter) {
    return { success: true, limit: 0, remaining: 0, reset: 0 };
  }
  const result = await limiter.limit(identifier);
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}
