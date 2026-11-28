---
name: design-review
description: >-
  Run a compact, high-signal UX/UI review of a screen, flow, or site using
  Nielsen's heuristics, Rams' principles, Web Interface Guidelines, and
  cognitive-load/conversion checks. Use for design critique and "is this good
  UX?" requests. Trigger phrases: "review my UI", "UX feedback", "heuristic
  audit", "is this good UX", "critique this design", "check my site",
  "accessibility of this flow", "improve this screen".
---

# Design Review

One consolidated review skill combining several proven frameworks. Focus on the
highest-impact issues, not exhaustive framework detail. Detailed references live
in `references/`:
`ux-heuristics-review.md`, `dieter-rams-principles.md`,
`general-design-review.md`, `cognitive-load-conversion.md`,
`persuasive-ux.md`, `web-interface-guidelines.md`.

## When to use

- Reviewing a screenshot, mockup, feature, flow, or site.
- Heuristic/UX audit, or deciding whether a design is "good."
- Reducing friction or improving conversion.
- Checking a UI against Web Interface Guidelines.
- Trigger phrases: "review my UI", "UX feedback", "heuristic audit", "is this
  good UX", "critique this design", "check my site", "improve this flow".

## Instructions

1. If the design has not been measured, run `design/design-tokens` first.
2. Pick the 3–6 most relevant lenses rather than applying all frameworks.
3. Lead with a one-line verdict, then prioritized findings (impact high → low).
4. Each finding: what, why it matters, and a concrete fix.
5. Separate visual findings from implementation checks that need code/interaction.
6. End with the single highest-leverage next step.

### Lenses

| Lens | Use for |
|---|---|
| Nielsen's 10 heuristics | General usability, system status, error prevention |
| Rams' 10 principles | Honesty, usefulness, minimalism, longevity |
| Web Interface Guidelines | Concrete web conventions (links, forms, focus, keyboard) |
| Cognitive load | Forms, flows, drop-off, "too much to process" |
| Persuasion (Fogg) | Engagement and conversion surfaces |
| WCAG (see `accessibility-wcag`) | Accessibility-specific passes |

### Output shape

```markdown
**Verdict:** <one line>

## Top findings
1. <issue> — impact: high — fix: ...
2. ...

## Notes
- Implementation checks needed: ...
- Next step: ...
```

## Examples

### Good — prioritized, concrete, scoped

> **Verdict:** clear and usable; two friction points.
> 1. *Signup form asks for 9 fields up front* — impact: high — ask only for
>    email+password, collect the rest after first value.
> 2. *Error message says "invalid input"* — impact: medium — name the field and
>    the fix.
> Next step: ship the shorter signup and measure completion.

### Bad — everything at once, no priorities

> Violates Hick's Law, Fitts' Law, the aesthetic-usability effect, and needs
> ARIA, better spacing, and darker text.

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Applying every framework | Noise, no priorities | Pick relevant lenses |
| Opinions without principles | Not actionable | Tie each finding to a reason |
| Critiquing before measuring | Subjective guesses | Measure tokens first |
| No concrete fix | Leaves team stuck | Provide the change |
| Ignoring accessibility | Legal/usability debt | Include a WCAG pass |

## Related skills

- `design/ui-ux-principles`, `design/visual-craft`,
  `design/accessibility-wcag`, `design/design-tokens`, `design/ux-research`.
