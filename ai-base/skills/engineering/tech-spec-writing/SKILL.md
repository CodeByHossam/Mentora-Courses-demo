---
name: tech-spec-writing
description: >-
  Write technical design docs and specs: problem framing, goals/non-goals,
  proposed design, alternatives, trade-offs, rollout, and open questions. Use
  when proposing a non-trivial change or aligning a team before building.
  Trigger phrases: "design doc", "tech spec", "RFC", "write a spec", "proposal",
  "architecture doc", "trade-offs", "goals and non-goals".
---

# Technical Spec Writing

A spec aligns people and surfaces problems before code exists. Write for the
reviewer's time: lead with the decision, justify with trade-offs.

## When to use

- Proposing a non-trivial feature, system, or migration.
- Aligning multiple people/teams before implementation.
- Documenting a significant design decision.
- Trigger phrases: "design doc", "tech spec", "RFC", "write a spec", "proposal",
  "architecture doc", "trade-offs", "goals and non-goals".

## Instructions

1. Start with the **problem** and why it matters; define goals and **non-goals**.
2. Summarize the proposal up front (TL;DR), then detail.
3. Present the design with diagrams and concrete interfaces.
4. List **alternatives** considered and why they were rejected.
5. Make trade-offs and risks explicit; state the impact/blast radius.
6. Describe rollout, migration, testing, and monitoring.
7. End with open questions and a decision/status. Keep it as short as clarity allows.

### Structure

```markdown
# <Title>
Status: Draft | In review | Accepted | Superseded
Author(s): …  Reviewers: …  Date: …

## TL;DR
One paragraph: the decision and why.

## Problem & context
What's broken/missing; why now; who's affected.

## Goals / Non-goals
- Goal: …
- Non-goal: … (explicitly out of scope)

## Proposed design
Interfaces, data flow, diagrams, key components.

## Alternatives considered
Option B, Option C — and why not.

## Trade-offs, risks, impact
What we give up; blast radius; failure modes.

## Rollout & migration
Flag? expand-contract? backfill? monitoring? rollback?

## Testing
How we verify correctness and performance.

## Open questions
- [ ] …
```

## Examples

### Good — decision-first, explicit trade-offs

> "TL;DR: introduce Redis to cache the feed (p95 1.2s→40ms). Non-goal: real-time
> invalidation. Alternative: DB indexes alone (rejected: still 300ms at peak).
> Risk: stale feed ≤5 min. Rollout behind a flag."

### Bad — solution with no problem or alternatives

> "We will use Kafka." (No problem statement, no alternatives, no risks — a pitch,
> not a spec.)

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| No problem/goals | Reviewers can't judge fit | Frame problem + goals first |
| No non-goals | Scope creep, confusion | State what's out |
| Only one option | No trade-off analysis | Present alternatives |
| Solution dumped, no context | Unreviewable | TL;DR + rationale |
| No rollout/rollback | Risky implementation | Include migration + monitoring |
| 20-page doc, no decision | Nobody reads | Concise, decision-first |
| Spec never updated | Misleads later | Reflect status; supersede when stale |

## Related skills

- `engineering/adr`, `architecture/mern-architecture`,
  `engineering/estimation-and-planning`, `engineering/pr-review`.
