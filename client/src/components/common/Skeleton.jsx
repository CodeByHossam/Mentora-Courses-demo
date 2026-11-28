import React from "react";

/** A single placeholder bar. Decorative: the region announces the loading. */
export function Skeleton({ className = "", width, height, circle = false }) {
  return (
    <span
      aria-hidden="true"
      className={["skeleton block", circle ? "rounded-full" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={{ width, height }}
    />
  );
}

/** Short, medium and long lines with a natural last-line drop-off. */
export function SkeletonText({ lines = 3, className = "" }) {
  const widths = ["w-full", "w-11/12", "w-2/3", "w-1/2"];
  return (
    <div className={`space-y-2.5 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          height="0.75rem"
          width={widths[Math.min(index, widths.length - 1)]}
        />
      ))}
    </div>
  );
}

/** Placeholder that holds the shape of a content card while data loads. */
export function SkeletonCard({ variant = "course", className = "" }) {
  if (variant === "stat") {
    return (
      <div className="card p-5" aria-hidden="true">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <Skeleton height="0.75rem" width="60%" />
            <Skeleton height="2rem" width="35%" />
          </div>
          <Skeleton circle width="2.75rem" height="2.75rem" />
        </div>
      </div>
    );
  }

  if (variant === "row") {
    return (
      <div className="card flex items-center gap-4 p-4" aria-hidden="true">
        <Skeleton circle width="2.5rem" height="2.5rem" />
        <div className="flex-1 space-y-2">
          <Skeleton height="0.85rem" width="45%" />
          <Skeleton height="0.7rem" width="70%" />
        </div>
        <Skeleton height="2rem" width="4rem" className="rounded-lg" />
      </div>
    );
  }

  return (
    <div className="card overflow-hidden p-0" aria-hidden="true">
      <div className="card-media aspect-[4/3]" />
      <div className="space-y-3 p-4">
        <Skeleton height="0.75rem" width="35%" />
        <Skeleton height="1.15rem" width="85%" />
        <SkeletonText lines={2} />
        <div className="flex gap-2 pt-2">
          <Skeleton height="2.25rem" width="45%" className="rounded-lg" />
          <Skeleton height="2.25rem" width="45%" className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/** A grid of card placeholders with one polite live announcement. */
export function SkeletonGrid({
  count = 6,
  variant = "course",
  label = "Loading",
  className = "",
}) {
  const columns =
    variant === "stat"
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : variant === "row"
        ? "lg:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`grid grid-cols-1 gap-5 ${columns} ${className}`}
    >
      <span className="sr-only">{label}</span>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} variant={variant} />
      ))}
    </div>
  );
}

/** Table/list placeholder that keeps column rhythm stable while loading. */
export function SkeletonRows({ rows = 5, columns = 4, label = "Loading" }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="card p-0">
      <span className="sr-only">{label}</span>
      <div className="border-b border-line p-4">
        <Skeleton height="0.75rem" width="30%" />
      </div>
      <div className="divide-y divide-line">
        {Array.from({ length: rows }, (_, row) => (
          <div
            key={row}
            className="flex items-center gap-6 p-4"
            aria-hidden="true"
          >
            {Array.from({ length: columns }, (_, column) => (
              <Skeleton
                key={column}
                height="0.8rem"
                width={column === 0 ? "30%" : `${18 + column * 6}%`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
