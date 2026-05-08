import { Trophy } from 'lucide-react';
import type { TeamWithScores } from '@/lib/types';
import { th, td } from '@/lib/constants';
import FormBadge from './FormBadge';

interface LeagueTableProps {
  teams: TeamWithScores[];
  onTeamClick: (team: TeamWithScores) => void;
}

export default function LeagueTable({ teams, onTeamClick }: LeagueTableProps) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 16,
        padding: 32,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '2px solid #FEF3C7',
      }}
    >
      <h2
        style={{
          fontFamily: "'Roboto Slab', serif",
          fontSize: 32,
          fontWeight: 900,
          color: '#0F5132',
          marginTop: 0,
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Trophy size={32} color="#DC2626" /> League Table
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
          <thead>
            <tr style={{ background: '#0F5132', color: '#FEF3C7' }}>
              <th style={th}>Rank</th>
              <th style={{ ...th, textAlign: 'left' }}>Team</th>
              <th style={th}>R1</th>
              <th style={th}>R2</th>
              <th style={th}>QF</th>
              <th style={th}>SF</th>
              <th style={th}>Final Pick</th>
              <th style={{ ...th, fontSize: 18 }}>Total</th>
              <th style={th}>Form</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, i) => {
              const rank = i + 1;
              const rankColor =
                rank === 1
                  ? '#FBBF24'
                  : rank === 2
                  ? '#9CA3AF'
                  : rank === 3
                  ? '#B45309'
                  : '#E5E7EB';
              const r1Pct = (team.scores.r1 / 48) * 100;
              const r2Pct = (team.scores.r2 / 24) * 100;

              return (
                <tr
                  key={team.name}
                  onClick={() => onTeamClick(team)}
                  style={{
                    cursor: 'pointer',
                    background: '#FFFFFF',
                    transition: 'transform 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(4px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
                >
                  <td style={{ ...td, textAlign: 'center' }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        background: rankColor,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        fontSize: 18,
                        color: rank <= 3 ? '#FFFFFF' : '#374151',
                        boxShadow:
                          rank === 1 ? '0 4px 12px rgba(251, 191, 36, 0.5)' : 'none',
                      }}
                    >
                      {rank === 1 ? '👑' : rank}
                    </div>
                  </td>
                  <td style={{ ...td, textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: `linear-gradient(135deg, ${team.color} 0%, ${team.accent} 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 24,
                          boxShadow: `0 4px 12px ${team.color}40`,
                        }}
                      >
                        {team.icon}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 19, color: '#1F2937' }}>
                          {team.name}
                        </div>
                        <div style={{ fontSize: 13, color: '#6B7280', fontStyle: 'italic' }}>
                          {team.motto}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ ...td, textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 17, color: '#0F5132' }}>
                      {team.scores.r1}
                    </div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>/ 48</div>
                  </td>
                  <td style={{ ...td, textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 17, color: '#0F5132' }}>
                      {team.scores.r2}
                    </div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>/ 24</div>
                  </td>
                  <td style={{ ...td, textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 17, color: '#0F5132' }}>
                      {team.scores.qf}
                    </div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>/ 12</div>
                  </td>
                  <td style={{ ...td, textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 17, color: '#0F5132' }}>
                      {team.scores.sf}
                    </div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>/ 6</div>
                  </td>
                  <td style={{ ...td, textAlign: 'center' }}>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: 12,
                        background: team.final === 'Wu Yize' ? '#FEE2E2' : '#DBEAFE',
                        color: team.final === 'Wu Yize' ? '#991B1B' : '#1E40AF',
                        fontWeight: 700,
                        fontSize: 12,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      🏆 {team.final}
                    </div>
                  </td>
                  <td style={{ ...td, textAlign: 'center' }}>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '8px 20px',
                        borderRadius: 24,
                        background:
                          rank === 1
                            ? 'linear-gradient(135deg, #FBBF24, #F59E0B)'
                            : rank === teams.length
                            ? 'linear-gradient(135deg, #FCA5A5, #EF4444)'
                            : 'linear-gradient(135deg, #0F5132, #166534)',
                        color: '#FFFFFF',
                        fontWeight: 900,
                        fontSize: 22,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                      }}
                    >
                      {team.scores.total}
                    </div>
                  </td>
                  <td style={{ ...td, textAlign: 'center' }}>
                    <FormBadge r1Pct={r1Pct} r2Pct={r2Pct} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: 20,
          padding: 16,
          background: '#FEF9E7',
          borderRadius: 8,
          borderLeft: '4px solid #FBBF24',
          fontSize: 14,
          color: '#78350F',
        }}
      >
        <strong>Scoring:</strong> Picking the actual winner = 3 points. Picking the loser = 1
        point. Click any team to see their picks in detail.
      </div>
    </div>
  );
}
