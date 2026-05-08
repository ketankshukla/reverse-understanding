# Chapter 1 — Foundations

> **Before you write a single line of React, you need to understand the problem and the data.** Half of senior interviews are *"how would you model this?"* — and that's a question that's answered before any JSX gets typed.

## What you'll learn

- How to **read a problem statement** and identify the data shapes it implies.
- How to **design a data model** in TypeScript — interfaces, unions, optional fields.
- Why **pure functions** are the foundation of every React app, even before React enters the picture.
- The mental difference between *the data* and *the view of the data*.
- Why `null` is a valid value (and so is `undefined`, but they mean different things).

## Lessons in this chapter

1. **[01-the-problem.md](./01-the-problem.md)** — A pub-style explanation of the fantasy snooker league. No code. The questions every senior asks before opening their editor.
2. **[02-data-modeling.md](./02-data-modeling.md)** — Translating "8 friends, 32 players, 31 matches" into TypeScript interfaces. The most important invariant in the whole codebase.
3. **[03-pure-functions-and-scoring.md](./03-pure-functions-and-scoring.md)** — Writing `scorePick` and `calculateTeamScores` with zero React, zero JSX, zero DOM.

## Files you'll create in this chapter

- `lib/types.ts` — TypeScript interfaces for `Match`, `Team`, `PlayerInfo`, `ScoreDetail`, `TeamScores`.
- `lib/scoring.ts` — the two pure functions `scorePick` and `calculateTeamScores`.

## New React/Next.js concepts introduced

**None.** That's the point of Chapter 1. You'll use `interface`, `type`, and plain JavaScript functions — no React imports yet.

> **Why no React yet?** Because **the data layer is what survives every UI rewrite.** If you can't model the problem cleanly without React, adding React won't fix it. Junior devs reach for `useState` on day one and end up with a mess. Seniors model the data first, then ask "where does this *change*?" — and the answer to that question is what becomes state. Chapter 1 is the foundation Chapter 4 builds on.

## How long it should take

- 30 min reading per lesson
- 30 min typing the code in lessons 2 and 3
- ~2.5 hours total for the chapter

## Before you start

Make sure you have:

- A working Node.js install (`node --version` should print v20 or v22).
- An empty folder where you'll build the project (or use this repo's root if you're following along with the finished version open in another window).
- 90 minutes of uninterrupted time. The lessons reference each other; binge-reading lesson 1 then doing lesson 2 a week later won't stick.

Open `01-the-problem.md` and start there.
