import type { Team } from '@/lib/types';

interface TeamChipProps {
  team: Team;
  ptsEarned: number | null;
}

export default function TeamChip({ team, ptsEarned }: TeamChipProps) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 8,
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        border: `2px solid ${team.accent}66`,
        boxShadow: `0 2px 6px ${team.accent}20`,
      }}
    >
      <div style={{ fontSize: 22 }}>{team.icon}</div>
      <div style={{ flex: 1, fontWeight: 700, color: '#1F2937', fontSize: 14 }}>{team.name}</div>
      {ptsEarned !== null && (
        <div
          style={{
            background: ptsEarned === 3 ? '#16A34A' : '#92400E',
            color: '#FFFFFF',
            padding: '3px 10px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          +{ptsEarned}
        </div>
      )}
    </div>
  );
}
