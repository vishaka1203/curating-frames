import Link from "next/link";
import { ArrowUpRight, ArrowUp } from "lucide-react";
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
    <footer className="site-footer" aria-label="Studio information">
      <div className="footer-main">
        <div className="footer-brand">
          <div>
            <Link
              href="/"
              className="wordmark"
              aria-label="Curating Frames home"
            >
              curating<span>FRAMES</span>
            </Link>
            <p className="footer-tagline">
              For the moments.
              <br />
              For the feeling. For you.
            </p>
          </div>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Curating Frames on Instagram (opens in a new tab)"
            className="footer-instagram"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
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
        </div>
        <nav className="footer-explore" aria-labelledby="footer-explore-title">
          <h2 className="footer-label" id="footer-explore-title">
            Explore
          </h2>
          <Link href="/portfolio">Our work</Link>
          <Link href="/about">Our story</Link>
          <Link href="/contact">Enquire</Link>
        </nav>
        <div className="footer-contact">
          <h2 className="footer-label">Get in touch</h2>
          <a className="footer-email" href={`mailto:${contact.email}`}>
            <span>{contact.email}</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a className="footer-phone" href="tel:+918806119059">
            {contact.phone}
          </a>
          <Link className="footer-enquiry" href="/contact">
            Tell us about your celebration{" "}
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="footer-utility">
        <span>© {new Date().getFullYear()} Curating Frames</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <a href="#main">
            Back to top <ArrowUp size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
