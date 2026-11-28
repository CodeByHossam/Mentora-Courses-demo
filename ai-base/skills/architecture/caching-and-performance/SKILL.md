---
name: caching-and-performance
description: >-
  Improve performance with caching and indexing: HTTP caching, Redis, CDN,
  in-memory caches, cache invalidation, stale-while-revalidate, and MongoDB index
  strategy. Use when p95 latency or DB load is high. Trigger phrases: "caching",
  "slow query", "Redis", "cache invalidation", "CDN", "indexing", "p95 latency",
  "N+1 query", "cache strategy", "performance".
---

# Caching & Performance

Caching is a latency/budget trade against consistency. Add it only after you've
measured the bottleneck. Indexes are the first performance lever for Mongo.

## When to use

- Endpoints are slow or the DB is a bottleneck.
- Adding a cache layer or CDN.
- Deciding TTLs, invalidation, or cache keys.
- Trigger phrases: "caching", "slow query", "Redis", "cache invalidation",
  "CDN", "indexing", "p95 latency", "N+1 query".

## Instructions

1. **Measure first** — find the slow layer (DB, CPU, network, external) before caching.
2. Prefer the cheapest fix: fix the query/index — then cache.
3. Cache at the right layer: client/browser → CDN → app (Redis) → DB.
4. Choose a TTL and an invalidation strategy; never cache control-flow data.
5. Use deterministic cache keys including all inputs and a version.
6. For Mongo: index what you filter/sort on; use `.explain()` to confirm.
7. Avoid N+1 queries with `populate`, `$lookup`, or batching.

### Caching layers

```text
Browser   Cache-Control / ETag          (free, per user)
CDN       static assets, public GETs    (edge, global)
App       Redis / in-memory             (shared, fast, needs invalidation)
DB        indexes, query result cache    (closest to data)
```

### TTL + invalidation

```js
async function getUser(id) {
  const key = `user:v1:${id}`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  const user = await userRepo.findById(id);
  await redis.set(key, JSON.stringify(user), 'EX', 300);   // 5 min TTL
  return user;
}
// invalidate on write
await userRepo.update(id, patch);
await redis.del(`user:v1:${id}`);
```

### stale-while-revalidate (HTTP)

```http
Cache-Control: public, max-age=60, stale-while-revalidate=300
ETag: "abc123"
```

### Mongo indexing

```js
// compound index matching the query: filter(authorId) + sort(-createdAt)
schema.index({ authorId: 1, createdAt: -1 });

// verify: should show IXSCAN, not COLLSCAN, and few docsExamined
await Post.find({ authorId }).sort({ createdAt: -1 }).explain('executionStats');
```

### Avoid N+1

```js
// bad: one query per post to get author
const posts = await Post.find();
for (const p of posts) p.author = await User.findById(p.authorId);

// good: single round trip
const posts = await Post.find().populate('authorId', 'name avatar');
```

## Examples

### Good — indexed, cached, invalidated

```js
schema.index({ authorId: 1, createdAt: -1 });     // fast filtered reads
const cached = await redis.get(key);              // hot path served from Redis
// on write: del the affected keys
```

### Bad — cache without invalidation, query without index

```js
await redis.set(key, JSON.parse(data), 'EX', 86400);   // stale for a day, never invalidated
await Post.find({ author: id }).sort({ createdAt: -1 });  // COLLSCAN on 5M docs
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Caching before measuring | Masks the real bug | Profile, then cache |
| No invalidation strategy | Stale/wrong data | TTL + event-based del |
| Over-long TTLs on volatile data | Users see stale state | Match TTL to freshness need |
| Unversioned cache keys | Schema drift, bad hits | Include `v1` + all inputs |
| Caching per-user private data at CDN | Data leakage | `private`/no-store |
| Missing indexes on filter/sort | Full collection scans | Compound indexes |
| N+1 queries | Latency explosion | `populate`/batch |

## Related skills

- `backend/mongodb-schema-design`, `workflow/debugging-playbook`,
  `workflow/observability`, `frontend/react-performance`.
