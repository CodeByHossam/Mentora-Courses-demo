# General Clean Code

Stack-agnostic rules for all JavaScript/TypeScript code. Load together with the
MERN, React Native, HTML, or SEO reference that matches the task.

## Naming

```js
// ❌ bad
function u() {}
const data = db.get();
const list2 = items;

// ✅ good
function getUserById(userId) {}
const userSubscriptions = getUserSubscriptions();

// constants
const MAX_RETRIES = 3;               // SCREAMING_SNAKE_CASE
const DEFAULT_PAGE_SIZE = 20;        // or DEFAULT_PAGE_SIZE via const

// booleans read as decisions
const isActive = user.active === true;
const hasAccess = user.role === 'admin';
const canDelete = item.ownedById === currentUser.id;
const shouldRetry = attempt < MAX_RETRIES;
```

- `camelCase` for variables, functions, properties.
- `PascalCase` for classes, components, types, interfaces.
- `SCREAMING_SNAKE_CASE` for constants.
- Predicate booleans: prefix with `is`, `has`, `can`, or `should` and be
  self-explanatory (`isValidEmail`, `hasPermission`).

## SOLID-ish fundamentals: SRP, DRY, KISS, YAGNI

```js
// ❌ bad — god module
// userController.js
// handles CRUD + auth + validation + email + reporting in one function

// ✅ good — single responsibility per unit
// userController.js → thin req/res
// userService.js → createUser(), updateUser(), deleteUser()
// emailService.js → sendWelcomeEmail()
```

- **SRP**: one function/class/module has one reason to change.
- **DRY**: same knowledge in one place — extract shared logic, don't copy
  (duplication drifts).
- **KISS**: simplest solution that works now; add complexity only when needed.
- **YAGNI**: build only what is asked; no speculative abstraction.

## Small functions

```js
// ❌ bad — 45 lines, three jobs, hard to test
function processOrder(order, user) { /* ... */ }

// ✅ good
function processOrder(order, user) {
  validateOrder(order);
  const payment = chargeCard(order);
  saveOrder(order, payment);
  sendConfirmation(order);
  return order;
}
```

- Target: **< ~30 lines**, max **3–4 params**. More params → split or group into
  an object param.
- **No flag parameters.** Never write `isAdmin = true` style boolean switches
  inside a function; branch on the actual value (`user.role === 'admin'`).

## Magic numbers and strings

```js
// ❌ bad
if (status === 403) { ... }
const TAX_RATE = ... // inline 0.08 everywhere

// ✅ good
const FORBIDDEN = 403;
const TAX_RATE = 0.08;
const HTTP_STATUS = { OK: 200, FORBIDDEN: 403 }; // or just use status codes directly
```

Prefer named constants / enums over raw literals in business logic.

## Explicit over implicit; fail fast; guard clauses

```js
// ❌ bad — deep nesting, implicit null handling
function getCartTotal(cart) {
  if (cart) {
    if (cart.items) {
      if (cart.items.length > 0) {
        return cart.items.reduce((s, i) => s + i.price, 0);
      }
    }
  }
  return 0;
}

// ✅ good — early returns / guard clauses
function getCartTotal(cart) {
  if (!cart) throw new Error('Cart is required');
  if (cart.items.length === 0) return 0;
  return cart.items.reduce((sum, item) => sum + item.price, 0);
}
```

- Fail fast: validate first, fail loudly with a clear message.
- Prefer guard clauses over nested conditionals.
- Never silently default when data matters (`catch {}`).

## Comments: explain WHY, not WHAT

```js
// ❌ bad — explains what (already obvious) and rots
// sets the total to 0 because we do math here
// return sum

// ✅ good — explains why, and only non-obvious intent
// Round to 2 decimals — currency must not accumulate float error.
return Math.round(rawSum * 100) / 100;
```

- No comments for obvious code.
- **No commented-out code.** Delete it; git remembers.
- No dead code: remove unused vars, functions, files, branches.

## Errors: no silent catch, meaningful messages, typed errors

```js
// ❌ bad — swallows
try {
  await saveUser(user);
} catch (e) {
  console.log('save failed');
}

// ✅ good — context + cause, typed error, let handler decide
try {
  await saveUser(user);
} catch (err) {
  throw new AppError('Failed to persist user', {
    cause: err,
    code: 'USER_SAVE_FAILED',
  });
}
```

- Never leave a `catch` empty or with only a log.
- Throw errors with **meaningful messages** and machine-readable `code`/`statusCode`.
- Prefer typed error classes (custom `AppError`) over raw strings.

## Formatting and commits

- Prettier for formatting, ESLint for rules; enforce in CI; don't debate formatting
  in code review.
- `eqeqeq` over `==`; `no-unused-vars` error; prefer strict equality.

```jsonc
// .eslintrc
{
  "extends": ["eslint:recommended"],
  "rules": {
    "no-unused-vars": "error",
    "eqeqeq": "error",
    "no-console": "warn",
    "prefer-const": "error"
  }
}
```

- Conventional Commits: `feat(auth): add refresh token rotation`,
  `fix(cart): prevent negative totals`, `refactor(api): extract order service`.

## Testability and DI

```js
// ❌ bad — hardwired dependency
function reportUsage(client) { ... }

// ✅ good — injected dependency
function reportUsage(client = db) { ... } // or pass via ctor
```

- Extract pure functions where possible.
- Inject services/repositories into functions/classes instead of importing
  singletons deep inside logic.
- Keep side effects at the edges; test the logic.

## Anti-patterns

| Anti-pattern | Fix |
|---|---|
| Cryptic names / magic numbers | Intent-revealing names, constants |
| God functions | Split by responsibility |
| Deep nesting | Early returns, guard clauses |
| Swallowed exceptions | Rethrow with context |
| Duplicated knowledge | Extract shared logic |
| Commented-out code | Delete it |
| Formatting debates | Prettier + ESLint in CI |
