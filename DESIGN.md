---
name: Mentora Courses
description: Practical, expert-led lessons you can put to work right away.
colors:
  royal-violet: "#4f46e5"
  royal-violet-deep: "#4338ca"
  royal-violet-bright: "#6366f1"
  royal-violet-soft: "#e0e7ff"
  royal-violet-wash: "#eef2ff"
  royal-violet-ink: "#3525cd"
  royal-violet-night: "#312e81"
  amber: "#f59e0b"
  amber-deep: "#d97706"
  amber-bright: "#fbbf24"
  amber-wash: "#fef3c7"
  amber-ink: "#b45309"
  emerald: "#10b981"
  emerald-wash: "#ecfdf5"
  emerald-ink: "#047857"
  paper: "#ffffff"
  canvas: "#f8fafc"
  surface-muted: "#f1f5f9"
  lavender-mist: "#faf8ff"
  lavender-container: "#f2f3ff"
  ink: "#0f172a"
  ink-soft: "#334155"
  ink-muted: "#64748b"
  line: "#e2e8f0"
  outline: "#777587"
  night-navy: "#1e1b4b"
  callout-ink: "#0b0f19"
typography:
  hero:
    fontFamily: "Plus Jakarta Sans, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "4rem"
    fontWeight: 800
    lineHeight: "4.25rem"
    letterSpacing: "-0.03em"
  display:
    fontFamily: "Plus Jakarta Sans, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 700
    lineHeight: "4.25rem"
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Plus Jakarta Sans, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: "3rem"
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Plus Jakarta Sans, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: "1.5rem"
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: "1.5rem"
  label:
    fontFamily: "Plus Jakarta Sans, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: "1rem"
    letterSpacing: "0.02em"
rounded:
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  "2xl": "1.25rem"
  card: "1.5rem"
  pill: "9999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  gutter: "1.5rem"
  margin: "1.5rem"
  section: "3rem"
  section-lg: "4.5rem"
components:
  button-primary:
    backgroundColor: "{colors.royal-violet}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.royal-violet-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "0.75rem 1.5rem"
  button-accent:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0.75rem 1.5rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0.75rem 1.5rem"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "1.5rem"
  course-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "1rem"
  input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.625rem 0.75rem"
    height: "2.75rem"
  chip:
    backgroundColor: "{colors.royal-violet-wash}"
    textColor: "{colors.royal-violet}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.625rem"
  nav-shell:
    backgroundColor: "rgb(255 255 255 / 0.88)"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.xl}"
    padding: "0.5rem 0.75rem"
---

# Design System: Mentora Courses

## Overview

**Creative North Star: "The Kinetic Academy"**

The Kinetic Academy is a decisive, high-value place to learn: structured enough to feel like an institution, close enough to feel like a mentor's studio. It joins modern neo-corporate refinement with tactile digital craft — hairline containment, precise shadows, tight headline tracking, and a single violet anchor. The same system serves the public marketing pages, the course catalog, and the dense admin, instructor, and student dashboards without changing its voice.

It deliberately avoids the sterile detachment of legacy enterprise LMS software and the chaotic gamification of mass-market consumer learning apps. Information is allowed to be dense; visual noise is not. Amber is earned — it appears on conversion paths, ratings, and milestones — while emerald confirms completed or verified work. Motion answers a pointer or a state change; nothing tilts and nothing moves on scroll.

**Key Characteristics:**

- Violet-first palette with amber reserved for conversion and accomplishment
- Hairline-bordered containment instead of open, floating canvases
- Two-family core: Plus Jakarta Sans for the hero title and structure, Inter for sustained reading
- Compact density on an eight-point rhythm with fluid grids
- Restrained, pointer-driven motion with a real reduced-motion path

**The One Anchor Rule.** Royal violet is the only structural accent. Amber marks conversion and accomplishment; emerald marks verified success.

**The Contained-Density Rule.** Dense information belongs inside a 1px hairline surface, not in an unbounded field.

**The Quiet-Motion Rule.** Motion answers a pointer or a state change. Nothing tilts, drifts, or animates on scroll.

## Colors

An indigo-violet anchor carries the structure; amber and emerald appear only where a decision or an achievement has been earned.

### Primary

- **Royal Violet** (#4f46e5): primary actions, active navigation, links, focus rings, and text selection. Its deep step (#4338ca) handles hover and pressed states; the bright step (#6366f1) starts the primary gradient; the ink step (#3525cd) is the named primary surface token; the near-black step (#312e81) grounds dark headers and the footer gradient.
- **Violet Wash** (#eef2ff) and **Violet Mist** (#e0e7ff): quiet hover fills, secondary buttons, and pill surfaces that keep violet present without competing with the anchor.

### Secondary

- **Purposeful Amber** (#f59e0b): enrollment and checkout CTAs, star ratings, promotional ribbons, and milestone moments. Deep amber (#d97706) is the hover and active step; amber wash (#fef3c7) with amber ink (#b45309) forms the rating pill; bright amber (#fbbf24) belongs to highlights inside dark callouts.

### Tertiary

- **Verified Emerald** (#10b981): completed modules, quiz mastery, verified credentials, and active mentoring status. Emerald wash (#ecfdf5) with deep emerald text (#047857) forms the completed-state pill.

### Neutral

- **Paper** (#ffffff), **Canvas** (#f8fafc), and **Lavender Mist** (#faf8ff): the base layers, with lavender container (#f2f3ff) for ambient zones and surface-muted (#f1f5f9) for media fallbacks.
- **Ink** (#0f172a), **Ink Soft** (#334155), and **Ink Muted** (#64748b): headlines, sustained body copy, and metadata/timecodes.
- **Line** (#e2e8f0) and **Outline** (#777587): card borders, dividers, and lower-emphasis strokes.
- **Night Navy** (#1e1b4b) and **Callout Ink** (#0b0f19): the gradient pair for footer and dark callout surfaces.

### Named Rules

**The Amber Reservation Rule.** Amber is a decision and achievement signal, not decoration. Keep it under roughly 10% of any screen.

**The Hairline Rule.** Borders do the separating. Shadows add ambient depth; they never replace a boundary.

## Typography

**Hero Font:** Plus Jakarta Sans (with Inter, then system sans-serif, as fallback)
**Display Font:** Plus Jakarta Sans (with Inter, then system sans-serif, as fallback)
**Body Font:** Inter (with system sans-serif fallback)
**Label Font:** Plus Jakarta Sans; no monospace family is defined — numeric counters use tabular alignment instead.

**Character:** Plus Jakarta Sans gives the hero title and structural headings contemporary geometric presence; Inter keeps syllabi, notes, and long-form study copy legible over time. Tight negative tracking is the signature of the display voice, while reading copy stays neutral.

### Hierarchy

- **Hero display** (Plus Jakarta Sans, weight 800, fluid 2.25rem / 36px → 4rem / 64px, line-height 1.1, -0.035em tracking): the homepage hero title only; its three lines are fixed as `Practcial course for` / `the future you are` / `building`.
- **Headline** (weight 700, 2.5rem desktop and 1.75rem mobile, line-height 3rem / 2.25rem, -0.025em / -0.02em): page and section titles; the small step is 1.25rem / 1.75rem at weight 600 with -0.015em.
- **Title** (weight 600, 1rem, line-height 1.5rem, -0.01em): card titles and blocks that lead a group.
- **Body** (weight 400, 0.9375rem, line-height 1.5rem): sustained reading; the lead step is 1.125rem / 1.75rem with -0.005em and the compact step is 0.8125rem / 1.25rem.
- **Label** (weight 600, 0.75rem, line-height 1rem, +0.02em): navigation, chips, and metadata; the pill step is 0.625rem / 0.875rem at weight 700 with +0.04em.

### Named Rules

**The Tight-Headline Rule.** Display and headline tracking stays between -0.015em and -0.03em; body copy remains neutrally tracked.

**The Tabular-Number Rule.** Counts, lesson timers, and percentage trackers hold alignment while their values change.

## Layout

An eight-point base rhythm runs through a fluid grid: 12 columns at 1280px and above, 8 columns from 768–1279px, and 4 columns below 768px. `.container` centers at a 1440px maximum with 1rem inline padding on mobile, 2rem from 640px, and 4rem from 1024px. Vertical rhythm uses `.section-sm` (1.5rem), `.section` (3rem), and `.section-lg` (4.5rem).

Catalog grids auto-fill at 280px minimum cards with 1rem gaps, 320px with 1.5rem from 640px, and 350px with 2rem from 1024px. Dashboard grids step from 1 to 2 to 3 to 4 columns at 640px, 1024px, and 1280px. Sidebars cap at 280px, or 320px from 768px. Data tables keep their structure and scroll horizontally on small screens; modals stay within `min(95vw, 42rem)` and 90vh.

## Elevation & Depth

Depth comes from crisp 1px borders plus a low-saturation neutral shadow ramp. Colored glows belong to hover and accent moments, never to resting cards. The Card primitive commits to one shadow through `--card-shadow`, so a utility class cannot stack a second one.

### Shadow Vocabulary

- **Ambient resting** (`box-shadow: 0 2px 8px -2px rgb(15 23 42 / 0.07), 0 1px 3px -1px rgb(15 23 42 / 0.04)`): standard cards at rest.
- **Soft course resting** (`box-shadow: 0 1px 3px rgb(15 23 42 / 0.04), 0 6px 16px rgb(15 23 42 / 0.03)`): course cards and linked panels at rest.
- **Hover lift** (`box-shadow: 0 12px 28px -4px rgb(79 70 229 / 0.08), 0 4px 12px -2px rgb(15 23 42 / 0.04)`): paired with a 2px upward move on linked cards and course cards.
- **Nav floor** (`box-shadow: 0 8px 24px rgb(15 23 42 / 0.04)`): the frosted navigation shell.
- **Brand hover** (`box-shadow: 0 4px 14px rgb(79 70 229 / 0.3)`): primary button hover.

### Named Rules

**The Single-Shadow Rule.** One surface owns one shadow. Set it through `--card-shadow`; never add a second shadow utility on the same element.

**The Two-Pixel Lift Rule.** Cards lift 2px on hover, shift their border to #cbd5e1, and return to rest on active. The ambient shadow at rest is not a lift.

## Shapes

Inputs and standard panels use gently curved 8px corners (0.5rem); buttons and navigation pills use 12px (0.75rem); general cards use 16px (1rem); course cards and hero callouts open to 24px (1.5rem). Chips, avatars, and count badges are fully round (9999px), while category tabs keep the 12px button radius. Borders are 1px hairlines; dark callouts use a white/10 border. There are no cut corners or irregular clipping paths.

## Components

### Buttons

- **Shape:** 12px radius (0.75rem), inline-flex with an 8px icon gap; sizes are sm (0.5rem / 1rem padding), md (0.75rem / 1.5rem), and lg (0.75rem / 2rem).
- **Primary:** violet gradient from #6366f1 to #4f46e5, white label text with a subtle 1px dark text shadow; hover lifts brightness by 6% and adds the brand-hover shadow; active drops to 96% brightness with no shadow.
- **Hover / Focus:** 160ms ease-out transitions; focus-visible uses a 2px violet ring with 2px offset; disabled state is 50% opacity with no shadow.
- **Secondary / Ghost:** transparent fill, 1.5px #e2e8f0 border, #334155 text; hover fills #f8fafc and darkens text to #0f172a.
- **Accent:** amber gradient (#f59e0b to #d97706) with #0f172a text, reserved for high-intent actions; hover and active adjust brightness by ±4%.

### Chips

- **Style:** fully round pills with 0.25rem / 0.625rem padding and label-small type.
- **State:** violet wash (#eef2ff / #4f46e5) for new or category tags; amber wash (#fef3c7 / #b45309) for ratings and promotions; emerald wash (#ecfdf5 / #047857) for completed; solid violet (#4f46e5 / white) for the primary category tag on course media.

### Cards / Containers

- **Corner Style:** 16px (1rem) for the shared card surface; 24px (1.5rem) for course cards.
- **Background:** white on paper, with a 1px #e2e8f0 hairline.
- **Shadow Strategy:** exactly one shadow from the vocabulary above, supplied through `--card-shadow`.
- **Internal Padding:** `.card` defaults to 1rem; the React Card primitive defaults to 1.5rem and offers sm (1rem), md (1.5rem), lg (2rem), and none.

### Inputs / Fields

- **Style:** 44px minimum height, #f8fafc fill, 1px #e2e8f0 stroke, 8px radius; placeholders use ink-muted.
- **Focus:** violet #4f46e5 border plus a 3px `rgb(79 70 229 / 0.15)` halo; the 2px focus-visible ring applies globally.
- **Error / Disabled:** error border and ring (#ef4444) with an inline alert; disabled inputs use canvas fill, muted text, and a not-allowed cursor.

### Navigation

- **Style:** frosted white shell (88% opacity) with a 16px backdrop blur, 1px #e2e8f0 border, 16px radius, and the nav-floor shadow.
- **Typography:** label-large Plus Jakarta Sans at 600 weight; links are fully round pills with 0.5rem / 0.75rem padding.
- **States:** hover fills #eef2ff with violet text; an underline grows from 0 to full width in 200ms for text links; mobile switches to a full-height overlay menu at 1024px and below.

### Course Card

- **Signature pattern:** a 24px-radius white card with a 16:9 media area under a bottom-up ink scrim, a solid-violet category pill at top right, amber stars at bottom left, and a round avatar/level row below.
- **Body:** two-line clamped title, three-line clamped description, a lesson/duration telemetry row, price with strikethrough original price, and a split "View Details" / "Enroll Now" footer.
- **Behavior:** hover adds the 2px lift and zooms the media image to 1.03 over 300ms; active returns the card to rest.

### Hero Course Bar

- **Shell:** a centered fully round pill on the bottom edge of the hero image, capped at 19rem on mobile and 20rem from 640px; white/95 fill, white/70 hairline, `--shadow-lg`, and backdrop blur.
- **Content:** one amber star, a single-line course title, instructor and lesson telemetry on one line, strikethrough original price when discounted, and a compact ghost `View` link. No stacked badge block or second row.
- **Purpose:** follows Figure-Ground, Signal-to-Noise, and Fitts' Law — the photo stays dominant while the course CTA remains readable and easy to hit.

### Callout Banners

- **Shell:** 24px radius, 120° dark gradient from #0b0f19 to #1e1b4b, 1px white/10 border, and the soft shadow; content stays inside the 1440px container.
- **Content:** white display/headline type, slate-300 supporting copy, amber star chips and labels, and tabular-nums ratings and prices.
- **Actions:** an amber CTA plus a ghost button with white/20 border and white/5 fill; focus rings shift to amber with a slate-900 offset.

### Loading States

- Skeletons hold the shape of the content with surface-muted fills and one 1.5s shimmer; under reduced motion they rest as plain shapes and progress lines hold still.

## Do's and Don'ts

### Do:

- **Do** start primary actions with the violet gradient (`linear-gradient(135deg, #6366f1, #4f46e5)`) at a 12px radius and 0.75rem / 1.5rem padding.
- **Do** reserve amber for conversion, ratings, and milestones, keeping it under roughly 10% of a screen.
- **Do** set exactly one shadow through `--card-shadow` on `.card`, then let hover add the 2px lift and shift the border to #cbd5e1.
- **Do** keep focus visible with a 2px violet ring and 2px offset, and let `prefers-reduced-motion` stop hero and skeleton motion.
- **Do** keep dark callouts on the #0b0f19 → #1e1b4b gradient with a white/10 border and amber highlights.
- **Do** keep the hero title in Plus Jakarta Sans with the tightest tracking in the type scale.

### Don't:

- **Don't** introduce a second structural accent or recolor violet to another hue.
- **Don't** stack a shadow utility on top of `.card`, or swap ambient shadows for colored halos at rest.
- **Don't** tilt, scroll-animate, or continuously pulse cards; only pointer and state transitions belong in the vocabulary.
- **Don't** collapse data tables into stacked cards on mobile; allow horizontal scroll instead.
- **Don't** synthesize a fourth family for the hero; it shares Plus Jakarta Sans with the rest of the display scale.
