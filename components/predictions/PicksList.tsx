import { Circle, CheckCircle2, XCircle } from 'lucide-react';
import type { ScoreDetail } from '@/lib/types';

interface PicksListProps {
  title: string;
  details: ScoreDetail[];
  accent: string;
}

export default function PicksList({ title, details, accent }: PicksListProps) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '2px solid #FEF3C7',
        borderLeft: `6px solid ${accent}`,
      }}
    >
      <h3
        style={{
          fontFamily: "'Roboto Slab', serif",
          fontSize: 22,
          color: '#0F5132',
          margin: '0 0 16px 0',
        }}
      >
        {title}
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 10,
        }}
      >
        {details.map((d, i) => {
          const pickPending = d.points === null;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 12,
                borderRadius: 8,
                background: pickPending ? '#F9FAFB' : d.correct ? '#DCFCE7' : '#FEE2E2',
                border: `2px solid ${
                  pickPending ? '#E5E7EB' : d.correct ? '#86EFAC' : '#FCA5A5'
                }`,
              }}
            >
              <div>
                <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>
                  {d.match.p1} vs {d.match.p2}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#1F2937',
                    marginTop: 2,
                  }}
                >
                  Pick: {d.pick}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                {pickPending ? (
                  <Circle size={20} color="#9CA3AF" />
                ) : d.correct ? (
                  <div>
                    <CheckCircle2
                      size={20}
                      color="#16A34A"
                      style={{ display: 'block', marginLeft: 'auto' }}
                    />
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#16A34A' }}>+3</div>
                  </div>
                ) : (
                  <div>
                    <XCircle
                      size={20}
                      color="#DC2626"
                      style={{ display: 'block', marginLeft: 'auto' }}
                    />
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#DC2626' }}>+1</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
