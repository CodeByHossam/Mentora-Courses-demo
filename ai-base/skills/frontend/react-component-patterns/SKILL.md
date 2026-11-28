---
name: react-component-patterns
description: >-
  React component patterns: composition over inheritance, compound components,
  explicit variants, state lifting/decoupling, controlled vs uncontrolled inputs,
  error boundaries, and list rendering. Use when designing or refactoring
  components and their APIs. Trigger phrases: "component architecture", "compound
  component", "boolean prop explosion", "children vs render props", "controlled
  input", "error boundary", "component API".
---

# React Component Patterns

Prefer composition over configuration, and explicit variants over piles of
boolean props. A good component API is hard to misuse.

## When to use

- Designing or refactoring a component and its props API.
- A component has many boolean props (`isCompact`, `isLarge`, `hasIcon`...).
- Building reusable libraries, compound components, or context providers.
- Adding error boundaries or optimizing long lists.
- Trigger phrases: "component architecture", "compound component", "boolean
  props", "render props", "controlled input", "error boundary", "list keys".

## Instructions

1. Model variants explicitly instead of accumulating booleans.
2. Prefer `children` over render props unless you need to pass data down.
3. Use compound components (`<Tabs><Tab/></Tabs>`) for coordinated, flexible UI.
4. Lift state to the nearest common ancestor; decouple state from implementation via context.
5. Choose controlled inputs when the parent owns the value; uncontrolled otherwise.
6. Wrap risky subtrees in an error boundary.
7. Give lists stable keys; never use array index for reorderable lists.

### Explicit variants instead of boolean props

```jsx
// Bad API: 2^n prop combinations
<Button isPrimary isLarge isOutline hasIcon />

// Good API: explicit, finite variants
<Button variant="primary" size="lg" icon={<Plus />} outline>Save</Button>

function Button({ variant = 'primary', size = 'md', icon, outline, children, ...rest }) {
  return (
    <button className={cx('btn', `btn--${variant}`, `btn--${size}`, { 'btn--outline': outline })} {...rest}>
      {icon}{children}
    </button>
  );
}
```

### Compound components

```jsx
const TabsCtx = createContext(null);
export function Tabs({ value, onChange, children }) {
  return <TabsCtx.Provider value={{ value, onChange }}><div role="tablist">{children}</div></TabsCtx.Provider>;
}
export function Tab({ id, children }) {
  const { value, onChange } = useContext(TabsCtx);
  const selected = value === id;
  return (
    <button role="tab" aria-selected={selected} onClick={() => onChange(id)}>
      {children}
    </button>
  );
}
// Usage: <Tabs value={tab} onChange={setTab}><Tab id="a">A</Tab><Tab id="b">B</Tab></Tabs>
```

### Decouple state from implementation

```jsx
// Provide a focused context API; consumers never touch internal state shape
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;                     // { user, isAuthenticated, login, logout }
}
```

### Controlled vs uncontrolled

```jsx
// Controlled: parent owns value (best for validation/derived UI)
<input value={email} onChange={(e) => setEmail(e.target.value)} />;

// Uncontrolled: DOM owns value (simple forms, file inputs)
<input defaultValue={email} ref={inputRef} />;
```

### Error boundary (classes only; hooks cannot catch render errors)

```jsx
class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { reportError(error, info); }
  render() { return this.state.error ? this.props.fallback : this.props.children; }
}
```

## Examples

### Good — flexible, explicit, keyed

```jsx
{todos.map((t) => <TodoRow key={t.id} todo={t} onToggle={toggle} />)}
```

### Bad — boolean explosion + missing key + index key

```jsx
<Card big round dark clickable bordered shadow />          // unclear API
{items.map((it, i) => <Row key={i} />)}                    // breaks on reorder
```

## Anti-patterns

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| Boolean prop proliferation | 2^n states, unclear API | Explicit `variant`/`size` |
| Render props for everything | Noisy, harder to read | `children` composition |
| Index as `key` | Wrong reuse on reorder | Stable domain id |
| Mutating props/state directly | Skipped renders, bugs | New objects / setters |
| Giant "god" components | Untestable | Split + compose |
| No error boundary around routes | One error blanks the app | Boundary per route |
| Context used as a global store | Re-render storms | Split contexts; use store for heavy state |

## Related skills

- `frontend/react-hooks`, `frontend/react-performance`,
  `state/mern-data-state-decisions`, `design/accessibility-wcag`.
