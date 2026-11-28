---
name: adr
description: >-
  Record Architecture Decision Records (ADRs): context, decision, status,
  consequences, and superseding earlier decisions. Use when making a significant,
  lasting technical decision worth documenting. Trigger phrases: "ADR",
  "architecture decision record", "document this decision", "decision log",
  "why did we choose", "supersede decision", "RFC decision".
---

# Architecture Decision Records (ADRs)

An ADR captures **why** a lasting decision was made, so future readers don't
relitigate it blindly. One decision per record; immutable once accepted.

## When to use

- Making a significant, hard-to-reverse technical decision.
- Asking "why did we do it this way?" about an existing choice.
- Changing or replacing a prior decision.
- Trigger phrases: "ADR", "architecture decision record", "document this
  decision", "decision log", "why did we choose", "supersede decision".

## Instructions

1. One decision per ADR; keep it short (one page).
2. Number and title them (`0007-use-redis-for-feed-cache`), store with the code.
3. Include: status, context, decision, consequences (good/bad), alternatives.
4. ADRs are **immutable**: to change a decision, write a new ADR that supersedes the old.
5. Link related ADRs and the spec/PR that implemented it.
6. Keep the tone neutral and factual.

### Template (Nygard-style)

```markdown
# 0007. Use Redis for the feed cache

- Status: Accepted
- Date: 2026-05-01
- Deciders: API team
- Supersedes: —
- Superseded by: —

## Context
Feed endpoint p95 hit 1.2s at 500 rps; DB was the bottleneck. Posts change
infrequently relative to reads.

## Decision
Introduce Redis as a read-through cache with a 5-minute TTL and event-based
invalidation on post publish/edit.

## Consequences
- Positive: p95 ~40ms; DB load down ~70%.
- Negative: new infra to operate; ≤5-min staleness on some reads.
- Neutral: adds a cache-invalidation path to the write flow.

## Alternatives considered
- DB indexes only (still ~300ms at peak).
- Full-page CDN (no personalization); rejected.
```

### Superseding

```markdown
# 0012. Move feed cache to in-process LRU
Status: Accepted — Supersedes 0007
Context: Redis ops cost outweighed benefit at current scale…
```

## Examples

### Good — narrow, dated, with consequences and alternatives

> "0007 uses Redis for the feed cache; records the latency problem, the TTL, the
> downsides, and why indexes alone were insufficient."

### Bad — a wiki page of architecture in general

> A 15-page "architecture overview" updated continuously. (Not decision-focused,
> not immutable, not reviewable.)

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Editing an accepted ADR | Loses the historical rationale | Supersede with a new ADR |
| Multiple decisions in one ADR | Hard to reference/supersede | One decision each |
| No context/consequences | Just a preference | Record why + impact |
| ADRs stored far from code | Discoverability dies | Keep alongside the repo |
| Only documenting "yes" decisions | Rejected options get retried | Record alternatives too |

## Related skills

- `engineering/tech-spec-writing`, `architecture/mern-architecture`,
  `engineering/tech-debt`, `engineering/migration-plan`.
