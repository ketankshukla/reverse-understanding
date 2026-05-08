interface LegendProps {
  color: string;
  textColor: string;
  label: string;
}

export default function Legend({ color, textColor, label }: LegendProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          width: 16,
          height: 16,
          background: color,
          border: `1px solid ${textColor}40`,
          borderRadius: 4,
        }}
      />
      <span>{label}</span>
    </div>
  );
}
