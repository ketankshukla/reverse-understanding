import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function ChartCard({ title, subtitle, children }: ChartCardProps) {
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
        {title}
      </h3>
      <div style={{ color: '#6B7280', fontSize: 14, marginBottom: 20 }}>{subtitle}</div>
      {children}
    </div>
  );
}
