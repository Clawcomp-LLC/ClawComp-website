/**
 * Direct Resend test — bypasses Supabase entirely.
 *
 * Usage:
 *   RESEND_API_KEY=re_xxxxx node scripts/test-resend.mjs
 *
 * Get your API key from https://resend.com/api-keys
 * Use the SAME key that is entered as the SMTP password in Supabase.
 */

const API_KEY = process.env.RESEND_API_KEY;
if (!API_KEY) {
  console.error("Set RESEND_API_KEY env var. Example:");
  console.error("  RESEND_API_KEY=re_xxxxx node scripts/test-resend.mjs");
  process.exit(1);
}

const TO = process.argv[2] || "jhmblundin@gmail.com";

console.log(`\n--- Test 1: Resend HTTP API (proves key + domain work) ---`);
console.log(`Sending to: ${TO}`);
console.log(`From: noreply@clawcomp.net`);

const res = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from: "ClawComp <noreply@clawcomp.net>",
    to: [TO],
    subject: "ClawComp SMTP Test",
    text: "If you received this, Resend API key and domain are working correctly.",
  }),
});

const body = await res.json();
console.log(`Status: ${res.status}`);
console.log(`Response:`, JSON.stringify(body, null, 2));

if (res.ok) {
  console.log("\n✅ Resend API key is valid and clawcomp.net is authorized for sending.");
  console.log("   If Supabase still fails, the problem is the SMTP password stored in Supabase.");
  console.log("   → Re-enter this same API key in Supabase SMTP settings and save.");
} else {
  console.log("\n❌ Resend rejected the request. Check:");
  console.log("   - Is the API key correct? (starts with re_)");
  console.log("   - Does the key have sending permission?");
  console.log("   - Is clawcomp.net still verified in Resend?");
}
