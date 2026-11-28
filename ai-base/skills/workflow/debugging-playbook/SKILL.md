---
name: debugging-playbook
description: >-
  A systematic debugging playbook: reproduce, isolate, root-cause (5 Whys /
  fishbone), read logs and traces, profile slow endpoints, and find Node memory
  leaks. Use when something is broken, slow, or leaking. Trigger phrases: "debug
  this", "why is this failing", "root cause", "slow endpoint", "p99 latency",
  "memory leak", "analyze these logs", "flaky", "trace the error".
---

# Debugging Playbook

Debugging is a method, not luck: **reproduce → isolate → prove the cause → fix →
verify**. Never change code before you can explain the failure.

## When to use

- A bug, error, or exception you cannot yet explain.
- A slow endpoint or high memory usage.
- Investigating an incident from logs/traces.
- Trigger phrases: "debug this", "why is this failing", "root cause",
  "slow endpoint", "p99", "memory leak", "analyze logs", "flaky".

## Instructions

1. **Reproduce** deterministically. Capture the exact input, environment, and steps.
2. **Isolate**: binary-search the system (disable features, bisect commits, narrow inputs).
3. **Observe**: read the error, stack, logs, and traces before theorizing.
4. **Hypothesize**, then design a test that could **disprove** it.
5. **Root-cause** with 5 Whys / fishbone — find the systemic fix, not the symptom.
6. **Fix the cause**, add a regression test, and verify under the original conditions.
7. For performance/memory, profile first; optimize last.

### Core loop

```
reproduce -> isolate -> observe -> hypothesize -> test -> fix -> regression test -> verify
```

### Root cause (5 Whys / fishbone)

```text
Symptom: checkout failed for some users at 3pm.
Why? The payment call timed out.
Why? Avg latency jumped from 200ms to 4s at peak.
Why? The DB connection pool was exhausted.
Why? A new endpoint held connections during a slow external call.
Root cause: connections acquired before awaits -> pool exhaustion. (fix: acquire late, cap concurrency)
```

### Log & trace analysis

```text
- Start from the correlation/request id; follow it across services.
- Filter noise: level, time window, service, id.
- Look for the first error, not the storm of downstream errors.
- Reconstruct a timeline; note what changed right before.
- Prefer structured logs (JSON) with ids over free text.
```

### Slow endpoint (latency)

```bash
# find the slow layer: DB? external? CPU? GC?
# Node: --prof, clinic flame, or 0x; APM trace; query EXPLAIN/pipeline
node --prof server.js          # then: node --prof-process isolate-*.log
```

```text
1. Measure p50/p95/p99 (not just average).
2. Break down time: middleware, DB, external calls, serialization.
3. Check N+1 queries, missing indexes, unbounded payloads.
4. Distinguish queuing (pool/backpressure) from processing (CPU/GC).
```

### Node memory leak

```text
Symptoms: RSS grows over time -> OOM/crash.
1. Take heap snapshots over time; diff retained objects.
2. Look for: growing arrays/maps, unremoved EventEmitter listeners,
   caches without eviction, timers/intervals, closures over large data.
3. Reproduce under load, confirm the object graph is retained.
```

## Examples

### Good — reproducible, evidence-first

```text
Repro: POST /orders with 12+ items returns 500. Logs show MongoConnectionError.
Isolation: works with 11 items -> boundary at payload size.
Cause: body limit 10kb + no pagination. Fix: raise limit + cap items + validation.
Regression test added.
```

### Bad — shotgun debugging

```text
Tried restarting, added try/catch, bumped the timeout, disabled the feature.
It "seems fixed". (No cause identified, no test.)
```

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Guessing fixes without repro | Wastes time, hides cause | Reproduce + isolate first |
| Optimizing before profiling | Fixes the wrong thing | Measure, then fix |
| Treating the symptom | Recurs | 5 Whys to root cause |
| Ignoring logs/traces | Reinvents evidence | Read structured logs |
| Changing many things at once | Can't attribute the fix | One change at a time |
| No regression test | Regression returns | Add a test for the cause |
| Debugging in prod by poking around | Risky, inconclusive | Reproduce locally/staging |

## Related skills

- `workflow/incident-response`, `workflow/observability`,
  `architecture/caching-and-performance`, `testing/unit-testing`.
