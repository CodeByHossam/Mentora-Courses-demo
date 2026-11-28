---
name: ai-trust-builders
description: >-
  Design patterns that make an AI product feel ethical, accurate, and
  trustworthy: caveats, consent, data ownership, disclosure, footprints,
  incognito mode, and watermarking. Use when adding transparency, privacy, or
  accountability to AI. Trigger phrases: "add a disclaimer", "handle user data",
  "label AI content", "AI consent", "audit trail for AI", "watermark AI",
  "privacy mode", "disclose AI", "make users feel safe".
---

# AI Trust Builders

Users who don't trust the system won't engage; users who over-trust it can be
harmed. These seven patterns close that gap. Full reference:
`references/trust-patterns.md`.

## When to use

- Making an AI product safer, more transparent, or more accountable.
- Adding disclaimers, consent, privacy controls, or content labeling.
- Auditing an existing AI product for trust signals.
- Trigger phrases: "add a disclaimer", "handle user data", "label AI content",
  "AI consent", "audit trail for AI", "watermark AI", "privacy mode", "disclose AI".

## Instructions

1. Match pattern intensity to stakes (consumer chat vs. enterprise vs. health).
2. Lead with the 1–3 most relevant patterns; explain trade-offs.
3. Combine patterns — they reinforce each other.

### The seven patterns

```text
Caveat          visible reminder the AI may be wrong; place at the decision point
Consent         explicit opt-in before recording/processing; separate training consent
Data Ownership  user controls for retention vs. training; default privacy-protective
Disclosure      label AI actors and AI-generated/edited content; use verbs ("Summarized with AI")
Footprints      visible + machine-readable traces (interface/system/media) for audit/replay
Incognito Mode  session that leaves no trace; exclude from memory/training; clearly marked
Watermark       signal synthetic origin (visible + invisible); provenance metadata
```

### Pattern selection

| Challenge | Patterns |
|---|---|
| Users don't know AI is present | Disclosure + Caveat |
| Outputs may be wrong | Caveat + Footprints + Citations |
| Recording involves others | Consent + Disclosure |
| Data used for training worry | Data Ownership + Consent |
| Need to audit decisions | Footprints (system level) |
| Explore without consequences | Incognito Mode |
| Content shared outside product | Watermark + Footprints (media) |
| Enterprise compliance | Data Ownership + Footprints + Incognito |

### Key rules

```text
Caveats: specific and contextual, at the moment of decision — but don't rely on
them alone; run evals to catch hallucinations proactively.
Consent: default opt-in; persistent and visible; separate recording/training/sharing;
notify all participants; make withdrawal immediate.
Data Ownership: default most protective; separate training from retention; state
the default plainly; explain what sharing gives and costs.
Disclosure: name the actor consistently; use verbs; distinct styling for AI content;
never fake human interaction; require disclosure for realistic synthetic media.
Footprints: build at interface + system + media levels; make them queryable;
watch for inadvertent stylistic tells.
Incognito: unmistakable mode indicator; truly sealed from memory/training;
reduced integration scope; easy toggle.
Watermark: combine visible + invisible (defense in depth); surface provenance
(model, time, edits); plan for regulation.
```

## Examples

### Good — layered trust

```text
Consumer chat: Caveat under input + Disclosure label + Data Ownership toggle
(off by default) + Incognito mode + visible clear of AI (Footprints).
```

### Bad — false or buried trust

```text
"Incognito" that still logs server-side; consent buried in ToS; vague "Assistant"
label with no non-human indicator.
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Caveat as the only safeguard | Ignored by habituation | Pair with verification + evals |
| Consent buried / opt-out default | Illegal, erodes trust | Explicit opt-in, visible |
| Default data sharing | Legal/reputational risk | Privacy-protective default |
| Vague AI labeling | Users feel deceived | Name + indicator + verbs |
| Interface-only footprints | Accountability gaps | System + media logs too |
| Fake incognito | Trust destroyed if found | Truly not stored |
| Single watermark type | Easily removed | Defense in depth |

## Related skills

- `design-ai/ai-governors`, `design-ai/ai-identifiers`,
  `architecture/security-review`, `workflow/env-and-secrets`.
