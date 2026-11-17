import { CollectionGrid } from "@/components/collection-grid";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react";
import { getFeatured } from "@/lib/content";
import { ProjectCard } from "@/components/project-card";
import { Invitation } from "@/components/footer";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  const featured = getFeatured();
  return (
    <>
      <section className="hero">
        <div className="hero-image-frame">
          <Image
            className="hero-photo"
            src="/images/pdf-1-2.webp"
            alt="A couple embracing beside still water in an intimate black and white photograph"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-topline">
          <span>PHOTOGRAPHY & CINEMATOGRAPHY</span>
          <span>LOVE. LIFE. EVERYTHING IN BETWEEN.</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">
            THE BEAUTY OF A MOMENT. THE FEELING OF FOREVER.
          </p>
          <h1>
            Some moments
            <br />
            deserve <em>forever.</em>
          </h1>
          <Link href="/portfolio" className="hero-link">
            Step inside our stories <ArrowUpRight size={20} />
          </Link>
        </div>
        <div className="hero-bottom">
          <span>REAL PEOPLE. BEAUTIFULLY TOLD.</span>
          <a href="#introduction" aria-label="Scroll to introduction">
            SCROLL TO DISCOVER <ArrowDown size={16} />
          </a>
          <span>A MOMENT, KEPT FOREVER</span>
        </div>
      </section>
      <section className="introduction section" id="introduction">
        <div className="intro-label">
          <Asterisk strokeWidth={1} size={38} />
          <p className="eyebrow">A LITTLE ABOUT US</p>
        </div>
        <div className="intro-copy reveal">
          <h2>
            Your love is a story
            <br />
            <em>worth remembering.</em>
          </h2>
          <div className="intro-bottom">
            <p>
              From the biggest celebrations to the smallest gestures.
              Photographs that bring you back to the people, the places, and the
              way it all felt.
            </p>
            <Link href="/about" className="text-link">
              Meet Curating Frames <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <CollectionGrid />
      <section className="stories section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A FEW PAGES FROM OUR DIARY</p>
            <h2>
              Life, <em>beautifully framed.</em>
            </h2>
          </div>
          <Link className="text-link" href="/portfolio">
            Explore our work <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="featured-grid">
          {featured.slice(0, 2).map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={{
                ...p,
                cover: p.featuredCover ?? p.cover,
                coverPosition: p.featuredCoverPosition ?? p.coverPosition,
              }}
              index={i}
            />
          ))}
        </div>
        <div className="story-note">
          <span className="eyebrow">NOT JUST HOW IT LOOKED.</span>
          <p>
            How it <em>felt.</em>
          </p>
          <span className="eyebrow">THAT’S WHAT WE HOLD ON TO.</span>
        </div>
      </section>
      <section className="photo-essay">
        <div className="essay-photo">
          <Image
            src="/images/pdf-1-5.webp"
            alt="A bride in a flowing dress silhouetted by a sunlit window"
            fill
            sizes="(max-width:700px) 100vw, 55vw"
          />
        </div>
        <div className="essay-copy reveal">
          <p className="eyebrow">THE IN-BETWEEN IS EVERYTHING</p>
          <h2>
            The fleeting.
            <br />
            The imperfect.
            <br />
            <em>The unforgettable.</em>
          </h2>
          <p>
            A glance across the room. A hand held a little tighter. The laughter
            that nobody saw coming. There’s a story in the smallest things.
          </p>
          <Link href="/portfolio" className="text-link">
            Find your kind of story <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <Invitation />
    </>
  );
}
