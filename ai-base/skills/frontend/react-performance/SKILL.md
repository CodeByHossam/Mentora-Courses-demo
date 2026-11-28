---
name: react-performance
description: >-
  React performance: eliminating unnecessary re-renders, code splitting and lazy
  routes, bundle optimization, list virtualization, and Vite build tuning.
  Use when an app feels slow, bundles are large, or you are reviewing render
  behavior. Trigger phrases: "slow render", "re-render", "bundle size", "code
  splitting", "lazy load", "Vite build", "virtualize list", "memo".
---

# React Performance

Measure first (React DevTools Profiler, `vite --mode production` build stats,
Lighthouse). Most wins come from splitting work and stopping unnecessary
renders, not from sprinkling `memo`.

## When to use

- A component tree re-renders too often or feels janky.
- Reducing initial bundle size or improving load time.
- Tuning a Vite build (chunks, target, compression).
- Rendering long lists or heavy tables.
- Trigger phrases: "slow render", "re-render", "bundle size", "code splitting",
  "lazy", "Vite build", "virtualize", "memo".

## Instructions

1. Profile before optimizing; fix the biggest contributor.
2. Split routes and heavy components with `React.lazy` + `Suspense`.
3. Keep render work cheap; derive rather than store duplicated state.
4. Memoize only expensive computations and stable callback/object identities that feed memoized children.
5. Move state down and lift content up to limit re-render scope.
6. Virtualize long lists; don't render thousands of rows.
7. Configure the bundler for modern targets, vendor/manual chunks, and compression.

### Code splitting + lazy routes

```jsx
import { lazy, Suspense } from 'react';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings  = lazy(() => import('./pages/Settings'));

<Routes>
  <Route path="/dashboard" element={
    <Suspense fallback={<PageSkeleton />}>
      <Dashboard />
    </Suspense>
  } />
</Routes>
```

### Stop unnecessary re-renders

```jsx
// Move state down so only the small subtree re-renders
function SearchBox() { const [q, setQ] = useState(''); return <input value={q} onChange={(e) => setQ(e.target.value)} />; }

// Stable identity only when it feeds a memoized child
const onSelect = useCallback((id) => dispatch(select(id)), [dispatch]);
const Row = memo(function Row({ item, onSelect }) { /* ... */ });

// Prefer children-as-props to avoid re-rendering expensive static subtrees
<Layout sidebar={<HeavySidebar />}><Feed /></Layout>
```

### Virtualize long lists

```jsx
import { FixedSizeList } from 'react-window';
<FixedSizeList height={600} width="100%" itemCount={rows.length} itemSize={48}>
  {({ index, style }) => <div style={style}>{rows[index].name}</div>}
</FixedSizeList>
```

### Vite build tuning

```js
// vite.config.ts
export default defineConfig({
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
});
```

## Examples

### Good — routes lazy, list virtualized, small state scope

```jsx
const Heavy = lazy(() => import('./Heavy'));
<UiState.Provider><SearchBox /><Suspense fallback={null}><Heavy /></Suspense></UiState.Provider>
```

### Bad — memo everywhere, giant synchronous bundle

```jsx
const X = memo(memo(memo(Comp)));              // cargo-cult
import Everything from './Everything';         // no splitting
data.map((d) => <Row key={d.id} {...d} />);    // 10k rows rendered at once
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Optimizing without profiling | Guessing wrong | DevTools Profiler first |
| `memo`/`useCallback` everywhere | Overhead, noise | Only for justified cases |
| Deriving state in render then memoizing | Redundant work | Move state down |
| New object/array literals in props to memo children | Breaks memo | Stable refs |
| Rendering huge lists | Slow, janky | Virtualize |
| Importing whole libraries | Huge bundles | Named imports / tree-shake |
| Shipping sourcemaps/dev builds | Bloated prod | Production build/target |

## Related skills

- `frontend/react-hooks`, `frontend/react-component-patterns`,
  `architecture/caching-and-performance`, `workflow/debugging-playbook`.
