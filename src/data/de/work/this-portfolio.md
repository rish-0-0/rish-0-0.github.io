---
title: "Dieses Portfolio"
description: "Ein Portfolio, das sich wie ein KI-Chatfenster verhält - gebaut mit Astro 6, Preact Islands und einem token-basierten Multi-Theme-System."
pubDate: 2026-06-08
tags: ["Astro", "Preact", "Design-Systeme"]
url: ""
---

Sie schauen gerade darauf.

Ich wollte, dass sich mein Portfolio weniger wie ein Lebenslauf anfühlt und mehr wie ein Gespräch. Also habe ich es wie ein KI-Chatfenster gebaut: Man tippt in ein großes Suchfeld, und die Seite antwortet mit dem, wonach man sucht.

## Die Idee

Die meisten Portfolios sind eine Wand aus Kacheln, an der man vorbeiscrollt. Ich wollte etwas, mit dem man *reden* kann. Die ganze Seite dreht sich um ein einziges Suchfeld: Man fängt an zu tippen, und Projekte und Beiträge filtern sich vor den Augen. Kein Backend, keine Lade-Spinner - ein kleiner JSON-Index wird beim Build erzeugt und direkt im Browser gefiltert.

## Wie es gebaut ist

Ich habe mich für **Astro 6** entschieden, weil es standardmäßig kein JavaScript ausliefert und Markdown als vollwertigen Bürger behandelt. Der Großteil der Seite ist schlichtes statisches HTML: schnell geladen, nichts zu hydrieren.

Die beiden Teile, die wirklich interaktiv sein müssen - die Suchleiste und der Theme-Switcher - laufen als **Preact Islands**. Alles andere bleibt statisch.

## Themes

Das gesamte Erscheinungsbild beruht auf CSS Custom Properties, sodass sich die ganze Palette mit ein paar Tokens austauschen lässt. Vier Themes sind von Haus aus dabei:

| Theme | Die Stimmung |
|---|---|
| **Dark** | Fast Schwarz mit blauem Akzent - der Standard |
| **Light** | Klares Off-White, dasselbe Blau |
| **Solarized** | Ethan Schoonovers klassische Palette |
| **Aderberry** | Warmes Amber und Sepia, ein Hauch Terminal-Nostalgie |

> Ein kleines Detail, auf das ich stolz bin: Ein winziges Inline-Skript liest dein gespeichertes Theme, noch bevor die Seite gezeichnet wird - so gibt es beim Laden kein unschönes Aufblitzen der falschen Farben.

## Was als Nächstes kommt

- Echte Projekt-Fallstudien
- Mehr Geschriebenes über Design und Technik
- Vollständiges mehrsprachiges Routing (vielleicht liest du gerade schon eine dieser Übersetzungen)

---

**Gebaut mit** Astro 6 · Preact · Archivo + Space Grotesk
