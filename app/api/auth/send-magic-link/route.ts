import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { checkEmailRateLimit, checkIpRateLimit } from "@/lib/rate-limit";
import { isAdminEmail } from "@/lib/admin";
import { isAllowedUniversityDomain } from "@/lib/allowed-domains";
import { checkDomainMx } from "@/lib/email-mx";

const RATE_LIMIT_KEY_VERSION = "v2";

function getAllowedOverrideEmails(): string[] {
  const env = process.env.ALLOWED_OVERRIDE_EMAILS ?? "";
  return env.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}

function maskEmailForLogs(email: string): string {
  const [localPart, domain = ""] = email.trim().toLowerCase().split("@");
  if (!localPart || !domain) return "[invalid-email]";
  const maskedLocal =
    localPart.length <= 2
      ? `${localPart[0] ?? "*"}*`
      : `${localPart.slice(0, 2)}***`;
  return `${maskedLocal}@${domain}`;
}

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch (parseErr) {
      throw parseErr;
    }

    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailLower = email.toLowerCase();
    const overrideEmails = getAllowedOverrideEmails();
    const domain = email.split("@")[1]?.toLowerCase();
    const isAllowed =
      isAllowedUniversityDomain(domain) ||
      overrideEmails.includes(emailLower);
    const maskedEmail = maskEmailForLogs(emailLower);

    console.info("[send-magic-link] Request received", {
      email: maskedEmail,
      domain,
      isAllowedDomain: isAllowedUniversityDomain(domain),
      isOverrideEmail: overrideEmails.includes(emailLower),
    });

    if (!isAllowed) {
      console.warn("[send-magic-link] Rejected non-university email", {
        email: maskedEmail,
        domain,
      });
      return NextResponse.json(
        {
          error: "not_university_email",
        },
        { status: 400 }
      );
    }

    // Reject domains with no MX records — protects sender reputation by
    // catching typo'd addresses (e.g. `northeasten.edu`) before Resend
    // attempts delivery and bounces. Override + admin emails skip this so
    // operators can never get locked out by transient DNS issues.
    if (
      !overrideEmails.includes(emailLower) &&
      !isAdminEmail(emailLower) &&
      domain
    ) {
      const mxResult = await checkDomainMx(domain);
      if (mxResult.status === "no_mx") {
        console.warn("[send-magic-link] Rejected — no MX records for domain", {
          email: maskedEmail,
          domain,
        });
        return NextResponse.json(
          { error: "no_mx_records" },
          { status: 400 }
        );
      }
      if (mxResult.status === "lookup_failed") {
        console.warn(
          "[send-magic-link] MX lookup failed; allowing request through",
          {
            email: maskedEmail,
            domain,
            reason: mxResult.reason,
          }
        );
      }
    }

    // Rate limit by both email and IP so users have isolated buckets while shared abuse is capped.
    if (!isAdminEmail(emailLower)) {
      try {
        const forwarded = request.headers.get("x-forwarded-for");
        const ip =
          forwarded?.split(",")[0]?.trim() ??
          request.headers.get("x-real-ip") ??
          "unknown";
        const ipRateLimitResult = await checkIpRateLimit(
          `magic-link-ip:${RATE_LIMIT_KEY_VERSION}:${ip}`
        );

        if (!ipRateLimitResult.success) {
          console.warn("[send-magic-link] Blocked by IP rate limit", {
            email: maskedEmail,
            ip,
            limit: ipRateLimitResult.limit,
            remaining: ipRateLimitResult.remaining,
            reset: ipRateLimitResult.reset,
          });
          return NextResponse.json(
            {
              error:
                "Too many requests from this network. Please wait 15 minutes before requesting another magic link.",
            },
            { status: 429 }
          );
        }

        const emailRateLimitResult = await checkEmailRateLimit(
          `magic-link-email:${RATE_LIMIT_KEY_VERSION}:${emailLower}`
        );

        if (!emailRateLimitResult.success) {
          console.warn("[send-magic-link] Blocked by email rate limit", {
            email: maskedEmail,
            limit: emailRateLimitResult.limit,
            remaining: emailRateLimitResult.remaining,
            reset: emailRateLimitResult.reset,
          });
          return NextResponse.json(
            {
              error:
                "Too many requests. Please wait 15 minutes before requesting another magic link.",
            },
            { status: 429 }
          );
        }
      } catch (rateLimitErr) {
        console.error("[rate-limit] Failed, allowing request through:", rateLimitErr);
      }
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      console.error("[send-magic-link] Supabase signInWithOtp failed", {
        email: maskedEmail,
        message: error.message,
        status: error.status,
        code: error.code,
      });
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.info("[send-magic-link] Supabase accepted magic-link request", {
      email: maskedEmail,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[send-magic-link] Unhandled exception:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
