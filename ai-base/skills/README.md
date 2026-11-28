<!--
  HUMAN DOCUMENTATION ONLY.
  This is the skill index for people. The AI agent is told NOT to read this file;
  its skill index is ../protocols/SKILL_ROUTER.md (linked from ../protocols/AGENTS.md).
-->

# Skills (human index)

A tool-agnostic collection of agent skills for web developers — UI/UX design,
web project planning, frontend and backend implementation, architecture,
testing, workflow, and career practice. The library started MERN-flavored
(MongoDB, Express, React, Node.js with Redux Toolkit / RTK Query, Axios, and
Tailwind) and covers any JavaScript full-stack or frontend-only project, so
skill routing never points at a missing skill.

Each skill lives in its own folder as a single `SKILL.md` with YAML frontmatter
(`name`, `description`) and sections: **When to use**, **Instructions**,
**Examples**, **Anti-patterns**. Folder name == `name`. Nothing is vendor-locked;
any agent that can read Markdown can use these.

```
skills/
  <category>/<skill-name>/SKILL.md
  <category>/<skill-name>/references/…   # large source material (optional)
```

## Index

### backend
| Skill | Description | Triggers |
|---|---|---|
| `express-api-structure` | Layered Express apps: routes, controllers, services, middleware, error handling. | express, API structure, middleware, error handling |
| `mongodb-schema-design` | Mongoose schemas, modeling, indexing, validation, aggregation. | mongoose schema, index, modelling, aggregation |
| `nodejs-production-patterns` | Config, graceful shutdown, logging, clustering, performance for Node services. | node production, graceful shutdown, clustering |
| `jwt-auth-flow` | Access/refresh token auth, secure cookies, rotation, revocation. | JWT, refresh token, auth flow, cookies |

### frontend
| Skill | Description | Triggers |
|---|---|---|
| `react-component-patterns` | Composition, component design, props, compound components, variants. | component design, composition, props |
| `react-hooks` | Built-in and custom hooks, effects, refs, cleanup, common pitfalls. | hooks, useEffect, custom hook |
| `rtk-query-patterns` | Redux Toolkit + RTK Query: slices, endpoints, cache, optimistic updates. | RTK Query, redux toolkit, cache, endpoints |
| `axios-http-patterns` | API client with Axios: instances, interceptors, errors, typed calls. | axios, interceptors, API client, fetch |
| `react-forms` | Form state, validation, controlled vs uncontrolled, submissions. | forms, validation, controlled inputs |
| `react-performance` | Memoization, code-splitting, list virtualization, render profiling. | react performance, memo, virtualization |
| `tailwind-conventions` | Tailwind design-system usage, tokens, variants, responsive patterns. | tailwind, utility classes, responsive |

### state
| Skill | Description | Triggers |
|---|---|---|
| `mern-data-state-decisions` | Where state lives: server vs client, RTK/RTK Query vs local, caching. | state management, where does state live |

### design
| Skill | Description | Triggers |
|---|---|---|
| `ui-ux-principles` | Core usability and interaction principles for interfaces. | UX principles, usability, heuristics |
| `accessibility-wcag` | WCAG/ARIA, keyboard, contrast, screen readers, audits. | accessibility, WCAG, a11y, ARIA |
| `visual-craft` | Layout, spacing, type, color, and polish for professional UI. | visual design, typography, polish |
| `design-tokens` | Design tokens and theme systems for consistency. | design tokens, theming, variables |
| `design-review` | Structured critique of a design against principles and craft. | design review, critique, feedback |
| `ux-research` | Research methods, personas, journey maps, synthesis. | UX research, personas, journey map |
| `unslop` | De-slop an existing AI-looking screen: audit against a slop-signs list, set a product-derived direction for approval, then fix spacing, color, icons, copy, type, layout, details, visuals and motion in nine ordered passes (polish mode for light slop). Adapted from [unslop](https://github.com/heydamir/unslop) by Damir Sokolovsky, CC BY 4.0. | unslop, slop, AI-looking UI, purple gradient, emoji icons, polish screen, redesign screen |
| `taste` | Art direction and anti-slop standard for professional company, product and place sites: kind, page plan, copy voice, nine house rules, and a manual finish gate. Reference + checklist edition — no asset kit, no `gate.mjs`. | professional UI, landing page, company site, looks generic, AI-made, anti-slop, art direction, finish gate |
| `motion-gsap` | GSAP motion hub: tweens, easing, timelines, ScrollTrigger, plugins, React `useGSAP`, performance, and reduced motion; routes to eight references. | animate, GSAP, ScrollTrigger, timeline animation, scroll animation, reduced motion |
| `impeccable` | Design critique, five-dimension audit, polish, harden, bolder/quieter, and UX copy — vendored manual edition (read code + rendered page; no binary). | design audit, critique, score the UI, polish, bolder, quieter, harden, design review |

### design-ai
| Skill | Description | Triggers |
|---|---|---|
| `ai-governors` | Human-in-the-loop patterns: verification, controls, transparency, cost. | human-in-the-loop, AI confirmation, AI control |
| `ai-identifiers` | Naming, avatar, color, iconography, and personality for an AI. | AI name, AI avatar, AI branding |
| `ai-inputs` | Input patterns: open input, inline actions, regenerate, restyle, etc. | AI input, prompt UX, regenerate |
| `ai-trust-builders` | Caveats, consent, data ownership, disclosure, footprints, incognito, watermark. | AI disclaimer, AI consent, watermark |
| `ai-tuners` | Model/mode/parameter/style/voice controls for AI output. | model switching, AI settings, brand voice |
| `ai-wayfinders` | Onboarding and discoverability: CTAs, galleries, suggestions, templates. | blank slate, example prompts, AI onboarding |

### testing
| Skill | Description | Triggers |
|---|---|---|
| `testing-strategy` | Test pyramid, coverage, what to test at each level, mutation testing. | test strategy, coverage, test pyramid |
| `unit-testing` | Jest/Vitest: AAA, mocks, async, fake timers, snapshots. | unit test, jest, vitest, mock |
| `integration-testing` | API + DB with Supertest/MongoMemoryServer, factories, isolation. | integration test, supertest, test DB |
| `e2e-testing` | Playwright browser tests: page objects, waits, CI. | e2e, playwright, browser test |
| `contract-testing` | Consumer-driven contracts with Pact; provider verification. | contract testing, pact, API compatibility |

### workflow
| Skill | Description | Triggers |
|---|---|---|
| `debugging-playbook` | Reproduce → isolate → root-cause; logs, profiling, memory leaks. | debug, root cause, slow endpoint, memory leak |
| `incident-response` | SEV levels, mitigation, comms, runbooks, postmortems. | incident, outage, postmortem, runbook |
| `git-workflow` | Branching, rebase vs merge, conflicts, safe recovery. | git, branching, rebase, revert |
| `commit-conventions` | Conventional Commits and generated changelogs. | commit message, changelog, release notes |
| `env-and-secrets` | .env, config validation, secret managers, rotation, leaks. | env vars, dotenv, secrets, rotate |
| `deployment` | Docker, CI/CD, managed hosts, health checks, rollback. | deploy, docker, CI/CD, rollback |
| `observability` | Logs, metrics, traces, golden signals, SLOs, alerting. | observability, logging, SLO, alerting |

### architecture
| Skill | Description | Triggers |
|---|---|---|
| `mern-architecture` | Project structure, layering, feature folders, repo topology. | MERN architecture, folder structure, monorepo |
| `api-design` | REST conventions, status codes, pagination, versioning, errors. | API design, REST, versioning, pagination |
| `security-review` | OWASP Top 10 for MERN: authz, injection, XSS, CSRF, hardening. | security review, OWASP, XSS, CSRF |
| `web-security` | End-to-end web security best practices for backend + frontend: authz, validation, cookies, CORS, CSP, rate limits, secrets. | web security, secure the web, harden, secure frontend, secure backend |
| `caching-and-performance` | HTTP/Redis/CDN caching, invalidation, Mongo indexes, N+1. | caching, redis, indexing, slow query |
| `resilience-and-messaging` | Timeouts, retries, circuit breakers, idempotency, queues, DLQ. | circuit breaker, retry, queue, idempotency |
| `data-and-systems-design` | SQL vs NoSQL, modeling, schema evolution, partitioning, consistency. | data modeling, SQL vs NoSQL, sharding |

### engineering
| Skill | Description | Triggers |
|---|---|---|
| `code-quality` | Naming, small functions, errors, lint/format, reviewable diffs. | clean code, refactor, code smell |
| `clean-code` | Mandatory clean-code standard: naming, small functions, SRP/DRY/KISS/YAGNI, error handling, formatting, semantic HTML and search-engine optimization where applicable. | clean code, refactor, code smell, quality bar |
| `pr-review` | PR descriptions, review checklist, comment etiquette, SLAs. | code review, PR feedback, nit |
| `tech-debt` | Debt quadrant, making debt visible, safe repayment. | technical debt, refactor priority |
| `estimation-and-planning` | Decomposition, ranges, story points, milestones. | estimate, story points, breakdown |
| `feature-flags` | Progressive delivery, kill switches, rollout, cleanup. | feature flag, canary, rollout |
| `migration-plan` | Expand-contract, backfills, dual-write, rollback. | migration, zero downtime, backfill |
| `tech-spec-writing` | Design docs: goals/non-goals, alternatives, trade-offs, rollout. | design doc, tech spec, RFC |
| `adr` | Architecture Decision Records: context, decision, consequences. | ADR, decision record |
| `web-project-planning` | Sitemap/page inventory, SPA/MPA selection, UI/UX deliverables, phases, acceptance criteria. Complements `estimation-and-planning`; use for new web projects, major redesigns, and substantial feature planning. | web project planning, sitemap, page inventory, SPA vs MPA, new website plan |

### career
| Skill | Description | Triggers |
|---|---|---|
| `1on1-prep` | Agenda, growth, blockers, feedback, follow-ups for 1:1s. | 1:1, one-on-one, manager meeting |
| `behavioral-prep` | STAR story bank for behavioral interviews. | behavioral interview, STAR, tell me about a time |
| `coding-interview-prep` | Pattern-based DS&A prep, thinking out loud, complexity. | coding interview, leetcode, big O |
| `feedback-giving` | SBI, radical candor, giving/receiving feedback. | give feedback, constructive criticism |
| `promotion-doc` | Promotion case mapped to level expectations; brag doc. | promotion case, brag doc |
| `resume-review` | Impact-driven bullets (XYZ), ATS-friendly resumes. | resume, CV review, LinkedIn |
| `system-design-prep` | Design interview framework, estimation, deep dives, trade-offs. | system design interview, back of envelope |
| `hld-design` | High-level design docs: components, data flow, scaling, reliability. | high-level design, HLD, architecture overview |

## Notes

- Routing: the protocols auto-pick skills via `../protocols/SKILL_ROUTER.md` at each stage.
  Load only the skills it lists — never all of `skills/**`.
- Skills are intentionally short. Larger source material (e.g., the AI-UX pattern
  references) is retained under each skill's `references/` folder.
- Skills cross-reference each other via `category/skill-name` in their
  **Related skills** sections.
- To add a skill: create `<category>/<new-name>/SKILL.md` with matching `name`
  frontmatter.
