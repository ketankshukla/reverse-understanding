# AI Course — Chapter 4 Cheat Sheet

## Live Scenarios: Pair, Debug, Review

> **In the live round, the panel cares about *how you behave* more than what you produce.**

## The 60-second pair-programming playbook

When the prompt arrives, deliver these 4 lines out loud:

1. *"Let me restate the problem to make sure I understand."* (10s)
2. *"Here are the 2-3 questions I'd ask before writing anything."* (15s)
3. *"Here's the approach I'd take; here's the alternative."* (25s)
4. *"Let me start with the smallest version that runs."* (10s)

**Then start coding.** The panel has already decided you're senior in those 60 seconds.

## The 4-step AI debug flowchart

1. **Reproduce** — exact steps that trigger the bug. If you can't reproduce, you can't fix.
2. **Bisect** — `git bisect` or commenting out half the change until the bug halves.
3. **Hypothesize** — one specific hypothesis, then *prove or disprove it*. Not vague.
4. **Verify** — confirm the fix actually solves the bug *and doesn't break anything else*.

## The 7 AI-generated bug signatures

1. **Fabricated API** — `array.shuffleInPlace()` doesn't exist.
2. **Off-by-one** — AI loves index math; check loop bounds.
3. **Wrong return type** — claims to return `Promise<T>`, returns `T`.
4. **Missing await** — async function called without `await`.
5. **Plausible nonsense logic** — passes types, fails semantics.
6. **Hidden mutation** — modifies the input parameter.
7. **Silent error swallow** — `try { ... } catch {}` — empty catch.

## The 11-item AI-code review checklist

1. **Does it run?** (Try it before reviewing the diff.)
2. **Does it pass the tests** that already existed?
3. **Are the new tests *real* tests** (not just `expect(true).toBe(true)`)?
4. **Are all imports real?** (No fabrications.)
5. **Are types correct end-to-end?** (No `any` slipped in.)
6. **Are there hidden mutations?**
7. **Are error paths handled?**
8. **Are security boundaries respected?** (Auth checks, input validation, no secrets in code.)
9. **Does it match the codebase style?**
10. **Is the abstraction level right?** (Not over-engineered; not too clever.)
11. **Could a junior debug this in 6 months?**

## Senior soundbites

> *"Senior code review with AI in the loop is the new senior skill. Faster code production = more review per hour, not less."*

> *"If I can't reproduce the bug in 5 minutes, I haven't understood it yet."*

> *"Empty catches are not error handling. They're error denial."*

## If asked in an interview

> *"Build a small feature using AI right now."*

Use the 60-second playbook above. Narrate every prompt. Reject anything that doesn't compile or doesn't make sense. **The panel is watching your *process*, not your typing speed.**
