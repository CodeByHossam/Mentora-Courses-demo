---
name: unit-testing
description: >-
  Unit testing with Jest/Vitest: AAA structure, naming, mocking and spying,
  async tests, fake timers, snapshot discipline, and coverage. Use when writing
  or improving focused tests for JavaScript/TypeScript functions and modules.
  Trigger phrases: "unit test", "Jest", "Vitest", "mock a module", "spy",
  "async test", "fake timers", "snapshot", "coverage".
---

# Unit Testing (Jest / Vitest)

Unit tests are fast, isolated, deterministic, and test **behavior**. Mock the
boundaries (network, DB, time, randomness), not the code under test.

## When to use

- Testing pure functions, reducers, validators, services in isolation.
- Mocking modules, spying on calls, asserting async behavior.
- Trigger phrases: "unit test", "Jest", "Vitest", "mock", "spy", "async test",
  "fake timers", "snapshot", "coverage".

## Instructions

1. Arrange–Act–Assert; one behavior per test.
2. Name tests by behavior: `"returns 401 when token is expired"`.
3. Mock at the module boundary; prefer dependency injection over deep mock trees.
4. Assert on observable outputs/side effects, not internal calls where avoidable.
5. For async: `await` the promise and assert; never assert before resolution.
6. Use fake timers for `setTimeout`/`Date`; restore them in teardown (or `afterEach` via config).
7. Use snapshots sparingly and only for stable, intentional output.

### Anatomy

```ts
describe('applyDiscount', () => {
  it('applies percentage discount', () => {
    // Arrange
    const cart = { total: 100, coupon: { type: 'percent', value: 20 } };
    // Act
    const result = applyDiscount(cart);
    // Assert
    expect(result.total).toBe(80);
  });

  it('never returns a negative total', () => {
    expect(applyDiscount({ total: 10, coupon: { type: 'percent', value: 200 } }).total).toBe(0);
  });
});
```

### Mocking & spying

```ts
jest.mock('../mailer', () => ({ send: jest.fn().mockResolvedValue({ id: 'x' }) }));
import { send } from '../mailer';

it('emails the user', async () => {
  await notifyUser(user);
  expect(send).toHaveBeenCalledWith(expect.objectContaining({ to: user.email }));
});
```

### Async + fake timers

```ts
it('retries once after a short delay', async () => {
  jest.useFakeTimers();
  const p = retry(flakyFn, { retries: 1, delay: 1000 });
  await jest.advanceTimersByTimeAsync(1000);
  await expect(p).resolves.toBe('ok');
  jest.useRealTimers();
});
```

### Table-driven cases

```ts
it.each([['a@b.com', true], ['nope', false], ['', false]])('%s -> %s', (input, ok) => {
  expect(isEmail(input)).toBe(ok);
});
```

## Examples

### Good — isolated, behavior-named

```ts
it('rejects passwords shorter than 8 characters', () => {
  expect(() => validatePassword('abc')).toThrow('at least 8');
});
```

### Bad — over-mocked, implementation-coupled

```ts
it('calls helper1 then helper2', () => {
  service.run();
  expect(helper1).toHaveBeenCalled();   // tests internals, breaks on refactor
  expect(helper2).toHaveBeenCalled();
});
```

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Testing private internals | Refactors break tests | Test public behavior |
| Over-mocking | Tests pass though app is broken | Mock only boundaries |
| Missing `await` | Assertions run too early | Await promises |
| Real timers for delays | Slow, flaky | Fake timers |
| Blanket snapshots | Nobody reviews them | Targeted assertions |
| Shared mutable fixtures | Order-dependent failures | Fresh data per test |
| No negative cases | Bugs slip through | Test invalid/edge inputs |

## Related skills

- `testing/testing-strategy`, `testing/integration-testing`,
  `engineering/code-quality`.
