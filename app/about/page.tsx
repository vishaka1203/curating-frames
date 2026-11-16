import Image from "next/image";
import { Invitation } from "@/components/footer";
export const metadata = {
  title: "Our story",
  description:
    "Discover the people, feelings and moments at the heart of Curating Frames photography.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <>
      <section className="page-intro section">
        <p className="eyebrow">A LOVE FOR THE WAY LIFE FEELS</p>
        <h1>
          More than a photograph.
          <br />
          <em>A way back.</em>
        </h1>
      </section>
      <section className="about-story section">
        <div className="about-image">
          <Image
            src="/images/pheras-213.webp"
            alt="The bride in a delicate veil, photographed in soft warm light"
            fill
            priority
            sizes="(max-width:700px) 100vw, 50vw"
          />
        </div>
        <div className="about-copy">
          <p className="eyebrow">THIS IS CURATING FRAMES</p>
          <h2>
            For the people.
            <br />
            For the <em>feeling.</em>
          </h2>
          <p>“Your love is a story worth remembering.”</p>
          <p>
            That thought sits at the heart of this collection. Weddings,
            engagements, birthdays, anniversaries, family and couple portraits —
            each a different way of holding on to what matters.
          </p>
          <p>
            Explore the work, find the photographs that speak to you, and tell
            us about the moments you want to remember.
          </p>
        </div>
      </section>
      <section className="approach section">
        <p className="eyebrow">THE MOMENTS THAT MATTER</p>
        <div>
          <h2>
            Love in all
            <br />
            <em>its little details.</em>
          </h2>
          <p>
            The anticipation. The familiar faces. The joyful chaos of everyone
            together. This portfolio is a celebration of those feelings, and of
            photographs that let you return to them.
          </p>
        </div>
      </section>
      <Invitation />
    </>
  );
}
