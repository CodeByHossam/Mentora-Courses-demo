---
name: tailwind-conventions
description: >-
  Tailwind CSS conventions: design tokens in config, consistent spacing/color
  scales, responsive and container classes, dark mode, variants with CVA/slot,
  and avoiding class soup. Use when styling React/components with Tailwind,
  building a design system, or cleaning up utility classes. Trigger phrases:
  "Tailwind", "utility classes", "design tokens", "tailwind.config", "dark mode",
  "responsive classes", "CVA", "class ordering", "class soup".
---

# Tailwind Conventions

Treat Tailwind as a design system, not a bag of utilities. Centralize tokens in
the config, compose variants deliberately, and keep class strings readable.

## When to use

- Styling React components with Tailwind.
- Defining/altering design tokens (colors, spacing, fonts, radii).
- Building reusable components with variants.
- Implementing responsive layouts or dark mode.
- Cleaning up unreadable "class soup".
- Trigger phrases: "Tailwind", "utilities", "design tokens", "tailwind.config",
  "dark mode", "responsive", "CVA", "class ordering".

## Instructions

1. Put brand values (colors, fonts, spacing, radii, shadows) in `tailwind.config`, not inline hex/px — and derive them from the product's design concept, not from the example block below.
2. Use the spacing scale consistently; avoid arbitrary values unless truly one-off.
3. Compose variants with a helper (`clsx`/`tailwind-merge` or CVA) instead of conditionals spread across JSX.
4. Keep class order stable: layout → box → typography → color → state, with variants last.
5. Prefer responsive prefixes (`sm: md: lg:`) mobile-first; avoid fixed widths.
6. Use `dark:` variants against a defined palette rather than duplicating components.
7. Extract repeated patterns into components, not `@apply`-heavy global CSS.

### Tokens in config

> Illustrative only — the `brand` indigo ramp and `Inter` below show the *shape* of a token block, not a recommended theme. Replace them with values derived from the product's design concept; never reuse them as defaults.

```js
// tailwind.config.js
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50: '#eef2ff', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca' },
        surface: { DEFAULT: '#ffffff', dark: '#0b0f19' },
      },
      borderRadius: { xl: '0.75rem' },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
};
```

### Variant composition (CVA + merge)

```ts
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';

export const cx = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const button = cva('inline-flex items-center gap-2 rounded-lg font-medium transition-colors', {
  variants: {
    variant: {
      primary: 'bg-brand-600 text-white hover:bg-brand-700',
      ghost: 'text-brand-700 hover:bg-brand-50',
    },
    size: { sm: 'h-8 px-3 text-sm', md: 'h-10 px-4' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});

<button className={cx(button({ variant: 'ghost', size: 'sm' }), className)} />
```

### Responsive + dark mode

```jsx
<div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3
                bg-surface dark:bg-surface-dark text-slate-900 dark:text-slate-100">
  <h2 className="text-lg font-semibold sm:text-xl">Title</h2>
</div>
```

### Consistent class ordering

```jsx
// layout → size/spacing → typography → color → effects → state → variants
<article className="flex flex-col gap-3 p-4 text-sm text-slate-700 bg-white rounded-xl shadow-sm
                    hover:shadow-md md:flex-row">
```

## Examples

### Good — tokens, variants, mobile-first

```jsx
<Button variant="primary" className="w-full sm:w-auto">Continue</Button>
```

### Bad — magic values, contradictory classes, no merge

```jsx
<div className="w-[437px] text-[#3b82f6] p-[13px] bg-blue-500 bg-red-500">...</div>
// arbitrary everything; conflicting bg-* with no twMerge so order decides unpredictably
```

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Arbitrary values everywhere | Off-scale, inconsistent | Add tokens to config |
| Long conditional class strings in JSX | Unreadable, error-prone | CVA / `cx` helper |
| `@apply` for whole components | Loses Tailwind's colocation, hard to trace | Extract a component |
| Conflicting classes without merge | Unpredictable result | `tailwind-merge` |
| Desktop-first responsive | Extra overrides | Mobile-first prefixes |
| Hardcoded hex in JSX | Theme drift | Semantic color tokens |
| Copying the example tokens verbatim | Every project looks the same | Derive from the product's design concept |
| Fixed pixel widths | Breaks small screens | Fluid/max-width + grid |

## Related skills

- `design/ui-ux-principles`, `design/visual-craft`,
  `frontend/react-component-patterns`, `design/accessibility-wcag`.
