import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contact } from "@/lib/content";
export function Invitation() {
  return (
    <section className="invitation">
      <p className="eyebrow">EVERY BEAUTIFUL STORY STARTS SOMEWHERE</p>
      <h2>
        Let’s make something
        <br />
        <em>worth remembering.</em>
      </h2>
      <Link className="text-link" href="/contact">
        Tell us your story <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <Link href="/" className="wordmark">
          curating<span>FRAMES</span>
        </Link>
        <p>
          For the moments.
          <br />
          For the feeling. For you.
        </p>
        <a
          href={contact.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="instagram-link"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle
              cx="17.5"
              cy="6.5"
              r="1"
              fill="currentColor"
              stroke="none"
            />
          </svg>
        </a>
        <a href={`mailto:${contact.email}`}>
          {contact.email}
          <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Curating Frames</span>
        <span>PHOTOGRAPHS THAT FEEL LIKE YOU</span>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}
