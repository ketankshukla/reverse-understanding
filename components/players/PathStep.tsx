type PathStatus = 'won' | 'lost' | 'live' | 'na';

interface PathStepProps {
  label: string;
  status: PathStatus;
}

const styles: Record<PathStatus, { bg: string; color: string; border: string; icon: string }> = {
  won: {
    bg: 'rgba(255,255,255,0.95)',
    color: '#0F5132',
    border: '2px solid #FBBF24',
    icon: '✓',
  },
  lost: {
    bg: 'rgba(220, 38, 38, 0.85)',
    color: '#FFFFFF',
    border: '2px solid rgba(255,255,255,0.4)',
    icon: '✗',
  },
  live: {
    bg: '#FBBF24',
    color: '#0F5132',
    border: '2px solid #FFFFFF',
    icon: '●',
  },
  na: {
    bg: 'rgba(0,0,0,0.18)',
    color: 'rgba(255,255,255,0.55)',
    border: '2px solid rgba(255,255,255,0.2)',
    icon: '—',
  },
};

export default function PathStep({ label, status }: PathStepProps) {
  const s = styles[status];
  return (
    <div
      style={{
        background: s.bg,
        color: s.color,
        border: s.border,
        borderRadius: 10,
        padding: '8px 14px',
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        minWidth: 64,
        justifyContent: 'center',
        fontSize: 14,
        letterSpacing: '0.5px',
      }}
    >
      <span>{label}</span>
      <span>{s.icon}</span>
    </div>
  );
}
