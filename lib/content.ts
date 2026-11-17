import entries from "@/data/projects.json";
export type Project = {
  title: string;
  slug: string;
  category: string;
  description: string;
  cover: string | null;
  images: string[];
  publishedAt: string;
  featuredOrder?: number;
  collectionOrder?: number;
  coverPosition?: string;
  galleryLayout?: "grid" | "editorial";
  status: string;
  externalGallery?: string;
  eventDate?: string;
  location?: string;
  videoUrl?: string;
};
export function getProjects(): Project[] {
  return (entries as Project[])
    .filter((p) => p.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
export function getFeatured() {
  return getProjects()
    .filter((p) => p.featuredOrder !== undefined)
    .sort((a, b) => a.featuredOrder! - b.featuredOrder!);
}
export function getCollections() {
  return getProjects()
    .filter((project) => project.cover && project.collectionOrder !== undefined)
    .sort((a, b) => a.collectionOrder! - b.collectionOrder!);
}
export const contact = {
  email: "curatingframes@gmail.com",
  phone: "+91 88061 19059",
  secondPhone: "+91 82610 63525",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
  whatsapp: "https://wa.me/918806119059",
  instagram: "https://www.instagram.com/curatingframes/",
};
