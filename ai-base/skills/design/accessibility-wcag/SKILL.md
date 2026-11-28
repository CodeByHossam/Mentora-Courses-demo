---
name: accessibility-wcag
description: >-
  Review UIs, designs, and flows for accessibility against WCAG 2.1 A/AA, with
  practical fixes for contrast, keyboard use, screen readers, forms, and focus.
  Use for accessibility audits and inclusive-design critiques. Trigger phrases:
  "accessibility audit", "WCAG", "a11y", "contrast", "keyboard navigation",
  "screen reader", "focus", "ARIA", "alt text", "inclusive design".
---

# Accessibility Review (WCAG 2.1)

Review designs and interfaces using WCAG 2.1 Level A/AA as the baseline.
Prioritize issues that block or degrade use for people with visual, motor,
auditory, cognitive, or assistive-technology needs. Full review guide:
`references/wcag-review.md`.

## When to use

- Auditing a UI, screenshot, mockup, or flow for accessibility.
- Checking contrast, keyboard access, focus, forms, or screen-reader behavior.
- Trigger phrases: "accessibility audit", "WCAG", "a11y", "contrast",
  "keyboard navigation", "screen reader", "focus order", "ARIA", "alt text".

## Instructions

1. Frame findings with the four WCAG principles: Perceivable, Operable, Understandable, Robust.
2. Default to Level A/AA; mention AAA as a recommendation only unless asked.
3. Separate **visual** findings (assessable from an image) from **implementation** checks (require code/interaction).
4. Never claim conformance from a screenshot — say "likely", "needs verification", or "passes visually".
5. Give each issue: severity, location, principle, impact, and a concrete fix.
6. Provide accessible code snippets when the fix is implementation-level.

### Screenshot review limits

- **Can assess visually**: contrast risk, text size, labels, layout, touch-target size, visible focus, color-only meaning, error copy, spacing, hierarchy, likely reading order.
- **Cannot verify from a screenshot**: keyboard access, focus order, semantics, accessible names, alt text, ARIA, live regions, screen-reader behavior, reflow, exact contrast ratios, dynamic announcements.

### Output shape

```markdown
**Verdict:** Accessibility risks to fix

## Findings
### 1. <short title> — <principle> — <severity>
- What: ...
- Impact: ...
- Fix: ...
```

## Examples

### Good — actionable, scoped, honest about limits

> **Contrast (Perceivable, High):** the CTA text looks light on a light-blue
> fill. Verify a ≥4.5:1 ratio (3:1 for large/bold). Use `text-white` on
> `bg-brand-600` (7.0:1) or darken the button. *Keyboard focus not assessable
> from the screenshot — needs verification.*

### Bad — vague and overclaiming

> This design is not accessible. Add ARIA.

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Claiming WCAG conformance from a screenshot | Overclaims; hides limits | State confidence explicitly |
| Color as the only signal | Fails color-blind users | Add text/icon/shape |
| Removing focus outlines | Blocks keyboard use | Provide a visible focus ring |
| ARIA soup | Wrong semantics worse than none | Prefer native elements |
| `div` buttons without role/keyboard | Inoperable | Real `<button>` + handlers |
| Placeholder as the only label | Disappears, inaccessible | Persistent `<label>` |
| Tiny touch targets | Hard to tap | ≥ 44×44px targets |

## Related skills

- `design/ui-ux-principles`, `design/visual-craft`,
  `frontend/react-component-patterns`, `frontend/react-forms`.
