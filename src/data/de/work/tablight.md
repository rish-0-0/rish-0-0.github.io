---
title: "TabLight - Spotlight für Chrome-Tabs"
description: "Eine tastaturgesteuerte Befehlspalette für Chrome, die deine offenen Tabs, Lesezeichen, kürzlich geschlossenen Tabs und Chrome-eigenen Seiten per Fuzzy-Suche durchsucht - plus Alt+Q-Schnellwechsel zwischen deinen zwei letzten Tabs."
pubDate: 2026-02-18
tags: ["JavaScript", "Chrome Extension", "IndexedDB", "Fuzzy-Suche", "Produktivität"]
url: "https://github.com/rish-0-0/tablight"
linkLabel: "GitHub"
---

Wenn du mit Dutzenden offenen Tabs lebst, wird die Tab-Leiste nutzlos - alles schrumpft zu einer Reihe identischer Favicons zusammen. TabLight ersetzt die Sucherei durch eine Befehlspalette: `Strg/Cmd+Shift+K` drücken, tippen und direkt zum Gewünschten springen.

## Was es wirklich tut

Es ist ein einziges Suchfeld, das alles abdeckt, was du erreichen willst, gruppiert in Abschnitte:

- **Offene Tabs** - sofort zu jedem Tab in jedem Fenster wechseln.
- **Lesezeichen** - in neuem Tab öffnen, danach sortiert, wie oft du sie tatsächlich nutzt.
- **Kürzlich geschlossen** - Tabs aus Chromes Sitzungsverlauf wiederherstellen.
- **Kürzlich aufgerufen** - deine zuletzt genutzten Tabs, für schnelles Hin und Her.
- **Chrome-Seiten** - Schnellzugriff auf Eingebautes wie Einstellungen und Passwortmanager.

Ein zweites Kürzel, `Alt+Q`, macht den Alt+Tab-Trick für Tabs: Es wechselt zum zuvor aktiven Tab, sodass du ohne Maus zwischen zwei Tabs springen kannst.

## Das Sucherlebnis

Die Suche ist in Echtzeit und entprellt (~100ms). Während du tippst, werden Ergebnisse live neu sortiert, passende Zeichen hervorgehoben, und ein Inline-Autocomplete schlägt die Vervollständigung des Top-Treffers vor - mit `Tab` übernehmen. Alles ist tastatur-first: Pfeiltasten bewegen sich durch die flache Ergebnisliste (die Auswahl scrollt ins Bild), `Enter` öffnet den markierten Eintrag, `Escape` leert das Feld. Jedes Ergebnis zeigt Favicon, Titel, gekürzten Hostnamen + Pfad und ein Typ-Badge.

## Wie es schnell und aktuell bleibt

Ein Background-Worker hält einen Index synchron, während Tabs erstellt, geladen, aktiviert und geschlossen werden - und überspringt privilegierte `chrome://`-URLs, die er nicht lesen kann. Ein Content-Script holt Meta-Beschreibung und Keywords jeder Seite, damit der Index mehr als nur den Titel zum Matchen hat. Lesezeichen- und Tab-Events aktualisieren Nutzungsstatistiken (Zugriffszahl, letzter Zugriff), die in das Ranking einfließen.

Alles liegt clientseitig in **IndexedDB** über vier Stores - Tabs, Lesezeichen, eine begrenzte MRU-Liste und Einstellungen - sodass nichts den Browser verlässt. Das Ranking ist ein eigener Durchlauf statt einer Bibliothek: exakter Titeltreffer am höchsten, dann Titel enthält Begriff, URL-Treffer und Treffer pro Begriff, mit einem zeichenweisen Fuzzy-Match als Bonus für teilweise Übereinstimmung. Ergebnisse werden nach Score, dann nach Aktualität sortiert.

## Stack

- **Plattform:** Chrome-Extension-APIs - Background-Service-Worker, Content-Script, Side Panel, Tastaturbefehle, Sessions- & Bookmarks-APIs
- **Sprache:** JavaScript, HTML, CSS
- **Speicher:** IndexedDB (vier Object Stores, vollständig lokal)
- **Suche:** eigener Begriffs-Scoring- + Fuzzy-Matching-Algorithmus mit Live-Autocomplete
- **Tooling:** Shell-Skripte zum Paketieren; veröffentlicht im Chrome Web Store
