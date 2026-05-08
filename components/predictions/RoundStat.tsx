interface RoundStatProps {
  label: string;
  value: number;
  max: number;
  hits: number;
  of: number;
  pending?: boolean;
  partialNote?: string;
}

export default function RoundStat({
  label,
  value,
  max,
  hits,
  of,
  pending,
  partialNote,
}: RoundStatProps) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.15)',
        padding: 14,
        borderRadius: 10,
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{ fontSize: 12, letterSpacing: '1px', opacity: 0.85 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 900, fontFamily: "'Roboto Slab', serif" }}>
        {pending ? '—' : `${value}`}
        <span style={{ fontSize: 14, fontWeight: 400, opacity: 0.7 }}>
          {!pending && ` / ${max}`}
        </span>
      </div>
      {hits !== null && !pending && !partialNote && (
        <div style={{ fontSize: 13 }}>
          {hits} of {of} correct
        </div>
      )}
      {hits !== null && !pending && partialNote && (
        <div style={{ fontSize: 13, fontStyle: 'italic' }}>
          {hits}/{of} correct · {partialNote}
        </div>
      )}
      {pending && partialNote && (
        <div style={{ fontSize: 13, fontStyle: 'italic' }}>Not finished · {partialNote}</div>
      )}
      {pending && !partialNote && (
        <div style={{ fontSize: 13, fontStyle: 'italic' }}>Not finished</div>
      )}
    </div>
  );
}
