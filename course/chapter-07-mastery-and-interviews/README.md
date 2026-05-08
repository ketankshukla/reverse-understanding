# Chapter 7 — Mastery + Interview Prep

> **You can build it. Now learn to ship it and talk about it.** This chapter is the difference between a junior developer who *finished a tutorial* and an engineer who can stand behind their work in an interview.

## What you'll learn

- The **production polish** every senior engineer adds: loading states, error boundaries, accessibility, performance.
- A **realistic testing strategy** for a project this size — what to test, what *not* to test, and which tools to reach for.
- How to **deploy to Vercel** through GitHub, set up previews, and reason about build-time vs. run-time.
- The **interview narrative**: a 90-second walkthrough of the project that hits architecture, decisions, and trade-offs.
- The **vibe-coding prompt library**: the prompt templates that *demonstrably produced this codebase*.

By the end of this chapter you'll be able to:

1. Open this repo on a hiring manager's screen and explain *why* every directory exists.
2. Answer "what would you do differently?" with confidence (because you've already thought about it).
3. Reach for the right testing tool when someone says "add a test for that."
4. Reproduce this style of work on a new project at maybe a third of the prompt count.

## Lessons in this chapter

1. **[01-production-polish.md](./01-production-polish.md)** — Accessibility, loading states, error boundaries, and the performance audits that show you care.
2. **[02-deployment-and-testing.md](./02-deployment-and-testing.md)** — Vercel deployment via GitHub, environment variables, the testing pyramid, and what the first three tests should cover.
3. **[03-interview-narrative.md](./03-interview-narrative.md)** — The 90-second walkthrough, the common interview questions answered with this app, and the vibe-coding prompt library distilled.

## New concepts introduced

- **Error boundaries** in React (class components — yes, still!).
- **`<Suspense>` and loading UI** in Next.js App Router.
- **Lighthouse / Web Vitals** as a quality bar.
- **Semantic HTML** and **ARIA** essentials (no more `<div>` soup).
- **Vitest + React Testing Library** for unit tests.
- **Playwright** for end-to-end smoke tests.
- **Vercel preview deployments** triggered by every PR.
- **STAR-format interview answers** (Situation, Task, Action, Result).

## How long it should take

- 30–45 min reading per lesson
- 2–3 hours typing the polish code (a11y + tests)
- 30 min setting up Vercel (mostly waiting)
- ~6 hours total

## Why this chapter exists separately

Most React courses end at "you built the feature." That's the moment a senior engineer's job *starts*. The polish, the tests, the deployment, and the ability to talk about your trade-offs are the things that get you hired. We isolated them here so you can binge them as a single concentrated unit before your next interview.

## Before you start

You should have:

- All previous chapters complete.
- The app running locally (`npm run dev`).
- A GitHub account with the repo pushed.
- A Vercel account (free tier is fine — you'll use it in Lesson 2).

## What this chapter is *not*

- It is **not** a complete testing course. That's a book. We're teaching you what an 8-team fantasy app actually needs.
- It is **not** a complete a11y course. We're teaching the 80% that catches 95% of issues.
- It is **not** a Vercel sales pitch. We picked Vercel because it's the path of least resistance for Next.js. Cloudflare Pages, Netlify, Render, AWS Amplify all work — the principles transfer.

Open **[01-production-polish.md](./01-production-polish.md)** when you're ready.
