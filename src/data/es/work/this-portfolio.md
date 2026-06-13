---
title: "Este Portafolio"
description: "Un portafolio que se comporta como una ventana de chat de IA - hecho con Astro 6, Preact islands y un sistema multi-tema basado en tokens."
pubDate: 2026-06-08
tags: ["Astro", "Preact", "Sistemas de Diseño"]
url: ""
---

Lo estás viendo ahora mismo.

Quería que mi portafolio se sintiera menos como un currículum y más como una conversación. Así que lo construí como una ventana de chat de IA: escribes en un buscador grande y el sitio te responde con lo que andabas buscando.

## La idea

La mayoría de los portafolios son un muro de tarjetas por el que haces scroll sin parar. Yo quería algo con lo que se pudiera *hablar*. Todo el sitio gira en torno a un único buscador: empiezas a escribir y los proyectos y artículos se van filtrando ante tus ojos. Sin backend, sin spinners de carga - un pequeño índice JSON se genera al compilar y se filtra directamente en el navegador.

## Cómo está hecho

Elegí **Astro 6** porque no envía nada de JavaScript por defecto y trata el Markdown como un ciudadano de primera. Casi todo el sitio es HTML estático y sencillo: carga al instante y no hay nada que hidratar.

Las dos únicas partes que de verdad necesitan ser interactivas - el buscador y el selector de temas - funcionan como **Preact islands**. Todo lo demás se queda estático.

## Los temas

Todo el aspecto se apoya en propiedades CSS personalizadas, así que cambiar la paleta entera es cuestión de tocar unos cuantos tokens. Vienen cuatro temas de fábrica:

| Tema | El ambiente |
|---|---|
| **Dark** | Casi negro con acento azul - el predeterminado |
| **Light** | Blanco roto y limpio, el mismo azul |
| **Solarized** | La paleta clásica de Ethan Schoonover |
| **Aderberry** | Ámbar y sepia cálidos, con un punto de nostalgia de terminal |

> Un pequeño detalle del que estoy orgulloso: un diminuto script en línea lee tu tema guardado antes de que la página se pinte, para que no haya ese feo destello de colores equivocados al cargar.

## Lo que viene

- Casos de estudio de proyectos reales
- Más textos sobre diseño e ingeniería
- Enrutado multilingüe completo (quizá ya estés leyendo una de esas traducciones)

---

**Hecho con** Astro 6 · Preact · Archivo + Space Grotesk
