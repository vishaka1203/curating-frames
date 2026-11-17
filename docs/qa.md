# Verification record

16 November 2026.

- Production Next.js build: successful, all public routes generated, enquiry server endpoint included.
- Strict TypeScript: passing.
- ESLint: passing with no warnings.
- Tests: 6 passing. Enquiry validation, invalid/past date and honeypot, cross-origin rejection, missing-provider behavior, provider failure/confirmation, public Host versus internal Next URL regression.
- Production dependency audit: zero known vulnerabilities.
- Desktop browser: homepage rendered at default 1280×720 viewport, self-hosted typography and client photography loaded, no homepage console errors/warnings.
- Portfolio: category filter reduced five stories to the birthday story; restoring All stories returned all five.
- Gallery: opened accessible fullscreen dialog; Next advanced to photo 2/6 with changed image and live count; Close returned to story.
- Mobile browser: tested 390×844. Homepage composed correctly; menu opened with focus inside dialog; Contact link closed menu and navigated; contact document width exactly 390px with no overflow.
- Empty contact form: visible field errors and first-field focus verified.
- Local enquiry: used dummy data only; no real email provider credentials or external email transmission. A same-origin hostname bug discovered in browser was reproduced by a failing test and fixed.

Limitations: no Lighthouse score claimed, no full device lab or screen-reader audit performed; no public deployment, real Resend delivery, Sanity dataset or protected Pixieset media tested. Basic honeypot is implemented; configure hosting-edge bot protection before enabling public email sending. See README for launch steps.

Final browser recheck: completed enquiry with dummy data now returns the explicit unconfigured-provider message and confirms that nothing was sent. Tablet About page checked at 820×1180 with exact viewport/document width match. HTTP smoke checks confirmed 35 public route/image URLs return 200, and an unknown story returns 404. The homepage console was clean; the expected 503 on an unconfigured form is an intentional failure response, not a delivery claim.

Drive photography update: eleven full-resolution originals downloaded using Drive’s normal download controls, optimized to local WebP derivatives, and added as a new Pheras wedding story. Production build, lint, strict typecheck and six tests pass. Desktop and 390px mobile homepage framing reviewed; no horizontal overflow. New wedding gallery and fullscreen viewer checked (11 photographs), all new image URLs and wedding route return HTTP 200. Homepage console has no errors or warnings. No scrolling code changed.

Placement correction: restored homepage, About page and social metadata byte-for-byte to their state before Drive integration. Restored the previous homepage featured order and preview screenshot. Pheras keeps all eleven Drive photographs as a separate portfolio collection, excluded from homepage featured selections. Cinematic styling and native scrolling are unchanged. Lint, typecheck and six tests pass.

Collection wall update (17 November 2026): imported 21 original JPEGs from the explicitly identified open Drive collections and optimized them locally. Added three story routes and a six-cover homepage grid. Production browser navigation verified all six covers against their own gallery: A seaside yes (9), Ever after (4), Pheras (11), Promises in bloom (8), A little closer (6), An evening to remember (6). No production console warnings or errors. Keyboard Right advanced the lightbox, Escape closed it, and focus returned to the selected thumbnail. Verified three columns at 667px and two at 390px with document width equal to viewport width. Production build, lint, strict typecheck and 11 tests pass. Original hero, existing featured stories, essay imagery, footer and native scrolling preserved. Changes saved locally for code review; no deployment was requested in this revision.
