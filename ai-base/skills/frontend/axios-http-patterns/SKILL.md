---
name: axios-http-patterns
description: >-
  Axios patterns for browser and Node: configured instances, auth/error
  interceptors, token refresh, cancellation, timeouts, and file upload/download.
  Use for API calls outside RTK Query. Trigger phrases: "axios instance",
  "interceptor", "auth header", "upload file", "download", "cancel request",
  "timeout", "handle API error", "baseURL".
---

# Axios HTTP Patterns

Create one configured instance per backend and route every call through it.
Interceptors centralize auth, error normalization, and refresh. Native `fetch`
is the fallback when you want zero dependencies.

## When to use

- Making API calls that are not cached server state (one-off, upload, download).
- Adding auth headers, retries, error normalization, or refresh.
- Trigger phrases: "axios instance", "interceptor", "auth header", "upload",
  "download", "cancel request", "timeout", "handle API error".

Choose the client the project already uses (check `package.json`); do not mix
clients in one project.

## Instructions

1. Create one `axios.create()` instance with `baseURL`, `timeout`, and `withCredentials`.
2. Attach the access token in a request interceptor.
3. Normalize errors and handle 401 (with single-flight refresh + queue) in a response interceptor.
4. Type every response with generics; never trust `any`.
5. Cancel requests on unmount with `AbortController`.
6. Use `FormData` for uploads and `responseType: 'blob'` for downloads.

### Configured instance

```ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1',
  timeout: 10000,
  withCredentials: true,                 // send refresh cookie
  headers: { 'Content-Type': 'application/json' },
});
```

### Interceptors

```ts
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) await refreshOnce(error.config);
    return Promise.reject(normalizeError(error));
  },
);

export interface ApiError { error: { code: string; message: string; details?: unknown } }
```

### Typed calls + error handling

```ts
const { data } = await api.get<User[]>('/users', { params: { page: 1, limit: 20 } });

try {
  await api.post('/users', payload);
} catch (err) {
  if (axios.isAxiosError(err)) {
    const apiError = err.response?.data as ApiError | undefined;
    toast.error(apiError?.error.message ?? 'Request failed');
  }
}
```

### Cancellation

```ts
useEffect(() => {
  const ctrl = new AbortController();
  api.get('/search', { params: { q }, signal: ctrl.signal }).catch((e) => {
    if (!axios.isCancel(e)) throw e;
  });
  return () => ctrl.abort();
}, [q]);
```

### File upload / download

```ts
const form = new FormData();
form.append('file', file);
await api.post('/uploads', form, {
  headers: { 'Content-Type': 'multipart/form-data' },
  onUploadProgress: (e) => setPct(Math.round((e.loaded / (e.total ?? 1)) * 100)),
});

const blob = await api.get('/reports/1.pdf', { responseType: 'blob' });
saveAs(new Blob([blob.data]), 'report.pdf');
```

## Examples

### Good — instance + interceptor, no repetition

```ts
export const usersApi = {
  list: (p: Params) => api.get<User[]>('/users', { params: p }).then((r) => r.data),
  create: (b: NewUser) => api.post<User>('/users', b).then((r) => r.data),
};
```

### Bad — global axios, no timeout, leaky token

```ts
axios.get('/users');                                  // no instance, no base URL
localStorage.setItem('log', JSON.stringify(config));  // logs tokens/secrets
```

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Global `axios` with full URLs | Env coupling | Instance + `baseURL` |
| No `timeout` | Requests hang | Set a timeout |
| Duplicating auth logic | Drifts, misses routes | Request interceptor |
| No error normalization | Scattered error shapes | Response interceptor |
| Untyped responses | Type holes | Generics `axios.get<User>` |
| Not cancelling on unmount | Memory leaks, race conditions | `AbortController` |
| Logging request/response bodies | Secret leakage | Redact sensitive fields |
| Mixing axios + fetch + ky | Inconsistent behavior | Pick one, stay consistent |

## Related skills

- `backend/jwt-auth-flow`, `frontend/rtk-query-patterns`,
  `state/mern-data-state-decisions`, `workflow/env-and-secrets`.
