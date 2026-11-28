---
name: jwt-auth-flow
description: >-
  Implement JWT authentication in a MERN app: registration, login, short-lived
  access tokens, rotating refresh tokens in httpOnly cookies, silent refresh,
  and logout with server-side invalidation. Use when adding auth, securing
  routes, handling token expiry, or fixing refresh loops. Trigger phrases:
  "JWT", "access token", "refresh token", "httpOnly cookie", "auth middleware",
  "token rotation", "silent refresh", "logout".
---

# JWT Auth Flow (MERN)

Short-lived access tokens (15 min) paired with long-lived rotating refresh
tokens (30 days). Access tokens live in memory / Authorization headers. Refresh
tokens live in `httpOnly` cookies and are stored **hashed** server-side.

## When to use

- Adding register/login/refresh/logout to a MERN app.
- Protecting routes and attaching the user to the request.
- Handling token expiry and silent refresh on the client.
- Trigger phrases: "JWT", "access token", "refresh token", "httpOnly cookie",
  "auth middleware", "token rotation", "silent refresh", "logout", "401 loop".

## Instructions

1. Hash passwords with bcrypt (cost 12). Never store plaintext.
2. Issue a short-lived access JWT and a long-lived opaque refresh token.
3. Store the refresh token **hashed** (SHA-256) in a sessions collection with an expiry.
4. Send refresh token in an `httpOnly`, `secure`, `sameSite` cookie scoped to auth routes.
5. On refresh, **rotate**: delete the old session and create a new one.
6. On suspected reuse, revoke all of the user's sessions.
7. Verify `audience` + `issuer` when checking the access token.
8. On the client, refresh once on 401 and queue concurrent 401s.

### Token issuance (server)

```js
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

export const signAccess = (userId, role) =>
  jwt.sign({ sub: userId, role }, config.jwt.accessSecret,
    { expiresIn: '15m', audience: 'api', issuer: 'auth' });

export const newRefresh = () => crypto.randomBytes(32).toString('hex');
export const hashToken = (t) => crypto.createHash('sha256').update(t).digest('hex');
```

### Refresh token rotation

```js
async refresh(raw) {
  const session = await this.sessions.findByHash(hashToken(raw));
  if (!session || session.expiresAt < new Date()) {
    if (session?.userId) await this.sessions.deleteAllForUser(session.userId); // reuse -> revoke all
    throw new UnauthorizedError('Invalid refresh token');
  }
  await this.sessions.delete(session._id);
  const user = await this.users.findById(session.userId);
  return this.#issueTokens(user);            // rotate
}
```

### Cookie + controller

```js
const REFRESH_COOKIE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 30 * 24 * 60 * 60 * 1000,
  path: '/api/v1/auth',
};
res.cookie('refreshToken', refreshToken, REFRESH_COOKIE);
res.status(201).json({ data: { accessToken, user } });
```

### Auth middleware

```js
export async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(new UnauthorizedError('Missing token'));
  try {
    const { sub, role } = verifyAccessToken(token);
    req.user = { id: sub, role };
    next();
  } catch {
    next(new UnauthorizedError('Invalid or expired token'));
  }
}
```

### Client — refresh once, queue the rest (Axios)

```js
let refreshing = false, queue = [];
api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const req = error.config;
    if (error.response?.status === 401 && !req._retry) {
      if (refreshing) {
        return new Promise((res, rej) => queue.push({ res, rej }))
          .then((t) => { req.headers.Authorization = `Bearer ${t}`; return api(req); });
      }
      req._retry = true; refreshing = true;
      try {
        const { data } = await axios.post('/api/v1/auth/refresh', {}, { withCredentials: true });
        const t = data.data.accessToken;
        setAccessToken(t);
        queue.forEach((q) => q.res(t)); queue = [];
        req.headers.Authorization = `Bearer ${t}`;
        return api(req);
      } catch (e) {
        queue.forEach((q) => q.rej(e)); queue = []; clearAuth();
        window.location.href = '/login';
        return Promise.reject(e);
      } finally { refreshing = false; }
    }
    return Promise.reject(error);
  },
);
```

## Examples

### Good — hashed, rotating, scoped cookie

```js
await sessions.create({ userId, tokenHash: hashToken(raw), expiresAt: in30Days });
res.cookie('refreshToken', raw, { httpOnly: true, sameSite: 'strict', path: '/api/v1/auth' });
```

### Bad — long-lived token in localStorage

```js
localStorage.setItem('token', jwt.sign({ sub: id }, secret, { expiresIn: '365d' })); // XSS + no revocation
```

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Access token in `localStorage` | XSS steals it | Access in memory, refresh in httpOnly cookie |
| No refresh rotation | Stolen token valid forever | Rotate + revoke on reuse |
| Storing refresh token plaintext | DB leak = full account takeover | Store SHA-256 hash |
| Not validating audience/issuer | Token confusion | Verify `aud` + `iss` |
| Long access-token TTL | Can't revoke quickly | 15 min access, 30 day refresh |
| Refresh without queueing | Refresh storm / loops | Single in-flight refresh + queue |
| bcrypt cost too low (4) | Fast to brute force | Cost 12 |

## Related skills

- `architecture/security-review`, `workflow/env-and-secrets`,
  `backend/express-api-structure`, `frontend/axios-http-patterns`,
  `state/mern-data-state-decisions`.
