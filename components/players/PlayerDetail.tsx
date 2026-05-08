import type { TeamWithScores } from '@/lib/types';
import { PLAYER_INFO } from '@/lib/players';
import {
  ROUND1_MATCHES,
  ROUND2_MATCHES,
  QF_MATCHES,
  SF_MATCHES,
  FINAL_MATCH,
} from '@/lib/matches';
import PathStep from './PathStep';
import PathArrow from './PathArrow';
import StatTile from './StatTile';
import MatchPickAnalysis, { type PickAnalysis } from './MatchPickAnalysis';

interface PlayerDetailProps {
  playerName: string;
  teams: TeamWithScores[];
  onBack: () => void;
  onSelectPlayer: (name: string) => void;
}

export default function PlayerDetail({
  playerName,
  teams,
  onBack,
  onSelectPlayer,
}: PlayerDetailProps) {
  const info = PLAYER_INFO[playerName] || ({} as Partial<(typeof PLAYER_INFO)[string]>);

  const r1Idx = ROUND1_MATCHES.findIndex((m) => m.p1 === playerName || m.p2 === playerName);
  const r2Idx = ROUND2_MATCHES.findIndex((m) => m.p1 === playerName || m.p2 === playerName);
  const qfIdx = QF_MATCHES.findIndex((m) => m.p1 === playerName || m.p2 === playerName);
  const sfIdxForMatches = SF_MATCHES.findIndex(
    (m) => m.p1 === playerName || m.p2 === playerName
  );
  const finalIdx = FINAL_MATCH.findIndex((m) => m.p1 === playerName || m.p2 === playerName);

  type PartialPick = Omit<PickAnalysis, 'opponent' | 'won' | 'teamsBackedThis' | 'teamsBackedOpponent'>;
  const matches: PartialPick[] = [];
  if (r1Idx !== -1)
    matches.push({
      round: 'R1',
      roundFull: 'Round 1 — Last 32',
      bestOf: 'Best of 19 frames',
      matchIndex: r1Idx,
      match: ROUND1_MATCHES[r1Idx],
      finished: true,
      pickKey: 'r1',
    });
  if (r2Idx !== -1)
    matches.push({
      round: 'R2',
      roundFull: 'Round 2 — Last 16',
      bestOf: 'Best of 25 frames',
      matchIndex: r2Idx,
      match: ROUND2_MATCHES[r2Idx],
      finished: true,
      pickKey: 'r2',
    });
  if (qfIdx !== -1)
    matches.push({
      round: 'QF',
      roundFull: 'Quarter-Finals — Last 8',
      bestOf: 'Best of 25 frames',
      matchIndex: qfIdx,
      match: QF_MATCHES[qfIdx],
      finished: !!QF_MATCHES[qfIdx].winner,
      pickKey: 'qf',
    });
  if (sfIdxForMatches !== -1)
    matches.push({
      round: 'SF',
      roundFull: 'Semi-Finals — Last 4',
      bestOf: 'Best of 33 frames',
      matchIndex: sfIdxForMatches,
      match: SF_MATCHES[sfIdxForMatches],
      finished: !!SF_MATCHES[sfIdxForMatches].winner,
      pickKey: 'sf',
    });
  if (finalIdx !== -1)
    matches.push({
      round: 'Final',
      roundFull: 'THE FINAL',
      bestOf: 'Best of 35 frames',
      matchIndex: finalIdx,
      match: FINAL_MATCH[finalIdx],
      finished: !!FINAL_MATCH[finalIdx].winner,
      pickKey: 'final',
    });

  const pickAnalyses: PickAnalysis[] = matches.map((mp) => {
    const opponent = mp.match.p1 === playerName ? mp.match.p2 : mp.match.p1;
    const won: boolean | null = mp.finished ? mp.match.winner === playerName : null;
    const teamsBackedThis: TeamWithScores[] = [];
    const teamsBackedOpponent: TeamWithScores[] = [];
    teams.forEach((t) => {
      const pick =
        mp.pickKey === 'final'
          ? t.final
          : t[mp.pickKey]
          ? t[mp.pickKey][mp.matchIndex]
          : null;
      if (pick === playerName) teamsBackedThis.push(t);
      else if (pick === opponent) teamsBackedOpponent.push(t);
    });
    return { ...mp, opponent, won, teamsBackedThis, teamsBackedOpponent };
  });

  const totalPicks = pickAnalyses.reduce((s, m) => s + m.teamsBackedThis.length, 0);
  const totalPossible = pickAnalyses.length * 8;
  const pickRate = totalPossible > 0 ? Math.round((totalPicks / totalPossible) * 100) : 0;

  const teamPickCount: Record<string, { team: TeamWithScores; count: number }> = {};
  teams.forEach((t) => {
    teamPickCount[t.name] = { team: t, count: 0 };
  });
  pickAnalyses.forEach((m) => {
    m.teamsBackedThis.forEach((t) => {
      teamPickCount[t.name].count++;
    });
  });
  const loyalty = Object.values(teamPickCount).sort((a, b) => b.count - a.count);
  const topCount = loyalty[0]?.count || 0;
  const topLoyal = loyalty.filter((l) => l.count === topCount && l.count > 0);

  const successfulPicks = pickAnalyses
    .filter((m) => m.finished && m.won)
    .reduce((s, m) => s + m.teamsBackedThis.length, 0);
  const failedPicks = pickAnalyses
    .filter((m) => m.finished && !m.won)
    .reduce((s, m) => s + m.teamsBackedThis.length, 0);
  const fantasyPointsFor = successfulPicks * 3 + failedPicks * 1;

  const sfIdx = SF_MATCHES.findIndex((m) => m.p1 === playerName || m.p2 === playerName);
  const finalIdxStatus = FINAL_MATCH.findIndex(
    (m) => m.p1 === playerName || m.p2 === playerName
  );
  const reachedR2 = r2Idx !== -1;
  const reachedQF = qfIdx !== -1;
  const qfFinished = reachedQF && !!QF_MATCHES[qfIdx].winner;
  const qfWon = qfFinished && QF_MATCHES[qfIdx].winner === playerName;
  const lostInQF = qfFinished && !qfWon;
  const reachedSF = sfIdx !== -1;
  const sfFinished = reachedSF && !!SF_MATCHES[sfIdx].winner;
  const sfWon = sfFinished && SF_MATCHES[sfIdx].winner === playerName;
  const lostInSF = sfFinished && !sfWon;
  const reachedFinal = finalIdxStatus !== -1;
  const finalFinished = reachedFinal && !!FINAL_MATCH[finalIdxStatus].winner;
  const finalWon = finalFinished && FINAL_MATCH[finalIdxStatus].winner === playerName;
  const lostInFinal = finalFinished && !finalWon;
  const isChampion = finalWon;
  const isRunnerUp = lostInFinal;
  const eliminatedAt = !reachedR2
    ? 'R1'
    : !reachedQF
    ? 'R2'
    : lostInQF
    ? 'QF'
    : lostInSF
    ? 'SF'
    : lostInFinal
    ? 'Final'
    : null;
  const stillIn = reachedQF && !lostInQF && !lostInSF && !lostInFinal;

  const r1Won = r1Idx !== -1 && ROUND1_MATCHES[r1Idx].winner === playerName;
  const r2Won = r2Idx !== -1 && ROUND2_MATCHES[r2Idx].winner === playerName;

  const headerGrad = isChampion
    ? 'linear-gradient(135deg, #DC2626 0%, #B91C1C 40%, #FBBF24 100%)'
    : isRunnerUp
    ? 'linear-gradient(135deg, #4B5563 0%, #6B7280 50%, #9CA3AF 100%)'
    : stillIn
    ? 'linear-gradient(135deg, #0F5132 0%, #166534 50%, #B45309 100%)'
    : 'linear-gradient(135deg, #475569 0%, #64748B 100%)';

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: '#FFFFFF',
          border: '2px solid #FEF3C7',
          borderRadius: 12,
          padding: '10px 18px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 15,
          fontWeight: 700,
          color: '#0F5132',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        ← Back to All Players
      </button>

      <div
        style={{
          background: headerGrad,
          borderRadius: 18,
          padding: 32,
          color: '#FFFFFF',
          marginBottom: 20,
          boxShadow: stillIn
            ? '0 12px 32px rgba(15, 81, 50, 0.4)'
            : '0 8px 24px rgba(71, 85, 105, 0.35)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            left: -60,
            width: 180,
            height: 180,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
            position: 'relative',
          }}
        >
          {info.seed ? (
            <div
              style={{
                background: '#FBBF24',
                color: '#0F5132',
                fontWeight: 900,
                width: 80,
                height: 80,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontFamily: "'Roboto Slab', serif",
                boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
                border: '3px solid #FFFFFF',
              }}
            >
              {info.seed}
            </div>
          ) : (
            <div
              style={{
                background: '#FBBF24',
                color: '#0F5132',
                fontWeight: 900,
                padding: '14px 20px',
                borderRadius: 12,
                fontSize: 14,
                letterSpacing: '1.5px',
                boxShadow: '0 6px 14px rgba(0,0,0,0.25)',
              }}
            >
              QUALIFIER
            </div>
          )}
          <div style={{ flex: 1, minWidth: 250 }}>
            <div
              style={{
                fontSize: 13,
                opacity: 0.95,
                letterSpacing: '2px',
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              {info.flag} · {(info.status || '').toUpperCase()}
            </div>
            <h2
              style={{
                fontFamily: "'Roboto Slab', serif",
                fontSize: 44,
                margin: 0,
                fontWeight: 900,
                lineHeight: 1.05,
              }}
            >
              {playerName}
            </h2>
          </div>
          <div
            style={{
              background: isChampion
                ? 'linear-gradient(135deg, #FBBF24, #F59E0B)'
                : isRunnerUp
                ? 'rgba(255,255,255,0.95)'
                : stillIn
                ? '#FBBF24'
                : 'rgba(0,0,0,0.35)',
              color: isChampion
                ? '#7F1D1D'
                : isRunnerUp
                ? '#1F2937'
                : stillIn
                ? '#0F5132'
                : '#FFFFFF',
              padding: '12px 20px',
              borderRadius: 12,
              fontWeight: 900,
              fontSize: 13,
              letterSpacing: '1.5px',
              border: '2px solid #FFFFFF',
            }}
          >
            {isChampion
              ? '🏆 WORLD CHAMPION'
              : isRunnerUp
              ? '🥈 RUNNER-UP'
              : stillIn
              ? sfWon
                ? '● ALIVE IN FINAL'
                : reachedSF
                ? '● ALIVE IN SF'
                : '● ALIVE IN QF'
              : `OUT @ ${eliminatedAt}`}
          </div>
        </div>

        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: '1px solid rgba(255,255,255,0.18)',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: '2px',
              opacity: 0.85,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            TOURNAMENT PATH
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            <PathStep label="R1" status={r1Idx === -1 ? 'na' : r1Won ? 'won' : 'lost'} />
            <PathArrow />
            <PathStep label="R2" status={r2Idx === -1 ? 'na' : r2Won ? 'won' : 'lost'} />
            <PathArrow />
            <PathStep
              label="QF"
              status={
                qfIdx === -1 ? 'na' : qfFinished ? (qfWon ? 'won' : 'lost') : 'live'
              }
            />
            <PathArrow />
            <PathStep
              label="SF"
              status={
                !reachedSF ? 'na' : sfFinished ? (sfWon ? 'won' : 'lost') : 'live'
              }
            />
            <PathArrow />
            <PathStep
              label="F"
              status={
                !reachedFinal
                  ? 'na'
                  : finalFinished
                  ? finalWon
                    ? 'won'
                    : 'lost'
                  : 'live'
              }
            />
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 14,
          marginBottom: 24,
        }}
      >
        <StatTile
          label="Matches at Crucible"
          value={
            pickAnalyses.filter((m) => m.finished).length +
            (reachedSF && !sfFinished ? 1 : 0)
          }
          sub={
            sfWon
              ? `${pickAnalyses.filter((m) => m.finished).length} finished — through to Final`
              : lostInSF
              ? `${pickAnalyses.filter((m) => m.finished).length} played — eliminated at SF`
              : reachedSF
              ? `${pickAnalyses.filter((m) => m.finished).length} finished + 1 in SF`
              : lostInQF
              ? `${pickAnalyses.filter((m) => m.finished).length} played — eliminated at QF`
              : `Eliminated in ${eliminatedAt ?? 'R1'}`
          }
          icon="🎱"
        />
        <StatTile
          label="Total Fantasy Picks"
          value={`${totalPicks} / ${totalPossible}`}
          sub={`${pickRate}% backed across ${matches.length} round${
            matches.length !== 1 ? 's' : ''
          }`}
          icon="🎯"
        />
        <StatTile
          label="Pts Earned by Backers"
          value={fantasyPointsFor}
          sub={`${successfulPicks}× correct (3 pts) + ${failedPicks}× consolation (1 pt)`}
          icon="⭐"
        />
        <StatTile
          label="Top Believers"
          value={
            topCount > 0 ? `${topLoyal.map((l) => l.team.icon).join('')} ${topCount}×` : '—'
          }
          sub={
            topCount > 0
              ? topLoyal.map((l) => l.team.name).join(', ')
              : 'No team backed them'
          }
          icon="💚"
        />
      </div>

      {pickAnalyses.length > 0 ? (
        <>
          <h3
            style={{
              fontFamily: "'Roboto Slab', serif",
              fontSize: 24,
              color: '#0F5132',
              margin: '8px 0 16px 4px',
            }}
          >
            🎬 Match-by-Match Pick Analysis
          </h3>
          {pickAnalyses.map((pa, i) => (
            <MatchPickAnalysis
              key={i}
              analysis={pa}
              playerName={playerName}
              onSelectPlayer={onSelectPlayer}
            />
          ))}
        </>
      ) : (
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: 32,
            textAlign: 'center',
            border: '2px solid #FEF3C7',
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎱</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1F2937' }}>
            {playerName} did not appear in any tournament rounds.
          </div>
        </div>
      )}
    </div>
  );
}
