import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  bgColor: string;
  iconBg: string;
  textColor?: string;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  bgColor,
  iconBg,
  textColor = '#FFFFFF',
}: StatCardProps) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}DD 100%)`,
        borderRadius: 16,
        padding: 24,
        color: textColor,
        boxShadow: `0 8px 24px ${bgColor}50`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: iconBg,
          opacity: 0.2,
        }}
      />
      <Icon size={28} style={{ marginBottom: 12 }} strokeWidth={2.5} />
      <div
        style={{
          fontSize: 13,
          letterSpacing: '1.5px',
          fontWeight: 600,
          opacity: 0.9,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 900,
          marginTop: 4,
          fontFamily: "'Roboto Slab', serif",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 14, opacity: 0.85, marginTop: 4 }}>{sub}</div>
    </div>
  );
}
