import React from "react";

/**
 * One stat-card anatomy across every dashboard: label, value, context and a
 * single soft icon tile. No colored left borders — the accent carries meaning
 * once, in the icon tile.
 */
const TONES = {
  brand: "bg-brand-50 text-brand-700",
  success: "bg-success-soft text-success-dark",
  warning: "bg-warning-soft text-warning-dark",
  info: "bg-info-soft text-info-dark",
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  hint,
  tone = "brand",
  loading = false,
  className = "",
}) => {
  if (loading) {
    return (
      <div className={`card p-5 sm:p-6 ${className}`} aria-busy="true">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="skeleton h-3 w-2/5" />
            <div className="skeleton h-8 w-1/3" />
            <div className="skeleton h-3 w-1/2" />
          </div>
          <div className="skeleton h-11 w-11 rounded-xl" />
        </div>
        <span className="sr-only">Loading {label}</span>
      </div>
    );
  }

  return (
    <div className={`card p-5 sm:p-6 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink-soft">{label}</p>
          <p className="mt-2 text-3xl font-bold leading-none tracking-tight text-ink">
            {value}
          </p>
          {hint ? (
            <p className="mt-2 text-xs text-ink-muted">{hint}</p>
          ) : null}
        </div>
        {Icon ? (
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              TONES[tone] || TONES.brand
            }`}
            aria-hidden="true"
          >
            <Icon className="h-5 w-5" />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default StatCard;
