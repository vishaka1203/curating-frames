import { getMedia } from "@/lib/media";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content";
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <Link className="project-card reveal" href={`/portfolio/${project.slug}`}>
      <div
        className={`project-cover ${!project.cover ? "typographic-cover" : ""}`}
      >
        {project.cover ? (
          <Image
            src={project.cover}
            alt={getMedia(project.cover).alt}
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
          />
        ) : (
          <span>
            {project.title}
            <small>VIEW THE STORY ↗</small>
          </span>
        )}
        <span className="cover-arrow">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="project-caption">
        <div>
          <span className="eyebrow">{project.category}</span>
          <h3>{project.title}</h3>
        </div>
        <span className="project-number">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </Link>
  );
}
