# Diagrams

Mermaid diagrams that visualize the architecture and flow of both courses.
Open any file on GitHub and the diagram renders automatically. To preview locally
use the Mermaid extension for VS Code or paste a block into <https://mermaid.live>.

## React + Snooker Fantasy League

- `react-architecture.md` -- component tree from `app/layout.tsx` down to leaf views.
- `react-data-flow.md` -- how `TEAMS` data passes through `calculateTeamScores`,
  becomes `teamsWithScores`, and is consumed by each tab.
- `react-state-lifecycle.md` -- `useState` and `useMemo` interactions when the user
  switches tabs and selects a team.

## AI Interview Course

- `ai-prompt-cycle.md` -- the five-step prompt → review → accept/reject loop.
- `ai-skill-stack.md` -- the four-tier skill pyramid from chapter 1.
- `ai-seven-pillars.md` -- the seven decisions humans still own.

## Why diagrams matter

A senior engineer can sketch the component tree of any app they own on a whiteboard
in 60 seconds. These diagrams are the visual half of the soundbites in the cheat
sheets -- memorize the shape, then re-draw it during interviews.
