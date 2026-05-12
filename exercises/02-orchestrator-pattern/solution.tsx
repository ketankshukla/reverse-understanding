/**
 * Exercise 02 -- solution
 *
 * Three things worth pointing out:
 *   1. `useMemo` caches the sorted list. Without it, every tab switch re-sorts.
 *   2. The orchestrator only knows about *tabs* and *the selected team*. The
 *      children do not know there is an "activeTab" concept at all.
 *   3. Callbacks like `pickTeam` keep the multi-step state transition
 *      (set selected + switch tab) in ONE place, so the children never have to
 *      coordinate two setState calls.
 */

'use client';

import { useMemo, useState } from 'react';

interface Team {
  id: string;
  name: string;
  points: number;
  captain: string;
}

const TEAMS: Team[] = [
  { id: 't1', name: 'Tornadoes', points: 18, captain: 'Trump' },
  { id: 't2', name: 'Rockets',   points: 14, captain: 'OSullivan' },
  { id: 't3', name: 'Phoenix',   points: 21, captain: 'Wu' },
];

// ---------------------------------------------------------------------------
// Orchestrator -- owns state, no JSX besides routing between children.
// ---------------------------------------------------------------------------

type View = 'list' | 'detail';

export default function Orchestrator() {
  const [view, setView] = useState<View>('list');
  const [selected, setSelected] = useState<Team | null>(null);

  const sorted = useMemo(() => [...TEAMS].sort((a, b) => b.points - a.points), []);

  function pickTeam(team: Team) {
    setSelected(team);
    setView('detail');
  }

  function backToList() {
    setView('list');
  }

  if (view === 'detail' && selected) {
    return <TeamDetail team={selected} onBack={backToList} />;
  }
  return <TeamList teams={sorted} onPick={pickTeam} />;
}

// ---------------------------------------------------------------------------
// Presentational: no useState, no useEffect, no useMemo.
// ---------------------------------------------------------------------------

interface TeamListProps {
  teams: Team[];
  onPick: (team: Team) => void;
}

function TeamList({ teams, onPick }: TeamListProps) {
  return (
    <div>
      <h1>League Standings</h1>
      <ul>
        {teams.map((t) => (
          <li key={t.id}>
            <button onClick={() => onPick(t)}>
              {t.name} -- {t.points} pts (captain: {t.captain})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface TeamDetailProps {
  team: Team;
  onBack: () => void;
}

function TeamDetail({ team, onBack }: TeamDetailProps) {
  return (
    <div>
      <button onClick={onBack}>&larr; back</button>
      <h1>{team.name}</h1>
      <p>Captain: {team.captain}</p>
      <p>Points: {team.points}</p>
    </div>
  );
}
