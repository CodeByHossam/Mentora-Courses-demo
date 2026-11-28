---
name: env-and-secrets
description: >-
  Manage environment configuration and secrets safely: .env files and precedence
  (dotenv), validating config at startup, Vite VITE_ public vars vs server
  secrets, secret managers, rotation, and detecting leaks. Use when configuring
  environments or handling credentials. Trigger phrases: "environment variables",
  ".env", "dotenv", "config validation", "API keys", "secrets", "rotate secret",
  "leaked key", "VITE_ variable".
---

# Environment & Secrets

Config lives in the environment; secrets never live in code or git. Validate
config at startup so misconfiguration fails fast and loud.

## When to use

- Setting up `.env` files and config for dev/staging/prod.
- Deciding what may be public vs must stay server-only.
- Adding a secret manager, rotation, or leak response.
- Trigger phrases: "environment variables", ".env", "dotenv", "config
  validation", "API keys", "secrets", "rotate", "leaked key", "VITE_ variable".

## Instructions

1. Commit a `.env.example` (names, no values); gitignore `.env*`.
2. Load env once at process start (`dotenv`), then validate with a schema and fail fast.
3. Expose config as a typed object; never read `process.env` ad hoc across the codebase.
4. Only `VITE_`-prefixed vars reach the browser bundle — treat them as **public**. Never put DB URLs, JWT secrets, or API keys there.
5. Store production secrets in a manager (AWS Secrets Manager, Vault, or the host's secret store) and inject at runtime.
6. Rotate secrets on a schedule and immediately after any suspected exposure.
7. Never log secrets; redact them in errors and request logging.

### Runtime config validation (Zod)

```ts
// config/env.ts  (server only)
import { z } from 'zod';
const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  CORS_ORIGINS: z.string().transform((s) => s.split(',')),
});
export const env = schema.parse(process.env);  // throws with a clear list on startup
```

### Public vs secret (Vite)

```bash
# .env — server only (NEVER exposed to the browser)
MONGODB_URI=mongodb+srv://.../app
JWT_ACCESS_SECRET=super-secret-value

# only VITE_ vars are bundled and visible to users — public by definition
VITE_API_URL=https://api.example.com
```

### .env.example

```bash
NODE_ENV=development
PORT=5000
MONGODB_URI=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
CORS_ORIGINS=http://localhost:5173
VITE_API_URL=http://localhost:5000/api/v1
```

### Leak response

```text
1. Rotate/revoke the exposed credential immediately.
2. Audit access logs for misuse.
3. Remove from code + git history (git filter-repo / BFG).
4. Add the file/pattern to .gitignore and a pre-commit secret scanner.
5. Notify affected parties per policy.
```

## Examples

### Good — validated config, secrets server-only

```ts
app.listen(env.PORT);               // typed, validated at boot
await mongoose.connect(env.MONGODB_URI);
```

### Bad — hardcoded secret, secret in the client bundle

```ts
const key = 'sk_live_abc123';                       // committed secret
console.log(process.env.JWT_ACCESS_SECRET);         // logged secret
// in client code:  const url = import.meta.env.VITE_MONGODB_URI  // leaks DB URI
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Secrets committed to git | Public forever (history) | `.env` gitignored + rotate |
| `VITE_`/`NEXT_PUBLIC_` for secrets | Bundled into the client | Server-only env |
| `process.env.X` scattered everywhere | Untyped, unvalidated | Central validated config |
| No startup validation | Fails later, obscurely | Schema parse at boot |
| Logging full config/env | Secret leakage | Redact sensitive keys |
| One secret shared by all envs | Blast radius | Per-env, per-service secrets |
| Never rotating secrets | Long-lived exposure | Scheduled rotation |

## Related skills

- `backend/jwt-auth-flow`, `workflow/deployment`,
  `architecture/security-review`, `frontend/axios-http-patterns`.
