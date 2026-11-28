# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** Creova House portfolio reviewers evaluating the demo's UI craft, breadth, and interaction quality. Their job is to judge the frontend work quickly, without backend setup or real accounts.
- **Secondary:** Demo visitors exploring the platform as a learner, instructor, or administrator through the seeded accounts and role switcher.

## Product Purpose

A standalone, browser-only frontend demo of the Mentora Courses learning platform, prepared for a Creova House portfolio profile. It exists to showcase the full interface — public marketing, course catalog and detail, auth flows, and admin/instructor/student dashboards — as a working static site.

Success means a reviewer can launch it with no environment setup, reach every role area, perform realistic stateful actions, and immediately understand that it is a demo rather than a production service.

## Positioning

A static portfolio demo that behaves like a usable application: seeded data lives in `localStorage`, `/api/...` calls are intercepted in the browser and answered from a local route table with simulated 200–300 ms latency, and a persistent demo-user switcher plus reset control let a viewer move between admin, instructor, and student states instantly. Unlike a set of static mockups, actions persist across reloads; unlike the original full-stack project, nothing here requires or pretends to have a server.

## Operating Context

- Run locally with `cd client && npm install && npm run dev` (Vite), or serve `client/dist/` from any static host configured with an SPA rewrite for direct route links.
- No environment variables, database, backend service, or external network requests are needed; all data is seeded from `client/src/data/demoSeed.js` into `localStorage` on first load.
- Demo chrome is part of the experience: a dismissible Demo Mode banner, a fixed Demo Mode badge, a top-right demo-user dropdown, and a Reset Demo Data control.
- Seeded accounts: `admin@mentora.demo`, `sarah@mentora.demo`, `mark@mentora.demo`, `lina@mentora.demo`, `omar@mentora.demo`, `nora@mentora.demo`; password `demo1234` for all. The app auto-logs in as the seeded admin on first load.
- `documentation/` contains inherited full-stack requirements from the original project. They are background only and are not current capabilities of this demo.

## Capabilities and Constraints

- Implements public, auth, admin, instructor, student, and shared-account routes, including course discovery, enrollment/checkout simulation, lesson viewing/editing, people management, reporting, messaging, notifications, grading, and financial workflows — all local.
- Creates, edits, and deletes are written to `localStorage` and surfaced through toast notifications using the original `{ success, message, data, meta? }` envelope shape.
- Payments, certificate downloads, Zoom links, mail links, and third-party images are simulated or bundled locally; no third-party SDK is contacted.
- Authentication and passwords are simulated; demo passwords are stored in plain text in `localStorage`. This build is not for sensitive data or production deployment. The sibling original MERN project remains untouched and is the source for real auth and persistence.
- Homepage constraints from `docs/HOMEPAGE_ENHANCEMENT_PLAN.md` are binding: demo bar above the header; `Featured & Trending Courses` above `Latest courses`; six demo accounts; 10 courses, 5 categories, and 8 cards in the default catalog view; original footer links preserved; pinned section order and copy changed only with approval.
- No commit or push before the user approves completed work.
- Absences future work must not fabricate: real customers, testimonials, usage metrics, revenue figures, production integrations, or support commitments.

## Brand Commitments

- Name: **Mentora Courses**; presented as a frontend demo for a **Creova House** portfolio profile.
- Demo-only framing must stay visible and honest: no claims of live users, real payments, real credentials, or a deployed production service.
- Factual public copy from the pinned homepage source is preserved unless the user explicitly approves a change.

## Evidence on Hand

- `README.md` — setup, demo behavior, credentials, routes, storage keys, and verification record.
- `docs/screenshots/` — captured screenshots of home, catalog, admin, instructor, student, and about pages.
- `docs/HOMEPAGE_ENHANCEMENT_PLAN.md` — verified current-state audit, confirmed decisions, and acceptance criteria for the homepage work.
- `client/src/data/demoSeed.js` and `client/src/services/demoStorage.js` — the actual seeded users, courses, and local persistence behavior.
- `documentation/` — inherited full-stack specs and user stories from the original project; not proof of this demo's capabilities.

## Product Principles

1. **Zero-setup evaluability:** a reviewer reaches every surface with no service dependencies and no real credentials.
2. **Honest demo framing:** visible demo indicators and no invented production proof.
3. **Stateful realism:** interactions mutate local data, survive reloads, and can be reset to a known baseline.
4. **Role breadth with consistent behavior:** public, learner, instructor, and admin experiences use the same interaction and feedback conventions.
5. **Preserve the pinned baseline:** seeded data, demo accounts, section order, and approved copy change only with explicit approval.

## Accessibility & Inclusion

WCAG 2.1 AA is the stated target for interface work on this demo. Established expectations include keyboard paths with visible focus, semantic landmarks, meaningful alt text, correct ARIA state on tabs and like buttons, actionable error/empty states, and honoring `prefers-reduced-motion`. The homepage plan verifies layouts at 390, 768, 1040, 1188, and 1440 px without horizontal overflow.
