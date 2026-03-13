# ClawComp Security

## Overview

This document describes the security measures in place and how to configure them for production.

## Rate Limiting (Magic Link)

The application flow requires a magic link sent to the user's university email. To prevent bots from spamming magic links (which would send many emails and could overwhelm Supabase Auth), we proxy the magic link request through a rate-limited API route.

- **Endpoint:** `POST /api/auth/send-magic-link`
- **Limit:** 3 requests per 15 minutes per IP address (sliding window)
- **Backend:** [Upstash Redis](https://upstash.com/) (serverless-friendly, free tier available)

### Setup

1. Create a Redis database at [Upstash Console](https://console.upstash.com/)
2. Copy the REST URL and token from the database details
3. Add to your environment (local and Vercel):

```
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

4. Restart your dev server / redeploy on Vercel

**If Upstash is not configured:** Rate limiting is skipped (a warning is logged in production). The magic link still works, but you are not protected against spam. Configure Upstash before going live.

## Security Headers

The following headers are applied to all responses via middleware:

| Header | Value | Purpose |
|--------|-------|---------|
| X-Frame-Options | DENY | Prevents clickjacking |
| X-Content-Type-Options | nosniff | Prevents MIME sniffing |
| Referrer-Policy | strict-origin-when-cross-origin | Limits referrer leakage |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Disables unused browser features |

## Supabase Row Level Security (RLS)

All tables use RLS policies:

- **applications** — Users can only read/insert/update their own application
- **teams** — Only authenticated users can create teams; creators can update
- **viral_content, news_items** — Public read-only

## Recommendations

1. **Enable Upstash** before launch — Free tier (10K requests/day) is sufficient for ClawComp
2. **Supabase Auth** — Add your production URL (`https://clawcomp.net`) to Supabase Authentication → URL Configuration
3. **Optional: CAPTCHA** — For stronger bot protection, consider adding reCAPTCHA v3 or hCaptcha before the magic link step
4. **Monitor** — Check Upstash dashboard for rate limit hits; adjust limits if legitimate users are blocked
