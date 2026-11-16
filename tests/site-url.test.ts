import { test } from "node:test";
import assert from "node:assert/strict";
import { getSiteUrl } from "../lib/site-url";
test("prefers a configured public domain", () =>
  assert.equal(
    getSiteUrl({
      NEXT_PUBLIC_SITE_URL: "https://studio.example/",
      VERCEL_PROJECT_PRODUCTION_URL: "example.vercel.app",
    }),
    "https://studio.example",
  ));
test("uses the Vercel production domain without inventing a URL", () =>
  assert.equal(
    getSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "example.vercel.app" }),
    "https://example.vercel.app",
  ));
test("leaves an unconfigured local site without a public URL", () =>
  assert.equal(getSiteUrl({}), undefined));
