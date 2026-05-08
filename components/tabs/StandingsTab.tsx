import { Crown, Flame, Target, Award } from 'lucide-react';
import type { TeamWithScores } from '@/lib/types';
import StatCard from '../standings/StatCard';
import LeagueTable from '../standings/LeagueTable';

interface StandingsTabProps {
  teams: TeamWithScores[];
  onTeamClick: (team: TeamWithScores) => void;
}

export default function StandingsTab({ teams, onTeamClick }: StandingsTabProps) {
  const leader = teams[0];

  const tiedCount = teams.filter((t) => t.scores.total === leader.scores.total).length;
  const second = teams.find((t) => t.scores.total < leader.scores.total);
  const gap = second ? leader.scores.total - second.scores.total : 0;

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
          marginBottom: 32,
        }}
      >
        <StatCard
          icon={Crown}
          label="Current Leader"
          value={leader.name}
          sub={`${leader.scores.total} points`}
          bgColor="#FBBF24"
          iconBg="#92400E"
        />
        {tiedCount > 1 ? (
          <StatCard
            icon={Flame}
            label="Tied At Top"
            value={`${tiedCount} teams`}
            sub={`${leader.scores.total} pts each`}
            bgColor="#DC2626"
            iconBg="#7F1D1D"
            textColor="#FEF2F2"
          />
        ) : (
          <StatCard
            icon={Flame}
            label="Lead Margin"
            value={`+${gap} pt${gap !== 1 ? 's' : ''}`}
            sub={second ? `over ${second.name}` : 'sole leader'}
            bgColor="#DC2626"
            iconBg="#7F1D1D"
            textColor="#FEF2F2"
          />
        )}
        <StatCard
          icon={Target}
          label="Total Matches"
          value="31 / 31"
          sub="Tournament complete"
          bgColor="#0F5132"
          iconBg="#022C22"
          textColor="#D1FAE5"
        />
        <StatCard
          icon={Award}
          label="World Champion"
          value="Wu Yize 🇨🇳"
          sub="Beat Murphy 18-17 in final-frame decider"
          bgColor="#B91C1C"
          iconBg="#7F1D1D"
          textColor="#FEE2E2"
        />
      </div>

      <LeagueTable teams={teams} onTeamClick={onTeamClick} />
    </div>
  );
}
