---
title: "This Portfolio"
description: "A portfolio that behaves like an AI chat window - built with Astro 6, Preact islands, a token-driven multi-theme system, and full multilingual routing across six languages."
pubDate: 2026-06-08
tags: ["Astro", "Preact", "i18n", "Design Systems"]
url: ""
---

You're looking at it right now.

I wanted my portfolio to feel less like a résumé and more like a conversation - so I built it to look like an AI chat window. You type into a big search box, and the site answers with whatever you're after.

## The idea

Most portfolios are a wall of cards you scroll past. I wanted something you *talk to*. The whole site is built around a single search input: start typing, and projects, posts, and pages filter in front of you. No backend, no loading spinners - a small JSON index is generated at build time and filtered right in the browser.

The search is a little smarter than a plain substring match. Your query is split into tokens and each entry is ranked by how many of them it hits - across titles, descriptions, tags, and a set of keyword aliases - so "hire" finds the contact page and "projects" surfaces my work. And if nothing matches, it never dead-ends: you always get pointed to a way to reach me.

## How it's built

I reached for **Astro 6** because it ships zero JavaScript by default and treats Markdown as a first-class citizen. Most of the site is plain static HTML - quick to load, nothing to hydrate.

The two pieces that genuinely need to be interactive - the search bar and the theme switcher - run as **Preact islands**. Everything else stays static.

## Theming

The whole look is driven by CSS custom properties, so swapping the entire palette is a matter of changing a few tokens. Four themes ship out of the box:

| Theme | The vibe |
|---|---|
| **Dark** | Near-black with a blue accent - the default |
| **Light** | Clean off-white, same blue |
| **Solarized** | Ethan Schoonover's classic palette |
| **Aderberry** | Warm amber and sepia, a little terminal-nostalgic |

> One small detail I'm proud of: a tiny inline script reads your saved theme before the page paints, so there's no jarring flash of the wrong colors on load.

## Speaking your language

The site ships in six languages - English, Hindi, Spanish, French, German, and Dutch - and you might be reading one of those translations right now. Every user-facing string lives in a typed translation file, and the Markdown content is authored per language, so nothing is hard-coded.

English is served from the root (`/work`) for the cleanest URLs and best SEO, while the other languages sit behind a prefix (`/es/work`). That's done with a single rest-parameter route that quietly drops the prefix for the default language - one set of pages, six locales, no duplication.

## What's next

- Real project case studies
- More writing on design and engineering
- Sharper search ranking as the content grows

---

**Built with** Astro 6 · Preact · TypeScript · Archivo + Space Grotesk
