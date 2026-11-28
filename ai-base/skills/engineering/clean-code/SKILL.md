---
name: clean-code
description: >-
  Applies automatically whenever an agent generates, reviews, or refactors
  JavaScript/TypeScript, React, React Native, Node/Express, MongoDB, or HTML
  markup — especially inside a MERN or React Native project. Enforces naming,
  small functions, explicit error handling, thin controllers, safe data access,
  semantic HTML, and SEO so delivered code is production-ready without a human
  cleanup pass.
when_to_use: >-
  Before writing code, before reviewing a diff, before refactoring a module, and
  before declaring any coding task complete in a MERN, React Native, or web
  project.
applies_to:
  - MERN
  - React Native
  - HTML/SEO
---

# Clean Code

You are the author of code that another agent or human will read next. Optimize
for the reader: clear intent, small units, explicit failure, and consistency
enforced by tools. Clean code is a delivery requirement, not a style preference.

## WHEN TO USE THIS SKILL

Use this skill automatically — without being asked — when any of these is true:

- You are about to **write** new code in JavaScript, TypeScript, JSX/TSX, HTML,
  CSS, Node/Express, MongoDB/Mongoose, React, React Native, or Expo.
- You are about to **review** a diff, PR, file, or generated snippet in one of
  those stacks.
- You are about to **refactor**, rename, extract, optimize, or "clean up" code.
- You are scaffolding a project, adding a feature, fixing a bug, or wiring an
  API/database call.
- You are producing a page, screen, component, endpoint, model, or markup file
  that a user will see or call.
- The stack is MERN (MongoDB, Express, React, Node), React Native, or any web
  project with HTML/SEO surface area.

Do **not** wait for the user to say "clean code". If the task touches code in
scope, this skill is active. Load the matching reference file before editing:

- Any stack → `references/general-clean-code.md`
- MERN backend or React web frontend → `references/mern-clean-code.md`
- React Native / Expo → `references/react-native-clean-code.md`
- HTML markup or accessibility → `references/html-semantic.md`
- Pages, metadata, marketing, or public content → `references/seo-practices.md`

## MANDATORY RULES

These rules are non-negotiable. If a rule conflicts with existing code, follow
the rule for new/changed code and flag the conflict instead of spreading it.

1. **Read before you write.** Inspect the surrounding files, conventions, and
   dependencies. Match them; do not invent a parallel style.
2. **Name by intent.** Use `camelCase` for variables/functions, `PascalCase` for
   components/classes/types, `SCREAMING_SNAKE_CASE` for true constants. Use
   `is`/`has`/`can`/`should` prefixes for booleans. Never use `data`, `temp`,
   `x`, `d`, or `list2` when a real name exists.
3. **Keep functions small.** Target under ~30 lines, at most 3–4 parameters, one
   job per function. Never add boolean flag parameters that switch behavior.
4. **Remove magic values.** Every non-obvious number or string becomes a named
   constant.
5. **Fail fast, guard early.** Validate inputs at the top and return/throw.
   Never nest `if` blocks when a guard clause will do.
6. **Never swallow errors.** No empty `catch`, no `catch { return null }`, no
   `console.log(error)` as the only handling. Add context, preserve the cause,
   and let a central handler decide the response.
7. **Respect layers.** Controllers handle HTTP only; services hold business
   logic; models own persistence. Never query the database from a React
   component or a route file.
8. **Validate at the edge.** Validate and sanitize every external input (body,
   query, params, headers) before it reaches business logic or the database.
9. **Never leak secrets or sensitive fields.** Read configuration from
   environment variables, never commit `.env`, and never return passwords,
   tokens, or internal fields in API responses.
10. **Always handle UI states.** Every data path renders loading, empty, error,
   and success states. Never ship a screen that can only render happy-path data.
11. **Write semantic HTML.** Use `<button>` for actions, `<a>` for navigation,
    real landmarks, and one `<h1>` per page. Never attach `onClick` to a `<div>`.
12. **Ship page metadata.** Every public page has a unique `<title>`, a meta
    description, a canonical URL, and social preview tags.
13. **Leave no residue.** Delete dead code, commented-out code, unused imports,
    debug `console.log`, and TODOs without an owner. Do not comment code out;
    delete it — version control remembers.
14. **Keep the diff honest.** Change only what the task requires. Separate
    refactors from behavior changes. Do not reformat unrelated files.
15. **Make it testable.** Prefer pure functions, inject dependencies instead of
    importing singletons inside logic, and keep side effects at the edges.
16. **Run the PRE-FLIGHT CHECKLIST before delivering.** Report the result
    honestly; if something is not verified, say so.

## REFERENCE INDEX

Load only the files relevant to the current task, then apply them.

| File | Load when | Covers |
|---|---|---|
| `references/general-clean-code.md` | Always, for any code | Naming, SRP/DRY/KISS/YAGNI, function size, constants, guard clauses, errors, comments, formatting, commits, testability |
| `references/mern-clean-code.md` | MERN backend or React web frontend | Backend layering, thin controllers, async errors, `AppError`, validation, Mongoose rules, auth/security, API response shape; React components, hooks, services, state, effects, keys, accessibility, styling |
| `references/react-native-clean-code.md` | React Native / Expo | RN folder structure, `StyleSheet`, list performance, platform files, safe area/keyboard, permissions, typed navigation, state ladder, images, app state/deep links, a11y, cross-platform testing |
| `references/html-semantic.md` | Writing or reviewing markup | Landmarks, headings, buttons vs links, forms and labels, figures/time/address, alt text, ARIA rules, skip links, `lang` |
| `references/seo-practices.md` | Public pages, metadata, content sites | Titles/descriptions, Open Graph/Twitter, canonical/robots, JSON-LD, images, internal links, sitemap/robots.txt, Core Web Vitals, URLs, SSR/SSG, mobile, a11y |
| `checklist.md` | Immediately before finishing | Fast scan of every must-pass item |

## WORKFLOW

1. **Detect the stack** from the files, `package.json`, and imports.
2. **Load references** from the table above — general always, plus each stack
   the task touches.
3. **Inspect first**: existing patterns, naming, error shape, test setup.
4. **Write the smallest correct change**, applying the mandatory rules.
5. **Self-review** the diff against `checklist.md`; fix violations before
   showing the result.
6. **Deliver** the code plus a one-line note on which references were applied
   and anything that could not be verified (for example: "not run on iOS").

## PRE-FLIGHT CHECKLIST

Run this before delivering any code. Full version: `checklist.md`.

- [ ] Names reveal intent; booleans read as `is/has/can/should`.
- [ ] Functions under ~30 lines, ≤4 params, no flag params, no magic values.
- [ ] Guard clauses replaced deep nesting; the happy path is obvious.
- [ ] Every async path has error handling; no empty or silent `catch`.
- [ ] Inputs validated at the edge; no unvalidated data reaches the database.
- [ ] Layering respected: no DB calls in components or routes; no HTTP objects
      in services.
- [ ] No secrets, credentials, tokens, or sensitive fields in code or output.
- [ ] Loading, empty, error, and success states all handled in the UI.
- [ ] Semantic HTML, one `<h1>`, labels on inputs, alt text on images.
- [ ] Page has unique title, meta description, canonical, and social tags.
- [ ] No dead code, commented-out code, unused imports, or `console.log`.
- [ ] Formatting/lint clean; commit message follows Conventional Commits.
- [ ] Behavior verified at the level claimed (unit, API call, browser, device).

If any box cannot be checked, fix it or state the gap explicitly. Never claim
verification you did not perform.
