---
name: react-hooks
description: >-
  React hooks correctness: useEffect dependencies and when NOT to use an Effect,
  deriving state instead of syncing it, stale closures, useMemo/useCallback
  tradeoffs, refs, and custom hook extraction. Use when writing or reviewing
  hooks. Trigger phrases: "useEffect dependencies", "infinite loop", "stale
  closure", "derive state", "useMemo vs useCallback", "custom hook", "side effect".
---

# React Hooks

Effects are an escape hatch for synchronizing with **external** systems. If no
external system is involved, you usually do not need an Effect. Most hook bugs
come from syncing state that should be derived, wrong dependencies, and
premature memoization.

## When to use

- Writing or reviewing `useEffect`, `useState`, `useRef`, `useMemo`, `useCallback`.
- An effect runs too often, loops, or misses a dependency.
- You are tempted to copy props into state or "sync" two state values.
- Extracting reusable logic into a custom hook.
- Trigger phrases: "useEffect deps", "infinite loop", "stale closure",
  "derive state", "memoization", "custom hook", "side effect".

## Instructions

1. Before writing an Effect, ask: is there an external system? If not, derive during render instead.
2. Never copy props/state into state just to "sync" them — compute on render.
3. Reset component state on identity change with a `key`, not an Effect.
4. Keep the dependency array complete and honest; don't suppress the lint rule.
5. Get fresh values inside effects with a "latest ref" instead of omitting deps.
6. Memoize only when you can name the expensive computation or reference-stability need.
7. Extract custom hooks to share logic, not to skip composition.

### "You might not need an Effect"

| Situation | Don't | Do |
|---|---|---|
| Value derived from props/state | `useState` + Effect to sync | Compute during render |
| Reset state when a prop changes | Effect that calls setState | Pass a `key` |
| Adjust state on prop change | Effect | Derive, or update in the event handler |
| Notify parent of a change | Effect calling parent setter | Call the handler where the change happens |
| Fetch data | Effect + manual cache | RTK Query / a data layer |
| Subscribe to external store | Effect + setState | `useSyncExternalStore` |

```jsx
// Bad: syncing state to a prop
function List({ items }) {
  const [visible, setVisible] = useState(items);
  useEffect(() => setVisible(items), [items]);   // redundant render, can desync
}

// Good: derive during render, no state
function List({ items, filter }) {
  const visible = items.filter((i) => i.includes(filter));
}
```

### Complete dependencies + latest ref

```jsx
function useInterval(callback, delay) {
  const latest = useRef(callback);
  useEffect(() => { latest.current = callback; });     // keep fresh without re-subscribing
  useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => latest.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

### useMemo / useCallback — only when justified

```jsx
// Use memo when the computation is genuinely expensive OR identity matters
const sorted = useMemo(() => expensiveSort(rows), [rows]);          // expensive
const onSelect = useCallback((id) => select(id), [select]);         // stable ref to memo child

// Don't wrap cheap work — the memo cost exceeds the savings
const label = `Count: ${count}`;                                    // not useMemo
```

### Stale closures

```jsx
// Bad: handler closes over old count forever
useEffect(() => { const id = setInterval(() => setCount(count + 1), 1000); return () => clearInterval(id); }, []);

// Good: functional update needs no dependency on count
useEffect(() => { const id = setInterval(() => setCount((c) => c + 1), 1000); return () => clearInterval(id); }, []);
```

## Examples

### Good — event-driven instead of effect-driven

```jsx
function Search({ onResults }) {
  const [q, setQ] = useState('');
  const submit = async () => onResults(await api.search(q)); // action, not effect
  return <input value={q} onChange={(e) => setQ(e.target.value)} onBlur={submit} />;
}
```

### Bad — state sync loop

```jsx
const [full, setFull] = useState('');
useEffect(() => setFull(`${first} ${last}`), [first, last]); // should be derived
```

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Deriving state via Effect | Extra renders, desync | Compute during render |
| Copying props to state | Stale copies | Use props directly |
| Omitting deps to "fix" loops | Stale closures, bugs | Latest-ref pattern |
| `useMemo`/`useCallback` everywhere | Overhead, noise | Memoize only justified work |
| Fetching in `useEffect` by hand | No cache/dedupe | RTK Query / data layer |
| `setState` in render | Infinite loop | Move to handler/effect |
| Custom hook that returns JSX | Not a hook | Make it a component |

## Related skills

- `frontend/react-component-patterns`, `frontend/react-performance`,
  `frontend/rtk-query-patterns`.
