// Shared visual + structural constants used across the app.

export const ROUND_COLORS = {
  r1: '#0F5132',
  r2: '#DC2626',
  qf: '#FBBF24',
  sf: '#7C3AED',
  final: '#9F1239',
} as const;

export const ACCURACY_COLORS = {
  r1: '#16A34A',
  r2: '#F59E0B',
  qf: '#0EA5E9',
  sf: '#7C3AED',
  f: '#9F1239',
} as const;

// Decorative ball colors for the hero header.
export const BALL_COLORS = ['#DC2626', '#FBBF24', '#16A34A', '#7C2D12', '#2563EB', '#EC4899', '#1F2937'];

// Shared <th>/<td> cell styles for tables.
export const th: React.CSSProperties = {
  padding: '14px 12px',
  textAlign: 'center',
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: '1px',
};

export const td: React.CSSProperties = {
  padding: '12px 8px',
  borderBottom: '1px solid #F3F4F6',
  fontSize: 15,
};

// Shared tab pill style used inside Predictions and Players tabs.
export function tabStyle(active: boolean): React.CSSProperties {
  return {
    padding: '12px 22px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: 10,
    fontFamily: 'inherit',
    fontWeight: 700,
    fontSize: 15,
    background: active ? '#0F5132' : '#F3F4F6',
    color: active ? '#FBBF24' : '#374151',
    transition: 'all 0.2s',
  };
}
