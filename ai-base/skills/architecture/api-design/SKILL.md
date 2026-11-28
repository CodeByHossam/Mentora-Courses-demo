---
name: api-design
description: >-
  Design HTTP/REST APIs: resource modeling, URL and verb conventions, status
  codes, pagination, filtering, versioning, idempotency, error envelopes, and
  when to choose REST vs RPC vs GraphQL. Use when designing or reviewing an API.
  Trigger phrases: "API design", "REST", "endpoint design", "status codes",
  "pagination", "API versioning", "idempotency", "GraphQL vs REST", "error
  format", "naming convention".
---

# API Design

A good API is predictable, consistent, and hard to misuse. Model resources, use
HTTP semantics honestly, and return errors that tell the client how to fix them.

## When to use

- Designing new endpoints or reviewing an existing API.
- Choosing between REST, RPC, and GraphQL.
- Deciding on pagination, filtering, versioning, or error shapes.
- Trigger phrases: "API design", "REST", "endpoint design", "status codes",
  "pagination", "versioning", "idempotency", "GraphQL vs REST", "error format".

## Instructions

1. Model **resources** (nouns), plural, hierarchical: `/users/:id/posts`.
2. Use HTTP verbs by intent: GET (read), POST (create), PUT/PATCH (replace/update), DELETE.
3. Return correct **status codes**; don't 200-wrap errors.
4. Paginate every collection; define a consistent envelope.
5. Version from day one (`/api/v1`); evolve without breaking.
6. Make unsafe writes **idempotent** where clients retry.
7. Use one consistent **error envelope** with a machine code + human message.

### Conventions

```text
GET    /api/v1/posts?status=published&sort=-createdAt&page=2&limit=20
GET    /api/v1/posts/:id
POST   /api/v1/posts                 (Idempotency-Key header supported)
PATCH  /api/v1/posts/:id
DELETE /api/v1/posts/:id
GET    /api/v1/users/:id/posts       (nested collection)
```

| Code | Use |
|---|---|
| 200 / 201 / 204 | read / created / no content |
| 400 / 422 | malformed / semantically invalid |
| 401 / 403 | unauthenticated / forbidden |
| 404 / 409 / 429 | missing / conflict / rate limited |
| 500 / 503 | server error / unavailable |

### Response envelope

```json
{ "success": true, "data": { "post": { "id": "…" } }, "meta": { "requestId": "…" } }
```

```json
{
  "success": false,
  "error": { "code": "VALIDATION_ERROR", "message": "Title is required",
             "details": [{ "field": "title", "issue": "required" }] },
  "meta": { "requestId": "…" }
}
```

### Pagination

```json
{ "data": [ … ], "meta": { "page": 2, "limit": 20, "total": 137, "totalPages": 7 } }
// cursor style for large/**volatile** sets: { "nextCursor": "eyJpZCI6…" }
```

### REST vs RPC vs GraphQL

```text
REST      resources, cacheable, simple -> default choice
RPC       action-oriented ops, high-cardinality commands (/search, /export)
GraphQL   client-shaped queries, many clients, over-fetching pain (adds complexity)
```

## Examples

### Good — purposeful, consistent, typed errors

```http
POST /api/v1/posts   Idempotency-Key: 8f2c…
201 Created
{ "success": true, "data": { "post": { "id": "p1", "title": "Hi" } } }
```

### Bad — verbs in URLs, status lies, ad-hoc errors

```http
GET /getPostsAndSetActive        // RPC-ish CRUD; no resource model
200 OK   { "error": true, "msg": "not found" }   // 200 for an error; inconsistent shape
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Verbs in URLs (`/createUser`) | Inconsistent, uncacheable | Resource nouns + verbs |
| 200 with error body | Breaks clients/monitoring | Real status codes |
| Inconsistent shapes across endpoints | Client special-cases | One envelope |
| No pagination | Huge payloads, OOM | Paginate collections |
| No versioning | Breaking becomes unavoidable | `/v1` from start |
| Duplicated side effects on retry | Double charges/creates | Idempotency keys |
| Leaking stack traces / internals | Security + coupling | Generic message, log detail |

## Related skills

- `backend/express-api-structure`, `architecture/mern-architecture`,
  `testing/contract-testing`, `architecture/security-review`.
