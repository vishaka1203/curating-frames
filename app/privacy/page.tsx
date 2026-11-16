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
        When online enquiries are configured, your message is processed by
        Resend and sent to the studio’s email inbox. This website does not keep
        enquiry submissions in a database or use advertising trackers.
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
