interface StatTileProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: string;
}

export default function StatTile({ label, value, sub, icon }: StatTileProps) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 100%)',
        borderRadius: 14,
        padding: 18,
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        border: '2px solid #FEF3C7',
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 4 }}>{icon}</div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '1.5px',
          color: '#6B7280',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 900,
          fontFamily: "'Roboto Slab', serif",
          color: '#0F5132',
          marginTop: 4,
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 13, color: '#6B7280', marginTop: 6, lineHeight: 1.35 }}>{sub}</div>
      )}
    </div>
  );
}
