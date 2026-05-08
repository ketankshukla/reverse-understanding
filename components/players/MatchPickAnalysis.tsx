import type { Match, TeamWithScores } from '@/lib/types';
import TeamChip from './TeamChip';

export interface PickAnalysis {
  round: string;
  roundFull: string;
  bestOf: string;
  matchIndex: number;
  match: Match;
  finished: boolean;
  pickKey: 'r1' | 'r2' | 'qf' | 'sf' | 'final';
  opponent: string;
  won: boolean | null;
  teamsBackedThis: TeamWithScores[];
  teamsBackedOpponent: TeamWithScores[];
}

interface MatchPickAnalysisProps {
  analysis: PickAnalysis;
  playerName: string;
  onSelectPlayer: (name: string) => void;
}

export default function MatchPickAnalysis({
  analysis,
  playerName,
  onSelectPlayer,
}: MatchPickAnalysisProps) {
  const { roundFull, bestOf, match, opponent, won, finished, teamsBackedThis, teamsBackedOpponent } =
    analysis;

  const isWinner = won === true;
  const outcomeColor = !finished ? '#B45309' : isWinner ? '#15803D' : '#B91C1C';
  const outcomeBg = !finished ? '#FEF3C7' : isWinner ? '#DCFCE7' : '#FEE2E2';
  const outcomeText = !finished
    ? 'NOT FINISHED'
    : isWinner
    ? `WON ${match.score}`
    : `LOST ${match.score}`;

  const ptsForPicker: number | null = !finished ? null : isWinner ? 3 : 1;
  const ptsForOpponentPicker: number | null = !finished ? null : isWinner ? 1 : 3;

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '2px solid #FEF3C7',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ flex: 1, minWidth: 250 }}>
          <div
            style={{ fontSize: 12, letterSpacing: '2px', color: '#0F5132', fontWeight: 800 }}
          >
            {roundFull.toUpperCase()}
          </div>
          <h3
            style={{
              fontFamily: "'Roboto Slab', serif",
              fontSize: 24,
              color: '#1F2937',
              margin: '4px 0',
              lineHeight: 1.2,
            }}
          >
            {playerName}{' '}
            <span style={{ color: '#9CA3AF', fontWeight: 400 }}>vs</span>{' '}
            <button
              onClick={() => onSelectPlayer(opponent)}
              style={{
                background: 'none',
                border: 'none',
                color: '#0F5132',
                textDecoration: 'underline',
                fontFamily: "'Roboto Slab', serif",
                fontSize: 24,
                fontWeight: 800,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              {opponent}
            </button>
          </h3>
          <div style={{ fontSize: 13, color: '#6B7280', fontStyle: 'italic' }}>{bestOf}</div>
        </div>
        <div
          style={{
            background: outcomeBg,
            color: outcomeColor,
            padding: '10px 16px',
            borderRadius: 12,
            fontWeight: 900,
            fontSize: 14,
            letterSpacing: '1px',
            border: `2px solid ${outcomeColor}33`,
          }}
        >
          {outcomeText}
        </div>
      </div>

      <div
        style={{
          marginBottom: 14,
          fontSize: 16,
          color: '#374151',
          fontWeight: 600,
          padding: '12px 14px',
          background: '#FFFBEB',
          borderRadius: 10,
          border: '1px solid #FEF3C7',
        }}
      >
        <strong style={{ fontSize: 20, color: '#0F5132' }}>{teamsBackedThis.length} of 8</strong>{' '}
        teams backed {playerName.split(' ').slice(-1)[0]} ·{' '}
        <strong style={{ fontSize: 20, color: '#92400E' }}>
          {teamsBackedOpponent.length} of 8
        </strong>{' '}
        backed {opponent.split(' ').slice(-1)[0]}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%)',
            borderRadius: 12,
            padding: 16,
            border: '2px solid #BBF7D0',
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#166534',
              marginBottom: 10,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 6,
            }}
          >
            <span>BACKED {playerName.toUpperCase()}</span>
            {finished && ptsForPicker !== null && (
              <span
                style={{
                  background: ptsForPicker === 3 ? '#16A34A' : '#92400E',
                  color: '#FFF',
                  padding: '2px 8px',
                  borderRadius: 6,
                  fontSize: 11,
                }}
              >
                +{ptsForPicker} pt{ptsForPicker > 1 ? 's' : ''} each
              </span>
            )}
          </div>
          {teamsBackedThis.length === 0 && (
            <div
              style={{ fontSize: 14, color: '#9CA3AF', fontStyle: 'italic', padding: '8px 0' }}
            >
              No teams backed {playerName}.
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {teamsBackedThis.map((t) => (
              <TeamChip key={t.name} team={t} ptsEarned={ptsForPicker} />
            ))}
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFFFF 100%)',
            borderRadius: 12,
            padding: 16,
            border: '2px solid #FDE68A',
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#92400E',
              marginBottom: 10,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 6,
            }}
          >
            <span>BACKED {opponent.toUpperCase()}</span>
            {finished && ptsForOpponentPicker !== null && (
              <span
                style={{
                  background: ptsForOpponentPicker === 3 ? '#16A34A' : '#92400E',
                  color: '#FFF',
                  padding: '2px 8px',
                  borderRadius: 6,
                  fontSize: 11,
                }}
              >
                +{ptsForOpponentPicker} pt{ptsForOpponentPicker > 1 ? 's' : ''} each
              </span>
            )}
          </div>
          {teamsBackedOpponent.length === 0 && (
            <div
              style={{ fontSize: 14, color: '#9CA3AF', fontStyle: 'italic', padding: '8px 0' }}
            >
              No teams backed {opponent}.
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {teamsBackedOpponent.map((t) => (
              <TeamChip key={t.name} team={t} ptsEarned={ptsForOpponentPicker} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
