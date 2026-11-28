# MERN Clean Code

Backend (Node/Express/MongoDB) + Frontend (React) rules for MERN projects.
Load when working in a `full-stack-web`, MERN, or MERN-like project.

## Backend — Folder structure

```text
src/
├── routes/
├── controllers/
├── services/
├── models/
├── middlewares/
├── utils/
├── config/
└── app.js
```

## Backend — Controllers are thin, services are fat

```js
// ❌ bad — controller does validation + logic + response
const createUser = async (req, res) => {
  const user = await User.create(req.body); // logic in controller!
  res.json(user);
};

// ✅ good — controller only handles req/res
const createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
```

- Controllers: parse/validate request, delegate to service, send response.
- Services: all business logic, call models, throw `AppError`.
- Never query DB from routes/controllers.

## Backend — Async error handling

```js
// ✅ good — async/await with try/catch OR centralized error middleware
const updatePost = async (req, res, next) => {
  try {
    const post = await postService.update(req.params.id, req.body);
    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// app error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ success: false, error: err.message });
});
```

- Centralized error handler + custom `AppError` class (`statusCode`, `message`,
  optional `code`). Never swallow.
- Wrap async handlers so rejected promises reach the error middleware.

## Backend — Validation at the edge

```js
// Joi / Zod / express-validator — validate before touching the DB
const schema = Joi.object({ email: Joi.string().email().required() });
const { error, value } = schema.validate(req.body);
if (error) return res.status(400).json({ success: false, error: error.message });
```

- Validate body, query, params, headers for every route before service/DB access.

## Backend — Mongoose best practices

```js
const post = await Post.findById(id).select('-password -__v').lean();
const posts = await Post.find({ author: uid }).lean(); // lean() for reads
// indexes for queries/sorts:
Post.createIndexes([{ field: 'createdAt', background: true }]);
```

- Schema validation (`required`, `enum`, custom validators) + indexes.
- Use `.lean()` for reads, `.select('-password')` to exclude fields.
- Avoid N+1: populate once, or use aggregation. Never loop queries per row.
- `toJSON` transform strips sensitive fields:

```js
postSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});
```

## Backend — Config & secrets

```js
// config/db.js — reads from process.env
require('dotenv').config();
```

- Env vars via `dotenv` (or vault); **never commit `.env`, secrets, keys, tokens**.

## Backend — Auth & security

- Hash passwords with bcrypt (cost ≥ 10); never store plaintext.
- JWT: sign with expiry (`exp`), short-lived access + refresh, verify signature,
  use httpOnly cookies for web or Authorization header for APIs; rotate refresh.
- Rate limiting (e.g., `express-rate-limit`), `helmet` headers, CORS allow-list.
- Never expose sensitive fields in any response.

## Backend — API response shape

```js
// ✅ consistent
res.status(201).json({ success: true, data: created });
res.status(400).json({ success: false, error: 'Validation failed' });
res.status(404).json({ success: false, error: 'Post not found' });
```

- `{ success, data, error }` shape everywhere; errors never leak stack traces in
  production.

## Backend — HTTP status codes

Use correctly: `200` OK, `201` created, `204` no content, `400` bad request,
`401` unauthenticated, `403` forbidden, `404` not found, `409` conflict,
`422` validation, `500` server error.

## Frontend (React) — structure

```text
src/
├── components/
├── hooks/
├── services/
├── utils/
├── pages/
├── context/   // or store/
```

- One component per file, `PascalCase` filenames.
- Keep components **< ~200 lines**; extract subcomponents when larger.
- Custom hooks for reusable logic: `useAuth`, `useFetch`.
- Split logic: components / hooks / services / utils / pages / context / store.

## Frontend — Data fetching

```js
// ❌ bad — API call inside component
const fetchPosts = async () => {
  const res = await axios.get('/api/posts'); // ← in component
  setPosts(res.data.data);
};

// ✅ good — in services layer
// src/services/postService.js
export const fetchPosts = async () => {
  const res = await axios.get('/api/posts');
  return res.data.data;
};

// component calls the hook/service and handles loading/error
```

## Frontend — State, effects, performance

- State ladder: local → context → Redux/Zustand only when truly shared.
- Avoid prop drilling beyond 2 levels → context or store.
- `useEffect` deps must be complete and correct; clean up subscriptions/intervals
  on unmount; don't use effects to derive state (compute during render).
- Keys: stable IDs, not array indexes (unless static list).
- `useMemo`/`useCallback` only with a measured need — don't sprinkle.
- Accessibility: semantic elements, `aria-*`, `<label>`, keyboard nav, focus
  management.
- CSS: Tailwind or CSS modules; no inline styles for theming.

## Frontend — Example

```jsx
// ❌ bad
<div style={{ color: 'red' }} onClick={goHome}>Home</div>;

// ✅ good
<button type="button" onClick={goHome}>Home</button>;
```
