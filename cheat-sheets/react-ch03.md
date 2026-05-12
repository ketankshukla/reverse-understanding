# React Course — Chapter 3 Cheat Sheet

## First Component: Anatomy & Progressive Enhancement

> **A component is a function from props to JSX. Everything else is decoration.**

## Key concepts

- **Component** — function that returns JSX. Named with `PascalCase`.
- **Props** — the only "input" a component should care about (state is *internal* input).
- **Controlled vs uncontrolled** — controlled = parent owns the value; uncontrolled = component owns it.
- **Conditional rendering** — `{condition && <X />}` and `{cond ? <A/> : <B/>}`.
- **Lists with `.map`** — every item needs a stable `key` (the array index is usually wrong).
- **Progressive enhancement** — render something useful at every step; the empty screen is a bug.

## The 4 stages of building a component

1. **Render a placeholder** — `<div>standings here</div>`. Confirm it appears.
2. **Render with hard-coded data** — types match, layout works.
3. **Render with real data** — props passed in from parent.
4. **Render with interaction** — buttons, hover states, loading states.

## Patterns / decisions

- **Always start with the placeholder.** Don't write 200 lines before you see anything.
- **Keys for lists**: prefer a stable ID field (`player.id`), never the index when the list can reorder.
- **No `any` in props.** Use `Props` interface or inline type.
- **Composition over configuration** — `<Card><Card.Header />…</Card>` beats `<Card showHeader={true} />` for anything non-trivial.

## Senior soundbites

> *"Junior devs write 200 lines before they see anything on screen. Seniors render a placeholder first, then fill it in."*

> *"`key={index}` is fine when the list never reorders. The day it reorders, it's a bug."*

## If asked in an interview

> *"Walk me through how you'd structure a new component."*

Answer: I start with the prop shape on paper — what does the parent owe me? Then I write the function signature and return a placeholder that exercises the prop. Once the placeholder renders, I fill in the real markup. State enters last, only if the component genuinely owns something the parent shouldn't see.
