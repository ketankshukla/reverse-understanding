'use client';

import { useState } from 'react';
import type { TeamWithScores, ScoreDetail } from '@/lib/types';
import {
  ROUND1_MATCHES,
  ROUND2_MATCHES,
  QF_MATCHES,
  SF_MATCHES,
  FINAL_MATCH,
} from '@/lib/matches';
import { th, tabStyle } from '@/lib/constants';
import Legend from './Legend';

type Round = 'r1' | 'r2' | 'qf' | 'sf' | 'f';

interface PredictionMatrixProps {
  teams: TeamWithScores[];
}

export default function PredictionMatrix({ teams }: PredictionMatrixProps) {
  const [round, setRound] = useState<Round>('r1');

  const matches =
    round === 'r1'
      ? ROUND1_MATCHES
      : round === 'r2'
      ? ROUND2_MATCHES
      : round === 'qf'
      ? QF_MATCHES
      : round === 'sf'
      ? SF_MATCHES
      : FINAL_MATCH;

  const detailKey:
    | 'r1Details'
    | 'r2Details'
    | 'qfDetails'
    | 'sfDetails'
    | 'fDetails' =
    round === 'r1'
      ? 'r1Details'
      : round === 'r2'
      ? 'r2Details'
      : round === 'qf'
      ? 'qfDetails'
      : round === 'sf'
      ? 'sfDetails'
      : 'fDetails';

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 16,
        padding: 28,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '2px solid #FEF3C7',
      }}
    >
      <h2
        style={{
          fontFamily: "'Roboto Slab', serif",
          fontSize: 26,
          color: '#0F5132',
          margin: '0 0 16px 0',
        }}
      >
        Predictions Matrix
      </h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <button
          onClick={() => setRound('r1')}
          style={{ ...tabStyle(round === 'r1'), padding: '8px 18px', fontSize: 14 }}
        >
          Round 1
        </button>
        <button
          onClick={() => setRound('r2')}
          style={{ ...tabStyle(round === 'r2'), padding: '8px 18px', fontSize: 14 }}
        >
          Round 2
        </button>
        <button
          onClick={() => setRound('qf')}
          style={{ ...tabStyle(round === 'qf'), padding: '8px 18px', fontSize: 14 }}
        >
          Quarter-Finals
        </button>
        <button
          onClick={() => setRound('sf')}
          style={{ ...tabStyle(round === 'sf'), padding: '8px 18px', fontSize: 14 }}
        >
          Semi-Finals
        </button>
        <button
          onClick={() => setRound('f')}
          style={{ ...tabStyle(round === 'f'), padding: '8px 18px', fontSize: 14 }}
        >
          Final
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#0F5132', color: '#FBBF24' }}>
              <th style={{ ...th, textAlign: 'left', minWidth: 220 }}>Match</th>
              {teams.map((t) => (
                <th key={t.name} style={{ ...th, padding: '12px 8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <div style={{ fontSize: 22 }}>{t.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.2 }}>
                      {t.name.length > 12
                        ? t.name
                            .split(' ')
                            .map((w) => w[0])
                            .join('')
                        : t.name}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matches.map((match, i) => (
              <tr key={match.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td
                  style={{
                    padding: '12px',
                    fontWeight: 600,
                    color: '#374151',
                    fontSize: 14,
                  }}
                >
                  <div style={{ fontWeight: 800, color: '#0F5132' }}>
                    {match.p1} vs {match.p2}
                  </div>
                  {match.winner && (
                    <div
                      style={{
                        fontSize: 12,
                        color: '#DC2626',
                        fontWeight: 700,
                        marginTop: 2,
                      }}
                    >
                      ✓ {match.winner} ({match.score})
                    </div>
                  )}
                  {!match.winner && (
                    <div
                      style={{
                        fontSize: 12,
                        color: '#9CA3AF',
                        fontStyle: 'italic',
                        marginTop: 2,
                      }}
                    >
                      Not finished
                    </div>
                  )}
                </td>
                {teams.map((t) => {
                  const detail: ScoreDetail | undefined = t.scores[detailKey][i];
                  if (!detail) {
                    return (
                      <td key={t.name} style={{ padding: 6, textAlign: 'center' }}>
                        <div
                          style={{
                            background: '#F9FAFB',
                            color: '#6B7280',
                            padding: '8px 6px',
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 700,
                            minWidth: 90,
                          }}
                        >
                          —
                        </div>
                      </td>
                    );
                  }
                  const pick = detail.pick;
                  const isCorrect = detail.correct;
                  let bg = '#F9FAFB';
                  let color = '#6B7280';
                  if (isCorrect === true) {
                    bg = '#DCFCE7';
                    color = '#166534';
                  } else if (isCorrect === false) {
                    bg = '#FEE2E2';
                    color = '#991B1B';
                  }
                  return (
                    <td key={t.name} style={{ padding: 6, textAlign: 'center' }}>
                      <div
                        style={{
                          background: bg,
                          color,
                          padding: '8px 6px',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 700,
                          minWidth: 90,
                        }}
                      >
                        {pick}
                        {detail.points !== null && (
                          <div style={{ fontSize: 14, fontWeight: 900, marginTop: 2 }}>
                            +{detail.points}
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 24, fontSize: 13, color: '#6B7280' }}>
        <Legend color="#DCFCE7" textColor="#166534" label="Correct (+3 pts)" />
        <Legend color="#FEE2E2" textColor="#991B1B" label="Wrong (+1 pt)" />
        <Legend color="#F9FAFB" textColor="#6B7280" label="Pending" />
      </div>
    </div>
  );
}
