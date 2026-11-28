---
name: integration-testing
description: >-
  Integration-test Node/Express APIs and MERN apps: Supertest, in-memory Mongo
  (MongoMemoryServer), test isolation, seed data, auth flows, and test data
  factories (faker). Use when testing routes, middleware, services, and the DB
  together. Trigger phrases: "integration test", "Supertest", "MongoMemoryServer",
  "test the API", "seed data", "test factories", "faker", "test isolation",
  "test DB".
---

# Integration Testing (Node / MERN)

Integration tests verify that layers collaborate: routes, middleware, services,
and the database. Use an in-memory or disposable database and isolate every test.

## When to use

- Testing API endpoints end-to-end within the backend.
- Verifying middleware, auth, validation, and DB behavior together.
- Setting up test data, factories, and per-test isolation.
- Trigger phrases: "integration test", "Supertest", "MongoMemoryServer",
  "test the API", "seed data", "factories", "faker", "test isolation".

## Instructions

1. Start a disposable DB per test run (`MongoMemoryServer`); connect once in `beforeAll`.
2. Isolate tests: clear collections between tests (`afterEach`) or use transactions.
3. Build data with factory helpers + `faker`, not hand-written blobs.
4. Make requests through the app with Supertest; assert status, body shape, and DB side effects.
5. Test auth: unauthenticated, wrong role, expired token, happy path.
6. Reset global state (mocks, tokens) between tests.
7. Keep each test independent; never rely on execution order.

### Setup

```ts
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../src/app';

let mongo: MongoMemoryServer;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});
afterAll(async () => { await mongoose.disconnect(); await mongo.stop(); });
afterEach(async () => {
  const { collections } = mongoose.connection;
  await Promise.all(Object.values(collections).map((c) => c.deleteMany({})));
  jest.clearAllMocks();
});
```

### Factories + faker

```ts
import { faker } from '@faker-js/faker';
export const userFactory = (over = {}) => ({
  email: faker.internet.email().toLowerCase(),
  password: 'Password123!',
  displayName: faker.person.fullName(),
  ...over,
});

const res = await request(app).post('/api/v1/auth/register').send(userFactory());
expect(res.status).toBe(201);
expect(res.body.data.user).not.toHaveProperty('passwordHash');
```

### Auth-aware request

```ts
const agent = request(app);
const { body } = await agent.post('/api/v1/auth/login').send({ email, password });
const token = body.data.accessToken;

const me = await agent.get('/api/v1/users/me').set('authorization', `Bearer ${token}`);
expect(me.status).toBe(200);

await agent.get('/api/v1/users/me');                                   // no token
expect((await agent.get('/api/v1/admin/users')).status).toBe(403);     // wrong role
```

## Examples

### Good — isolated, factory-built, asserts persistence

```ts
it('creates a post and persists it', async () => {
  const res = await request(app).post('/api/v1/posts')
    .set('authorization', `Bearer ${token}`).send({ title: 'Hi', body: 'x' });
  expect(res.status).toBe(201);
  expect(await Post.countDocuments()).toBe(1);
});
```

### Bad — shared state, real remote DB, order dependence

```ts
// uses a shared cloud DB, no cleanup, test 2 depends on test 1's data
it('lists posts', async () => { const r = await request(app).get('/api/v1/posts'); expect(r.body.data.length).toBe(3); });
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Tests share a real production-like DB | Mutates data, flaky | Disposable in-memory DB |
| No cleanup between tests | Order-dependent failures | Clear collections |
| Hand-written fixtures everywhere | Brittle, unreadable | Factories + faker |
| Only happy-path tests | Auth/validation bugs slip | Test 401/403/400 cases |
| Asserting only status | Misses wrong payloads | Assert body + DB side effects |
| Mocking the DB | Not an integration test | Use a real (in-memory) DB |
| Depending on test order | Nondeterministic CI | Independent tests |

## Related skills

- `testing/unit-testing`, `testing/e2e-testing`, `testing/testing-strategy`,
  `backend/express-api-structure`, `backend/jwt-auth-flow`.
