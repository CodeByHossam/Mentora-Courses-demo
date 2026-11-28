import React from "react";
import { BookOpen } from "lucide-react";

/**
 * Full-screen route/auth loader. A small, calm card replaces the oversized
 * spinning icon; the live region announces only the message once.
 */
const ProgressLoader = ({ message = "Loading...", isVisible = false }) => {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/90 p-6"
    >
      <div className="card flex w-full max-w-xs flex-col items-center gap-5 p-8 text-center shadow-md">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
          <BookOpen className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-base font-semibold text-ink">{message}</p>
          <span className="sr-only">Loading</span>
        </div>
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-brand-100"
          aria-hidden="true"
        >
          <div className="loader-progress h-full w-1/3 rounded-full bg-brand" />
        </div>
      </div>
    </div>
  );
};

export default ProgressLoader;
