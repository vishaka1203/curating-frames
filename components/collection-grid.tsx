import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCollections } from "@/lib/content";
import { getMedia } from "@/lib/media";

/** Photo-first covers link to their own complete collection, never another event. */
export function CollectionGrid() {
  return (
    <section className="collections" aria-labelledby="collections-heading">
      <div className="collections-heading">
        <div>
          <p className="eyebrow">LOVE, LIFE & THE IN-BETWEEN</p>
          <h2 id="collections-heading">
            The <em>collections.</em>
          </h2>
        </div>
        <p>Choose a story. Stay for the feeling.</p>
      </div>
      <div className="collection-grid">
        {getCollections().map((project) => (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            className="collection-cover"
            aria-label={`Explore ${project.title} — ${project.category} collection`}
          >
            <Image
              src={project.cover!}
              alt={getMedia(project.cover!).alt}
              fill
              sizes="(max-width: 599px) 50vw, 33vw"
              style={{ objectPosition: project.coverPosition ?? "50% 50%" }}
            />
            <span className="collection-caption">
              <span>
                <span className="eyebrow">{project.category}</span>
                <span className="collection-title">{project.title}</span>
              </span>
              <ArrowUpRight size={23} strokeWidth={1.3} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
      <div className="collections-bottom">
        <span className="eyebrow">A MOMENT IS ONLY THE BEGINNING</span>
        <Link href="/portfolio" className="text-link">
          View all stories <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
