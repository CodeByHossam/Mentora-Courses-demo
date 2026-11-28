---
name: ai-inputs
description: >-
  Design AI input patterns: how users direct, refine, and control AI in a
  product. Covers open input, madlibs, auto-fill, inline actions, inpainting,
  regenerate, expand, restructure, restyle, chained actions, describe, summary,
  and synthesis. Use when adding or auditing any AI interaction surface. Trigger
  phrases: "how should users prompt", "add AI input", "regenerate button",
  "inline AI actions", "AI autofill", "prompt experience", "AI summary vs
  synthesis", "restyle vs restructure".
---

# AI Inputs

The full taxonomy of how users direct and refine AI. Identify the use case, then
apply the matching pattern and universal principles.

Full reference: `references/input-patterns.md`.

## When to use

- Designing any surface where users interact with or direct AI.
- Choosing between input patterns for a feature.
- Auditing an existing AI input UX.
- Trigger phrases: "how should users prompt", "add AI input", "regenerate
  button", "inline AI actions", "AI autofill", "AI summary vs synthesis".

## Instructions

1. Determine the starting point: from scratch vs working on existing content.
2. Pick the pattern by scope and goal (table below).
3. Apply the universal principles — they matter more than the specific pattern.

### Pattern selection

| Pattern | Purpose | When |
|---|---|---|
| Open Input | Free-form prompt | Discovery, chat, exploration |
| Madlibs | Template with variables | Repeatable structured tasks |
| Auto-fill | AI populates fields | Repetitive data, forms, sheets |
| Inline Action | Preset actions on selection | Spot edits without leaving flow |
| Inpainting | Edit a specific region in place | Surgical changes |
| Regenerate | Re-run for a new result | Close but not right |
| Expand | Extend from a seed | Draft→full, clip→video |
| Restructure | Change structure, keep substance | Condense, reorder, extract |
| Restyle | Change style, keep structure | Tone, palette, voice |
| Chained Action | Multi-step connected prompts | Workflows, pipelines |
| Describe | Reverse-engineer a generation | Debug, reproduce |
| Summary | Faithful compression | Recaps, digests |
| Synthesis | Interpret + connect sources | Research, analysis |

### Decision flow

```text
From scratch?            -> Open Input / Madlibs / Chained Action
Existing content?
  whole doc/record       -> Regenerate / Restructure / Restyle / Summary / Synthesis
  specific region        -> Inpainting / Inline Action
  multiple fields/records-> Auto-fill
  building from a seed   -> Expand
Repeats?                 -> Madlibs / Auto-fill;  one-off -> Open Input / Inline Action
Change structure or style? -> Restructure / Restyle (or both, structure first)
Analyzing sources?       -> compressing=Summary; interpreting=Synthesis
```

### Universal principles

```text
1. Always preview before committing — show a ghost/diff, require explicit accept.
2. Mark AI-generated content distinctly until the user confirms it.
3. Make scope explicit — a word, field, record, or document — before running.
4. Show cost before bulk or chained actions.
5. Undo is non-negotiable for any content-modifying action.
```

## Examples

### Good — scoped, previewed, reversible

```text
User selects a paragraph -> Inline Action shows 3-5 defaults -> restyle preview
is shown inline as a diff -> user accepts or rejects. (No silent overwrite.)
```

### Bad — silent, unscoped overwrite

```text
"Improve" button rewrites the whole document with no preview, no scope, no undo.
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Silent overwrite | Data loss, distrust | Preview + explicit accept |
| Unscoped action | Regenerates the wrong thing | State and default scope |
| Blank-canvas prompt as the only path | Users stuck | Templates/examples/suggestions |
| No undo | Fear of experimenting | Make every action reversible |
| Unmarked AI content | Confusion, trust issues | Distinct visual marker |
| Hidden cost on bulk runs | Surprise charges | Estimate before running |
| Summary that adds interpretation | Misleads | Keep summary faithful; use Synthesis |

## Related skills

- `design-ai/ai-wayfinders`, `design-ai/ai-tuners`,
  `design-ai/ai-governors`, `design-ai/ai-trust-builders`.
