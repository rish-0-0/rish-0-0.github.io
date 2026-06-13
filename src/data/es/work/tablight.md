---
title: "TabLight - Spotlight para Pestañas de Chrome"
description: "Una paleta de comandos por teclado para Chrome que busca de forma difusa en tus pestañas abiertas, marcadores, pestañas cerradas recientemente y las propias páginas de Chrome - más un cambio rápido con Alt+Q entre tus dos últimas pestañas."
pubDate: 2026-02-18
tags: ["JavaScript", "Chrome Extension", "IndexedDB", "Búsqueda difusa", "Productividad"]
url: "https://github.com/rish-0-0/tablight"
linkLabel: "GitHub"
---

Si vives con decenas de pestañas abiertas, la barra de pestañas deja de servir - todo se reduce a una fila de favicons idénticos. TabLight reemplaza esa búsqueda manual por una paleta de comandos: pulsa `Ctrl/Cmd+Shift+K`, empieza a escribir y salta directamente a lo que quieres.

## Qué hace en realidad

Es un único campo de búsqueda que abarca todo lo que querrías alcanzar, agrupado en secciones:

- **Pestañas abiertas** - cambia al instante a cualquier pestaña de cualquier ventana.
- **Marcadores** - se abren en una pestaña nueva, ordenados por la frecuencia con que realmente los usas.
- **Cerradas recientemente** - restaura pestañas desde el historial de sesión de Chrome.
- **Accedidas recientemente** - tus pestañas más usadas, para ir y venir rápido.
- **Páginas de Chrome** - acceso rápido a integradas como Ajustes y el Administrador de contraseñas.

Un segundo atajo, `Alt+Q`, hace el truco de Alt+Tab para pestañas: cambia a la pestaña activa anterior, para rebotar entre dos pestañas sin tocar el ratón.

## La experiencia de búsqueda

La búsqueda es en tiempo real y con debounce (~100ms). Mientras escribes, los resultados se reordenan en vivo, los caracteres coincidentes se resaltan y un autocompletado en línea sugiere la finalización del primer resultado - pulsa `Tab` para aceptarlo. Todo es teclado primero: las flechas recorren la lista plana de resultados (la selección entra en vista al desplazarse), `Enter` abre el elemento resaltado y `Escape` limpia el campo. Cada resultado muestra un favicon, el título, un host + ruta truncados y una etiqueta de tipo.

## Cómo se mantiene rápido y actualizado

Un worker en segundo plano mantiene un índice sincronizado a medida que las pestañas se crean, cargan, activan y cierran - omitiendo URLs privilegiadas `chrome://` que no puede leer. Un content script extrae la meta descripción y las palabras clave de cada página para que el índice tenga más que el título con que coincidir. Los eventos de marcadores y pestañas actualizan estadísticas de uso (número de accesos, último acceso) que alimentan el ranking.

Todo reside en el cliente con **IndexedDB** en cuatro stores - pestañas, marcadores, una lista MRU limitada y ajustes - así que nada sale del navegador. El ranking es una pasada propia en vez de una librería: el título exacto puntúa más alto, luego que el título contenga el término, coincidencia de URL y aciertos por término, con una coincidencia difusa carácter a carácter que añade un impulso por alineación parcial. Los resultados se ordenan por puntuación y luego por recencia.

## Stack

- **Plataforma:** APIs de extensiones de Chrome - service worker en segundo plano, content script, panel lateral, comandos de teclado, APIs de sesiones y marcadores
- **Lenguaje:** JavaScript, HTML, CSS
- **Almacenamiento:** IndexedDB (cuatro object stores, totalmente local)
- **Búsqueda:** algoritmo propio de puntuación por términos + coincidencia difusa con autocompletado en vivo
- **Herramientas:** scripts de shell para empaquetar; publicada en la Chrome Web Store
