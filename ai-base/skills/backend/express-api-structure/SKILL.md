---
name: express-api-structure
description: >-
  Structure production Express REST APIs: layered routes/controllers/services,
  async error handling, middleware order, and request validation with Zod or Joi.
  Use when building or refactoring Express endpoints, designing a REST resource,
  wiring middleware, adding validation, or standardizing error/response formats.
  Trigger phrases: "build an API", "express route", "controller", "middleware
  order", "validate request", "error handler", "REST endpoint".
---

# Express API Structure

One router per resource. Controllers handle HTTP only. Services hold business
logic. Repositories touch the database. Dependencies flow one way:
`route -> controller -> service -> repository`.

## When to use

- Creating or refactoring an Express resource (routes, controllers, services).
- Adding request validation or a consistent error/response envelope.
- Debugging middleware order, `next(err)`, or async errors.
- Trigger phrases: "build an API", "express route", "controller", "middleware
  chain", "validate input", "error handler", "REST endpoint", "response shape".

## Layering

```
src/
  app.js                 # configure express, no listen
  server.js              # connect DB then listen
  api/
    routes/              # thin: map HTTP verb+path -> controller
    controllers/         # HTTP concerns: parse req, call service, send res
    validators/          # Zod/Joi schemas per resource
    middlewares/         # authenticate, authorize, validate, errorHandler
  services/              # business logic, throws typed AppError
  repositories/          # Mongoose queries only
  models/                # Mongoose schemas
  config/                # env, database, constants
  utils/                 # errors, helpers
```

## Instructions

1. Configure the app in `app.js` (middleware order matters, see below).
2. Create one router file per resource; keep it declarative.
3. Put async handlers through the async pattern so rejections reach `next(err)`.
4. Validate `body`/`query`/`params` at the edge, before the controller logic.
5. Throw typed `AppError` subclasses from services; map them in one error handler.
6. Use a consistent response envelope: `{ data }`, `{ data, pagination }`, `{ error }`.

### Middleware order (do not reorder casually)

```js
app.use(helmet());
app.use(cors({ origin: config.cors.origins, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(mongoSanitize());          // strip $/. operators (NoSQL injection)
app.use(compression());
app.use(generateRequestId);        // req.id
app.use(requestLogger);
app.use('/api', rateLimit(...));
app.use('/api/v1', apiRouter);
app.get('/health/live', (_req, res) => res.json({ status: 'ok' }));
app.use(errorHandler);             // MUST be last, MUST have 4 params
```

### Async wrapper

```js
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', authenticate, asyncHandler(controller.list));
```

### Router (declarative)

```js
router.get('/', authenticate, authorize('admin'), validate(listUsers), ctrl.list);
router.get('/me', authenticate, ctrl.getMe);
router.patch('/me', authenticate, validate(updateUser), ctrl.updateMe);
router.delete('/:id', authenticate, authorize('admin'), ctrl.remove);
```

### Validation middleware (Zod)

```js
const validate = (schema, source = 'body') => (req, _res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    return next(new ValidationError(result.error.issues.map(i => ({
      field: i.path.join('.'), message: i.message,
    }))));
  }
  req[source] = result.data;
  next();
};
```

### Typed errors + single handler

```js
export class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode; this.code = code; this.isOperational = true;
  }
}
export class ValidationError extends AppError {
  constructor(details) { super('Validation failed', 400, 'VALIDATION_ERROR'); this.details = details; }
}
export class NotFoundError extends AppError { constructor(m = 'Not found') { super(m, 404, 'NOT_FOUND'); } }
export class UnauthorizedError extends AppError { constructor(m = 'Authentication required') { super(m, 401, 'UNAUTHORIZED'); } }
export class ForbiddenError extends AppError { constructor(m = 'Access denied') { super(m, 403, 'FORBIDDEN'); } }
export class ConflictError extends AppError { constructor(m) { super(m, 409, 'CONFLICT'); } }

export function errorHandler(err, req, res, _next) {
  (req.log?.error({ err }, err.message)) ?? console.error(err);

  if (err.name === 'ValidationError' && err.errors)              // Mongoose
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR',
      details: Object.values(err.errors).map(e => ({ field: e.path, message: e.message })) } });
  if (err.code === 11000)                                        // Mongo dup key
    return res.status(409).json({ error: { code: 'DUPLICATE_KEY',
      message: `${Object.keys(err.keyValue)[0]} already exists` } });
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError')
    return res.status(401).json({ error: { code: 'INVALID_TOKEN', message: 'Invalid or expired token' } });
  if (err.isOperational)
    return res.status(err.statusCode).json({ error: { code: err.code, message: err.message, details: err.details } });

  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Something went wrong', requestId: req.id } });
}
```

### Response envelope

```js
// single:    { "data": { ... } }                        200 / 201
// collection:{ "data": [ ... ], "pagination": { "total": 142, "page": 1, "limit": 20, "totalPages": 8 } }
// delete:    204 No Content (empty body)
// error:     { "error": { "code", "message", "details?", "requestId" } }
```

## Examples

### Good — controller stays thin

```js
export class UserController {
  constructor(userService) { this.userService = userService; }
  list = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, search } = req.query;
    const { users, total } = await this.userService.list({ page: +page, limit: +limit, search });
    res.json({ data: users, pagination: { total, page: +page, limit: +limit, totalPages: Math.ceil(total / limit) } });
  });
}
```

### Bad — logic + raw DB in the route

```js
router.get('/users', async (req, res) => {
  const users = await User.find({}).populate('posts');        // DB in route
  if (req.user.role !== 'admin') return res.status(200).send('no');  // wrong status, no validation
  res.send(users);                                             // inconsistent shape, no error handling
});
```

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Business logic in routes/controllers | Untestable, duplicated | Move to service |
| `res.send(...)` mixed with `res.json(...)` | Inconsistent contract | One envelope everywhere |
| Forgetting `next(err)` in async handlers | Request hangs, unhandled rejection | Use `asyncHandler` |
| Validating inside the controller | Repeated, easy to miss | `validate()` middleware |
| `errorHandler` not last / <4 args | Never invoked | Keep it last with 4 params |
| Trusting `req.body` in queries | NoSQL injection | `express-mongo-sanitize` + validation |
| Exposing raw Mongo/JWT errors | Info leak | Map to typed error codes |
| CORS `origin: '*'` with credentials | Invalid/unsafe | Explicit origin allow-list |

## Related skills

- `backend/jwt-auth-flow`, `backend/mongodb-schema-design`, `architecture/api-design`,
  `architecture/security-review`, `frontend/axios-http-patterns`.
