/** Register in a configured Sanity Studio. This module needs no credentials. */
export const projectSchema = {
  name: "project",
  title: "Portfolio project",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "category", type: "string" },
    {
      name: "cover",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
    },
    {
      name: "images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string" }],
        },
      ],
    },
    { name: "description", type: "text" },
    { name: "eventDate", type: "date" },
    { name: "location", type: "string" },
    { name: "publishedAt", type: "datetime" },
    { name: "featuredOrder", type: "number" },
    { name: "videoUrl", type: "url" },
    { name: "externalGallery", type: "url" },
    {
      name: "status",
      type: "string",
      options: { list: ["draft", "published"] },
      initialValue: "draft",
    },
  ],
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Featured order",
      name: "featured",
      by: [{ field: "featuredOrder", direction: "asc" }],
    },
  ],
};
