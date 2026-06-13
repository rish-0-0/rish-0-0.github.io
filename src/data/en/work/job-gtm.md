---
title: "Job Boards GTM Intelligence Platform"
description: "A distributed pipeline that scrapes ~50,000 job listings across multiple boards and enriches them with AI-generated metadata for semantic search."
pubDate: 2025-11-20
tags: ["Python", "TypeScript", "pgvector", "Temporal", "RabbitMQ", "LLM"]
url: "https://github.com/rish-0-0/job-gtm"
linkLabel: "GitHub"
---

A scalable go-to-market intelligence pipeline that harvests job listings from multiple job boards and turns them into a semantically searchable dataset. The core insight: scrape **listing pages** (~20 jobs each) instead of individual job pages, cutting ~50,000 requests down to ~2,500 while still extracting most of the metadata from the job cards.

## How it works

The data flows through a single, well-defined path:

```
Scrapers → RabbitMQ → AI Enrichment → PostgreSQL (pgvector)
```

Temporal orchestrates the workflows, and Redis sits in front of the expensive operations as a caching layer.

## Scraping without getting blocked

Listings are collected with **Puppeteer** driving a headless browser. The scrapers stay under the radar with rate limiting and request delays, user-agent rotation, and headless browser simulation - distributing the load across boards so no single source gets hammered.

## AI enrichment

Each job is enriched and embedded for semantic search:

- **Embeddings** use `sentence-transformers/all-MiniLM-L6-v2` (384 dimensions, ~40ms on CPU), stored in PostgreSQL via the **pgvector** extension.
- **Text-to-SQL** generation lets users query the dataset in natural language.
- **Query caching** in Redis cuts down on repeated LLM token spend.

During development the pipeline runs against a local **Ollama** model (zero LLM cost). In production the cost scales with the chosen model - enriching 50,000 jobs is roughly 140M input tokens, ranging from ~$25 on GPT-4o mini to ~$600 on Claude Sonnet.

## Built to scale to 1M+ records

The architecture scales horizontally by design: RabbitMQ provides backpressure handling, Temporal coordinates distributed work, consumers run as multiple replicas, and pgvector indexing plus Redis result caching keep queries fast under load. The whole system comes up with a single command - `docker compose up -d --build` brings the database, message broker, workflow engine, cache, local LLM, API, and frontend online together.

## Stack

- **Backend & data:** Python, PostgreSQL + pgvector, RabbitMQ, Redis, Temporal, Ollama
- **Frontend & API:** TypeScript, Node.js API server, React UI
- **Scraping:** Puppeteer, custom rate-limited scrapers with user-agent rotation
- **Infrastructure:** Docker & Docker Compose, PL/pgSQL database functions, shell scripting
