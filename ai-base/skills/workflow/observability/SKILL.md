---
name: observability
description: >-
  Design logs, metrics, and traces; track the four golden signals; define
  SLO/SLI/SLA and alerts that avoid fatigue. Use when instrumenting a service or
  fixing noisy/missing monitoring. Trigger phrases: "observability", "logging",
  "metrics", "tracing", "golden signals", "SLO", "alerting", "dashboards",
  "alert fatigue", "Prometheus", "OpenTelemetry".
---

# Observability

You can't debug what you can't see. Observability = logs + metrics + traces.
Instrument for the questions you'll ask during an incident, and alert on symptoms
users feel, not on every metric.

## When to use

- Instrumenting a new service or endpoint.
- Setting up logging, metrics, tracing, dashboards, or alerts.
- Alerts are too noisy or an incident was invisible.
- Trigger phrases: "observability", "logging", "metrics", "tracing",
  "golden signals", "SLO", "alerting", "alert fatigue", "Prometheus",
  "OpenTelemetry".

## Instructions

1. Emit **structured JSON logs** with a request/correlation id; no secrets, no `console.log` in prod.
2. Record the **four golden signals** per service: latency, traffic, errors, saturation.
3. Propagate a **trace** across service and DB calls to reconstruct requests.
4. Define **SLIs** (measured), **SLOs** (targets), and alert on error-budget burn.
5. Alert on symptoms (user-visible), page only for actionable, urgent issues.
6. Build a dashboard per service: request rate, error rate, p50/p95/p99, saturation, dependencies.
7. Tie each alert to a runbook.

### Structured logging

```ts
import pino from 'pino';
export const log = pino({ level: process.env.LOG_LEVEL ?? 'info' });

log.info({ reqId, route: req.originalUrl, userId: req.user?.id }, 'request');
// never: log.info({ password, token, authorization });  -> redact these
```

### Golden signals

| Signal | Measures | Watch for |
|---|---|---|
| Latency | time to serve (p50/p95/p99) | p99 spikes, tail latency |
| Traffic | request rate / load | sudden shifts |
| Errors | error rate, types | 5xx, timeouts, retry storms |
| Saturation | CPU, memory, pool, queue | pools full, queue growth |

### SLI / SLO / alerting

```text
SLI: % of requests served < 300ms;  error ratio
SLO: 99.9% success;  p95 < 300ms  over 30 days
Alert: multi-window burn-rate on the error budget (fast + slow windows)
Rule: page on user-visible, actionable issues only; everything else -> tickets
```

### Tracing

```ts
import { trace } from '@opentelemetry/api';
const span = trace.getTracer('api').startSpan('GET /users');
try { /* work, nested spans for db/calls */ } finally { span.end(); }
```

## Examples

### Good — symptom alert with runbook

```yaml
alert: CheckoutErrorBudgetBurn
expr: error_ratio{service="checkout"} > 0.02  # user-visible symptom
for: 5m
labels: { severity: page, runbook: "https://wiki/runbooks/checkout-errors" }
```

### Bad — every-metric paging and unstructured logs

```yaml
alert: CpuAbove10   # not user-visible, fires constantly
expr: cpu > 0.1
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Unstructured `console.log` | Hard to query/join | Structured JSON + ids |
| No correlation id | Can't follow a request | Propagate request/trace id |
| Alerting on every metric | Alert fatigue, ignored pages | Syntom-based, burn-rate |
| Logging secrets/PII | Compliance/security risk | Redact sensitive fields |
| Metrics with no labels/dimensions | Useless for slicing | Add service/route/status labels |
| No dashboards/SLOs | Guesswork during incidents | SLIs + service dashboard |
| Alerts without runbooks | Slow response | Link each to a runbook |

## Related skills

- `workflow/incident-response`, `workflow/debugging-playbook`,
  `workflow/deployment`, `architecture/caching-and-performance`.
