interface RoundButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  status: string;
  color: string;
}

export default function RoundButton({ active, onClick, label, status, color }: RoundButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '14px 22px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 12,
        fontFamily: 'inherit',
        fontWeight: 700,
        fontSize: 15,
        background: active ? 'linear-gradient(135deg, #0F5132, #166534)' : '#F3F4F6',
        color: active ? '#FBBF24' : '#374151',
        transition: 'all 0.2s',
        boxShadow: active ? '0 4px 12px rgba(15, 81, 50, 0.3)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
      }}
    >
      <span>{label}</span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: active ? '#FBBF24' : color,
          letterSpacing: '0.5px',
        }}
      >
        ● {status}
      </span>
    </button>
  );
}
