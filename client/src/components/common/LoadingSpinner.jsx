import React, { memo } from 'react';
import { Loader2 } from 'lucide-react';

/** One spinner primitive: token colors, no pulsing text, and a live status. */
const LoadingSpinner = memo(({
  size = 'md',
  color = 'primary',
  className = '',
  text,
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const colorClasses = {
    primary: 'text-brand',
    secondary: 'text-brand-400',
    gray: 'text-ink-muted',
    white: 'text-white',
  };

  const status = (
    <div
      role="status"
      aria-live="polite"
      className={[
        'flex flex-col items-center justify-center gap-2',
        fullScreen ? 'text-ink-soft' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <Loader2
        className={[
          'animate-spin',
          sizeClasses[size] || sizeClasses.md,
          colorClasses[color] || colorClasses.primary,
        ].join(' ')}
        aria-hidden="true"
      />
      {text ? (
        <p className="text-sm text-ink-soft">{text}</p>
      ) : (
        <span className="sr-only">Loading</span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/85 p-6">
        {status}
      </div>
    );
  }

  return status;
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
