# React Native Clean Code

React principles + React Native (Expo) specifics. Load whenever the task
touches RN code, screens, native modules, or mobile build files.

## Folder structure

```text
src/
├── components/
├── screens/
├── navigation/
├── hooks/
├── services/
├── utils/
├── theme/
└── App.tsx
```

## Styling

```js
// ❌ bad — inline style object
const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 12 },
});

// in render:
<View style={{ padding: 12 }} />

// ✅ good — StyleSheet.create
const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 12 },
});
```

- Use `StyleSheet.create`; never inline style objects in render.
- Named, composable style objects.

## Lists

```jsx
// ❌ bad — anonymous fn + index key
<FlatList
  data={items}
  renderItem={({ item }) => <Text>{item.name}</Text>}
  keyExtractor={(item, i) => String(i)}
/>;

// ✅ good — stable keys, memoized row, getItemLayout when known
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
  // or: memoized row component
/>
```

- `FlatList`/`SectionList` with stable `keyExtractor`; `getItemLayout` and
  `memo` for long lists; avoid anonymous functions in perf-critical render.

## Layout

- `SafeAreaView`, `KeyboardAvoidingView` for correct safe-area / keyboard layout.
- Platform-specific files (`.ios.tsx`, `.android.tsx`) when needed — no
  platform-specific hacks without a clear comment.

## Navigation

- Keep route param types typed; avoid passing large objects as params — pass an
  `itemId` and fetch.

## State

- Prefer local state → context → Redux/Zustand only when shared/global is needed.

## Images

- Resize and cache; use `FastImage` when appropriate.
- Optimize before upload.

## App state & deep links

- Handle app state changes and deep links cleanly; clean up listeners/subscriptions.

## Permissions & accessibility

- Handle permissions gracefully (request just-in-time, handle denials).
- Accessibility props: `accessible`, `accessibilityLabel`, `accessibilityRole`,
  `accessibilityValue`.

## Testing

- Test on both platforms; no platform-specific hacks without a comment.

## Performance checklist

- [ ] `StyleSheet.create` used
- [ ] FlatList has `keyExtractor`, `getItemLayout`/`memo` for long lists
- [ ] No anonymous functions in perf-critical render
- [ ] Safe area / keyboard handling present
- [ ] Typed navigation params
- [ ] Local → context → store state ladder respected
- [ ] Images optimized/cached
- [ ] Permissions + deep links handled
- [ ] a11y props set
- [ ] Tested on both platforms
