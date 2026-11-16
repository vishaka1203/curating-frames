import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";
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
        <a href={contact.instagram} target="_blank" rel="noreferrer">
          Instagram <Camera size={16} />
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
