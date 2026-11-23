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
        <div className="about-image about-image-film">
          <Image
            src="/images/carol-reuben-san06510.webp"
            alt="Carol entering the church in her wedding gown and long veil"
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
      <section
        className="creative-team section"
        aria-labelledby="creative-team-heading"
      >
        <div className="creative-team-intro">
          <p className="eyebrow">BEHIND THE CREATIVITY</p>
          <h2 id="creative-team-heading">
            Two perspectives.
            <br />
            <em>One shared feeling.</em>
          </h2>
          <p>
            Neha V Parab and Sidarth A Nandodakar are the creative people behind
            Curating Frames. Together, they bring a thoughtful eye to the
            laughter, quiet glances and little moments that make every story its
            own.
          </p>
          <p>
            Their approach is easy and personal: help you feel comfortable, let
            the day unfold, and create photographs that feel honest, warm and
            timeless.
          </p>
        </div>
        <div className="creative-team-portraits">
          <figure>
            <Image
              src="/images/destination-portfolio-2-347.webp"
              alt="Neha V Parab"
              width={1080}
              height={1193}
              sizes="(max-width:700px) 85vw, 30vw"
            />
            <figcaption>
              <h3>Neha V Parab</h3>
              <p>Curating Frames</p>
            </figcaption>
          </figure>
          <figure>
            <Image
              src="/images/destination-portfolio-2-350.webp"
              alt="Sidarth A Nandodakar"
              width={1179}
              height={1205}
              sizes="(max-width:700px) 85vw, 30vw"
            />
            <figcaption>
              <h3>Sidarth A Nandodakar</h3>
              <p>Curating Frames</p>
            </figcaption>
          </figure>
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
