---
name: testing-strategy
description: >-
  Decide what tests to write and at which level: the test pyramid, unit vs
  integration vs contract vs E2E, what to test at each layer, coverage targets,
  and mutation testing. Use when planning a test suite or evaluating coverage.
  Trigger phrases: "test strategy", "what should I test", "test pyramid",
  "how many tests", "coverage target", "test plan", "mutation testing".
---

# Testing Strategy

The pyramid guides how many tests to write at each level — not a rule. The right
ratio depends on risk, speed needs, and team size. Test behavior and contracts,
not implementation details.

## When to use

- Planning tests for a new feature or service.
- Evaluating whether an existing suite is over/under-tested.
- Deciding unit vs integration vs E2E for a change.
- Trigger phrases: "test strategy", "what should I test", "test pyramid",
  "how many tests", "coverage target", "mutation testing".

## Instructions

1. Classify the risk: what is most likely and most costly to break?
2. Push coverage down the pyramid — many fast unit tests, fewer integration, few E2E.
3. Test behavior through the public API, not private internals.
4. One logical assertion focus per test; name tests by behavior.
5. Define coverage targets per package, not one global number.
6. Use mutation testing to find assertions that don't actually check anything.
7. Make tests deterministic; the suite must pass on a cold machine.

### The pyramid

```
        E2E (few)          full user journeys, critical paths only
      Integration (some)   routes+DB, service modules together
    Unit (many)            pure logic, edge cases, fast, isolated
   Contract (per pair)     consumer/provider agreements
```

### What to test where

| Level | Test this | Avoid |
|---|---|---|
| Unit | Pure funcs, reducers, validators, edge cases | DB, network, timers real-time |
| Integration | Route → controller → service → DB, middleware, auth | UI details |
| Contract | Request/response shape between services | Business logic |
| E2E | Signup → core action → outcome, checkout | Every permutation |

### Coverage & quality

```
Lines/branches: aim for meaningful coverage (often 70–85%), not 100%.
Mutation score: % of injected bugs your tests catch — the real signal.
Critical paths: 100% expected; generated/large data paths: be pragmatic.
```

## Examples

### Good — proportionate, behavior-focused

> Feature: password reset. 6 unit (token gen/validate/exire), 3 integration
> (request reset, use token, reuse rejected), 1 E2E (full reset). Budget: a few
> seconds for the unit+integration tier.

### Bad — inverted pyramid

> 1 unit test, 40 Selenium E2E tests that take 30 minutes and flake constantly.

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| 100% line coverage as a goal | Tests with no value | Mutation testing + risk focus |
| Inverted pyramid (mostly E2E) | Slow, flaky, low signal | More unit/integration |
| Testing private methods | Refactors break tests | Test behavior via public API |
| Flaky/nondeterministic tests | Erodes trust, ignored | Control time/order/network |
| Chasing speed by skipping isolation | Shared state bugs | Isolate per test |
| No plan, ad-hoc tests | Gaps in critical paths | Strategy per feature |

## Related skills

- `testing/unit-testing`, `testing/integration-testing`, `testing/e2e-testing`,
  `testing/contract-testing`, `engineering/pr-review`.
