# 21-Day Study Plan — React + Snooker Fantasy League

A day-by-day schedule to finish all 7 chapters and have the deployed app on your portfolio, in three weeks at ~60 min/day.

> Use the in-app progress tracker at `/study` to check off lessons as you go (it persists in your browser via localStorage).

---

## Week 1 — Foundations (Days 1-7)

> Goal by Sunday: data model in your head, scoring engine memorized, project scaffolded, first component rendered.

### Day 1 (60 min) — Orientation
- Read `course/README.md` end to end.
- Skim the **table of contents** of `course/SNOOKER_FANTASY_LEAGUE_COURSE.md` to get the full arc.
- Open the live deployed app (link in `README.md`) and click around for 10 minutes.
- *Output*: a one-paragraph note in `progress.txt` saying what you expect each chapter to teach.

### Day 2 (60 min) — Chapter 1.1
- Read `chapter-01-foundations/01-the-problem.md`.
- Review the 5 corresponding flashcards (`flashcards/react-snooker.csv`, filter by `01-the-problem`).
- *Output*: explain the user / data / scoring rule trio out loud, untimed.

### Day 3 (60 min) — Chapter 1.2
- Read `chapter-01-foundations/02-data-modeling.md`.
- Sketch the `Player`, `Match`, `Pick` types on paper before reading the answer.
- Review the cheat sheet `cheat-sheets/react-ch01.md`.
- *Output*: list the three invariants you'd enforce at the type system level.

### Day 4 (75 min) — Chapter 1.3
- Read `chapter-01-foundations/03-pure-functions-and-scoring.md`.
- Open `lib/scoring.ts` in this repo and read it alongside.
- Write down the test cases you would add for the scoring engine.
- *Output*: list 3 properties you would prove with property-based tests.

### Day 5 (60 min) — Chapter 2
- Read all three lessons of `chapter-02-project-setup/`.
- Run `npm install` and `npm run dev`; verify the app boots locally.
- *Output*: a screenshot of the local app in your notes.

### Day 6 (60 min) — Chapter 3.1-3.2
- Read `chapter-03-first-component/01-anatomy-of-a-component.md` and `02-rendering-the-standings.md`.
- Open `components/StandingsTable.tsx` and `lib/scoring.ts`; trace one render top-to-bottom.
- *Output*: list the props the table component receives and where each comes from.

### Day 7 (60 min) — Chapter 3.3 + review
- Read `chapter-03-first-component/03-progressive-enhancement.md`.
- Review week 1 cheat sheets back to back.
- 15-minute flashcard session: cards tagged `chapter-01` and `chapter-02`.
- *Output*: write a 1-paragraph weekly retro.

---

## Week 2 — Composition & Hooks (Days 8-14)

> Goal by Sunday: confident with hooks, can talk about the orchestrator pattern, understand prop drilling vs context.

### Day 8 (60 min) — Chapter 4.1
- Read `chapter-04-state-and-hooks/01-useState-mental-model.md`.
- Write 3 wrong-and-right code snippets for `useState`.
- *Output*: explain *why* state updates are queued, in your own words.

### Day 9 (60 min) — Chapter 4.2
- Read `02-the-orchestrator-pattern.md`.
- Diagram the data flow: which component is the orchestrator, which are leaves?
- *Output*: list one alternative to the orchestrator pattern and its trade-off.

### Day 10 (60 min) — Chapter 4.3
- Read `03-useMemo-and-derived-data.md`.
- Open `components/SnookerFantasyLeague.tsx` and find every `useMemo`; explain *why* each one exists.
- *Output*: identify one `useMemo` you would remove (premature optimization is real).

### Day 11 (60 min) — Chapter 5.1
- Read `chapter-05-composition/01-when-to-split-components.md`.
- Pick one big component in this repo; sketch how you would split it.
- *Output*: list the four "smells" that suggest a component should be split.

### Day 12 (60 min) — Chapter 5.2
- Read `02-prop-drilling-vs-context.md`.
- Find one place in the codebase where prop drilling is fine and one where context would be justified.
- *Output*: write 2-sentence reasoning for each.

### Day 13 (60 min) — Chapter 5.3
- Read `03-building-player-detail.md`.
- Open `components/PlayerDetailPanel.tsx`; trace where its state lives and how it's controlled.
- *Output*: name one prop you would lift up and one you would push down.

### Day 14 (60 min) — Week 2 review
- Re-read the cheat sheets for chapters 4 and 5.
- 30-minute flashcard session, tag filter `composition` and `hooks`.
- *Output*: weekly retro.

---

## Week 3 — Visualization, Polish, Deployment (Days 15-21)

> Goal by Sunday: app deployed, README is portfolio-quality, you can give a 5-minute architecture walkthrough.

### Day 15 (60 min) — Chapter 6.1
- Read `chapter-06-data-visualization/01-recharts-fundamentals.md`.
- Open `components/ScoreHistoryChart.tsx`; tweak one prop and reload.
- *Output*: name the three things Recharts gives you for free.

### Day 16 (75 min) — Chapter 6.2
- Read `02-reshaping-data.md`.
- Manually trace one match through the `data` array transformations.
- *Output*: write a test for one transformation.

### Day 17 (75 min) — Chapter 6.3
- Read `03-pivots-and-internal-state.md`.
- Open `components/ResidualHistogram.tsx`; identify the pivot operation.
- *Output*: describe what the chart shows in one sentence to a non-engineer.

### Day 18 (60 min) — Chapter 7.1
- Read `chapter-07-mastery-and-interviews/01-production-polish.md`.
- Apply one polish item from the list to your local copy.
- *Output*: a one-line PR title for the change.

### Day 19 (75 min) — Chapter 7.2
- Read `02-deployment-and-testing.md`.
- Deploy your fork to Vercel (free).
- *Output*: shareable deployed URL in `progress.txt`.

### Day 20 (60 min) — Chapter 7.3
- Read `03-interview-narrative.md`.
- Draft your 90-second project pitch using the template.
- *Output*: a recording of yourself delivering it (private OK).

### Day 21 (90 min) — Capstone
- Walk through the full app end-to-end and explain it out loud as if presenting to a panel.
- Run through *all* the cheat sheets at speed.
- 45-minute flashcard session, full deck.
- *Output*: portfolio-ready README update + LinkedIn-friendly summary.

---

## Daily habits (every day, ~10 min on top)

- 10 minutes flashcard review (Anki / Mochi / RemNote — load `flashcards/react-snooker.csv`).
- Listen to that day's audio narration MP3 (`audio/react-snooker-course/...`) while walking or cooking.

## What to skip if you're short on time

- Days 18-20 polish/deployment if you only care about the technical content. The deployed app is the credibility item, but the technical depth is in chapters 1-6.

## What to add if you have more time

- Re-implement `lib/scoring.ts` from scratch without looking.
- Re-implement `components/StandingsTable.tsx` from scratch.
- Write Playwright tests for the deployed app.

## When you finish

Move directly to the AI interview prep course (`ai-interview-course/`), which uses *this* project as its portfolio example throughout.
