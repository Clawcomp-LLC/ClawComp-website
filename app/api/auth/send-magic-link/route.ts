import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { isAdminEmail } from "@/lib/admin";

const ALLOWED_DOMAINS = [
  "mit.edu",
  "harvard.edu",
  "northeastern.edu",
  "rochester.edu",
  "virginia.edu",
];

function getAllowedOverrideEmails(): string[] {
  const env = process.env.ALLOWED_OVERRIDE_EMAILS ?? "";
  return env.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
      (domain && ALLOWED_DOMAINS.includes(domain)) ||
      overrideEmails.includes(emailLower);

    if (!isAllowed) {
      return NextResponse.json(
        {
          error:
            "Please use a university email (@mit.edu, @harvard.edu, @northeastern.edu, @rochester.edu, @virginia.edu)",
        },
        { status: 400 }
      );
    }

    // Rate limit by IP (skip for admin/override emails — used for testing)
    if (!isAdminEmail(emailLower) && !overrideEmails.includes(emailLower)) {
      const forwarded = request.headers.get("x-forwarded-for");
      const ip =
        forwarded?.split(",")[0]?.trim() ??
        request.headers.get("x-real-ip") ??
        "unknown";
      const rateLimitResult = await checkRateLimit(`magic-link:${ip}`);

      if (!rateLimitResult.success) {
        return NextResponse.json(
          {
            error:
              "Too many requests. Please wait 15 minutes before requesting another magic link.",
          },
          { status: 429 }
        );
      }
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
