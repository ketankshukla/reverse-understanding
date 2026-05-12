# React Architecture: Component Tree

The Next.js App Router renders this exact tree every time you visit `/`.
Memorize the boxes -- in an interview, you should be able to draw this on
a whiteboard before opening the editor.

```mermaid
flowchart TD
    Layout["app/layout.tsx<br/>RootLayout"] --> Page["app/page.tsx<br/>Page"]
    Page --> SFL["components/SnookerFantasyLeague.tsx<br/>(orchestrator, 'use client')"]

    SFL --> StateBox{{"useState&nbsp;activeTab&nbsp;|&nbsp;selectedTeam<br/>useMemo&nbsp;teamsWithScores"}}

    SFL --> Standings["tabs/StandingsTab"]
    SFL --> Matches["tabs/MatchesTab"]
    SFL --> Predictions["tabs/PredictionsTab"]
    SFL --> Players["tabs/PlayersTab"]
    SFL --> Analytics["tabs/AnalyticsTab"]

    Standings --> SRow["standings/TeamRow"]
    Predictions --> PCard["predictions/TeamPredictionCard"]
    Predictions --> RoundList["predictions/RoundList"]
    Players --> PTable["players/PlayerTable"]
    Analytics --> Charts["analytics/PointsByRoundChart<br/>analytics/WinPercentageChart"]

    classDef orchestrator fill:#FEF3C7,stroke:#0F5132,stroke-width:2px
    classDef tab fill:#F0FDF4,stroke:#15803D
    classDef leaf fill:#FFFFFF,stroke:#9CA3AF
    classDef state fill:#FFFBEB,stroke:#D97706,stroke-dasharray:4 2

    class SFL orchestrator
    class Standings,Matches,Predictions,Players,Analytics tab
    class SRow,PCard,RoundList,PTable,Charts leaf
    class StateBox state
```

## What to say out loud

> "There is exactly one stateful component -- the orchestrator. Every tab is a
> presentational view that receives teams and callbacks via props. State lives at
> the lowest common ancestor of every component that needs it."

## See also

- Chapter 4: `course/chapter-04-state-and-hooks/02-the-orchestrator-pattern.md`
- Chapter 5: `course/chapter-05-composition/01-when-to-split-components.md`
