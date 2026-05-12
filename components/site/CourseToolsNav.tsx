import Link from 'next/link';

interface CourseToolsNavProps {
  active: 'study' | 'drill' | null;
}

export default function CourseToolsNav({ active }: CourseToolsNavProps) {
  const linkStyle = (mine: 'study' | 'drill'): React.CSSProperties => ({
    padding: '8px 16px',
    borderRadius: 999,
    fontWeight: 600,
    fontSize: 14,
    textDecoration: 'none',
    background: active === mine ? '#FBBF24' : 'rgba(255,255,255,0.12)',
    color: active === mine ? '#0F5132' : '#FEF3C7',
    border: '1px solid rgba(255,255,255,0.18)',
  });

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0F5132 0%, #166534 100%)',
        color: '#FEF3C7',
        padding: '14px 24px',
        boxShadow: '0 2px 8px rgba(15,81,50,0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
      }}
    >
      <Link
        href="/"
        style={{
          fontWeight: 700,
          color: '#FBBF24',
          textDecoration: 'none',
          fontSize: 15,
          letterSpacing: 0.4,
        }}
      >
        🎱 Snooker League
      </Link>
      <span style={{ opacity: 0.4 }}>•</span>
      <span style={{ fontSize: 13, opacity: 0.8, letterSpacing: 2, textTransform: 'uppercase' }}>
        Course Tools
      </span>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link href="/study" style={linkStyle('study')}>
          📚 Study Tracker
        </Link>
        <Link href="/interview-drill" style={linkStyle('drill')}>
          🎯 Interview Drill
        </Link>
      </div>
    </div>
  );
}
