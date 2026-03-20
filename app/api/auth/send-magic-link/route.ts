import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { checkEmailRateLimit, checkIpRateLimit } from "@/lib/rate-limit";
import { isAdminEmail } from "@/lib/admin";

const RATE_LIMIT_KEY_VERSION = "v2";

function getAllowedOverrideEmails(): string[] {
  const env = process.env.ALLOWED_OVERRIDE_EMAILS ?? "";
  return env.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}

function isAllowedUniversityDomain(domain?: string): boolean {
  return typeof domain === "string" && domain.endsWith(".edu");
}

export async function POST(request: Request) {
  try {
    // #region agent log
    fetch('http://127.0.0.1:7581/ingest/c348983f-75a9-4ddb-aae1-9ea5cf938d24',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb8ffd'},body:JSON.stringify({sessionId:'fb8ffd',location:'route.ts:entry',message:'POST handler entered',data:{},timestamp:Date.now(),hypothesisId:'E',runId:'pre'})}).catch(()=>{});
    // #endregion

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch (parseErr) {
      // #region agent log
      fetch('http://127.0.0.1:7581/ingest/c348983f-75a9-4ddb-aae1-9ea5cf938d24',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb8ffd'},body:JSON.stringify({sessionId:'fb8ffd',location:'route.ts:json-parse',message:'request.json() threw',data:{error:String(parseErr)},timestamp:Date.now(),hypothesisId:'E',runId:'pre'})}).catch(()=>{});
      // #endregion
      throw parseErr;
    }

    const email = typeof body.email === "string" ? body.email.trim() : "";

    // #region agent log
    fetch('http://127.0.0.1:7581/ingest/c348983f-75a9-4ddb-aae1-9ea5cf938d24',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb8ffd'},body:JSON.stringify({sessionId:'fb8ffd',location:'route.ts:after-parse',message:'Email parsed',data:{recipientDomain:email.split('@')[1]?.toLowerCase()??null,bodyKeys:Object.keys(body)},timestamp:Date.now(),hypothesisId:'E',runId:'pre'})}).catch(()=>{});
    // #endregion

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

    if (!isAllowed) {
      return NextResponse.json(
        {
          error: "Please use a university email ending in .edu",
        },
        { status: 400 }
      );
    }

    // Rate limit by both email and IP so users have isolated buckets while shared abuse is capped.
    if (!isAdminEmail(emailLower) && !overrideEmails.includes(emailLower)) {
      // #region agent log
      const rateLimitDisabled = process.env.DISABLE_MAGIC_LINK_RATE_LIMIT;
      fetch('http://127.0.0.1:7581/ingest/c348983f-75a9-4ddb-aae1-9ea5cf938d24',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb8ffd'},body:JSON.stringify({sessionId:'fb8ffd',location:'route.ts:pre-ratelimit',message:'Entering rate limit block',data:{rateLimitDisabled,isAdmin:isAdminEmail(emailLower),isOverride:overrideEmails.includes(emailLower)},timestamp:Date.now(),hypothesisId:'B',runId:'pre'})}).catch(()=>{});
      // #endregion

      try {
        const forwarded = request.headers.get("x-forwarded-for");
        const ip =
          forwarded?.split(",")[0]?.trim() ??
          request.headers.get("x-real-ip") ??
          "unknown";
        const ipRateLimitResult = await checkIpRateLimit(
          `magic-link-ip:${RATE_LIMIT_KEY_VERSION}:${ip}`
        );

        // #region agent log
        fetch('http://127.0.0.1:7581/ingest/c348983f-75a9-4ddb-aae1-9ea5cf938d24',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb8ffd'},body:JSON.stringify({sessionId:'fb8ffd',location:'route.ts:ip-ratelimit-result',message:'IP rate limit result',data:{ipRateLimitResult},timestamp:Date.now(),hypothesisId:'B',runId:'pre'})}).catch(()=>{});
        // #endregion

        if (!ipRateLimitResult.success) {
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

        // #region agent log
        fetch('http://127.0.0.1:7581/ingest/c348983f-75a9-4ddb-aae1-9ea5cf938d24',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb8ffd'},body:JSON.stringify({sessionId:'fb8ffd',location:'route.ts:email-ratelimit-result',message:'Email rate limit result',data:{emailRateLimitResult},timestamp:Date.now(),hypothesisId:'B',runId:'pre'})}).catch(()=>{});
        // #endregion

        if (!emailRateLimitResult.success) {
          return NextResponse.json(
            {
              error:
                "Too many requests. Please wait 15 minutes before requesting another magic link.",
            },
            { status: 429 }
          );
        }
      } catch (rateLimitErr) {
        // #region agent log
        fetch('http://127.0.0.1:7581/ingest/c348983f-75a9-4ddb-aae1-9ea5cf938d24',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb8ffd'},body:JSON.stringify({sessionId:'fb8ffd',location:'route.ts:ratelimit-error',message:'Rate limit threw exception',data:{error:String(rateLimitErr)},timestamp:Date.now(),hypothesisId:'B',runId:'pre'})}).catch(()=>{});
        // #endregion
        throw rateLimitErr;
      }
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // #region agent log
    fetch('http://127.0.0.1:7581/ingest/c348983f-75a9-4ddb-aae1-9ea5cf938d24',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb8ffd'},body:JSON.stringify({sessionId:'fb8ffd',location:'route.ts:env-check',message:'Supabase env vars',data:{hasUrl:!!supabaseUrl,hasKey:!!supabaseAnonKey,supabaseHost:(()=>{try{return supabaseUrl?new URL(supabaseUrl).hostname:null}catch{return null}})()},timestamp:Date.now(),hypothesisId:'D',runId:'pre'})}).catch(()=>{});
    // #endregion

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const origin =
      request.headers.get("origin") ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");
    const emailRedirectTo = `${origin.replace(/\/$/, "")}/apply`;

    const otpStartedAt = Date.now();
    // #region agent log
    fetch('http://127.0.0.1:7581/ingest/c348983f-75a9-4ddb-aae1-9ea5cf938d24',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb8ffd'},body:JSON.stringify({sessionId:'fb8ffd',location:'route.ts:pre-otp',message:'About to call signInWithOtp',data:{recipientDomain:domain??null,emailRedirectTo,origin},timestamp:otpStartedAt,hypothesisId:'A',runId:'pre'})}).catch(()=>{});
    // #endregion

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo },
    });

    const otpElapsedMs = Date.now() - otpStartedAt;
    // #region agent log
    (() => {
      const errRec =
        error && typeof error === "object"
          ? (error as unknown as Record<string, unknown>)
          : null;
      const authErrShape =
        errRec == null
          ? null
          : {
              keys: Object.keys(errRec),
              code: typeof errRec.code === "string" ? errRec.code : undefined,
              name: typeof errRec.name === "string" ? errRec.name : undefined,
            };
      fetch("http://127.0.0.1:7581/ingest/c348983f-75a9-4ddb-aae1-9ea5cf938d24", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "fb8ffd" },
        body: JSON.stringify({
          sessionId: "fb8ffd",
          location: "route.ts:post-otp",
          message: "signInWithOtp returned",
          data: {
            hasError: !!error,
            errorMessage: error?.message,
            errorStatus: error?.status,
            otpElapsedMs,
            authErrShape,
          },
          timestamp: Date.now(),
          hypothesisId: "C,F",
          runId: "pre",
        }),
      }).catch(() => {});
    })();
    // #endregion

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    // #region agent log
    fetch('http://127.0.0.1:7581/ingest/c348983f-75a9-4ddb-aae1-9ea5cf938d24',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb8ffd'},body:JSON.stringify({sessionId:'fb8ffd',location:'route.ts:catch',message:'Unhandled exception in POST handler',data:{error:String(err),stack:(err instanceof Error)?err.stack:'N/A'},timestamp:Date.now(),hypothesisId:'A,B,E',runId:'pre'})}).catch(()=>{});
    // #endregion
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
