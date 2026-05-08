import { Trophy } from 'lucide-react';
import { PLAYER_INFO } from '@/lib/players';

interface PlayerLineProps {
  name: string;
  won: boolean;
  score?: string;
}

export default function PlayerLine({ name, won, score }: PlayerLineProps) {
  const info = PLAYER_INFO[name];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 0',
        opacity: won ? 1 : 0.55,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {won && <Trophy size={18} color="#DC2626" />}
        <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280' }}>{info?.flag}</span>
        {info?.seed && (
          <span
            style={{
              fontSize: 11,
              padding: '2px 6px',
              background: '#0F5132',
              color: '#FBBF24',
              borderRadius: 4,
              fontWeight: 700,
            }}
          >
            {info.seed}
          </span>
        )}
        <span
          style={{
            fontSize: 17,
            fontWeight: won ? 800 : 500,
            color: won ? '#0F5132' : '#374151',
          }}
        >
          {name}
        </span>
      </div>
      <span
        style={{
          fontSize: 22,
          fontWeight: 900,
          color: won ? '#DC2626' : '#9CA3AF',
          fontFamily: "'Roboto Slab', serif",
        }}
      >
        {score}
      </span>
    </div>
  );
}
