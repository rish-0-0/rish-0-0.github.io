---
title: "Ce Portfolio"
description: "Un portfolio qui se comporte comme une fenêtre de chat IA - construit avec Astro 6, les Preact islands et un système multi-thème piloté par des tokens."
pubDate: 2026-06-08
tags: ["Astro", "Preact", "Systèmes de Design"]
url: ""
---

Vous êtes en train de le regarder.

Je voulais que mon portfolio ressemble moins à un CV qu'à une conversation. Alors je l'ai conçu comme une fenêtre de chat IA : vous tapez dans un grand champ de recherche, et le site vous répond avec ce que vous cherchez.

## L'idée

La plupart des portfolios sont un mur de cartes qu'on fait défiler sans s'arrêter. Je voulais quelque chose à qui on *parle*. Tout le site tourne autour d'un seul champ de recherche : commencez à taper, et les projets et les articles se filtrent sous vos yeux. Pas de backend, pas de spinner de chargement - un petit index JSON est généré au build et filtré directement dans le navigateur.

## Comment c'est fait

J'ai choisi **Astro 6** parce qu'il n'envoie aucun JavaScript par défaut et qu'il traite le Markdown comme un citoyen de première classe. L'essentiel du site est du simple HTML statique : rapide à charger, rien à hydrater.

Les deux seules parties qui ont vraiment besoin d'être interactives - la barre de recherche et le sélecteur de thèmes - tournent comme des **Preact islands**. Tout le reste reste statique.

## Les thèmes

Toute l'apparence repose sur des propriétés CSS personnalisées : changer la palette entière se résume à modifier quelques tokens. Quatre thèmes sont livrés d'office :

| Thème | L'ambiance |
|---|---|
| **Dark** | Presque noir, accent bleu - celui par défaut |
| **Light** | Blanc cassé épuré, le même bleu |
| **Solarized** | La palette classique d'Ethan Schoonover |
| **Aderberry** | Ambre et sépia chaleureux, une pointe de nostalgie du terminal |

> Un petit détail dont je suis fier : un minuscule script en ligne lit votre thème enregistré avant même que la page ne s'affiche, pour éviter ce flash désagréable des mauvaises couleurs au chargement.

## La suite

- De vraies études de cas
- D'autres textes sur le design et l'ingénierie
- Un routage multilingue complet (vous lisez peut-être déjà l'une de ces traductions)

---

**Construit avec** Astro 6 · Preact · Archivo + Space Grotesk
