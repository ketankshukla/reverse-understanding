# Snooker Fantasy League

A single-page Next.js 14 + TypeScript app that scores eight fantasy teams against the actual results of the 2026 World Snooker Championship.

This is a refactor of an original 1,654-line single-file React component (`_source/SnookerFantasyLeague.jsx`) into a clean App Router project with separate `lib/` (data + scoring) and `components/` (UI) layers.

> 📚 **Looking for the educational assets?** This repo also contains two full courses, 1,094 flashcards, 6 Mermaid diagrams, 3 coding exercises, MP3 narrations, PDFs, EPUBs, Reveal.js slides, Word docs, study plans, cheat sheets, and a glossary. **See [LEARNING_INDEX.md](LEARNING_INDEX.md) for the master catalog.**

## What it does

- Each of 8 fantasy teams has picks for every round (R1: 16 picks, R2: 8, QF: 4, SF: 2, Final: 1).
- Scoring rule: **3 points** for picking the actual winner, **1 point** for picking the loser.
- The app shows live standings, the matches by round, a predictions matrix, a player explorer, and an analytics dashboard.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To verify a production build:

```bash
npm run build
```

## Tech

- Next.js 14 (App Router) with TypeScript strict mode
- Tailwind CSS for layout/spacing primitives (visual richness preserved via inline styles for branded surfaces)
- Recharts for charts, lucide-react for icons
- Roboto / Roboto Slab via `next/font/google`
- No database, no auth, no API routes — fully client-side, data is static and edited by hand in `lib/`.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo on https://vercel.com/new and accept the defaults.
3. Vercel detects Next.js automatically — no environment variables required.

## Project layout

```
app/                Next.js App Router
components/         Refactored UI (tabs, standings, matches, predictions, players, analytics)
lib/                Types, data constants, scoring logic
_source/            Original SnookerFantasyLeague.jsx (kept for reference)
_briefs/            The original refactor + course briefs
course/             Reverse-engineering course (after Phase 2)
```
