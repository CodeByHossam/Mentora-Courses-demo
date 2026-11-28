import React from "react";

/** Consistent empty state: an icon, one clear sentence and one next action. */
const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}) => (
  <div
    className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-surface-muted/40 px-6 py-14 text-center ${className}`}
  >
    {Icon ? (
      <span
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6" />
      </span>
    ) : null}
    <h3 className="text-base font-semibold text-ink">{title}</h3>
    {description ? (
      <p className="mt-2 max-w-sm text-sm leading-6 text-ink-soft">
        {description}
      </p>
    ) : null}
    {action ? <div className="mt-6">{action}</div> : null}
  </div>
);

export default EmptyState;
