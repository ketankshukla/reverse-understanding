# React Course — Chapter 4 Cheat Sheet

## State & Hooks: The Orchestrator Pattern

> **State is *change over time*. If a value never changes, it's a prop. If it's derived from other state, it's `useMemo`. The rest is `useState`.**

## Key concepts

- **`useState`** — for genuine state. Returns `[value, setValue]`.
- **Setter accepts a value or a function** — `setX(prev => prev + 1)` when the new value depends on the old.
- **State updates are batched and async** — never read state immediately after setting it.
- **`useMemo`** — for *derived* values that are expensive to recompute. Not for primitives.
- **The orchestrator pattern** — one parent owns all the state; children are presentational.
- **Single source of truth** — every piece of state lives in exactly one place.

## When to use each hook

| Need | Use |
| ---- | --- |
| Value that changes over time | `useState` |
| Value derived from other state, expensive to compute | `useMemo` |
| Function passed to memoized child | `useCallback` |
| Subscribing to something external | `useEffect` (sparingly) |
| Imperative DOM access | `useRef` |

## Patterns / decisions

- **Lift state up** to the closest common ancestor of components that share it.
- **The orchestrator**: in this app, `SnookerFantasyLeague.tsx` owns *every* piece of mutable state; children receive it via props and call setters via props.
- **Derived state is not state.** If you can compute it, compute it. `useMemo` is for *expensive* computation, not all computation.
- **Avoid `useEffect` for derived data.** It's an anti-pattern — recompute on render or memoize.

## Senior soundbites

> *"If you find yourself synchronizing two pieces of state, you've made one of them derived. Remove it."*

> *"The orchestrator pattern: parents own state, children receive props. The day a child needs its own state is the day you reach for context."*

> *"`useEffect` is for stepping outside React's world. Inside React's world, it's almost always wrong."*

## If asked in an interview

> *"Where does state belong?"*

Answer: in the closest common ancestor of every component that reads or writes it. Lift only what must be shared; keep everything else local. The orchestrator pattern is a small organizing principle that makes that lifting decision automatic: one parent owns the truth, every child is a function of props.
