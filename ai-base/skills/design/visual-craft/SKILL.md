---
name: visual-craft
description: >-
  Apply concrete visual-craft rules to UI code and designs so they look
  polished and intentional rather than generic: no gratuitous gradients/glow,
  no transition:all, contained stacking contexts, disciplined spacing,
  typography, neutrals, elevation, states, and motion. Use when reviewing UI/CSS
  or making a design feel less AI-generated. Trigger phrases: "make this look
  better", "polish this UI", "review my CSS", "looks generic", "tighten up
  this design", "visual polish", "spacing/typography".
---

# Visual Craft

Craft-level rules (taste and discipline) for components, pages, and stylesheets
— distinct from UX-flow critique. Full rule set: `references/craft-rules.md`.

## When to use

- Writing or reviewing frontend/UI code or a high-fidelity design.
- Making a UI look polished rather than templated/generic.
- Trigger phrases: "make this look better", "polish this UI", "review my CSS",
  "looks generic", "tighten this design", "fix spacing/typography".

## Instructions

1. Remove decoration that carries no meaning: gratuitous gradients, glow, drop shadows everywhere.
2. Never use `transition: all` — transition specific properties.
3. Establish one spacing scale and use it; whitespace should be deliberate.
4. Use a restrained neutral palette; reserve saturated color for meaning.
5. Build a clear type scale with consistent weights, line-heights, and measure.
6. Use elevation deliberately and consistently; avoid conflicting stacking contexts (`isolation: isolate`).
7. Design all interactive states: default, hover, active, focus, disabled, loading, empty, error.
8. Keep motion subtle and purposeful (short durations, meaningful easing).

### Banned / discouraged

```css
transition: all 0.3s;                 /* transition specific props instead */
background: linear-gradient(...);     /* unless meaningful */
box-shadow: 0 0 20px #6366f1;         /* glow */
content: "Lorem ipsum";               /* placeholder text shipped */
opacity: 0.999; z-index: 99999;       /* stacking hacks */
```

### Preferred

```css
.card { padding: 1rem 1.25rem; border-radius: 0.75rem;
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.05); }
.btn  { transition: background-color 150ms ease, box-shadow 150ms ease; }
.stack { isolation: isolate; }        /* contain stacking contexts */
```

### State coverage checklist

```
[ ] hover / active / focus-visible   [ ] disabled
[ ] loading / skeleton               [ ] empty state
[ ] error state                      [ ] long & short content
```

## Examples

### Good — restrained, consistent, complete states

```jsx
<button className="h-10 px-4 rounded-lg bg-brand-600 text-white font-medium
                   hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2
                   disabled:opacity-50 transition-colors">Save</button>
```

### Bad — decoration, globals, missing states

```css
button { background: linear-gradient(45deg,#f00,#00f); box-shadow: 0 0 30px red;
         transition: all .5s; }
```

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Gradients/glow with no meaning | Looks AI-generated/dated | Flat, purposeful color |
| `transition: all` | Animates layout, causes jank | Transition named props |
| Placeholder/lorem shipped | Unfinished look | Real copy or a clear empty state |
| Inconsistent spacing/type | Feels unpolished | One scale, applied consistently |
| Random z-index wars | Fragile stacking | `isolation: isolate` + sane layers |
| Missing interaction states | Feels broken | Design every state |
| Over-saturation | Visual noise | Neutral base + accent color |

## Related skills

- `design/ui-ux-principles`, `design/design-review`,
  `frontend/tailwind-conventions`, `design/accessibility-wcag`.
