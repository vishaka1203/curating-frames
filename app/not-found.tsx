import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-intro section">
      <p className="eyebrow">404 — A FRAME OUT OF PLACE</p>
      <h1>
        Let’s find
        <br />
        <em>your way back.</em>
      </h1>
      <Link className="text-link" href="/">
        Return home ↗
      </Link>
    </section>
  );
}
