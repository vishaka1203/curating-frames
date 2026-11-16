import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
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
