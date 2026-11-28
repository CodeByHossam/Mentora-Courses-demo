# Clean Code — Pre-Commit / Pre-PR Checklist

Scan before finalizing any code. Fix every unchecked box or state the gap.

## Universal

- [ ] No dead code, commented-out code, or unused imports/files
- [ ] No `console.log`, `debugger`, or temporary debugging output
- [ ] No secrets, API keys, tokens, `.env` values, or credentials in code
- [ ] Functions < ~30 lines; ≤ 4 params; no boolean flag params
- [ ] Names reveal intent; booleans use `is/has/can/should`
- [ ] No magic numbers/strings — named constants instead
- [ ] Guard clauses instead of nested `if`s; fail fast
- [ ] Try/catch or central error handling on every async path
- [ ] No silent/empty `catch`; errors carry context and a cause
- [ ] Inputs validated at the edge before use
- [ ] External calls have timeouts, retries where appropriate, and error states
- [ ] No duplicated business logic; one source of truth
- [ ] Only task-related changes in the diff; refactors separated
- [ ] Lint + formatter clean; build/typecheck passes
- [ ] Tests cover the new behavior and edge cases
- [ ] Commit message follows Conventional Commits

## MERN backend

- [ ] Controller is thin: reads request, calls service, sends response
- [ ] Business logic lives in services; tests can call it without Express
- [ ] Mongoose schema validation present; required fields enforced
- [ ] Indexes added for queried/sorted fields
- [ ] Reads use `.lean()` and `.select()` where appropriate
- [ ] No N+1 queries; related data fetched in one query or populated once
- [ ] Passwords hashed (bcrypt/argon2); never returned by any endpoint
- [ ] Sensitive fields excluded via schema `toJSON` transform / `.select('-field')`
- [ ] JWT verified with expiry, algorithm, and secret from env
- [ ] `helmet`, CORS allow-list, and rate limiting enabled
- [ ] Response shape consistent: `{ success, data, error }`
- [ ] Correct HTTP status codes (201 create, 400 validation, 401/403 auth, 404 missing, 409 conflict, 500 unknown)
- [ ] Central error handler maps `AppError` and hides internal stack traces in production

## React web

- [ ] Functional components and hooks only
- [ ] One component per file; PascalCase filenames
- [ ] Component < ~200 lines; extracted subcomponents where larger
- [ ] Reusable logic in custom hooks (`useAuth`, `useFetch`)
- [ ] No prop drilling beyond 2 levels; context/store used instead
- [ ] `useEffect` dependencies correct; subscriptions/intervals/timers cleaned up
- [ ] No effect used to compute derived state
- [ ] Lists use stable IDs as keys, not array indexes
- [ ] API calls live in `services/`, not in components
- [ ] Loading, empty, error, and success states all rendered
- [ ] `useMemo`/`useCallback` used only with a measured reason
- [ ] Semantic elements, labels, keyboard navigation, visible focus
- [ ] Tailwind/CSS modules for styling; no inline styles for theming

## React Native

- [ ] `StyleSheet.create` used; no inline style objects
- [ ] `FlatList`/`SectionList` has `keyExtractor`; `getItemLayout`/`memo` for long lists
- [ ] No anonymous callbacks in perf-critical rows
- [ ] `SafeAreaView` and `KeyboardAvoidingView` where layout requires them
- [ ] Permissions requested just in time and denied states handled
- [ ] Navigation params typed and small; no whole objects passed
- [ ] State is local first; context/store only when shared
- [ ] Images sized/cached; `FastImage` where appropriate
- [ ] App state changes and deep links handled and cleaned up
- [ ] `accessible`, `accessibilityLabel`, `accessibilityRole` on interactive elements
- [ ] Platform-specific files/hacks documented; tested on both platforms

## HTML / semantic

- [ ] `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` used correctly
- [ ] Exactly one `<h1>`; headings hierarchical (h1 → h2 → h3)
- [ ] `<button>` for actions, `<a>` for navigation — no clickable `<div>`
- [ ] Inputs have `<label for>`; groups use `<fieldset>`/`<legend>`
- [ ] Images have meaningful `alt`; decorative images use `alt=""`
- [ ] ARIA only where native semantics are insufficient
- [ ] Skip-to-content link and visible focus states
- [ ] `<html lang="...">` set

## SEO / performance

- [ ] Unique `<title>` (~50–60 chars) and meta description (~150–160 chars)
- [ ] Open Graph and Twitter card tags present
- [ ] Canonical URL and robots meta correct
- [ ] JSON-LD structured data matches visible content
- [ ] Descriptive image filenames and alt text; below-fold images lazy-loaded
- [ ] Internal links use meaningful anchor text (no "click here")
- [ ] `sitemap.xml` and `robots.txt` present and valid
- [ ] LCP/CLS/INP considered: critical assets preloaded, images dimensioned
- [ ] URLs lowercase, hyphenated, stable
- [ ] SEO-critical pages server-rendered or statically generated
- [ ] Mobile-first and responsive; contrast and touch targets pass
