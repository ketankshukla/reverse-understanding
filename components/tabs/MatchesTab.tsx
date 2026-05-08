'use client';

import { useState } from 'react';
import {
  ROUND1_MATCHES,
  ROUND2_MATCHES,
  QF_MATCHES,
  SF_MATCHES,
  FINAL_MATCH,
} from '@/lib/matches';
import RoundButton from '../matches/RoundButton';
import MatchesList from '../matches/MatchesList';

type Round = 'r1' | 'r2' | 'qf' | 'sf' | 'f';

export default function MatchesTab() {
  const [round, setRound] = useState<Round>('r1');

  return (
    <div>
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '2px solid #FEF3C7',
        }}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <RoundButton
            active={round === 'r1'}
            onClick={() => setRound('r1')}
            label="Round 1 — Last 32"
            status="FINISHED"
            color="#16A34A"
          />
          <RoundButton
            active={round === 'r2'}
            onClick={() => setRound('r2')}
            label="Round 2 — Last 16"
            status="FINISHED"
            color="#16A34A"
          />
          <RoundButton
            active={round === 'qf'}
            onClick={() => setRound('qf')}
            label="Quarter-Finals"
            status="FINISHED"
            color="#16A34A"
          />
          <RoundButton
            active={round === 'sf'}
            onClick={() => setRound('sf')}
            label="Semi-Finals"
            status="FINISHED"
            color="#16A34A"
          />
          <RoundButton
            active={round === 'f'}
            onClick={() => setRound('f')}
            label="Final"
            status="🏆 WU WINS 18-17"
            color="#B91C1C"
          />
        </div>
      </div>

      {round === 'r1' && (
        <MatchesList matches={ROUND1_MATCHES} title="Round 1 — Last 32 (Best of 19)" />
      )}
      {round === 'r2' && (
        <MatchesList matches={ROUND2_MATCHES} title="Round 2 — Last 16 (Best of 25)" />
      )}
      {round === 'qf' && <MatchesList matches={QF_MATCHES} title="Quarter-Finals (Best of 25)" />}
      {round === 'sf' && <MatchesList matches={SF_MATCHES} title="Semi-Finals (Best of 33)" />}
      {round === 'f' && (
        <MatchesList matches={FINAL_MATCH} title="THE FINAL (Best of 35) — May 3–4" />
      )}
    </div>
  );
}
