---
name: ai-wayfinders
description: >-
  Design AI onboarding, discoverability, and first-interaction flows to solve the
  blank-slate problem: initial CTA, example galleries, suggestions, templates,
  nudges, follow-ups, prompt details, and randomize. Use when helping users
  discover what AI can do and get started confidently. Trigger phrases: "users
  don't know what to type", "add example prompts", "AI onboarding", "blank slate",
  "show what the AI can do", "improve the AI CTA", "starter prompts".
---

# AI Wayfinders

Wayfinders solve the blank-slate problem — the moment a user faces an empty input
and doesn't know what to type. Full reference: `references/wayfinder-patterns.md`.

## When to use

- Adding AI to a surface and reducing first-use friction.
- Users don't know what to type or what's possible.
- Onboarding, galleries, suggestions, templates, or nudges.
- Trigger phrases: "users don't know what to type", "add example prompts", "AI
  onboarding", "show what the AI can do", "improve the AI CTA", "starter prompts".

## Instructions

1. Determine the situation and pick the matching wayfinder(s) (table below).
2. Always wait for context; prefer contextual over static.
3. Show fewer, more targeted options — reduce cognitive load.

### The 8 patterns

```text
Initial CTA     prominent input + surrounding scaffolding (action-first / contextual / playful)
Example Gallery curated/community/dynamic samples; every tile is an entry point
Suggestions     3-6 pre-written prompts; static -> contextual -> adaptive
Templates       pre-built prompt structures with fillable fields; chain across steps
Nudges          contextual hints at the moment of relevance; not upsell noise
Follow-ups      prompts/actions to refine or extend; anchored in the last output
Prompt Details  make the prompt+params visible so others can remix/learn
Randomize       one-click random prompt/seed/style; delight as scaffolding
```

### Pattern selection

| Situation | Patterns |
|---|---|
| Empty state, nothing yet | Initial CTA + Suggestions + Gallery |
| User has content but hasn't used AI | Nudges (contextual) + Follow-ups |
| Complex structured task | Templates |
| User doesn't know what's possible | Gallery + Prompt Details + Nudges |
| After first output | Follow-ups + Suggestions |
| Onboarding a new user | Suggestions + Templates |
| Creative/exploratory tool | Randomize + Gallery + Prompt Details |
| Returning power user | Adaptive Suggestions + Follow-ups |

### Universal principles

```text
1. Wait for context — don't surface AI on an empty state.
2. Prefer contextual over static.
3. Reduce, don't overwhelm — fewer targeted options.
4. Teach through doing — model what a good prompt looks like.
5. Expose the reasoning — prompt details and follow-up context build trust.
6. Spend compute wisely — structure input so the system refines, not searches.
```

## Examples

### Good — contextual, actionable

```text
Long document open -> inline nudge "Summarize" + 3 follow-ups anchored in the
summary + "See prompt" so users learn. No AI shown before content exists.
```

### Bad — empty box, static starters everywhere

```text
Bare "Ask me anything" on an empty state; a permanent menu listing every AI
capability; generic starters unrelated to what's on screen.
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| AI on an empty state | No context, useless | Wait for content |
| Static generic starters | Low relevance | Make them contextual |
| Listing all capabilities | Cognitive overload | Prioritize by relevance |
| Nudges as upsells | Feels pushy | Be honest about gating |
| Suggestions that open a dialog | Adds friction | Prefill/run directly |
| Gallery tiles that only showcase | Can't be used | Make every tile actionable |
| Hidden prompts | Blocks learning | Expose prompt details |

## Related skills

- `design-ai/ai-inputs`, `design-ai/ai-tuners`,
  `design/ux-research`, `design/ui-ux-principles`.
