# Attribution — motion-gsap

Vendored from the official **GSAP agent skills** published by GreenSock.

- Source: <https://github.com/greensock/gsap-skills> (`skills/gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-react`, `gsap-frameworks`, `gsap-performance`, `gsap-utils`)
- License: MIT (Copyright © 2026 GreenSock). Full text: `LICENSE` in this folder.
- GSAP itself is licensed separately by its own terms; since the Webflow acquisition the library and every plugin are free, and install from the public npm package.

## What was changed

- The eight upstream `SKILL.md` files were folded into `references/` as `core.md`, `timeline.md`, `scrolltrigger.md`, `plugins.md`, `react.md`, `frameworks.md`, `performance.md`, and `utils.md`.
- **Router route entries added in P1 to satisfy [7/8].**
- YAML frontmatter was removed from each reference; a provenance comment was added at the top. The guidance text itself is verbatim.
- `SKILL.md` is authored for this toolkit: it is a routing hub plus the cross-cutting motion doctrine (reduced motion, transform-only, cleanup, budget, accessibility). It is not upstream text.
- No GSAP source code is vendored.

## Upstream intent preserved

The routing table, the "load one reference" rule, and the per-module guidance
(API usage, pitfalls, cleanup) are unchanged. If the upstream skills change,
re-vendor `references/` and re-check the routing table against the upstream
`skills/llms.txt` index.
