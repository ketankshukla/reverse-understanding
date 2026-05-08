'use client';

import { useState, useMemo } from 'react';
import type { TeamWithScores } from '@/lib/types';
import { PLAYER_INFO } from '@/lib/players';
import { QF_MATCHES, SF_MATCHES, FINAL_MATCH } from '@/lib/matches';
import { tabStyle } from '@/lib/constants';
import PlayerCard, { type PlayerCardData } from '../players/PlayerCard';
import PlayerDetail from '../players/PlayerDetail';

interface PlayersTabProps {
  teams: TeamWithScores[];
}

export default function PlayersTab({ teams }: PlayersTabProps) {
  const [filter, setFilter] = useState<'alive' | 'out' | 'all'>('alive');
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const allPlayers: PlayerCardData[] = useMemo(() => {
    const stillStanding = new Set<string>();
    QF_MATCHES.forEach((m) => {
      if (m.winner) {
        stillStanding.add(m.winner);
      } else {
        stillStanding.add(m.p1);
        stillStanding.add(m.p2);
      }
    });
    SF_MATCHES.forEach((m) => {
      if (m.winner) {
        const loser = m.winner === m.p1 ? m.p2 : m.p1;
        stillStanding.delete(loser);
      }
    });
    FINAL_MATCH.forEach((m) => {
      if (m.winner) {
        const loser = m.winner === m.p1 ? m.p2 : m.p1;
        stillStanding.delete(loser);
      }
    });
    const champion = FINAL_MATCH[0]?.winner;
    return Object.entries(PLAYER_INFO)
      .map(([name, info]) => ({
        name,
        ...info,
        stillIn: stillStanding.has(name),
        isChampion: name === champion,
      }))
      .sort((a, b) => (a.seed || 999) - (b.seed || 999));
  }, []);

  if (selectedPlayer) {
    return (
      <PlayerDetail
        playerName={selectedPlayer}
        teams={teams}
        onBack={() => setSelectedPlayer(null)}
        onSelectPlayer={setSelectedPlayer}
      />
    );
  }

  const filtered =
    filter === 'all'
      ? allPlayers
      : filter === 'alive'
      ? allPlayers.filter((p) => p.stillIn)
      : allPlayers.filter((p) => !p.stillIn);

  const finalPicksByPlayer: Record<string, number> = {};
  teams.forEach((t) => {
    if (t.final) {
      finalPicksByPlayer[t.final] = (finalPicksByPlayer[t.final] || 0) + 1;
    }
  });

  return (
    <div>
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '2px solid #FEF3C7',
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <button onClick={() => setFilter('alive')} style={tabStyle(filter === 'alive')}>
          🟢 Still In ({allPlayers.filter((p) => p.stillIn).length})
        </button>
        <button onClick={() => setFilter('out')} style={tabStyle(filter === 'out')}>
          ❌ Eliminated ({allPlayers.filter((p) => !p.stillIn).length})
        </button>
        <button onClick={() => setFilter('all')} style={tabStyle(filter === 'all')}>
          👥 All Players (32)
        </button>
      </div>

      <div
        style={{
          background: 'linear-gradient(135deg, #FEF9E7 0%, #FFFBEB 100%)',
          borderRadius: 12,
          padding: '14px 18px',
          marginBottom: 24,
          border: '2px dashed #F59E0B',
          fontSize: 15,
          color: '#92400E',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 22 }}>👆</span>
        Click any player card to see which teams backed them, full match history, and fantasy
        stats.
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        {filtered.map((p) => (
          <PlayerCard
            key={p.name}
            player={p}
            onClick={() => setSelectedPlayer(p.name)}
            finalPicksCount={finalPicksByPlayer[p.name]}
          />
        ))}
      </div>
    </div>
  );
}
