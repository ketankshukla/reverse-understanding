# Exercise 03 -- `useMemo` and Derived Data

## The problem

You profile your app and notice the standings table re-sorts on **every keystroke**
of an unrelated search box. The sort itself is O(n log n) with a `Date.parse`
inside the comparator -- expensive enough to show up on the React profiler.

## Your task

Wrap the expensive sort in `useMemo` with the correct dependency array so it
runs **only when the raw teams list changes**, not when the search query
changes. Then add an assertion to prove your fix worked (count the sort calls).

## Vibe prompt you would have used

> *"This component re-runs its sort on every render -- including renders caused
> by an unrelated `query` state. Wrap the sort in `useMemo` with the right
> dependency array so it only runs when `TEAMS` (or the raw `teams` prop)
> changes, not when `query` changes. Add a `console.count('sort run')` inside
> the memo factory so I can verify the fix in dev tools."*

## Hints

- The wrong fix is to put `query` in the dependency array -- that defeats the
  whole point.
- The right fix has `[teams]` (or `[]` if teams is module-level) as the deps.
- `useMemo(() => expensive(), [deps])` returns the cached value when deps are
  shallow-equal to the previous render. Reference equality matters for arrays.

## When you are done

Run the page in dev tools. Type 10 characters into the search box. The count
log in the memo factory should still be **1** -- not 11.

If you see the sort fire 11 times, your deps array is wrong.
