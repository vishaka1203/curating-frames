export const metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <article className="section legal">
      <p className="eyebrow">CURATING FRAMES</p>
      <h1>
        Your privacy
        <br />
        <em>matters.</em>
      </h1>
      <p>
        The enquiry form collects your name, email, telephone number, event
        details and message so Curating Frames can respond to your request.
        Please share only details necessary for your enquiry.
      </p>
      <p>
        When you submit the form, your details open in WhatsApp as a prepared
        message to +91 88061 19059. You review and send it yourself in WhatsApp.
        WhatsApp processes the message under its own privacy policy. This
        website does not keep enquiry submissions in a database or use
        advertising trackers.
      </p>
      <p>
        The footer shows a shared visit total. A signed, anonymous cookie lasts
        24 hours so reloads and page navigation do not count as new visits in
        the same browser during that period. Common automated crawlers are
        excluded. The counter stores only an aggregate total, not names, contact
        details, or browsing histories.
      </p>
      <p>
        External Pixieset and Instagram links take you to services with their
        own privacy policies. To ask about your enquiry information or request
        deletion, contact{" "}
        <a href="mailto:curatingframes@gmail.com">curatingframes@gmail.com</a>.
      </p>
    </article>
  );
}
