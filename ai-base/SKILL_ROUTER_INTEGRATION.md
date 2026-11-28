# SKILL_ROUTER.md integration patch — v2.5

Apply these additions to your existing router. Keep all existing rows and skill paths unless a specific change is shown below.

## 1. Master Protocol stage map

Add or update the following rows:

| Protocol stage | Load these skills |
|---|---|
| **Stage 1 — Discovery and planning** | `engineering/web-project-planning`, `engineering/estimation-and-planning`; add `design/ux-research` when user needs, audience, or domain are unclear |
| **Stage 1 — Requirements and user research** | `design/ux-research`; add `engineering/web-project-planning` when defining scope, pages, or acceptance criteria |
| **Stage 2 — SPA/MPA decision** | `engineering/web-project-planning`; add `architecture/mern-architecture` for MERN architecture decisions and relevant frontend/rendering skills when required |
| **Stage 2 — Web routing and navigation** | `engineering/web-project-planning`; add `frontend/react-component-patterns` when implementing React layouts, route composition, or shared components |

Keep your existing Stage 2 architecture, Stage 3 design, Stage 4 frontend, Stage 5 backend, and Stage 6 testing rows. Avoid loading every listed skill automatically; select only those relevant to the task.

## 2. Stage 1 planning rule

Add this guidance under the Master Protocol:

For new websites and web applications, define objectives, scope, target users, user journeys, sitemap/page inventory, and acceptance criteria before substantial implementation. Select SPA, MPA, or hybrid rendering based on requirements rather than assuming a default. Keep planning proportional to project size; small changes need only lightweight planning.

## 3. Stage 3 design concept rule

Keep the existing Design Concept first rule and existing six design skill paths. The new planning skill complements those design skills; it does not replace them.

## 4. Activity map

Add these rows:

| Activity | Load these skills |
|---|---|
| New website or application planning | `engineering/web-project-planning` |
| Sitemap, page inventory, or user flows | `engineering/web-project-planning`; add `design/ux-research` when user research is needed |
| SPA/MPA selection or routing strategy | `engineering/web-project-planning`; add relevant architecture or frontend skills |
| Design concept or visual direction | `design/ui-ux-principles`, `design/visual-craft`, `design/design-tokens` |
| UI/UX critique or design-system review | `design/design-review`; add `design/accessibility-wcag` when relevant |
| Responsive layouts and visual consistency | `design/ui-ux-principles`; add relevant frontend implementation skills |

## 5. Skill creation rule

Retain the existing rule that every referenced skill path must resolve. The new skill lives at:

`ai-base/skills/engineering/web-project-planning/SKILL.md`

Run `tools/check-rules.ps1` after applying the changes.
