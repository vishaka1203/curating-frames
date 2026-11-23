"use client";
import Image, { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** A short, skippable homepage title sequence; never blocks deep links. */
export function OpeningSequence() {
  const path = usePathname();
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const initialPath = useRef(path);
  useEffect(() => {
    if (
      initialPath.current !== "/" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const show = requestAnimationFrame(() => setVisible(true));
    const finish = window.setTimeout(() => setVisible(false), 12000);
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", escape);
    return () => {
      cancelAnimationFrame(show);
      clearTimeout(finish);
      window.removeEventListener("keydown", escape);
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    const finish = window.setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(finish);
  }, [ready]);
  if (!visible || path !== "/") return null;
  const mobilePhoto = getImageProps({
    src: "/images/opening-mobile-portrait.webp",
    alt: "Carol and Reuben embracing beneath a veil at sunset",
    fill: true,
    quality: 90,
    sizes: "100vw",
  }).props;
  return (
    <div
      className={`opening-sequence${ready ? " is-ready" : " is-loading"}`}
      aria-label="Curating Frames opening"
    >
      <div className="opening-image">
        <picture>
          <source
            media="(max-width: 700px)"
            srcSet={mobilePhoto.srcSet}
            sizes="100vw"
          />
          <Image
            src="/images/carol-reuben-b4p09425-edit.webp"
            alt="Carol and Reuben together beside the water"
            fill
            sizes="100vw"
            priority
            quality={90}
            onLoad={async (event) => {
              const image = event.currentTarget;
              try {
                await image.decode();
              } catch {
                /* A loaded image can still be displayed. */
              }
              setReady(true);
            }}
            onError={() => setVisible(false)}
          />
        </picture>
      </div>
      <div className="opening-scrim" />
      <div className="opening-top">
        PHOTOGRAPHY & CINEMATOGRAPHY <span>GOA · INDIA</span>
      </div>
      <div className="opening-brand">
        <span>curating</span>
        <strong>
          FRAMES<sup>®</sup>
        </strong>
      </div>
      <div className="opening-bottom">
        <span>A moment becomes a memory.</span>
        <button onClick={() => setVisible(false)}>Enter the stories ↗</button>
      </div>
      <div className="opening-progress" />
    </div>
  );
}
