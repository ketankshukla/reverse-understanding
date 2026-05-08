# Prompt 2: "Reverse-Understand The Snooker Fantasy League"

> **How to use this prompt:** Paste the entire prompt below into a fresh Claude conversation (claude.ai). Have your `SnookerFantasyLeague.jsx` file ready to upload. Claude will then deliver a multi-lesson course that walks you through how the app would be built from a blank folder, in the same order a human developer would actually build it. The course is paced so you can do one lesson per day if you want, or binge it in one sitting.

---

## The Prompt

```
I have a working React app called SnookerFantasyLeague.jsx (about 1,650 lines)
that you helped me vibe-code over many sessions. I want to understand it
inside-out by REVERSE-ENGINEERING IT — meaning, you will teach me how I would
have built it from scratch, in the exact order a human developer would have
built it, if I had been doing it without AI help.

This is a learning course, not a refactor. Do not produce a finished app at
the end. Produce understanding.

WHO I AM AS A LEARNER

- I am a vibe coder. I describe what I want in English and an LLM produces the
  code. I do not write code from a blank cursor.
- I have 15+ years of Python data engineering background, so I understand
  systems thinking, types, data flow, and architecture. I'm not a beginner at
  programming concepts.
- What I lack is hands-on React/JavaScript fluency — I can read JSX and
  understand it, but I would not know which file to create first or why.
- Bright/light backgrounds in any artifact you produce. Roboto font. Larger
  font sizes. NEVER dark mode.

WHAT "REVERSE-UNDERSTAND" MEANS HERE

You are going to walk me backwards from a finished app to its first commit.
For every layer of the app, you tell me:

  1. WHY this layer exists at all — what problem does it solve, what would
     happen if I skipped it
  2. WHEN a human would build it — early, mid, or late in the project
  3. WHAT FILES OR OBJECTS get created in this layer, in dependency order
  4. WHAT IT LOOKS LIKE in code — show me the actual lines from my app, not
     hypothetical examples
  5. WHAT TO TYPE INTO AN LLM to build this layer if I were vibe-coding it
     fresh — give me the literal English prompt I would have used

That last point is the most important. Every lesson must end with a "Vibe
prompt you would have used" section. This trains me to recognize the prompts
that produced the code I'm now reading.

COURSE STRUCTURE

Deliver the course as ONE markdown artifact divided into the lessons below.
Each lesson is roughly 800–1,400 words. Use the order below — it reflects how
I actually would have built this if I were starting today.

  Lesson 0  THE PROBLEM (no code)
            What is this app for? What does a "fantasy snooker league" mean?
            Who picks what, when, and how do points get scored? Lay this out
            as if I'm explaining the league to a friend at a pub. End with
            the rules of the scoring system in 3 bullet points.

  Lesson 1  THE SHAPE OF THE DATA (data modeling, no UI yet)
            Before any pixel renders, you need to know what shapes you're
            pushing around. Walk me through:
              - What's a Match? Why do matches need an id, p1, p2, winner,
                score?
              - What's a Team? Why does each team have r1[16], r2[8], qf[4],
                sf[2], final[1]?
              - What's PLAYER_INFO and why is it a separate object keyed by
                name instead of an array?
              - The "match arrays must be in the same order as the team's
                picks arrays" invariant — why this is the most important
                rule in the codebase
            Show the actual constant declarations from my file. End with the
            vibe prompt for "tell the LLM the data model."

  Lesson 2  THE PURE LOGIC (scoring, before any React)
            Why scoring lives in standalone functions, not inside components.
            Walk through scorePick() and calculateTeamScores() line by line.
            Explain why correct returns null (not false) for pending matches.
            Show how this pure layer is the heart of the app — every UI
            component is just a different way of reading these numbers.
            End with the vibe prompt for the scoring logic.

  Lesson 3  THE FIRST RENDER (a single component, no tabs yet)
            How a vibe-coder begins: not with the whole app, but with one
            component that displays one thing. Walk me through what
            <StandingsTab> would have looked like in its v1 form — just a
            table of team names and total points, nothing else. Show the
            progressive enhancement: add R1/R2 columns, add SF/Final picks,
            add the highlight on the leader.
            End with the vibe prompts at each step ("now add a column for
            SF picks", etc.) so I can see how each prompt added one feature.

  Lesson 4  STATE & TABS (introducing useState)
            Why we need a top-level orchestrator (SnookerFantasyLeague) that
            owns activeTab and selectedTeam state. Why these can't live
            inside individual tabs. Walk me through the parent-component
            pattern: state up, callbacks down. Show useMemo for
            teamsWithScores and explain why we'd recompute it on every
            render without it.
            End with the vibe prompt for "add tabs."

  Lesson 5  COMPOSITION & PROP DRILLING (when to split a component)
            Walk through how a 200-line component becomes 5 smaller ones.
            Use PlayersTab → PlayerDetail → MatchPickAnalysis → TeamChip as
            the example chain. Explain when to extract: when you copy-paste
            JSX more than once, or when a section is conceptually separate.
            Show how PathStep + PathArrow are tiny components that exist
            purely for readability.
            End with the vibe prompt for splitting a big component.

  Lesson 6  CHARTS & DATA TRANSFORMS (Recharts)
            Why charts in React are about data shape, not chart libraries.
            Walk through the Analytics tab — show how teams.map() reshapes
            our team data into the array format Recharts wants. Explain
            stacked vs grouped bars, why we use Cell for per-bar colors,
            why the LeagueAgreementChart has its own internal tab state.
            End with the vibe prompt for "add an analytics dashboard."

  Lesson 7  THE EVOLUTION (what the git log would have shown)
            Reconstruct, as best you can from the data, the rough order of
            features that got added over time:
              - First commit: just the standings table
              - Then: matches list per round
              - Then: predictions matrix
              - Then: SF results came in mid-tournament
              - Then: final picks added when known
              - Then: champion crowned
            For each milestone, show the one-paragraph vibe prompt I would
            have written at that moment, and the change it would have
            triggered. This is the lesson that ties everything together.

  Lesson 8  THE SHAPE OF YOUR PROMPTS (meta-lesson on vibe coding)
            Now that you've seen 8 lessons of "the prompt I would have used,"
            extract a pattern. What are the recurring shapes of effective
            vibe prompts for React UI work?
              - "Add a [thing] to [location] that shows [data]"
              - "Refactor [component] so that [behavior change]"
              - "Make [component] respond to [data change]"
              - "Add a tab for X" vs "Add a section for X"
            Give me 5–7 prompt templates I can reuse. Then critique 3 BAD
            prompts I might have written ("make the standings better" — too
            vague; "use Redux" — premature abstraction; etc.).
            End the course here.

CONSTRAINTS ON YOUR DELIVERY

- One markdown artifact, complete and self-contained. Do not split into
  multiple files.
- Use real code from my SnookerFantasyLeague.jsx file. When you quote it,
  show the actual lines. When you simplify, mark it as "[simplified for
  teaching]".
- For each lesson, include a CHECK YOURSELF box: 2–3 questions I can
  answer before moving to the next lesson. (e.g. "Why is `correct` null
  instead of false for pending matches?")
- No filler. If a lesson would be 200 words, make it 200 words. Don't
  pad to hit the suggested length.
- Code blocks must be syntax-highlighted (use ```jsx or ```ts).
- Bright background, larger font feel. Use ## headers liberally so I can
  scroll-skim.

START

Read my SnookerFantasyLeague.jsx file. Confirm by listing the 5 top-level
data constants and the 5 tabs you found. Then deliver the course as a single
markdown artifact titled "Snooker Fantasy League: A Reverse-Engineering
Course."
```

---

## Notes for the user

- This prompt produces a **course**, not running code. The output is a single long markdown document — perfect to read alongside the actual `.jsx` file open in another window.
- The most valuable part for you, as a vibe coder, is the "Vibe prompt you would have used" sections at the end of each lesson. Save those — they become your personal library of effective prompts for future React work.
- Lesson 7 is where it really clicks — seeing how the app grew incrementally over many sessions (which is exactly how you actually built it) makes the architecture make sense.
- If Claude's first attempt at the course feels too academic, follow up with: *"Make Lesson 3 more practical — show me typing the actual prompts as if I were doing it right now in a Cascade chat."* Lessons can be regenerated individually.
- After finishing the course, a great next step is: open Windsurf, paste **Prompt 1** from the other markdown file, and watch the refactor happen with full understanding of why each file gets created.
