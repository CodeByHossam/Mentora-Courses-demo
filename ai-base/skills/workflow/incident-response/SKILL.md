---
name: incident-response
description: >-
  Handle production incidents and their follow-up: severity classification,
  on-call response, escalation and comms, on-call runbooks, and blameless
  postmortems. Use during or after an incident. Trigger phrases: "production is
  down", "incident", "SEV", "on-call", "runbook", "postmortem", "outage",
  "rollback", "escalate", "status update".
---

# Incident Response

When production is on fire, a structured process beats heroics. Minimize time to
resolution, communicate clearly, and prevent secondary incidents from rushed
decisions. Follow up with a blameless postmortem.

## When to use

- A live production incident (errors, outage, data issue).
- Writing an on-call runbook or doing an escalation.
- Writing a postmortem after an incident.
- Trigger phrases: "production is down", "incident", "SEV", "on-call",
  "runbook", "postmortem", "outage", "rollback", "status update".

## Instructions

1. **Declare** and classify severity (see table). Assign an incident commander.
2. **Stabilize first**: mitigate (rollback, failover, feature-flag off) before full diagnosis.
3. **Communicate** on a cadence: status, impact, ETA, next update time.
4. **Escalate** per severity; keep a single channel and a timeline log.
5. **Resolve**, confirm recovery with metrics, then monitor for recurrence.
6. **Follow up** with a blameless postmortem and SMART action items.

### Severity

| SEV | Impact | Response |
|---|---|---|
| SEV1 | Full outage / data loss | All hands, immediate, exec comms |
| SEV2 | Major feature down / many users | Page on-call, mitigation ASAP |
| SEV3 | Partial degradation / workaround exists | Business hours, prioritize |
| SEV4 | Minor/cosmetic | Normal backlog |

### During incident (checklist)

```text
[ ] Declare + assign commander + open incident channel
[ ] Severity set; stakeholders notified
[ ] Mitigation applied (rollback / flag / scale / failover)
[ ] Timeline logged (timestamps, actions, decisions)
[ ] Regular status updates until resolved
[ ] Recovery confirmed via metrics; monitoring window
```

### Runbook template

```markdown
## Alert: <name>
- **Symptom:** what the alert means
- **Likely cause:** most common reasons
- **Diagnose:** steps + queries/dashboards
- **Fix:** mitigation and resolution steps
- **Escalate to:** <team/person>
```

### Blameless postmortem

```markdown
# Incident: <title> (<date>, SEV<n>)
## Impact        who/what/duration/quantified
## Timeline      timestamped events
## Root cause    5 Whys / contributing factors
## What went well / what didn't
## Action items  owner + due date, SMART (prevent detection->response->impact)
```

## Examples

### Good — mitigate first, communicate, follow up

> SEV2 declared. Rolled back deploy #482 within 5 min. Status updated every
> 15 min. Root cause: unindexed query at scale. Postmortem adds index +
> migration test + alert on p99.

### Bad — improvise, go silent, blame

> Everyone jumps in silently for 2 hours; fixes it; no timeline; postmortem
> names the engineer who merged the change.

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Diagnosing before mitigating | Prolongs outage | Stabilize first |
| No incident commander | Chaos, duplicated work | Assign one owner |
| Silent responders | Stakeholders in the dark | Regular updates |
| Never rolling back | Avoidable downtime | Rollback is a valid first move |
| Blameful postmortem | Hides info, hurts culture | Blameless, systems-focused |
| Vague action items | Never done | Owner + date + SMART |
| No runbook | Reinvents steps at 3am | Write runbooks per alert |

## Related skills

- `workflow/debugging-playbook`, `workflow/observability`,
  `workflow/deployment`, `engineering/migration-plan`.
