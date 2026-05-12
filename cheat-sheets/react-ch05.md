# React Course — Chapter 5 Cheat Sheet

## Composition: Splitting Components & Prop Drilling vs Context

> **A component should fit on one screen. If it doesn't, the seams are already there — you just haven't drawn them yet.**

## Key concepts

- **Composition** — building UIs from small, focused components.
- **Splitting threshold** — when to extract a sub-component (4 smells below).
- **Prop drilling** — passing a value through 3+ levels just to reach a deep child.
- **React Context** — the escape hatch when prop drilling becomes painful.
- **Co-location** — keep related state, types, and components in the same folder.

## The 4 "split this" smells

1. **Length** — file is > ~200 lines and scrolls.
2. **Mixed concerns** — both data fetching *and* presentation in one place.
3. **Reuse** — the same JSX is repeated, even with small variations.
4. **Cognitive load** — you can't hold the whole component in your head.

## Prop drilling vs context — decision

| Situation | Use |
| --------- | --- |
| 1-2 levels of drilling | Just pass the prop. |
| 3+ levels, value rarely changes (theme, current user) | Context. |
| 3+ levels, value changes often (form state, picks) | Lift state to a closer ancestor *or* use a state library. |
| State scattered across siblings | Lift to common ancestor. |

## Patterns / decisions

- **Default to prop drilling.** Context has costs: re-renders, harder testing, harder refactoring.
- **Context is for stable values** — auth user, theme, locale. Not for fast-changing UI state.
- **The "container/presenter" split** is overrated; modern React works fine with hooks inside any component. Split for readability, not orthodoxy.
- **One component = one file** for anything > 30 lines. Helpers can co-exist below the main export.

## Senior soundbites

> *"Prop drilling is fine. Context is fine. The wrong one in either direction is what's painful."*

> *"A 600-line component is not a code smell — it's a smell of an architecture smell. Find the boundary."*

## If asked in an interview

> *"When do you reach for context?"*

Answer: when a value (1) is needed by many components, (2) doesn't change frequently, and (3) prop drilling would touch 3+ layers. Theme, current user, feature flags. *Not* form state — that belongs in the closest ancestor that needs it, or in a state library if it's truly app-wide.
