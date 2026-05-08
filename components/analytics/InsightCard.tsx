import type { LucideIcon } from 'lucide-react';

interface InsightCardProps {
  icon: LucideIcon;
  title: string;
  body: string;
  bg: string;
}

export default function InsightCard({ icon: Icon, title, body, bg }: InsightCardProps) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${bg} 0%, ${bg}DD 100%)`,
        borderRadius: 16,
        padding: 24,
        color: '#FFFFFF',
        boxShadow: `0 8px 24px ${bg}50`,
      }}
    >
      <Icon size={28} strokeWidth={2.5} />
      <div
        style={{
          fontSize: 13,
          letterSpacing: '1.5px',
          fontWeight: 600,
          opacity: 0.9,
          marginTop: 12,
          textTransform: 'uppercase',
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 17, fontWeight: 600, marginTop: 8, lineHeight: 1.4 }}>{body}</div>
    </div>
  );
}
