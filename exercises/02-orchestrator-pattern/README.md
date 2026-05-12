# Exercise 02 -- The Orchestrator Pattern

## The problem

You inherited a "god component" -- a single file that owns state **and** renders
every view, with 400 lines of JSX. Your job is to refactor it into:

- **One orchestrator** that owns state and the data projection.
- **Two presentational components** that get teams + callbacks via props.

## What the orchestrator owns

```ts
const [activeTab, setActiveTab] = useState<'list' | 'detail'>('list');
const [selected, setSelected]   = useState<Team | null>(null);

const sorted = useMemo(
  () => [...TEAMS].sort((a, b) => b.points - a.points),
  []
);
```

## What the children own

`<TeamList />` -- gets `teams` + `onPick(team)` and renders rows.
`<TeamDetail />` -- gets `team` + `onBack()` and renders the detail view.

Neither child should call `useState` for anything that belongs to the orchestrator.

## Vibe prompt you would have used

> *"Refactor this 400-line component. The orchestrator should hold all state
> (active tab + selected team) and a memoized sorted list. Extract two presentational
> children: `TeamList` (props: `teams`, `onPick`) and `TeamDetail`
> (props: `team`, `onBack`). The children must be pure -- no useState, no useEffect.
> Use TypeScript. Use Tailwind for layout. Each child should be in its own file
> mentally, but for this exercise put everything in one file separated by section
> comments."*

## Hints

- The orchestrator's JSX is mostly `{activeTab === 'list' ? <TeamList .../> : <TeamDetail .../>}`.
- A "callback up" is just `onPick={(t) => { setSelected(t); setActiveTab('detail'); }}`.
- The children receive **functions** as props, not state setters. Never pass
  `setActiveTab` down -- that leaks orchestration concerns.

## When you are done

Compare against `solution.tsx`. Verify that **neither** `TeamList` nor `TeamDetail`
imports `useState`. If they do, you have the wrong shape.
