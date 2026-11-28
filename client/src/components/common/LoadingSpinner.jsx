import React, { memo } from "react";

/**
 * One inline loading indicator: a restrained indigo ring on a static track.
 * It announces its state once and never pulses its label.
 */
const SIZES = {
  xs: "h-3.5 w-3.5 border-2",
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
  xl: "h-12 w-12 border-4",
};

const COLORS = {
  primary: "border-brand-100 border-t-brand",
  secondary: "border-brand-100 border-t-brand-400",
  gray: "border-line border-t-ink-muted",
  white: "border-white/30 border-t-white",
};

const LoadingSpinner = memo(
  ({
    size = "md",
    color = "primary",
    className = "",
    text,
    fullScreen = false,
    label = "Loading",
  }) => {
    const ring = (
      <span
        className={[
          "inline-block shrink-0 animate-spin rounded-full",
          SIZES[size] || SIZES.md,
          COLORS[color] || COLORS.primary,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      />
    );

    const status = (
      <div
        role="status"
        aria-live="polite"
        className={[
          "flex items-center justify-center gap-2.5 text-ink-soft",
          text ? "flex-row" : "",
          fullScreen ? "flex-col gap-3 text-center" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {ring}
        {text ? (
          <span className="text-sm font-medium text-ink-soft">{text}</span>
        ) : (
          <span className="sr-only">{label}</span>
        )}
      </div>
    );

    if (fullScreen) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/90 p-6">
          {status}
        </div>
      );
    }

    return status;
  },
);

LoadingSpinner.displayName = "LoadingSpinner";

export default LoadingSpinner;
