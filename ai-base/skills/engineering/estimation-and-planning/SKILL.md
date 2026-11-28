---
name: estimation-and-planning
description: >-
  Estimate and plan software work: decomposition, story points vs time,
  uncertainty ranges, breaking down epics, milestones, and communicating risk.
  Use when sizing work or building a delivery plan. Trigger phrases: "estimate
  this", "story points", "how long will this take", "break down this epic",
  "sprint planning", "planning poker", "roadmap", "milestones", "scope".
---

# Estimation & Planning

Estimates are forecasts under uncertainty, not promises. Reduce uncertainty by
decomposing, use ranges, and re-estimate as you learn.

## When to use

- Estimating a task, feature, or project.
- Breaking an epic into deliverable increments.
- Building a sprint/milestone plan or roadmap.
- Trigger phrases: "estimate this", "story points", "how long", "break down
  this epic", "sprint planning", "planning poker", "roadmap", "scope".

## Instructions

1. Decompose until each item is small enough to estimate confidently (≤ a few days).
2. Estimate in relative units (points) for sizing, then map to time with your velocity/range.
3. Express uncertainty: best/likely/worst, or a confidence interval — never a single false-precise number.
4. Make assumptions explicit and separable (spike unknowns first).
5. Include non-coding work: tests, review, deploy, docs, coordination.
6. Plan in increments you can ship and validate; find the critical path.
7. Re-forecast as new information arrives; communicate slippage early.

### Decomposition

```text
Epic: "User can reset password"
├── API: request-reset endpoint (validate, rate-limit, email)
├── API: consume-token endpoint (verify, update, revoke)
├── Email template + delivery
├── UI: forgot-password + reset forms
├── Tests: unit + integration + E2E
└── Deploy + monitor
```

### Ranges, not points

```text
Estimate with a range: likely 5d, low 3d, high 10d.
Communicate: "3–10 working days, most likely ~5; the risk is the email provider."
```

### Planning table

```markdown
| Item | Est (pts) | Depends on | Risk |
|------|-----------|------------|------|
| request-reset API | 3 | — | low |
| consume-token API | 3 | token schema | med |
| email provider spike | 2 | — | high |
| UI forms | 3 | APIs | low |
```

## Examples

### Good — small items, ranges, stated assumption

> "Reset password: 11–16 pts (~1.5–2 weeks). Assumes we can reuse the existing
> email service; if not, add a 2–3 day spike."

### Bad — false precision, no decomposition

> "Reset password: 40 hours." (No breakdown; hides uncertainty; treats estimate
> as a commitment.)

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Estimating whole epics | Wildly inaccurate | Decompose first |
| Single-point promises | Ignore uncertainty | Ranges/intervals |
| Ignoring non-coding work | Underestimates | Include tests, review, deploy |
| Anchoring/no independent estimate | Bias | Planning poker, estimates before debate |
| Not re-estimating | Plan drifts, surprises | Re-forecast continuously |
| 100% capacity planning | No buffer for interruptions | Leave slack |
| Treating estimate as deadline | Pressure, corner-cutting | Estimate ≠ commitment |

## Related skills

- `engineering/tech-spec-writing`, `engineering/tech-debt`,
  `engineering/adr`, `career/promotion-doc`.
