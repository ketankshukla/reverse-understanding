# Exercise 01 -- Scoring as a Pure Function

## The problem

A fantasy team picks 1 player per round. For each round, you score:

- **3 points** if your pick won the actual match in that round.
- **1 point** if your pick lost the actual match (consolation for picking a player who at least made it).
- **0 points** if the match has not been played yet (`winner` is undefined).

Round-1 has 16 matches, round-2 has 8, quarter-final has 4, semi-final has 2,
and the final has 1. Each team's picks for a given round are aligned with the
match order: `team.r1[i]` corresponds to `ROUND1MATCHES[i]`.

## Your task

Implement `calculateTeamScores(team)` so that it returns an object with the
per-round breakdown **and** the total. The function must be **pure** -- no
side effects, no reads from outside its arguments.

```ts
type Scores = {
  r1: number;
  r2: number;
  qf: number;
  sf: number;
  f: number;
  total: number;
};
```

## Vibe prompt you would have used

> *"I have a fantasy snooker league. Each team picks one player per round.
> Scoring: 3 for a correct winner pick, 1 for a loser pick, 0 for matches not
> yet played (the match object has `winner: string | undefined`). Write me a
> pure TypeScript function `calculateTeamScores(team: Team): Scores` that
> returns each round's points plus the total. No React, no I/O, just a
> function. Add a unit-test-style example at the bottom."*

## Hints (peek only after 5 minutes)

- Iterate match arrays in parallel using their index.
- Skip undefined winners early -- a match is undefined when it has not happened
  yet.
- The final has exactly one match. Treat it as a 1-element array OR an object;
  both shapes appear in the codebase.

## When you are done

Open `solution.tsx` and look for **three** things you did differently. Common
gotchas:

- Off-by-one when looping over `Math.min(r1.length, ROUND1MATCHES.length)`.
- Forgetting to sum into `total`.
- Putting React imports at the top of a file that does not use React.
