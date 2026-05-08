import type { Match } from '@/lib/types';
import PlayerLine from './PlayerLine';

interface MatchesListProps {
  matches: Match[];
  title: string;
}

export default function MatchesList({ matches, title }: MatchesListProps) {
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
          fontSize: 28,
          color: '#0F5132',
          margin: '0 0 24px 0',
        }}
      >
        {title}
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: 16,
        }}
      >
        {matches.map((m) =>
          m.winner ? (
            <div
              key={m.id}
              style={{
                background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                borderRadius: 12,
                padding: 20,
                border: '2px solid #FDE68A',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#92400E',
                    letterSpacing: '1px',
                  }}
                >
                  MATCH {m.id}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '4px 10px',
                    background: '#16A34A',
                    color: '#FFFFFF',
                    borderRadius: 12,
                    letterSpacing: '0.5px',
                  }}
                >
                  FINISHED
                </span>
              </div>
              <PlayerLine name={m.p1} won={m.winner === m.p1} score={m.score?.split('-')[0]} />
              <div style={{ height: 1, background: '#FDE68A', margin: '8px 0' }} />
              <PlayerLine name={m.p2} won={m.winner === m.p2} score={m.score?.split('-')[1]} />
            </div>
          ) : (
            <div
              key={m.id}
              style={{
                background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
                borderRadius: 12,
                padding: 20,
                border: '2px dashed #9CA3AF',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#6B7280',
                    letterSpacing: '1px',
                  }}
                >
                  MATCH {m.id}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '4px 10px',
                    background: '#9CA3AF',
                    color: '#FFFFFF',
                    borderRadius: 12,
                    letterSpacing: '0.5px',
                  }}
                >
                  NOT FINISHED
                </span>
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#374151',
                  padding: '8px 0',
                }}
              >
                {m.p1}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: '#9CA3AF',
                  padding: '4px 0',
                  fontStyle: 'italic',
                }}
              >
                vs
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#374151',
                  padding: '8px 0',
                }}
              >
                {m.p2}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
