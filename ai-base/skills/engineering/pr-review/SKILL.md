---
name: pr-review
description: >-
  Review and author pull requests effectively: PR description, small diffs,
  review checklist, constructive feedback, distinguishing blocking vs nits, and
  review SLAs. Use when reviewing a PR or preparing one for review. Trigger
  phrases: "review this PR", "code review", "PR feedback", "nit", "blocking
  comment", "PR description", "self-review", "how to review".
---

# Pull Request Review

Review is a collaboration to improve the change and the author, not a gatekeeping
ritual. Optimize for correctness, readability, and small, safe increments.

## When to use

- Reviewing a PR (yours or a teammate's).
- Writing a PR description or preparing a change for review.
- Giving or receiving review feedback.
- Trigger phrases: "review this PR", "code review", "PR feedback", "nit",
  "blocking comment", "PR description", "self-review".

## Instructions

1. Keep PRs small and single-purpose; large PRs get shallow reviews.
2. Author writes a description: **what**, **why**, **how tested**, **risks**, and links.
3. Reviewer reads the description, then the diff top-down, then checks tests.
4. Classify comments: `blocking`, `suggestion`, `nit`, `question`, `praise`.
5. Explain **why** for each comment; suggest, don't command.
6. Verify: logic, edge cases, error handling, security, tests, naming, perf.
7. Approve when safe; don't block on taste. Set a review SLA (e.g., same day).
8. Self-review your own diff before requesting review.

### PR description template

```markdown
## What
Adds refresh-token rotation to /auth/refresh.

## Why
Limits token-reuse blast radius (issue #482).

## How tested
Unit + integration tests for rotation and reuse revoke. Manual: curl flow.

## Risk / rollback
Touches auth cookie handling. Rollback: revert #482 (no migration).
```

### Comment conventions

```text
blocking:   must change before merge (correctness, security, breakage)
suggestion: would improve, author decides
nit:        trivial/preference (say it's a nit)
question:   need clarification
praise:     call out good work
```

### Reviewer checklist

```text
[ ] Does it do what the description says?
[ ] Correct? edge cases, errors, nulls, concurrency
[ ] Secure? authz, input handling, secrets
[ ] Tested? meaningful tests for the change
[ ] Readable? names, structure, no dead code
[ ] Scope? no unrelated changes snuck in
[ ] Backward compatible / migration noted?
```

## Examples

### Good — specific, justified, classified

```text
blocking: The refresh token is stored in localStorage (line 42).
  XSS can exfiltrate it. Move to an httpOnly, secure, sameSite cookie.
suggestion: Extract `buildCookieOptions` — it's duplicated in two handlers.
nit: `tkn` -> `token` for readability.
```

### Bad — vague or hostile

```text
"This is wrong."            // no why, no fix
"Why would you do it this way?"  // personal, not actionable
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Huge PRs | Shallow review, rubber-stamp | Small, focused PRs |
| Approval without reading | Bugs/security slip | Actually review; check tests |
| Style nitpicks blocking merge | Friction | Automate formatting; mark nits |
| Vague/hostile comments | Demotivates, unclear | Specific + why + suggestion |
| Reviewer bikesheds, misses bugs | Wrong focus | Prioritize correctness/security |
| No description/context | Slow review | What/why/tested template |
| Reviewing for days | Blocks teammates | Review SLA |

## Related skills

- `engineering/code-quality`, `workflow/git-workflow`,
  `workflow/commit-conventions`, `architecture/security-review`.
