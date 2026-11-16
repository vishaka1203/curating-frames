import { getSiteUrl } from "@/lib/site-url";
import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Animations } from "@/components/animations";
const editorial = localFont({
  src: [
    { path: "../public/fonts/cormorant.ttf", weight: "400", style: "normal" },
    {
      path: "../public/fonts/cormorant-italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-editorial",
});
const sans = localFont({
  src: "../public/fonts/manrope.ttf",
  weight: "400",
  display: "swap",
  variable: "--font-sans",
});
const siteUrl = getSiteUrl();
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || "http://localhost:3000"),
  title: {
    default: "Curating Frames — Stories worth remembering",
    template: "%s | Curating Frames",
  },
  description:
    "Photography for love, celebrations, and the moments in between. Explore the Curating Frames portfolio.",
  openGraph: {
    type: "website",
    siteName: "Curating Frames",
    images: [{ url: "/images/pdf-1-2.webp", width: 1200, height: 630 }],
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${editorial.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Animations />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Curating Frames",
              ...(siteUrl ? { url: siteUrl } : {}),
              email: "curatingframes@gmail.com",
              telephone: "+918806119059",
              sameAs: ["https://www.instagram.com/curatingframes/"],
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
