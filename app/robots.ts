import { getSiteUrl } from "@/lib/site-url";
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const url = process.env.VERCEL_ENV === "preview" ? undefined : getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      ...(url ? { allow: "/", disallow: "/api/" } : { disallow: "/" }),
    },
    ...(url ? { sitemap: `${url}/sitemap.xml` } : {}),
  };
}
