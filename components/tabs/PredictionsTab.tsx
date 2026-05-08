'use client';

import { useState } from 'react';
import type { TeamWithScores } from '@/lib/types';
import { tabStyle } from '@/lib/constants';
import PredictionMatrix from '../predictions/PredictionMatrix';
import TeamCardView from '../predictions/TeamCardView';

interface PredictionsTabProps {
  teams: TeamWithScores[];
  selectedTeam: TeamWithScores | null;
  setSelectedTeam: (team: TeamWithScores | null) => void;
}

export default function PredictionsTab({
  teams,
  selectedTeam,
  setSelectedTeam,
}: PredictionsTabProps) {
  const [view, setView] = useState<'matrix' | 'team'>(selectedTeam ? 'team' : 'matrix');

  return (
    <div>
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '2px solid #FEF3C7',
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <button onClick={() => setView('matrix')} style={tabStyle(view === 'matrix')}>
          Comparison Matrix
        </button>
        <button onClick={() => setView('team')} style={tabStyle(view === 'team')}>
          Single Team Card
        </button>
      </div>

      {view === 'matrix' && <PredictionMatrix teams={teams} />}
      {view === 'team' && (
        <TeamCardView
          teams={teams}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
        />
      )}
    </div>
  );
}
