import React, { memo } from "react";

/**
 * The single card surface. `.card` owns the border, radius and base elevation;
 * this component only chooses padding and one elevation step through a CSS
 * variable, so a Tailwind shadow utility can never stack a second shadow.
 */
const PADDING = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  none: "p-0",
};

const SHADOW = {
  none: "none",
  xs: "var(--shadow-xs)",
  sm: "var(--shadow-sm)",
  base: "var(--shadow-card)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
  xl: "var(--shadow-xl)",
};

const Card = memo(
  ({
    children,
    as: Tag = "div",
    className = "",
    hover = false,
    interactive = false,
    padding = "md",
    shadow = "base",
    border = true,
    style,
    ...props
  }) => {
    const classes = [
      "card",
      PADDING[padding] || PADDING.md,
      border ? "" : "border-0",
      interactive || hover ? "card-hover group" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Tag
        className={classes}
        style={{ "--card-shadow": SHADOW[shadow] || SHADOW.base, ...style }}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Card.displayName = "Card";

export default Card;
