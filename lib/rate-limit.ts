import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limiter for sensitive endpoints (magic link, etc.).
 * Uses Upstash Redis when env vars are set; skips limiting when disabled or not configured.
 */
function isMagicLinkRateLimitDisabled() {
  return process.env.DISABLE_MAGIC_LINK_RATE_LIMIT === "true";
}

function createRateLimiter(
  requests: number,
  window: `${number} ${"s" | "m" | "h" | "d"}`
) {
  if (isMagicLinkRateLimitDisabled()) {
    return null;
  }

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
    limiter: Ratelimit.slidingWindow(requests, window),
    analytics: true,
  });
}

let emailRateLimiter: Ratelimit | null = null;
let ipRateLimiter: Ratelimit | null = null;

function getEmailRateLimiter(): Ratelimit | null {
  if (!emailRateLimiter) {
    emailRateLimiter = createRateLimiter(5, "15 m");
  }
  return emailRateLimiter;
}

function getIpRateLimiter(): Ratelimit | null {
  if (!ipRateLimiter) {
    ipRateLimiter = createRateLimiter(20, "15 m");
  }
  return ipRateLimiter;
}

async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  if (isMagicLinkRateLimitDisabled()) {
    return { success: true, limit: 0, remaining: 0, reset: 0 };
  }

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

export async function checkEmailRateLimit(identifier: string) {
  return checkRateLimit(getEmailRateLimiter(), identifier);
}

export async function checkIpRateLimit(identifier: string) {
  return checkRateLimit(getIpRateLimiter(), identifier);
}
