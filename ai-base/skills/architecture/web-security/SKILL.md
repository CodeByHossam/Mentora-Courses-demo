---
name: web-security
description: >-
  Build secure web apps end to end — backend (Node/Express/Mongo API) and
  frontend (React) best practices: authn/authz, input validation, injection,
  XSS/CSRF, secure cookies, CORS, security headers/CSP, rate limiting, secrets,
  dependency and transport hardening. Use when writing or hardening any web
  feature. Trigger phrases: "secure the web", "web security", "secure app",
  "security best practices", "harden", "secure frontend", "secure backend",
  "prevent XSS", "CSRF", "CORS", "CSP", "helmet", "sanitize", "secure cookies".
---

# Web Security (Backend + Frontend)

Security is a property of the **whole** request path: browser → network → API →
data → back to the browser. Assume every input, header, and token is hostile, and
defend in depth — if one control fails, others limit the damage. Build it in; do
not bolt it on later.

## When to use

- Implementing any feature that takes user input, authenticates, or stores data.
- Hardening a Node/Express + React app before launch.
- Reviewing code, a PR, or a dependency for risk.
- Trigger phrases: "secure the web", "web security", "harden", "prevent XSS",
  "CSRF", "CORS", "CSP", "helmet", "sanitize", "secure cookies".

## Instructions

### Core principles

1. **Least privilege** — the smallest access that does the job (DB user, tokens, roles).
2. **Deny by default** — allow-list, not block-list; explicit access checks.
3. **Defense in depth** — validate on both client and server; never rely on one layer.
4. **Never trust the client** — every value can be forged; validate on the server.
5. **Fail safe** — on error, deny; never leak stack traces, secrets, or internals.
6. **Minimize attack surface** — fewer endpoints, fields, and dependencies exposed.

### Backend (Node / Express / MongoDB)

1. **Authn/Authz first**: authenticate every protected route, then authorize by
   role **and** ownership on the specific object (prevents IDOR).
2. **Validate input at the edge** with a schema; reject unknown fields (mass assignment).
3. **Never build queries/HTML/shell/fs paths** from raw input (NoSQL/command injection).
4. **Passwords**: hash with bcrypt (cost 12) or argon2. Never store or log plaintext.
5. **Tokens**: short-lived access token in memory; refresh token in an `httpOnly`,
   `secure`, `sameSite` cookie; store refresh hashed server-side; rotate.
6. **Cookies/CSRF**: cookie-based writes need `sameSite` + a CSRF token.
7. **Headers & transport**: HTTPS only, Helmet, strict CORS allow-list, disable
   `x-powered-by`.
8. **Abuse control**: rate-limit auth and public endpoints; cap payload size; timeouts.
9. **Secrets & deps**: secrets in env/secret store (never in code); audit deps; run
   as a least-privilege DB user.

### Frontend (React)

1. **Output escaping**: rely on React's default escaping; never inject unsanitized
   HTML. Avoid `dangerouslySetInnerHTML` (sanitize with DOMPurify if unavoidable).
2. **Token storage**: keep access tokens in memory; refresh token in `httpOnly`
   cookie. **Never** put long-lived tokens in `localStorage`/`sessionStorage`.
3. **Validate on the client for UX, on the server for safety** — never both as the
   only check.
4. **No secrets in the bundle**: anything shipped to the browser is public
   (`VITE_*`/`REACT_APP_*` are not secret).
5. **CSP & SRI**: ship a Content-Security-Policy; use Subresource Integrity for
   third-party scripts; prefer same-origin assets.
6. **Links & frames**: `rel="noopener noreferrer"` on `target="_blank"`; avoid
   embedding untrusted pages.
7. **Safe URLs**: block `javascript:` URIs; validate redirect targets (open-redirect).
8. **Keep deps current**: audit and update; drop abandoned packages.

### Checklist (ship-blocking)

```text
[ ] Authn on every protected route; authz by role AND ownership (no IDOR)
[ ] Server-side schema validation; unknown fields rejected
[ ] No string-built queries/HTML/shell; use typed/parameterized APIs
[ ] Passwords hashed (bcrypt/argon2); no plaintext anywhere
[ ] Refresh token: httpOnly + secure + sameSite, hashed at rest, rotated
[ ] CSRF protection on cookie-auth writes
[ ] HTTPS only; Helmet; strict CORS allow-list; x-powered-by disabled
[ ] Rate limiting on auth + sensitive endpoints; payload caps; timeouts
[ ] Errors are generic to the client; details/secrets only in server logs
[ ] No secrets in code or client bundle; .env ignored by git
[ ] No unsanitized HTML; no tokens in localStorage; CSP set
[ ] Dependencies audited (npm audit / Dependabot); least-privilege DB user
```

## Examples

```js
// app.js — secure Express baseline
app.disable('x-powered-by');
app.use(helmet());                                        // secure headers
app.use(cors({ origin: env.CORS_ORIGINS, credentials: true }));
app.use(express.json({ limit: '100kb' }));                // cap payloads
app.use('/api/v1/auth', rateLimit({ windowMs: 9e5, max: 20 }));
app.use(csrfProtection);                                  // for cookie-auth writes
app.set('trust proxy', 1);                                // correct client IP/HTTPS
```

```js
// authorization + validation — never trust the client
const post = await postService.findById(req.params.id);
if (!post) return next(new NotFoundError());
if (String(post.author) !== req.user.id) return next(new ForbiddenError()); // ownership
const body = createPostSchema.strict().parse(req.body);   // typed, unknown fields rejected
```

```js
// secure token cookie
res.cookie('refreshToken', raw, {
  httpOnly: true, secure: true, sameSite: 'strict', path: '/api/v1/auth',
});
```

```jsx
// Good — escaped by default
<p>{user.bio}</p>

// Good — only when HTML is required, and only after sanitizing
<p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />

// Bad — never do this
element.innerHTML = userInput;
localStorage.setItem('accessToken', token);
const url = req.query.next; window.location = url; // open redirect
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Trusting client roles/ids | Privilege escalation, IDOR | Server-side authz + ownership |
| No server validation | Injection, bad data | Schema-validate at the edge |
| String-built queries/HTML | NoSQL/command injection, XSS | Typed queries; escape/sanitize |
| Long-lived token in localStorage | XSS = account takeover | Access in memory, refresh httpOnly |
| Wildcard CORS + credentials | Any site reads auth data | Exact origin allow-list |
| Secrets in code or bundle | Public credential leak | Env/secret store; server-only |
| Verbose error/stack to client | Info disclosure | Generic client errors; log server-side |
| No rate limit on login | Brute force | Throttle + lockout + MFA |
| Ignoring dependency CVEs | Known exploits | Audit + auto-update |

## Related skills

- `architecture/security-review` (audit a codebase), `backend/jwt-auth-flow`,
  `workflow/env-and-secrets`, `architecture/api-design`,
  `backend/express-api-structure`, `frontend/axios-http-patterns`.
