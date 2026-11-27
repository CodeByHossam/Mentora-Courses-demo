import React, { memo } from 'react';

/**
 * Card container. Cards are content surfaces, not decorative blocks: no blur,
 * no scale-on-hover. Hover changes border and shadow only.
 */
const Card = memo(
  ({
    children,
    className = '',
    hover = false,
    padding = 'md',
    shadow = 'base',
    border = true,
    ...props
  }) => {
    const paddingClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      none: 'p-0',
    };

    const shadowClasses = {
      none: '',
      sm: 'shadow-sm',
      base: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    };

    const baseClasses = [
      'card min-w-0 rounded-xl',
      'transition-[box-shadow,border-color] duration-150 ease-out',
      paddingClasses[padding] || paddingClasses.md,
      shadowClasses[shadow] || shadowClasses.base,
      border ? 'border' : 'border-0',
      hover ? 'cursor-pointer hover:border-brand-200 hover:shadow-lg' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={baseClasses} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
