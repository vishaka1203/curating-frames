"use client";
import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
const Silk = dynamic(() => import("./silk/Silk"), { ssr: false });
function subscribeTheme(update: () => void) {
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
function subscribeMotion(update: () => void) {
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", update);
  return () => media.removeEventListener("change", update);
}
export function IntroductionSilk() {
  const dark = useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  return (
    <div className="introduction-silk" aria-hidden="true">
      <Silk
        speed={1.2}
        scale={1}
        color={dark ? "#2B2D26" : "#E3DDCF"}
        sheenColor="#C6B58C"
        lightMode={!dark}
        noiseIntensity={0.35}
        sheen={0.15}
        glow={0}
        depth={0.25}
        mouseInteraction={false}
        clickRipple={false}
        intro={false}
        paused={reduced}
        dpr={1}
      />
    </div>
  );
}
