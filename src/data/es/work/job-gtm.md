---
title: "Plataforma de Inteligencia GTM para Portales de Empleo"
description: "Un pipeline distribuido que extrae ~50.000 ofertas de empleo de múltiples portales y las enriquece con metadatos generados por IA para búsqueda semántica."
pubDate: 2025-11-20
tags: ["Python", "TypeScript", "pgvector", "Temporal", "RabbitMQ", "LLM"]
url: "https://github.com/rish-0-0/job-gtm"
linkLabel: "GitHub"
---

Un pipeline escalable de inteligencia go-to-market que recopila ofertas de empleo de múltiples portales y las convierte en un conjunto de datos consultable semánticamente. La idea clave: extraer **páginas de listados** (~20 empleos cada una) en lugar de páginas individuales, reduciendo ~50.000 solicitudes a ~2.500 mientras se obtiene la mayor parte de los metadatos de las tarjetas de empleo.

## Cómo funciona

Los datos siguen un único camino bien definido:

```
Scrapers → RabbitMQ → Enriquecimiento con IA → PostgreSQL (pgvector)
```

Temporal orquesta los flujos de trabajo, y Redis actúa como capa de caché frente a las operaciones costosas.

## Extracción sin ser bloqueado

Los listados se recopilan con **Puppeteer** controlando un navegador headless. Los scrapers pasan desapercibidos mediante rate limiting y retardos en las solicitudes, rotación de user-agents y simulación de navegador headless — distribuyendo la carga entre portales para que ninguna fuente se sature.

## Enriquecimiento con IA

Cada empleo se enriquece y se vectoriza para la búsqueda semántica:

- Los **embeddings** usan `sentence-transformers/all-MiniLM-L6-v2` (384 dimensiones, ~40ms en CPU), almacenados en PostgreSQL mediante la extensión **pgvector**.
- La generación **text-to-SQL** permite consultar los datos en lenguaje natural.
- El **caché de consultas** en Redis reduce el gasto repetido de tokens del LLM.

Durante el desarrollo el pipeline usa un modelo local de **Ollama** (coste de LLM cero). En producción el coste escala según el modelo elegido — enriquecer 50.000 empleos son unos 140M de tokens de entrada, desde ~25 $ con GPT-4o mini hasta ~600 $ con Claude Sonnet.

## Diseñado para escalar a más de 1M de registros

La arquitectura escala horizontalmente por diseño: RabbitMQ gestiona la contrapresión, Temporal coordina el trabajo distribuido, los consumidores se ejecutan como múltiples réplicas, y la indexación de pgvector junto al caché de resultados en Redis mantienen las consultas rápidas bajo carga. Todo el sistema se levanta con un solo comando — `docker compose up -d --build` pone en marcha la base de datos, el broker de mensajes, el motor de flujos, la caché, el LLM local, la API y el frontend a la vez.

## Stack

- **Backend y datos:** Python, PostgreSQL + pgvector, RabbitMQ, Redis, Temporal, Ollama
- **Frontend y API:** TypeScript, servidor API en Node.js, UI en React
- **Scraping:** Puppeteer, scrapers propios con rate limiting y rotación de user-agents
- **Infraestructura:** Docker y Docker Compose, funciones de base de datos en PL/pgSQL, scripting de shell
