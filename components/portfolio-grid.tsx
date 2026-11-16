"use client";
import { useState } from "react";
import type { Project } from "@/lib/content";
import { ProjectCard } from "./project-card";
export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("All stories");
  const categories = [
    "All stories",
    ...new Set(projects.map((p) => p.category)),
  ];
  const selected = projects.filter(
    (p) => category === "All stories" || p.category === category,
  );
  return (
    <>
      <div className="filters" role="group" aria-label="Filter portfolio">
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {selected.length} stories
      </p>
      <div className="portfolio-grid">
        {selected.map((p, i) => (
          <ProjectCard project={p} index={i} key={p.slug} />
        ))}
      </div>
    </>
  );
}
