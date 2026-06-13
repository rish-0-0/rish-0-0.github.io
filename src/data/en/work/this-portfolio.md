---
title: "This Portfolio"
description: "A portfolio that behaves like an AI chat window - built with Astro 6, Preact islands, and a token-driven multi-theme system."
pubDate: 2026-06-08
tags: ["Astro", "Preact", "Design Systems"]
url: ""
---

You're looking at it right now.

I wanted my portfolio to feel less like a résumé and more like a conversation - so I built it to look like an AI chat window. You type into a big search box, and the site answers with whatever you're after.

## The idea

Most portfolios are a wall of cards you scroll past. I wanted something you *talk to*. The whole site is built around a single search input: start typing, and projects and posts filter in front of you. No backend, no loading spinners - a small JSON index is generated at build time and filtered right in the browser.

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

## What's next

- Real project case studies
- More writing on design and engineering
- Full multilingual routing (you might be reading one of those translations now)

---

**Built with** Astro 6 · Preact · Archivo + Space Grotesk
