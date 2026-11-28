---
name: rtk-query-patterns
description: >-
  Redux Toolkit and RTK Query patterns: store setup with typed hooks, slices,
  createApi endpoints, tag-based cache invalidation, optimistic updates, and
  error handling. Use when adding Redux, fetching server data, wiring mutations,
  or fixing stale/over-fetching cache. Trigger phrases: "Redux Toolkit", "RTK
  Query", "createApi", "invalidate cache", "optimistic update", "provideTags",
  "store setup", "typed hooks".
---

# Redux Toolkit & RTK Query

Redux Toolkit removes boilerplate. RTK Query is the **server-state** layer:
declare endpoints once and get caching, dedupe, and refetching for free. Do not
put server data into hand-written slices.

## When to use

- Setting up a Redux store and typed hooks.
- Fetching/mutating API data with caching and invalidation.
- Adding optimistic updates or polling.
- Trigger phrases: "Redux Toolkit", "RTK Query", "createApi", "cache
  invalidation", "provideTags", "optimistic update", "typed hooks", "store setup".

## Instructions

1. Configure the store with `configureStore` and export typed `RootState`/`AppDispatch`.
2. Export typed `useSelector`/`useDispatch` hooks; use them everywhere.
3. Use `createSlice` for local client state only.
4. Use `createApi` (one per backend base URL) for server state.
5. Give queries `providesTags` and mutations `invalidatesTags` so caches update correctly.
6. Use `transformResponse` to normalize the API envelope.
7. For instant UI, do optimistic updates in `onQueryStarted` with rollback via `patchResult.undo()`.

### Store + typed hooks

```ts
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import ui from './uiSlice';

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer, ui },
  middleware: (gdm) => gdm().concat(api.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### API with tags

```ts
// store/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['User', 'Post'],
  endpoints: (b) => ({
    getUsers: b.query<User[], void>({
      query: () => 'users',
      providesTags: (result) =>
        result ? [...result.map((u) => ({ type: 'User' as const, id: u.id })), 'User'] : ['User'],
    }),
    getUser: b.query<User, string>({
      query: (id) => `users/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'User', id }],
    }),
    updateUser: b.mutation<User, { id: string; patch: Partial<User> }>({
      query: ({ id, patch }) => ({ url: `users/${id}`, method: 'PATCH', body: patch }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'User', id }],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserMutation } = api;
```

### Optimistic update

```ts
updateUser: b.mutation<User, { id: string; patch: Partial<User> }>({
  query: ({ id, patch }) => ({ url: `users/${id}`, method: 'PATCH', body: patch }),
  async onQueryStarted({ id, patch }, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(
      api.util.updateQueryData('getUser', id, (draft) => Object.assign(draft, patch)),
    );
    try { await queryFulfilled; }
    catch { patchResult.undo(); }
  },
  invalidatesTags: (_r, _e, { id }) => [{ type: 'User', id }],
}),
```

### Component usage

```tsx
function UserProfile({ id }: { id: string }) {
  const { data, isLoading, isError } = useGetUserQuery(id);
  const [update, { isLoading: saving }] = useUpdateUserMutation();

  if (isLoading) return <Skeleton />;
  if (isError) return <ErrorState />;

  return (
    <button disabled={saving} onClick={() => update({ id, patch: { active: true } })}>
      Activate
    </button>
  );
}
```

## Examples

### Good — tag-driven invalidation

```ts
providesTags: ['Post'],
invalidatesTags: ['Post'],   // any mutation refreshes the list
```

### Bad — duplicating server data in a slice

```js
const slice = createSlice({
  name: 'users',
  initialState: { list: [] },
  reducers: { setUsers: (s, a) => { s.list = a.payload; } },  // manual caching, no invalidation
});
```

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Server data in slices | Manual cache, stale data | RTK Query endpoints |
| No `providesTags`/`invalidatesTags` | Stale UI after mutations | Tag the cache |
| Constructing `fetch` by hand | No dedupe/retry | `fetchBaseQuery` |
| Untyped `useSelector`/`useDispatch` | Loses type safety | Typed hooks |
| Forgetting `api.middleware` | No cache/polling | Concatenate middleware |
| Optimistic update without rollback | UI lies on failure | `patchResult.undo()` in catch |
| One giant api for many base URLs | Wrong base URL | One `createApi` per base URL |

## Related skills

- `state/mern-data-state-decisions`, `frontend/axios-http-patterns`,
  `testing/integration-testing`, `frontend/react-hooks`.
