# Learning Index

Every educational asset in this repository, in one place. The same content is
delivered in **eight modalities** -- pick the one that fits your situation
(commute, deep focus, interview prep, hands-on coding) and bounce between them.

## At a glance

| Asset | Count | Size | Folder |
| --- | ---: | ---: | --- |
| Course lessons (Markdown) | 39 lessons in 13 chapters | 740 KB | [`course/`](course/), [`ai-interview-course/`](ai-interview-course/) |
| Chapter cheat sheets | 13 | 32 KB | [`cheat-sheets/`](cheat-sheets/) |
| Study plans (21-day) | 2 | -- | [`course/STUDY_PLAN.md`](course/STUDY_PLAN.md), [`ai-interview-course/STUDY_PLAN.md`](ai-interview-course/STUDY_PLAN.md) |
| Word documents | 55 | 1.0 MB | [`word-documents-courses/`](word-documents-courses/) |
| PDFs (per-lesson + combined) | 59 | 5.4 MB | [`pdf-courses/`](pdf-courses/) |
| EPUBs (combined per course) | 2 | 446 KB | [`epub-courses/`](epub-courses/) |
| Reveal.js slide decks | 16 | 1.3 MB | [`slides-courses/`](slides-courses/) |
| MP3 narrations | 56 | ~248 MB | [`audio-courses/`](audio-courses/) *(gitignored, regenerate locally)* |
| Flashcards (Anki CSV + JSON) | 1,094 cards | 994 KB | [`flashcards/`](flashcards/) |
| Glossary entries | cross-course concept index | 109 KB | [`glossary/`](glossary/) |
| Mermaid diagrams | 6 | 11 KB | [`diagrams/`](diagrams/) |
| Coding exercises (starter + solution) | 3 | 21 KB | [`exercises/`](exercises/) |
| Interactive web routes | 3 | -- | `/`, `/study`, `/interview-drill` |

---

## The two courses

### 1. React + Snooker Fantasy League ([`course/`](course/))

Build the entire app on `/` from zero. Seven chapters, 21 lessons.

| Chapter | Folder |
| --- | --- |
| 1. Foundations | [`course/chapter-01-foundations/`](course/chapter-01-foundations/) |
| 2. Project setup | [`course/chapter-02-project-setup/`](course/chapter-02-project-setup/) |
| 3. First component | [`course/chapter-03-first-component/`](course/chapter-03-first-component/) |
| 4. State and hooks | [`course/chapter-04-state-and-hooks/`](course/chapter-04-state-and-hooks/) |
| 5. Composition | [`course/chapter-05-composition/`](course/chapter-05-composition/) |
| 6. Data visualization | [`course/chapter-06-data-visualization/`](course/chapter-06-data-visualization/) |
| 7. Mastery and interviews | [`course/chapter-07-mastery-and-interviews/`](course/chapter-07-mastery-and-interviews/) |

Also: [`course/SNOOKER_FANTASY_LEAGUE_COURSE.md`](course/SNOOKER_FANTASY_LEAGUE_COURSE.md) -- the entire course in one long file.

### 2. AI-Assisted Development Interview Prep ([`ai-interview-course/`](ai-interview-course/))

Answer the hard questions about Copilot, Cursor, Claude Code, and the role
humans still play. Six chapters, 18 lessons.

| Chapter | Folder |
| --- | --- |
| 1. Foundations | [`ai-interview-course/chapter-01-foundations/`](ai-interview-course/chapter-01-foundations/) |
| 2. The big question | [`ai-interview-course/chapter-02-the-big-question/`](ai-interview-course/chapter-02-the-big-question/) |
| 3. Prompt mastery | [`ai-interview-course/chapter-03-prompt-mastery/`](ai-interview-course/chapter-03-prompt-mastery/) |
| 4. Live scenarios | [`ai-interview-course/chapter-04-live-scenarios/`](ai-interview-course/chapter-04-live-scenarios/) |
| 5. System design | [`ai-interview-course/chapter-05-system-design/`](ai-interview-course/chapter-05-system-design/) |
| 6. Behavioral and closing | [`ai-interview-course/chapter-06-behavioral-and-closing/`](ai-interview-course/chapter-06-behavioral-and-closing/) |

---

## By learning modality

### Read (deep focus)

- **Markdown** -- the source of truth. Read on GitHub or in your editor.
- **PDF** -- printable / annotate in Acrobat. Open `pdf-courses/<course>.pdf`
  for the full course in one file, or the per-lesson PDFs in subfolders.
- **EPUB** -- for Kindle / iBooks / KOReader. Two files in `epub-courses/`.
- **Word** -- styled `.docx` with Roboto + branded headings, ready for
  annotation in Word / Pages.

### Listen (commute / chores)

- **MP3 narrations** in `audio-courses/` -- one MP3 per lesson plus chapter
  intros and study plans. Generate with:
  ```pwsh
  python tools\build_audio.py
  ```
  See [`audio-courses/README.md`](audio-courses/README.md) for voice and rate
  options.

### Look (whiteboard recall)

- **Mermaid diagrams** in [`diagrams/`](diagrams/) -- render automatically on
  GitHub:
  - [`react-architecture.md`](diagrams/react-architecture.md) -- component tree
  - [`react-data-flow.md`](diagrams/react-data-flow.md) -- data pipeline
  - [`react-state-lifecycle.md`](diagrams/react-state-lifecycle.md) -- click → re-render
  - [`ai-prompt-cycle.md`](diagrams/ai-prompt-cycle.md) -- the loop
  - [`ai-skill-stack.md`](diagrams/ai-skill-stack.md) -- four-tier pyramid
  - [`ai-seven-pillars.md`](diagrams/ai-seven-pillars.md) -- mind-map of human-owned decisions

- **Reveal.js slide decks** in [`slides-courses/`](slides-courses/) -- one HTML
  file per chapter, open directly in a browser; use arrow keys to navigate.

### Drill (active recall)

- **Cheat sheets** in [`cheat-sheets/`](cheat-sheets/) -- one page per chapter,
  every soundbite distilled.
- **Flashcards** in [`flashcards/`](flashcards/):
  - `react-snooker.csv` (358 cards) and `ai-interview.csv` (736 cards) --
    import into [Anki](https://apps.ankiweb.net/),
    [Mochi](https://mochi.cards/), or RemNote.
  - `flashcards.json` -- consumed by `/interview-drill` for in-browser drilling.
- **Glossary** in [`glossary/`](glossary/) -- cross-course concept index with
  per-course and combined views.

### Plan (multi-week study)

- [`course/STUDY_PLAN.md`](course/STUDY_PLAN.md) -- 21 days, 1 hour/day for React.
- [`ai-interview-course/STUDY_PLAN.md`](ai-interview-course/STUDY_PLAN.md) -- 21 days for AI interviews.

### Code (write it yourself)

- **Exercises** in [`exercises/`](exercises/) -- each has `README.md`,
  `starter.tsx`, and `solution.tsx`:
  - [`01-scoring-pure-function`](exercises/01-scoring-pure-function/) -- implement the scoring formula.
  - [`02-orchestrator-pattern`](exercises/02-orchestrator-pattern/) -- refactor a god component.
  - [`03-useMemo-derived-data`](exercises/03-useMemo-derived-data/) -- fix wasted sorts.

### Interact (use the app)

Once you run `npm run dev` and open <http://localhost:3000>:

- **`/`** -- the Snooker Fantasy League itself. Every choice you study is a
  visible widget on this page.
- **`/study`** -- per-course progress bars and lesson checklists. Tick lessons
  as you finish them; progress persists in localStorage.
- **`/interview-drill`** -- random flashcard drill with filters (deck, tag,
  size), reveal / got-it / review-again buttons, review queue, and lifetime
  stats.

### Build / reference

- **`_source/SnookerFantasyLeague.jsx`** -- the original 1,654-line god
  component that the React course reverse-engineers.
- **`_briefs/`** -- the original prompt briefs that produced this repo.

---

## Suggested learning paths

### Path A -- "I have a Senior React interview in 3 weeks"

1. Read [`course/STUDY_PLAN.md`](course/STUDY_PLAN.md) and follow days 1-21.
2. After each lesson, open the matching cheat sheet
   ([`cheat-sheets/react-ch0X.md`](cheat-sheets/)) and recite the soundbites.
3. Daily: 10-card drill on `/interview-drill` filtered to React deck.
4. Week 3: redo all three exercises in [`exercises/`](exercises/) without peeking.
5. Final week: load `slides-courses/react-snooker-course/chapter-07-mastery-and-interviews.html`
   and rehearse your interview narrative out loud.

### Path B -- "I have a behavioral / AI question round next week"

1. Read all six chapters of [`ai-interview-course/`](ai-interview-course/) in
   one weekend (~6 hours).
2. Memorize the diagrams in [`diagrams/ai-*`](diagrams/) -- you must be able to
   redraw the prompt cycle and the seven-pillars mind-map from memory.
3. Drill 10 AI-deck flashcards per day on `/interview-drill`.
4. The night before: skim
   [`cheat-sheets/ai-ch01.md`](cheat-sheets/ai-ch01.md) through `ai-ch06.md`.

### Path C -- "I want to build the Snooker app myself from scratch"

1. Open [`_briefs/PROMPT_2_REVERSE_ENGINEERING_COURSE.md`](_briefs/PROMPT_2_REVERSE_ENGINEERING_COURSE.md)
   and read what the goal was.
2. Follow [`course/`](course/) chapters 1-7 in order.
3. At the end of each chapter, check the matching tab of the running app at
   <http://localhost:3000> -- the chapter you just finished is the feature you
   should now understand top to bottom.
4. Diff your output against [`components/`](components/) and [`lib/`](lib/).

### Path D -- "I just want to listen during my commute"

1. `python tools\build_audio.py` (~8 minutes one-time).
2. Drop `audio-courses/` into VLC / your podcast app / your phone.
3. Start with the two `STUDY_PLAN.mp3` files for orientation.

---

## How the assets are generated

Everything in `cheat-sheets/`, `flashcards/`, `glossary/`,
`word-documents-courses/`, `pdf-courses/`, `epub-courses/`, `slides-courses/`,
and `audio-courses/` is auto-generated from the two markdown courses by
scripts in [`tools/`](tools/). Edit the markdown, re-run the script, ship.

See [`tools/README.md`](tools/README.md) for the full pipeline. One-shot
regenerate everything:

```pwsh
pip install -r tools\requirements.txt
python tools\build_reference_docx.py
python tools\convert_courses.py --clean
python tools\convert_extra_formats.py --clean
python tools\build_flashcards.py
python tools\build_glossary.py
python tools\build_audio.py
```

The cheat sheets, study plans, diagrams, and exercises are **hand-written** --
they are the editorial layer on top of the auto-generated artifacts.
