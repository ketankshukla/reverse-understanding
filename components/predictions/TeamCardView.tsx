import type { TeamWithScores } from '@/lib/types';
import RoundStat from './RoundStat';
import PicksList from './PicksList';

interface TeamCardViewProps {
  teams: TeamWithScores[];
  selectedTeam: TeamWithScores | null;
  setSelectedTeam: (team: TeamWithScores) => void;
}

export default function TeamCardView({
  teams,
  selectedTeam,
  setSelectedTeam,
}: TeamCardViewProps) {
  const team = selectedTeam || teams[0];
  const teamData = teams.find((t) => t.name === team.name) || teams[0];

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12,
          marginBottom: 24,
        }}
      >
        {teams.map((t) => (
          <button
            key={t.name}
            onClick={() => setSelectedTeam(t)}
            style={{
              padding: 16,
              cursor: 'pointer',
              borderRadius: 12,
              background:
                t.name === teamData.name
                  ? `linear-gradient(135deg, ${t.color}, ${t.accent})`
                  : '#FFFFFF',
              color: t.name === teamData.name ? '#FFFFFF' : '#374151',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: 14,
              boxShadow:
                t.name === teamData.name
                  ? `0 6px 16px ${t.color}50`
                  : '0 2px 8px rgba(0,0,0,0.06)',
              border: t.name === teamData.name ? 'none' : '2px solid #FEF3C7',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s',
            }}
          >
            <div style={{ fontSize: 28 }}>{t.icon}</div>
            <div>{t.name}</div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>{t.scores.total} pts</div>
          </button>
        ))}
      </div>

      <div
        style={{
          background: `linear-gradient(135deg, ${teamData.color} 0%, ${teamData.accent} 100%)`,
          borderRadius: 16,
          padding: 32,
          color: '#FFFFFF',
          marginBottom: 24,
          boxShadow: `0 8px 32px ${teamData.color}50`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ fontSize: 64 }}>{teamData.icon}</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h2
              style={{
                fontFamily: "'Roboto Slab', serif",
                fontSize: 36,
                margin: 0,
              }}
            >
              {teamData.name}
            </h2>
            <div style={{ fontSize: 17, opacity: 0.9, fontStyle: 'italic' }}>
              &ldquo;{teamData.motto}&rdquo;
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, opacity: 0.9, letterSpacing: '1px' }}>TOTAL POINTS</div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                fontFamily: "'Roboto Slab', serif",
                lineHeight: 1,
              }}
            >
              {teamData.scores.total}
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 12,
            marginTop: 24,
          }}
        >
          <RoundStat
            label="Round 1"
            value={teamData.scores.r1}
            max={48}
            hits={teamData.scores.r1Details.filter((d) => d.correct).length}
            of={16}
          />
          <RoundStat
            label="Round 2"
            value={teamData.scores.r2}
            max={24}
            hits={teamData.scores.r2Details.filter((d) => d.correct).length}
            of={8}
          />
          <RoundStat
            label="QF"
            value={teamData.scores.qf}
            max={12}
            hits={teamData.scores.qfDetails.filter((d) => d.correct).length}
            of={4}
          />
          <RoundStat
            label="Semi"
            value={teamData.scores.sf}
            max={6}
            hits={teamData.scores.sfDetails.filter((d) => d.correct).length}
            of={2}
          />
          <RoundStat
            label="Final"
            value={teamData.scores.f}
            max={3}
            hits={teamData.scores.fDetails.filter((d) => d.correct).length}
            of={1}
            partialNote={`Picked: ${teamData.final}`}
          />
        </div>
      </div>

      <PicksList
        title="Round 1 — Last 32"
        details={teamData.scores.r1Details}
        accent={teamData.accent}
      />
      <PicksList
        title="Round 2 — Last 16"
        details={teamData.scores.r2Details}
        accent={teamData.accent}
      />
      <PicksList
        title="Quarter-Finals"
        details={teamData.scores.qfDetails}
        accent={teamData.accent}
      />
      <PicksList
        title="Semi-Finals"
        details={teamData.scores.sfDetails}
        accent={teamData.accent}
      />
      <PicksList
        title="THE FINAL — Best of 35"
        details={teamData.scores.fDetails}
        accent={teamData.accent}
      />
    </div>
  );
}
