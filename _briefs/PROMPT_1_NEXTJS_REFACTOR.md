# Prompt 1: Refactor Snooker Fantasy League to Next.js + Vercel

> **How to use this prompt:** Open Windsurf in an empty folder. Paste the entire prompt below into the Cascade chat. The agent will scaffold a fresh Next.js 14 app, port the existing single-file React component into a proper modular structure, and prepare it for deployment to Vercel via GitHub.

---

## The Prompt

```
You are helping me refactor my single-file React app, SnookerFantasyLeague.jsx
(1,654 lines), into a production-ready Next.js 14 application that I will deploy
to Vercel via GitHub. I will paste the original .jsx file into the project root
before you begin so you can read it.

I am vibe-coding — I do not write code manually. Make all decisions for me with
sensible defaults, explain trade-offs in one sentence each, and proceed without
asking permission unless something would be irreversible or cost money.

GOALS

1. A clean, idiomatic Next.js 14 App Router project (TypeScript, not JavaScript).
2. Same visual output and behavior as the original .jsx file. No regressions.
3. Modular component structure — no more 1,600-line file.
4. Data layer separated from view layer. Tournament results and team picks live
   in their own files, not interleaved with JSX.
5. Deployable to Vercel from a public GitHub repo with zero config.
6. The app must remain a single self-contained page that runs entirely client-
   side. Do not add a database, auth, API routes, or server actions. The
   "data" is static and edited by hand for now.

TECH CHOICES (use exactly these)

- Next.js 14, App Router, TypeScript, strict mode on
- Tailwind CSS for layout and spacing primitives only — preserve the existing
  inline-style aesthetic for branded surfaces (gradient headers, colored badges,
  player cards). Do not try to convert every inline style to Tailwind.
- Recharts for charts (already used)
- lucide-react for icons (already used)
- Roboto + Roboto Slab from next/font/google
- ESLint + Prettier, default Next.js config
- No state management library — useState/useMemo only
- No CSS modules, no styled-components, no shadcn/ui

PROJECT STRUCTURE (create exactly this layout)

  app/
    layout.tsx              ← root layout, fonts, html<>body
    page.tsx                ← renders <SnookerFantasyLeague />
    globals.css             ← tailwind directives + a few CSS variables
  components/
    SnookerFantasyLeague.tsx     ← top-level orchestrator with tab state
    tabs/
      StandingsTab.tsx
      MatchesTab.tsx
      PredictionsTab.tsx
      PlayersTab.tsx
      AnalyticsTab.tsx
    standings/
      LeagueTable.tsx
      FormBadge.tsx
      StatCard.tsx
    matches/
      RoundButton.tsx
      MatchesList.tsx
      PlayerLine.tsx
      UpcomingMatchList.tsx
    predictions/
      PredictionMatrix.tsx
      TeamCardView.tsx
      RoundStat.tsx
      PicksList.tsx
      Legend.tsx
    players/
      PlayerCard.tsx
      PlayerDetail.tsx
      PathStep.tsx
      PathArrow.tsx
      StatTile.tsx
      MatchPickAnalysis.tsx
      TeamChip.tsx
    analytics/
      LeagueAgreementChart.tsx
      ChartCard.tsx
      InsightCard.tsx
  lib/
    types.ts                ← Match, Team, Player, ScoreDetail, RoundKey
    matches.ts              ← ROUND1_MATCHES, ROUND2_MATCHES, QF_MATCHES,
                              SF_MATCHES, FINAL_MATCH constants
    teams.ts                ← TEAMS constant (the 8 fantasy teams + their picks)
    players.ts              ← PLAYER_INFO constant
    scoring.ts              ← scorePick(), calculateTeamScores(), pure functions
    constants.ts            ← color palettes, round metadata
  package.json
  tsconfig.json
  tailwind.config.ts
  next.config.mjs
  .gitignore
  .prettierrc
  README.md

EXTRACTION RULES

- Every named const in the original file goes in lib/. Nothing in components
  declares match data inline.
- Every named `function FooThing()` becomes its own .tsx file with a default
  export. The filename matches the component name.
- Sub-components used by exactly one parent (e.g. PathArrow used only by
  PlayerDetail) live in the same folder as the parent. They do NOT need their
  own subfolder.
- Convert all functions to TypeScript. Add explicit prop types. Use the types
  from lib/types.ts. Do not use `any`. Inferred return types are fine.
- Keep the inline-style approach for visual fidelity. Do not refactor styles
  into Tailwind classes — the visual richness depends on dynamic colors that
  are easier to read inline. Tailwind is only for the page-level grid/spacing.
- Preserve all existing logic byte-for-byte. The scoring math, the standings
  computation, the chart configurations, the tab structure must all behave
  identically. This is a refactor, not a rewrite.

TYPE DEFINITIONS (put these in lib/types.ts)

  export type RoundKey = 'r1' | 'r2' | 'qf' | 'sf' | 'final';

  export interface Match {
    id: number;
    p1: string;
    p2: string;
    winner?: string;
    score?: string;
  }

  export interface Team {
    name: string;
    icon: string;
    accent: string;
    r1: string[];   // 16 picks
    r2: string[];   // 8 picks
    qf: string[];   // 4 picks
    sf: string[];   // 2 picks
    final: string;  // 1 pick
  }

  export interface PlayerInfo {
    country: string;
    seed: number | null;
    status: string;
    flag: string;
  }

  export interface ScoreDetail {
    match: Match;
    pick: string;
    points: number | null;
    correct: boolean | null;
  }

  export interface TeamScores {
    r1: number;
    r2: number;
    qf: number;
    sf: number;
    f: number;
    total: number;
    r1Details: ScoreDetail[];
    r2Details: ScoreDetail[];
    qfDetails: ScoreDetail[];
    sfDetails: ScoreDetail[];
    fDetails: ScoreDetail[];
  }

DEPLOYMENT PREP

- Add a README.md explaining: what the app does, how to run it locally
  (npm install, npm run dev), and how to deploy to Vercel (one paragraph).
- Add a .gitignore with the standard Next.js entries.
- Initialize a git repo with one commit: "Initial scaffold: Next.js refactor of
  Snooker Fantasy League"
- Run `npm install` and `npm run build` at the end to confirm everything
  compiles. If the build fails, fix it before stopping.
- DO NOT push to GitHub or deploy anything. I will do that step manually
  through the GitHub and Vercel UIs.

WHAT TO DELIVER

When finished, print:
1. A tree view of the final project structure.
2. The exact commands I should run next (git init was already done by you;
   I need: create GitHub repo, git remote add, git push, then connect to Vercel).
3. Any caveats, e.g. environment variables needed (there shouldn't be any),
   or assumptions you made.

START

Read the original SnookerFantasyLeague.jsx file at the project root. Confirm
you've read it by listing the top-level functions and constants you found.
Then begin the refactor. Work through the file from top to bottom — data
constants first, then leaf components, then composite components, then the
top-level orchestrator. Run `npm run build` after major milestones to catch
type errors early.

Stop and ask only if:
- The original file is missing or unreadable
- A component in the original references something that no longer exists
- A library version pin would conflict with Next.js 14
```

---

## Notes for the user

- The prompt assumes you'll drop `SnookerFantasyLeague.jsx` (the version currently in `/mnt/user-data/outputs/`) into the new project folder before running it. Save it as exactly that filename at the project root.
- Windsurf's Cascade can take long actions — this prompt may run for 10–20 minutes as it scaffolds, ports, and builds. Don't interrupt unless it stalls.
- The TypeScript conversion is the slowest part. If you'd rather stay in plain JavaScript, change "TypeScript, not JavaScript" in the GOALS section to "plain JavaScript with .jsx files" and remove the type-definition block.
- After the agent finishes, the app will run at `http://localhost:3000`. The deployment to Vercel via GitHub is a manual five-minute task — the agent intentionally stops at `npm run build` so you don't get unexpected charges or repos.
