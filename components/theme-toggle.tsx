"use client";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
const subscribe = (callback: () => void) => {
  window.addEventListener("curating-theme", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("curating-theme", callback);
    window.removeEventListener("storage", callback);
  };
};
const snapshot = () => document.documentElement.dataset.theme === "dark";
export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, snapshot, () => false);
  function toggle() {
    const theme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("curating-theme", theme);
    } catch {
      /* The current visit still supports switching. */
    }
    window.dispatchEvent(new Event("curating-theme"));
  }
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
    >
      {dark ? (
        <Sun size={16} strokeWidth={1.25} />
      ) : (
        <Moon size={16} strokeWidth={1.25} />
      )}
    </button>
  );
}
