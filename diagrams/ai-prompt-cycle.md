# AI Prompt Cycle: From Intent to Merged Code

The senior workflow with Copilot/Cursor/Claude is never "type prompt, paste
output". It is a loop with explicit gates. If you cannot draw this loop on a
whiteboard, the interviewer assumes you are a pasta-coder.

```mermaid
flowchart LR
    Intent["1. Intent<br/>(what user / spec wants)"] --> Design["2. Design<br/>(human picks shape:<br/>types, files, boundaries)"]
    Design --> Prompt["3. Prompt<br/>(role + context + task +<br/>constraints + format + examples)"]
    Prompt --> AI[("LLM")]
    AI --> Output["4. AI Output"]
    Output --> Review{"5. Review<br/>does it pass the<br/>smell test?"}
    Review -->|yes| Tests["6. Run tests + linter"]
    Review -->|no| Refine["Refine prompt<br/>(add example,<br/>narrow scope,<br/>quote the bug)"]
    Refine --> Prompt
    Tests -->|pass| Commit["7. Commit + PR<br/>(human owns the diff)"]
    Tests -->|fail| Refine

    classDef human fill:#FEF3C7,stroke:#0F5132,stroke-width:2px
    classDef ai fill:#EDE9FE,stroke:#7C3AED,stroke-width:2px
    classDef gate fill:#FEE2E2,stroke:#B91C1C

    class Intent,Design,Prompt,Tests,Commit human
    class AI,Output ai
    class Review gate
```

## What to say out loud

> "AI never owns the design or the review. I own the shape of the code and the
> tests. The model just fills in the middle, and only after I have written down
> what 'done' looks like."

## Bad-answer pattern to avoid

- "I copy the requirements into the prompt and paste back what it gives me." -- this skips Design *and* Review and is exactly the answer that ends interviews.

## See also

- Chapter 3: `ai-interview-course/chapter-03-prompt-mastery/01-anatomy-of-a-prompt.md`
- Chapter 4: `ai-interview-course/chapter-04-live-scenarios/03-code-review-of-ai.md`
