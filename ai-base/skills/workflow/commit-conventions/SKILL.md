---
name: commit-conventions
description: >-
  Write Conventional Commit messages and generate changelogs/release notes from
  commits or PR titles. Use when committing, reviewing commit messages, or
  assembling release notes. Trigger phrases: "commit message", "conventional
  commits", "commit hygiene", "changelog", "release notes", "breaking change",
  "semantic versioning", "what changed".
---

# Commit Conventions

Commits are documentation. Use Conventional Commits so history is scannable, tools
can automate versioning, and release notes can be generated automatically.

## When to use

- Writing or reviewing a commit message.
- Deciding the type/scope of a change.
- Generating a changelog or release notes from a commit range or PR list.
- Trigger phrases: "commit message", "conventional commits", "changelog",
  "release notes", "breaking change", "semantic versioning".

## Instructions

1. Format: `type(scope): subject` — imperative, lowercase, no trailing period.
2. Subject ≤ ~72 chars; explain **why** in the body when non-obvious.
3. Use `!` or a `BREAKING CHANGE:` footer for breaking changes.
4. Reference issues in the footer (`Refs: #123`, `Closes: #123`).
5. One logical change per commit.
6. Generate changelogs by grouping types; bump versions by type.

### Types

| Type | Meaning | SemVer impact |
|---|---|---|
| feat | New feature | MINOR |
| fix | Bug fix | PATCH |
| docs | Documentation | none |
| style | Formatting (no logic) | none |
| refactor | Neither fix nor feature | none |
| perf | Performance | PATCH |
| test | Tests | none |
| build / ci | Build or CI | none |
| chore | Maintenance | none |
| revert | Revert a commit | PATCH |

### Examples

```text
feat(auth): add refresh-token rotation

Rotate refresh tokens on every use and revoke all sessions on reuse
to limit the blast radius of a stolen token.

Closes: #482
```

```text
fix(api): return 404 for missing user instead of 500
```

```text
feat(api)!: rename /users to /accounts

BREAKING CHANGE: clients must call /accounts. See migration guide.
```

### Changelog generation

```markdown
## [1.4.0] - 2026-05-01
### Added
- auth: refresh-token rotation (#482)
### Fixed
- api: return 404 for missing user (#490)
### Changed / Breaking
- api: rename /users to /accounts (#501)
```

Group by `feat`, `fix`, then everything else; surface breaking changes at the top
with upgrade notes.

## Examples

### Good — scoped, imperative, explains why

```text
perf(db): add compound index on (authorId, createdAt)

The author feed query was scanning the collection; the index cuts p99
from 1.2s to 40ms.
```

### Bad — vague, mixed concerns

```text
fixed stuff, added feature, updated files
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| "fix stuff" / "wip" | Useless history | Type + scope + why |
| One giant commit | Hard to review/bisect/revert | One logical change each |
| Past tense / capitalized subject | Inconsistent | Imperative, lowercase |
| Hiding breaking changes | Breaks consumers silently | `!` / `BREAKING CHANGE:` |
| Committing secrets | Security leak | Review diff; `.gitignore`; rotate |
| Changelog = git log dump | Unreadable | Curate + group |

## Related skills

- `workflow/git-workflow`, `workflow/deployment`,
  `engineering/pr-review`, `engineering/feature-flags`.
