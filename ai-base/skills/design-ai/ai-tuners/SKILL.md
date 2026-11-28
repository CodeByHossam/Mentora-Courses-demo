---
name: ai-tuners
description: >-
  Design the controls that let users shape how AI interprets input and produces
  output: attachments, connectors, filters, model management, modes, parameters,
  preset styles, saved styles, and voice/tone. Use when adding AI configuration
  UI or giving users agency over AI output. Trigger phrases: "let users control
  the AI", "model switching", "prompt settings", "AI filters", "mode switching",
  "negative prompting", "set tone or style", "AI parameters", "brand voice".
---

# AI Tuners

Tuners sit between user intent and model generation. They let non-experts shape
**how** the AI behaves without prompt engineering. Full reference:
`references/tuner-patterns.md`.

## When to use

- Adding AI configuration UI or prompt controls.
- Letting users switch models, modes, or styles.
- Giving users agency over tone, filters, or scope.
- Trigger phrases: "let users control the AI", "model switching", "prompt
  settings", "AI filters", "mode switching", "negative prompting", "brand voice".

## Instructions

1. Identify which tuner(s) the use case needs (index below).
2. Design for progressive disclosure — the 80% first, power controls behind a drawer.
3. Always make active state visible and reversible.

### Pattern index

| Pattern | Job | When |
|---|---|---|
| Attachments | Ground AI in specific content | Reference a file/image/URL/selection |
| Connectors | Link AI to live systems | Read/act on the user's own data |
| Filters | Restrict or exclude sources/tokens | Scope what AI considers |
| Model Management | Switch models | Multiple models; need control |
| Modes | Bundle behavior into presets | Distinct use cases need different behavior |
| Parameters | Fine-grained controls | Power users need sliders/flags |
| Preset Styles | Curated style starting points | Explore styles without jargon |
| Saved Styles | Reusable style profiles | Consistent output across sessions |
| Voice & Tone | Control how AI sounds/writes | Match brand/audience/voice |

### Key rules per tuner

```text
Attachments: allow at any point; multiple input methods; distinguish style-guide
vs primary-subject; cite back to the attachment; encrypt.
Connectors: scope narrowly; per-connector identity; surface freshness; degrade
gracefully; per-session kill switch. GUARD against prompt injection — treat
connected content as untrusted; gate actions behind human confirmation.
Filters: make active filters visible; support natural language; design recovery
when a filter yields nothing.
Model Management: always show the active model; describe in human terms
(accuracy/recency/cost/speed); allow mid-conversation switching.
Modes: modes are contracts — behavior must match the promise; visible entry/exit;
define what carries across switches.
Parameters: sensible transparent defaults; bundle into presets; treat autonomy
(suggest/ask/execute) as an explicit parameter; warn on risky values.
Preset/Saved Styles: previews, audition, strength/blend; scoping (personal/team/
system); version + compatibility with models.
Voice & Tone: distinct from AI personality — shapes how AI reflects the user;
scope explicitly; lightweight selector + full voice kit; reset to default.
```

### Cross-cutting principles

```text
1. Make the active state visible — model, mode, filter, style, voice.
2. Progressive disclosure — most users won't touch advanced controls.
3. Support natural language ("only academic sources").
4. Bundle complexity into presets/modes.
5. Design for recovery — empty states, failed connectors, over-filtering.
6. Show cost implications upfront.
7. Never hide what the AI is doing — reviewable and reversible.
8. Treat autonomy as explicit — suggests, asks, or acts.
```

## Examples

### Good — visible, scoped, recoverable

```text
Input shows "Using: Team Brand Voice · Research mode · 2 filters". Switching
models preserves context. A failed connector shows "Reconnect", not silence.
```

### Bad — hidden, irreversible, insecure

```text
Silent model routing; filters with no visible state; a connector allowed to act
on retrieved instructions with no confirmation (prompt-injection risk).
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Hidden model/mode state | Broken trust, no control | Always show active state |
| Exposing all knobs | Overwhelms most users | Progressive disclosure |
| Trusting connected content | Prompt injection | Confirm before acting |
| Silent filter empties | User stuck | Offer to relax constraints |
| No cost visibility | Surprise charges | Show before commit |
| Binary on/off styles | Too rigid | Intensity/blend controls |
| Wrong/inconsistent scope | Tone leaks across contexts | Show active scope explicitly |

## Related skills

- `design-ai/ai-inputs`, `design-ai/ai-governors`,
  `design-ai/ai-wayfinders`, `design/design-tokens`.
