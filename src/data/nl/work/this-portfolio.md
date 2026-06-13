---
title: "Dit Portfolio"
description: "Een portfolio dat zich gedraagt als een AI-chatvenster - gebouwd met Astro 6, Preact islands en een multi-thema systeem op basis van tokens."
pubDate: 2026-06-08
tags: ["Astro", "Preact", "Ontwerpsystemen"]
url: ""
---

Je kijkt er nu naar.

Ik wilde dat mijn portfolio minder als een cv zou aanvoelen en meer als een gesprek. Daarom heb ik het gebouwd als een AI-chatvenster: je typt in een groot zoekveld en de site antwoordt met wat je zoekt.

## Het idee

De meeste portfolio's zijn een muur van kaartjes waar je langs scrolt. Ik wilde iets waar je *mee kunt praten*. De hele site draait om één zoekveld: begin te typen en de projecten en artikelen filteren zich voor je ogen. Geen backend, geen laadspinners - een kleine JSON-index wordt tijdens de build gemaakt en rechtstreeks in de browser gefilterd.

## Hoe het gebouwd is

Ik koos voor **Astro 6** omdat het standaard geen JavaScript meestuurt en Markdown als volwaardige burger behandelt. Het grootste deel van de site is gewone statische HTML: laadt razendsnel, niets om te hydrateren.

De twee onderdelen die écht interactief moeten zijn - de zoekbalk en de themaswitcher - draaien als **Preact islands**. De rest blijft statisch.

## Thema's

Het hele uiterlijk leunt op CSS custom properties, dus het complete kleurenpalet omgooien is een kwestie van een paar tokens aanpassen. Er komen standaard vier thema's mee:

| Thema | De sfeer |
|---|---|
| **Dark** | Bijna zwart met een blauw accent - de standaard |
| **Light** | Strak gebroken wit, hetzelfde blauw |
| **Solarized** | Het klassieke palet van Ethan Schoonover |
| **Aderberry** | Warm amber en sepia, een vleugje terminal-nostalgie |

> Een klein detail waar ik trots op ben: een piepklein inline-script leest je opgeslagen thema nog vóór de pagina wordt getekend, zodat je bij het laden geen vervelende flits van de verkeerde kleuren ziet.

## Wat er nog komt

- Echte case studies van projecten
- Meer schrijfsels over ontwerp en techniek
- Volledige meertalige routing (misschien lees je nu al een van die vertalingen)

---

**Gebouwd met** Astro 6 · Preact · Archivo + Space Grotesk
