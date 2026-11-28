---
name: feature-flags
description: >-
  Use feature flags for safe, progressive delivery: release vs ops vs experiment
  flags, trunk-based development, gradual rollouts, kill switches, and flag
  cleanup. Use when shipping behind a flag or decoupling deploy from release.
  Trigger phrases: "feature flag", "feature toggle", "gradual rollout", "canary",
  "kill switch", "A/B test", "dark launch", "percentage rollout", "trunk-based".
---

# Feature Flags

Flags decouple **deploy** (code is live) from **release** (users see it). They
enable trunk-based development, canaries, kill switches, and experiments — but
only if you remove them.

## When to use

- Shipping risky changes or decoupling deploy from release.
- Running gradual rollouts, canaries, dark launches, or kill switches.
- A/B testing or experimentation.
- Trigger phrases: "feature flag", "feature toggle", "gradual rollout",
  "canary", "kill switch", "A/B test", "dark launch", "trunk-based".

## Instructions

1. Classify the flag: release, ops (kill switch), experiment, or permission.
2. Name with a purpose and an owner; never `flag1`.
3. Default to the **safe** state (off/old behavior) on failure to evaluate.
4. Roll out gradually (1% → 5% → 50% → 100%) and watch metrics between steps.
5. Keep flag evaluation cheap and centralized; don't scatter stringly-typed checks.
6. Add a **kill switch** for high-risk launches so you can disable fast.
7. **Clean up**: remove flags once fully rolled out — a debt item with a deadline.

### Flag types

| Type | Lifespan | Use |
|---|---|---|
| Release | days–weeks | Ship dark, then enable |
| Ops (kill switch) | long | Disable a feature under load/incident |
| Experiment | weeks | A/B measurement |
| Permission | long | Entitlements (may be permanent) |

### Usage

```js
import { flags } from '../lib/flags';

if (flags.isEnabled('new-checkout', { user })) {
  return renderNewCheckout();
}
return renderLegacyCheckout();
```

### Gradual rollout

```text
1%   -> watch error rate, p95, business metrics for 1h
5%   -> watch a few hours
50%  -> watch a day
100% -> soak, then delete the flag in a cleanup PR
Rollback: flip to 0% or use the kill switch immediately.
```

## Examples

### Good — bounded, owned, removed

```js
const enabled = flags.isEnabled('new-search', { user, default: false });
// rollout ramps 1%->100%; a follow-up PR removes the flag and dead branch
```

### Bad — permanent flags and scattered checks

```js
if (localStorage.getItem('beta') === 'yes') { ... }   // unowned, stringly-typed
if (someGlobalConfig.newThing) { ... }                // stale flag, dead code forever
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Flags never removed | Dead code, complexity, confusion | Cleanup ticket + deadline |
| Unsafe default | Outage if evaluation fails | Default to safe state |
| Scattered/stringly-typed checks | Typos, inconsistency | Central flag client |
| No kill switch on risky launch | Slow rollback | Add ops flag |
| Testing only flagship branch | Both paths rot | Test both paths |
| Long-lived experiment flags | Untrustworthy results | Time-box experiments |

## Related skills

- `workflow/deployment`, `engineering/migration-plan`,
  `workflow/observability`, `engineering/tech-debt`.
