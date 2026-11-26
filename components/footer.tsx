import Link from "next/link";
import { InvitationWaves } from "@/components/invitation-waves";
import { VisitCounter } from "@/components/visit-counter";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { contact } from "@/lib/content";
export function Invitation() {
  return (
    <section className="invitation">
      <InvitationWaves />
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
          <div className="footer-socials" aria-label="Social media">
            <a
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Curating Frames on Instagram (opens in a new tab)"
              className="footer-social-link"
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
            {contact.facebook ? (
              <a
                className="footer-social-link"
                href={contact.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Curating Frames on Facebook (opens in a new tab)"
              >
                <FacebookIcon />
              </a>
            ) : (
              <span
                className="footer-social-link social-pending"
                role="img"
                aria-label="Facebook — link coming soon"
                title="Facebook link coming soon"
              >
                <FacebookIcon />
              </span>
            )}
            <a
              className="footer-social-link"
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with Curating Frames on WhatsApp (opens in a new tab)"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.6Z" />
                <path
                  d="m8.3 7.3 1.5 2.5-1.1 1.1a8 8 0 0 0 4.4 4.4l1.1-1.1 2.5 1.5c-.2 1.3-1.1 2-2.4 1.7-4.1-1-7.2-4.1-8.2-8.2-.3-1.3.4-2.2 1.7-2.4Z"
                  transform="translate(1 -1) scale(.95)"
                />
              </svg>
            </a>
          </div>
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
        <VisitCounter />
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

function FacebookIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4C17.2 1.2 16 1 14.7 1 11.5 1 9.5 3 9.5 6.5V9H6v4h3.5v9Z" />
    </svg>
  );
}
