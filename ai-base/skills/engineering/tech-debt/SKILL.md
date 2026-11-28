---
name: tech-debt
description: >-
  Identify, prioritize, and pay down technical debt: the debt quadrant,
  making debt visible, quantifying interest, allocating capacity, and safe
  incremental refactors. Use when code is slowing the team or decisions are
  getting harder. Trigger phrases: "technical debt", "tech debt", "refactor
  priority", "legacy code", "codebase is slowing us down", "20% time", "cleanup".
---

# Technical Debt

Debt is a trade: speed now for cost later. Some is deliberate and good; some is
reckless. Make it visible, quantify the interest, and repay the expensive parts.

## When to use

- Velocity or safety is suffering due to code quality.
- Deciding what to refactor and when.
- Advocating for cleanup time or prioritizing debt.
- Trigger phrases: "technical debt", "tech debt", "refactor priority",
  "legacy code", "codebase is slowing us down", "20% time", "cleanup".

## Instructions

1. Name each debt concretely: where, what it costs, and what it blocks.
2. Classify with the quadrant (below) to decide intent.
3. Quantify the **interest**: hours lost, incidents caused, features delayed.
4. Prioritize by interest paid and risk, not by "ugliness".
5. Reserve capacity (e.g., ~20%) and pay debt opportunistically near related work.
6. Refactor in small, safe steps behind tests; never big-bang rewrite.
7. Prevent new debt with standards, reviews, and definition of done.

### The debt quadrant (Fowler)

```text
              Reckless            Prudent
Deliberate  "No time for        "Ship now, we
             design"             know the trade-off,
                                 will pay later"
Inadvertent "What's a          "Now we know how
             layered arch?"      it should have been"
```

### Making debt visible

```markdown
| Debt | Location | Interest (cost) | Risk | Effort | Priority |
|------|----------|-----------------|------|--------|----------|
| No DB indexes | feed query | 1.2s p99, 8 incidents | High | S | P0 |
| Duplicated auth | 4 controllers | bugs on each change | Med | M | P1 |
| Outdated dep (CVEs) | package.json | security exposure | High | S | P0 |
```

### Safe repayment loop

```text
1. Add characterization tests around the code.
2. Refactor in small commits (extract, rename, isolate).
3. Keep behavior identical; review each step.
4. Remove the old path only when nothing uses it.
```

## Examples

### Good — quantified, risk-ranked

> "Auth logic is duplicated in 4 controllers; every change risks divergence
> (2 bugs last quarter). 3-day refactor behind tests. P1, schedule this sprint."

### Bad — vibes-based rewrite

> "The codebase is ugly, let's rewrite it in a new framework." (No scope,
> no risk analysis, no tests — high chance of regressing behavior.)

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| "Rewrite everything" | Years, regressions, value stalls | Incremental refactor |
| Debt invisible | Never prioritized | Debt register + interest |
| Prioritizing by ugliness | Fixes cheap, low-impact things | Prioritize by cost/risk |
| No tests before refactor | Silent behavior change | Characterization tests first |
| All-or-nothing cleanup sprint | Never approved | Steady 20% capacity |
| Letting it grow unchecked | Compounds, slows team | Standards + review |

## Related skills

- `engineering/code-quality`, `engineering/adr`,
  `engineering/migration-plan`, `workflow/debugging-playbook`.
