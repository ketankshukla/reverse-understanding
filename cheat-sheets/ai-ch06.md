# AI Course — Chapter 6 Cheat Sheet

## Behavioral, Ethical & Closing

> **Hiring decisions in the senior loop turn on whether the panel trusts you. This chapter is for that part.**

## The 5 risks every interviewer expects you to discuss

1. **Hallucinations** — fabricated APIs, plausible-but-wrong logic. Mitigation: types, skeptical reading, docs in another window.
2. **Security** — silent vulnerabilities in AI-generated code. Mitigation: explicit security in prompt; extra review on auth/payments code.
3. **IP / licensing** — verbatim regurgitation; data leakage in prompts. Mitigation: enterprise-tier tools; redact before prompting.
4. **Prompt injection** — user content hijacking an agent. Mitigation: never trust user content as instructions; sanitize.
5. **Over-reliance / skill atrophy** — teams getting worse at what AI does for them. Mitigation: deliberate practice without AI.

## The accountability answer (one word)

> *"Whose bug is it when AI-generated code fails in prod?"*
>
> **"Mine."**

No hedging. No "shared accountability." No "it depends." Mine.

## The 7 cultural questions

1. How does AI change pair programming?
2. How do you review AI-generated code differently?
3. How do you onboard a junior?
4. Teammate's AI-generated PRs are causing tech debt — how do you handle it?
5. Team policy on AI-generated content?
6. Speed vs skill-development trade-off?
7. What does a healthy AI-using culture look like?

## The 18-question catalog (interview prep index)

1. *Tell me how you use AI day-to-day.* → ch01
2. *Are you a vibe coder?* → ch01
3. *Differences between AI tool generations?* → ch01
4. *Why do we still need human developers?* → ch02 (THE answer)
5. *AI in 5 years?* → ch02
6. *Time you didn't trust AI?* → ch02
7. *Show me a recent prompt.* → ch03
8. *Show me a prompt with bad output.* → ch03
9. *Do you use system prompts?* → ch03
10. *Build a feature with AI in front of me.* → ch04
11. *Debug this AI bug.* → ch04
12. *Review this AI PR.* → ch04
13. *Design X — where does AI fit?* → ch05
14. *What architectural decisions can AI not make?* → ch05
15. *How would you choose between A and B?* → ch05
16. *What's a risk you take seriously?* → ch06
17. *AI ships a bug — whose fault?* → ch06 ("Mine.")
18. *How do you mentor a junior?* → ch06

## The 3 closing questions to ask

1. *"What's the one part of your codebase that everyone agrees needs a rewrite, but nobody has time for?"*
2. *"What's your team's relationship with AI tools today? What's working, what isn't?"*
3. *"What does success look like at the 90-day mark? What's the failure mode that worries you most?"*

## The 30/60/90-day promise

> *"In the first 30 days: read every part of the codebase that touches my eventual work, do 4 code reviews observing how the team gives feedback, ship one tiny PR. In the next 30: take ownership of one feature end-to-end with a senior pairing. By 90: running my own design discussions, can give a 5-minute architecture walkthrough as if I built it."*

## Senior soundbites

> *"AI raises the floor for juniors. Our job is to ensure it doesn't lower their ceiling."*

> *"The model is not a trusted service. It's an unsanitized input source."*

> *"Mine."* (the accountability answer)

## If asked in an interview

The 90-second portfolio narrative (`chapter-06/03-portfolio-narrative.md`). The 18-question catalog above. The 3 closing questions. The 30/60/90 promise. **All four memorized, all four deliverable cold.**
