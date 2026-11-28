---
name: web-project-planning
description: Plan websites and web applications from requirements through information architecture, SPA/MPA selection, UI/UX deliverables, technical boundaries, implementation phases, and acceptance criteria. Use for new web projects, major redesigns, and substantial feature planning.
---

# Web Project Planning

## Purpose

Create a practical, requirements-driven plan for a website or web application before significant implementation begins.

Coordinate business requirements, user experience, visual design, application architecture, implementation, and verification. Produce only the planning artifacts justified by the project's size and complexity.

This skill complements `engineering/estimation-and-planning`. It focuses on web-product decisions and deliverables; use the general engineering planning skill when detailed estimates, work breakdowns, or milestone planning are required.

## Core rules

1. Understand the problem before selecting a solution.
2. Reuse the existing project structure, dependencies, conventions, and working functionality whenever appropriate.
3. Do not assume every website requires React, a backend, a database, authentication, or a client-side router.
4. Select SPA, MPA, or hybrid architecture based on requirements, not personal preference.
5. Separate required features from optional enhancements.
6. Design around real user tasks, content, accessibility, responsiveness, and maintainability.
7. Record important assumptions, unresolved decisions, risks, and dependencies.
8. Avoid unnecessary documentation, abstraction, dependencies, and enterprise-level processes.
9. Do not implement features during planning unless explicitly requested.
10. Never claim that a plan, file, test, or implementation exists unless it has actually been created or verified.

## Step 1 — Discover the project

Determine what is already known about:

- Business or product objective.
- Target audience and user needs.
- Website type and domain.
- Primary user tasks and desired outcomes.
- Required pages and features.
- User roles and permissions, if applicable.
- Existing codebase, framework, dependencies, and integrations.
- Content sources, APIs, data storage, and external services.
- Hosting, deployment, SEO, accessibility, performance, and security requirements.
- Constraints such as deadlines, budget, existing infrastructure, and available assets.

Inspect the existing project before asking the user to repeat information already available.

Ask concise, targeted questions only when missing information materially affects the plan. Group closely related questions when that reduces unnecessary back-and-forth. If reasonable assumptions allow progress, state those assumptions and proceed.

## Step 2 — Define scope

Organize requirements into:

### Must have
Features necessary for the initial release to satisfy its main purpose.

### Should have
Important improvements that can follow the core implementation or be included when justified.

### Could have
Optional enhancements that must not distract from essential functionality.

### Out of scope
Explicit exclusions that prevent misunderstandings and feature creep.

Identify the main user journeys, important business rules, data requirements, and success criteria.

Do not turn every possible idea into a requirement.

## Step 3 — Plan the information architecture

For websites with multiple pages, define a sitemap and page inventory.

For each relevant page or route, identify:

- Purpose and intended audience.
- Primary user action.
- Main content and sections.
- Shared layout or navigation requirements.
- Data dependencies.
- Important interaction and error states.
- Responsive behavior.
- SEO and accessibility considerations, where applicable.

Distinguish public pages, authenticated pages, role-restricted pages, and utility pages when relevant.

For single-page experiences, define the section hierarchy, navigation behavior, content flow, and primary conversion or task path instead of inventing unnecessary routes.

Keep the sitemap, navigation, and implementation route structure consistent.

## Step 4 — Select SPA, MPA, or hybrid architecture

Evaluate the application's actual needs before deciding.

### SPA considerations

A single-page application may be appropriate when the product needs:

- Rich, stateful interactions.
- App-like navigation.
- Persistent client-side state.
- Frequent interaction with APIs.
- Complex authenticated dashboards or workflows.

Plan client-side routing, route loading, error boundaries, refresh behavior, state management, and deployment fallback rules when applicable.

### MPA considerations

A multi-page application may be appropriate when the product benefits from:

- Independent pages and document navigation.
- Server-rendered or statically generated content.
- Content-heavy pages and SEO.
- Simple navigation with limited client-side application state.
- A traditional server-driven architecture.

Plan shared layouts, rendering, navigation, page delivery, and form or interaction handling according to the selected framework.

### Hybrid considerations

Consider a hybrid approach when different parts of the same product have different rendering needs, such as publicly discoverable marketing pages and an interactive application dashboard.

Do not select a hybrid framework merely because it offers more features.

### Decision criteria

Evaluate:

1. User experience and interaction complexity.
2. SEO and content discoverability.
3. Initial loading and navigation performance.
4. Rendering and data requirements.
5. Team familiarity and existing infrastructure.
6. Hosting and deployment constraints.
7. Accessibility and progressive enhancement needs.
8. Long-term maintenance cost.

State the recommended approach and explain the decisive trade-offs. Keep alternatives brief unless the decision is genuinely uncertain.

A page-based site is not automatically an MPA, and a website with many routes is not automatically an SPA. Choose based on the rendering and navigation model.

## Step 5 — Define the UI/UX plan

Before substantial UI implementation, establish the product's design concept.

Coordinate with these existing skills when relevant:

- `design/ux-research` — audience, user needs, personas, and journeys.
- `design/ui-ux-principles` — usability and interaction principles.
- `design/visual-craft` — composition, hierarchy, and visual polish.
- `design/design-tokens` — color, typography, spacing, shape, and design tokens.
- `design/accessibility-wcag` — accessibility requirements.
- `design/design-review` — critique and validation.

The design plan should identify:

- Art direction and product personality.
- Brand assets and imagery requirements.
- Typography and color strategy.
- Layout and spacing conventions.
- Reusable components and shared layouts.
- Navigation and interaction patterns.
- Responsive behavior across relevant screen sizes.
- Forms, validation, feedback, loading, empty, success, and error states.
- Accessibility requirements and relevant contrast targets.

For multi-page applications, define consistency rules for shared components while allowing pages to serve different purposes. For single-page experiences, plan the hierarchy and transitions between sections.

Do not select a generic palette or typeface without considering the product concept. Do not treat a static mockup as a complete implementation plan.

## Step 6 — Define technical boundaries

Choose technical solutions that satisfy the requirements with the least unnecessary complexity.

Identify, where applicable:

- Frontend framework and rendering approach.
- Routing strategy.
- Component and shared-layout structure.
- State management and server-state handling.
- API boundaries and data contracts.
- Backend responsibilities.
- Database and file storage requirements.
- Authentication, authorization, and session handling.
- Third-party integrations.
- Environment configuration and secrets management.
- Testing strategy.
- Deployment and production constraints.

Use existing project conventions when suitable. Load the relevant architecture, frontend, backend, security, and data skills only when the task needs them.

Do not introduce a backend or database for a static website without a justified requirement. Do not introduce a new state library, UI framework, or routing dependency when existing tools are sufficient.

## Step 7 — Break the project into implementation phases

Define phases that reflect the actual project. A typical web application may use:

1. Requirements and project setup.
2. Information architecture and design concept.
3. Design system and core layouts.
4. Essential pages and user journeys.
5. Backend and integrations, if required.
6. Validation, accessibility, and responsive refinement.
7. Testing, deployment, and release verification.

Reorder or combine phases when appropriate. A small website may need only a short checklist.

For each substantial phase, identify:

- Expected deliverables.
- Dependencies and prerequisites.
- Major risks or unresolved decisions.
- Acceptance criteria.
- Appropriate verification steps.

Use `engineering/estimation-and-planning` when effort estimates, detailed task decomposition, or milestones are needed. Avoid invented precision when the available information does not support reliable estimates.

## Step 8 — Define acceptance criteria

Make requirements verifiable.

Examples include:

- Every required route loads correctly when accessed directly and refreshed, where supported by the selected architecture.
- Navigation reaches the intended destination.
- Forms validate input and communicate errors clearly.
- Responsive layouts work at the target viewport sizes.
- Keyboard users can access and operate essential functionality.
- Relevant API failures and empty states are handled.
- Access restrictions are enforced on the server when protected resources are involved.
- Production configuration and deployment behavior match the selected architecture.
- Automated tests and existing project checks pass where applicable.

Use criteria appropriate to the project. Do not impose backend, authentication, or automated E2E testing requirements on projects that do not need them.

## Expected planning deliverable

Produce a concise plan containing the applicable items below:

1. Project summary and objectives.
2. Target users and primary journeys.
3. Scope, exclusions, and assumptions.
4. Sitemap or single-page section outline.
5. SPA/MPA/hybrid recommendation and rationale.
6. UI/UX concept and design deliverables.
7. Technical architecture and key dependencies.
8. Implementation phases and deliverables.
9. Risks, unresolved decisions, and dependencies.
10. Acceptance criteria and verification plan.

For small tasks, omit irrelevant sections and provide a lightweight checklist. For substantial applications, expand the relevant sections sufficiently to guide implementation.

## Completion rules

- Clearly distinguish decisions from assumptions and open questions.
- Do not silently invent business requirements.
- Do not create redundant documents when an existing project document serves the same purpose.
- Do not modify unrelated files during planning.
- If implementation is requested after planning, follow the main project protocol and load the relevant skills for each implementation stage.
- Stop at the requested boundary. If the protocol requires approval before the next stage, present the plan and wait.
