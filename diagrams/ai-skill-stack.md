# The AI-Era Skill Stack

Every layer above is impossible without the layer below. Junior devs flame out
when they try to live on the top layer with no foundation.

```mermaid
flowchart TD
    Top["**4. Judgement**<br/>Pick the right architecture,<br/>own ethics + risk + cost,<br/>decide what NOT to build"]
    L3["**3. Communication**<br/>Translate ambiguous human intent<br/>into prompts, specs, RFCs, PRs"]
    L2["**2. Verification**<br/>Read code critically, write tests,<br/>debug AI hallucinations"]
    L1["**1. Fundamentals**<br/>Data structures, async, types,<br/>HTTP, browser, git, your language"]

    L1 --> L2 --> L3 --> Top

    classDef base fill:#DBEAFE,stroke:#1D4ED8,stroke-width:2px
    classDef mid1 fill:#DCFCE7,stroke:#15803D,stroke-width:2px
    classDef mid2 fill:#FEF3C7,stroke:#D97706,stroke-width:2px
    classDef top fill:#FECACA,stroke:#B91C1C,stroke-width:3px

    class L1 base
    class L2 mid1
    class L3 mid2
    class Top top
```

## What to say out loud

> "AI compresses the time I spend on the bottom two layers, but the top two
> grow in importance. The reason teams still hire humans is judgement and
> communication -- the layers an LLM can't own because it has no stake in the
> outcome."

## See also

- Chapter 1: `ai-interview-course/chapter-01-foundations/02-the-skill-stack.md`
- Chapter 2: `ai-interview-course/chapter-02-the-big-question/02-the-seven-pillars.md`
