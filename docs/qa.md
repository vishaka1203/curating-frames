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
