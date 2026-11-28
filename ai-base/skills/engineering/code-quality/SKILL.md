---
name: code-quality
description: >-
  Write clean, maintainable code: naming, small functions, early returns, DRY vs
  duplication, error handling, linting/formatting, and reviewable diffs. Use when
  writing or refactoring code or setting quality standards. Trigger phrases:
  "clean code", "refactor this", "code smell", "naming", "readability",
  "lint config", "prettier", "eslint", "error handling", "make this cleaner".
---

# Code Quality

Code is read far more than it's written. Optimize for the next reader: clear names,
small units, explicit errors, and consistency enforced by tools — not by discipline.

## When to use

- Writing new code or refactoring a module.
- Reviewing code for readability/maintainability.
- Setting up linting/formatting or standards.
- Trigger phrases: "clean code", "refactor this", "code smell", "naming",
  "readability", "lint config", "eslint", "prettier", "error handling".

## Instructions

1. Name by intent: `activeSubscriptions`, not `d` or `list2`.
2. Keep functions small and single-purpose; extract until each is obvious.
3. Prefer early returns to deep nesting; flatten conditionals.
4. Eliminate duplication of **knowledge**, not incidental textual similarity.
5. Handle errors explicitly; don't swallow them; fail loud and clear.
6. Prefer immutability and pure functions where practical.
7. Automate style: ESLint + Prettier; enforce in CI; don't debate formatting.
8. Keep diffs reviewable: separate refactors from behavior changes.

### Naming

```js
// bad
function calc(u, t) { /* ... */ }
// good
function calculateInvoiceTotal(user, transactions) { /* ... */ }
```

### Early returns

```js
// bad
function price(order) {
  if (order) {
    if (order.items.length) {
      if (!order.cancelled) return order.items.reduce(sum, 0);
    }
  }
  return 0;
}

// good
function price(order) {
  if (!order) return 0;
  if (order.cancelled) return 0;
  if (order.items.length === 0) return 0;
  return order.items.reduce(sum, 0);
}
```

### Explicit errors

```js
// bad — swallows the problem
try { await save(user); } catch (e) {}

// good — adds context, preserves cause, lets caller decide
try { await save(user); }
catch (err) { throw new AppError('Failed to save user', { cause: err, code: 'USER_SAVE' }); }
```

### Config

```jsonc
// .eslintrc — enforce rules, let Prettier own formatting
{ "extends": ["eslint:recommended"],
  "rules": { "no-unused-vars": "error", "eqeqeq": "error", "no-console": "warn" } }
```

## Examples

### Good — small, named, explicit

```js
const isEligible = (user) => user.age >= 18 && !user.banned;
if (!isEligible(user)) return res.status(403).json({ error: 'NOT_ELIGIBLE' });
```

### Bad — nested, cryptic, silent failure

```js
let r; try { if (u.a>18&&!u.b) r={s:1}; else r={s:0}; } catch(e){} return r;
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Cryptic names / magic numbers | Unreadable | Intent-revealing names, constants |
| Deeply nested logic | Hard to follow/test | Early returns, extract |
| Swallowed exceptions | Hidden bugs | Handle or rethrow with context |
| Duplicated knowledge | Divergent behavior | Extract shared logic |
| God functions/classes | Untestable, fragile | Single responsibility |
| Formatting debates in review | Wastes time | Prettier + ESLint in CI |
| Mixing refactor + feature in one diff | Hard to review | Separate commits/PRs |

## Related skills

- `engineering/pr-review`, `engineering/tech-debt`,
  `testing/unit-testing`, `workflow/commit-conventions`.
