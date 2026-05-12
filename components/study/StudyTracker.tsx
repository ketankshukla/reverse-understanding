'use client';

import { useEffect, useMemo, useState } from 'react';
import { COURSES, totalLessons, type Course } from '@/lib/courses-data';

const STORAGE_KEY = 'rev-understanding:study-progress:v1';

interface Progress {
  // lessonId -> ISO timestamp completed
  completed: Record<string, string>;
}

function loadProgress(): Progress {
  if (typeof window === 'undefined') return { completed: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completed: {} };
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.completed) return parsed;
  } catch {
    /* corrupt -> start fresh */
  }
  return { completed: {} };
}

function saveProgress(p: Progress) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export default function StudyTracker() {
  const [progress, setProgress] = useState<Progress>({ completed: {} });
  const [hydrated, setHydrated] = useState(false);
  const [activeCourse, setActiveCourse] = useState<'react' | 'ai'>('react');

  useEffect(() => {
    setProgress(loadProgress());
    setHydrated(true);
  }, []);

  const stats = useMemo(() => {
    return COURSES.map((c) => {
      const total = totalLessons(c);
      const done = c.chapters.reduce(
        (acc, ch) => acc + ch.lessons.filter((l) => progress.completed[l.id]).length,
        0
      );
      return { course: c, total, done, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
    });
  }, [progress]);

  function toggleLesson(id: string) {
    setProgress((prev) => {
      const next: Progress = { completed: { ...prev.completed } };
      if (next.completed[id]) {
        delete next.completed[id];
      } else {
        next.completed[id] = new Date().toISOString();
      }
      saveProgress(next);
      return next;
    });
  }

  function resetCourse(course: Course) {
    if (typeof window === 'undefined') return;
    const ok = window.confirm(`Reset progress for "${course.title}"? This cannot be undone.`);
    if (!ok) return;
    setProgress((prev) => {
      const next: Progress = { completed: { ...prev.completed } };
      for (const ch of course.chapters) {
        for (const l of ch.lessons) delete next.completed[l.id];
      }
      saveProgress(next);
      return next;
    });
  }

  const current = COURSES.find((c) => c.key === activeCourse)!;
  const currentStats = stats.find((s) => s.course.key === activeCourse)!;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 96px' }}>
      <header style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontFamily: "'Roboto Slab', serif",
            fontSize: 40,
            margin: 0,
            color: '#0F5132',
            letterSpacing: -0.5,
          }}
        >
          📚 Study Tracker
        </h1>
        <p style={{ color: '#475569', marginTop: 8, fontSize: 17 }}>
          Tick off lessons as you complete them. Progress is saved locally in this browser
          — no account needed.
        </p>
      </header>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 28,
        }}
      >
        {stats.map((s) => (
          <button
            key={s.course.key}
            onClick={() => setActiveCourse(s.course.key)}
            style={{
              textAlign: 'left',
              background: activeCourse === s.course.key ? '#FFFBEB' : '#FFFFFF',
              border:
                activeCourse === s.course.key
                  ? `3px solid ${s.course.accent}`
                  : '3px solid #E5E7EB',
              borderRadius: 14,
              padding: '20px 22px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              fontFamily: 'inherit',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: s.course.accent, textTransform: 'uppercase' }}>
              {s.course.key === 'react' ? 'Course 1' : 'Course 2'}
            </div>
            <h2
              style={{
                fontFamily: "'Roboto Slab', serif",
                fontSize: 22,
                margin: '4px 0 4px',
                color: '#111827',
              }}
            >
              {s.course.title}
            </h2>
            <div style={{ color: '#6B7280', fontSize: 14, marginBottom: 10 }}>{s.course.subtitle}</div>
            <div
              style={{
                height: 10,
                background: '#E5E7EB',
                borderRadius: 999,
                overflow: 'hidden',
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: `${s.pct}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${s.course.accent}, #FBBF24)`,
                  transition: 'width 0.3s',
                }}
              />
            </div>
            <div style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>
              {hydrated ? `${s.done} / ${s.total} lessons (${s.pct}%)` : `0 / ${s.total} lessons`}
            </div>
          </button>
        ))}
      </section>

      <section>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
          <h2
            style={{
              fontFamily: "'Roboto Slab', serif",
              fontSize: 28,
              margin: 0,
              color: current.accent,
            }}
          >
            {current.title}
          </h2>
          <button
            onClick={() => resetCourse(current)}
            style={{
              marginLeft: 'auto',
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid #FCA5A5',
              background: '#FEF2F2',
              color: '#B91C1C',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Reset this course
          </button>
        </div>
        <div style={{ color: '#6B7280', marginBottom: 18, fontSize: 14 }}>
          {hydrated
            ? `${currentStats.done} of ${currentStats.total} lessons completed`
            : 'Loading…'}
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {current.chapters.map((ch) => {
            const chDone = ch.lessons.filter((l) => progress.completed[l.id]).length;
            const chTotal = ch.lessons.length;
            return (
              <div
                key={ch.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: 12,
                  padding: '18px 20px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
                  <h3 style={{ margin: 0, fontFamily: "'Roboto Slab', serif", fontSize: 20, color: '#111827' }}>
                    Chapter {ch.number}: {ch.title}
                  </h3>
                  <span style={{ marginLeft: 'auto', color: '#6B7280', fontSize: 13, fontWeight: 600 }}>
                    {hydrated ? `${chDone} / ${chTotal}` : `0 / ${chTotal}`}
                  </span>
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 6 }}>
                  {ch.lessons.map((l) => {
                    const done = Boolean(progress.completed[l.id]);
                    return (
                      <li key={l.id}>
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '10px 12px',
                            background: done ? '#F0FDF4' : '#F9FAFB',
                            borderRadius: 8,
                            cursor: 'pointer',
                            border: done ? '1px solid #86EFAC' : '1px solid #E5E7EB',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={hydrated && done}
                            onChange={() => toggleLesson(l.id)}
                            style={{ width: 18, height: 18, cursor: 'pointer', accentColor: current.accent }}
                          />
                          <span style={{ fontWeight: 600, color: '#6B7280', fontSize: 13, minWidth: 28 }}>
                            {l.number}
                          </span>
                          <span
                            style={{
                              fontSize: 15,
                              color: done ? '#166534' : '#111827',
                              textDecoration: done ? 'line-through' : 'none',
                              flex: 1,
                            }}
                          >
                            {l.title}
                          </span>
                          {done && (
                            <span style={{ fontSize: 12, color: '#16A34A', fontWeight: 600 }}>
                              ✓ done
                            </span>
                          )}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
