"use client";
import { useEffect, useId, useState } from "react";
export function VisitCounter() {
  const [count, setCount] = useState("Loading…");
  const id = useId();
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/visits", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unavailable");
        const result = await response.json();
        setCount(`${result.count} visits`);
      })
      .catch((error) => {
        if (error.name !== "AbortError") setCount("Count unavailable");
      });
    return () => controller.abort();
  }, []);
  return (
    <span className="visit-counter" tabIndex={0} aria-describedby={id}>
      Visits
      <span id={id} className="visit-counter-tooltip" role="tooltip">
        {count}
      </span>
    </span>
  );
}
