---
name: security-review
description: >-
  Audit a MERN application for security: OWASP Top 10, authn/authz, input
  validation and injection, XSS/CSRF, rate limiting, security headers, dependency
  and secret hygiene. Use when reviewing code for vulnerabilities or hardening a
  service. Trigger phrases: "security review", "is this secure", "OWASP",
  "vulnerability", "XSS", "CSRF", "injection", "rate limiting", "helmet",
  "sanitize input", "harden".
---

# Security Review

Assume every input is hostile. The goal is depth: even if one control fails, others
limit the damage. Review systematically against the OWASP Top 10 and MERN-specific
risk areas.

## When to use

- Reviewing code or a pull request for vulnerabilities.
- Hardening an API or web app before launch.
- Responding to a reported security issue.
- Trigger phrases: "security review", "is this secure", "OWASP",
  "vulnerability", "XSS", "CSRF", "injection", "rate limiting", "helmet", "harden".

## Instructions

1. **Authn/Authz**: verify every protected route checks identity **and** ownership/role.
2. **Input**: validate and sanitize at the edge; use schemas and parameterized queries.
3. **Injection**: never build queries/HTML/shell from raw user input.
4. **XSS**: escape output; avoid `dangerouslySetInnerHTML`; use a CSP.
5. **CSRF / cookies**: `httpOnly`, `secure`, `sameSite`; CSRF token for cookie-auth writes.
6. **Transport & headers**: HTTPS, Helmet (HSTS, X-Content-Type-Options, frame restrictions).
7. **Abuse**: rate-limit auth and public endpoints; cap payload sizes.
8. **Secrets & deps**: no secrets in code; audit dependencies; least-privilege DB user.

### Checklist (OWASP Top 10 × MERN)

```text
A01 Broken access control   check ownership on every object (IDOR); no client-trusted roles
A02 Cryptographic failures  bcrypt/argon2 for passwords; TLS everywhere; no MD5/SHA1
A03 Injection               Mongoose typed queries; avoid $where/eval; validate + escape
A04 Insecure design         threat-model flows; least privilege; deny by default
A05 Misconfiguration        helmet, CORS allowlist, disable x-powered-by, no debug in prod
A06 Vulnerable components   npm audit / Dependabot; pin + update
A07 Auth failures           rate-limit login, lockout, MFA, secure JWT handling
A08 Integrity failures      verify webhooks/signatures; no unsafe deserialization
A09 Logging failures        log security events (no secrets/PII); monitor
A10 SSRF                    allowlist outbound URLs; block metadata endpoints
```

### Express hardening

```js
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGINS, credentials: true }));
app.use(express.json({ limit: '100kb' }));
app.use('/api/v1/auth', rateLimit({ windowMs: 15 * 60_000, max: 20 }));
```

### Safe by default (authz + validation)

```js
// ownership check — prevents IDOR
const post = await postService.findById(req.params.id);
if (!post) return next(new NotFoundError());
if (String(post.author) !== req.user.id) return next(new ForbiddenError());

// parameterized, schema-validated input (no string-built queries)
const body = createPostSchema.parse(req.body);
```

### XSS-safe React

```jsx
<p>{user.bio}</p>                          {/* escaped by default */}
// avoid unless sanitized:  <div dangerouslySetInnerHTML={{ __html: cleaned }} />
```

## Examples

### Good — defense in depth

```js
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGINS }));
app.use('/api/v1/auth', rateLimit({ windowMs: 9e5, max: 20 }));
res.cookie('refresh', token, { httpOnly: true, secure: true, sameSite: 'strict' });
```

### Bad — trust the client, string-built query

```js
if (req.body.isAdmin) { /* grant admin */ }                    // client-trusted role
const users = await User.find({ name: req.query.n });          // no validation
res.send(`<h1>${req.query.q}</h1>`);                           // reflected XSS
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Trusting client for roles/ids | Privilege escalation, IDOR | Server-side authz + ownership |
| String-concatenated queries | NoSQL/command injection | Typed queries + validation |
| Unescaped user HTML | XSS | Escape / sanitize / CSP |
| Secrets in code/logs | Credential leak | Env/secret store, redaction |
| No rate limiting on auth | Brute force | Throttle + lockout + MFA |
| Wildcard CORS with credentials | Data theft | Origin allowlist |
| Ignoring dependency CVEs | Known exploits | Audit + auto-update |

## Related skills

- `backend/jwt-auth-flow`, `workflow/env-and-secrets`,
  `architecture/api-design`, `backend/express-api-structure`.
