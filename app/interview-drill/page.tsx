import CourseToolsNav from '@/components/site/CourseToolsNav';
import InterviewDrill, { type FlashcardsPayload } from '@/components/drill/InterviewDrill';
import flashcards from '@/flashcards/flashcards.json';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interview Drill · Reverse Understanding',
  description: 'Random flashcards from both courses. Reveal, self-rate, repeat.',
};

export default function InterviewDrillPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <CourseToolsNav active="drill" />
      <InterviewDrill payload={flashcards as FlashcardsPayload} />
    </main>
  );
}
