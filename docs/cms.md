# Content management

The working content source is `data/projects.json`. Add projects, image assets and metadata without editing application components, then rebuild. Draft entries stay out of public queries. Newest publication dates sort first, while homepage selections use manual `featuredOrder`.

`sanity/project-schema.ts` is a portable schema definition ready to register inside a separately configured Sanity Studio. No Sanity account, project ID, dataset or token was supplied; no pretend integration is active.

To connect Sanity:

1. Create a Sanity project/dataset and Studio using the official Sanity setup.
2. Register the supplied schema as a Studio document type.
3. Import approved project records and upload originals, adding alt text.
4. Replace the local adapter in `lib/content.ts` with server-side Sanity queries. The query should restrict to published documents and sort `publishedAt desc`; featured queries additionally order by `featuredOrder asc`.
5. Update callers to await the content adapter, and map CMS asset URLs through an explicitly allowlisted Sanity image hostname in `next.config.ts`. Keep the image dimensions and alt text alongside each asset.
6. Configure a signed revalidation webhook or rebuild on publication. Test draft exclusion, newly published ordering and featured ordering before switching.

Keep all write tokens server-side. Do not expose a write token in `NEXT_PUBLIC_*`. The current static generation requires a rebuild for JSON content changes.
