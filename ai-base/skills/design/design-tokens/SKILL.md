---
name: design-tokens
description: >-
  Analyze a design (image, screenshot, or live URL) and return structured design
  data — typography, color palette, spacing, composition, shape, motion — then
  emit it as tokens. Use before critiquing or rebuilding a design. Trigger
  phrases: "analyze this design", "what fonts/colors", "extract the design
  system", "design tokens", "reverse-engineer this UI", "color palette",
  "spacing scale", "break down this page".
---

# Design Analysis & Tokens

Measure a design before critiquing or copying it. Produce concrete values —
typography, palette, spacing, composition, shape, motion — and express them as
reusable tokens (e.g., CSS variables, Tailwind config, or shadcn/ui tokens).
Full methodology: `references/design-analysis.md`.

## When to use

- Extracting the design system behind a page or mockup.
- Finding exact fonts, colors, and spacing for a rebuild.
- Comparing two designs quantitatively.
- Feeding a design system's tokens into code.
- Trigger phrases: "analyze this design", "what fonts/colors", "extract the
  design system", "design tokens", "reverse-engineer this UI", "color palette",
  "spacing scale".

## Instructions

1. Ask for the source: an image/screenshot or a URL (a URL allows real pixel/computed-style sampling).
2. Measure, don't guess — read real values where possible.
3. Report each category with concrete values and confidence.
4. Normalize to scales: type ramp, spacing scale, radii, shadows, color roles.
5. Emit tokens in the format the project uses (CSS vars / Tailwind / shadcn).
6. Derive values from the product's own design concept — never default to the illustrative example values below.
7. Only after measurement, hand off to a review skill.

### Categories to report

```
Typography : families, weights, sizes, line-heights, measure
Color      : palette + roles (bg, surface, text, border, accent, states), contrast notes
Spacing    : base unit, scale, component padding/gaps, layout rhythm
Composition: grid, alignment, hierarchy, density, whitespace
Shape      : radii, borders, icon style
Motion     : durations, easing, what animates
```

### Token output example — structure only

> Illustrative only. The hex values, `"Inter"`, and scales below show the *shape* of a token set, not a recommended theme. Replace them with values measured or derived for the actual product; never reuse them as defaults.

```css
:root {
  --color-bg: #ffffff;     --color-surface: #f8fafc;
  --color-text: #0f172a;   --color-muted: #64748b;
  --color-accent: #4f46e5;
  --radius-md: 0.5rem;     --radius-lg: 0.75rem;
  --space-1: 0.25rem; --space-2: 0.5rem; --space-4: 1rem; --space-6: 1.5rem;
  --font-sans: "Inter", system-ui, sans-serif;
}
```

## Examples

### Good — measured, role-based, ready for code

> Palette extracted: bg `#ffffff`, surface `#f8fafc`, text `#0f172a`
> (contrast 15.6:1), accent `#4f46e5`. Base spacing unit 4px; type ramp
> 12/14/16/20/24/32. Confidence: high (pixel-sampled).

### Bad — vague, unmeasurable

> It uses a nice blue and clean sans-serif with good spacing.

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Guessing colors/fonts | Wrong tokens ship | Sample real values |
| Reporting raw hex with no roles | Useless to implement | Map to semantic roles |
| One-off values, no scale | Inconsistent UI | Normalize to scales |
| Skipping measurement before critique | Subjective feedback | Measure first |
| Ignoring contrast | Accessibility debt | Note ratios vs WCAG |
| Copying the example tokens verbatim | Every project looks the same | Derive from the product's design concept |

## Related skills

- `design/design-review`, `design/ui-ux-principles`,
  `frontend/tailwind-conventions`, `design/accessibility-wcag`.
