---
name: data-and-systems-design
description: >-
  Design data models and systems at scale: SQL vs NoSQL, normalization vs
  denormalization, schema evolution and migrations, indexing strategy,
  consistency, partitioning/sharding, and storage trade-offs. Use when choosing
  data stores or modeling data for growth. Trigger phrases: "data modeling",
  "SQL vs NoSQL", "schema design", "normalization", "denormalization",
  "sharding", "partitioning", "CAP", "consistency", "database design",
  "how should I store this".
---

# Data & Systems Design

Data outlives code. Choose the store from access patterns and consistency needs,
model for the queries you'll actually run, and plan how the schema evolves.

## When to use

- Choosing a datastore or modeling entities/relationships.
- Deciding between normalized and denormalized data.
- Planning schema evolution, indexes, or scaling (sharding/replicas).
- Trigger phrases: "data modeling", "SQL vs NoSQL", "schema design",
  "normalization", "denormalization", "sharding", "CAP", "consistency",
  "database design", "how should I store this".

## Instructions

1. Start from **access patterns and queries**, not from a normalized ideal.
2. Pick the store to fit: relational for relational integrity/transactions, document for flexible aggregate-shaped reads.
3. Normalize for correctness and write efficiency; denormalize deliberately for read performance — and own the duplication.
4. Index for the queries you run (compound, covering); know each index's write cost.
5. Plan **schema evolution**: additive changes and versioned migrations; avoid breaking reads.
6. Choose consistency per use case (strong for money/identity, eventual for feeds/counters).
7. Scale reads with replicas, writes with partitioning/sharding — only when needed.

### SQL vs NoSQL (by fit, not fashion)

| Need | Prefer |
|---|---|
| Transactions, joins, strong consistency | Relational (Postgres/MySQL) |
| Aggregate-shaped docs, flexible schema, scale-out reads | Document (MongoDB) |
| Blazing key lookups, ephemeral data | Key-value (Redis/DynamoDB) |
| Search, ranking, full-text | Search engine (Elastic/OpenSearch) |
| Time-series | Time-series DB |

### Normalized vs denormalized

```text
Normalized:   users <- orders (FK). No duplication; joins on read.
Denormalized: order embeds { userId, userName, userEmail }. Fast reads; update anomalies.
Rule: store what a read needs; embed data that changes together and is read together.
```

### Mongo modeling: embed vs reference

```text
Embed     one-to-few, read together, bounded size   (address in user, order lines)
Reference one-to-many/unbounded, shared entities     (posts -> author, comments)
Guard against unbounded arrays (16MB doc limit).
```

### Schema evolution / migration

```text
1. Additive first: add nullable field, backfill, then start writing/reading it.
2. Expand/contract for renames: add new -> migrate readers -> drop old.
3. Version documents; write a migration script that's idempotent and re-runnable.
4. Keep a migration history; test forward and rollback.
```

### Scaling axes

```text
Reads:  replicas, caching, read models (CQRS)
Writes: partition/shard by a high-cardinality key; avoid hot partitions
Consistency: CAP/consistency models chosen per data class
```

## Examples

### Good — model matches access pattern

```text
Feed page needs: latest posts with author name/avatar.
-> Embed lightweight author summary in the post doc; read = one query, no join.
    Accept denormalization; update via events when author changes.
```

### Bad — relational ideal in a document store, unbounded array

```text
user doc with `posts: [ ...all posts ever... ]`  -> hits 16MB, slow writes, hot doc.
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Choosing store by hype | Fights the tool | Choose by access patterns |
| No schema versioning | Painful, risky migrations | Version + expand/contract |
| Indexing everything | Slow writes, big storage | Index only real queries |
| Denormalizing with no update plan | Drift/stale data | Own the duplication + events |
| Unbounded arrays/documents | Doc-size limits, hot writes | Reference / bucket |
| Hot shard key (monotonic) | One node overloaded | High-cardinality key |
| Blocking destructive migrations | Downtime/rollback risk | Additive, idempotent, tested |

## Related skills

- `backend/mongodb-schema-design`, `architecture/caching-and-performance`,
  `architecture/resilience-and-messaging`, `engineering/migration-plan`.
