import { getSiteUrl } from "@/lib/site-url";
import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.VERCEL_ENV === "preview" ? undefined : getSiteUrl();
  if (!base) return [];
  return [
    "",
    "/portfolio",
    "/about",
    "/contact",
    "/privacy",
    ...getProjects().map((p) => `/portfolio/${p.slug}`),
  ].map((path) => ({ url: base + path }));
}
