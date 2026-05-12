# AI Course — Chapter 3 Cheat Sheet

## Prompt Mastery & The Rejection Journal

> **A prompt is a contract with the AI. Junior prompts are "do the thing." Senior prompts are 6-part contracts.**

## The 6 components of a senior prompt

1. **Role** — *"You are a senior TypeScript engineer."*
2. **Context** — *"This codebase uses Next.js 14 App Router and strict TypeScript."*
3. **Task** — *"Write a function that..."*
4. **Constraints** — *"Use the existing `Player` type; no `any`; pure function."*
5. **Examples** — *"Input: ... Output: ..."*
6. **Format** — *"Return only the function body, no commentary."*

## The 12 prompt patterns

1. **Specify** — make every constraint explicit.
2. **Show, don't tell** — provide input/output examples.
3. **Constrain the format** — *"return only JSON"*; *"only the diff"*.
4. **Reject** — *"Don't use X library; don't add comments."*
5. **Decompose** — break a large task into sub-prompts.
6. **Re-prompt with feedback** — *"That worked, but ___; fix only that."*
7. **Anchor with code** — paste the surrounding 30 lines.
8. **Personalize** — *"In our codebase, we always..."*
9. **Test-first** — write the test, ask AI to make it pass.
10. **Compare** — *"Give me 3 implementations; explain trade-offs."*
11. **Critique** — *"Review this for bugs / security / clarity."*
12. **Pair-narrate** — talk through your reasoning, then ask AI to fill in.

## The rejection journal

A daily log of AI output you **rejected** and **why**. Format:

```
[date] [tool] - prompt summary
  REJECTED because: [specific reason]
  KEPT instead: [what you did]
```

5 reasons to reject AI output:

1. **Fabricated API** — method doesn't exist.
2. **Plausible but wrong logic** — looks right, doesn't pass an edge case.
3. **Hidden dependency** — adds a library you don't want.
4. **Bad style fit** — doesn't match your codebase.
5. **Missing safety** — no auth check, no input validation, no error path.

## Senior soundbites

> *"Junior prompts are 'do the thing.' Senior prompts are 'do this thing, with these constraints, in this style, returning this format.'"*

> *"The rejection journal is the closest thing to deliberate practice with an AI."*

## If asked in an interview

> *"Show me a prompt you wrote recently."*

Pull up a real one. Walk through it on the 6 components. **The fact that you have a real example matters more than the example itself.**
