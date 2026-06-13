---
title: "TabLight - Spotlight for Chrome Tabs"
description: "A keyboard-driven command palette for Chrome that fuzzy-searches your open tabs, bookmarks, recently closed tabs, and Chrome's own pages - plus an Alt+Q quick-switch to flip between your two latest tabs."
pubDate: 2026-02-18
tags: ["JavaScript", "Chrome Extension", "IndexedDB", "Fuzzy Search", "Productivity"]
url: "https://github.com/rish-0-0/tablight"
linkLabel: "GitHub"
---

If you live with dozens of tabs open, the tab strip stops being useful - everything collapses into a row of identical favicons. TabLight replaces that hunt with a command palette: press `Ctrl/Cmd+Shift+K`, start typing, and jump straight to what you want.

## What it actually does

It's a single search box that looks across everything you'd want to reach, grouped into sections:

- **Open tabs** - switch instantly to any tab in any window.
- **Bookmarks** - open in a new tab, ranked by how often you actually use them.
- **Recently closed** - restore tabs from Chrome's session history.
- **Recently accessed** - your most-recently-used tabs, for fast back-and-forth.
- **Chrome pages** - quick access to built-ins like Settings and Password Manager.

A second shortcut, `Alt+Q`, does the Alt+Tab trick for tabs: it flips to the previously active tab, so you can bounce between two tabs without touching the mouse.

## The search experience

Search is real-time and debounced (~100ms). As you type, results re-rank live, matching characters are highlighted, and an inline autocomplete suggests the top result's completion - press `Tab` to accept it. Everything is keyboard-first: arrow keys move through the flat result list (the selection scrolls into view), `Enter` opens the highlighted item, and `Escape` clears the box. Each result shows a favicon, the title, a truncated hostname + path, and a type badge.

## How it stays fast and current

A background worker keeps an index in sync as tabs are created, loaded, activated, and closed - skipping privileged `chrome://` URLs it can't read. A content script pulls each page's meta description and keywords so the index has more than just the title to match on. Bookmark and tab events update usage stats (access count, last-accessed time) that feed the ranking.

Everything lives client-side in **IndexedDB** across four stores - tabs, bookmarks, a capped most-recently-used list, and settings - so nothing leaves the browser. Ranking is a custom pass rather than a library: exact title match scores highest, then title containment, URL match, and per-term hits, with a character-by-character fuzzy match adding a partial-alignment boost. Results sort by score, then recency.

## Stack

- **Platform:** Chrome Extension APIs - background service worker, content script, side panel, keyboard commands, sessions & bookmarks APIs
- **Language:** JavaScript, HTML, CSS
- **Storage:** IndexedDB (four object stores, fully local)
- **Search:** custom term-scoring + fuzzy-matching algorithm with live autocomplete
- **Tooling:** shell scripts for packaging; published on the Chrome Web Store
