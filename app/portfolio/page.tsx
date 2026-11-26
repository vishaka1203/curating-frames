import { getProjects } from "@/lib/content";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { Invitation } from "@/components/footer";
export const metadata = {
  title: "Our work",
  description:
    "Explore engagements, celebrations, birthdays and couple portraits by Curating Frames.",
  alternates: { canonical: "/portfolio" },
};
export default function Portfolio() {
  return (
    <>
      <section className="page-intro section">
        <p className="eyebrow">THE CURATING FRAMES COLLECTION</p>
        <h1>
          Every frame,
          <br />
          <em>a feeling.</em>
        </h1>
        <p>A collection of love, life, and all that makes it yours.</p>
      </section>
      <section className="section portfolio-section">
        <PortfolioGrid
          projects={getProjects().filter(
            (project) => project.slug !== "sehraj-birthday",
          )}
        />
      </section>
      <Invitation />
    </>
  );
}
