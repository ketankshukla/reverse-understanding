# Chapter 3 — Your First React Component

> **Now we write React.** From a 15-line hello-world component to a fully styled standings table with sorted rows, medal-color rank badges, per-round columns, and a form indicator.

## What you'll learn

- The **anatomy** of a React component: the function, the return, the JSX, the props.
- How **JSX** is just syntactic sugar for `React.createElement` calls (and why that matters).
- **Lists and keys** — why React needs a `key` prop on every item in a `.map()` loop.
- **Conditional rendering** with `&&`, ternaries, and early returns.
- **Inline styles** with TypeScript's `React.CSSProperties`.
- **Component props** typed with TypeScript `interface`s.
- The discipline of **progressive enhancement** — building a feature one column / one widget at a time.

## Lessons in this chapter

1. **[01-anatomy-of-a-component.md](./01-anatomy-of-a-component.md)** — What a component IS, what JSX IS, and what makes a component "render". The mental model that powers everything else.
2. **[02-rendering-the-standings.md](./02-rendering-the-standings.md)** — Building `<StandingsTab>` v1: a plain table of 8 teams with totals. The smallest version that proves the data flows.
3. **[03-progressive-enhancement.md](./03-progressive-enhancement.md)** — Iterating on the standings: medal-color rank circles, per-round columns, the Final Pick chip, the Form badge. Six small features added one at a time.

## Files you'll create in this chapter

```
components/
├── SnookerFantasyLeague.tsx       ← stub orchestrator that renders <StandingsTab />
├── tabs/
│   └── StandingsTab.tsx           ← the standings tab
└── standings/
    ├── LeagueTable.tsx            ← the table itself (extracted in Lesson 3)
    ├── StatCard.tsx               ← summary stat tiles above the table
    └── FormBadge.tsx              ← rising/falling/steady arrow indicator
```

## New React/Next.js concepts introduced

- **Functional components** — the only kind of component you'll write in 2026.
- **Props** — how parent components pass data to children.
- **Lists with `.map()`** and the `key` prop.
- **Conditional rendering** in JSX.
- **Inline styles** vs class names.
- **The `'use client'` directive** — when (and only when) to use it.
- **Component composition** — passing JSX through props (`children`).

## How long it should take

- 30 min reading per lesson
- 1.5–2 hours typing the code
- ~3.5 hours total

## What you'll see in your browser at the end

Open `http://localhost:3000` after Lesson 3 and you should see:

- A dark green hero header with "World Snooker Championship" in gold serif type and "🏆 WU YIZE — WORLD CHAMPION 2026 (18-17)" in a red-gold badge.
- Below it, a sticky tab bar with five tabs (only Standings will work for now — clicking other tabs may error or do nothing).
- The Standings table: 8 rows, ranked by total, gold/silver/bronze rank circles for the top 3, per-round columns, a Final Pick chip, a Form badge, hover effect on each row.

If your browser shows that, you've nailed Chapter 3.

## Before you start

Make sure Chapter 2 is done. You should have:

- `lib/types.ts`, `lib/scoring.ts`, `lib/matches.ts`, `lib/teams.ts`, `lib/players.ts`, `lib/constants.ts` all populated with real data.
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css` all in place.
- `npm run dev` boots without crashing (it'll error on the missing `<SnookerFantasyLeague>` component — that's fine, you're about to create it).

Open **[01-anatomy-of-a-component.md](./01-anatomy-of-a-component.md)**.
