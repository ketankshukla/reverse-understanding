import React, { useState, useMemo } from 'react';
import { Trophy, Target, Users, BarChart3, Calendar, Award, TrendingUp, TrendingDown, Crown, Flame, Zap, Star, CheckCircle2, XCircle, Circle, Medal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// ============================================================================
// DATA: Actual 2026 World Snooker Championship Results (verified from SnookerHQ)
// ============================================================================

const ROUND1_MATCHES = [
  { id: 1, p1: 'Zhao Xintong', p2: 'Liam Highfield', winner: 'Zhao Xintong', score: '10-7', seed1: 1 },
  { id: 2, p1: 'Judd Trump', p2: 'Gary Wilson', winner: 'Judd Trump', score: '10-5', seed1: 2 },
  { id: 3, p1: 'Kyren Wilson', p2: 'Stan Moody', winner: 'Kyren Wilson', score: '10-7', seed1: 3 },
  { id: 4, p1: 'Neil Robertson', p2: 'Pang Junxu', winner: 'Neil Robertson', score: '10-6', seed1: 4 },
  { id: 5, p1: 'John Higgins', p2: 'Ali Carter', winner: 'John Higgins', score: '10-7', seed1: 5 },
  { id: 6, p1: 'Mark Williams', p2: 'Antoni Kowalski', winner: 'Mark Williams', score: '10-4', seed1: 6 },
  { id: 7, p1: 'Mark Selby', p2: 'Jak Jones', winner: 'Mark Selby', score: '10-2', seed1: 7 },
  { id: 8, p1: 'Shaun Murphy', p2: 'Fan Zhengyi', winner: 'Shaun Murphy', score: '10-9', seed1: 8 },
  { id: 9, p1: 'Xiao Guodong', p2: 'Zhou Yuelong', winner: 'Xiao Guodong', score: '10-6', seed1: 9 },
  { id: 10, p1: 'Wu Yize', p2: 'Lei Peifan', winner: 'Wu Yize', score: '10-2', seed1: 10 },
  { id: 11, p1: 'Barry Hawkins', p2: 'Matthew Stevens', winner: 'Barry Hawkins', score: '10-4', seed1: 11 },
  { id: 12, p1: "Ronnie O'Sullivan", p2: 'He Guoqiang', winner: "Ronnie O'Sullivan", score: '10-2', seed1: 12 },
  { id: 13, p1: 'Chris Wakelin', p2: 'Liam Pullen', winner: 'Chris Wakelin', score: '10-6', seed1: 13 },
  { id: 14, p1: 'Mark Allen', p2: 'Zhang Anda', winner: 'Mark Allen', score: '10-6', seed1: 14 },
  { id: 15, p1: 'Si Jiahui', p2: 'Hossein Vafaei', winner: 'Hossein Vafaei', score: '3-10', seed1: 15 },
  { id: 16, p1: 'Ding Junhui', p2: 'David Gilbert', winner: 'Ding Junhui', score: '10-5', seed1: 16 },
];

const ROUND2_MATCHES = [
  { id: 17, p1: 'Zhao Xintong', p2: 'Ding Junhui', winner: 'Zhao Xintong', score: '13-9' },
  { id: 18, p1: 'Xiao Guodong', p2: 'Shaun Murphy', winner: 'Shaun Murphy', score: '3-13' },
  { id: 19, p1: 'Kyren Wilson', p2: 'Mark Allen', winner: 'Mark Allen', score: '9-13' },
  { id: 20, p1: 'Barry Hawkins', p2: 'Mark Williams', winner: 'Barry Hawkins', score: '13-9' },
  { id: 21, p1: 'John Higgins', p2: "Ronnie O'Sullivan", winner: 'John Higgins', score: '13-12' },
  { id: 22, p1: 'Mark Selby', p2: 'Wu Yize', winner: 'Wu Yize', score: '11-13' },
  { id: 23, p1: 'Hossein Vafaei', p2: 'Judd Trump', winner: 'Hossein Vafaei', score: '13-12' },
  { id: 24, p1: 'Neil Robertson', p2: 'Chris Wakelin', winner: 'Neil Robertson', score: '13-7' },
];

const QF_MATCHES = [
  { id: 25, p1: 'Zhao Xintong', p2: 'Shaun Murphy', winner: 'Shaun Murphy', score: '10-13' },
  { id: 26, p1: 'Mark Allen', p2: 'Barry Hawkins', winner: 'Mark Allen', score: '13-11' },
  { id: 27, p1: 'John Higgins', p2: 'Neil Robertson', winner: 'John Higgins', score: '13-10' },
  { id: 28, p1: 'Wu Yize', p2: 'Hossein Vafaei', winner: 'Wu Yize', score: '13-8' },
];

const SF_MATCHES = [
  { id: 29, p1: 'Shaun Murphy', p2: 'John Higgins', winner: 'Shaun Murphy', score: '17-15' },
  { id: 30, p1: 'Wu Yize', p2: 'Mark Allen', winner: 'Wu Yize', score: '17-16' },
];

const FINAL_MATCH = [
  { id: 31, p1: 'Shaun Murphy', p2: 'Wu Yize', winner: 'Wu Yize', score: '17-18' },
];

// ============================================================================
// TEAMS DATA: All picks per team per round
// ============================================================================

const TEAMS = [
  {
    name: 'Invincibles',
    color: '#0F5132',
    accent: '#10B981',
    icon: '⚡',
    motto: 'Unstoppable & Unbeatable',
    r1: ['Zhao Xintong','Judd Trump','Kyren Wilson','Neil Robertson','John Higgins','Mark Williams','Mark Selby','Shaun Murphy','Xiao Guodong','Wu Yize','Barry Hawkins',"Ronnie O'Sullivan",'Chris Wakelin','Mark Allen','Hossein Vafaei','Ding Junhui'],
    r2: ['Zhao Xintong','Xiao Guodong','Kyren Wilson','Mark Williams',"Ronnie O'Sullivan",'Mark Selby','Judd Trump','Neil Robertson'],
    qf: ['Zhao Xintong','Mark Allen','John Higgins','Wu Yize'],
    sf: ['Shaun Murphy','Wu Yize'],
    final: 'Wu Yize',
  },
  {
    name: 'Uncredibles',
    color: '#7C2D12',
    accent: '#EA580C',
    icon: '🔥',
    motto: 'Beyond Belief',
    r1: ['Zhao Xintong','Judd Trump','Stan Moody','Neil Robertson','Ali Carter','Mark Williams','Mark Selby','Shaun Murphy','Xiao Guodong','Wu Yize','Barry Hawkins',"Ronnie O'Sullivan",'Chris Wakelin','Mark Allen','Hossein Vafaei','Ding Junhui'],
    r2: ['Zhao Xintong','Shaun Murphy','Mark Allen','Mark Williams',"Ronnie O'Sullivan",'Mark Selby','Judd Trump','Neil Robertson'],
    qf: ['Zhao Xintong','Mark Allen','John Higgins','Hossein Vafaei'],
    sf: ['Shaun Murphy','Wu Yize'],
    final: 'Shaun Murphy',
  },
  {
    name: 'Hopeless',
    color: '#581C87',
    accent: '#A855F7',
    icon: '🎯',
    motto: 'Against All Odds',
    r1: ['Zhao Xintong','Judd Trump','Kyren Wilson','Neil Robertson','Ali Carter','Mark Williams','Mark Selby','Fan Zhengyi','Zhou Yuelong','Wu Yize','Barry Hawkins',"Ronnie O'Sullivan",'Chris Wakelin','Mark Allen','Si Jiahui','Ding Junhui'],
    r2: ['Zhao Xintong','Xiao Guodong','Mark Allen','Barry Hawkins','John Higgins','Mark Selby','Judd Trump','Neil Robertson'],
    qf: ['Zhao Xintong','Mark Allen','John Higgins','Wu Yize'],
    sf: ['Shaun Murphy','Wu Yize'],
    final: 'Wu Yize',
  },
  {
    name: 'Clueless',
    color: '#0E7490',
    accent: '#06B6D4',
    icon: '🎱',
    motto: 'Wild Guesses Win',
    r1: ['Zhao Xintong','Judd Trump','Kyren Wilson','Neil Robertson','John Higgins','Mark Williams','Mark Selby','Shaun Murphy','Xiao Guodong','Wu Yize','Barry Hawkins',"Ronnie O'Sullivan",'Liam Pullen','Mark Allen','Si Jiahui','David Gilbert'],
    r2: ['Zhao Xintong','Shaun Murphy','Kyren Wilson','Mark Williams','John Higgins','Mark Selby','Judd Trump','Chris Wakelin'],
    qf: ['Shaun Murphy','Barry Hawkins','John Higgins','Hossein Vafaei'],
    sf: ['Shaun Murphy','Mark Allen'],
    final: 'Shaun Murphy',
  },
  {
    name: 'Break Builders United',
    color: '#9F1239',
    accent: '#F43F5E',
    icon: '🏗️',
    motto: 'Building To Glory',
    r1: ['Zhao Xintong','Judd Trump','Kyren Wilson','Neil Robertson','John Higgins','Mark Williams','Mark Selby','Shaun Murphy','Xiao Guodong','Wu Yize','Barry Hawkins',"Ronnie O'Sullivan",'Chris Wakelin','Zhang Anda','Si Jiahui','David Gilbert'],
    r2: ['Zhao Xintong','Xiao Guodong','Mark Allen','Mark Williams',"Ronnie O'Sullivan",'Mark Selby','Judd Trump','Neil Robertson'],
    qf: ['Zhao Xintong','Mark Allen','John Higgins','Wu Yize'],
    sf: ['Shaun Murphy','Wu Yize'],
    final: 'Wu Yize',
  },
  {
    name: 'The Untouchables',
    color: '#1E3A8A',
    accent: '#3B82F6',
    icon: '🛡️',
    motto: 'Untainted by Failure',
    r1: ['Zhao Xintong','Gary Wilson','Stan Moody','Pang Junxu','John Higgins','Mark Williams','Mark Selby','Fan Zhengyi','Xiao Guodong','Wu Yize','Barry Hawkins',"Ronnie O'Sullivan",'Chris Wakelin','Zhang Anda','Hossein Vafaei','Ding Junhui'],
    r2: ['Zhao Xintong','Shaun Murphy','Mark Allen','Mark Williams',"Ronnie O'Sullivan",'Mark Selby','Judd Trump','Neil Robertson'],
    qf: ['Zhao Xintong','Mark Allen','John Higgins','Wu Yize'],
    sf: ['Shaun Murphy','Wu Yize'],
    final: 'Wu Yize',
  },
  {
    name: 'Selbies',
    color: '#92400E',
    accent: '#F59E0B',
    icon: '👑',
    motto: 'Slow & Steady',
    r1: ['Zhao Xintong','Judd Trump','Kyren Wilson','Neil Robertson','Ali Carter','Mark Williams','Mark Selby','Shaun Murphy','Zhou Yuelong','Wu Yize','Barry Hawkins',"Ronnie O'Sullivan",'Chris Wakelin','Mark Allen','Si Jiahui','David Gilbert'],
    r2: ['Zhao Xintong','Shaun Murphy','Mark Allen','Mark Williams',"Ronnie O'Sullivan",'Mark Selby','Judd Trump','Chris Wakelin'],
    qf: ['Zhao Xintong','Barry Hawkins','John Higgins','Wu Yize'],
    sf: ['Shaun Murphy','Mark Allen'],
    final: 'Wu Yize',
  },
  {
    name: 'One Four Sevens',
    color: '#365314',
    accent: '#84CC16',
    icon: '💫',
    motto: 'Maximum Effort',
    r1: ['Zhao Xintong','Gary Wilson','Stan Moody','Neil Robertson','John Higgins','Mark Williams','Jak Jones','Shaun Murphy','Zhou Yuelong','Wu Yize','Barry Hawkins',"Ronnie O'Sullivan",'Chris Wakelin','Zhang Anda','Hossein Vafaei','David Gilbert'],
    r2: ['Zhao Xintong','Shaun Murphy','Mark Allen','Mark Williams',"Ronnie O'Sullivan",'Wu Yize','Judd Trump','Chris Wakelin'],
    qf: ['Zhao Xintong','Barry Hawkins','Neil Robertson','Wu Yize'],
    sf: ['Shaun Murphy','Wu Yize'],
    final: 'Wu Yize',
  },
];

// ============================================================================
// PLAYER METADATA
// ============================================================================

const PLAYER_INFO = {
  'Zhao Xintong': { country: '🇨🇳', seed: 1, status: 'Defending Champion', flag: 'CHN' },
  'Judd Trump': { country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', seed: 2, status: 'World No. 1', flag: 'ENG' },
  'Kyren Wilson': { country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', seed: 3, status: '2024 Champion', flag: 'ENG' },
  'Neil Robertson': { country: '🇦🇺', seed: 4, status: 'Former Champion', flag: 'AUS' },
  'John Higgins': { country: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', seed: 5, status: '4× World Champion', flag: 'SCO' },
  'Mark Williams': { country: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', seed: 6, status: '3× World Champion', flag: 'WAL' },
  'Mark Selby': { country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', seed: 7, status: '4× World Champion', flag: 'ENG' },
  'Shaun Murphy': { country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', seed: 8, status: '2005 Champion', flag: 'ENG' },
  'Xiao Guodong': { country: '🇨🇳', seed: 9, status: 'Top 16', flag: 'CHN' },
  'Wu Yize': { country: '🇨🇳', seed: 10, status: 'Top 16', flag: 'CHN' },
  'Barry Hawkins': { country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', seed: 11, status: '2013 Finalist', flag: 'ENG' },
  "Ronnie O'Sullivan": { country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', seed: 12, status: '7× World Champion', flag: 'ENG' },
  'Chris Wakelin': { country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', seed: 13, status: 'Top 16', flag: 'ENG' },
  'Mark Allen': { country: '🇮🇪', seed: 14, status: 'Top 16', flag: 'NIR' },
  'Si Jiahui': { country: '🇨🇳', seed: 15, status: '2023 Semi-Finalist', flag: 'CHN' },
  'Ding Junhui': { country: '🇨🇳', seed: 16, status: '2016 Finalist', flag: 'CHN' },
  'Liam Highfield': { country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', seed: null, status: 'Qualifier', flag: 'ENG' },
  'Gary Wilson': { country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', seed: null, status: 'Qualifier', flag: 'ENG' },
  'Stan Moody': { country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', seed: null, status: 'Qualifier (Crucible Debutant)', flag: 'ENG' },
  'Pang Junxu': { country: '🇨🇳', seed: null, status: 'Qualifier', flag: 'CHN' },
  'Ali Carter': { country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', seed: null, status: 'Qualifier (2× Finalist)', flag: 'ENG' },
  'Antoni Kowalski': { country: '🇵🇱', seed: null, status: 'Qualifier (1st Polish at Crucible)', flag: 'POL' },
  'Jak Jones': { country: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', seed: null, status: 'Qualifier (2024 Finalist)', flag: 'WAL' },
  'Fan Zhengyi': { country: '🇨🇳', seed: null, status: 'Qualifier', flag: 'CHN' },
  'Zhou Yuelong': { country: '🇨🇳', seed: null, status: 'Qualifier', flag: 'CHN' },
  'Lei Peifan': { country: '🇨🇳', seed: null, status: 'Qualifier', flag: 'CHN' },
  'Matthew Stevens': { country: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', seed: null, status: 'Qualifier', flag: 'WAL' },
  'He Guoqiang': { country: '🇨🇳', seed: null, status: 'Qualifier (Crucible Debutant)', flag: 'CHN' },
  'Liam Pullen': { country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', seed: null, status: 'Qualifier (Crucible Debutant)', flag: 'ENG' },
  'Zhang Anda': { country: '🇨🇳', seed: null, status: 'Qualifier', flag: 'CHN' },
  'Hossein Vafaei': { country: '🇮🇷', seed: null, status: 'Qualifier', flag: 'IRN' },
  'David Gilbert': { country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', seed: null, status: 'Qualifier', flag: 'ENG' },
};

// ============================================================================
// SCORING LOGIC: 3 pts for correct pick, 1 pt for wrong pick
// ============================================================================

function scorePick(pick, match) {
  if (!match || !match.winner) return null;
  if (pick === match.winner) return 3;
  return 1;
}

function calculateTeamScores(team) {
  let r1 = 0, r2 = 0, qf = 0, sf = 0, f = 0;
  // When pts is null (match not finished), correct should be null — not false — so UIs can show "pending" instead of "wrong".
  const r1Details = team.r1.map((pick, i) => {
    const pts = scorePick(pick, ROUND1_MATCHES[i]);
    r1 += pts || 0;
    return { match: ROUND1_MATCHES[i], pick, points: pts, correct: pts === null ? null : pts === 3 };
  });
  const r2Details = team.r2.map((pick, i) => {
    const pts = scorePick(pick, ROUND2_MATCHES[i]);
    r2 += pts || 0;
    return { match: ROUND2_MATCHES[i], pick, points: pts, correct: pts === null ? null : pts === 3 };
  });
  const qfDetails = team.qf.map((pick, i) => {
    const pts = scorePick(pick, QF_MATCHES[i]);
    qf += pts || 0;
    return { match: QF_MATCHES[i], pick, points: pts, correct: pts === null ? null : pts === 3 };
  });
  const sfDetails = (team.sf || []).map((pick, i) => {
    const pts = scorePick(pick, SF_MATCHES[i]);
    sf += pts || 0;
    return { match: SF_MATCHES[i], pick, points: pts, correct: pts === null ? null : pts === 3 };
  });
  const fDetails = team.final ? [(() => {
    const pts = scorePick(team.final, FINAL_MATCH[0]);
    return { match: FINAL_MATCH[0], pick: team.final, points: pts, correct: pts === null ? null : pts === 3 };
  })()] : [];
  fDetails.forEach(d => { f += d.points || 0; });
  return { r1, r2, qf, sf, f, total: r1 + r2 + qf + sf + f, r1Details, r2Details, qfDetails, sfDetails, fDetails };
}

// ============================================================================
// MAIN APP
// ============================================================================

export default function SnookerFantasyLeague() {
  const [activeTab, setActiveTab] = useState('standings');
  const [selectedTeam, setSelectedTeam] = useState(null);

  const teamsWithScores = useMemo(() => {
    return TEAMS.map(t => ({ ...t, scores: calculateTeamScores(t) }))
      .sort((a, b) => b.scores.total - a.scores.total);
  }, []);

  const tabs = [
    { id: 'standings', label: 'Standings', icon: Trophy },
    { id: 'matches', label: 'Matches', icon: Calendar },
    { id: 'predictions', label: 'Predictions', icon: Target },
    { id: 'players', label: 'Players', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div style={{
      fontFamily: "'Roboto', system-ui, sans-serif",
      background: 'linear-gradient(135deg, #FFF8E7 0%, #FEF3E2 50%, #FFE8D6 100%)',
      minHeight: '100vh',
      color: '#1F2937',
      fontSize: '17px',
    }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Roboto+Slab:wght@600;700;900&display=swap" />

      {/* HERO HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #0F5132 0%, #166534 50%, #15803D 100%)',
        color: '#FEF3C7',
        padding: '40px 32px 56px',
        boxShadow: '0 8px 32px rgba(15, 81, 50, 0.3)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative balls */}
        <div style={{ position: 'absolute', top: 20, right: 40, display: 'flex', gap: 8, opacity: 0.4 }}>
          {['#DC2626','#FBBF24','#16A34A','#7C2D12','#2563EB','#EC4899','#1F2937'].map((c,i)=>(
            <div key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: c, boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.4)' }}/>
          ))}
        </div>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ fontSize: 14, letterSpacing: '4px', fontWeight: 500, opacity: 0.85, marginBottom: 8 }}>
            🎱 FANTASY LEAGUE • CRUCIBLE 2026
          </div>
          <h1 style={{
            fontFamily: "'Roboto Slab', serif",
            fontSize: 52, fontWeight: 900, margin: 0, letterSpacing: '-1px',
            color: '#FBBF24',
            textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
          }}>
            World Snooker Championship
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 16, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 18, fontWeight: 500 }}>50th Edition · The Crucible · Sheffield</div>
            <div style={{
              padding: '6px 16px', background: 'linear-gradient(135deg, #DC2626, #FBBF24)', color: '#FFFFFF', borderRadius: 20,
              fontWeight: 800, fontSize: 14, letterSpacing: '1px',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.5)',
            }}>
              🏆 WU YIZE — WORLD CHAMPION 2026 (18-17)
            </div>
          </div>
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div style={{
        background: '#FFFFFF',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        position: 'sticky', top: 0, zIndex: 50,
        borderBottom: '3px solid #FBBF24',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', overflowX: 'auto' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '20px 28px', border: 'none', cursor: 'pointer',
                  fontSize: 17, fontWeight: 600,
                  fontFamily: 'inherit',
                  background: active ? 'linear-gradient(180deg, #FFF8E7 0%, #FEF3C7 100%)' : 'transparent',
                  color: active ? '#0F5132' : '#6B7280',
                  borderBottom: active ? '4px solid #DC2626' : '4px solid transparent',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}>
                <Icon size={20} strokeWidth={2.5} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 24px 80px' }}>
        {activeTab === 'standings' && <StandingsTab teams={teamsWithScores} onTeamClick={(t) => { setSelectedTeam(t); setActiveTab('predictions'); }} />}
        {activeTab === 'matches' && <MatchesTab />}
        {activeTab === 'predictions' && <PredictionsTab teams={teamsWithScores} selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />}
        {activeTab === 'players' && <PlayersTab teams={teamsWithScores} />}
        {activeTab === 'analytics' && <AnalyticsTab teams={teamsWithScores} />}
      </div>

      {/* FOOTER */}
      <div style={{
        background: '#0F5132', color: '#FEF3C7',
        padding: '24px', textAlign: 'center', fontSize: 14,
      }}>
        Fantasy Snooker League · 2026 World Championship · Data verified from SnookerHQ.com
      </div>
    </div>
  );
}

// ============================================================================
// STANDINGS TAB
// ============================================================================

function StandingsTab({ teams, onTeamClick }) {
  const leader = teams[0];
  const lastPlace = teams[teams.length - 1];

  return (
    <div>
      {/* TOP STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
        <StatCard icon={Crown} label="Current Leader" value={leader.name} sub={`${leader.scores.total} points`} bgColor="#FBBF24" iconBg="#92400E" />
        {(() => {
          const tiedCount = teams.filter(t => t.scores.total === leader.scores.total).length;
          if (tiedCount > 1) {
            return <StatCard icon={Flame} label="Tied At Top" value={tiedCount + ' teams'} sub={`${leader.scores.total} pts each`} bgColor="#DC2626" iconBg="#7F1D1D" textColor="#FEF2F2" />;
          }
          const second = teams.find(t => t.scores.total < leader.scores.total);
          const gap = second ? leader.scores.total - second.scores.total : 0;
          return <StatCard icon={Flame} label="Lead Margin" value={`+${gap} pt${gap !== 1 ? 's' : ''}`} sub={second ? `over ${second.name}` : 'sole leader'} bgColor="#DC2626" iconBg="#7F1D1D" textColor="#FEF2F2" />;
        })()}
        <StatCard icon={Target} label="Total Matches" value="31 / 31" sub="Tournament complete" bgColor="#0F5132" iconBg="#022C22" textColor="#D1FAE5" />
        <StatCard icon={Award} label="World Champion" value="Wu Yize 🇨🇳" sub="Beat Murphy 18-17 in final-frame decider" bgColor="#B91C1C" iconBg="#7F1D1D" textColor="#FEE2E2" />
      </div>

      {/* LEADERBOARD */}
      <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '2px solid #FEF3C7' }}>
        <h2 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 32, fontWeight: 900, color: '#0F5132', marginTop: 0, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Trophy size={32} color="#DC2626" /> League Table
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <thead>
              <tr style={{ background: '#0F5132', color: '#FEF3C7' }}>
                <th style={th}>Rank</th>
                <th style={{ ...th, textAlign: 'left' }}>Team</th>
                <th style={th}>R1</th>
                <th style={th}>R2</th>
                <th style={th}>QF</th>
                <th style={th}>SF</th>
                <th style={th}>Final Pick</th>
                <th style={{ ...th, fontSize: 18 }}>Total</th>
                <th style={th}>Form</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, i) => {
                const rank = i + 1;
                const tied = teams.filter(t => t.scores.total === team.scores.total).length > 1;
                const rankColor = rank === 1 ? '#FBBF24' : rank === 2 ? '#9CA3AF' : rank === 3 ? '#B45309' : '#E5E7EB';
                const r1Pct = (team.scores.r1 / 48) * 100;
                const r2Pct = (team.scores.r2 / 24) * 100;

                return (
                  <tr key={team.name} onClick={() => onTeamClick(team)} style={{
                    cursor: 'pointer',
                    background: '#FFFFFF',
                    transition: 'transform 0.15s',
                  }} onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                     onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
                    <td style={{ ...td, textAlign: 'center' }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: '50%',
                        background: rankColor,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 900, fontSize: 18,
                        color: rank <= 3 ? '#FFFFFF' : '#374151',
                        boxShadow: rank === 1 ? '0 4px 12px rgba(251, 191, 36, 0.5)' : 'none',
                      }}>
                        {rank === 1 ? '👑' : rank}
                      </div>
                    </td>
                    <td style={{ ...td, textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{
                          width: 48, height: 48, borderRadius: 12,
                          background: `linear-gradient(135deg, ${team.color} 0%, ${team.accent} 100%)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 24, boxShadow: `0 4px 12px ${team.color}40`,
                        }}>
                          {team.icon}
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 19, color: '#1F2937' }}>{team.name}</div>
                          <div style={{ fontSize: 13, color: '#6B7280', fontStyle: 'italic' }}>{team.motto}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ ...td, textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: 17, color: '#0F5132' }}>{team.scores.r1}</div>
                      <div style={{ fontSize: 11, color: '#6B7280' }}>/ 48</div>
                    </td>
                    <td style={{ ...td, textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: 17, color: '#0F5132' }}>{team.scores.r2}</div>
                      <div style={{ fontSize: 11, color: '#6B7280' }}>/ 24</div>
                    </td>
                    <td style={{ ...td, textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: 17, color: '#0F5132' }}>{team.scores.qf}</div>
                      <div style={{ fontSize: 11, color: '#6B7280' }}>/ 12</div>
                    </td>
                    <td style={{ ...td, textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: 17, color: '#0F5132' }}>{team.scores.sf}</div>
                      <div style={{ fontSize: 11, color: '#6B7280' }}>/ 6</div>
                    </td>
                    <td style={{ ...td, textAlign: 'center' }}>
                      <div style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: 12,
                        background: team.final === 'Wu Yize' ? '#FEE2E2' : '#DBEAFE',
                        color: team.final === 'Wu Yize' ? '#991B1B' : '#1E40AF',
                        fontWeight: 700, fontSize: 12,
                        whiteSpace: 'nowrap',
                      }}>
                        🏆 {team.final}
                      </div>
                    </td>
                    <td style={{ ...td, textAlign: 'center' }}>
                      <div style={{
                        display: 'inline-block',
                        padding: '8px 20px', borderRadius: 24,
                        background: rank === 1 ? 'linear-gradient(135deg, #FBBF24, #F59E0B)' :
                                    rank === teams.length ? 'linear-gradient(135deg, #FCA5A5, #EF4444)' :
                                    'linear-gradient(135deg, #0F5132, #166534)',
                        color: '#FFFFFF',
                        fontWeight: 900, fontSize: 22,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                      }}>
                        {team.scores.total}
                      </div>
                    </td>
                    <td style={{ ...td, textAlign: 'center' }}>
                      <FormBadge r1Pct={r1Pct} r2Pct={r2Pct} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 20, padding: 16, background: '#FEF9E7', borderRadius: 8, borderLeft: '4px solid #FBBF24', fontSize: 14, color: '#78350F' }}>
          <strong>Scoring:</strong> Picking the actual winner = 3 points. Picking the loser = 1 point. Click any team to see their picks in detail.
        </div>
      </div>
    </div>
  );
}

function FormBadge({ r1Pct, r2Pct }) {
  const trending = r2Pct > r1Pct ? 'up' : r2Pct < r1Pct ? 'down' : 'flat';
  const Icon = trending === 'up' ? TrendingUp : trending === 'down' ? TrendingDown : Circle;
  const color = trending === 'up' ? '#16A34A' : trending === 'down' ? '#DC2626' : '#9CA3AF';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color, fontWeight: 700 }}>
      <Icon size={18} />
      <span style={{ fontSize: 13 }}>{trending === 'up' ? 'Rising' : trending === 'down' ? 'Falling' : 'Steady'}</span>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, bgColor, iconBg, textColor = '#FFFFFF' }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}DD 100%)`,
      borderRadius: 16, padding: 24, color: textColor,
      boxShadow: `0 8px 24px ${bgColor}50`,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 100, height: 100, borderRadius: '50%',
        background: iconBg, opacity: 0.2,
      }} />
      <Icon size={28} style={{ marginBottom: 12 }} strokeWidth={2.5} />
      <div style={{ fontSize: 13, letterSpacing: '1.5px', fontWeight: 600, opacity: 0.9, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 900, marginTop: 4, fontFamily: "'Roboto Slab', serif" }}>{value}</div>
      <div style={{ fontSize: 14, opacity: 0.85, marginTop: 4 }}>{sub}</div>
    </div>
  );
}

// ============================================================================
// MATCHES TAB
// ============================================================================

function MatchesTab() {
  const [round, setRound] = useState('r1');

  return (
    <div>
      <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '2px solid #FEF3C7' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <RoundButton active={round==='r1'} onClick={() => setRound('r1')} label="Round 1 — Last 32" status="FINISHED" color="#16A34A" />
          <RoundButton active={round==='r2'} onClick={() => setRound('r2')} label="Round 2 — Last 16" status="FINISHED" color="#16A34A" />
          <RoundButton active={round==='qf'} onClick={() => setRound('qf')} label="Quarter-Finals" status="FINISHED" color="#16A34A" />
          <RoundButton active={round==='sf'} onClick={() => setRound('sf')} label="Semi-Finals" status="FINISHED" color="#16A34A" />
          <RoundButton active={round==='f'} onClick={() => setRound('f')} label="Final" status="🏆 WU WINS 18-17" color="#B91C1C" />
        </div>
      </div>

      {round === 'r1' && <MatchesList matches={ROUND1_MATCHES} title="Round 1 — Last 32 (Best of 19)" />}
      {round === 'r2' && <MatchesList matches={ROUND2_MATCHES} title="Round 2 — Last 16 (Best of 25)" />}
      {round === 'qf' && <MatchesList matches={QF_MATCHES} title="Quarter-Finals (Best of 25)" />}
      {round === 'sf' && <MatchesList matches={SF_MATCHES} title="Semi-Finals (Best of 33)" />}
      {round === 'f' && <MatchesList matches={FINAL_MATCH} title="THE FINAL (Best of 35) — May 3–4" />}
    </div>
  );
}

function RoundButton({ active, onClick, label, status, color }) {
  return (
    <button onClick={onClick} style={{
      padding: '14px 22px', border: 'none', cursor: 'pointer',
      borderRadius: 12, fontFamily: 'inherit', fontWeight: 700, fontSize: 15,
      background: active ? 'linear-gradient(135deg, #0F5132, #166534)' : '#F3F4F6',
      color: active ? '#FBBF24' : '#374151',
      transition: 'all 0.2s',
      boxShadow: active ? '0 4px 12px rgba(15, 81, 50, 0.3)' : 'none',
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4,
    }}>
      <span>{label}</span>
      <span style={{ fontSize: 11, fontWeight: 700, color: active ? '#FBBF24' : color, letterSpacing: '0.5px' }}>● {status}</span>
    </button>
  );
}

function MatchesList({ matches, title }) {
  return (
    <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '2px solid #FEF3C7' }}>
      <h2 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 28, color: '#0F5132', margin: '0 0 24px 0' }}>{title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
        {matches.map(m => (
          m.winner ? (
            <div key={m.id} style={{
              background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
              borderRadius: 12, padding: 20,
              border: '2px solid #FDE68A',
              position: 'relative',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#92400E', letterSpacing: '1px' }}>MATCH {m.id}</span>
                <span style={{
                  fontSize: 11, fontWeight: 800, padding: '4px 10px',
                  background: '#16A34A', color: '#FFFFFF', borderRadius: 12, letterSpacing: '0.5px',
                }}>FINISHED</span>
              </div>
              <PlayerLine name={m.p1} won={m.winner === m.p1} score={m.score?.split('-')[0]} />
              <div style={{ height: 1, background: '#FDE68A', margin: '8px 0' }} />
              <PlayerLine name={m.p2} won={m.winner === m.p2} score={m.score?.split('-')[1]} />
            </div>
          ) : (
            <div key={m.id} style={{
              background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
              borderRadius: 12, padding: 20,
              border: '2px dashed #9CA3AF',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', letterSpacing: '1px' }}>MATCH {m.id}</span>
                <span style={{
                  fontSize: 11, fontWeight: 800, padding: '4px 10px',
                  background: '#9CA3AF', color: '#FFFFFF', borderRadius: 12, letterSpacing: '0.5px',
                }}>NOT FINISHED</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#374151', padding: '8px 0' }}>{m.p1}</div>
              <div style={{ fontSize: 14, color: '#9CA3AF', padding: '4px 0', fontStyle: 'italic' }}>vs</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#374151', padding: '8px 0' }}>{m.p2}</div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

function PlayerLine({ name, won, score }) {
  const info = PLAYER_INFO[name];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '6px 0',
      opacity: won ? 1 : 0.55,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {won && <Trophy size={18} color="#DC2626" />}
        <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280' }}>{info?.flag}</span>
        {info?.seed && <span style={{ fontSize: 11, padding: '2px 6px', background: '#0F5132', color: '#FBBF24', borderRadius: 4, fontWeight: 700 }}>{info.seed}</span>}
        <span style={{ fontSize: 17, fontWeight: won ? 800 : 500, color: won ? '#0F5132' : '#374151' }}>{name}</span>
      </div>
      <span style={{ fontSize: 22, fontWeight: 900, color: won ? '#DC2626' : '#9CA3AF', fontFamily: "'Roboto Slab', serif" }}>{score}</span>
    </div>
  );
}

function UpcomingMatchList({ matches, title, sub }) {
  return (
    <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '2px solid #FEF3C7' }}>
      <h2 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 28, color: '#0F5132', margin: '0 0 6px 0' }}>{title}</h2>
      <div style={{ color: '#6B7280', fontSize: 15, marginBottom: 24 }}>{sub}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
        {matches.map(m => (
          <div key={m.id} style={{
            background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
            borderRadius: 12, padding: 20,
            border: '2px dashed #9CA3AF',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', letterSpacing: '1px' }}>MATCH {m.id}</span>
              <span style={{
                fontSize: 11, fontWeight: 800, padding: '4px 10px',
                background: '#9CA3AF', color: '#FFFFFF', borderRadius: 12, letterSpacing: '0.5px',
              }}>NOT FINISHED</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#374151', padding: '8px 0' }}>{m.p1}</div>
            <div style={{ fontSize: 14, color: '#9CA3AF', padding: '4px 0', fontStyle: 'italic' }}>vs</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#374151', padding: '8px 0' }}>{m.p2}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// PREDICTIONS TAB
// ============================================================================

function PredictionsTab({ teams, selectedTeam, setSelectedTeam }) {
  const [view, setView] = useState(selectedTeam ? 'team' : 'matrix');

  return (
    <div>
      <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '2px solid #FEF3C7', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button onClick={() => setView('matrix')} style={tabStyle(view === 'matrix')}>Comparison Matrix</button>
        <button onClick={() => setView('team')} style={tabStyle(view === 'team')}>Single Team Card</button>
      </div>

      {view === 'matrix' && <PredictionMatrix teams={teams} />}
      {view === 'team' && <TeamCardView teams={teams} selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />}
    </div>
  );
}

function tabStyle(active) {
  return {
    padding: '12px 22px', border: 'none', cursor: 'pointer',
    borderRadius: 10, fontFamily: 'inherit', fontWeight: 700, fontSize: 15,
    background: active ? '#0F5132' : '#F3F4F6',
    color: active ? '#FBBF24' : '#374151',
    transition: 'all 0.2s',
  };
}

function PredictionMatrix({ teams }) {
  const [round, setRound] = useState('r1');
  const matches = round === 'r1' ? ROUND1_MATCHES : round === 'r2' ? ROUND2_MATCHES : round === 'qf' ? QF_MATCHES : round === 'sf' ? SF_MATCHES : FINAL_MATCH;
  const detailKey = round === 'r1' ? 'r1Details' : round === 'r2' ? 'r2Details' : round === 'qf' ? 'qfDetails' : round === 'sf' ? 'sfDetails' : 'fDetails';

  return (
    <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '2px solid #FEF3C7' }}>
      <h2 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 26, color: '#0F5132', margin: '0 0 16px 0' }}>Predictions Matrix</h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <button onClick={() => setRound('r1')} style={{ ...tabStyle(round==='r1'), padding: '8px 18px', fontSize: 14 }}>Round 1</button>
        <button onClick={() => setRound('r2')} style={{ ...tabStyle(round==='r2'), padding: '8px 18px', fontSize: 14 }}>Round 2</button>
        <button onClick={() => setRound('qf')} style={{ ...tabStyle(round==='qf'), padding: '8px 18px', fontSize: 14 }}>Quarter-Finals</button>
        <button onClick={() => setRound('sf')} style={{ ...tabStyle(round==='sf'), padding: '8px 18px', fontSize: 14 }}>Semi-Finals</button>
        <button onClick={() => setRound('f')} style={{ ...tabStyle(round==='f'), padding: '8px 18px', fontSize: 14 }}>Final</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#0F5132', color: '#FBBF24' }}>
              <th style={{ ...th, textAlign: 'left', minWidth: 220 }}>Match</th>
              {teams.map(t => (
                <th key={t.name} style={{ ...th, padding: '12px 8px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ fontSize: 22 }}>{t.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.2 }}>{t.name.length > 12 ? t.name.split(' ').map(w => w[0]).join('') : t.name}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matches.map((match, i) => (
              <tr key={match.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '12px', fontWeight: 600, color: '#374151', fontSize: 14 }}>
                  <div style={{ fontWeight: 800, color: '#0F5132' }}>{match.p1} vs {match.p2}</div>
                  {match.winner && (
                    <div style={{ fontSize: 12, color: '#DC2626', fontWeight: 700, marginTop: 2 }}>
                      ✓ {match.winner} ({match.score})
                    </div>
                  )}
                  {!match.winner && <div style={{ fontSize: 12, color: '#9CA3AF', fontStyle: 'italic', marginTop: 2 }}>Not finished</div>}
                </td>
                {teams.map(t => {
                  const detail = t.scores[detailKey][i];
                  const pick = detail.pick;
                  const isCorrect = detail.correct;
                  let bg = '#F9FAFB', color = '#6B7280', label = pick;
                  if (isCorrect === true) { bg = '#DCFCE7'; color = '#166534'; }
                  else if (isCorrect === false) { bg = '#FEE2E2'; color = '#991B1B'; }
                  return (
                    <td key={t.name} style={{ padding: 6, textAlign: 'center' }}>
                      <div style={{
                        background: bg, color, padding: '8px 6px', borderRadius: 6,
                        fontSize: 12, fontWeight: 700, minWidth: 90,
                      }}>
                        {label}
                        {detail.points !== null && (
                          <div style={{ fontSize: 14, fontWeight: 900, marginTop: 2 }}>+{detail.points}</div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 24, fontSize: 13, color: '#6B7280' }}>
        <Legend2 color="#DCFCE7" textColor="#166534" label="Correct (+3 pts)" />
        <Legend2 color="#FEE2E2" textColor="#991B1B" label="Wrong (+1 pt)" />
        <Legend2 color="#F9FAFB" textColor="#6B7280" label="Pending" />
      </div>
    </div>
  );
}

function Legend2({ color, textColor, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 16, height: 16, background: color, border: `1px solid ${textColor}40`, borderRadius: 4 }} />
      <span>{label}</span>
    </div>
  );
}

function TeamCardView({ teams, selectedTeam, setSelectedTeam }) {
  const team = selectedTeam || teams[0];
  const teamData = teams.find(t => t.name === team.name) || teams[0];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        {teams.map(t => (
          <button key={t.name} onClick={() => setSelectedTeam(t)} style={{
            padding: 16, border: 'none', cursor: 'pointer', borderRadius: 12,
            background: t.name === teamData.name ? `linear-gradient(135deg, ${t.color}, ${t.accent})` : '#FFFFFF',
            color: t.name === teamData.name ? '#FFFFFF' : '#374151',
            fontFamily: 'inherit', fontWeight: 700, fontSize: 14,
            boxShadow: t.name === teamData.name ? `0 6px 16px ${t.color}50` : '0 2px 8px rgba(0,0,0,0.06)',
            border: t.name === teamData.name ? 'none' : '2px solid #FEF3C7',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            transition: 'all 0.2s',
          }}>
            <div style={{ fontSize: 28 }}>{t.icon}</div>
            <div>{t.name}</div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>{t.scores.total} pts</div>
          </button>
        ))}
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${teamData.color} 0%, ${teamData.accent} 100%)`,
        borderRadius: 16, padding: 32, color: '#FFFFFF',
        marginBottom: 24,
        boxShadow: `0 8px 32px ${teamData.color}50`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 64 }}>{teamData.icon}</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h2 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 36, margin: 0 }}>{teamData.name}</h2>
            <div style={{ fontSize: 17, opacity: 0.9, fontStyle: 'italic' }}>"{teamData.motto}"</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, opacity: 0.9, letterSpacing: '1px' }}>TOTAL POINTS</div>
            <div style={{ fontSize: 56, fontWeight: 900, fontFamily: "'Roboto Slab', serif", lineHeight: 1 }}>{teamData.scores.total}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, marginTop: 24 }}>
          <RoundStat label="Round 1" value={teamData.scores.r1} max={48} hits={teamData.scores.r1Details.filter(d => d.correct).length} of={16} />
          <RoundStat label="Round 2" value={teamData.scores.r2} max={24} hits={teamData.scores.r2Details.filter(d => d.correct).length} of={8} />
          <RoundStat label="QF" value={teamData.scores.qf} max={12} hits={teamData.scores.qfDetails.filter(d => d.correct).length} of={4} />
          <RoundStat label="Semi" value={teamData.scores.sf} max={6} hits={teamData.scores.sfDetails.filter(d => d.correct).length} of={2} />
          <RoundStat label="Final" value={teamData.scores.f} max={3} hits={0} of={1} pending={true} partialNote={`Picked: ${teamData.final}`} />
        </div>
      </div>

      <PicksList title="Round 1 — Last 32" details={teamData.scores.r1Details} accent={teamData.accent} />
      <PicksList title="Round 2 — Last 16" details={teamData.scores.r2Details} accent={teamData.accent} />
      <PicksList title="Quarter-Finals" details={teamData.scores.qfDetails} accent={teamData.accent} />
      <PicksList title="Semi-Finals" details={teamData.scores.sfDetails} accent={teamData.accent} />
      <PicksList title="THE FINAL — Best of 35" details={teamData.scores.fDetails} accent={teamData.accent} />
    </div>
  );
}

function RoundStat({ label, value, max, hits, of, pending, partialNote }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.15)', padding: 14, borderRadius: 10, backdropFilter: 'blur(10px)' }}>
      <div style={{ fontSize: 12, letterSpacing: '1px', opacity: 0.85 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 900, fontFamily: "'Roboto Slab', serif" }}>
        {pending ? '—' : `${value}`}
        <span style={{ fontSize: 14, fontWeight: 400, opacity: 0.7 }}>{!pending && ` / ${max}`}</span>
      </div>
      {hits !== null && !pending && !partialNote && <div style={{ fontSize: 13 }}>{hits} of {of} correct</div>}
      {hits !== null && !pending && partialNote && <div style={{ fontSize: 13, fontStyle: 'italic' }}>{hits}/{of} correct · {partialNote}</div>}
      {pending && partialNote && <div style={{ fontSize: 13, fontStyle: 'italic' }}>Not finished · {partialNote}</div>}
      {pending && !partialNote && <div style={{ fontSize: 13, fontStyle: 'italic' }}>Not finished</div>}
    </div>
  );
}

function PicksList({ title, details, accent }) {
  return (
    <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, marginBottom: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '2px solid #FEF3C7' }}>
      <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 22, color: '#0F5132', margin: '0 0 16px 0' }}>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 10 }}>
        {details.map((d, i) => {
          const pickPending = d.points === null;
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: 12, borderRadius: 8,
              background: pickPending ? '#F9FAFB' : d.correct ? '#DCFCE7' : '#FEE2E2',
              border: `2px solid ${pickPending ? '#E5E7EB' : d.correct ? '#86EFAC' : '#FCA5A5'}`,
            }}>
              <div>
                <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>{d.match.p1} vs {d.match.p2}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', marginTop: 2 }}>
                  Pick: {d.pick}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                {pickPending ? (
                  <Circle size={20} color="#9CA3AF" />
                ) : d.correct ? (
                  <div>
                    <CheckCircle2 size={20} color="#16A34A" style={{ display: 'block', marginLeft: 'auto' }} />
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#16A34A' }}>+3</div>
                  </div>
                ) : (
                  <div>
                    <XCircle size={20} color="#DC2626" style={{ display: 'block', marginLeft: 'auto' }} />
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#DC2626' }}>+1</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// PLAYERS TAB
// ============================================================================

function PlayersTab({ teams }) {
  const [filter, setFilter] = useState('alive');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const allPlayers = useMemo(() => {
    // Start with QF survivors
    const stillStanding = new Set();
    QF_MATCHES.forEach(m => {
      if (m.winner) {
        stillStanding.add(m.winner);
      } else {
        stillStanding.add(m.p1);
        stillStanding.add(m.p2);
      }
    });
    // Apply SF results: anyone who lost an SF is removed
    SF_MATCHES.forEach(m => {
      if (m.winner) {
        const loser = m.winner === m.p1 ? m.p2 : m.p1;
        stillStanding.delete(loser);
      }
    });
    // Apply Final result: the runner-up is removed; only the champion remains "still in"
    FINAL_MATCH.forEach(m => {
      if (m.winner) {
        const loser = m.winner === m.p1 ? m.p2 : m.p1;
        stillStanding.delete(loser);
      }
    });
    const champion = FINAL_MATCH[0]?.winner;
    return Object.entries(PLAYER_INFO).map(([name, info]) => ({
      name, ...info,
      stillIn: stillStanding.has(name),
      isChampion: name === champion,
    })).sort((a, b) => (a.seed || 999) - (b.seed || 999));
  }, []);

  if (selectedPlayer) {
    return <PlayerDetail playerName={selectedPlayer} teams={teams} onBack={() => setSelectedPlayer(null)} onSelectPlayer={setSelectedPlayer} />;
  }

  const filtered = filter === 'all' ? allPlayers : filter === 'alive' ? allPlayers.filter(p => p.stillIn) : allPlayers.filter(p => !p.stillIn);

  // Count final picks per finalist
  const finalPicksByPlayer = {};
  teams.forEach(t => {
    if (t.final) {
      finalPicksByPlayer[t.final] = (finalPicksByPlayer[t.final] || 0) + 1;
    }
  });

  return (
    <div>
      <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '2px solid #FEF3C7', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button onClick={() => setFilter('alive')} style={tabStyle(filter === 'alive')}>🟢 Still In ({allPlayers.filter(p => p.stillIn).length})</button>
        <button onClick={() => setFilter('out')} style={tabStyle(filter === 'out')}>❌ Eliminated ({allPlayers.filter(p => !p.stillIn).length})</button>
        <button onClick={() => setFilter('all')} style={tabStyle(filter === 'all')}>👥 All Players (32)</button>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #FEF9E7 0%, #FFFBEB 100%)', borderRadius: 12, padding: '14px 18px', marginBottom: 24, border: '2px dashed #F59E0B', fontSize: 15, color: '#92400E', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 22 }}>👆</span>
        Click any player card to see which teams backed them, full match history, and fantasy stats.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {filtered.map(p => (
          <button key={p.name} onClick={() => setSelectedPlayer(p.name)} style={{
            background: p.stillIn ? 'linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 100%)' : '#F9FAFB',
            borderRadius: 14, padding: 20,
            border: p.stillIn ? '3px solid #FBBF24' : '2px solid #E5E7EB',
            boxShadow: p.stillIn ? '0 8px 20px rgba(251, 191, 36, 0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
            opacity: p.stillIn ? 1 : 0.78,
            textAlign: 'left',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = p.stillIn ? '0 14px 30px rgba(251, 191, 36, 0.35)' : '0 8px 20px rgba(0,0,0,0.10)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = p.stillIn ? '0 8px 20px rgba(251, 191, 36, 0.2)' : '0 2px 8px rgba(0,0,0,0.04)'; }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              {p.seed ? (
                <div style={{
                  background: 'linear-gradient(135deg, #0F5132, #166534)',
                  color: '#FBBF24', fontWeight: 900,
                  width: 36, height: 36, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15,
                }}>{p.seed}</div>
              ) : (
                <div style={{
                  background: '#9CA3AF', color: '#FFFFFF', fontWeight: 700,
                  padding: '6px 12px', borderRadius: 6, fontSize: 11,
                }}>QUALIFIER</div>
              )}
              {p.isChampion && (
                <div style={{
                  background: 'linear-gradient(135deg, #DC2626, #FBBF24)', color: '#FFFFFF', fontWeight: 900, fontSize: 11,
                  padding: '4px 10px', borderRadius: 12,
                  boxShadow: '0 3px 8px rgba(220, 38, 38, 0.35)',
                }}>🏆 WORLD CHAMPION</div>
              )}
              {!p.isChampion && p.name === 'Shaun Murphy' && (
                <div style={{
                  background: '#E5E7EB', color: '#1F2937', fontWeight: 800, fontSize: 11,
                  padding: '4px 10px', borderRadius: 12,
                }}>🥈 RUNNER-UP</div>
              )}
              {!p.isChampion && p.name !== 'Shaun Murphy' && (
                <div style={{
                  background: '#FEE2E2', color: '#991B1B', fontWeight: 800, fontSize: 11,
                  padding: '4px 10px', borderRadius: 12,
                }}>OUT</div>
              )}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Roboto Slab', serif", color: '#1F2937', marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontSize: 14, color: '#6B7280', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 700 }}>{p.flag}</span> · {p.status}
            </div>
            {finalPicksByPlayer[p.name] !== undefined && (
              <div style={{
                marginTop: 10, padding: '8px 12px',
                background: p.isChampion
                  ? 'linear-gradient(135deg, #DCFCE7, #FFFBEB)'
                  : 'linear-gradient(135deg, #FEF3C7, #FFFBEB)',
                borderRadius: 8,
                border: p.isChampion ? '1px solid #16A34A' : '1px solid #FCD34D',
                fontSize: 13, color: p.isChampion ? '#166534' : '#7C2D12',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontWeight: 600 }}>
                  {p.isChampion ? '✓ Correct picks:' : '✗ Wrong picks:'}
                </span>
                <span style={{ fontWeight: 900, fontSize: 16, color: p.isChampion ? '#16A34A' : '#9F1239' }}>
                  {finalPicksByPlayer[p.name]} of 8 {p.isChampion ? '(+3 each)' : '(+1 each)'}
                </span>
              </div>
            )}
            <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px dashed #E5E7EB', fontSize: 12, fontWeight: 700, color: '#0F5132', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>VIEW DETAILS</span>
              <span>→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// PLAYER DETAIL: Match history, pick analysis, fantasy stats
// ============================================================================

function PlayerDetail({ playerName, teams, onBack, onSelectPlayer }) {
  const info = PLAYER_INFO[playerName] || {};

  // Find matches the player appeared in across rounds
  const r1Idx = ROUND1_MATCHES.findIndex(m => m.p1 === playerName || m.p2 === playerName);
  const r2Idx = ROUND2_MATCHES.findIndex(m => m.p1 === playerName || m.p2 === playerName);
  const qfIdx = QF_MATCHES.findIndex(m => m.p1 === playerName || m.p2 === playerName);
  const sfIdxForMatches = SF_MATCHES.findIndex(m => m.p1 === playerName || m.p2 === playerName);
  const finalIdx = FINAL_MATCH.findIndex(m => m.p1 === playerName || m.p2 === playerName);

  const matches = [];
  if (r1Idx !== -1) matches.push({ round: 'R1', roundFull: 'Round 1 — Last 32', bestOf: 'Best of 19 frames', matchIndex: r1Idx, match: ROUND1_MATCHES[r1Idx], finished: true, pickKey: 'r1' });
  if (r2Idx !== -1) matches.push({ round: 'R2', roundFull: 'Round 2 — Last 16', bestOf: 'Best of 25 frames', matchIndex: r2Idx, match: ROUND2_MATCHES[r2Idx], finished: true, pickKey: 'r2' });
  if (qfIdx !== -1) matches.push({ round: 'QF', roundFull: 'Quarter-Finals — Last 8', bestOf: 'Best of 25 frames', matchIndex: qfIdx, match: QF_MATCHES[qfIdx], finished: !!QF_MATCHES[qfIdx].winner, pickKey: 'qf' });
  if (sfIdxForMatches !== -1) matches.push({ round: 'SF', roundFull: 'Semi-Finals — Last 4', bestOf: 'Best of 33 frames', matchIndex: sfIdxForMatches, match: SF_MATCHES[sfIdxForMatches], finished: !!SF_MATCHES[sfIdxForMatches].winner, pickKey: 'sf' });
  if (finalIdx !== -1) matches.push({ round: 'Final', roundFull: 'THE FINAL', bestOf: 'Best of 35 frames', matchIndex: finalIdx, match: FINAL_MATCH[finalIdx], finished: !!FINAL_MATCH[finalIdx].winner, pickKey: 'final' });

  // Pick analysis per match
  const pickAnalyses = matches.map(mp => {
    const opponent = mp.match.p1 === playerName ? mp.match.p2 : mp.match.p1;
    const won = mp.finished ? mp.match.winner === playerName : null;
    const teamsBackedThis = [];
    const teamsBackedOpponent = [];
    teams.forEach(t => {
      // For Final round, team.final is a string. For other rounds, it's an array indexed by matchIndex.
      const pick = mp.pickKey === 'final' ? t.final : (t[mp.pickKey] ? t[mp.pickKey][mp.matchIndex] : null);
      if (pick === playerName) teamsBackedThis.push(t);
      else if (pick === opponent) teamsBackedOpponent.push(t);
    });
    return { ...mp, opponent, won, teamsBackedThis, teamsBackedOpponent };
  });

  // Aggregate stats
  const totalPicks = pickAnalyses.reduce((s, m) => s + m.teamsBackedThis.length, 0);
  const totalPossible = pickAnalyses.length * 8;
  const pickRate = totalPossible > 0 ? Math.round((totalPicks / totalPossible) * 100) : 0;

  // Loyalty: which team(s) picked them most often
  const teamPickCount = {};
  teams.forEach(t => { teamPickCount[t.name] = { team: t, count: 0 }; });
  pickAnalyses.forEach(m => { m.teamsBackedThis.forEach(t => { teamPickCount[t.name].count++; }); });
  const loyalty = Object.values(teamPickCount).sort((a, b) => b.count - a.count);
  const topCount = loyalty[0]?.count || 0;
  const topLoyal = loyalty.filter(l => l.count === topCount && l.count > 0);

  // Fantasy points generated for backers
  const successfulPicks = pickAnalyses.filter(m => m.finished && m.won).reduce((s, m) => s + m.teamsBackedThis.length, 0);
  const failedPicks = pickAnalyses.filter(m => m.finished && !m.won).reduce((s, m) => s + m.teamsBackedThis.length, 0);
  const fantasyPointsFor = successfulPicks * 3 + failedPicks * 1;

  // Tournament status
  const sfIdx = SF_MATCHES.findIndex(m => m.p1 === playerName || m.p2 === playerName);
  const finalIdxStatus = FINAL_MATCH.findIndex(m => m.p1 === playerName || m.p2 === playerName);
  const reachedR2 = r2Idx !== -1;
  const reachedQF = qfIdx !== -1;
  const qfFinished = reachedQF && !!QF_MATCHES[qfIdx].winner;
  const qfWon = qfFinished && QF_MATCHES[qfIdx].winner === playerName;
  const lostInQF = qfFinished && !qfWon;
  const reachedSF = sfIdx !== -1;
  const sfFinished = reachedSF && !!SF_MATCHES[sfIdx].winner;
  const sfWon = sfFinished && SF_MATCHES[sfIdx].winner === playerName;
  const lostInSF = sfFinished && !sfWon;
  const reachedFinal = finalIdxStatus !== -1;
  const finalFinished = reachedFinal && !!FINAL_MATCH[finalIdxStatus].winner;
  const finalWon = finalFinished && FINAL_MATCH[finalIdxStatus].winner === playerName;
  const lostInFinal = finalFinished && !finalWon;
  const isChampion = finalWon;
  const isRunnerUp = lostInFinal;
  const eliminatedAt = !reachedR2 ? 'R1' : !reachedQF ? 'R2' : lostInQF ? 'QF' : lostInSF ? 'SF' : lostInFinal ? 'Final' : null;
  const stillIn = reachedQF && !lostInQF && !lostInSF && !lostInFinal;

  // R1/R2 outcomes (for header path)
  const r1Won = r1Idx !== -1 && ROUND1_MATCHES[r1Idx].winner === playerName;
  const r2Won = r2Idx !== -1 && ROUND2_MATCHES[r2Idx].winner === playerName;

  const headerGrad = isChampion
    ? 'linear-gradient(135deg, #DC2626 0%, #B91C1C 40%, #FBBF24 100%)'
    : isRunnerUp
    ? 'linear-gradient(135deg, #4B5563 0%, #6B7280 50%, #9CA3AF 100%)'
    : stillIn
    ? 'linear-gradient(135deg, #0F5132 0%, #166534 50%, #B45309 100%)'
    : 'linear-gradient(135deg, #475569 0%, #64748B 100%)';

  return (
    <div>
      {/* Back button */}
      <button onClick={onBack} style={{
        background: '#FFFFFF', border: '2px solid #FEF3C7', borderRadius: 12,
        padding: '10px 18px', cursor: 'pointer', fontFamily: 'inherit',
        fontSize: 15, fontWeight: 700, color: '#0F5132', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>← Back to All Players</button>

      {/* Header card */}
      <div style={{
        background: headerGrad,
        borderRadius: 18, padding: 32, color: '#FFFFFF',
        marginBottom: 20,
        boxShadow: stillIn ? '0 12px 32px rgba(15, 81, 50, 0.4)' : '0 8px 24px rgba(71, 85, 105, 0.35)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', position: 'relative' }}>
          {info.seed ? (
            <div style={{
              background: '#FBBF24', color: '#0F5132', fontWeight: 900,
              width: 80, height: 80, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, fontFamily: "'Roboto Slab', serif",
              boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
              border: '3px solid #FFFFFF',
            }}>{info.seed}</div>
          ) : (
            <div style={{
              background: '#FBBF24', color: '#0F5132', fontWeight: 900,
              padding: '14px 20px', borderRadius: 12, fontSize: 14, letterSpacing: '1.5px',
              boxShadow: '0 6px 14px rgba(0,0,0,0.25)',
            }}>QUALIFIER</div>
          )}
          <div style={{ flex: 1, minWidth: 250 }}>
            <div style={{ fontSize: 13, opacity: 0.95, letterSpacing: '2px', fontWeight: 700, marginBottom: 6 }}>{info.flag} · {(info.status || '').toUpperCase()}</div>
            <h2 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 44, margin: 0, fontWeight: 900, lineHeight: 1.05 }}>{playerName}</h2>
          </div>
          <div style={{
            background: isChampion ? 'linear-gradient(135deg, #FBBF24, #F59E0B)' : isRunnerUp ? 'rgba(255,255,255,0.95)' : stillIn ? '#FBBF24' : 'rgba(0,0,0,0.35)',
            color: isChampion ? '#7F1D1D' : isRunnerUp ? '#1F2937' : stillIn ? '#0F5132' : '#FFFFFF',
            padding: '12px 20px', borderRadius: 12,
            fontWeight: 900, fontSize: 13, letterSpacing: '1.5px',
            border: '2px solid #FFFFFF',
          }}>
            {isChampion ? '🏆 WORLD CHAMPION' : isRunnerUp ? '🥈 RUNNER-UP' : stillIn ? (sfWon ? '● ALIVE IN FINAL' : reachedSF ? '● ALIVE IN SF' : '● ALIVE IN QF') : `OUT @ ${eliminatedAt}`}
          </div>
        </div>

        {/* Tournament path */}
        <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.18)', position: 'relative' }}>
          <div style={{ fontSize: 11, letterSpacing: '2px', opacity: 0.85, fontWeight: 700, marginBottom: 12 }}>TOURNAMENT PATH</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <PathStep label="R1" status={r1Idx === -1 ? 'na' : r1Won ? 'won' : 'lost'} />
            <PathArrow />
            <PathStep label="R2" status={r2Idx === -1 ? 'na' : r2Won ? 'won' : 'lost'} />
            <PathArrow />
            <PathStep label="QF" status={qfIdx === -1 ? 'na' : qfFinished ? (qfWon ? 'won' : 'lost') : 'live'} />
            <PathArrow />
            <PathStep label="SF" status={!reachedSF ? 'na' : sfFinished ? (sfWon ? 'won' : 'lost') : 'live'} />
            <PathArrow />
            <PathStep label="F" status={!reachedFinal ? 'na' : finalFinished ? (finalWon ? 'won' : 'lost') : 'live'} />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 24 }}>
        <StatTile label="Matches at Crucible" value={pickAnalyses.filter(m => m.finished).length + (reachedSF && !sfFinished ? 1 : 0)} sub={sfWon ? `${pickAnalyses.filter(m => m.finished).length} finished — through to Final` : lostInSF ? `${pickAnalyses.filter(m => m.finished).length} played — eliminated at SF` : reachedSF ? `${pickAnalyses.filter(m => m.finished).length} finished + 1 in SF` : lostInQF ? `${pickAnalyses.filter(m => m.finished).length} played — eliminated at QF` : `Eliminated in ${eliminatedAt}`} icon="🎱" />
        <StatTile label="Total Fantasy Picks" value={`${totalPicks} / ${totalPossible}`} sub={`${pickRate}% backed across ${matches.length} round${matches.length !== 1 ? 's' : ''}`} icon="🎯" />
        <StatTile label="Pts Earned by Backers" value={fantasyPointsFor} sub={`${successfulPicks}× correct (3 pts) + ${failedPicks}× consolation (1 pt)`} icon="⭐" />
        <StatTile label="Top Believers" value={topCount > 0 ? `${topLoyal.map(l => l.team.icon).join('')} ${topCount}×` : '—'} sub={topCount > 0 ? topLoyal.map(l => l.team.name).join(', ') : 'No team backed them'} icon="💚" />
      </div>

      {/* Match-by-match analysis */}
      {pickAnalyses.length > 0 ? (
        <>
          <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 24, color: '#0F5132', margin: '8px 0 16px 4px' }}>
            🎬 Match-by-Match Pick Analysis
          </h3>
          {pickAnalyses.map((pa, i) => (
            <MatchPickAnalysis key={i} analysis={pa} playerName={playerName} onSelectPlayer={onSelectPlayer} />
          ))}
        </>
      ) : (
        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, textAlign: 'center', border: '2px solid #FEF3C7' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎱</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1F2937' }}>{playerName} did not appear in any tournament rounds.</div>
        </div>
      )}
    </div>
  );
}

function PathStep({ label, status }) {
  const styles = {
    won:  { bg: 'rgba(255,255,255,0.95)', color: '#0F5132', border: '2px solid #FBBF24', icon: '✓' },
    lost: { bg: 'rgba(220, 38, 38, 0.85)', color: '#FFFFFF', border: '2px solid rgba(255,255,255,0.4)', icon: '✗' },
    live: { bg: '#FBBF24', color: '#0F5132', border: '2px solid #FFFFFF', icon: '●' },
    na:   { bg: 'rgba(0,0,0,0.18)', color: 'rgba(255,255,255,0.55)', border: '2px solid rgba(255,255,255,0.2)', icon: '—' },
  };
  const s = styles[status];
  return (
    <div style={{
      background: s.bg, color: s.color, border: s.border,
      borderRadius: 10, padding: '8px 14px', fontWeight: 800,
      display: 'flex', alignItems: 'center', gap: 6,
      minWidth: 64, justifyContent: 'center',
      fontSize: 14, letterSpacing: '0.5px',
    }}>
      <span>{label}</span>
      <span>{s.icon}</span>
    </div>
  );
}

function PathArrow() {
  return <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 18, fontWeight: 700 }}>→</span>;
}

function StatTile({ label, value, sub, icon }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 100%)',
      borderRadius: 14, padding: 18,
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      border: '2px solid #FEF3C7',
    }}>
      <div style={{ fontSize: 28, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 11, letterSpacing: '1.5px', color: '#6B7280', fontWeight: 700, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Roboto Slab', serif", color: '#0F5132', marginTop: 4, lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 13, color: '#6B7280', marginTop: 6, lineHeight: 1.35 }}>{sub}</div>}
    </div>
  );
}

function MatchPickAnalysis({ analysis, playerName, onSelectPlayer }) {
  const { roundFull, bestOf, match, opponent, won, finished, teamsBackedThis, teamsBackedOpponent } = analysis;

  const isWinner = won === true;
  const outcomeColor = !finished ? '#B45309' : isWinner ? '#15803D' : '#B91C1C';
  const outcomeBg = !finished ? '#FEF3C7' : isWinner ? '#DCFCE7' : '#FEE2E2';
  const outcomeText = !finished ? 'NOT FINISHED' : isWinner ? `WON ${match.score}` : `LOST ${match.score}`;

  const ptsForPicker = !finished ? null : isWinner ? 3 : 1;
  const ptsForOpponentPicker = !finished ? null : isWinner ? 1 : 3;

  return (
    <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, marginBottom: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '2px solid #FEF3C7' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 250 }}>
          <div style={{ fontSize: 12, letterSpacing: '2px', color: '#0F5132', fontWeight: 800 }}>{roundFull.toUpperCase()}</div>
          <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 24, color: '#1F2937', margin: '4px 0', lineHeight: 1.2 }}>
            {playerName} <span style={{ color: '#9CA3AF', fontWeight: 400 }}>vs</span>{' '}
            <button onClick={() => onSelectPlayer(opponent)} style={{
              background: 'none', border: 'none', color: '#0F5132', textDecoration: 'underline',
              fontFamily: "'Roboto Slab', serif", fontSize: 24, fontWeight: 800,
              cursor: 'pointer', padding: 0,
            }}>{opponent}</button>
          </h3>
          <div style={{ fontSize: 13, color: '#6B7280', fontStyle: 'italic' }}>{bestOf}</div>
        </div>
        <div style={{
          background: outcomeBg, color: outcomeColor,
          padding: '10px 16px', borderRadius: 12,
          fontWeight: 900, fontSize: 14, letterSpacing: '1px',
          border: `2px solid ${outcomeColor}33`,
        }}>{outcomeText}</div>
      </div>

      <div style={{ marginBottom: 14, fontSize: 16, color: '#374151', fontWeight: 600, padding: '12px 14px', background: '#FFFBEB', borderRadius: 10, border: '1px solid #FEF3C7' }}>
        <strong style={{ fontSize: 20, color: '#0F5132' }}>{teamsBackedThis.length} of 8</strong> teams backed {playerName.split(' ').slice(-1)[0]} · <strong style={{ fontSize: 20, color: '#92400E' }}>{teamsBackedOpponent.length} of 8</strong> backed {opponent.split(' ').slice(-1)[0]}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        <div style={{
          background: 'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%)',
          borderRadius: 12, padding: 16, border: '2px solid #BBF7D0',
        }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '1.5px', color: '#166534', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
            <span>BACKED {playerName.toUpperCase()}</span>
            {finished && <span style={{ background: ptsForPicker === 3 ? '#16A34A' : '#92400E', color: '#FFF', padding: '2px 8px', borderRadius: 6, fontSize: 11 }}>+{ptsForPicker} pt{ptsForPicker > 1 ? 's' : ''} each</span>}
          </div>
          {teamsBackedThis.length === 0 && <div style={{ fontSize: 14, color: '#9CA3AF', fontStyle: 'italic', padding: '8px 0' }}>No teams backed {playerName}.</div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {teamsBackedThis.map(t => (
              <TeamChip key={t.name} team={t} ptsEarned={ptsForPicker} />
            ))}
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFFFF 100%)',
          borderRadius: 12, padding: 16, border: '2px solid #FDE68A',
        }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '1.5px', color: '#92400E', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
            <span>BACKED {opponent.toUpperCase()}</span>
            {finished && <span style={{ background: ptsForOpponentPicker === 3 ? '#16A34A' : '#92400E', color: '#FFF', padding: '2px 8px', borderRadius: 6, fontSize: 11 }}>+{ptsForOpponentPicker} pt{ptsForOpponentPicker > 1 ? 's' : ''} each</span>}
          </div>
          {teamsBackedOpponent.length === 0 && <div style={{ fontSize: 14, color: '#9CA3AF', fontStyle: 'italic', padding: '8px 0' }}>No teams backed {opponent}.</div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {teamsBackedOpponent.map(t => (
              <TeamChip key={t.name} team={t} ptsEarned={ptsForOpponentPicker} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamChip({ team, ptsEarned }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: 8, padding: '8px 12px',
      display: 'flex', alignItems: 'center', gap: 10,
      border: `2px solid ${team.accent}66`,
      boxShadow: `0 2px 6px ${team.accent}20`,
    }}>
      <div style={{ fontSize: 22 }}>{team.icon}</div>
      <div style={{ flex: 1, fontWeight: 700, color: '#1F2937', fontSize: 14 }}>{team.name}</div>
      {ptsEarned !== null && (
        <div style={{
          background: ptsEarned === 3 ? '#16A34A' : '#92400E',
          color: '#FFFFFF', padding: '3px 10px', borderRadius: 6,
          fontSize: 12, fontWeight: 800,
        }}>+{ptsEarned}</div>
      )}
    </div>
  );
}

// ============================================================================
// ANALYTICS TAB
// ============================================================================

function AnalyticsTab({ teams }) {
  const r1Data = teams.map(t => ({
    team: t.name.length > 12 ? t.name.split(' ').map(w => w[0]).join('') : t.name,
    fullName: t.name,
    R1: t.scores.r1,
    R2: t.scores.r2,
    QF: t.scores.qf,
    SF: t.scores.sf,
    Final: t.scores.f,
    Total: t.scores.total,
  }));

  const accuracyData = teams.map(t => {
    const r1Hits = t.scores.r1Details.filter(d => d.correct).length;
    const r2Hits = t.scores.r2Details.filter(d => d.correct).length;
    const qfHits = t.scores.qfDetails.filter(d => d.correct).length;
    const sfHits = t.scores.sfDetails.filter(d => d.correct).length;
    const fHits = t.scores.fDetails.filter(d => d.correct).length;
    return {
      team: t.name.length > 12 ? t.name.split(' ').map(w => w[0]).join('') : t.name,
      'R1': Math.round((r1Hits / 16) * 100),
      'R2': Math.round((r2Hits / 8) * 100),
      'QF': Math.round((qfHits / 4) * 100),
      'SF': Math.round((sfHits / 2) * 100),
      'F': Math.round((fHits / 1) * 100),
    };
  });

  // Final pick distribution
  const finalPickCount = {};
  teams.forEach(t => { if (t.final) finalPickCount[t.final] = (finalPickCount[t.final] || 0) + 1; });
  const finalPickData = Object.entries(finalPickCount).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

  // Per-round agreement data: how many of 8 teams picked the actual winner of each match
  const buildAgreementData = (matches, pickKey) => matches.map((m, i) => {
    const matchLabel = `${m.p1.split(' ').slice(-1)[0]} v ${m.p2.split(' ').slice(-1)[0]}`;
    if (m.winner) {
      const correct = teams.filter(t => {
        const pick = pickKey === 'final' ? t.final : (t[pickKey] ? t[pickKey][i] : null);
        return pick === m.winner;
      }).length;
      return { match: matchLabel, correct, wrong: 8 - correct, pending: 0, finished: true };
    } else {
      // For unfinished matches: show pick split between p1 and p2
      const p1Backers = teams.filter(t => {
        const pick = pickKey === 'final' ? t.final : (t[pickKey] ? t[pickKey][i] : null);
        return pick === m.p1;
      }).length;
      const p2Backers = teams.filter(t => {
        const pick = pickKey === 'final' ? t.final : (t[pickKey] ? t[pickKey][i] : null);
        return pick === m.p2;
      }).length;
      return { match: matchLabel, p1Name: m.p1.split(' ').slice(-1)[0], p2Name: m.p2.split(' ').slice(-1)[0], p1Backers, p2Backers, pending: 8, finished: false };
    }
  });
  const r1Universal = buildAgreementData(ROUND1_MATCHES, 'r1');
  const r2Universal = buildAgreementData(ROUND2_MATCHES, 'r2');
  const qfUniversal = buildAgreementData(QF_MATCHES, 'qf');
  const sfUniversal = buildAgreementData(SF_MATCHES, 'sf');
  const finalUniversal = buildAgreementData(FINAL_MATCH, 'final');

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <ChartCard title="Points Breakdown by Round" subtitle="How each team has scored across all 5 rounds — tournament complete">
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={r1Data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
            <XAxis dataKey="team" tick={{ fontSize: 13, fontWeight: 600, fill: '#1F2937' }} />
            <YAxis tick={{ fontSize: 13, fill: '#1F2937' }} />
            <Tooltip contentStyle={{ background: '#FFFBEB', border: '2px solid #FBBF24', borderRadius: 8, fontSize: 14 }} />
            <Legend wrapperStyle={{ fontSize: 14, fontWeight: 600 }} />
            <Bar dataKey="R1" stackId="a" fill="#0F5132" name="Round 1" />
            <Bar dataKey="R2" stackId="a" fill="#DC2626" name="Round 2" />
            <Bar dataKey="QF" stackId="a" fill="#FBBF24" name="Quarter-Finals" />
            <Bar dataKey="SF" stackId="a" fill="#7C3AED" name="Semi-Finals" />
            <Bar dataKey="Final" stackId="a" fill="#9F1239" name="Final" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 24 }}>
        <ChartCard title="Pick Accuracy %" subtitle="What share of picks each team got right (R1 → Final)">
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={accuracyData} layout="vertical" margin={{ top: 10, right: 30, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: '#1F2937' }} unit="%" />
              <YAxis dataKey="team" type="category" tick={{ fontSize: 12, fontWeight: 600, fill: '#1F2937' }} width={60} />
              <Tooltip contentStyle={{ background: '#FFFBEB', border: '2px solid #FBBF24', borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 13, fontWeight: 600 }} />
              <Bar dataKey="R1" fill="#16A34A" radius={[0, 4, 4, 0]} />
              <Bar dataKey="R2" fill="#F59E0B" radius={[0, 4, 4, 0]} />
              <Bar dataKey="QF" fill="#0EA5E9" radius={[0, 4, 4, 0]} />
              <Bar dataKey="SF" fill="#7C3AED" radius={[0, 4, 4, 0]} />
              <Bar dataKey="F" fill="#9F1239" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="The Final — Pick Distribution" subtitle="🏆 Wu Yize won 18-17. The 6 teams who picked Wu earned +3 each.">
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={finalPickData} margin={{ top: 10, right: 20, bottom: 60, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
              <XAxis dataKey="name" tick={{ fontSize: 13, fontWeight: 700, fill: '#1F2937' }} interval={0} height={50} />
              <YAxis tick={{ fontSize: 12, fill: '#1F2937' }} domain={[0, 8]} />
              <Tooltip contentStyle={{ background: '#FFFBEB', border: '2px solid #FBBF24', borderRadius: 8 }} formatter={(v) => [`${v} of 8 teams`, 'Picked']} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Teams who picked" label={{ position: 'top', fontSize: 16, fontWeight: 800, fill: '#1F2937' }}>
                {finalPickData.map((d, i) => (
                  <Cell key={i} fill={d.name === 'Wu Yize' ? '#16A34A' : '#9CA3AF'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ marginTop: 12, padding: '10px 14px', background: '#DCFCE7', borderRadius: 8, border: '1px dashed #16A34A', fontSize: 13, color: '#166534', lineHeight: 1.55 }}>
            ✅ <strong>Correct (Wu Yize):</strong> Invincibles, Hopeless, BBU, The Untouchables, Selbies, One Four Sevens (+3 each) · ❌ <strong>Wrong (Murphy):</strong> Uncredibles, Clueless (+1 each)
          </div>
        </ChartCard>
      </div>

      <LeagueAgreementChart
        rounds={[
          { id: 'r1', label: 'Round 1', subtitle: 'Last 32 — Best of 19', data: r1Universal },
          { id: 'r2', label: 'Round 2', subtitle: 'Last 16 — Best of 25', data: r2Universal },
          { id: 'qf', label: 'Quarter-Finals', subtitle: 'Last 8 — Best of 25', data: qfUniversal },
          { id: 'sf', label: 'Semi-Finals', subtitle: 'Last 4 — Best of 33', data: sfUniversal },
          { id: 'final', label: 'Final', subtitle: 'Murphy v Wu — Best of 35', data: finalUniversal },
        ]}
      />

      {/* Key insights cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        <InsightCard
          icon={Trophy}
          title="The Final Pick Was Right"
          body={`Wu Yize won 18-17 in a final-frame thriller. The ${finalPickData[0].name === 'Wu Yize' ? finalPickData[0].count : (finalPickData[1] && finalPickData[1].name === 'Wu Yize' ? finalPickData[1].count : 0)} teams who backed him got +3. The 2 who backed Murphy got +1.`}
          bg="#9F1239"
        />
        <InsightCard
          icon={Crown}
          title="Best Round 1"
          body={`${[...teams].sort((a,b) => b.scores.r1 - a.scores.r1)[0].name} dominated R1 with ${[...teams].sort((a,b) => b.scores.r1 - a.scores.r1)[0].scores.r1} points`}
          bg="#0F5132"
        />
        <InsightCard
          icon={Zap}
          title="League Champion"
          body={`${teams[0].name} won the fantasy league with ${teams[0].scores.total} points${teams[1] && teams[1].scores.total === teams[0].scores.total ? ' (tied with ' + teams[1].name + ')' : ', ' + (teams[0].scores.total - teams[1].scores.total) + ' clear of ' + teams[1].name}`}
          bg="#7C3AED"
        />
      </div>
    </div>
  );
}

function LeagueAgreementChart({ rounds }) {
  const [active, setActive] = useState('r1');
  const round = rounds.find(r => r.id === active) || rounds[0];
  const isFinishedRound = round.data.every(d => d.finished);
  const isPendingRound = round.data.every(d => !d.finished);

  return (
    <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '2px solid #FEF3C7' }}>
      <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 22, color: '#0F5132', margin: '0 0 4px 0' }}>
        {round.label} — Where the league agreed and where it didn't
      </h3>
      <div style={{ color: '#6B7280', fontSize: 14, marginBottom: 16 }}>
        {isPendingRound
          ? `${round.subtitle} · Out of 8 teams, how the picks split between the two players in each match`
          : `${round.subtitle} · Out of 8 teams, how many picked the actual winner of each match`}
      </div>

      {/* Round selector buttons */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {rounds.map(r => {
          const isActive = r.id === active;
          return (
            <button
              key={r.id}
              onClick={() => setActive(r.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: isActive ? '2px solid #0F5132' : '2px solid #E5E7EB',
                background: isActive ? '#0F5132' : '#FFFFFF',
                color: isActive ? '#FBBF24' : '#374151',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'inherit',
                letterSpacing: '0.5px',
                transition: 'all 0.15s',
              }}
            >
              {r.label}
            </button>
          );
        })}
      </div>

      <ResponsiveContainer width="100%" height={Math.max(280, round.data.length * 30 + 120)}>
        <BarChart data={round.data} margin={{ top: 10, right: 20, bottom: 80, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
          <XAxis
            dataKey="match"
            tick={{ fontSize: 11, fontWeight: 600, fill: '#1F2937', angle: -45, textAnchor: 'end' }}
            interval={0}
            height={90}
          />
          <YAxis tick={{ fontSize: 12, fill: '#1F2937' }} domain={[0, 8]} />
          <Tooltip contentStyle={{ background: '#FFFBEB', border: '2px solid #FBBF24', borderRadius: 8 }} />
          <Legend wrapperStyle={{ fontSize: 13, fontWeight: 600 }} />
          {isPendingRound && <Bar dataKey="p1Backers" stackId="a" fill="#0F5132" name="Backed first player" />}
          {isPendingRound && <Bar dataKey="p2Backers" stackId="a" fill="#B45309" name="Backed second player" />}
          {!isPendingRound && <Bar dataKey="correct" stackId="a" fill="#16A34A" name="Correct picks" />}
          {!isPendingRound && <Bar dataKey="wrong" stackId="a" fill="#DC2626" name="Wrong picks" />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '2px solid #FEF3C7' }}>
      <h3 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 22, color: '#0F5132', margin: '0 0 4px 0' }}>{title}</h3>
      <div style={{ color: '#6B7280', fontSize: 14, marginBottom: 20 }}>{subtitle}</div>
      {children}
    </div>
  );
}

function InsightCard({ icon: Icon, title, body, bg }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${bg} 0%, ${bg}DD 100%)`,
      borderRadius: 16, padding: 24, color: '#FFFFFF',
      boxShadow: `0 8px 24px ${bg}50`,
    }}>
      <Icon size={28} strokeWidth={2.5} />
      <div style={{ fontSize: 13, letterSpacing: '1.5px', fontWeight: 600, opacity: 0.9, marginTop: 12, textTransform: 'uppercase' }}>{title}</div>
      <div style={{ fontSize: 17, fontWeight: 600, marginTop: 8, lineHeight: 1.4 }}>{body}</div>
    </div>
  );
}

// ============================================================================
// SHARED STYLES
// ============================================================================

const th = { padding: '14px 12px', textAlign: 'center', fontSize: 13, fontWeight: 800, letterSpacing: '1px' };
const td = { padding: '12px 8px', borderBottom: '1px solid #F3F4F6', fontSize: 15 };
