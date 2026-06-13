---
title: "Job Boards GTM Intelligence-Plattform"
description: "Eine verteilte Pipeline, die ~50.000 Stellenanzeigen über mehrere Jobbörsen hinweg scrapt und sie mit KI-generierten Metadaten für die semantische Suche anreichert."
pubDate: 2025-11-20
tags: ["Python", "TypeScript", "pgvector", "Temporal", "RabbitMQ", "LLM"]
url: "https://github.com/rish-0-0/job-gtm"
linkLabel: "GitHub"
---

Eine skalierbare Go-to-Market-Intelligence-Pipeline, die Stellenanzeigen von mehreren Jobbörsen sammelt und in einen semantisch durchsuchbaren Datensatz verwandelt. Die zentrale Erkenntnis: **Listenseiten** scrapen (~20 Jobs pro Seite) statt einzelner Stellenseiten - das reduziert ~50.000 Anfragen auf ~2.500, während die meisten Metadaten weiterhin aus den Job-Karten extrahiert werden.

## Wie es funktioniert

Die Daten durchlaufen einen einzigen, klar definierten Pfad:

```
Scraper → RabbitMQ → KI-Anreicherung → PostgreSQL (pgvector)
```

Temporal orchestriert die Workflows, und Redis liegt als Caching-Schicht vor den teuren Operationen.

## Scrapen, ohne blockiert zu werden

Anzeigen werden mit **Puppeteer** über einen Headless-Browser erfasst. Die Scraper bleiben unauffällig durch Rate Limiting und Anfrageverzögerungen, Rotation der User-Agents und Headless-Browser-Simulation - die Last wird über die Börsen verteilt, sodass keine einzelne Quelle überlastet wird.

## KI-Anreicherung

Jeder Job wird angereichert und für die semantische Suche eingebettet:

- **Embeddings** nutzen `sentence-transformers/all-MiniLM-L6-v2` (384 Dimensionen, ~40ms auf CPU), gespeichert in PostgreSQL über die **pgvector**-Erweiterung.
- **Text-to-SQL**-Generierung ermöglicht Abfragen in natürlicher Sprache.
- **Query-Caching** in Redis reduziert wiederholten LLM-Token-Verbrauch.

In der Entwicklung läuft die Pipeline gegen ein lokales **Ollama**-Modell (keine LLM-Kosten). In der Produktion skalieren die Kosten mit dem gewählten Modell - die Anreicherung von 50.000 Jobs entspricht etwa 140 Mio. Input-Tokens, von ~25 $ mit GPT-4o mini bis ~600 $ mit Claude Sonnet.

## Gebaut für die Skalierung auf 1 Mio.+ Datensätze

Die Architektur skaliert horizontal: RabbitMQ sorgt für Backpressure, Temporal koordiniert verteilte Arbeit, Consumer laufen als mehrere Replikate, und pgvector-Indizierung plus Redis-Ergebnis-Caching halten Abfragen auch unter Last schnell. Das gesamte System startet mit einem einzigen Befehl - `docker compose up -d --build` bringt Datenbank, Message-Broker, Workflow-Engine, Cache, lokales LLM, API und Frontend gemeinsam online.

## Stack

- **Backend & Daten:** Python, PostgreSQL + pgvector, RabbitMQ, Redis, Temporal, Ollama
- **Frontend & API:** TypeScript, Node.js-API-Server, React-UI
- **Scraping:** Puppeteer, eigene rate-limitierte Scraper mit User-Agent-Rotation
- **Infrastruktur:** Docker & Docker Compose, PL/pgSQL-Datenbankfunktionen, Shell-Skripte
