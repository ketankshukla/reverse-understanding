# React Course — Chapter 7 Cheat Sheet

## Mastery, Deployment, and the Interview Narrative

> **Shipping is half the project. A working URL beats any whiteboard explanation.**

## Key concepts

- **Production polish** — loading states, empty states, error states, accessibility.
- **Deployment to Vercel** — `git push` → live URL. Free for personal sites.
- **Lighthouse score** — performance, accessibility, best practices, SEO. Aim 90+.
- **The portfolio README** — 1 screenshot, 2 paragraphs, 3 links.
- **The 90-second interview narrative** — identity → project → AI integration → trade-off → hook.

## The polish checklist

1. **Empty state** for every list (no players? Show a friendly message).
2. **Loading state** for every async operation (even if you don't have any yet).
3. **Error state** for every fetch (gracefully).
4. **Keyboard navigation** — Tab order, Enter to submit, Escape to close.
5. **Mobile** — test the layout at 375px wide.
6. **Lighthouse** — run it; fix anything below 90.

## Deployment recipe

```pwsh
# from repo root
npm run build         # confirm it builds locally
git push              # to GitHub
# import the repo in Vercel; defaults work
```

## Interview narrative — the 5 components

1. **Identity** (10s) — one sentence about you.
2. **Recent project** (30s) — what you built, what was hard.
3. **AI integration** (20s) — what you owned, what AI owned.
4. **Pivot / lesson** (15s) — one trade-off you'd revisit.
5. **The hook** (15s) — invite the interviewer to pick what to dig into.

## Patterns / decisions

- **README is your storefront.** Screenshot + 2 paragraphs + 3 links (live URL, source, docs).
- **Lighthouse the deployed URL, not localhost.** Numbers are different on Vercel's CDN.
- **Deploy before you polish the last 10%.** Real users find real bugs.
- **The README links to the live URL above the fold.** Recruiters scan; make it impossible to miss.

## Senior soundbites

> *"A deployed URL on your resume is worth ten unfinished side projects."*

> *"Lighthouse is not a vanity metric. Hiring panels check it."*

> *"The portfolio README is a 60-second sales pitch. Don't make me scroll."*

## If asked in an interview

> *"Walk me through this project on your portfolio."*

Answer: use the 90-second narrative — identity, recent project, AI integration, one trade-off you'd revisit, and a forked invitation: *"do you want me to dig into the architecture, the AI integration, or the deployment story?"* That last sentence converts a monologue into a conversation.
