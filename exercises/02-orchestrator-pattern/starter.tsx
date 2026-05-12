/**
 * Exercise 02 -- starter
 *
 * Refactor this god component into:
 *   - Orchestrator (owns state)
 *   - TeamList (presentational)
 *   - TeamDetail (presentational)
 *
 * Constraint: TeamList and TeamDetail MUST NOT call useState or useMemo.
 */

'use client';

import { useState } from 'react';

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
// The god component (refactor me!)
// ---------------------------------------------------------------------------

export default function GodComponent() {
  const [activeTab, setActiveTab] = useState<'list' | 'detail'>('list');
  const [selected, setSelected] = useState<Team | null>(null);

  // Sort once on render -- this should move into useMemo.
  const sorted = [...TEAMS].sort((a, b) => b.points - a.points);

  // TODO: extract this block into <TeamList teams={sorted} onPick={...} />
  if (activeTab === 'list') {
    return (
      <div>
        <h1>League Standings</h1>
        <ul>
          {sorted.map((t) => (
            <li key={t.id}>
              <button
                onClick={() => {
                  setSelected(t);
                  setActiveTab('detail');
                }}
              >
                {t.name} -- {t.points} pts (captain: {t.captain})
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // TODO: extract this block into <TeamDetail team={selected!} onBack={...} />
  if (activeTab === 'detail' && selected) {
    return (
      <div>
        <button onClick={() => setActiveTab('list')}>&larr; back</button>
        <h1>{selected.name}</h1>
        <p>Captain: {selected.captain}</p>
        <p>Points: {selected.points}</p>
      </div>
    );
  }

  return null;
}

// ---------------------------------------------------------------------------
// Stubs to fill in
// ---------------------------------------------------------------------------

// TODO: implement TeamList
// interface TeamListProps { teams: Team[]; onPick: (t: Team) => void; }
// function TeamList(props: TeamListProps) { return null; }

// TODO: implement TeamDetail
// interface TeamDetailProps { team: Team; onBack: () => void; }
// function TeamDetail(props: TeamDetailProps) { return null; }
