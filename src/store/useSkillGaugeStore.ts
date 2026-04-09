import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'dark' | 'light'

export type AppStatus =
  | 'loading-subjects'
  | 'ready'
  | 'loading-quiz'
  | 'quiz'
  | 'results'
  | 'error'

export type QuizCatalogItem = {
  name: string
  fileName: string
}

type QuizCatalogResponse = {
  quizzes: QuizCatalogItem[]
}

type RemoteQuizQuestion = {
  question: string
  options: string[]
  _ps: number
}

export type QuizQuestion = {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
}

type StoredAnswer = number | null

type SkillGaugeState = {
  theme: Theme
  status: AppStatus
  subjects: QuizCatalogItem[]
  subjectQuery: string
  selectedSubject: QuizCatalogItem | null
  questions: QuizQuestion[]
  answers: Record<string, StoredAnswer>
  currentQuestionIndex: number
  questionDuration: number
  timeRemaining: number
  score: number
  errorMessage: string | null
  toggleTheme: () => void
  setSubjectQuery: (query: string) => void
  fetchSubjects: () => Promise<void>
  startQuiz: (subject: QuizCatalogItem) => Promise<void>
  answerCurrentQuestion: (selectedIndex: number) => void
  tickTimer: () => void
  handleTimeout: () => void
  resetToSubjectSelection: () => void
}

const QUESTION_COUNT = 10
const QUESTION_DURATION = 60

function getClientEnv() {
  const env = import.meta.env as ImportMetaEnv & {
    BASE_LIST_URL?: string
    BASE_TEST_URL?: string
  }

  return {
    listUrl: env.VITE_BASE_LIST_URL ?? env.BASE_LIST_URL ?? '',
    testBaseUrl: env.VITE_BASE_TEST_URL ?? env.BASE_TEST_URL ?? '',
  }
}

function shuffleArray<T>(items: T[]) {
  const next = [...items]

  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[randomIndex]] = [next[randomIndex], next[index]]
  }

  return next
}

function stripQuestionPrefix(question: string) {
  return question.replace(/^Q\d+\.\s*/i, '').trim()
}

function buildQuizState(
  questions: QuizQuestion[],
  answers: Record<string, StoredAnswer>,
  currentQuestionIndex: number,
  score: number,
  selectedIndex: StoredAnswer,
) {
  const currentQuestion = questions[currentQuestionIndex]

  if (!currentQuestion) {
    return null
  }

  const nextAnswers = {
    ...answers,
    [currentQuestion.id]: selectedIndex,
  }
  const isCorrect = selectedIndex === currentQuestion.correctIndex
  const isLastQuestion = currentQuestionIndex >= questions.length - 1

  return {
    answers: nextAnswers,
    currentQuestionIndex: isLastQuestion
      ? currentQuestionIndex
      : currentQuestionIndex + 1,
    score: score + (isCorrect ? 1 : 0),
    status: isLastQuestion ? ('results' as const) : ('quiz' as const),
    timeRemaining: isLastQuestion ? 0 : QUESTION_DURATION,
  }
}

export const useSkillGaugeStore = create<SkillGaugeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      status: 'loading-subjects',
      subjects: [],
      subjectQuery: '',
      selectedSubject: null,
      questions: [],
      answers: {},
      currentQuestionIndex: 0,
      questionDuration: QUESTION_DURATION,
      timeRemaining: QUESTION_DURATION,
      score: 0,
      errorMessage: null,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),
      setSubjectQuery: (query) => set({ subjectQuery: query }),
      fetchSubjects: async () => {
        const { listUrl } = getClientEnv()

        if (!listUrl) {
          set({
            status: 'error',
            errorMessage:
              'The subject list URL is missing. Add VITE_BASE_LIST_URL to your .env file.',
          })
          return
        }

        set({
          status: 'loading-subjects',
          errorMessage: null,
        })

        try {
          const response = await fetch(listUrl)

          if (!response.ok) {
            throw new Error(`Subject list request failed with ${response.status}`)
          }

          const payload = (await response.json()) as QuizCatalogResponse

          if (!Array.isArray(payload.quizzes) || payload.quizzes.length === 0) {
            throw new Error('No quiz subjects were returned from the API.')
          }

          set({
            status: 'ready',
            subjects: payload.quizzes,
            errorMessage: null,
          })
        } catch {
          set({
            status: 'error',
            errorMessage:
              'I could not load the subject list. Check the URL or your network connection and try again.',
          })
        }
      },
      startQuiz: async (subject) => {
        const { testBaseUrl } = getClientEnv()

        if (!testBaseUrl) {
          set({
            status: 'ready',
            errorMessage:
              'The quiz data URL is missing. Add VITE_BASE_TEST_URL to your .env file.',
          })
          return
        }

        set({
          status: 'loading-quiz',
          selectedSubject: subject,
          questions: [],
          answers: {},
          currentQuestionIndex: 0,
          timeRemaining: QUESTION_DURATION,
          score: 0,
          errorMessage: null,
        })

        try {
          const quizUrl = `${testBaseUrl.replace(/\/+$/, '')}/${subject.fileName}`
          const response = await fetch(quizUrl)

          if (!response.ok) {
            throw new Error(`Quiz request failed with ${response.status}`)
          }

          const payload = (await response.json()) as RemoteQuizQuestion[]

          if (!Array.isArray(payload) || payload.length === 0) {
            throw new Error('No questions were returned for this subject.')
          }

          const randomizedQuestions = shuffleArray(payload)
            .slice(0, Math.min(QUESTION_COUNT, payload.length))
            .map((item, index) => ({
              id: `${subject.fileName}-${index}-${item._ps}`,
              prompt: stripQuestionPrefix(item.question),
              options: item.options,
              correctIndex: item._ps,
            }))

          set({
            status: 'quiz',
            selectedSubject: subject,
            questions: randomizedQuestions,
            answers: {},
            currentQuestionIndex: 0,
            timeRemaining: QUESTION_DURATION,
            score: 0,
            errorMessage: null,
          })
        } catch {
          set({
            status: 'ready',
            selectedSubject: null,
            questions: [],
            answers: {},
            currentQuestionIndex: 0,
            timeRemaining: QUESTION_DURATION,
            score: 0,
            errorMessage:
              'I could not load that quiz yet. Please try again or choose a different subject.',
          })
        }
      },
      answerCurrentQuestion: (selectedIndex) => {
        const state = get()

        if (state.status !== 'quiz') {
          return
        }

        const currentQuestion = state.questions[state.currentQuestionIndex]

        if (
          !currentQuestion ||
          Object.hasOwn(state.answers, currentQuestion.id)
        ) {
          return
        }

        const nextState = buildQuizState(
          state.questions,
          state.answers,
          state.currentQuestionIndex,
          state.score,
          selectedIndex,
        )

        if (nextState) {
          set(nextState)
        }
      },
      tickTimer: () => {
        const state = get()

        if (state.status !== 'quiz' || state.timeRemaining <= 0) {
          return
        }

        set({
          timeRemaining: state.timeRemaining - 1,
        })
      },
      handleTimeout: () => {
        const state = get()

        if (state.status !== 'quiz') {
          return
        }

        const currentQuestion = state.questions[state.currentQuestionIndex]

        if (
          !currentQuestion ||
          Object.hasOwn(state.answers, currentQuestion.id)
        ) {
          return
        }

        const nextState = buildQuizState(
          state.questions,
          state.answers,
          state.currentQuestionIndex,
          state.score,
          null,
        )

        if (nextState) {
          set(nextState)
        }
      },
      resetToSubjectSelection: () =>
        set((state) => ({
          status: state.subjects.length > 0 ? 'ready' : 'loading-subjects',
          subjectQuery: '',
          selectedSubject: null,
          questions: [],
          answers: {},
          currentQuestionIndex: 0,
          timeRemaining: QUESTION_DURATION,
          score: 0,
          errorMessage: null,
        })),
    }),
    {
      name: 'skill-gauge-preferences',
      partialize: (state) => ({
        theme: state.theme,
      }),
    },
  ),
)
