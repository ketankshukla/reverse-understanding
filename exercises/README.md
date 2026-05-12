# React Exercises

Self-contained drills that turn passive course reading into active recall. Each
exercise has three files:

```
exercises/<NN-name>/
  README.md      <- the problem, the goal, the vibe prompt
  starter.tsx    <- skeleton with TODOs
  solution.tsx   <- the answer (don't peek until you've tried)
```

## Order

1. `01-scoring-pure-function` -- implement `calculateTeamScores` from the spec.
2. `02-orchestrator-pattern` -- refactor a god component into orchestrator + dumb children.
3. `03-useMemo-derived-data` -- prevent unnecessary re-sorting on every render.

## How to run

The exercises are TypeScript snippets. The cleanest way to "run" them is to drop
the starter file into a sandbox like [stackblitz.com](https://stackblitz.com)
or [codesandbox.io](https://codesandbox.io), or temporarily wire them into the
existing Next.js app under `app/sandbox/page.tsx`.

For pure-function exercises (e.g. #1) you don't need React at all -- you can
run them with `ts-node` or [tsx](https://github.com/esbuild-kit/tsx):

```pwsh
npx tsx exercises/01-scoring-pure-function/solution.tsx
```

## The drill loop

1. Open `README.md`. Read the prompt once.
2. Open `starter.tsx`. Fill in the TODOs without peeking at the solution.
3. Compare your version to `solution.tsx`. Note three differences.
4. Re-do the exercise from scratch the next day. Aim for &lt;5 minutes.

If you can't finish in 5 minutes after the second pass, the corresponding
chapter is the one you need to re-read.
