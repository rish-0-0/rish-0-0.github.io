---
title: "Plateforme d'Intelligence GTM pour Sites d'Emploi"
description: "Un pipeline distribué qui scrape ~50 000 offres d'emploi sur plusieurs sites et les enrichit avec des métadonnées générées par IA pour la recherche sémantique."
pubDate: 2025-11-20
tags: ["Python", "TypeScript", "pgvector", "Temporal", "RabbitMQ", "LLM"]
url: "https://github.com/rish-0-0/job-gtm"
linkLabel: "GitHub"
---

Un pipeline d'intelligence go-to-market évolutif qui collecte des offres d'emploi sur plusieurs sites et les transforme en un jeu de données interrogeable sémantiquement. L'idée clé : scraper les **pages de listes** (~20 offres chacune) plutôt que les pages individuelles, réduisant ~50 000 requêtes à ~2 500 tout en extrayant l'essentiel des métadonnées depuis les cartes d'offres.

## Comment ça marche

Les données suivent un seul chemin bien défini :

```
Scrapers → RabbitMQ → Enrichissement IA → PostgreSQL (pgvector)
```

Temporal orchestre les workflows, et Redis sert de couche de cache devant les opérations coûteuses.

## Scraper sans se faire bloquer

Les listes sont collectées avec **Puppeteer** pilotant un navigateur headless. Les scrapers restent discrets grâce au rate limiting et aux délais entre requêtes, à la rotation des user-agents et à la simulation de navigateur headless - répartissant la charge entre les sites pour qu'aucune source ne soit surchargée.

## Enrichissement IA

Chaque offre est enrichie et vectorisée pour la recherche sémantique :

- Les **embeddings** utilisent `sentence-transformers/all-MiniLM-L6-v2` (384 dimensions, ~40ms sur CPU), stockés dans PostgreSQL via l'extension **pgvector**.
- La génération **text-to-SQL** permet d'interroger les données en langage naturel.
- Le **cache de requêtes** dans Redis réduit la consommation répétée de tokens du LLM.

En développement, le pipeline tourne avec un modèle **Ollama** local (coût LLM nul). En production, le coût varie selon le modèle choisi - enrichir 50 000 offres représente environ 140M de tokens d'entrée, de ~25 $ avec GPT-4o mini à ~600 $ avec Claude Sonnet.

## Conçu pour passer à plus d'1M d'enregistrements

L'architecture évolue horizontalement par conception : RabbitMQ gère la contre-pression, Temporal coordonne le travail distribué, les consommateurs s'exécutent en plusieurs réplicas, et l'indexation pgvector plus le cache de résultats Redis maintiennent des requêtes rapides sous charge. L'ensemble du système démarre avec une seule commande - `docker compose up -d --build` lance la base de données, le broker de messages, le moteur de workflows, le cache, le LLM local, l'API et le frontend ensemble.

## Stack

- **Backend & données :** Python, PostgreSQL + pgvector, RabbitMQ, Redis, Temporal, Ollama
- **Frontend & API :** TypeScript, serveur API Node.js, UI React
- **Scraping :** Puppeteer, scrapers maison avec rate limiting et rotation des user-agents
- **Infrastructure :** Docker & Docker Compose, fonctions de base de données PL/pgSQL, scripts shell
