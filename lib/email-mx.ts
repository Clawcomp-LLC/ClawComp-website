import { promises as dns } from "node:dns";

/**
 * MX record sanity check for recipient domains.
 *
 * The application form historically accepted any address ending in .edu / .ca /
 * other academic suffixes, which let typo'd domains (e.g. `northeasten.edu`)
 * through. Those addresses always hard-bounce at the ESP layer, which damages
 * sender reputation for legitimate recipients on the same receiving systems.
 *
 * This helper does a single DNS MX lookup per domain (1.5s timeout, 1 hour
 * in-process cache) and reports whether the domain has any MX records at all.
 * Callers should fail-open on `lookup_failed` so transient DNS issues do not
 * lock real users out.
 */

const CACHE_TTL_MS = 60 * 60 * 1000;
const LOOKUP_TIMEOUT_MS = 1500;

interface CacheEntry {
  hasMx: boolean;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();

export type MxCheckResult =
  | { status: "valid" }
  | { status: "no_mx" }
  | { status: "lookup_failed"; reason: string };

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("dns_timeout")),
      ms
    );
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

export async function checkDomainMx(
  domain: string | null | undefined
): Promise<MxCheckResult> {
  const normalized =
    typeof domain === "string" ? domain.trim().toLowerCase() : "";

  if (!normalized || normalized.includes(" ")) {
    return { status: "no_mx" };
  }

  const cached = cache.get(normalized);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.hasMx ? { status: "valid" } : { status: "no_mx" };
  }

  try {
    const records = await withTimeout(
      dns.resolveMx(normalized),
      LOOKUP_TIMEOUT_MS
    );
    const hasMx = Array.isArray(records) && records.length > 0;
    cache.set(normalized, {
      hasMx,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });
    return hasMx ? { status: "valid" } : { status: "no_mx" };
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code ?? "";
    // ENOTFOUND: domain doesn't exist. ENODATA: domain exists, no MX records.
    if (code === "ENOTFOUND" || code === "ENODATA") {
      cache.set(normalized, {
        hasMx: false,
        expiresAt: Date.now() + CACHE_TTL_MS,
      });
      return { status: "no_mx" };
    }
    const reason =
      code || (err instanceof Error ? err.message : "unknown");
    return { status: "lookup_failed", reason };
  }
}
