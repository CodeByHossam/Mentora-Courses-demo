---
name: system-design-prep
description: >-
  Prepare for and run system-design interviews: requirements, back-of-envelope
  estimation, high-level design, deep dives, bottlenecks, and trade-offs. Use for
  design interview preparation and practice. Trigger phrases: "system design
  interview", "design Twitter", "scalability interview", "back of envelope",
  "estimation interview", "design a URL shortener", "trade-offs interview".
---

# System Design Interview Prep

System design interviews assess **structured thinking, breadth, and trade-off
judgment** — not a memorized diagram. Drive a repeatable framework out loud.

## When to use

- Practicing or preparing for system-design interviews.
- Answering "design <X>" prompts.
- Structuring requirements, estimation, and deep dives.
- Trigger phrases: "system design interview", "design Twitter", "scalability
  interview", "back of envelope", "design a URL shortener", "trade-offs".

## Instructions

1. **Clarify requirements**: functional + non-functional (scale, latency, consistency).
2. **Estimate** scale (QPS, storage, bandwidth) back-of-envelope.
3. **High-level design** first: components and data flow; get agreement.
4. **Data model** and API surface.
5. **Deep dive** on 1–2 components the interviewer cares about.
6. Identify **bottlenecks**: scaling, hot spots, single points of failure.
7. Discuss **trade-offs** (CAP, SQL vs NoSQL, sync vs async) and justify choices.
8. Drive; don't go silent; state assumptions and evolve the design.

### Framework

```text
1. Requirements (5 min): users, core actions, scale, consistency, latency SLA
2. Estimation (5 min): QPS (read/write), storage/yr, bandwidth, cache size
3. High-level (10 min): API -> service -> storage -> cache -> queue, drawn
4. Deep dive (15 min): the hard part (feed, matching, consistency, hot keys)
5. Wrap (5 min): bottlenecks, failures, monitoring, what you'd improve
```

### Back-of-envelope

```text
DAU 10M, 10 actions/day -> ~1150 QPS avg, x3 peak ~3.5k QPS
1 KB/record * 10M/day -> ~10 GB/day -> ~3.6 TB/yr (x replicas)
Cache 20% hot data -> size accordingly; choose LRU + TTL
Latency: memory ~ns, SSD ~µs, network RTT ~ms, cross-region ~100ms
```

### Trade-off vocabulary

```text
CAP (consistency vs availability under partition)
Latency vs consistency (read replicas, eventual consistency)
SQL vs NoSQL (transactions/joins vs scale/flexibility)
Sync vs async (immediate UX vs decoupling/throughput)
Push vs pull (feeds: fan-out on write vs read)
```

## Examples

### Good — requirements first, trade-offs justified

> "URL shortener: 100M writes/day, read-heavy 100:1. ID generation: base62 on a
> counter vs hash — I'll use a distributed counter for uniqueness, hash for
> collision-short keys. Cache hot redirects in Redis (LRU), store in a KV store."

### Bad — jump to boxes, no requirements

> Immediately drawing Kafka + microservices with no scale numbers, no data model,
> no trade-off discussion.

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Skipping requirements | Solves the wrong problem | Clarify first |
| No scale estimation | Can't size components | Back-of-envelope |
| Buzzword architecture | Not grounded | Justify each choice |
| Going silent | Can't assess thinking | Think out loud |
| Ignoring bottlenecks | Incomplete design | Name hot spots + fixes |
| Only one option | No judgment shown | Compare and choose |
| Overengineering | Misses simplicity | Start simple, evolve |

## Related skills

- `career/hld-design`, `career/coding-interview-prep`,
  `architecture/data-and-systems-design`, `architecture/resilience-and-messaging`.
