---
name: resilience-and-messaging
description: >-
  Build resilient distributed systems: timeouts, retries with backoff, circuit
  breakers, idempotency, and async messaging/queues (at-least-once delivery, dead
  letters, backpressure, sagas). Use when integrating services or processing
  async work. Trigger phrases: "circuit breaker", "retry logic", "timeout",
  "backoff", "message queue", "dead letter queue", "at-least-once", "idempotency
  key", "backpressure", "distributed transaction", "saga".
---

# Resilience & Messaging

Distributed calls fail: networks drop, peers slow, messages duplicate. Design for
partial failure — degrade gracefully rather than cascade.

## When to use

- Calling external services or other internal services.
- Introducing async queues/workers or event-driven flows.
- Handling retries, timeouts, or duplicate delivery.
- Trigger phrases: "circuit breaker", "retry", "timeout", "backoff",
  "message queue", "dead letter queue", "at-least-once", "idempotency",
  "backpressure", "saga".

## Instructions

1. Set an explicit **timeout** on every outbound call; never wait forever.
2. **Retry** only idempotent/transient failures, with exponential backoff + jitter and a cap.
3. Wrap flaky dependencies in a **circuit breaker**; fail fast when open.
4. Make write operations **idempotent** (idempotency keys), because retries duplicate.
5. For async: assume **at-least-once** delivery; consumers must be idempotent.
6. Add a **dead-letter queue** for poison messages; alert on its growth.
7. Apply **backpressure** (bounded queues) to avoid unbounded memory growth.
8. Use sagas/compensations instead of distributed transactions across services.

### Timeout + retry with backoff

```js
const callWithRetry = async (fn, { retries = 3, base = 100, cap = 2000 } = {}) => {
  for (let a = 0; ; a++) {
    try { return await withTimeout(fn(), 1500); }   // hard timeout per attempt
    catch (err) {
      if (a >= retries || !isTransient(err)) throw err;
      const delay = Math.min(cap, base * 2 ** a) + Math.random() * base;  // jitter
      await sleep(delay);
    }
  }
};
```

### Circuit breaker states

```text
closed     -> normal; count failures
open       -> after threshold, fail fast for a cooldown
half-open  -> allow a probe; success closes, failure reopens
```

### Idempotent consumer (at-least-once)

```js
async function handle(msg) {
  const seen = await store.hasProcessed(msg.id);
  if (seen) return;                         // duplicate delivery -> no-op
  await process(message);                   // effect
  await store.markProcessed(msg.id);        // dedupe key persisted atomically
}
```

### DLQ + backpressure

```text
queue -> workers (bounded concurrency)
  success -> ack
  retriable fail -> requeue with backoff (max N)
  poison fail -> dead-letter queue (alert + manual/replay tooling)
Bounded in-memory queues reject/shed load instead of OOM.
```

## Examples

### Good — timeout, bounded retry, DLQ, idempotency

```js
await callWithRetry(() => payments.charge(key, amount), { retries: 3 });
// consumer dedupes by msg.id; poison messages route to DLQ with alerts
```

### Bad — unbounded retry, no timeout, non-idempotent consumer

```js
while (true) { try { await charge(); break; } catch {} }   // infinite retry, double charges
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| No timeouts | Hangs, resource exhaustion | Per-call timeout |
| Retrying non-idempotent writes | Duplicate effects | Idempotency keys |
| Retry without backoff/jitter | Retry storms, thundering herd | Exponential + jitter |
| Retrying permanent errors | Wastes capacity | Classify transient vs permanent |
| No DLQ | Poison messages block queue | DLQ + alert |
| Unbounded queues | Memory blowup | Bounded + backpressure |
| Distributed 2PC across services | Fragile, blocking | Sagas + compensations |
| Assuming exactly-once | Lost/duplicated work | At-least-once + idempotency |

## Related skills

- `architecture/caching-and-performance`, `workflow/incident-response`,
  `testing/contract-testing`, `architecture/api-design`.
