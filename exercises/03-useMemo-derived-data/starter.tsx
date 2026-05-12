/**
 * Exercise 03 -- starter
 *
 * Fix the wasted sort. The TODOs below tell you exactly where to act.
 */

'use client';

import { useState } from 'react';

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

  // TODO 1: wrap this sort in useMemo so it does NOT re-run on every keystroke.
  // TODO 2: pick the right dependency array.
  // TODO 3: add console.count('sort run') so you can verify the fix in DevTools.
  console.count('sort run');
  const sorted = [...TEAMS].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    // tie-breaker by join date -- expensive Date.parse on every comparison
    return Date.parse(a.joinedISO) - Date.parse(b.joinedISO);
  });

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
