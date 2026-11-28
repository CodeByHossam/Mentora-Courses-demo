---
name: coding-interview-prep
description: >-
  Prepare for coding interviews: a study plan, pattern-based practice,
  thinking out loud, complexity analysis, testing your solution, and mock
  interviews. Use when preparing for technical coding rounds. Trigger phrases:
  "coding interview", "LeetCode", "data structures and algorithms", "practice
  problems", "interview prep plan", "how to prep for coding", "big O".
---

# Coding Interview Prep

Coding interviews test **problem-solving and communication**, not memorized
answers. Learn patterns, practice out loud, and structure your approach.

## When to use

- Preparing for a technical coding round.
- Building a study plan or practicing problems.
- Struggling to explain solutions under time pressure.
- Trigger phrases: "coding interview", "LeetCode", "DS&A", "practice problems",
  "interview prep plan", "big O".

## Instructions

1. Build a plan by **pattern**, not random problems (see list below).
2. For each problem: restate, clarify, examples, brute force, optimize, code, test.
3. **Think out loud** — narrate trade-offs; silence reads as being stuck.
4. Analyze time/space complexity before and after coding.
5. Test with edge cases: empty, single, duplicates, large, negative.
6. Do timed **mock interviews**; review mistakes; track patterns you miss.
7. Re-solve missed problems after 3–7 days (spaced repetition).

### Study order (patterns)

```text
Arrays/Strings -> Hash maps -> Two pointers -> Sliding window -> Binary search
-> Stack/Queue -> Linked lists -> Trees (DFS/BFS) -> Heaps -> Graphs
-> Recursion/Backtracking -> Dynamic programming -> Intervals -> Tries
```

### Problem-solving loop (PEDAC)

```text
1. Restate + clarify constraints (size, ranges, duplicates, sorted?)
2. Examples (normal + edge)
3. Brute force + complexity
4. Optimize (pattern: sliding window, hashing, two pointers, DP…)
5. Code in small steps, narrating
6. Test by hand on examples + edges; state complexity
```

### Complexity cheat-sheet

```text
Hash map lookup O(1) avg · Sort O(n log n) · Binary search O(log n)
BFS/DFS O(V+E) · DP often O(n * state) · Nested loops O(n^2) — usually too slow
```

## Examples

### Good — clarify, narrate, test, state complexity

> "Is the array sorted? … Two-pointer then: O(n) time, O(1) space. Let me test
> with empty and single-element arrays."

### Bad — silent coding, no tests

> Diving into code immediately, not stating complexity, not testing edge cases,
> going quiet.

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Random problem grinding | No transfer | Learn by pattern |
| Memorizing solutions | Fails on variants | Understand approaches |
| Coding silently | Interviewers can't assess | Think out loud |
| Skipping clarification | Solves wrong problem | Ask constraints first |
| No complexity analysis | Misses the point | Always state Big-O |
| No edge-case testing | Bugs slip | Test empty/single/dup/large |
| Cramming the night before | Retention low | Spaced, consistent practice |

## Related skills

- `career/behavioral-prep`, `career/system-design-prep`,
  `career/hld-design`, `testing/testing-strategy`.
