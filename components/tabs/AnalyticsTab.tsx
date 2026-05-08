import { Trophy, Crown, Zap } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import type { TeamWithScores, Match } from '@/lib/types';
import {
  ROUND1_MATCHES,
  ROUND2_MATCHES,
  QF_MATCHES,
  SF_MATCHES,
  FINAL_MATCH,
} from '@/lib/matches';
import ChartCard from '../analytics/ChartCard';
import InsightCard from '../analytics/InsightCard';
import LeagueAgreementChart, {
  type AgreementDatum,
} from '../analytics/LeagueAgreementChart';

interface AnalyticsTabProps {
  teams: TeamWithScores[];
}

export default function AnalyticsTab({ teams }: AnalyticsTabProps) {
  const r1Data = teams.map((t) => ({
    team:
      t.name.length > 12
        ? t.name
            .split(' ')
            .map((w) => w[0])
            .join('')
        : t.name,
    fullName: t.name,
    R1: t.scores.r1,
    R2: t.scores.r2,
    QF: t.scores.qf,
    SF: t.scores.sf,
    Final: t.scores.f,
    Total: t.scores.total,
  }));

  const accuracyData = teams.map((t) => {
    const r1Hits = t.scores.r1Details.filter((d) => d.correct).length;
    const r2Hits = t.scores.r2Details.filter((d) => d.correct).length;
    const qfHits = t.scores.qfDetails.filter((d) => d.correct).length;
    const sfHits = t.scores.sfDetails.filter((d) => d.correct).length;
    const fHits = t.scores.fDetails.filter((d) => d.correct).length;
    return {
      team:
        t.name.length > 12
          ? t.name
              .split(' ')
              .map((w) => w[0])
              .join('')
          : t.name,
      R1: Math.round((r1Hits / 16) * 100),
      R2: Math.round((r2Hits / 8) * 100),
      QF: Math.round((qfHits / 4) * 100),
      SF: Math.round((sfHits / 2) * 100),
      F: Math.round((fHits / 1) * 100),
    };
  });

  const finalPickCount: Record<string, number> = {};
  teams.forEach((t) => {
    if (t.final) finalPickCount[t.final] = (finalPickCount[t.final] || 0) + 1;
  });
  const finalPickData = Object.entries(finalPickCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const buildAgreementData = (
    matches: Match[],
    pickKey: 'r1' | 'r2' | 'qf' | 'sf' | 'final'
  ): AgreementDatum[] =>
    matches.map((m, i) => {
      const matchLabel = `${m.p1.split(' ').slice(-1)[0]} v ${m.p2.split(' ').slice(-1)[0]}`;
      if (m.winner) {
        const correct = teams.filter((t) => {
          const pick =
            pickKey === 'final' ? t.final : t[pickKey] ? t[pickKey][i] : null;
          return pick === m.winner;
        }).length;
        return {
          match: matchLabel,
          correct,
          wrong: 8 - correct,
          pending: 0,
          finished: true,
        };
      } else {
        const p1Backers = teams.filter((t) => {
          const pick =
            pickKey === 'final' ? t.final : t[pickKey] ? t[pickKey][i] : null;
          return pick === m.p1;
        }).length;
        const p2Backers = teams.filter((t) => {
          const pick =
            pickKey === 'final' ? t.final : t[pickKey] ? t[pickKey][i] : null;
          return pick === m.p2;
        }).length;
        return {
          match: matchLabel,
          p1Name: m.p1.split(' ').slice(-1)[0],
          p2Name: m.p2.split(' ').slice(-1)[0],
          p1Backers,
          p2Backers,
          pending: 8,
          finished: false,
        };
      }
    });

  const r1Universal = buildAgreementData(ROUND1_MATCHES, 'r1');
  const r2Universal = buildAgreementData(ROUND2_MATCHES, 'r2');
  const qfUniversal = buildAgreementData(QF_MATCHES, 'qf');
  const sfUniversal = buildAgreementData(SF_MATCHES, 'sf');
  const finalUniversal = buildAgreementData(FINAL_MATCH, 'final');

  const wuYizeCount =
    finalPickData[0]?.name === 'Wu Yize'
      ? finalPickData[0].count
      : finalPickData[1]?.name === 'Wu Yize'
      ? finalPickData[1].count
      : 0;

  const sortedByR1 = [...teams].sort((a, b) => b.scores.r1 - a.scores.r1);

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <ChartCard
        title="Points Breakdown by Round"
        subtitle="How each team has scored across all 5 rounds — tournament complete"
      >
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={r1Data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
            <XAxis
              dataKey="team"
              tick={{ fontSize: 13, fontWeight: 600, fill: '#1F2937' }}
            />
            <YAxis tick={{ fontSize: 13, fill: '#1F2937' }} />
            <Tooltip
              contentStyle={{
                background: '#FFFBEB',
                border: '2px solid #FBBF24',
                borderRadius: 8,
                fontSize: 14,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 14, fontWeight: 600 }} />
            <Bar dataKey="R1" stackId="a" fill="#0F5132" name="Round 1" />
            <Bar dataKey="R2" stackId="a" fill="#DC2626" name="Round 2" />
            <Bar dataKey="QF" stackId="a" fill="#FBBF24" name="Quarter-Finals" />
            <Bar dataKey="SF" stackId="a" fill="#7C3AED" name="Semi-Finals" />
            <Bar dataKey="Final" stackId="a" fill="#9F1239" name="Final" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: 24,
        }}
      >
        <ChartCard
          title="Pick Accuracy %"
          subtitle="What share of picks each team got right (R1 → Final)"
        >
          <ResponsiveContainer width="100%" height={360}>
            <BarChart
              data={accuracyData}
              layout="vertical"
              margin={{ top: 10, right: 30, bottom: 10, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: '#1F2937' }}
                unit="%"
              />
              <YAxis
                dataKey="team"
                type="category"
                tick={{ fontSize: 12, fontWeight: 600, fill: '#1F2937' }}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  background: '#FFFBEB',
                  border: '2px solid #FBBF24',
                  borderRadius: 8,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 13, fontWeight: 600 }} />
              <Bar dataKey="R1" fill="#16A34A" radius={[0, 4, 4, 0]} />
              <Bar dataKey="R2" fill="#F59E0B" radius={[0, 4, 4, 0]} />
              <Bar dataKey="QF" fill="#0EA5E9" radius={[0, 4, 4, 0]} />
              <Bar dataKey="SF" fill="#7C3AED" radius={[0, 4, 4, 0]} />
              <Bar dataKey="F" fill="#9F1239" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="The Final — Pick Distribution"
          subtitle="🏆 Wu Yize won 18-17. The 6 teams who picked Wu earned +3 each."
        >
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={finalPickData} margin={{ top: 10, right: 20, bottom: 60, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 13, fontWeight: 700, fill: '#1F2937' }}
                interval={0}
                height={50}
              />
              <YAxis tick={{ fontSize: 12, fill: '#1F2937' }} domain={[0, 8]} />
              <Tooltip
                contentStyle={{
                  background: '#FFFBEB',
                  border: '2px solid #FBBF24',
                  borderRadius: 8,
                }}
                formatter={(v: number) => [`${v} of 8 teams`, 'Picked']}
              />
              <Bar
                dataKey="count"
                radius={[6, 6, 0, 0]}
                name="Teams who picked"
                label={{
                  position: 'top',
                  fontSize: 16,
                  fontWeight: 800,
                  fill: '#1F2937',
                }}
              >
                {finalPickData.map((d, i) => (
                  <Cell key={i} fill={d.name === 'Wu Yize' ? '#16A34A' : '#9CA3AF'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div
            style={{
              marginTop: 12,
              padding: '10px 14px',
              background: '#DCFCE7',
              borderRadius: 8,
              border: '1px dashed #16A34A',
              fontSize: 13,
              color: '#166534',
              lineHeight: 1.55,
            }}
          >
            ✅ <strong>Correct (Wu Yize):</strong> Invincibles, Hopeless, BBU, The Untouchables,
            Selbies, One Four Sevens (+3 each) · ❌ <strong>Wrong (Murphy):</strong>{' '}
            Uncredibles, Clueless (+1 each)
          </div>
        </ChartCard>
      </div>

      <LeagueAgreementChart
        rounds={[
          { id: 'r1', label: 'Round 1', subtitle: 'Last 32 — Best of 19', data: r1Universal },
          { id: 'r2', label: 'Round 2', subtitle: 'Last 16 — Best of 25', data: r2Universal },
          { id: 'qf', label: 'Quarter-Finals', subtitle: 'Last 8 — Best of 25', data: qfUniversal },
          { id: 'sf', label: 'Semi-Finals', subtitle: 'Last 4 — Best of 33', data: sfUniversal },
          {
            id: 'final',
            label: 'Final',
            subtitle: 'Murphy v Wu — Best of 35',
            data: finalUniversal,
          },
        ]}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}
      >
        <InsightCard
          icon={Trophy}
          title="The Final Pick Was Right"
          body={`Wu Yize won 18-17 in a final-frame thriller. The ${wuYizeCount} teams who backed him got +3. The 2 who backed Murphy got +1.`}
          bg="#9F1239"
        />
        <InsightCard
          icon={Crown}
          title="Best Round 1"
          body={`${sortedByR1[0].name} dominated R1 with ${sortedByR1[0].scores.r1} points`}
          bg="#0F5132"
        />
        <InsightCard
          icon={Zap}
          title="League Champion"
          body={`${teams[0].name} won the fantasy league with ${teams[0].scores.total} points${
            teams[1] && teams[1].scores.total === teams[0].scores.total
              ? ' (tied with ' + teams[1].name + ')'
              : ', ' +
                (teams[0].scores.total - teams[1].scores.total) +
                ' clear of ' +
                teams[1].name
          }`}
          bg="#7C3AED"
        />
      </div>
    </div>
  );
}
