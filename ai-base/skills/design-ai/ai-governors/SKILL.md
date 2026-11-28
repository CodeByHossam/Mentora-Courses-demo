---
name: ai-governors
description: >-
  Design human-in-the-loop AI features that keep users informed, in control, and
  safe as the AI acts autonomously. Covers the Governors patterns: action plans,
  verification, draft mode, cost estimates, citations, references, memory,
  controls, stream of thought, variations, branches, shared vision, and sample
  responses. Use when designing AI oversight, trust, transparency, or risk
  controls. Trigger phrases: "keep users in the loop", "human-in-the-loop",
  "AI confirmation", "show AI reasoning", "AI overwrote my data", "cost estimate
  for AI", "let users pause AI", "AI memory", "AI citations".
---

# AI Governors — Human-in-the-Loop Patterns

Autonomy without transparency erodes trust, and unoversightable actions cause
irreversible harm. Governors keep users meaningfully in control.

Full pattern reference: `references/patterns.md`.

## When to use

- Designing or auditing AI features involving oversight, trust, or control.
- Deciding when to require confirmation, show reasoning, or expose cost.
- Handling AI memory, destructive actions, or long autonomous runs.
- Trigger phrases: "human-in-the-loop", "AI confirmation", "show AI reasoning",
  "AI overwrote my data", "cost estimate for AI", "let users pause AI",
  "AI memory", "AI citations".

## Instructions

1. Assess the situation: what is the AI doing, how autonomous, and what is the blast radius?
2. Match patterns to risk (table below); lead with the 1–3 most relevant.
3. Calibrate friction — oversight costs speed; add it where consequences are real.
4. Make the AI's intent and actions visible before, during, and after.

### Pattern selection

| Situation | Pattern(s) |
|---|---|
| Long/expensive action | Action Plan + Verification + Cost Estimates |
| Background autonomy | Shared Vision + Stream of Thought + Controls |
| Destructive action | Verification + Sample Response |
| Unsure outcome | Variations + Branches + Draft Mode |
| Cites/summarizes sources | Citations + References |
| Remembers across sessions | Memory |
| Multi-step workflow | Action Plan + Stream of Thought + Controls |
| Agent/operator mode | Shared Vision + Verification + Stream of Thought |

### Calibrating friction

```text
Ask: (1) worst case if it goes wrong? (2) how often will it happen?
high-stakes + infrequent -> strong verification + visible stream of thought
low-stakes + frequent    -> passive indicators or none
high-stakes + frequent   -> provide opt-out after first confirmed run
low-stakes + infrequent  -> light check or after-the-fact notice
```

### Key pattern rules

```text
Action Plan:    show intent before committing; make it editable; keep plan/execution faithful
Verification:   gate irreversible, high-cost, or high-blast-radius actions
Controls:       Stop always reachable; Pause+resume for long runs; Queue; keep history on regenerate
Stream of Thought: separate plan (will happen) / execution (happened) / evidence (supports result)
Cost Estimates: explicit unit, ranges for unknowns, surface cost drivers, offer cheaper paths
Draft Mode:     clearly signal reduced quality; one-click upgrade; preserve params
Sample Response: full-quality preview on a small subset before bulk/irreversible runs
Memory:         never a black box; show when saved, editable/deletable, scoped, incognito option
Citations/References: point to exact sources; hover preview; handle broken sources explicitly
Variations/Branches: never overwrite originals without confirmation; keep a trail to the source
```

## Examples

### Good — friction matched to risk

```text
Bulk delete: Verification (explicit approve) + Action Plan (skimmable list) + Undo.
Routine search: no gate; passive status indicator only.
```

### Bad — governor everywhere

```text
Confirming every low-stakes read; users click through reflexively; the gate becomes meaningless.
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Oversight on trivial, frequent actions | Prompt fatigue | Calibrate to stakes |
| Silent plan/execution divergence | Trust collapse | Keep plan and execution faithful |
| Hidden cost or quality reduction | Surprise, anger | Surface cost + draft state |
| Black-box memory | Feared, misremembered | Show, edit, scope, incognito |
| No stop/pause on long runs | Helpless users | Persistent controls |
| Overwriting without confirmation | Data loss | Verify + version history |
| Broken citations replaced with filler | Misinformation | Mark explicitly |

## Related skills

- `design-ai/ai-trust-builders`, `design-ai/ai-tuners`,
  `design-ai/ai-inputs`, `design/ui-ux-principles`.
