'use client';

import { useState, useMemo } from 'react';
import { Trophy, Target, Users, BarChart3, Calendar } from 'lucide-react';
import { TEAMS } from '@/lib/teams';
import { calculateTeamScores } from '@/lib/scoring';
import type { TeamWithScores } from '@/lib/types';
import { BALL_COLORS } from '@/lib/constants';
import StandingsTab from './tabs/StandingsTab';
import MatchesTab from './tabs/MatchesTab';
import PredictionsTab from './tabs/PredictionsTab';
import PlayersTab from './tabs/PlayersTab';
import AnalyticsTab from './tabs/AnalyticsTab';

type TabId = 'standings' | 'matches' | 'predictions' | 'players' | 'analytics';

export default function SnookerFantasyLeague() {
  const [activeTab, setActiveTab] = useState<TabId>('standings');
  const [selectedTeam, setSelectedTeam] = useState<TeamWithScores | null>(null);

  const teamsWithScores = useMemo<TeamWithScores[]>(() => {
    return TEAMS.map((t) => ({ ...t, scores: calculateTeamScores(t) })).sort(
      (a, b) => b.scores.total - a.scores.total
    );
  }, []);

  const tabs: { id: TabId; label: string; icon: typeof Trophy }[] = [
    { id: 'standings', label: 'Standings', icon: Trophy },
    { id: 'matches', label: 'Matches', icon: Calendar },
    { id: 'predictions', label: 'Predictions', icon: Target },
    { id: 'players', label: 'Players', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div
      style={{
        fontFamily: "'Roboto', system-ui, sans-serif",
        background:
          'linear-gradient(135deg, #FFF8E7 0%, #FEF3E2 50%, #FFE8D6 100%)',
        minHeight: '100vh',
        color: '#1F2937',
        fontSize: '17px',
      }}
    >
      <div
        style={{
          background:
            'linear-gradient(135deg, #0F5132 0%, #166534 50%, #15803D 100%)',
          color: '#FEF3C7',
          padding: '40px 32px 56px',
          boxShadow: '0 8px 32px rgba(15, 81, 50, 0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 40,
            display: 'flex',
            gap: 8,
            opacity: 0.4,
          }}
        >
          {BALL_COLORS.map((c, i) => (
            <div
              key={i}
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: c,
                boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.4)',
              }}
            />
          ))}
        </div>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div
            style={{
              fontSize: 14,
              letterSpacing: '4px',
              fontWeight: 500,
              opacity: 0.85,
              marginBottom: 8,
            }}
          >
            🎱 FANTASY LEAGUE • CRUCIBLE 2026
          </div>
          <h1
            style={{
              fontFamily: "'Roboto Slab', serif",
              fontSize: 52,
              fontWeight: 900,
              margin: 0,
              letterSpacing: '-1px',
              color: '#FBBF24',
              textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
            }}
          >
            World Snooker Championship
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              marginTop: 16,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 500 }}>
              50th Edition · The Crucible · Sheffield
            </div>
            <div
              style={{
                padding: '6px 16px',
                background: 'linear-gradient(135deg, #DC2626, #FBBF24)',
                color: '#FFFFFF',
                borderRadius: 20,
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: '1px',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.5)',
              }}
            >
              🏆 WU YIZE — WORLD CHAMPION 2026 (18-17)
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          background: '#FFFFFF',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderBottom: '3px solid #FBBF24',
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'flex',
            overflowX: 'auto',
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '20px 28px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 17,
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  background: active
                    ? 'linear-gradient(180deg, #FFF8E7 0%, #FEF3C7 100%)'
                    : 'transparent',
                  color: active ? '#0F5132' : '#6B7280',
                  borderBottom: active
                    ? '4px solid #DC2626'
                    : '4px solid transparent',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={20} strokeWidth={2.5} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '32px 24px 80px',
        }}
      >
        {activeTab === 'standings' && (
          <StandingsTab
            teams={teamsWithScores}
            onTeamClick={(t) => {
              setSelectedTeam(t);
              setActiveTab('predictions');
            }}
          />
        )}
        {activeTab === 'matches' && <MatchesTab />}
        {activeTab === 'predictions' && (
          <PredictionsTab
            teams={teamsWithScores}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
          />
        )}
        {activeTab === 'players' && <PlayersTab teams={teamsWithScores} />}
        {activeTab === 'analytics' && <AnalyticsTab teams={teamsWithScores} />}
      </div>

      <div
        style={{
          background: '#0F5132',
          color: '#FEF3C7',
          padding: '24px',
          textAlign: 'center',
          fontSize: 14,
        }}
      >
        Fantasy Snooker League · 2026 World Championship · Data verified from SnookerHQ.com
      </div>
    </div>
  );
}
