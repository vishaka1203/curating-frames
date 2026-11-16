/** Prefer a configured custom domain, then Vercel's assigned production domain. */
export function getSiteUrl(
  env: Record<string, string | undefined> = process.env,
): string | undefined {
  const configured = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  const domain = env.VERCEL_PROJECT_PRODUCTION_URL;
  return domain ? `https://${domain}` : undefined;
}
