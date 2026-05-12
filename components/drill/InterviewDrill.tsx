'use client';

import { useEffect, useMemo, useState } from 'react';

export interface Card {
  id: string;
  front: string;
  back: string;
  tags: string[];
  source: string;
  deck: string;
}

export interface FlashcardsPayload {
  generatedAt: string;
  decks: Record<string, Card[]>;
}

interface Props {
  payload: FlashcardsPayload;
}

const STORAGE_KEY = 'rev-understanding:drill:v1';

interface DrillStats {
  sessionsCompleted: number;
  totalReviewed: number;
  totalGotIt: number;
  byDay: Record<string, number>; // YYYY-MM-DD -> reviewed count
  reviewQueue: string[];         // card ids the user marked "review again"
}

const EMPTY_STATS: DrillStats = {
  sessionsCompleted: 0,
  totalReviewed: 0,
  totalGotIt: 0,
  byDay: {},
  reviewQueue: [],
};

function loadStats(): DrillStats {
  if (typeof window === 'undefined') return EMPTY_STATS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATS;
    return { ...EMPTY_STATS, ...JSON.parse(raw) };
  } catch {
    return EMPTY_STATS;
  }
}

function saveStats(stats: DrillStats) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

type Mode = 'idle' | 'drilling' | 'summary';

export default function InterviewDrill({ payload }: Props) {
  const [hydrated, setHydrated] = useState(false);
  const [stats, setStats] = useState<DrillStats>(EMPTY_STATS);

  // Setup options
  const [deckFilter, setDeckFilter] = useState<'all' | 'react-snooker' | 'ai-interview'>('all');
  const [tagFilter, setTagFilter] = useState<'all' | 'concept' | 'soundbite' | 'self-quiz'>('all');
  const [size, setSize] = useState<number>(10);
  const [reviewOnly, setReviewOnly] = useState(false);

  // Session state
  const [mode, setMode] = useState<Mode>('idle');
  const [queue, setQueue] = useState<Card[]>([]);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [sessionGotIt, setSessionGotIt] = useState(0);
  const [sessionReview, setSessionReview] = useState(0);

  useEffect(() => {
    setStats(loadStats());
    setHydrated(true);
  }, []);

  const allCards = useMemo<Card[]>(() => {
    return Object.values(payload.decks).flat();
  }, [payload]);

  const reviewQueueIds = useMemo(() => new Set(stats.reviewQueue), [stats.reviewQueue]);

  const filteredPool = useMemo<Card[]>(() => {
    return allCards.filter((c) => {
      if (deckFilter !== 'all' && c.deck !== deckFilter) return false;
      if (tagFilter !== 'all' && !c.tags.includes(tagFilter)) return false;
      if (reviewOnly && !reviewQueueIds.has(c.id)) return false;
      return true;
    });
  }, [allCards, deckFilter, tagFilter, reviewOnly, reviewQueueIds]);

  function startDrill() {
    const n = Math.min(size, filteredPool.length);
    const picked = shuffle(filteredPool).slice(0, n);
    setQueue(picked);
    setIdx(0);
    setRevealed(false);
    setSessionGotIt(0);
    setSessionReview(0);
    setMode('drilling');
  }

  function recordAnswer(gotIt: boolean) {
    const card = queue[idx];
    setStats((prev) => {
      const today = new Date().toISOString().slice(0, 10);
      const queueSet = new Set(prev.reviewQueue);
      if (gotIt) queueSet.delete(card.id);
      else queueSet.add(card.id);
      const next: DrillStats = {
        ...prev,
        totalReviewed: prev.totalReviewed + 1,
        totalGotIt: prev.totalGotIt + (gotIt ? 1 : 0),
        byDay: { ...prev.byDay, [today]: (prev.byDay[today] || 0) + 1 },
        reviewQueue: Array.from(queueSet),
      };
      saveStats(next);
      return next;
    });
    if (gotIt) setSessionGotIt((n) => n + 1);
    else setSessionReview((n) => n + 1);

    if (idx + 1 >= queue.length) {
      setStats((prev) => {
        const next = { ...prev, sessionsCompleted: prev.sessionsCompleted + 1 };
        saveStats(next);
        return next;
      });
      setMode('summary');
    } else {
      setIdx(idx + 1);
      setRevealed(false);
    }
  }

  function endEarly() {
    setMode('summary');
  }

  function backToSetup() {
    setMode('idle');
    setQueue([]);
    setIdx(0);
    setRevealed(false);
  }

  function clearReviewQueue() {
    if (!window.confirm('Clear the review queue? This drops all cards currently marked for review.')) return;
    setStats((prev) => {
      const next = { ...prev, reviewQueue: [] };
      saveStats(next);
      return next;
    });
  }

  const today = new Date().toISOString().slice(0, 10);
  const reviewedToday = stats.byDay[today] || 0;
  const lifetimePct = stats.totalReviewed === 0 ? 0 : Math.round((stats.totalGotIt / stats.totalReviewed) * 100);

  // --- Render -------------------------------------------------
  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: '32px 24px 96px' }}>
      <header style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontFamily: "'Roboto Slab', serif",
            fontSize: 40,
            margin: 0,
            color: '#7C3AED',
            letterSpacing: -0.5,
          }}
        >
          🎯 Interview Drill
        </h1>
        <p style={{ color: '#475569', marginTop: 8, fontSize: 17 }}>
          Random flashcards from both courses. Reveal the answer, self-rate, repeat. Progress
          stored locally.
        </p>
      </header>

      {hydrated && (
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <StatTile label="Reviewed today" value={reviewedToday} />
          <StatTile label="Lifetime reviewed" value={stats.totalReviewed} />
          <StatTile label="Lifetime got-it" value={`${lifetimePct}%`} />
          <StatTile label="In review queue" value={stats.reviewQueue.length} />
        </section>
      )}

      {mode === 'idle' && (
        <SetupPanel
          deckFilter={deckFilter}
          setDeckFilter={setDeckFilter}
          tagFilter={tagFilter}
          setTagFilter={setTagFilter}
          size={size}
          setSize={setSize}
          reviewOnly={reviewOnly}
          setReviewOnly={setReviewOnly}
          poolSize={filteredPool.length}
          onStart={startDrill}
          reviewQueueSize={stats.reviewQueue.length}
          onClearQueue={clearReviewQueue}
        />
      )}

      {mode === 'drilling' && queue.length > 0 && (
        <DrillCard
          card={queue[idx]}
          index={idx}
          total={queue.length}
          revealed={revealed}
          onReveal={() => setRevealed(true)}
          onGotIt={() => recordAnswer(true)}
          onReview={() => recordAnswer(false)}
          onEnd={endEarly}
        />
      )}

      {mode === 'summary' && (
        <SummaryPanel
          gotIt={sessionGotIt}
          review={sessionReview}
          total={sessionGotIt + sessionReview}
          onBack={backToSetup}
        />
      )}
    </div>
  );
}

// --- Subcomponents ----------------------------------------------------------

function StatTile({ label, value }: { label: string; value: number | string }) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: 12,
        padding: '14px 16px',
      }}
    >
      <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color: '#111827', marginTop: 4 }}>{value}</div>
    </div>
  );
}

interface SetupProps {
  deckFilter: 'all' | 'react-snooker' | 'ai-interview';
  setDeckFilter: (v: 'all' | 'react-snooker' | 'ai-interview') => void;
  tagFilter: 'all' | 'concept' | 'soundbite' | 'self-quiz';
  setTagFilter: (v: 'all' | 'concept' | 'soundbite' | 'self-quiz') => void;
  size: number;
  setSize: (n: number) => void;
  reviewOnly: boolean;
  setReviewOnly: (b: boolean) => void;
  poolSize: number;
  onStart: () => void;
  reviewQueueSize: number;
  onClearQueue: () => void;
}

function SetupPanel(p: SetupProps) {
  return (
    <section
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: 14,
        padding: '24px 26px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      <h2 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 22, margin: 0, color: '#111827' }}>
        Configure your drill
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20 }}>
        <FieldGroup label="Deck">
          <RadioRow
            options={[
              { value: 'all', label: 'Both courses' },
              { value: 'react-snooker', label: 'React only' },
              { value: 'ai-interview', label: 'AI interview only' },
            ]}
            value={p.deckFilter}
            onChange={(v) => p.setDeckFilter(v as SetupProps['deckFilter'])}
          />
        </FieldGroup>
        <FieldGroup label="Card type">
          <RadioRow
            options={[
              { value: 'all', label: 'Any' },
              { value: 'concept', label: 'Concept' },
              { value: 'soundbite', label: 'Soundbite' },
              { value: 'self-quiz', label: 'Self-quiz' },
            ]}
            value={p.tagFilter}
            onChange={(v) => p.setTagFilter(v as SetupProps['tagFilter'])}
          />
        </FieldGroup>
        <FieldGroup label="Cards per session">
          <RadioRow
            options={[
              { value: '5', label: '5' },
              { value: '10', label: '10' },
              { value: '20', label: '20' },
              { value: '50', label: '50' },
            ]}
            value={String(p.size)}
            onChange={(v) => p.setSize(Number(v))}
          />
        </FieldGroup>
        <FieldGroup label="Review queue">
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={p.reviewOnly}
              onChange={(e) => p.setReviewOnly(e.target.checked)}
              style={{ width: 18, height: 18, accentColor: '#7C3AED' }}
              disabled={p.reviewQueueSize === 0}
            />
            <span style={{ fontSize: 14, color: p.reviewQueueSize === 0 ? '#9CA3AF' : '#111827' }}>
              Only drill cards I marked for review ({p.reviewQueueSize})
            </span>
          </label>
          {p.reviewQueueSize > 0 && (
            <button
              onClick={p.onClearQueue}
              style={{
                marginTop: 8,
                background: 'transparent',
                color: '#B91C1C',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'inherit',
              }}
            >
              Clear review queue
            </button>
          )}
        </FieldGroup>
      </div>

      <div
        style={{
          marginTop: 26,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={p.onStart}
          disabled={p.poolSize === 0}
          style={{
            padding: '14px 28px',
            background:
              p.poolSize === 0 ? '#D1D5DB' : 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
            color: '#FFFFFF',
            fontSize: 17,
            fontWeight: 700,
            borderRadius: 12,
            border: 'none',
            cursor: p.poolSize === 0 ? 'not-allowed' : 'pointer',
            boxShadow: p.poolSize === 0 ? 'none' : '0 4px 14px rgba(124,58,237,0.35)',
            fontFamily: 'inherit',
          }}
        >
          ▶ Start drill
        </button>
        <div style={{ color: '#6B7280', fontSize: 14 }}>
          {p.poolSize === 0
            ? 'No cards match these filters.'
            : `Pool: ${p.poolSize} cards available with current filters.`}
        </div>
      </div>
    </section>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 1.5,
          color: '#6B7280',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function RadioRow({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            style={{
              padding: '8px 14px',
              borderRadius: 10,
              border: active ? '2px solid #7C3AED' : '1px solid #D1D5DB',
              background: active ? '#EDE9FE' : '#FFFFFF',
              color: active ? '#5B21B6' : '#374151',
              fontWeight: active ? 700 : 500,
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

interface DrillCardProps {
  card: Card;
  index: number;
  total: number;
  revealed: boolean;
  onReveal: () => void;
  onGotIt: () => void;
  onReview: () => void;
  onEnd: () => void;
}

function DrillCard(p: DrillCardProps) {
  const pct = Math.round(((p.index + (p.revealed ? 0.5 : 0)) / p.total) * 100);
  return (
    <section>
      <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14, color: '#6B7280', fontWeight: 600 }}>
          Card {p.index + 1} of {p.total}
        </span>
        <div
          style={{
            flex: 1,
            height: 8,
            background: '#E5E7EB',
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #7C3AED, #FBBF24)',
              transition: 'width 0.25s',
            }}
          />
        </div>
        <button
          onClick={p.onEnd}
          style={{
            border: '1px solid #D1D5DB',
            background: '#FFFFFF',
            color: '#374151',
            padding: '6px 12px',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'inherit',
          }}
        >
          End drill
        </button>
      </div>

      <article
        style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: 16,
          padding: '32px 30px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
          minHeight: 260,
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 2,
            color: '#7C3AED',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          {p.card.deck === 'react-snooker' ? 'React Course' : 'AI Interview'} ·{' '}
          {p.card.tags.join(' · ')}
        </div>

        <h2
          style={{
            fontFamily: "'Roboto Slab', serif",
            fontSize: 24,
            margin: 0,
            color: '#111827',
            lineHeight: 1.35,
          }}
        >
          {p.card.front}
        </h2>

        {p.revealed && (
          <div
            style={{
              marginTop: 22,
              padding: '20px 22px',
              background: '#F0FDF4',
              border: '1px solid #86EFAC',
              borderRadius: 12,
              fontSize: 17,
              color: '#14532D',
              lineHeight: 1.55,
              whiteSpace: 'pre-wrap',
            }}
          >
            {p.card.back}
          </div>
        )}

        <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 18 }}>Source: {p.card.source}</div>
      </article>

      <div
        style={{
          marginTop: 18,
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        {!p.revealed ? (
          <button
            onClick={p.onReveal}
            style={{
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
              color: '#FFFFFF',
              fontSize: 17,
              fontWeight: 700,
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(124,58,237,0.35)',
              fontFamily: 'inherit',
              flex: 1,
            }}
          >
            Reveal answer
          </button>
        ) : (
          <>
            <button
              onClick={p.onReview}
              style={{
                flex: 1,
                padding: '14px 24px',
                background: '#FEF2F2',
                color: '#B91C1C',
                fontSize: 16,
                fontWeight: 700,
                borderRadius: 12,
                border: '2px solid #FCA5A5',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              ↻ Review again
            </button>
            <button
              onClick={p.onGotIt}
              style={{
                flex: 1,
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 700,
                borderRadius: 12,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(22,163,74,0.3)',
                fontFamily: 'inherit',
              }}
            >
              ✓ Got it
            </button>
          </>
        )}
      </div>
    </section>
  );
}

function SummaryPanel({
  gotIt,
  review,
  total,
  onBack,
}: {
  gotIt: number;
  review: number;
  total: number;
  onBack: () => void;
}) {
  const pct = total === 0 ? 0 : Math.round((gotIt / total) * 100);
  return (
    <section
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: 16,
        padding: '32px 30px',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 30, margin: 0, color: '#7C3AED' }}>
        Drill complete
      </h2>
      <div style={{ fontSize: 56, fontWeight: 900, color: '#0F5132', marginTop: 16 }}>{pct}%</div>
      <div style={{ color: '#6B7280', marginBottom: 22, fontSize: 16 }}>
        {gotIt} got it · {review} marked for review · {total} cards
      </div>
      <button
        onClick={onBack}
        style={{
          padding: '12px 26px',
          background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: 700,
          borderRadius: 12,
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Back to setup
      </button>
    </section>
  );
}
