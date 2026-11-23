"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** A short, skippable homepage title sequence; never blocks deep links. */
export function OpeningSequence() {
  const path = usePathname();
  const [visible, setVisible] = useState(false);
  const initialPath = useRef(path);
  useEffect(() => {
    if (
      initialPath.current !== "/" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const show = requestAnimationFrame(() => setVisible(true));
    const finish = window.setTimeout(() => setVisible(false), 5000);
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
  if (!visible || path !== "/") return null;
  return (
    <div className="opening-sequence" aria-label="Curating Frames opening">
      <div className="opening-image">
        <Image
          src="/images/carol-reuben-b4p09425-edit.webp"
          alt="A bride and groom walking hand in hand beside the water"
          fill
          sizes="100vw"
          priority
        />
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
