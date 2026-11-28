# Mentora Homepage Enhancement Plan

Status: **Implemented and pushed**  
Date: 2026-11-28  
Target: `client/src/pages/public/HomePage.jsx` and its homepage components

---

## 1. Basis and boundaries

### Sources read

- `ai-base/SKILL_ROUTER_INTEGRATION.md` — planning/routing guidance.
- `ai-base/skills/README.md` — skill index.
- `ai-base/skills/design/` — `design-tokens`, `ui-ux-principles`, `visual-craft`, `design-review`, `accessibility-wcag`, `impeccable`, `taste`, `unslop`, `ux-research`.
- `ai-base/e_learning_homepage_ui/.../modern_kinetic_academy/DESIGN.md` — pinned system.
- `DESIGN.md` (root) — documented incumbent visual system generated from the shipped code; the pinned source above remains authoritative for homepage structure and approved copy.
- `ai-base/e_learning_homepage_ui/.../mentora_e_learning_platform_homepage/code.html` — pinned homepage structure and copy.
- Current implementation: `HomePage.jsx`, `Hero.jsx`, `FeaturedBanner.jsx`, `CategoryTabs.jsx`, `HomeCourseGrid.jsx`, `CourseCard.jsx`, `AllAccessCta.jsx`, `Navbar.jsx`, `Layout.jsx`, `DemoChrome.jsx`, `Footer.jsx`, `index.css`, `useCourseList.js`, `Button.jsx`.

### Source-of-truth order

1. User's explicit instructions and preserved demo behavior.
2. `DESIGN.md` for tokens: fonts, colors, spacing, radii, elevation, buttons, badges, nav, callouts.
3. `code.html` for homepage section order, structure, and copy.
4. Current React implementation.
5. Generic taste guidance from the design skills.

Generic anti-slop preferences such as “avoid violet” do **not** apply here because the pinned system deliberately uses royal violet and amber.

### Scope decision

This is a **scoped refinement**, not a new visual world. I did not run the full `design-director` / `/impeccable init` product-context flow because it would introduce `PRODUCT.md` and broader redesign decisions that are outside the current brief. The separate critique at `.impeccable/critique/2026-11-28T02-34-11Z__client-src-pages-public-homepage-jsx.md` is treated as an optional backlog, not as an approved change list.

### Must remain unchanged

- Demo bar above the header with `Summer Enrollment: 20% off all bundles`, demo user switcher, and `Reset Demo Data`.
- Six demo accounts: `admin@mentora.demo`, `sarah@mentora.demo`, `mark@mentora.demo`, `lina@mentora.demo`, `omar@mentora.demo`, `nora@mentora.demo`; password `demo1234`; none suspended.
- 10 courses, 5 categories, and 8 cards in the default `All Courses` view.
- `Featured & Trending Courses` above `Latest courses`.
- Original footer links: `Privacy`, `Terms`, `Support`, `Student Discount`.
- Commit and push after verification, per the user's standing instruction to finish without stopping for approval.

---

## 2. Current-state audit

### Verified strengths

| Area | Evidence |
|---|---|
| Shell geometry | Demo bar `top 0 / h 32`, full-width header `top 32 / h 64`, main `top 96`. Inner nav keeps its original content gutters. No overlap at 1440, 1188, 1040, 768, or 390px. |
| Container | Homepage uses `max-w-[1440px]` with `px-4 / sm:px-8 / lg:px-16`, matching `DESIGN.md`. |
| Fonts | Only `Inter` and `Plus Jakarta Sans` are used; computed sizes match the pinned scale after fonts load. |
| Grid | Default `All Courses` shows 8 cards in a 4-column desktop grid, 2 columns at tablet, 1 column on mobile. |
| Footer | Dark indigo multi-column footer; measured minimum text contrast **6.24:1** on the dark surface. |
| Accessibility wiring | Skip link, section `aria-labelledby`, `aria-pressed` category tabs, like-button `aria-pressed`, meaningful image alt text, visible focus rings. |
| Quality gates | `npm run lint`: 0 errors, 13 pre-existing warnings. `npm run build`: success with existing chunk-size warning. No console warnings/errors and no failed requests in the last browser check. |

### Open issues

| ID | Priority | Area | Finding | Proposed action |
|---|---|---|---|---|
| A1 | P0 | Content trust | Hero badge says `Updated catalog for 2025`; today is 2026. `code.html` pins 2025, so this is an approval-gated content fix. | Change to `Updated catalog for 2026` or evergreen `Freshly updated catalog`. |
| A2 | P0 | CTA truth | `See how it works` links to `/about`; `Compare plans` links to `/courses`; hero course links to hardcoded `/courses/course-1`. | Rename links to match destinations or bind to real routes/data. |
| A3 | P0 | Featured section | `Featured & Trending Courses` promises hand-picked courses, capstones, and office hours but renders no course, proof, or action. | Keep section position; add one real course/proof strip and a CTA after approval. |
| A4 | P0 | Category data | `useCourseList({ limit: 10 })` fetches 10 courses, then filters locally; `totalCount` comes from global `meta.total`. Counts and visible results can disagree. | Use one count source; ideally push category into the API query. |
| A5 | P0 | Course category | Card 8 displays `MARKETING` while its filter category remains `Growth Marketing`. | Normalize displayed label to the canonical category while preserving the visible badge intent. |
| A6 | P0 | States | Error state says “Please try again” with no button; empty state says “choose another category” with no reset action. | Add `Retry` and `Reset filter` actions using existing `refetch` and filter state. |
| A7 | P1 | Legibility | Functional metadata uses 10px `.pill` / `type-label-sm`: category, rating, likes, level, enrolled count. | Move functional text to `type-label-md` (12px); keep 10px only for decorative uppercase marks. |
| A8 | P1 | Contrast | Measured: `accent-500` on white = **2.15:1**, `slate-400` on white = **2.56:1**, `accent-600` on white = **3.19:1**. These fail normal-text AA. `accent-700` on amber = **4.51–4.84:1** and `brand-600` on white = **6.29:1** pass. | Use `accent-700` for amber text on light surfaces, `slate-500` or darker for metadata, and reserve bright amber for dark surfaces/backgrounds. |
| A9 | P1 | Button system | Hero, tabs, CTA banner, and footer use raw class combinations instead of the shared `Button` primitive. | Introduce a link-capable button class/primitive with the same variants and states. |
| A10 | P1 | Type tokens | `.type-headline-lg` and `.type-headline-md` are both 28/36 at base and only `lg` diverges; `DESIGN.md` defines distinct roles. | Lock `headline-md` to 28/36 and `headline-lg` to 28/36 mobile → 40/48 desktop. |
| A11 | P1 | Motion | Pulse dots and radial glows persist in demo bar, latest badge, FeaturedBanner, and AllAccessCta. | Keep one deliberate dark moment; remove pulses and reduce radial glows. Respect `prefers-reduced-motion`. |
| A12 | P1 | Mobile demo bar | Full promo text is hidden below `sm`; the requirement says the strip should be above the header at all widths. | Show a compact promo below `sm` with full text in `aria-label`, or increase bar height. Requires approval. |
| A13 | P2 | Navigation | Mobile full-screen menu has no Escape handling, focus trap, or body scroll lock. Profile menu has no Escape handling. | Add keyboard affordances without changing visuals. |
| A14 | P2 | Anchoring | `#latest-courses` anchor can land under the fixed header. | Add `scroll-mt-[116px]` to anchored sections. |
| A15 | P2 | Hero image | Fixed 1200×900 image with no responsive sources or priority hint. | Add responsive `srcSet`, explicit dimensions, `fetchpriority="high"`, and keep the overlay fixed at mobile. |
| A16 | P2 | Consistency | `CourseCard` colors instructor avatars using hardcoded name markers (`mark`, `michael`, `elena`). | Derive from stable data or use one neutral treatment. |

---

## 3. Target specification

### 3.1 Layout and section order

Preserve the `code.html` order:

1. Demo bar — fixed, `top 0`, `h 32`, `z-40`.
2. Header — full-width frosted bar, `top 32`, `h 64`, `inset-x-0`, `z-50`; inner nav gutters `28 / 56 / 96` preserve the previous content width.
3. Main — `mt-24`, `max-w-[1440px]`, gutter `16 / 32 / 64`.
4. Hero — 12-column grid, `6/6` at `lg`, `gap 48` desktop / `32` tablet.
5. Featured banner — full container width, above latest courses.
6. Latest courses header + category tabs.
7. Course grid — 8 cards default.
8. `View all courses` action.
9. All-access CTA.
10. Footer — dark indigo, multi-column.

Vertical rhythm from `DESIGN.md`:

| Token | Value | Use |
|---|---:|---|
| `space-xs` | 4px | Icon/label gaps |
| `space-sm` | 8px | Tight clusters |
| `space-md` | 16px | Default control/card gaps |
| `space-lg` | 24px | Section sub-groups |
| `space-xl` | 40px | Section edges |
| `margin-lg` | 64px | Hero top/bottom desktop |

Section padding targets:

- Hero: `py-6` mobile, `lg:py-10` desktop (50% reduction in nav-to-hero space).
- Featured banner: `mt-6`, `py-6`.
- Latest heading block: `pt-8 pb-4`.
- Grid: `py-10`.
- CTA: `py-10`.
- Learning facts strip: `py-12` mobile / `lg:py-14`.
- Footer: `py-14` mobile / `lg:py-16`.

### 3.2 Typography

Use the two pinned families:

- `Plus Jakarta Sans` — hero title, headings, badges, course titles, numeric metrics, labels.
- `Inter` — body copy, descriptions, long-form UI text.

Exact scale to enforce in `index.css`:

| Class | Family | Size / line-height | Weight | Tracking |
|---|---|---:|---:|---:|
| `type-display-hero` | Plus Jakarta Sans | fluid 36px → 64px (line-height 1.1) | 800 | -0.035em |
| `type-headline-lg` | Plus Jakarta Sans | 28/36 mobile → 40/48 desktop | 700 | -0.02em → -0.025em |
| `type-headline-md` | Plus Jakarta Sans | 28/36 | 700 | -0.02em |
| `type-headline-sm` | Plus Jakarta Sans | 20/28 | 600 | -0.015em |
| `type-title-md` | Plus Jakarta Sans | 16/24 | 600 | -0.01em |
| `type-body-lg` | Inter | 18/28 | 400 | -0.005em |
| `type-body-md` | Inter | 15/24 | 400 | 0 |
| `type-body-sm` | Inter | 13/20 | 400 | 0 |
| `type-label-lg` | Plus Jakarta Sans | 14/20 | 600 | 0.01em |
| `type-label-md` | Plus Jakarta Sans | 12/16 | 600 | 0.02em |
| `type-label-sm` | Plus Jakarta Sans | 10/14 | 700 | 0.04em |

Rules:

- `type-label-sm` is permitted only for decorative uppercase tags and the instructor initial.
- Rating, likes, level, enrolled count, price, card actions, and tab labels use `type-label-md` or larger.
- Numerical values use `tabular-nums`.
- Headings use `text-wrap: balance`.
- Keep the removed underline under `future` removed.

### 3.3 Color, elevation, and shape

Color roles:

| Role | Token | Use |
|---|---|---|
| Primary | `#4F46E5` / `#4338CA` / `#6366F1` | Active nav, primary buttons, focus, brand marks |
| Amber | `#F59E0B` / `#D97706` / `#B45309` | Conversion CTA, ratings, promo badges; text on light uses `#B45309` |
| Emerald | `#10B981` | Success only |
| Canvas | `#F8FAFC`, `#FFFFFF`, `#FAF8FF` | Page and surface layers |
| Text | `#0F172A`, `#334155`, `#64748B` | Headings, body, metadata |
| Lines | `#E2E8F0` | Hairline borders |
| Dark callout | `#0F172A → #1E1B4B` | CTA surfaces with `white/10` interior border |

Contrast rules:

- Normal text ≥ 4.5:1; large text ≥ 3:1.
- On light surfaces: use `accent-700`, `brand-600`, `slate-700`, or `slate-500`; never `accent-500` or `slate-400` for text.
- On dark callouts: `white`, `slate-300`, `slate-400`, `accent-200`, and `accent-400` all pass; current footer minimum is 6.24:1.

Elevation and shape:

- Cards: white, 1px `#E2E8F0`, `rounded-2xl` / 16–24px, `shadow-soft`.
- Card hover: `translateY(-2px)`, border `#CBD5E1`, `shadow-card-hover`.
- Header: frosted white, `backdrop-blur`, `shadow-nav`.
- Buttons/inputs: 8–12px radius; chips and pills: full radius.
- One shadow per surface; no stacked glows.

### 3.4 Buttons and interaction states

Consolidate to three visual treatments plus semantic states:

| Treatment | Style | Use |
|---|---|---|
| Primary | Gradient `#6366F1 → #4F46E5`, white `label-lg`, `rounded-xl`, `px-6 py-3` | Browse courses, enroll, login |
| Secondary / ghost | Transparent, 1.5px `#E2E8F0`, `slate-700`; hover `#F8FAFC` | See how it works, View all courses, Compare plans |
| Accent amber | `#F59E0B → #D97706`, slate-950 or white text | 7-Day Free Trial, rating/promo moments |

State rules:

- Default → hover: brightness lift or fill change; specific properties only.
- Active/pressed: darker step, `translateY(0)`.
- Focus: visible `2px` ring with `2px` offset; color matches treatment (`brand` or `accent`).
- Disabled: `opacity-50`, `cursor-not-allowed`, no hover motion.
- Loading: spinner plus `aria-busy`, text preserved or replaced by `sr-only` “Loading”.
- Primary CTAs maintain ~44px height on touch; compact card actions may be shorter but need a 44px effective hit area.

Semantics:

- Navigation uses `Link` / `<a>`; actions use `<button>`.
- CTA labels must describe the destination/action.
- Add `ArrowRight` for forward navigation; reserve `ChevronDown` for actual disclosure controls.

CTA inventory and proposed defaults:

| Location | Current label | Current target | Proposed rule |
|---|---|---|---|
| Hero primary | Browse courses | `#latest-courses` | Keep label; add `scroll-mt-[116px]` to target. |
| Hero secondary | See how it works | `/about` | Rename to `About Mentora` unless a real “how it works” page/anchor is added. |
| Hero overlay | View course | `/courses/course-1` | Bind to the first real course ID from demo data. |
| Category tabs | All Courses + 5 categories | state | Keep labels/order; count uses the same dataset shown in the grid. |
| View all | View all N courses | `/courses` | Use `10` from demo data; replace `ChevronDown` with `ArrowRight`. |
| CTA primary | Start 7-Day Free Trial | `/register` | Keep; add trial terms microcopy after approval. |
| CTA secondary | Compare plans | `/courses` | Rename to `Browse all courses` unless a plans page exists. |
| Footer | Original links | existing routes | Preserve labels and routes. |

### 3.5 Content and trust

Keep pinned copy where it is accurate:

- Hero headline and supporting paragraph.
- `Expert-led lessons`, `Learn at your pace`, `Certificate included`.
- `Featured & Trending Courses` heading and supporting sentence.
- `Latest courses` heading and supporting sentence.
- All-access headline and body.
- Footer legal/support labels.

Fix only factual or behavioral drift:

1. Year badge: `2025` → `2026` or evergreen. **Approval required** because `code.html` pins 2025.
2. Featured section: add a real course or proof strip. **Approval required** because `code.html` has only a banner.
3. CTA labels: align with real destinations. **Approval required** where copy differs from `code.html`.
4. Course category label: `MARKETING` → canonical `Growth Marketing` for filtering consistency.
5. Error/empty copy: add actions, not just advice.
6. Footer year: align with the chosen year rule.

Recommended Featured section options:

- **Option A (recommended):** Keep the banner shell and add one real featured course with instructor, rating, price, and `View course` CTA.
- **Option B:** Keep it as a compact proof strip with three chips: mentor-led, capstone projects, weekly office hours, plus `Browse featured courses`.
- **Option C:** Leave the banner content unchanged and accept the empty-promise issue.

### 3.6 Responsive behavior

| Width | Demo bar | Header | Hero | Tabs | Grid | CTA | Footer |
|---|---|---|---|---|---|---|---|
| `<640` | Full promo currently hidden; propose compact promo | Floating, hamburger only | 1 column, image below copy | Wrap, 2 rows max | 1 column | Stacked | 1 column brand + 2-column link grid |
| `640–1023` | Full promo, switcher, reset | Floating, hamburger only | 1 column, centered image | Wrap, centered | 2 columns | Stacked or wide row | Brand + 3-column links |
| `1024–1279` | Full strip | Primary nav visible | 6/6 split | Single row if possible | 4 columns | Row | Brand + 3-column links |
| `≥1280` | Full strip | Full nav + profile | 6/6 split, max image | Single row | 4 columns | Row | Brand + 3-column links, 4-column shell |

Rules:

- No horizontal overflow at 390, 768, 1040, 1188, or 1440px.
- Equal left/right content edges at every breakpoint.
- Header remains above demo bar; main remains below header.
- Mobile menu: Escape closes, focus is trapped, background scroll locked, focus returns to toggle.
- Anchored sections use `scroll-mt-[116px]`.

### 3.7 Accessibility (WCAG 2.1 A/AA)

Checklist to verify after implementation:

- **Perceivable**
  - All normal text ≥ 4.5:1; large text ≥ 3:1.
  - Functional text ≥ 12px.
  - Icons are `aria-hidden` unless they carry meaning.
  - Hero image has meaningful alt; decorative gradients/dots are hidden.
- **Operable**
  - Skip link is first focusable element and lands below fixed chrome.
  - Keyboard path: skip → demo controls → nav → hero → featured → tabs → cards → CTA → footer.
  - Category tabs expose `aria-pressed`; filter changes announce via a polite live region.
  - Like button keeps `aria-label` and `aria-pressed`.
  - Mobile menu and profile menu close on Escape.
  - Main CTAs are at least 44px tall.
- **Understandable**
  - CTA labels match destinations.
  - Error/empty states explain the next step and provide a control.
  - No misleading counts.
- **Robust**
  - Semantic `header`, `nav`, `main`, `section`, `article`, `footer`.
  - No nested interactive elements.
  - `aria-labelledby` targets exist and are unique.

Do not claim conformance from visuals alone; verify with keyboard, screen reader, and an automated scan.

### 3.8 Motion and micro-interactions

Allowed:

- Hero reveal: one subtle entrance, ≤ 300ms, ease-out.
- Card hover: 2px lift, 180ms, specific properties.
- Image zoom: 1.03 inside frame, 300ms.
- Button hover step and press reset.
- Text-link arrow translation ≤ 4px.

Remove or reduce:

- Pulsing dots in demo bar and `Freshly Added This Month`.
- Radial glow cones behind both dark banners.
- Any `transition: all`.
- Smooth scroll under `prefers-reduced-motion: reduce`.

Prefer one deliberate dark moment. The pinned page has two dark callouts; keep both only if differentiated by content density and hierarchy, not by identical glow treatments.

---

## 4. Implementation phases

### Phase 0 — Trust and correctness (P0, ~0.5–1 day)

Files: `HomePage.jsx`, `useCourseList.js`, `Hero.jsx`, `HomeCourseGrid.jsx`, `CategoryTabs.jsx`, `CourseCard.jsx`, `DemoChrome.jsx`.

Work:

1. One source of truth for course counts and category filtering.
2. Bind hero overlay course to real data.
3. Align CTA labels and routes.
4. Add `Retry` and `Reset filter` actions.
5. Normalize the `MARKETING` category label.
6. Add scroll offset for anchored sections.
7. Decide mobile promo treatment.

Exit: counts agree, CTAs truthful, states actionable, no pinned data changed.

### Phase 1 — Type, color, and button system (P1, ~1 day)

Files: `index.css`, `Button.jsx`, `Hero.jsx`, `CategoryTabs.jsx`, `AllAccessCta.jsx`, `CourseCard.jsx`, `Footer.jsx`.

Work:

1. Fix `headline-lg` / `headline-md` tokens.
2. Move functional 10px text to 12px.
3. Replace failing light-surface color pairs.
4. Unify button variants and focus rings.
5. Remove stacked shadows and gratuitous glows.
6. Add reduced-motion rules.

Exit: computed typography matches `DESIGN.md`; all measured text pairs pass AA; one button treatment per role.

### Phase 2 — Content and hierarchy upgrades (P2, ~1 day, approval-gated)

Files: `FeaturedBanner.jsx`, `AllAccessCta.jsx`, `Hero.jsx`, `Navbar.jsx`, `Footer.jsx`.

Work:

1. Implement chosen Featured option (A/B/C).
2. Apply year/copy decisions.
3. Add trial terms microcopy.
4. Add mobile menu keyboard affordances.
5. Differentiate or quiet the two dark callouts.

Exit: user-approved copy only; no unapproved structural redesign.

### Phase 3 — Verification and hardening (~0.5 day)

Work:

1. Render checks at 390, 768, 1040, 1188, 1440.
2. Keyboard walkthrough and screen-reader spot check.
3. Contrast and detector re-run.
4. `npm run lint`, `npm run build`.
5. Console/network check.

Exit: all acceptance criteria below pass. Only then request commit approval.

---

## 5. Acceptance criteria

### Visual

- Section order matches `code.html` and the preserved demo-bar/header arrangement.
- Default `All Courses` shows exactly 8 cards; catalog contains 10 courses and 5 categories.
- `Featured & Trending Courses` remains above `Latest courses`.
- No horizontal overflow at any listed breakpoint.
- Header never overlaps the demo bar or main content.
- Footer preserves the four original legal/support links.

### Typography and tokens

- Only `Inter` and `Plus Jakarta Sans` render.
- Computed type scale matches `DESIGN.md`.
- No functional text below 12px.
- Primary, secondary, ghost, and accent buttons share one state model.

### Content and behavior

- Every CTA label matches its destination.
- Course counts match the data actually shown.
- All six demo accounts work; password remains `demo1234`; no account is suspended.
- Error and empty states have working recovery actions.
- Hero overlay links to a real course.
- Category filtering produces correct, non-empty results for every category in the seeded data.

### Accessibility

- Skip link works with fixed chrome.
- Full keyboard path with visible focus.
- No critical or serious contrast violations.
- Tabs, like buttons, menus, and live region expose correct ARIA state.
- Reduced-motion preference is honored.

### Engineering

- `npm run lint`: 0 errors.
- `npm run build`: success.
- Detector reports no findings on changed React files.
- No console warnings/errors and no failed requests.
- Commit and push once verification passes, without waiting for explicit approval.

---

## 6. Confirmed decisions and implementation record

1. **Year copy:** Resolved to evergreen wording. The hero badge reads `Freshly updated catalog`; the footer year is rendered dynamically as `© 2026`.
2. **Featured section:** Option A — one real top-rated course from the unfiltered catalog.
3. **CTA labels:** Mismatched labels were renamed to match existing routes; no new destination pages were added.
4. **Category counts:** Server-side category filtering. The unfiltered view uses `View all 10 courses`; filtered views use `View all courses`.
5. **Mobile promo:** Compact promo text below `sm` with a full `aria-label`; the mobile reset control also has an explicit `aria-label`.
6. **Dark callouts:** Both dark banners were retained with differentiated content density; pulses and radial glows were removed.
7. **Hero type refinement:** The hero title uses three explicit lines — `Practcial course for` / `the future you are` / `building` — in Plus Jakarta Sans at weight 800. Size is fluid from 36px to 64px with 1.1 line-height and -0.035em tracking so each line holds at mobile, tablet, and desktop widths. All headings share the same family.

These defaults were confirmed and implemented.

### Verification completed

- Full-load DOM checks at 390, 768, 1040, 1188, and 1440: demo bar `top 0 / h 32`, full-width header `top 32 / h 64` with no gap, `main` at `top 96`, one `<main>` landmark, exactly 8 default cards, correct section order, footer links and `© 2026` present, and no horizontal overflow.
- Server-side category filters return 2 Web Development, 3 Data & AI, 2 Design, 2 Business, and 1 Growth Marketing course; every category is non-empty and the badge uses the canonical `Growth Marketing` label.
- Keyboard checks: mobile menu focuses its first item, traps Tab, locks body scroll, closes on Escape, and returns focus; profile menu closes on Escape and returns focus.
- Live-region copy uses the correct singular/plural noun for filtered results.
- `npm run lint`: 0 errors, 13 pre-existing warnings. `npm run build`: success with the existing chunk-size warning.
- Browser console: 0 warnings/errors. Captured network: no failed requests.
- Root `DESIGN.md` and `.impeccable/design.json` were added from the shipped code. Typeset refinements rechecked at 390, 768, and 1440: featured copy 15/24px Inter at 512px max width, hero benefits 13/20px Inter, `text-wrap: pretty` on prose, hero display Plus Jakarta Sans 800 at 44/47px / -0.03em mobile and 64/68px / -0.03em at `>=640px`, nav-to-hero hero padding reduced by 50%, compact centered course bar, learning-facts strip between the CTA and footer, equal-width footer CTAs, with no overflow.
- The exact detector rerun was unavailable in the parent session; the typeset run's scoped detector returned 0 findings on its four changed files.
- Header logo alignment: the nav container now uses the same `px-4 / sm:px-8 / lg:px-16` gutters as the hero container. A browser measurement at 1203px put the logo's left edge and the hero title's left edge at the same x position (`64px`).
- Route sweep: all public, auth, admin, instructor, student, billing, payment, and restored alias routes rendered seeded demo content. `/admin/reports`, `/student/grades`, `/certificates`, and `/my-courses` were repaired after the sweep; no blank routes or console errors remain.
- Final verification passed before commit.
- Later catalog update (user request): the demo seed now contains 12 courses and the catalog page size is 12. Verified at `/courses`: 12 course cards, `Total Courses: 12`, `Showing all 12 courses`, `Page 1 of 1`, no overflow, and no console errors. The homepage still shows 8 cards (`Showing 8 of 12 courses`) and links to `View all 12 courses`; the two added courses have working detail pages.
- Local assets update (user request): all runtime photos, course art, avatars, icons, and fonts are bundled. Google Fonts links were removed; Inter and Plus Jakarta Sans now load from `client/public/fonts/*.woff2` via local `@font-face` rules. The favicon is bundled at `/favicon.png`. Browser checks on `/`, `/courses`, `/courses/course-11`, and `/login` found no remote asset requests, no broken images, no horizontal overflow, and no console errors; the hero still computes to Plus Jakarta Sans 800 at 64px with 1.1 line-height and -0.035em tracking.
- Design merge from `mentora-home/` (user request): the hero now uses the supplied studio collaboration photograph, amber kicker, gradient overlay, and anchored course card while keeping the exact three-line `Practcial course for / the future you are / building` copy. The homepage grid uses an editorial featured-card treatment with unboxed metadata, 4:3 photography, ratings, and direct syllabus links, and a new dark `Why Learn With Mentora` showcase adds the three value pillars from the supplied design. On `lg+` the hero fills the viewport below the demo bar and fixed header (`calc(100vh - 96px)`), so `Featured & Trending Courses` starts below the fold. Measured at 1440x900, 1366x768, 1203x900, and 1024x768: hero bottom equals viewport bottom and featured banner starts 24px below it, with no overflow. At 390/768/1440 the homepage still renders 8 cards (1 / 2 / 4 columns), the catalog still renders 12 cards on one page, and all links/routes remain intact.
- Why section compaction and graduate quotes (user request): the showcase is now exactly `75vh` tall on `lg+` (`min-h 560px`) with a centered `Built for Real Mastery / Why Learn With Mentora` heading and small centered subtitle, followed by a two-column grid with the mentorship photo on the left and the three pillars on the right. The photo uses `object-contain` at its natural 1200x896 ratio, so it is never cropped; verified rendered ratios match the source at every tested width. Verified at 1440x900 (675px), 1366x768 (576px), 1203x900 (675px), and 1024x768 (576px): each measures 75% of the viewport, the two graduate quotes render immediately below the panel with exact supplied copy and attributions, and the hero fold, 8-card grid, no-overflow, no-broken-image, and no-console-error checks still pass. Tablet/mobile keep the natural stacked layout.
