/**
 * Exercise 01 -- starter
 *
 * Fill in `calculateTeamScores`. Do NOT import anything from the real codebase.
 * Use only the local types below.
 */

// ---------------------------------------------------------------------------
// Types and fixture data
// ---------------------------------------------------------------------------

interface Match {
  id: string;
  // Players in this match. We only need the surnames for comparison.
  p1: string;
  p2: string;
  // Once played, `winner` holds the surname of the player who won.
  // Undefined means the match has not been played yet.
  winner?: string;
}

interface Team {
  name: string;
  r1: string[]; // picks aligned with ROUND1_MATCHES[i]
  r2: string[]; // picks aligned with ROUND2_MATCHES[i]
  qf: string[];
  sf: string[];
  f: string;    // single pick for the final
}

// Minimal fixture: 2 R1 matches, 1 R2 match, 1 QF, 1 SF, 1 Final.
const ROUND1_MATCHES: Match[] = [
  { id: 'r1-1', p1: 'Trump', p2: 'Selby', winner: 'Trump' },
  { id: 'r1-2', p1: 'Wilson', p2: 'Higgins', winner: 'Higgins' },
];
const ROUND2_MATCHES: Match[] = [
  { id: 'r2-1', p1: 'Trump', p2: 'Higgins', winner: 'Trump' },
];
const QF_MATCHES: Match[] = [{ id: 'qf-1', p1: 'Trump', p2: 'OSullivan', winner: 'OSullivan' }];
const SF_MATCHES: Match[] = [{ id: 'sf-1', p1: 'OSullivan', p2: 'Wu', winner: 'Wu' }];
const FINAL_MATCH: Match = { id: 'f-1', p1: 'Wu', p2: 'Williams' }; // not yet played

// ---------------------------------------------------------------------------
// TODO: implement this function
// ---------------------------------------------------------------------------

interface Scores {
  r1: number;
  r2: number;
  qf: number;
  sf: number;
  f: number;
  total: number;
}

export function calculateTeamScores(team: Team): Scores {
  // TODO: walk each round's picks in parallel with the matches array.
  // TODO: 3 points if pick === match.winner, 1 if pick is in {p1,p2} but not winner, 0 if winner undefined.
  // TODO: sum all rounds into `total`.
  return { r1: 0, r2: 0, qf: 0, sf: 0, f: 0, total: 0 };
}

// ---------------------------------------------------------------------------
// Sanity check (run with: npx tsx exercises/01-scoring-pure-function/starter.ts)
// ---------------------------------------------------------------------------

const myTeam: Team = {
  name: 'The Tornadoes',
  r1: ['Trump', 'Wilson'],   // 3 (correct) + 1 (loser pick) = 4
  r2: ['Trump'],             // 3
  qf: ['Trump'],             // 1 (Trump lost the QF)
  sf: ['Wu'],                // 3
  f: 'Williams',             // 0 (final unplayed)
};

console.log('Expected:', { r1: 4, r2: 3, qf: 1, sf: 3, f: 0, total: 11 });
console.log('Got     :', calculateTeamScores(myTeam));

// Export the fixture so the solution can re-use it.
export { ROUND1_MATCHES, ROUND2_MATCHES, QF_MATCHES, SF_MATCHES, FINAL_MATCH };
export type { Match, Team, Scores };
