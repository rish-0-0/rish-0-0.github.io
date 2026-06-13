---
title: "TabLight — Spotlight pour les Onglets Chrome"
description: "Une palette de commandes au clavier pour Chrome qui recherche en flou vos onglets ouverts, favoris, onglets récemment fermés et les pages internes de Chrome — plus un changement rapide Alt+Q entre vos deux derniers onglets."
pubDate: 2026-02-18
tags: ["JavaScript", "Chrome Extension", "IndexedDB", "Recherche floue", "Productivité"]
url: "https://github.com/rish-0-0/tablight"
linkLabel: "GitHub"
---

Si vous vivez avec des dizaines d'onglets ouverts, la barre d'onglets devient inutile — tout se réduit à une rangée de favicons identiques. TabLight remplace cette chasse par une palette de commandes : appuyez sur `Ctrl/Cmd+Shift+K`, commencez à taper et sautez directement à ce que vous voulez.

## Ce qu'il fait vraiment

C'est un seul champ de recherche qui couvre tout ce que vous voudriez atteindre, regroupé en sections :

- **Onglets ouverts** — basculez instantanément vers n'importe quel onglet de n'importe quelle fenêtre.
- **Favoris** — ouverts dans un nouvel onglet, classés selon la fréquence à laquelle vous les utilisez vraiment.
- **Récemment fermés** — restaurez des onglets depuis l'historique de session de Chrome.
- **Récemment consultés** — vos onglets les plus récents, pour aller-retour rapide.
- **Pages Chrome** — accès rapide aux intégrées comme Paramètres et le Gestionnaire de mots de passe.

Un second raccourci, `Alt+Q`, fait le coup de l'Alt+Tab pour les onglets : il bascule vers l'onglet précédemment actif, pour rebondir entre deux onglets sans toucher la souris.

## L'expérience de recherche

La recherche est en temps réel et debouncée (~100ms). Pendant que vous tapez, les résultats se reclassent en direct, les caractères correspondants sont surlignés et une autocomplétion en ligne suggère la complétion du premier résultat — appuyez sur `Tab` pour l'accepter. Tout est clavier d'abord : les flèches parcourent la liste plate de résultats (la sélection défile à l'écran), `Entrée` ouvre l'élément surligné et `Échap` vide le champ. Chaque résultat affiche un favicon, le titre, un nom d'hôte + chemin tronqués et un badge de type.

## Comment il reste rapide et à jour

Un worker d'arrière-plan maintient un index synchronisé à mesure que les onglets sont créés, chargés, activés et fermés — en ignorant les URLs privilégiées `chrome://` qu'il ne peut pas lire. Un content script récupère la méta-description et les mots-clés de chaque page pour que l'index ait plus que le titre sur quoi correspondre. Les événements de favoris et d'onglets mettent à jour des statistiques d'usage (nombre d'accès, dernier accès) qui alimentent le classement.

Tout réside côté client dans **IndexedDB** sur quatre stores — onglets, favoris, une liste MRU plafonnée et paramètres — donc rien ne quitte le navigateur. Le classement est une passe maison plutôt qu'une bibliothèque : le titre exact marque le plus, puis le titre contenant le terme, la correspondance d'URL et les correspondances par terme, avec une correspondance floue caractère par caractère ajoutant un bonus d'alignement partiel. Les résultats sont triés par score puis par récence.

## Stack

- **Plateforme :** API d'extensions Chrome — service worker d'arrière-plan, content script, panneau latéral, commandes clavier, API sessions & favoris
- **Langage :** JavaScript, HTML, CSS
- **Stockage :** IndexedDB (quatre object stores, entièrement local)
- **Recherche :** algorithme maison de scoring par termes + correspondance floue avec autocomplétion en direct
- **Outillage :** scripts shell pour l'empaquetage ; publiée sur le Chrome Web Store
