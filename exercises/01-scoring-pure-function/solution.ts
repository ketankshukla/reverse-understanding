/**
 * Exercise 01 -- solution
 *
 * Notice three things:
 *   1. A small helper `pointsFor(pick, match)` keeps the loop body trivial.
 *   2. We iterate `picks` first and `matches` second so missing picks (a team
 *      that has not entered the round yet) score zero instead of crashing.
 *   3. `total` is summed once at the end, not accumulated inside the loop --
 *      easier to debug, harder to typo.
 */

interface Match {
  id: string;
  p1: string;
  p2: string;
  winner?: string;
}

interface Team {
  name: string;
  r1: string[];
  r2: string[];
  qf: string[];
  sf: string[];
  f: string;
}

interface Scores {
  r1: number;
  r2: number;
  qf: number;
  sf: number;
  f: number;
  total: number;
}

const ROUND1_MATCHES: Match[] = [
  { id: 'r1-1', p1: 'Trump', p2: 'Selby', winner: 'Trump' },
  { id: 'r1-2', p1: 'Wilson', p2: 'Higgins', winner: 'Higgins' },
];
const ROUND2_MATCHES: Match[] = [
  { id: 'r2-1', p1: 'Trump', p2: 'Higgins', winner: 'Trump' },
];
const QF_MATCHES: Match[] = [{ id: 'qf-1', p1: 'Trump', p2: 'OSullivan', winner: 'OSullivan' }];
const SF_MATCHES: Match[] = [{ id: 'sf-1', p1: 'OSullivan', p2: 'Wu', winner: 'Wu' }];
const FINAL_MATCH: Match = { id: 'f-1', p1: 'Wu', p2: 'Williams' };

function pointsFor(pick: string, match: Match | undefined): number {
  if (!match || !match.winner) return 0;
  if (pick === match.winner) return 3;
  if (pick === match.p1 || pick === match.p2) return 1;
  return 0; // pick not in this match -- defensive: should never happen.
}

function scoreRound(picks: string[], matches: Match[]): number {
  let sum = 0;
  for (let i = 0; i < picks.length; i++) {
    sum += pointsFor(picks[i], matches[i]);
  }
  return sum;
}

export function calculateTeamScores(team: Team): Scores {
  const r1 = scoreRound(team.r1, ROUND1_MATCHES);
  const r2 = scoreRound(team.r2, ROUND2_MATCHES);
  const qf = scoreRound(team.qf, QF_MATCHES);
  const sf = scoreRound(team.sf, SF_MATCHES);
  const f = pointsFor(team.f, FINAL_MATCH);
  return { r1, r2, qf, sf, f, total: r1 + r2 + qf + sf + f };
}

// ---------------------------------------------------------------------------
// Sanity check
// ---------------------------------------------------------------------------

if (require.main === module) {
  const myTeam: Team = {
    name: 'The Tornadoes',
    r1: ['Trump', 'Wilson'],
    r2: ['Trump'],
    qf: ['Trump'],
    sf: ['Wu'],
    f: 'Williams',
  };
  console.log('Expected:', { r1: 4, r2: 3, qf: 1, sf: 3, f: 0, total: 11 });
  console.log('Got     :', calculateTeamScores(myTeam));
}
