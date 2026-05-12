# React Course — Chapter 2 Cheat Sheet

## Project Setup: Next.js + TypeScript + Tailwind

> **The stack you pick is a marketing decision, not just a technical one. Choose what employers recognize.**

## Key concepts

- **Next.js App Router** — directory-based routing, server components by default.
- **TypeScript strict mode** — `noImplicitAny`, `strictNullChecks`. Always on.
- **Tailwind CSS** — utility-first; class names *are* the design system.
- **Roboto via `next/font/google`** — self-hosted, zero layout shift, no extra requests.
- **`app/` vs `pages/`** — modern apps use `app/`. The course follows this convention.

## File-system shape

```
app/
├── layout.tsx        // global shell, fonts, metadata
├── page.tsx          // homepage; imports the main component
└── globals.css       // tailwind directives + tiny resets
components/
└── SnookerFantasyLeague.tsx  // the main client component
lib/
├── types.ts          // all TypeScript types
├── data.ts           // static data (players, matches, teams)
└── scoring.ts        // pure scoring functions
```

## Patterns / decisions

- **Static data lives in `lib/data.ts`** — typed via `lib/types.ts`. No fetching for this app.
- **The homepage is a thin shim** — `<SnookerFantasyLeague />` is the real entry point.
- **Roboto everywhere** — body and headings. Slab variant for callouts only.
- **Tailwind config kept minimal** — extend rather than override.

## Senior soundbites

> *"Stack choice is a hiring decision: pick what employers can read on your resume in 2 seconds."*

> *"A 5-line `page.tsx` is the sign of a well-organized app, not a small one."*

## If asked in an interview

> *"Why Next.js and TypeScript?"*

Answer: Next.js gives me a real routing model, server components when I want them, and a deployment story that ends at "git push" via Vercel. TypeScript is non-negotiable for anything I want to refactor later — `strictNullChecks` alone catches a class of bugs that would otherwise become 2 a.m. incidents.
