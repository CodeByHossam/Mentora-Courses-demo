import React, { memo } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * The single button primitive for Mentora. One accent, solid states, no
 * transform-on-hover, and a focus ring that is defined by the theme.
 */
const Button = memo(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseClasses = [
    'inline-flex items-center justify-center gap-2 font-semibold',
    'transition-colors duration-150 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' ');

  const variantClasses = {
    primary: 'bg-brand text-white shadow-sm hover:bg-brand-dark focus-visible:ring-brand',
    secondary: 'bg-brand-soft text-brand-700 hover:bg-brand-200 focus-visible:ring-brand',
    outline: 'border border-brand-200 bg-white text-brand-700 hover:bg-brand-50 focus-visible:ring-brand',
    ghost: 'bg-transparent text-ink-soft hover:bg-brand-50 hover:text-brand-700 focus-visible:ring-brand',
    danger: 'bg-error text-white hover:bg-error-dark focus-visible:ring-error',
    success: 'bg-success text-white hover:bg-success-dark focus-visible:ring-success',
    warning: 'bg-warning text-white hover:bg-warning-dark focus-visible:ring-warning',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-2.5 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-xl',
  };

  const buttonClasses = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    fullWidth ? 'w-full' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      {!loading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      {loading && <span className="sr-only">Loading</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
