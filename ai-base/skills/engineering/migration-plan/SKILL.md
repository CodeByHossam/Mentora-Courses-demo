---
name: migration-plan
description: >-
  Plan safe data/schema/system migrations: expand-contract, backward/forward
  compatibility, zero-downtime changes, backfills, dual-write, verification, and
  rollback. Use when changing schemas, data, or replacing systems. Trigger
  phrases: "migration plan", "schema migration", "zero downtime", "backfill",
  "dual write", "expand contract", "data migration", "rollback plan",
  "decommission".
---

# Migration Plan

A migration is safe when old and new coexist during the change. Design for
compatibility in both directions and keep a rollback path.

## When to use

- Changing a database schema or moving data.
- Replacing a system, service, or dependency.
- Any change that can't be deployed atomically.
- Trigger phrases: "migration plan", "schema migration", "zero downtime",
  "backfill", "dual write", "expand contract", "data migration", "rollback".

## Instructions

1. Use **expand → migrate → contract** (a.k.a. parallel change):
   add the new thing, move reads/writes, then remove the old.
2. Keep every step **backward and forward compatible**: old code works with new schema and vice versa.
3. Make migrations **idempotent** and re-runnable; version them.
4. Backfill in **batches** with throttling; don't lock large tables.
5. **Dual-write / dual-read** during transition; reconcile and verify.
6. Verify before cutting over (row counts, checksums, sample diffs).
7. Deploy behind a flag where possible; have a tested rollback.

### Expand → migrate → contract

```text
1. Expand:   add new column/field/index (nullable, defaulted). Deploy code that
             writes BOTH old and new. Reads still use old.
2. Migrate:  backfill new from old in batches. Verify parity.
3. Switch:   reads move to new. Watch metrics.
4. Contract: stop writing old; after a soak, drop the old column/field.
Each step is independently deployable and reversible.
```

### Batched backfill

```js
let cursor = null;
do {
  const batch = await User.find({ _id: { $gt: cursor }, migrated: { $ne: true } })
    .limit(500).sort({ _id: 1 });
  for (const u of batch) { u.fullName = `${u.first} ${u.last}`; await u.save(); }
  cursor = batch.at(-1)?._id ?? null;
  if (batch.length) await sleep(200);          // throttle
} while (cursor);
```

### Verification

```text
- Counts match (old vs new, migrated vs total)
- Checksums/samples match for transformed fields
- Both code paths pass tests
- Rollback rehearsed on a copy
```

## Examples

### Good — reversible, verified, batched

> Rename `name` → `fullName`: add `fullName`, dual-write both, backfill in
> batches, switch reads, verify parity, then drop `name` weeks later.

### Bad — destructive one-shot

```sql
ALTER TABLE users RENAME COLUMN name TO full_name;  -- breaks running old code
DELETE FROM ... ;                                    -- no rollback, no verification
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Destructive change in one deploy | Outage, no rollback | Expand-contract |
| Non-idempotent migration | Fails on retry/partial run | Make it re-runnable |
| Big locked backfill | Blocks writes, downtime | Batched + throttled |
| No verification | Silent data corruption | Counts/checksums/samples |
| No rollback plan | Stuck if it goes wrong | Tested reverse path |
| Dropping old too early | Breaks slow/old clients | Soak before contract |
| No flag/ko control | Can't stop mid-migration | Flag the cutover |

## Related skills

- `engineering/feature-flags`, `workflow/deployment`,
  `architecture/data-and-systems-design`, `testing/integration-testing`.
