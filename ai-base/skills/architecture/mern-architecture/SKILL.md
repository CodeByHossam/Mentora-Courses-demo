---
name: mern-architecture
description: >-
  Structure a MERN application: folder layout for client and server, layered
  (routes/controllers/services/repositories), feature-based organization,
  monorepo vs polyrepo, shared types, and deployment topology. Use when
  designing or reorganizing a MERN project. Trigger phrases: "MERN architecture",
  "project structure", "folder structure", "feature folders", "monorepo",
  "layered architecture", "where should this file go".
---

# MERN Architecture

Organize by feature, keep clean boundaries between HTTP, business logic, and data,
and share types so client and server can't drift. Structure should make the common
change easy and the wrong change hard.

## When to use

- Starting or restructuring a MERN app.
- Deciding where a file belongs or how to split modules.
- Choosing monorepo vs separate repos; sharing types.
- Trigger phrases: "MERN architecture", "project structure", "folder structure",
  "feature folders", "monorepo", "layered architecture", "where should this go".

## Instructions

1. Separate concerns into layers: **routes → controllers → services → repositories**. Controllers orchestrate HTTP; services hold business rules; repositories own data access.
2. Organize by feature, not by file type, once the app grows.
3. Keep `app.js` (express app) separate from `server.js` (listen) so tests can import the app.
4. Define validation at the edge (request schema); never trust client input.
5. Share types/contracts (a `shared/` package or generated types) between client and server.
6. Keep the client API layer (`api/`) thin and typed; components never call fetch directly.
7. Choose repo layout deliberately (see below).

### Server structure (layered + feature)

```text
server/
  src/
    app.js                 # express app, middleware, routes (no listen)
    server.js              # connect DB, app.listen, graceful shutdown
    config/                # env, db, constants
    middleware/            # auth, error handler, validation, rate limit
    features/
      users/
        user.routes.js
        user.controller.js
        user.service.js
        user.repository.js
        user.model.js      # mongoose schema
        user.validation.js
      posts/
        ...
    shared/                # utils, errors, logger, pagination
  tests/
```

### Client structure (feature-based)

```text
client/src/
  app/                     # store, router, providers
  features/
    auth/
      authSlice.ts
      authApi.ts
      components/
      pages/
    posts/
  components/ui/           # design-system primitives
  lib/                     # axios instance, helpers
  hooks/
  routes/
```

### Repo topology

```text
Polyrepo:  client/  server/         (simplest, independent deploys)
Monorepo:  apps/web  apps/api  packages/shared   (shared types, atomic changes)
```

## Examples

### Good — thin controller delegating to service

```js
export const createPost = async (req, res, next) => {
  try {
    const post = await postService.create(req.user.id, req.body);
    res.status(201).json({ success: true, data: { post } });
  } catch (err) { next(err); }   // centralized error middleware maps to status
};
```

### Bad — fat controller, logic everywhere

```js
router.post('/posts', async (req, res) => {
  const doc = await Post.create({ ...req.body, author: req.user.id });  // no validation
  await sendEmail(req.user.email);                                       // side effect inline
  res.json(doc);                                                         // leaked shape
});
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Business logic in controllers/routes | Untestable, duplicated | Service layer |
| Organizing only by type (`controllers/`, `models/`) at scale | Low cohesion | Feature folders |
| Client calling `fetch` directly everywhere | Duplicated auth/error handling | Thin typed API layer |
| Duplicated types client & server | Drift, runtime bugs | Shared contracts |
| `server.js` doing everything | Can't import app in tests | Split app/server |
| Trusting client input | Injection, bad data | Validate at the edge |
| Premature microservices | Ops overhead | Modular monolith first |

## Related skills

- `architecture/api-design`, `backend/express-api-structure`,
  `architecture/data-and-systems-design`, `engineering/code-quality`.
