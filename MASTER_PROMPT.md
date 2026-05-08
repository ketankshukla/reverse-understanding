# Master Prompt: Refactor + Reverse-Engineering Course

> **How to use this prompt:** Drop these three files into an empty project folder, open it in Windsurf, then paste the prompt below into the Cascade chat:
>
> 1. `SnookerFantasyLeague.jsx` — the original app
> 2. `PROMPT_1_NEXTJS_REFACTOR.md` — the refactor instructions
> 3. `PROMPT_2_REVERSE_ENGINEERING_COURSE.md` — the course instructions
>
> The agent will execute Phase 1 (refactor), then Phase 2 (course), in sequence, with a clean handoff between them.

---

## The Master Prompt

```
You are working in a Windsurf workspace that contains exactly three files I
have dropped in:

  1. SnookerFantasyLeague.jsx
       — a single-file React app I vibe-coded over many sessions
       — about 1,650 lines of working code
       — this is the source of truth for what the app does

  2. PROMPT_1_NEXTJS_REFACTOR.md
       — a self-contained prompt that tells you how to scaffold a Next.js 14
         project and refactor the .jsx file into it
       — read this file IN FULL before starting Phase 1

  3. PROMPT_2_REVERSE_ENGINEERING_COURSE.md
       — a self-contained prompt that tells you how to produce a teaching
         course explaining how the original .jsx app would have been built
         from scratch
       — read this file IN FULL before starting Phase 2

YOUR JOB

Execute both prompts in order, treating them as authoritative briefs. You are
not interpreting them loosely — they are the spec. The instructions inside
those .md files override anything I implied here if there is ever a conflict.

ABOUT ME

I am a vibe coder. I describe outcomes in plain English; I do not write code
manually. Make decisions for me with sensible defaults and brief reasoning.
Do not stop to ask permission unless something is irreversible (deleting
files, pushing to a remote, charging money, exposing secrets). Bright/light
UI surfaces, Roboto fonts, larger text in any artifact you produce — never
dark mode.

PHASE 1 — THE REFACTOR

Read PROMPT_1_NEXTJS_REFACTOR.md in full. Then:

  • Move SnookerFantasyLeague.jsx to a subfolder called `_source/` so the
    project root is clean before you scaffold. Do not delete the file —
    the course in Phase 2 will need to read it.
  • Move PROMPT_1_NEXTJS_REFACTOR.md and PROMPT_2_REVERSE_ENGINEERING_COURSE.md
    to a `_briefs/` folder for the same reason — keep them, but get them
    out of the project root.
  • Execute the refactor exactly as PROMPT_1 specifies. Do not skip any
    step. Do not improvise structure that contradicts the spec.
  • Stop at the point PROMPT_1 says to stop (after `npm run build` succeeds
    and the local git repo has its initial commit). Do NOT push to GitHub
    and do NOT deploy to Vercel — that is the user's manual step.

When Phase 1 is complete, print a clearly-marked summary block:

  ============================================================
  ✅ PHASE 1 COMPLETE — REFACTOR
  ============================================================
  • Project structure (one-line tree)
  • Build status: passing / failing
  • Manual next steps for the user (3-5 commands max)
  • Anything I should know before Phase 2

Then immediately move on to Phase 2 without waiting for me to confirm.

PHASE 2 — THE COURSE

Read PROMPT_2_REVERSE_ENGINEERING_COURSE.md in full. Then:

  • Read the ORIGINAL SnookerFantasyLeague.jsx (now in _source/) — not the
    refactored components in /components/. The course teaches the original
    monolith's evolution; the refactored version is just the destination.
  • Produce the course exactly as PROMPT_2 specifies — one self-contained
    markdown document, all 9 lessons (Lesson 0 through Lesson 8), each with
    its "Vibe prompt you would have used" section and CHECK YOURSELF box.
  • Save the course to `course/SNOOKER_FANTASY_LEAGUE_COURSE.md` inside the
    project (so it lives alongside the code, not buried in chat history).
  • Make sure the course renders correctly — fenced code blocks, syntax-
    highlighted, ## headers throughout.

When Phase 2 is complete, print a final summary:

  ============================================================
  ✅ PHASE 2 COMPLETE — COURSE
  ============================================================
  • Course saved to: course/SNOOKER_FANTASY_LEAGUE_COURSE.md
  • Word count and approximate read time
  • Recommended order: read course first, then explore the refactored
    /components/ folder, comparing each lesson to its real implementation

FINAL PROJECT LAYOUT

When everything is done, the workspace should look like this:

  ./
    _briefs/
      PROMPT_1_NEXTJS_REFACTOR.md
      PROMPT_2_REVERSE_ENGINEERING_COURSE.md
    _source/
      SnookerFantasyLeague.jsx       ← original, untouched
    app/                              ← Next.js App Router
    components/                       ← refactored components
    lib/                              ← data + scoring
    course/
      SNOOKER_FANTASY_LEAGUE_COURSE.md   ← the teaching artifact
    package.json, tsconfig.json, tailwind.config.ts, next.config.mjs,
    .gitignore, .prettierrc, README.md

GUARDRAILS (non-negotiable)

  • Never push to GitHub. Never deploy to Vercel. Never run `vercel` CLI.
    Never create remote repositories. Local git commits only.
  • Never modify the original SnookerFantasyLeague.jsx after moving it. It
    is a historical artifact for the course.
  • If `npm install` fails, fix dependency issues; don't skip the install.
  • If `npm run build` fails after the refactor, fix it before moving to
    Phase 2. A failing build means the refactor is incomplete.
  • If the course's word budget per lesson would be padded, keep it short.
    The PROMPT_2 spec explicitly bans filler.

START NOW

Begin by listing the three files you can see in the workspace, then start
Phase 1. Do not output a long acknowledgment — just confirm the files are
present and start moving.
```

---

## Notes for the user

- **Total runtime**: expect 20–35 minutes of agent work across both phases. Phase 1 (refactor + npm install + build) is the longer one. Phase 2 (course generation) is mostly text and runs faster.
- **What you'll have at the end**: a fully working Next.js project that builds locally, the original `.jsx` preserved as a historical artifact in `_source/`, the briefs filed away in `_briefs/`, and a complete course at `course/SNOOKER_FANTASY_LEAGUE_COURSE.md`.
- **Suggested next steps after the agent finishes**:
  1. Open `course/SNOOKER_FANTASY_LEAGUE_COURSE.md` and read Lesson 0 through Lesson 2 — these establish the data model and make the rest of the project map make sense.
  2. With Lesson 3 open in one window, open the corresponding refactored file (`components/tabs/StandingsTab.tsx`) in another. Read them side-by-side.
  3. Run `npm run dev` and verify the refactored app renders identically to the original.
  4. Only then push to GitHub and connect Vercel — that's a five-minute UI task you do yourself, not the agent.
- **If Phase 1 fails partway**: the agent will tell you exactly what broke. The fix is usually a dependency version pin. You can paste the error back into Cascade with "fix this and continue from where you left off."
- **If Phase 2's course feels too dry**: after it finishes, you can ask Cascade *"Rewrite Lesson 5 with more pub-conversation energy, like we're at a pub explaining this"* — individual lessons can be regenerated without redoing the whole course.
