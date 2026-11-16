"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export function Animations() {
  const path = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    let dispose = () => {};
    let stopped = false;
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]).then(([{ gsap }, { ScrollTrigger }, { default: Lenis }]) => {
      if (stopped) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({
        autoRaf: true,
        anchors: true,
        smoothWheel: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const context = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>(".reveal")
          .forEach((element) =>
            gsap.fromTo(
              element,
              { y: 26 },
              {
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 93%",
                  once: true,
                },
              },
            ),
          );
        if (document.querySelector(".hero-photo"))
          gsap.to(".hero-photo", {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
      });
      dispose = () => {
        context.revert();
        lenis.destroy();
      };
      preference.addEventListener("change", onPreference);
    });
    function onPreference() {
      if (preference.matches) dispose();
    }
    return () => {
      stopped = true;
      dispose();
      preference.removeEventListener("change", onPreference);
    };
  }, [path]);
  return null;
}
