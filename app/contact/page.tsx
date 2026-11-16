import { EnquiryForm } from "@/components/enquiry-form";
import { contact } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";
export const metadata = {
  title: "Get in touch",
  description:
    "Tell Curating Frames about your wedding, celebration or portrait session.",
  alternates: { canonical: "/contact" },
};
export default function Contact() {
  return (
    <section className="section contact-page">
      <div>
        <p className="eyebrow">LET’S BEGIN A BEAUTIFUL CHAPTER</p>
        <h1>
          Your story.
          <br />
          <em>Our next frame.</em>
        </h1>
        <p>
          Big plans or a small gathering. We’d love to hear what you have in
          mind.
        </p>
        <div className="contact-details">
          <a href={`mailto:${contact.email}`}>
            {contact.email}
            <ArrowUpRight size={16} />
          </a>
          <a href="tel:+918806119059">{contact.phone}</a>
          <a href="tel:+918261063525">{contact.secondPhone}</a>
          <a href={contact.instagram} target="_blank" rel="noreferrer">
            @curatingframes <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <EnquiryForm />
    </section>
  );
}
