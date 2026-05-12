# React State Lifecycle: A User Click → A Re-render

Trace what happens when the user clicks the "Predictions" tab. Every step is
synchronous and pure -- React just schedules a re-render and asks the orchestrator
to give it the new tree.

```mermaid
sequenceDiagram
    actor User
    participant Tab as Tab Button
    participant SFL as SnookerFantasyLeague
    participant React as React Reconciler
    participant Pred as PredictionsTab
    participant DOM

    User->>Tab: click "Predictions"
    Tab->>SFL: onClick -> setActiveTab('predictions')
    SFL->>React: schedule re-render with new state
    React->>SFL: call the function again
    note over SFL: useState returns the new activeTab<br/>useMemo returns same teamsWithScores<br/>(deps did not change -> cached)
    SFL-->>React: returns updated JSX tree
    React->>Pred: mounts PredictionsTab with props
    Pred-->>React: returns its JSX
    React->>DOM: diff old vs new, patch the minimum
    DOM-->>User: predictions view appears
```

## What to say out loud

> "Clicking a tab is just `setState`. React re-runs the orchestrator function
> top to bottom, but `useMemo` skips the expensive sort because its dependency
> array hasn't changed. The new JSX is diffed against the old DOM and only the
> affected nodes get touched."

## Why this matters in interviews

Interviewers ask: *"What happens when you click the tab?"* The wrong answer is
"React re-renders the whole page." The right answer is the sequence above:
state change → orchestrator re-runs → memoized derivations skip → reconciliation
patches the diff.

## See also

- Chapter 4: `course/chapter-04-state-and-hooks/01-useState-mental-model.md`
- Chapter 4: `course/chapter-04-state-and-hooks/02-the-orchestrator-pattern.md`
