import type { PlayerInfo } from '@/lib/types';

export interface PlayerCardData extends PlayerInfo {
  name: string;
  stillIn: boolean;
  isChampion: boolean;
}

interface PlayerCardProps {
  player: PlayerCardData;
  onClick: () => void;
  finalPicksCount?: number;
}

export default function PlayerCard({ player: p, onClick, finalPicksCount }: PlayerCardProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background: p.stillIn ? 'linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 100%)' : '#F9FAFB',
        borderRadius: 14,
        padding: 20,
        border: p.stillIn ? '3px solid #FBBF24' : '2px solid #E5E7EB',
        boxShadow: p.stillIn
          ? '0 8px 20px rgba(251, 191, 36, 0.2)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        opacity: p.stillIn ? 1 : 0.78,
        textAlign: 'left',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = p.stillIn
          ? '0 14px 30px rgba(251, 191, 36, 0.35)'
          : '0 8px 20px rgba(0,0,0,0.10)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = p.stillIn
          ? '0 8px 20px rgba(251, 191, 36, 0.2)'
          : '0 2px 8px rgba(0,0,0,0.04)';
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        {p.seed ? (
          <div
            style={{
              background: 'linear-gradient(135deg, #0F5132, #166534)',
              color: '#FBBF24',
              fontWeight: 900,
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
            }}
          >
            {p.seed}
          </div>
        ) : (
          <div
            style={{
              background: '#9CA3AF',
              color: '#FFFFFF',
              fontWeight: 700,
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: 11,
            }}
          >
            QUALIFIER
          </div>
        )}
        {p.isChampion && (
          <div
            style={{
              background: 'linear-gradient(135deg, #DC2626, #FBBF24)',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: 11,
              padding: '4px 10px',
              borderRadius: 12,
              boxShadow: '0 3px 8px rgba(220, 38, 38, 0.35)',
            }}
          >
            🏆 WORLD CHAMPION
          </div>
        )}
        {!p.isChampion && p.name === 'Shaun Murphy' && (
          <div
            style={{
              background: '#E5E7EB',
              color: '#1F2937',
              fontWeight: 800,
              fontSize: 11,
              padding: '4px 10px',
              borderRadius: 12,
            }}
          >
            🥈 RUNNER-UP
          </div>
        )}
        {!p.isChampion && p.name !== 'Shaun Murphy' && (
          <div
            style={{
              background: '#FEE2E2',
              color: '#991B1B',
              fontWeight: 800,
              fontSize: 11,
              padding: '4px 10px',
              borderRadius: 12,
            }}
          >
            OUT
          </div>
        )}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          fontFamily: "'Roboto Slab', serif",
          color: '#1F2937',
          marginBottom: 4,
        }}
      >
        {p.name}
      </div>
      <div
        style={{
          fontSize: 14,
          color: '#6B7280',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontWeight: 700 }}>{p.flag}</span> · {p.status}
      </div>
      {finalPicksCount !== undefined && (
        <div
          style={{
            marginTop: 10,
            padding: '8px 12px',
            background: p.isChampion
              ? 'linear-gradient(135deg, #DCFCE7, #FFFBEB)'
              : 'linear-gradient(135deg, #FEF3C7, #FFFBEB)',
            borderRadius: 8,
            border: p.isChampion ? '1px solid #16A34A' : '1px solid #FCD34D',
            fontSize: 13,
            color: p.isChampion ? '#166534' : '#7C2D12',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontWeight: 600 }}>
            {p.isChampion ? '✓ Correct picks:' : '✗ Wrong picks:'}
          </span>
          <span
            style={{
              fontWeight: 900,
              fontSize: 16,
              color: p.isChampion ? '#16A34A' : '#9F1239',
            }}
          >
            {finalPicksCount} of 8 {p.isChampion ? '(+3 each)' : '(+1 each)'}
          </span>
        </div>
      )}
      <div
        style={{
          marginTop: 12,
          paddingTop: 10,
          borderTop: '1px dashed #E5E7EB',
          fontSize: 12,
          fontWeight: 700,
          color: '#0F5132',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>VIEW DETAILS</span>
        <span>→</span>
      </div>
    </button>
  );
}
