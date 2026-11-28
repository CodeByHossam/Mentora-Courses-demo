---
name: git-workflow
description: >-
  Git branch and collaboration conventions: trunk-based flow, short-lived
  feature branches, naming, rebase vs merge, keeping branches current, PR
  hygiene, and safe recovery (revert/reset/reflog). Use when branching, syncing,
  resolving conflicts, or recovering history. Trigger phrases: "git workflow",
  "branch strategy", "rebase vs merge", "resolve conflicts", "undo a commit",
  "revert", "cherry-pick", "git reflog", "feature branch".
---

# Git Workflow

Small, short-lived branches merged often. Keep history readable and the main
branch always deployable. Prefer reversible operations and never rewrite shared
history.

## When to use

- Choosing a branching strategy for a team or feature.
- Syncing a branch, resolving conflicts, or sizing a PR.
- Recovering from a mistake (undo, revert, reflog).
- Trigger phrases: "git workflow", "branch strategy", "rebase vs merge",
  "resolve conflicts", "undo a commit", "revert", "cherry-pick", "reflog".

## Instructions

1. Keep `main` always green and deployable; integrate frequently.
2. Use short-lived branches named `<type>/<ticket>-<slug>` (e.g., `feat/AUTH-12-refresh-token`).
3. Before a PR, bring the branch up to date: `git fetch && git rebase origin/main`.
4. Keep PRs small and single-purpose; one logical change per PR.
5. Prefer rebase for local cleanup; merge (or squash) for integrating to `main` per team policy.
6. Never force-push or rewrite commits that others have based work on.
7. Use `revert` on shared branches; use `reset` only on your own unpushed work.

### Daily flow

```bash
git switch -c feat/AUTH-12-refresh-token
# ... commit ...
git fetch origin
git rebase origin/main            # keep current, resolve as you go
git push -u origin HEAD
# open PR, review, then merge per policy
```

### Conflicters, resolved

```bash
git rebase origin/main
# fix conflicts in files, then:
git add <files>
git rebase --continue
# abort if it goes wrong:
git rebase --abort
```

### Recovery cheat-sheet

```bash
git revert <sha>          # safe undo on shared branches (new commit)
git reset --soft HEAD~1   # undo last commit, keep changes staged (local only)
git restore <file>        # discard unstaged changes to a file
git reflog                # find "lost" commits after a bad reset/rebase
git cherry-pick <sha>     # bring a specific commit to the current branch
```

## Examples

### Good — short branch, rebased, small PR

```bash
git switch -c fix/API-7-null-user
# one focused commit + test
git fetch && git rebase origin/main && git push -u origin HEAD
```

### Bad — long-lived branch, force-push to main

```bash
git checkout huge-feature   # 3 weeks, 200 files
git push --force origin main  # rewrites shared history; breaks everyone
```

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Long-lived branches | Painful merges, drift | Short-lived + frequent integration |
| Force-push shared branches | Destroys others' work | Force-push only your own unreviewed branch (`--force-with-lease`) |
| Reset on shared history | Loses commits | `revert` |
| Giant multi-purpose PRs | Slow review, risky | Small, single-purpose PRs |
| Committing secrets/binaries | Leaks, bloats repo | `.gitignore`; rotate secrets |
| Vague branch names | Unclear ownership | `<type>/<ticket>-<slug>` |
| Merge conflicts left unverified | Broken build | Re-run tests after resolving |

## Related skills

- `workflow/commit-conventions`, `engineering/pr-review`,
  `workflow/deployment`, `engineering/feature-flags`.
