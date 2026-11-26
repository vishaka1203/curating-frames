"use client";
import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
const LineWaves = dynamic(() => import("./line-waves/LineWaves"), {
  ssr: false,
});
function subscribe(update: () => void) {
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
export function InvitationWaves() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );
  return (
    <div className="invitation-waves" aria-hidden="true">
      <LineWaves
        color1={dark ? "#C6B58C" : "#9B8969"}
        color2={dark ? "#8E856D" : "#B9AA8D"}
        color3={dark ? "#F2EBDD" : "#716D65"}
        speed={0.2}
        lineCount={45}
        lineWidth={1}
        glow={0.1}
        brightness={0.6}
        opacity={0.45}
        edgeFade={0.3}
        enableMouseInteraction={false}
        clickRipple={false}
        intro={false}
        lightMode={!dark}
        maxDevicePixelRatio={1}
      />
    </div>
  );
}
