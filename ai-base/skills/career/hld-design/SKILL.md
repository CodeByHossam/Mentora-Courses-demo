---
name: hld-design
description: >-
  Produce a high-level design (HLD) document for interviews or real work:
  component diagrams, data flow, scaling strategy, reliability, and a written
  rationale. Use when producing an architecture overview or take-home design.
  Trigger phrases: "high-level design", "HLD", "design document for a system",
  "architecture overview", "take-home design", "diagram a system", "scaling plan".
---

# High-Level Design (HLD)

An HLD communicates the shape of a system and why it's shaped that way. It's the
diagram plus the reasoning — components, data flow, scaling, and failure handling.

## When to use

- Writing an architecture overview for a system or service.
- Producing a take-home design deliverable.
- Explaining a system to stakeholders or interviewers.
- Trigger phrases: "high-level design", "HLD", "architecture overview",
  "take-home design", "diagram a system", "scaling plan".

## Instructions

1. State requirements and constraints first (functional + non-functional).
2. Draw the **component diagram**: clients, gateway, services, stores, caches, queues.
3. Describe the **data flow** for the 2–3 core use cases.
4. Specify the **data model** and storage choices with rationale.
5. Explain **scaling**: read/write paths, partitioning, caching, CDN.
6. Address **reliability**: redundancy, failure modes, graceful degradation.
7. Call out **trade-offs**, alternatives, and open questions.
8. Keep it diagram-led and rationale-driven; avoid unbounded detail.

### Template

```markdown
# HLD: <system>
## Requirements
- Functional: …
- Non-functional: scale, latency, availability, consistency
## Component diagram
clients -> API gateway -> services -> (DB, cache, queue, object store)
## Data flow (core flows)
1. <flow> step by step
## Data model & storage
- entity -> store + why
## Scaling
- reads: replicas/CDN/cache · writes: partitioning · hot keys
## Reliability
- redundancy, failover, degradation, monitoring
## Trade-offs & alternatives
## Open questions
```

### ASCII diagram

```text
[Client] -> [CDN] -> [API Gateway] -> [Auth svc] -> [Postgres]
                                   -> [Feed svc] -> [Redis] + [Kafka] -> [Workers]
                                   -> [Media svc] -> [S3 + CDN]
```

## Examples

### Good — requirements, flows, scaling, rationale

> "Read-heavy feed (100:1). Fan-out on write to Redis feed lists for active users;
> fall back to fan-out on read for celebrities to avoid huge writes. Postgres for
> posts, Redis for feeds, Kafka for async fan-out. Trade-off: extra writes for
> precomputed reads."

### Bad — diagram with no reasoning

> A box diagram and nothing about scale, data model, failures, or trade-offs.

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Diagram without rationale | Unexplainable | Pair each box with why |
| No requirements/NFRs | Can't judge the design | State constraints first |
| No data flow | Unclear how it works | Walk core flows |
| Ignoring failure modes | Fragile design | Add reliability section |
| Over-detail (code-level) | Not "high level" | Stay at component level |
| Buzzword sprawl | Not grounded | Justify every element |
| No trade-offs/alternatives | No judgment shown | Discuss options |

## Related skills

- `career/system-design-prep`, `engineering/tech-spec-writing`,
  `architecture/mern-architecture`, `engineering/adr`.
