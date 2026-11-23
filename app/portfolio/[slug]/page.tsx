import { getProjects } from "@/lib/content";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Gallery } from "@/components/gallery";
import { Invitation } from "@/components/footer";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProjects().find((p) => p.slug === slug);
  return {
    title: p?.title ?? "Story not found",
    description: p?.description,
    alternates: { canonical: `/portfolio/${slug}` },
  };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  const p = projects[index];
  if (!p) notFound();
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index + projects.length - 1) % projects.length];
  return (
    <>
      <section className="project-intro section">
        <Link className="back-link" href="/portfolio">
          <ArrowLeft size={15} /> All stories
        </Link>
        <p className="eyebrow">{p.category}</p>
        <h1>{p.title}</h1>
        <p>{p.description}</p>
      </section>
      {p.cover && (
        <div
          className="project-hero"
          style={
            p.slug === "carol-and-reuben"
              ? { height: "auto", minHeight: 0, aspectRatio: "3 / 2" }
              : undefined
          }
        >
          <Image
            src={p.cover}
            alt={`${p.title} cover photograph`}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: p.coverPosition ?? "50% 40%" }}
          />
        </div>
      )}
      <section className="section">
        {p.images.length > 0 ? (
          <Gallery images={p.images} title={p.title} layout={p.galleryLayout} />
        ) : (
          <div className="external-story">
            <p className="eyebrow">THE ORIGINAL GALLERY</p>
            <h2>
              A story waiting
              <br />
              <em>to be opened.</em>
            </h2>
            <p>This collection lives in the original Pixieset gallery.</p>
            <a
              className="button button-dark"
              href={p.externalGallery}
              target="_blank"
              rel="noreferrer"
            >
              Open the gallery <ArrowUpRight size={17} />
            </a>
          </div>
        )}
        <div className="project-pagination">
          <Link href={`/portfolio/${previous.slug}`}>← {previous.title}</Link>
          <Link href={`/portfolio/${next.slug}`}>{next.title} →</Link>
        </div>
      </section>
      <Invitation />
    </>
  );
}
