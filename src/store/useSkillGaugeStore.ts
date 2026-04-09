import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'dark' | 'light'

type SkillOption = {
  id: string
  label: string
  description: string
  score: number
}

type SkillQuestion = {
  id: string
  category: string
  prompt: string
  context: string
  options: SkillOption[]
}

type SkillGaugeState = {
  theme: Theme
  questions: SkillQuestion[]
  currentQuestionIndex: number
  answers: Record<string, string>
  isComplete: boolean
  toggleTheme: () => void
  selectAnswer: (questionId: string, optionId: string) => void
  nextQuestion: () => void
  previousQuestion: () => void
  submitQuiz: () => void
  reviewAnswers: () => void
  restartQuiz: () => void
}

const questions: SkillQuestion[] = [
  {
    id: 'feature-planning',
    category: 'Planning',
    prompt: 'When you pick up a new feature, what does your first pass usually look like?',
    context:
      'This gives the test a quick read on how structured your delivery habits are before implementation begins.',
    options: [
      {
        id: 'feature-planning-1',
        label: 'I jump straight into code and adjust later',
        description: 'Fast to start, but usually reactive once edge cases show up.',
        score: 1,
      },
      {
        id: 'feature-planning-2',
        label: 'I skim the requirements and rough out a starting point',
        description: 'Good enough for smaller tasks, but not always systematic.',
        score: 2,
      },
      {
        id: 'feature-planning-3',
        label: 'I define the flow, constraints, and likely UI states first',
        description: 'Balanced and reliable for most real product work.',
        score: 3,
      },
      {
        id: 'feature-planning-4',
        label: 'I map risks, dependencies, states, and success metrics before building',
        description: 'A mature workflow that reduces surprises later in delivery.',
        score: 4,
      },
    ],
  },
  {
    id: 'debugging',
    category: 'Debugging',
    prompt: 'A bug only appears in production. What is your most natural next step?',
    context:
      'The goal here is to understand how methodically you isolate issues under uncertainty.',
    options: [
      {
        id: 'debugging-1',
        label: 'Try a few quick fixes and redeploy',
        description: 'Can work occasionally, but usually increases guesswork.',
        score: 1,
      },
      {
        id: 'debugging-2',
        label: 'Reproduce it locally and inspect the obvious code path',
        description: 'A reasonable start, especially if the issue is straightforward.',
        score: 2,
      },
      {
        id: 'debugging-3',
        label: 'Compare environments, logs, inputs, and recent changes',
        description: 'A structured way to narrow the source quickly.',
        score: 3,
      },
      {
        id: 'debugging-4',
        label: 'Instrument the issue, isolate the trigger, and validate a fix safely',
        description: 'High-signal debugging that scales well across complex systems.',
        score: 4,
      },
    ],
  },
  {
    id: 'responsive-design',
    category: 'Responsive Design',
    prompt: 'How do you usually approach responsive UI work?',
    context:
      'This checks how confidently you design for real screens instead of a single static layout.',
    options: [
      {
        id: 'responsive-design-1',
        label: 'I mostly design for desktop and patch mobile later',
        description: 'Common early habit, but it tends to create brittle layouts.',
        score: 1,
      },
      {
        id: 'responsive-design-2',
        label: 'I test a few breakpoints and adjust what looks off',
        description: 'Helpful, though still reactive to issues after they appear.',
        score: 2,
      },
      {
        id: 'responsive-design-3',
        label: 'I think in layout systems, spacing rules, and content priorities',
        description: 'A solid product-facing approach to responsive design.',
        score: 3,
      },
      {
        id: 'responsive-design-4',
        label: 'I build mobile-first and tune behavior across density, motion, and hierarchy',
        description: 'A refined approach that usually produces resilient interfaces.',
        score: 4,
      },
    ],
  },
  {
    id: 'testing',
    category: 'Quality',
    prompt: 'Which option best describes your testing habit?',
    context:
      'The app uses this to estimate how intentionally you protect the work you ship.',
    options: [
      {
        id: 'testing-1',
        label: 'I mostly test manually in the browser',
        description: 'Useful for quick checks, but easy to miss regressions.',
        score: 1,
      },
      {
        id: 'testing-2',
        label: 'I add tests when a task feels risky',
        description: 'Better than none, though still inconsistent over time.',
        score: 2,
      },
      {
        id: 'testing-3',
        label: 'I regularly cover key logic and important user flows',
        description: 'A dependable habit for ongoing product work.',
        score: 3,
      },
      {
        id: 'testing-4',
        label: 'I design tests as part of implementation and use them to guide confidence',
        description: 'A strong engineering pattern that supports safe iteration.',
        score: 4,
      },
    ],
  },
  {
    id: 'state-management',
    category: 'State Management',
    prompt: 'How comfortable are you managing shared app state in React?',
    context:
      'This question aligns well with the sort of architecture choices this project will make next.',
    options: [
      {
        id: 'state-management-1',
        label: 'I usually keep everything local and hope it stays manageable',
        description: 'Fine at very small scale, but difficult to grow cleanly.',
        score: 1,
      },
      {
        id: 'state-management-2',
        label: 'I can wire shared state, though the structure can get messy',
        description: 'You are moving past basics, but there is room to tighten patterns.',
        score: 2,
      },
      {
        id: 'state-management-3',
        label: 'I choose state boundaries intentionally and keep actions predictable',
        description: 'A reliable level for most production React apps.',
        score: 3,
      },
      {
        id: 'state-management-4',
        label: 'I model shared state around flows, derived data, and long-term maintainability',
        description: 'Strong architecture thinking with room for complex interfaces.',
        score: 4,
      },
    ],
  },
]

export const useSkillGaugeStore = create<SkillGaugeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      questions,
      currentQuestionIndex: 0,
      answers: {},
      isComplete: false,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),
      selectAnswer: (questionId, optionId) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: optionId,
          },
        })),
      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.min(
            state.currentQuestionIndex + 1,
            state.questions.length - 1,
          ),
        })),
      previousQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
        })),
      submitQuiz: () => {
        const { answers, questions: allQuestions } = get()

        if (Object.keys(answers).length === allQuestions.length) {
          set({ isComplete: true })
        }
      },
      reviewAnswers: () =>
        set({
          isComplete: false,
          currentQuestionIndex: 0,
        }),
      restartQuiz: () =>
        set({
          currentQuestionIndex: 0,
          answers: {},
          isComplete: false,
        }),
    }),
    {
      name: 'skill-gauge-theme',
      partialize: (state) => ({
        theme: state.theme,
      }),
    },
  ),
)
