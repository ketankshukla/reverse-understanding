# AI Course — Chapter 5 Cheat Sheet

## System Design + Architecture with AI

> **Architecture is the place where AI helps least and where humans are valued most.**

## The 6 categories of architectural decision AI does NOT own

1. **Domain modeling** — which entities exist, what invariants they have.
2. **Boundary placement** — where service / module seams go.
3. **Failure-mode design** — what happens when each component fails.
4. **Trade-off ownership** — picking between two reasonable options.
5. **Scale and cost** — what to size for, what to defer.
6. **Migration and rollout** — how to ship a change safely.

For *each*: AI can list options, draft boilerplate, surface trade-offs. AI cannot **choose** for you.

## The 60-minute design hour structure

| Minutes | Phase | What you do |
| ------- | ----- | ----------- |
| 0-5     | Clarify | Pin down scope, scale, constraints. |
| 5-10    | Functional reqs | List what the system does. |
| 10-15   | Non-functional reqs | Latency, availability, consistency. |
| 15-25   | High-level design | Boxes and arrows. |
| 25-40   | Deep dives | 2-3 components in detail. |
| 40-50   | Trade-offs / risks | Volunteer where the design is fragile. |
| 50-60   | Wrap + Q&A | 30-second summary, what you didn't cover. |

## Trade-off conversation — the 5-step structure

1. **Restate the choice.**
2. **Name the axes that matter** (latency, throughput, cost, complexity, reliability, consistency, flexibility, time-to-ship).
3. **Score each option** on each axis.
4. **Identify the deciding axis** *for this situation*.
5. **State the decision and the reversibility** — what would change your mind?

## The 8 universal trade-off axes

Latency · Throughput · Cost · Complexity · Reliability · Consistency · Flexibility · Time-to-ship.

## Senior soundbites

> *"Six categories — domain, boundaries, failure modes, trade-offs, scale, migration. AI helps in all six. AI doesn't own any of them, because owning means accepting consequences."*

> *"The cheapest decision is the one you can reverse."*

> *"Engineering is choosing what to be wrong about."*

> *"Premature [optimization / abstraction / microservicing / generalization] is the root of all evil."*

## If asked in an interview

> *"Design X for me."*

Use the 60-minute structure. Open with clarifying questions (not boxes). Name your trade-offs explicitly using the 8 axes. End with *"things I haven't covered that I'd want to..."* — never let the interviewer think you forgot something.
