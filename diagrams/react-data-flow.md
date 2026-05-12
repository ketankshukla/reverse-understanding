# React Data Flow: From `TEAMS` to Pixels

Pure data flows in one direction: `lib/teams.ts` → `calculateTeamScores` →
`teamsWithScores` (sorted) → tab components → DOM. No tab mutates the raw data.

```mermaid
flowchart LR
    subgraph data["lib/ (pure, no React)"]
        Teams["teams.ts<br/>TEAMS&nbsp;= 8 raw entries"]
        Matches["matches.ts<br/>ROUND1MATCHES,&nbsp;ROUND2MATCHES,<br/>QFMATCHES,&nbsp;SFMATCHES,&nbsp;FINAL"]
        Scoring["scoring.ts<br/>calculateTeamScores(team)"]
    end

    Teams --> Scoring
    Matches --> Scoring
    Scoring -->|"{r1:30, r2:15, qf:12, sf:6, f:4, total:67}"| WithScores["teamsWithScores<br/>(useMemo, sorted desc)"]

    WithScores --> Standings["StandingsTab<br/>renders top 8 rows"]
    WithScores --> Predictions["PredictionsTab<br/>per-team prediction grid"]
    WithScores --> Players["PlayersTab<br/>cross-team player counts"]
    WithScores --> Analytics["AnalyticsTab<br/>bar + pie charts"]

    classDef pure fill:#EFF6FF,stroke:#1D4ED8
    classDef derived fill:#FFFBEB,stroke:#D97706,stroke-width:2px
    classDef view fill:#F0FDF4,stroke:#15803D

    class Teams,Matches,Scoring pure
    class WithScores derived
    class Standings,Predictions,Players,Analytics view
```

## What to say out loud

> "There are three layers: pure data, a single derived projection, and views.
> Views are dumb. They get props in and emit clicks back up. If a number ever
> looks wrong, the bug is exactly one of `scoring.ts`, the raw data, or the
> formatter in the view -- never any deeper."

## See also

- Chapter 1: `course/chapter-01-foundations/03-pure-functions-and-scoring.md`
- Chapter 4: `course/chapter-04-state-and-hooks/03-useMemo-and-derived-data.md`
