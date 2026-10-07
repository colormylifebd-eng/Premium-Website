import "server-only";

/**
 * Returns the canonical public URL of the site, without a trailing slash.
 *
 * Order of precedence:
 * 1. SITE_URL (set this in production, e.g. https://colormylifebd.com)
 * 2. Vercel's production domain (set automatically on Vercel)
 * 3. http://localhost:3000 for local development
 *
 * Password-reset links are built from this value instead of the request's
 * Host header, so a forged Host header can't redirect reset emails.
 */
export function getSiteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelDomain) return `https://${vercelDomain}`;

  return "http://localhost:3000";
}
