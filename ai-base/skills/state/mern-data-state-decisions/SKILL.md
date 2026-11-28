---
name: mern-data-state-decisions
description: >-
  Single source of truth for choosing how to fetch, cache, or store data in a
  MERN + React app using RTK Query, Redux Toolkit slices, useState/useReducer,
  Context, or Axios. Use when deciding where state should live or how to fetch
  data. Trigger phrases: "where should this state live", "should I use Redux",
  "fetch data", "cache", "loading state", "form state", "modal state",
  "invalidate cache", "refetch", "one-off API call".
---

# MERN Data & State Decisions

One rule above all: **ask what KIND of state it is before picking a tool.**
This project uses **RTK Query** for server state, **Redux Toolkit slices** for
shared client state, **useState/useReducer** for local UI state, and **Axios**
for special transport cases. (No Zustand.)

## When to use

- Deciding where a piece of state should live.
- Choosing between RTK Query, a Redux slice, local state, or Axios.
- Trigger phrases: "where should this state live", "should I use Redux",
  "fetch data", "cache", "loading state", "form state", "modal state",
  "invalidate cache", "refetch".

## Decision logic (read first)

1. Is it **server data** (from an API, shared, can go stale, needs caching)?
   → **RTK Query**. Stop. Do not reach for Axios or useState out of habit.
2. Is it **client/UI state** (local, form input, modal, tab, filter)?
   → **useState**. If shared across distant components or must survive navigation → **Redux slice**.
3. Is it a **special transport case** (upload progress, one-off call, blob download)?
   → **Axios** (one configured instance).
4. Is it **URL-representable** (filters, pagination, current tab)?
   → URL search params (`useSearchParams`).
5. Is it **form state**?
   → Keep it local with the form library. Do not put it in Redux.

```
Server data ......... RTK Query endpoints (cache, tags, dedupe)
Shared client state . Redux slice (auth user, feature flags, multi-step wizard)
Local UI state ...... useState / useReducer
URL state ........... search params
Form state .......... Formik / React Hook Form (local)
Special transport ... Axios (uploads, one-off, interceptor-heavy)
```

## Instructions

1. Classify the state with the decision logic before writing code.
2. Server data: define endpoints in `createApi`, tag them, never mirror into slices.
3. Client state that many components read/write: a `createSlice` with typed hooks.
4. Local-only state: `useState`; related fields with state-machine semantics: `useReducer`.
5. Model async UI with a status field (`idle | loading | success | error`), not three separate booleans.
6. Use Axios only for transport cases RTK Query doesn't fit (progress, blobs).
7. Auth: access token in memory (Redux slice), refresh in httpOnly cookie; refresh via RTK Query or the Axios interceptor.

### Server state with RTK Query

```ts
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['User'],
  endpoints: (b) => ({
    getUsers: b.query<User[], void>({ query: () => 'users', providesTags: ['User'] }),
    updateUser: b.mutation<User, { id: string; patch: Partial<User> }>({
      query: ({ id, patch }) => ({ url: `users/${id}`, method: 'PATCH', body: patch }),
      invalidatesTags: ['User'],
    }),
  }),
});
```

### Shared client state with a slice

```ts
const authSlice = createSlice({
  name: 'auth',
  initialState: { accessToken: null as string | null, user: null as User | null },
  reducers: {
    setCredentials: (s, a) => { s.accessToken = a.payload.accessToken; s.user = a.payload.user; },
    clear: (s) => { s.accessToken = null; s.user = null; },
  },
});
export const { setCredentials, clear } = authSlice.actions;
```

### Local UI state with a state machine

```tsx
const [state, dispatch] = useReducer(reducer, { status: 'idle', data: null, error: null });
// reducer: FETCH_START | FETCH_SUCCESS | FETCH_ERROR | RESET
```

### URL state

```tsx
const [params, setParams] = useSearchParams();
const page = Number(params.get('page') ?? 1);
setParams({ page: String(page + 1) });   // shareable, back-button friendly
```

### Axios for special cases

```ts
await api.post('/uploads', formData, { onUploadProgress: (e) => setPct(...) });
```

## Examples

### Good — one home per kind of state

```tsx
const { data: users } = useGetUsersQuery();      // server state
const user = useAppSelector(s => s.auth.user);   // shared client state
const [open, setOpen] = useState(false);         // local UI state
```

### Bad — server data duplicated and hand-managed

```tsx
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
useEffect(() => {                                 // reinvents RTK Query, no cache/invalidation
  setLoading(true);
  fetch('/api/users').then(r => r.json()).then(setUsers).catch(setError).finally(() => setLoading(false));
}, []);
```

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Server data in a Redux slice | Manual cache, stale data | RTK Query |
| Hand-rolled fetch + loading booleans | No cache/dedupe, desync | RTK Query or a state machine |
| Form state in Redux | Boilerplate, churn | Local form library |
| Everything in Context | Re-render storms | Slice or colocate |
| Zustand (in this project) | Not part of the stack here | RTK slice / RTK Query |
| Duplicating server data for "speed" | Two sources of truth | Single server cache |
| Storing filters in component state only | Lost on refresh, not shareable | URL params |

## Related skills

- `frontend/rtk-query-patterns`, `frontend/axios-http-patterns`,
  `frontend/react-hooks`, `frontend/react-forms`, `backend/jwt-auth-flow`.
