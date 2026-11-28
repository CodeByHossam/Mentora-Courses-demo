---
name: resume-review
description: >-
  Write and review engineering resumes and LinkedIn profiles: impact-driven
  bullets (XYZ), ATS-friendly formatting, tailoring, and quantifying results. Use
  when writing or critiquing a resume or profile. Trigger phrases: "resume",
  "CV review", "LinkedIn profile", "improve my resume", "resume bullet",
  "ATS", "tailor resume", "how to write a resume".
---

# Resume & LinkedIn Review

A resume's only job is to earn the next conversation. Show **impact with numbers**,
keep it scannable, and tailor it to the role.

## When to use

- Writing or revising a resume/CV or LinkedIn profile.
- Critiquing bullets that feel weak or list duties.
- Tailoring application materials to a job.
- Trigger phrases: "resume", "CV review", "LinkedIn profile", "improve my
  resume", "resume bullet", "ATS", "tailor resume".

## Instructions

1. Use the **XYZ formula**: "Accomplished X, as measured by Y, by doing Z."
2. Start each bullet with a strong verb; quantify results wherever possible.
3. Show **impact and scope** (scale, users, %, time saved), not just duties.
4. Keep to 1 page (early) / 2 max; clear sections; consistent tense.
5. Make it **ATS-friendly**: simple layout, standard headings, relevant keywords, no tables/images for critical info.
6. **Tailor** per role — mirror the job's keywords and emphasize relevant projects.
7. One line per project for side work; link GitHub/portfolio for MERN roles.
8. Proofread ruthlessly; no typos, no unexplained gaps.

### XYZ bullets

```text
Accomplished [X] as measured by [Y] by doing [Z].

Weak:  Worked on the backend.
Strong: Cut checkout API p95 from 2.5s to 1.0s (60%) by adding DB indexes and
        a Redis read-through cache, lifting conversion 4%.
```

### MERN-specific examples

```text
- Built a real-time chat feature (Socket.io + Redis pub/sub) used by 12k MAU,
  handling 3k concurrent connections at <100ms p95.
- Migrated a React app to Redux Toolkit + RTK Query, cutting API boilerplate ~40%
  and eliminating stale-cache bugs.
- Designed a MongoDB schema and indexes for a feed, reducing query time 70%.
```

## Examples

### Good — impact, metrics, scope, tailored keywords

> "Led migration of 1.2M-user app to TypeScript across 8 engineers, reducing
> runtime errors 35% and onboarding time for new hires by 2 weeks."

### Bad — duty list, first person, no numbers

> "Responsible for coding features. I am a hard worker and a team player."
> (No impact, no metrics, generic.)

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Duty list, no impact | Looks junior | XYZ + metrics |
| No numbers | Unverifiable value | Quantify scale/%/time |
| Graphics/tables for key info | ATS can't parse | Simple, standard layout |
| Same resume for every job | Poor fit signal | Tailor keywords |
| Typos/formatting issues | Careless impression | Proofread; consistent |
| Unexplained gaps/tense shifts | Raises questions | Be consistent, brief notes |
| Too long | Recruiters skim | 1–2 pages, prioritized |

## Related skills

- `career/behavioral-prep`, `career/promotion-doc`,
  `career/1on1-prep`, `frontend/react-component-patterns`.
