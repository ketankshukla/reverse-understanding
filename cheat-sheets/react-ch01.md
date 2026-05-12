# React Course — Chapter 1 Cheat Sheet

## Foundations: Data Before UI

> **The data layer is what survives every UI rewrite. Model it first, then ask "where does this change?" — that's your state.**

## Key concepts

- **Pure function** — same input → same output, no side effects.
- **Data shape vs view of the data** — they are *not* the same thing.
- **Invariants** — properties of your data that must always hold.
- **`null` vs `undefined`** — `null` is "the user hasn't picked yet"; `undefined` is "we never asked".
- **TypeScript discriminated union** — `{ kind: 'won', score: number } | { kind: 'pending' }`.

## The 4 entities in this app

| Entity | Why it exists |
| ------ | -------------- |
| `PlayerInfo` | A snooker pro participating in the tournament. |
| `Match` | A scheduled or completed bout (with optional `winnerId`). |
| `Team` (user) | A fantasy participant with picks. |
| `ScoreDetail` | The result of applying scoring rules to one pick. |

## Scoring rules

- **Winner pick correct** → 3 points.
- **Loser pick correct** → 1 point.
- **Match incomplete** → 0 points (no penalty).

## Patterns / decisions

- **Always model the data first**, in `lib/types.ts`. JSX comes later.
- **Pure scoring functions** live in `lib/scoring.ts`, not in components.
- **No React imports** in this chapter. Zero.
- **Test the scoring engine** with simple `if (score !== expected) throw` checks — no test framework required.

## Senior soundbites

> *"Junior devs reach for `useState` on day one. Seniors model the data first, then ask where it changes."*

> *"If your scoring logic lives in a component, you can't reuse it, can't test it, and can't trust it."*

## If asked in an interview

> *"Walk me through how you'd start this project."*

Answer: read the problem twice, sketch the entities, write the types in TypeScript with the strongest invariants you can, then write the pure functions that operate on those types. **No JSX yet.** State management only enters the picture once you can answer "where does this data change?"
