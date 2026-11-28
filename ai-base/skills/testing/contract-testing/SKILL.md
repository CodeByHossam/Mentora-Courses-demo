---
name: contract-testing
description: >-
  Contract testing with Pact: consumer-driven contracts, provider verification,
  and preventing breaking API changes between services or clients. Use when
  building APIs consumed by multiple clients or microservices. Trigger phrases:
  "contract testing", "Pact", "consumer-driven contract", "breaking API change",
  "provider verification", "API compatibility".
---

# Contract Testing (Pact)

Contract tests verify that a consumer and provider agree on the API — without
running both services simultaneously. They catch breaking changes before
deployment.

## When to use

- An API is consumed by one or more clients you don't fully control.
- Multiple services must stay compatible as they evolve.
- Preventing breaking changes to a shared API.
- Trigger phrases: "contract testing", "Pact", "consumer-driven contract",
  "breaking API change", "provider verification".

## Instructions

1. Define expectations on the **consumer** side (what it needs, not everything the provider offers).
2. Generate a pact file from consumer tests; publish it to a broker.
3. Verify the **provider** against the pact in its own test suite.
4. Run verification in CI before deploy; block on contract failures.
5. Use provider states to arrange data the contract expects.
6. Version contracts and add compatibility checks for "can I deploy safely?".

### Consumer test

```ts
const provider = new PactV3({ consumer: 'WebApp', provider: 'UserService', dir: './pacts' });

it('gets a user by id', () => {
  provider
    .given('a user with id 1 exists')
    .uponReceiving('a request for user 1')
    .withRequest({ method: 'GET', path: '/users/1' })
    .willRespondWith({
      status: 200,
      body: { id: like('1'), email: like('a@b.com'), role: term({ generate: 'user', matcher: 'user|admin' }) },
    });

  return provider.executeTest(async (mock) => {
    const api = new UserApi(mock.url);
    const user = await api.getUser('1');
    expect(user.email).toBeTruthy();
  });
});
```

### Provider verification

```ts
import { Verifier } from '@pact-foundation/pact';
await new Verifier({
  providerBaseUrl: 'http://localhost:4000',
  pactBrokerUrl: process.env.PACT_BROKER_URL,
  provider: 'UserService',
  stateHandlers: {
    'a user with id 1 exists': async () => { await seedUser({ id: '1' }); },
  },
}).verifyProvider();
```

## Examples

### Good — expectations minimal and matcher-based

```ts
.willRespondWith({ status: 200, body: { id: like('1'), email: like('a@b.com') } });
```

### Bad — exact brittle payloads and provider-driven contracts

```ts
.willRespondWith({ status: 200, body: { id: '1', email: 'a@b.com', createdAt: '2024-01-01T00:00:00Z' } });
// breaks on any provider change; ignores what consumers actually use
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Exact-value matching | Breaks on harmless changes | Type/regex matchers |
| Testing full provider response | Couples to internals | Assert only consumed fields |
| Provider-owned contracts | Consumer needs ignored | Consumer-driven |
| No provider verification in CI | Drift ships | Verify on every provider build |
| Contracts without states | Unreliable data setup | Define provider states |
| Ignoring broker/compatibility | Unsafe deploys | Deployability checks |

## Related skills

- `testing/testing-strategy`, `testing/integration-testing`,
  `architecture/api-design`, `architecture/resilience-and-messaging`.
