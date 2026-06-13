---
title: "TabLight — Spotlight voor Chrome-tabbladen"
description: "Een toetsenbordgedreven command palette voor Chrome die je open tabbladen, bladwijzers, recent gesloten tabbladen en Chrome's eigen pagina's fuzzy doorzoekt — plus een Alt+Q quick-switch tussen je twee laatste tabbladen."
pubDate: 2026-02-18
tags: ["JavaScript", "Chrome Extension", "IndexedDB", "Fuzzy zoeken", "Productiviteit"]
url: "https://github.com/rish-0-0/tablight"
linkLabel: "GitHub"
---

Als je met tientallen tabbladen open leeft, wordt de tabbalk nutteloos — alles krimpt tot een rij identieke favicons. TabLight vervangt dat zoeken door een command palette: druk op `Ctrl/Cmd+Shift+K`, begin te typen en spring direct naar wat je zoekt.

## Wat het echt doet

Het is één zoekveld dat alles bestrijkt wat je wilt bereiken, gegroepeerd in secties:

- **Open tabbladen** — schakel direct naar elk tabblad in elk venster.
- **Bladwijzers** — openen in een nieuw tabblad, gerangschikt op hoe vaak je ze echt gebruikt.
- **Recent gesloten** — herstel tabbladen uit Chrome's sessiegeschiedenis.
- **Recent geopend** — je meest recente tabbladen, voor snel heen en weer.
- **Chrome-pagina's** — snelle toegang tot ingebouwde zoals Instellingen en Wachtwoordbeheer.

Een tweede sneltoets, `Alt+Q`, doet de Alt+Tab-truc voor tabbladen: het schakelt naar het vorige actieve tabblad, zodat je zonder muis tussen twee tabbladen kunt springen.

## De zoekervaring

Zoeken is realtime en gedebounced (~100ms). Terwijl je typt worden resultaten live geherrangschikt, overeenkomende tekens gemarkeerd, en een inline autocomplete stelt de aanvulling van het topresultaat voor — druk op `Tab` om die te accepteren. Alles is toetsenbord-eerst: pijltjestoetsen lopen door de platte resultatenlijst (de selectie scrollt in beeld), `Enter` opent het gemarkeerde item, en `Escape` wist het veld. Elk resultaat toont een favicon, de titel, een afgekapte hostnaam + pad, en een type-badge.

## Hoe het snel en actueel blijft

Een background worker houdt een index gesynchroniseerd terwijl tabbladen worden aangemaakt, geladen, geactiveerd en gesloten — en slaat bevoorrechte `chrome://`-URL's over die hij niet kan lezen. Een content script haalt de meta-beschrijving en zoekwoorden van elke pagina op, zodat de index meer dan alleen de titel heeft om op te matchen. Bladwijzer- en tab-events werken gebruiksstatistieken bij (aantal keer geopend, laatst geopend) die in de rangschikking meewegen.

Alles staat client-side in **IndexedDB** over vier stores — tabbladen, bladwijzers, een begrensde MRU-lijst en instellingen — dus niets verlaat de browser. De rangschikking is een eigen ronde in plaats van een library: exacte titelmatch scoort het hoogst, dan titel die de term bevat, URL-match en matches per term, met een teken-voor-teken fuzzy match die een boost geeft voor gedeeltelijke uitlijning. Resultaten sorteren op score en daarna op recentheid.

## Stack

- **Platform:** Chrome Extension-API's — background service worker, content script, zijpaneel, toetsenbordcommando's, sessions- & bookmarks-API's
- **Taal:** JavaScript, HTML, CSS
- **Opslag:** IndexedDB (vier object stores, volledig lokaal)
- **Zoeken:** eigen term-scoring- + fuzzy-matching-algoritme met live autocomplete
- **Tooling:** shellscripts voor packaging; gepubliceerd in de Chrome Web Store
