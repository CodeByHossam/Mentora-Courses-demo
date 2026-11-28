---
name: motion-gsap
description: >-
  Apply GSAP (GreenSock Animation Platform) for production motion in web UI:
  tweens and easing, timelines, ScrollTrigger, plugins, React useGSAP, Vue and
  Svelte lifecycle cleanup, and animation performance. Use when adding,
  reviewing or fixing motion on a website or web app, when the user asks for a
  JavaScript animation library, scroll-driven, timeline or hero-entrance
  animation, or when motion must honour prefers-reduced-motion. GSAP is
  web-only. Trigger phrases: "animate this", "add motion", "GSAP",
  "ScrollTrigger", "timeline animation", "scroll animation", "hero entrance",
  "stagger", "easing", "useGSAP", "60fps", "reduce motion".
license: MIT
---

# Motion with GSAP (web)

One hub for animation on the web. The eight official GSAP skills are vendored
under `references/`; this file decides which one you need and the rules that
apply to all of them.

## When to use

- Adding a purposeful animation to a page, section, component, or transition.
- Building a hero entrance, a reveal sequence, or a scroll-driven story.
- Reviewing existing motion for correctness, cleanup, jank, or accessibility.
- The user asks for a JavaScript animation library on the web.
- Motion must honour `prefers-reduced-motion` and still land on the final state.

## When not to use

- **React Native.** GSAP does not run in React Native; use that environment's
  native motion skill instead.
- **CSS-only micro-interactions.** A hover lift, an underline draw, or a colour
  transition belongs in CSS. Reach for GSAP when you need sequencing,
  orchestration, scroll linkage, or runtime control.
- **No approved motion need.** If the approved design has no motion and the
  user did not ask for any, do not add it. "It would look cool" is not a job.
- **Decorative motion on content the user is reading.** No parallax on body
  text, no scroll-jacking, no fade-in-on-scroll for whole sections.

## How to load this skill

Read this file, then **one** reference (two only when the task genuinely spans
both, e.g. React plus scroll).

| You are doing | Read |
|---|---|
| Tweens, easing, stagger, transitions, `gsap.matchMedia()`, reduced motion | `references/core.md` |
| Sequencing, position parameter, labels, nesting, playback control | `references/timeline.md` |
| Scroll-linked animation, pinning, scrub, refresh, trigger cleanup | `references/scrolltrigger.md` |
| Flip, Draggable, Inertia, Observer, SplitText, DrawSVG, MorphSVG, CustomEase | `references/plugins.md` |
| React or Next.js (useGSAP, refs, cleanup, SSR) | `references/react.md` |
| Vue, Nuxt, Svelte, SvelteKit, or other frameworks | `references/frameworks.md` |
| Jank, frame rate, batching, `will-change`, large lists | `references/performance.md` |
| `gsap.utils` helpers (clamp, mapRange, snap, random, toArray, wrap) | `references/utils.md` |

## Motion doctrine (always applies)

1. **Purpose before motion.** Every animation does exactly one job: feedback,
   orientation, continuity, or emphasis. If you cannot name the job in one
   sentence, do not animate it.
2. **Restraint comes from `design/visual-craft`; this skill implements it.**
   One signature motion per view, quiet micro-interactions elsewhere. No
   gratuitous gradients-in-motion, no bounce for its own sake.
3. **Reduced motion is mandatory.** Wrap the animation in `gsap.matchMedia()`
   with a `(prefers-reduced-motion: reduce)` branch that sets the final state
   with no travel or scale — opacity-only or instant. The reduced branch is a
   real code path, not a comment.
4. **Transform and opacity only.** Never animate `width`, `height`, `top`,
   `left`, `margin`, or `box-shadow`; they force layout. Use `x`, `y`, `scale`,
   `rotation`, and `autoAlpha`.
5. **Content first.** Motion never delays first meaningful paint, never blocks
   input, and never hides content behind a reveal the user cannot trigger.
   A hero entrance ends in its final state within about one second.
6. **No hostile motion.** No scroll-jacking, no parallax on body text, no
   fade-in-on-scroll for every section, no infinite loop without a pause
   control, nothing flashing faster than three times per second.
7. **Cleanup is part of the code.** React: `useGSAP()` or `gsap.context()` and
   revert on unmount. Vanilla/Vue/Svelte: `gsap.context()` or track and kill
   every timeline and ScrollTrigger. Guard hot-reload double mounts.
8. **Performance budget.** 60fps on a mid-range laptop and a mid-range phone.
   `will-change` only while animating, batch DOM reads and writes, lazy-init
   below the fold, and at most one scroll-driven effect per page unless the
   approved design says otherwise.
9. **Accessibility.** Never encode information in motion alone, never move
   focus during an animation, and never move a target while the user aims at it.
10. **Licensing.** GSAP and every plugin are free (Webflow acquisition). Install
    from the public npm package; no auth token and no private registry.

## Baseline patterns

React — scoped, cleaned up, reduced-motion aware:

```jsx
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Hero({ children }) {
  const scope = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".hero-line", {
        y: 24,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".hero-line", { clearProps: "all" });
    });
  }, { scope });

  return <section ref={scope}>{children}</section>;
}
```

Vanilla — a timeline you own and can kill:

```js
const ctx = gsap.context(() => {
  gsap
    .timeline({ defaults: { ease: "power2.out", duration: 0.5 } })
    .from(".card", { y: 16, autoAlpha: 0, stagger: 0.06 })
    .from(".card-cta", { autoAlpha: 0 }, "-=0.2");
}, root);

// later
ctx.revert();
```

## Integration with the other UI skills

- **Direction lane** (`design/taste`, `design/ui-ux-principles`) decides whether
  the page has a motion idea at all, and what it should communicate.
- **Impeccable's `animate` reference** supplies the design intent for a motion
  pass. This skill supplies the correct implementation.
- **Precedence.** An approved direction beats defaults; accessibility and
  reduced-motion beat the direction; `design/visual-craft`'s restraint beats
  "more motion". When they conflict, the stricter rule wins.
- **Never load this skill just because a page exists.** Motion is a deliberate,
  approved pass — normally after layout and content are stable.

## Checklist before calling it done

- [ ] The job of every animation is named in one sentence.
- [ ] A real `prefers-reduced-motion: reduce` branch lands on the final state.
- [ ] Only transform and opacity are animated.
- [ ] Every timeline, ScrollTrigger, and context is cleaned up on unmount.
- [ ] No scroll-jacking, no un-pausable loop, no text parallax.
- [ ] Motion does not delay content or block input.
- [ ] 60fps verified with real evidence (performance panel or equivalent).
- [ ] One or two references loaded — not all eight.

## References

- `references/core.md` — core API, easings, stagger, responsive `matchMedia`.
- `references/timeline.md` — sequencing, labels, nesting, playback.
- `references/scrolltrigger.md` — scroll-linked animation, pinning, refresh.
- `references/plugins.md` — Flip, Draggable, SplitText, SVG, CustomEase.
- `references/react.md` — `useGSAP`, refs, cleanup, SSR.
- `references/frameworks.md` — Vue, Svelte, and other lifecycles.
- `references/performance.md` — batching, `will-change`, jank.
- `references/utils.md` — `gsap.utils` helpers.

License and provenance: `ATTRIBUTION.md` and `LICENSE`.
