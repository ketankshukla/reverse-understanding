import { TrendingUp, TrendingDown, Circle } from 'lucide-react';

interface FormBadgeProps {
  r1Pct: number;
  r2Pct: number;
}

export default function FormBadge({ r1Pct, r2Pct }: FormBadgeProps) {
  const trending = r2Pct > r1Pct ? 'up' : r2Pct < r1Pct ? 'down' : 'flat';
  const Icon = trending === 'up' ? TrendingUp : trending === 'down' ? TrendingDown : Circle;
  const color = trending === 'up' ? '#16A34A' : trending === 'down' ? '#DC2626' : '#9CA3AF';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color, fontWeight: 700 }}>
      <Icon size={18} />
      <span style={{ fontSize: 13 }}>
        {trending === 'up' ? 'Rising' : trending === 'down' ? 'Falling' : 'Steady'}
      </span>
    </div>
  );
}
