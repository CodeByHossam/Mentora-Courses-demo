import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

/**
 * The single button primitive for Mentora. Use `to` for navigation so links
 * keep link semantics while sharing the exact same visual state model.
 */
const Button = memo(({
  children,
  to,
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
    'inline-flex items-center justify-center gap-2',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' ');

  const variantClasses = {
    primary: 'btn-gradient-primary focus-visible:ring-brand-600',
    secondary: 'btn-ghost focus-visible:ring-brand-600',
    outline: 'btn-ghost focus-visible:ring-brand-600',
    ghost: 'btn-ghost focus-visible:ring-brand-600',
    accent: 'btn-accent focus-visible:ring-accent-700',
    warning: 'btn-accent focus-visible:ring-accent-700',
    danger: 'bg-error text-white hover:bg-error-dark focus-visible:ring-error',
    success: 'bg-success text-white hover:bg-success-dark focus-visible:ring-success',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-sm rounded-xl',
    lg: 'px-8 py-3.5 text-base rounded-xl',
  };

  const buttonClasses = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    fullWidth ? 'w-full' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {!loading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      {loading && <span className="sr-only">Loading</span>}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
        aria-busy={loading || undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (event) => event.preventDefault() : onClick}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
