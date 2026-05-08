import type { Match, ScoreDetail, Team, TeamScores } from './types';
import { ROUND1_MATCHES, ROUND2_MATCHES, QF_MATCHES, SF_MATCHES, FINAL_MATCH } from './matches';

// Scoring rule: 3 points for picking the actual winner, 1 point for picking the loser.
// While a match is unfinished (no winner yet), the pick is worth null — not 0 — so
// UIs can render "pending" rather than "wrong".

export function scorePick(pick: string, match: Match | undefined): number | null {
  if (!match || !match.winner) return null;
  if (pick === match.winner) return 3;
  return 1;
}

function detail(match: Match | undefined, pick: string): ScoreDetail {
  const pts = scorePick(pick, match);
  return {
    match: match as Match,
    pick,
    points: pts,
    correct: pts === null ? null : pts === 3,
  };
}

export function calculateTeamScores(team: Team): TeamScores {
  let r1 = 0;
  let r2 = 0;
  let qf = 0;
  let sf = 0;
  let f = 0;

  const r1Details = team.r1.map((pick, i) => {
    const d = detail(ROUND1_MATCHES[i], pick);
    r1 += d.points || 0;
    return d;
  });
  const r2Details = team.r2.map((pick, i) => {
    const d = detail(ROUND2_MATCHES[i], pick);
    r2 += d.points || 0;
    return d;
  });
  const qfDetails = team.qf.map((pick, i) => {
    const d = detail(QF_MATCHES[i], pick);
    qf += d.points || 0;
    return d;
  });
  const sfDetails = (team.sf || []).map((pick, i) => {
    const d = detail(SF_MATCHES[i], pick);
    sf += d.points || 0;
    return d;
  });
  const fDetails: ScoreDetail[] = team.final ? [detail(FINAL_MATCH[0], team.final)] : [];
  fDetails.forEach((d) => {
    f += d.points || 0;
  });

  return {
    r1,
    r2,
    qf,
    sf,
    f,
    total: r1 + r2 + qf + sf + f,
    r1Details,
    r2Details,
    qfDetails,
    sfDetails,
    fDetails,
  };
}
