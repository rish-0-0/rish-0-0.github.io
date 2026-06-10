---
title: "This Portfolio"
description: "An AI chat interface–style portfolio built with Astro 6, Preact islands, and a custom multi-theme system."
pubDate: 2025-06-08
tags: ["Astro", "Preact", "Design Systems"]
url: ""
---

You're looking at it.

## What it is

A personal portfolio designed to feel like an AI chat interface - a large search input, a collapsible sidebar, and content rendered as beautiful Markdown. The search is entirely client-side, with no backend: a static JSON index is generated at build time and filtered in the browser.

## Technical decisions

**Astro 6** was chosen for its content collections, zero-JS-by-default output, and excellent Markdown/MDX support with Shiki syntax highlighting.

**Preact islands** power the two interactive pieces: the search bar and the theme switcher. Everything else is static HTML.

**Theme system** is built on CSS custom properties. Four themes ship by default:

| Theme | Vibe |
|---|---|
| Dark | Near-black, blue accent - the default |
| Light | Clean off-white, same blue accent |
| Solarized | Ethan Schoonover's classic palette |
| Aderberry | Retro amber/sepia - warm, terminal-adjacent |

A synchronous inline script in `<head>` reads the saved theme from `localStorage` before the first paint, eliminating flash of unstyled content (FOUC).

## What's next

- Real project case studies
- Blog posts on design and engineering
- Possibly: i18n routing for multilingual visitors

## Stack

- **Framework:** Astro 6
- **Islands:** Preact
- **Fonts:** Archivo (headings) + Space Grotesk (body)
- **Hosting:** TBD
