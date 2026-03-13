# Admin Portal

The admin portal at `/admin` lets authorized developers review ClawComp applications by team. Only emails in the `ADMIN_EMAILS` allowlist can access it.

## Setup

### 1. Environment variables

Add to `.env.local` and Vercel:

```
# Comma-separated list of admin emails (no spaces after commas)
ADMIN_EMAILS=jhmblundin@gmail.com

# Required for admin portal to read all applications (bypasses RLS)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Optional: allow non-university emails to apply (for testing multi-member teams)
# Server-side only — never exposed to client
ALLOWED_OVERRIDE_EMAILS=jhmblundin@gmail.com
```

**Where to find the service role key:**
- Supabase Dashboard → **Settings** → **API**
- Copy the `service_role` key (not the anon key)
- **Never** expose this key in client-side code or commit it to git

### 2. Supabase redirect URL

Add `https://clawcomp.net/admin` (and `http://localhost:3000/admin` for local dev) to **Authentication** → **URL Configuration** → **Redirect URLs**.

### 3. Add more admins

To grant access to another developer, add their email to `ADMIN_EMAILS`:

```
ADMIN_EMAILS=jhmblundin@gmail.com,luke@example.com,yash@example.com
```

Redeploy after changing env vars.

## Usage

1. Go to `https://clawcomp.net/admin`
2. Enter your admin email and click "Send magic link"
3. Check your email and click the link
4. You'll land on the portal with a searchable list of teams
5. Click a team to expand and view all member applications

## Security

- Admin magic link only works for emails in `ADMIN_EMAILS`
- The `/api/admin/teams` endpoint verifies the session and checks admin status before returning data
- The service role key is used server-side only to bypass RLS and fetch all applications
