/**
 * Admin access control. Only emails in ADMIN_EMAILS env var can access the portal.
 * Set ADMIN_EMAILS=jhmblundin@gmail.com,other@email.com (comma-separated)
 */
export function getAdminEmails(): string[] {
  const env = process.env.ADMIN_EMAILS ?? "";
  return env
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.trim().toLowerCase());
}
