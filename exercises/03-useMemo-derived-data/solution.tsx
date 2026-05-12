/**
 * Exercise 03 -- solution
 *
 * Three things worth pointing out:
 *   1. The memo's deps are `[]` because `TEAMS` is module-level and stable.
 *      If `teams` were a prop, the deps would be `[teams]`.
 *   2. The `filter` for visible teams is cheap (linear, no parsing) so it
 *      stays outside the memo. Memoising cheap operations adds overhead.
 *   3. `console.count` lives inside the memo factory, so it runs exactly when
 *      the sort runs -- making the fix observable in dev tools.
 */

'use client';

import { useMemo, useState } from 'react';

interface Team {
  id: string;
  name: string;
  points: number;
  joinedISO: string;
}

const TEAMS: Team[] = [
  { id: 't1', name: 'Tornadoes', points: 18, joinedISO: '2024-03-12' },
  { id: 't2', name: 'Rockets',   points: 14, joinedISO: '2024-01-04' },
  { id: 't3', name: 'Phoenix',   points: 21, joinedISO: '2023-11-21' },
  { id: 't4', name: 'Crucibles', points: 11, joinedISO: '2024-08-19' },
];

export default function Standings() {
  const [query, setQuery] = useState('');

  const sorted = useMemo(() => {
    console.count('sort run'); // should fire ONCE for the lifetime of this component
    return [...TEAMS].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return Date.parse(a.joinedISO) - Date.parse(b.joinedISO);
    });
  }, []); // TEAMS is module-level and stable -- no deps.

  // Cheap filter -- stays outside the memo so the search stays interactive.
  const visible = sorted.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        placeholder="Search teams"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {visible.map((t) => (
          <li key={t.id}>
            {t.name} -- {t.points} pts (joined {t.joinedISO})
          </li>
        ))}
      </ul>
    </div>
  );
}
