import CourseToolsNav from '@/components/site/CourseToolsNav';
import StudyTracker from '@/components/study/StudyTracker';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Tracker · Reverse Understanding',
  description: 'Track your progress through both courses with local-only storage.',
};

export default function StudyPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <CourseToolsNav active="study" />
      <StudyTracker />
    </main>
  );
}
