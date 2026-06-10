# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Build for production (outputs to dist/)
pnpm preview    # Preview production build locally
```

## Architecture

This is a minimal Astro 6 portfolio site using the default template as a starting point. The structure follows Astro conventions:

- `src/pages/` - file-based routing; `index.astro` is the homepage
- `src/layouts/` - `Layout.astro` wraps pages with the HTML shell (`<head>`, `<body>`, global styles)
- `src/components/` - reusable `.astro` components; currently just `Welcome.astro`
- `src/assets/` - static SVG assets imported directly into components

No framework integrations (React, Vue, etc.) or content collections are configured yet. TypeScript is set to strict mode via `astro/tsconfigs/strict`.

## Code Quality & Scalability

This project will be sold to customers. Treat it as a product.

**Naming is the highest-priority decision.** Directory names, route segments, file names, and component names must be immediately obvious, consistent, and scalable - a customer or future dev should understand the structure without reading code. Rename aggressively when a name is ambiguous or too narrow.

Maximise in this order:
1. **Usability** - the final output must be intuitive for end users
2. **Configurability** - features should be driven by config/props/data, not hardcoded
3. **Theming** - styles should be token-based and swappable per customer
4. **Internationalisation (i18n)** - all user-facing strings must be externalised; routes should support locale prefixes from the start

Code should be readable and reusable first. Abstractions are justified when they eliminate duplication across customer instances or make a feature configurable. Premature optimisation is not.

## Performance

Performance comes **after** readability and scalability. Don't sacrifice clean code for micro-optimisations.

Focus only on changes with the highest client-side download impact:
- Compress and convert images (WebP/AVIF); use Astro's `<Image />` component for automatic optimisation
- Lazy-load below-the-fold images and heavy components
- Rely on Astro's built-in static output, code-splitting, and asset hashing before reaching for manual optimisations
- Enable Brotli/gzip at the hosting/CDN layer, not in application code
