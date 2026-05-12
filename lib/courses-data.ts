/**
 * Static outline of every chapter and lesson in both courses.
 *
 * Used by the /study progress tracker. Each lesson is identified by its
 * markdown path (relative to repo root) so localStorage keys remain stable
 * even if titles are reworded later.
 */

export interface Lesson {
  id: string;          // markdown path, e.g. "course/chapter-01-foundations/01-the-problem.md"
  number: string;      // "01"
  title: string;       // human-friendly title
}

export interface Chapter {
  id: string;          // e.g. "chapter-01-foundations"
  number: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  key: 'react' | 'ai';
  slug: string;        // matches audio-courses/ folder
  title: string;
  subtitle: string;
  accent: string;      // tailwind/css hex used in the header
  chapters: Chapter[];
}

export const REACT_COURSE: Course = {
  key: 'react',
  slug: 'react-snooker-course',
  title: 'React + Snooker Fantasy League',
  subtitle: 'Build the standings app from zero, react idioms first.',
  accent: '#0F5132',
  chapters: [
    {
      id: 'chapter-01-foundations',
      number: 1,
      title: 'Foundations',
      lessons: [
        { id: 'course/chapter-01-foundations/01-the-problem.md', number: '01', title: 'The Problem' },
        { id: 'course/chapter-01-foundations/02-data-modeling.md', number: '02', title: 'Data Modeling' },
        { id: 'course/chapter-01-foundations/03-pure-functions-and-scoring.md', number: '03', title: 'Pure Functions and Scoring' },
      ],
    },
    {
      id: 'chapter-02-project-setup',
      number: 2,
      title: 'Project Setup',
      lessons: [
        { id: 'course/chapter-02-project-setup/01-why-nextjs-typescript.md', number: '01', title: 'Why Next.js + TypeScript' },
        { id: 'course/chapter-02-project-setup/02-scaffolding-the-project.md', number: '02', title: 'Scaffolding the Project' },
        { id: 'course/chapter-02-project-setup/03-creating-data-files.md', number: '03', title: 'Creating Data Files' },
      ],
    },
    {
      id: 'chapter-03-first-component',
      number: 3,
      title: 'First Component',
      lessons: [
        { id: 'course/chapter-03-first-component/01-anatomy-of-a-component.md', number: '01', title: 'Anatomy of a Component' },
        { id: 'course/chapter-03-first-component/02-rendering-the-standings.md', number: '02', title: 'Rendering the Standings' },
        { id: 'course/chapter-03-first-component/03-progressive-enhancement.md', number: '03', title: 'Progressive Enhancement' },
      ],
    },
    {
      id: 'chapter-04-state-and-hooks',
      number: 4,
      title: 'State and Hooks',
      lessons: [
        { id: 'course/chapter-04-state-and-hooks/01-useState-mental-model.md', number: '01', title: 'useState Mental Model' },
        { id: 'course/chapter-04-state-and-hooks/02-the-orchestrator-pattern.md', number: '02', title: 'The Orchestrator Pattern' },
        { id: 'course/chapter-04-state-and-hooks/03-useMemo-and-derived-data.md', number: '03', title: 'useMemo and Derived Data' },
      ],
    },
    {
      id: 'chapter-05-composition',
      number: 5,
      title: 'Composition',
      lessons: [
        { id: 'course/chapter-05-composition/01-when-to-split-components.md', number: '01', title: 'When to Split Components' },
        { id: 'course/chapter-05-composition/02-prop-drilling-vs-context.md', number: '02', title: 'Prop Drilling vs Context' },
        { id: 'course/chapter-05-composition/03-building-player-detail.md', number: '03', title: 'Building Player Detail' },
      ],
    },
    {
      id: 'chapter-06-data-visualization',
      number: 6,
      title: 'Data Visualization',
      lessons: [
        { id: 'course/chapter-06-data-visualization/01-recharts-fundamentals.md', number: '01', title: 'Recharts Fundamentals' },
        { id: 'course/chapter-06-data-visualization/02-reshaping-data.md', number: '02', title: 'Reshaping Data' },
        { id: 'course/chapter-06-data-visualization/03-pivots-and-internal-state.md', number: '03', title: 'Pivots and Internal State' },
      ],
    },
    {
      id: 'chapter-07-mastery-and-interviews',
      number: 7,
      title: 'Mastery and Interviews',
      lessons: [
        { id: 'course/chapter-07-mastery-and-interviews/01-production-polish.md', number: '01', title: 'Production Polish' },
        { id: 'course/chapter-07-mastery-and-interviews/02-deployment-and-testing.md', number: '02', title: 'Deployment and Testing' },
        { id: 'course/chapter-07-mastery-and-interviews/03-interview-narrative.md', number: '03', title: 'Interview Narrative' },
      ],
    },
  ],
};

export const AI_COURSE: Course = {
  key: 'ai',
  slug: 'ai-interview-course',
  title: 'AI-Assisted Development Interview Prep',
  subtitle: 'Answer the hard questions about Copilot, Cursor, and the role humans still play.',
  accent: '#7C3AED',
  chapters: [
    {
      id: 'chapter-01-foundations',
      number: 1,
      title: 'Foundations',
      lessons: [
        { id: 'ai-interview-course/chapter-01-foundations/01-what-changed.md', number: '01', title: 'What Changed' },
        { id: 'ai-interview-course/chapter-01-foundations/02-the-skill-stack.md', number: '02', title: 'The Skill Stack' },
        { id: 'ai-interview-course/chapter-01-foundations/03-the-mindset-shift.md', number: '03', title: 'The Mindset Shift' },
      ],
    },
    {
      id: 'chapter-02-the-big-question',
      number: 2,
      title: 'The Big Question',
      lessons: [
        { id: 'ai-interview-course/chapter-02-the-big-question/01-the-five-framings.md', number: '01', title: 'The Five Framings' },
        { id: 'ai-interview-course/chapter-02-the-big-question/02-the-seven-pillars.md', number: '02', title: 'The Seven Pillars' },
        { id: 'ai-interview-course/chapter-02-the-big-question/03-real-world-cases.md', number: '03', title: 'Real-World Cases' },
      ],
    },
    {
      id: 'chapter-03-prompt-mastery',
      number: 3,
      title: 'Prompt Mastery',
      lessons: [
        { id: 'ai-interview-course/chapter-03-prompt-mastery/01-anatomy-of-a-prompt.md', number: '01', title: 'Anatomy of a Prompt' },
        { id: 'ai-interview-course/chapter-03-prompt-mastery/02-the-twelve-patterns.md', number: '02', title: 'The Twelve Patterns' },
        { id: 'ai-interview-course/chapter-03-prompt-mastery/03-rejecting-ai-output.md', number: '03', title: 'Rejecting AI Output' },
      ],
    },
    {
      id: 'chapter-04-live-scenarios',
      number: 4,
      title: 'Live Scenarios',
      lessons: [
        { id: 'ai-interview-course/chapter-04-live-scenarios/01-live-pair-programming.md', number: '01', title: 'Live Pair Programming' },
        { id: 'ai-interview-course/chapter-04-live-scenarios/02-debugging-ai-bugs.md', number: '02', title: 'Debugging AI Bugs' },
        { id: 'ai-interview-course/chapter-04-live-scenarios/03-code-review-of-ai.md', number: '03', title: 'Code Review of AI' },
      ],
    },
    {
      id: 'chapter-05-system-design',
      number: 5,
      title: 'System Design',
      lessons: [
        { id: 'ai-interview-course/chapter-05-system-design/01-what-humans-still-own.md', number: '01', title: 'What Humans Still Own' },
        { id: 'ai-interview-course/chapter-05-system-design/02-design-with-ai-walkthrough.md', number: '02', title: 'Design with AI Walkthrough' },
        { id: 'ai-interview-course/chapter-05-system-design/03-trade-off-conversations.md', number: '03', title: 'Trade-off Conversations' },
      ],
    },
    {
      id: 'chapter-06-behavioral-and-closing',
      number: 6,
      title: 'Behavioral and Closing',
      lessons: [
        { id: 'ai-interview-course/chapter-06-behavioral-and-closing/01-risks-and-accountability.md', number: '01', title: 'Risks and Accountability' },
        { id: 'ai-interview-course/chapter-06-behavioral-and-closing/02-team-dynamics.md', number: '02', title: 'Team Dynamics' },
        { id: 'ai-interview-course/chapter-06-behavioral-and-closing/03-portfolio-narrative.md', number: '03', title: 'Portfolio Narrative' },
      ],
    },
  ],
};

export const COURSES: Course[] = [REACT_COURSE, AI_COURSE];

export function totalLessons(course: Course): number {
  return course.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
}
