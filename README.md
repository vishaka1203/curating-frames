# Curating Frames

An editorial photography website built in the existing project folder with Next.js App Router, React, strict TypeScript, Tailwind CSS, shadcn-style UI primitives, Radix Dialog, GSAP/ScrollTrigger and browser-native scrolling. Portfolio photographs come from the client-provided PDF and the explicitly shared Google Drive wedding folder; no stock or reference-site photographs are used.

## Run locally

Requires Node.js 20.9+ and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://127.0.0.1:3000. `npm run build` creates the production build; `npm start` serves it. Check with `npm test`, `npm run lint`, and `npm run typecheck`.

## Pages

- `/`: cinematic homepage, featured collections and introduction
- `/portfolio`: category filters and editorial project grid
- `/portfolio/[slug]`: six stories, including Bani’s 1st Birthday and Pratik & Shubham
- `/about`, `/contact`, `/privacy`
- sitemap, robots and a custom 404

The two Pixieset projects link to their original galleries. Their imagery was not accessible, so no unrelated photographs are presented as those events. The Pheras wedding collection uses eleven original Drive photographs. Three descriptive collections use the supplied PDF. Films is deliberately absent because no video files were supplied.

## Enquiries

Configure `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL` (a sender on your verified Resend domain). The default recipient is the verified studio email; override with `ENQUIRY_TO_EMAIL` if needed. The API validates all fields with Zod, rejects cross-origin requests and oversized payloads, uses a honeypot, and sends plain text email. It reports acceptance only after Resend returns a message ID; it does not assert inbox delivery. With no credentials it returns HTTP 503 and explicitly tells visitors the message was not sent, with email and phone alternatives.

Before public launch, enable rate limiting / bot protection at your hosting edge for `POST /api/enquiry`. The honeypot is basic spam protection, not a distributed rate limiter. No enquiries are stored in a local database or written to logs. Ensure the studio has an appropriate email retention policy.

## Content editing

Edit `data/projects.json`; no React changes are needed to add a project. Add optimized photographs under `public/images/` and matching dimensions and descriptive alt text to `data/media.json`. Gallery IDs omit the `.webp` extension. The cover is a complete `/images/...webp` path. Use descriptive editorial titles when actual event names are unknown.

Each project supports title, slug, category, description, cover, images, eventDate, location, featuredOrder, publishedAt, status, videoUrl, externalGallery. `publishedAt` is the publication date, never an inferred event date. Only `status: "published"` is visible. Newest publications appear first; `featuredOrder` controls homepage selection. Rebuild after content changes.

See [CMS setup](docs/cms.md) for the prepared Sanity schema and future integration. Local content is the working fallback; this delivery does not include a connected CMS or authenticated content editor.

## Deployment

1. Review the source audit and approve imagery for public portfolio use.
2. Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS domain, without a trailing slash. On Vercel the assigned production domain is used automatically. Unconfigured local builds and Vercel previews disallow indexing.
3. Set email variables and configure bot protection.
4. Run checks and `npm run build`.
5. Deploy to a Next.js Node-compatible host (for example Vercel). This is not a static-only export: image optimization and the enquiry route need a server.
6. Verify domain, sitemap, Open Graph preview, and a real provider-backed test enquiry before announcing the site.

GitHub source: https://github.com/vishaka1203/curating-frames. Vercel deploys the main branch. Production metadata and sitemap use the assigned Vercel domain automatically; set NEXT_PUBLIC_SITE_URL when using a custom domain. Online enquiries still require the documented Resend configuration. No external test email was sent during development. See [content inventory](docs/content-inventory.md) and [QA](docs/qa.md).
