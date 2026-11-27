"use client";
import { useEffect, useId, useState } from "react";
let pendingVisit: Promise<number> | undefined;

function recordVisit() {
  // Keep one request across route changes and React development effect replay.
  pendingVisit ??= fetch("/api/visits", {
    method: "POST",
    credentials: "same-origin",
    cache: "no-store",
  })
    .then(async (response) => {
      if (!response.ok) throw new Error("Visit count unavailable");
      const { count } = await response.json();
      if (!Number.isSafeInteger(count) || count < 0)
        throw new Error("Invalid count");
      return count as number;
    })
    .catch((error) => {
      pendingVisit = undefined;
      throw error;
    });
  return pendingVisit;
}

export function VisitCounter() {
  const [count, setCount] = useState("Loading…");
  const id = useId();
  useEffect(() => {
    let active = true;
    recordVisit().then(
      (value) => {
        if (active)
          setCount(
            `${value.toLocaleString("en-IN")} ${value === 1 ? "visit" : "visits"}`,
          );
      },
      () => {
        if (active) setCount("Count unavailable");
      },
    );
    return () => {
      active = false;
    };
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
