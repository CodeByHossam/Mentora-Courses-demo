# SEO Practices

Apply to public pages, marketing content, and any HTML served to browsers.

## Meta tags

```html
<!-- ❌ bad -->
<title>Home</title>
<meta name="description" content="" />

<!-- ✅ good -->
<title>TrailMate — Hike planning & offline maps</title> <!-- 50-60 chars -->
<meta name="description" content="Plan hikes, sync trails offline, and share routes with your crew." /> <!-- ~150-160 chars -->
```

- Unique `<title>` per page, ~50–60 chars.
- Meta description ~150–160 chars, compelling, includes keywords naturally.
- Open Graph + Twitter cards:

```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:image" content="https://example.com/og.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

- Canonical URL; robots meta:

```html
<link rel="canonical" href="https://example.com/canonical-url" />
<meta name="robots" content="index, follow" />
```

## Structured data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "author": { "@type": "Person", "name": "..." },
  "datePublished": "2026-11-12",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://example.com/post" }
}
```

- Use Schema.org types: `Article`, `Product`, `Organization`, `BreadcrumbList`;
  match JSON-LD to visible content.

## Content & linking

- Semantic HTML first (landmarks, headings, alt text) — foundations of SEO.
- Descriptive image filenames + meaningful alt text; lazy-load below-the-fold.
- Internal linking with meaningful anchor text ("Download the pricing guide"),
  never "click here".

## Technical

- `sitemap.xml` + `robots.txt` present and valid.
- Fast Core Web Vitals (LCP, CLS, INP): preload critical assets, image
  dimensions/aspect ratios to avoid CLS, defer non-critical JS.
- Clean URL structure: lowercase, hyphenated slugs (`/blog/react-clean-code`).
- SSR/SSG for SEO-critical pages (Next.js/Remix); static for mostly-static content.
- Mobile-first, responsive design.

## Accessibility = SEO

- Good contrast, alt text, headings, keyboard navigation all reinforce ranking.

## Checklist

- [ ] Unique `<title>` (50–60 chars); meta description (150–160 chars)
- [ ] Open Graph + Twitter cards present
- [ ] Canonical URL + robots meta set
- [ ] JSON-LD structured data valid and accurate
- [ ] Semantic HTML used
- [ ] Image alt + descriptive filenames; lazy-load below fold
- [ ] Internal linking, meaningful anchor text
- [ ] `sitemap.xml` + `robots.txt`
- [ ] Core Web Vitals targets; preload critical assets
- [ ] Clean URLs, lowercase hyphenated slugs
- [ ] SSR/SSG for SEO-critical pages
- [ ] Mobile-first, responsive; accessible = better SEO
