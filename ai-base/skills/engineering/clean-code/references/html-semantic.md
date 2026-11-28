# Semantic HTML

Use semantic, accessible HTML for any markup you generate or refactor.

## Landmarks

```html
<!-- ❌ bad -->
<div class="header">...</div>
<div class="nav">...</div>
<div class="footer">...</div>

<!-- ✅ good -->
<header>...</header>
<nav>...</nav>
<footer>...</footer>
```

Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`,
`<footer>`. Never rely on generic `<div>` wrappers for page structure.

## Headings

```html
<!-- ❌ bad -->
<h4>Subtitle</h4>

<!-- ✅ good -->
<h2>Subtitle</h2>

<!-- ✅ one h1 per page, hierarchy preserved -->
<h1>Page title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
```

- Exactly one `<h1>` per page; headings strictly h1 → h2 → h3 (no skips).
- Heading text describes the section content.

## Buttons vs links

```html
<!-- ❌ bad -->
<div onClick={goHome}>Home</div>

<!-- ✅ good -->
<button type="button" onclick="goHome()">Home</button>
<a href="/home">Home</a>
```

- `<button>` for actions; `<a>` for navigation. Never `<div onClick>`.

## Forms

```html
<!-- ❌ bad -->
<input type="email" />

<!-- ✅ good -->
<label for="email">Email</label>
<input id="email" type="email" name="email" required />
```

- `<form>`, `<label for>`, `<fieldset>`/`<legend>` for groups.
- Use native elements; ARIA only when native semantics can't express the need.

## Media & semantic extras

```html
<figure>
  <img src="chart.png" alt="Revenue chart for Q3" />
  <figcaption>Figure 1: Q3 revenue...</figcaption>
</figure>

<time datetime="2026-11-12">November 12, 2026</time>
<address>Contact: ...</address>
```

- `<figure>`/`<figcaption>`, `<time datetime>`, `<address>`.

## Alt text & ARIA

```html
<img src="dog.jpg" alt="Golden retriever catching a ball" />
<img src="bg.jpg" alt="" /> <!-- decorative: empty alt -->
```

- Alt text describes meaning; decorative images use empty `alt=""`.
- ARIA (`role`, `aria-label`, `aria-expanded`, …) only when native semantics
  can't express it — don't override native behavior.

## Language, landmarks, skip link

```html
<html lang="en">
<body>
  <a href="#main-content" class="skip-link">Skip to content</a>
  <header>...</header>
  <main id="main-content">...</main>
  <footer>...</footer>
</body>
</html>
```

- `lang` attribute on `<html>`.
- Skip-to-content link as first focusable element.
- Landmarks with unique roles; one `<main>` per page.

## Checklist

- [ ] Semantic landmarks used (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`)
- [ ] One `<h1>`; headings hierarchical, no skips
- [ ] `<button>` for actions, `<a>` for navigation; no clickable `<div>`
- [ ] Labels on inputs; `fieldset`/`legend` for groups
- [ ] `figure`/`figcaption`, `time`, `address` where applicable
- [ ] Alt text meaningful (empty for decorative)
- [ ] ARIA only when native semantics fall short
- [ ] Skip-to-content link; `lang` on `<html>`
