import React from 'react';
import { Loader2 } from 'lucide-react';

/** Full-screen loading state with a single accessible live region. */
const ProgressLoader = ({ message = 'Loading...', isVisible = false }) => {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-canvas/85 p-6 text-center"
    >
      <Loader2 className="h-12 w-12 animate-spin text-brand" aria-hidden="true" />
      <p className="text-base font-semibold text-ink">{message}</p>
      <span className="sr-only">Loading</span>
    </div>
  );
};

export default ProgressLoader;
