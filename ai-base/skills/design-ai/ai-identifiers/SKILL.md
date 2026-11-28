---
name: ai-identifiers
description: >-
  Design the brand-level identity of an AI across a product: its name, avatar,
  color, iconography, and personality. Use when defining how an AI presents
  itself so it feels coherent, recognizable, and honest. Trigger phrases: "what
  should we call our AI", "AI avatar", "what color for AI features", "AI icon",
  "AI personality", "make our AI feel distinct", "AI branding".
---

# AI Identifiers

The five identifiers — **Name, Avatar, Color, Iconography, Personality** —
determine whether the AI feels generic or genuinely owned. They work best as a
coherent system.

Full reference: `references/identifiers.md`.

## When to use

- Naming, branding, or giving the AI a visual/verbal identity.
- Choosing icons, colors, or an avatar for AI features.
- Shaping the AI's personality and tone.
- Trigger phrases: "what should we call our AI", "AI avatar", "what color for
  AI features", "AI icon", "AI personality", "AI branding".

## Instructions

1. Decide the framing first (tool, partner, or persona) — it shapes everything.
2. Choose each identifier deliberately and make them reinforce each other.
3. Always disclose the AI's non-human nature, even with creative names.
4. Align realism and warmth with what the AI can actually deliver.

### Name

```text
persona    human-like name (implies character; risks overpromising)
company    brand name (familiar; can feel generic)
entity     functional title: "Copilot", "Assistant" (honest; less memorable)
technology bare "AI" (minimal expectations; blends in)
Rule: pair any creative name with a badge/onboarding cue that discloses AI.
```

### Avatar

```text
minimal marks | branded characters | photorealistic/animated | voice avatars
Show state (listening/generating/idle) unambiguously; avoid deceptive realism.
```

### Color

```text
Purple is the de-facto AI color; green complementary; gradients signal AI content.
Best practice: use color as an affordance marking AI content — never color alone
(for accessibility, pair with icon + label). Avoid conflicts with brand palette.
```

### Iconography

```text
sparkles = generate/ambient AI · wand = generative action · pencil+sparkle = edit
paragraph+sparkle = summarize/enhance · dice = randomize · hat/glasses = incognito
Pair icons with text/tooltips; avoid overloading one symbol; prefer familiar
metaphors for common actions.
```

### Personality

```text
Not neutral — model + scaffolding shape tone, hedging, agreeableness.
Balance consistency with adaptability. Separate empathy from authority (warmth
must not imply accuracy). Guard against sycophancy. Design attachment off-ramps.
Make model/mode switches transparent. Test personality in the eval pipeline.
```

## Examples

### Good — coherent system

```text
Name: "Copilot" (entity) · Avatar: minimal mark with clear generating state ·
Color: brand accent, used only to flag AI content · Icons: sparkle for generate,
pencil+sparkle for edit · Personality: direct, honest, pushes back on false premises.
```

### Bad — dissonant identities

```text
Warm, playful persona + cold abstract avatar + purely technical name + sparkles
everywhere. Users feel the inconsistency without being able to name it.
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| No disclosure of AI nature | Users feel deceived | Badge/onboarding cues |
| Deceptive realism | Implies false competence | Match realism to ability |
| Color-only signals | Inaccessible | Icon + label too |
| Overloading sparkles | Loses meaning | Distinct icons per action |
| Overpromising persona | Breaks when it fails | Honest framing |
| Sycophantic personality | Dependency, harm | Reward disagreement + correction |
| Personality as an afterthought | Incoherent feel | Design all five together |

## Related skills

- `design-ai/ai-trust-builders`, `design/visual-craft`,
  `design/ui-ux-principles`, `design-ai/ai-inputs`.
