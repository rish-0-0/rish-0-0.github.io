---
title: "Vacaturebanken GTM Intelligence-platform"
description: "Een gedistribueerde pipeline die ~50.000 vacatures van meerdere vacaturebanken scrapet en verrijkt met AI-gegenereerde metadata voor semantisch zoeken."
pubDate: 2025-11-20
tags: ["Python", "TypeScript", "pgvector", "Temporal", "RabbitMQ", "LLM"]
url: "https://github.com/rish-0-0/job-gtm"
linkLabel: "GitHub"
---

Een schaalbare go-to-market intelligence-pipeline die vacatures van meerdere vacaturebanken verzamelt en omzet in een semantisch doorzoekbare dataset. Het kerninzicht: **lijstpagina's** scrapen (~20 vacatures per pagina) in plaats van losse vacaturepagina's — dat brengt ~50.000 verzoeken terug naar ~2.500, terwijl de meeste metadata gewoon uit de vacaturekaarten wordt gehaald.

## Hoe het werkt

De data volgt één duidelijk gedefinieerd pad:

```
Scrapers → RabbitMQ → AI-verrijking → PostgreSQL (pgvector)
```

Temporal orkestreert de workflows, en Redis fungeert als cachinglaag vóór de dure operaties.

## Scrapen zonder geblokkeerd te worden

Vacatures worden verzameld met **Puppeteer** die een headless browser aanstuurt. De scrapers blijven onopgemerkt dankzij rate limiting en vertragingen tussen verzoeken, rotatie van user-agents en headless-browsersimulatie — de belasting wordt over de banken verdeeld zodat geen enkele bron wordt overbelast.

## AI-verrijking

Elke vacature wordt verrijkt en geëmbed voor semantisch zoeken:

- **Embeddings** gebruiken `sentence-transformers/all-MiniLM-L6-v2` (384 dimensies, ~40ms op CPU), opgeslagen in PostgreSQL via de **pgvector**-extensie.
- **Text-to-SQL**-generatie laat gebruikers de data in natuurlijke taal bevragen.
- **Query-caching** in Redis beperkt herhaald LLM-tokenverbruik.

Tijdens de ontwikkeling draait de pipeline op een lokaal **Ollama**-model (geen LLM-kosten). In productie schalen de kosten mee met het gekozen model — 50.000 vacatures verrijken is ongeveer 140M invoertokens, van ~$25 met GPT-4o mini tot ~$600 met Claude Sonnet.

## Gebouwd om te schalen naar 1M+ records

De architectuur schaalt horizontaal van nature: RabbitMQ verzorgt backpressure, Temporal coördineert gedistribueerd werk, consumers draaien als meerdere replica's, en pgvector-indexering plus Redis-resultaatcaching houden queries snel onder belasting. Het hele systeem komt op met één commando — `docker compose up -d --build` zet de database, message broker, workflow-engine, cache, lokale LLM, API en frontend tegelijk online.

## Stack

- **Backend & data:** Python, PostgreSQL + pgvector, RabbitMQ, Redis, Temporal, Ollama
- **Frontend & API:** TypeScript, Node.js API-server, React UI
- **Scraping:** Puppeteer, eigen rate-limited scrapers met user-agent-rotatie
- **Infrastructuur:** Docker & Docker Compose, PL/pgSQL-databasefuncties, shellscripting
