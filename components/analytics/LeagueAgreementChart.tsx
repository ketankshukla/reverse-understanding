'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export interface AgreementDatum {
  match: string;
  finished: boolean;
  correct?: number;
  wrong?: number;
  pending: number;
  p1Name?: string;
  p2Name?: string;
  p1Backers?: number;
  p2Backers?: number;
}

export interface AgreementRound {
  id: string;
  label: string;
  subtitle: string;
  data: AgreementDatum[];
}

interface LeagueAgreementChartProps {
  rounds: AgreementRound[];
}

export default function LeagueAgreementChart({ rounds }: LeagueAgreementChartProps) {
  const [active, setActive] = useState<string>('r1');
  const round = rounds.find((r) => r.id === active) || rounds[0];
  const isPendingRound = round.data.every((d) => !d.finished);

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
      <h3
        style={{
          fontFamily: "'Roboto Slab', serif",
          fontSize: 22,
          color: '#0F5132',
          margin: '0 0 4px 0',
        }}
      >
        {round.label} — Where the league agreed and where it didn&apos;t
      </h3>
      <div style={{ color: '#6B7280', fontSize: 14, marginBottom: 16 }}>
        {isPendingRound
          ? `${round.subtitle} · Out of 8 teams, how the picks split between the two players in each match`
          : `${round.subtitle} · Out of 8 teams, how many picked the actual winner of each match`}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {rounds.map((r) => {
          const isActive = r.id === active;
          return (
            <button
              key={r.id}
              onClick={() => setActive(r.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: isActive ? '2px solid #0F5132' : '2px solid #E5E7EB',
                background: isActive ? '#0F5132' : '#FFFFFF',
                color: isActive ? '#FBBF24' : '#374151',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'inherit',
                letterSpacing: '0.5px',
                transition: 'all 0.15s',
              }}
            >
              {r.label}
            </button>
          );
        })}
      </div>

      <ResponsiveContainer width="100%" height={Math.max(280, round.data.length * 30 + 120)}>
        <BarChart data={round.data} margin={{ top: 10, right: 20, bottom: 80, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
          <XAxis
            dataKey="match"
            tick={{ fontSize: 11, fontWeight: 600, fill: '#1F2937' }}
            angle={-45}
            textAnchor="end"
            interval={0}
            height={90}
          />
          <YAxis tick={{ fontSize: 12, fill: '#1F2937' }} domain={[0, 8]} />
          <Tooltip
            contentStyle={{
              background: '#FFFBEB',
              border: '2px solid #FBBF24',
              borderRadius: 8,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 13, fontWeight: 600 }} />
          {isPendingRound && (
            <Bar dataKey="p1Backers" stackId="a" fill="#0F5132" name="Backed first player" />
          )}
          {isPendingRound && (
            <Bar dataKey="p2Backers" stackId="a" fill="#B45309" name="Backed second player" />
          )}
          {!isPendingRound && (
            <Bar dataKey="correct" stackId="a" fill="#16A34A" name="Correct picks" />
          )}
          {!isPendingRound && (
            <Bar dataKey="wrong" stackId="a" fill="#DC2626" name="Wrong picks" />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
