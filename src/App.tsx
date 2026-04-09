import {
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useRef,
} from 'react'

import { AppHeader } from './components/AppHeader'
import { BackgroundGlow } from './components/BackgroundGlow'
import { CatalogErrorScreen, CatalogLoadingScreen } from './components/StateScreens'
import { QuizScreen } from './components/QuizScreen'
import { ResultsScreen } from './components/ResultsScreen'
import { SubjectSelectionScreen } from './components/SubjectSelectionScreen'
import { useSkillGaugeStore } from './store/useSkillGaugeStore'

function App() {
  const theme = useSkillGaugeStore((state) => state.theme)
  const status = useSkillGaugeStore((state) => state.status)
  const subjects = useSkillGaugeStore((state) => state.subjects)
  const subjectQuery = useSkillGaugeStore((state) => state.subjectQuery)
  const selectedSubject = useSkillGaugeStore((state) => state.selectedSubject)
  const questions = useSkillGaugeStore((state) => state.questions)
  const answers = useSkillGaugeStore((state) => state.answers)
  const currentQuestionIndex = useSkillGaugeStore(
    (state) => state.currentQuestionIndex,
  )
  const questionDuration = useSkillGaugeStore((state) => state.questionDuration)
  const timeRemaining = useSkillGaugeStore((state) => state.timeRemaining)
  const score = useSkillGaugeStore((state) => state.score)
  const errorMessage = useSkillGaugeStore((state) => state.errorMessage)
  const toggleTheme = useSkillGaugeStore((state) => state.toggleTheme)
  const setSubjectQuery = useSkillGaugeStore((state) => state.setSubjectQuery)
  const fetchSubjects = useSkillGaugeStore((state) => state.fetchSubjects)
  const startQuiz = useSkillGaugeStore((state) => state.startQuiz)
  const answerCurrentQuestion = useSkillGaugeStore(
    (state) => state.answerCurrentQuestion,
  )
  const resetToSubjectSelection = useSkillGaugeStore(
    (state) => state.resetToSubjectSelection,
  )

  const hasFetchedRef = useRef(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    if (hasFetchedRef.current) return
    hasFetchedRef.current = true
    void fetchSubjects()
  }, [fetchSubjects])

  const runTimerStep = useEffectEvent(() => {
    const state = useSkillGaugeStore.getState()
    if (state.status !== 'quiz') return
    if (state.timeRemaining <= 1) {
      state.handleTimeout()
      return
    }
    state.tickTimer()
  })

  useEffect(() => {
    if (status !== 'quiz') return
    const id = window.setInterval(() => runTimerStep(), 1000)
    return () => window.clearInterval(id)
  }, [status, currentQuestionIndex, runTimerStep])

  const deferredQuery = useDeferredValue(subjectQuery.trim().toLowerCase())
  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(deferredQuery),
  )
  const currentQuestion = questions[currentQuestionIndex]
  const attemptedCount = Object.keys(answers).length
  const unansweredCount = Object.values(answers).filter(
    (answer) => answer === null,
  ).length
  const incorrectCount = attemptedCount - unansweredCount - score
  const scorePercent = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef4ff] text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      <BackgroundGlow />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-8 sm:px-6 lg:px-10">
        <AppHeader
          theme={theme}
          selectedSubject={selectedSubject}
          onToggleTheme={toggleTheme}
        />
        {status === 'loading-subjects' ? <CatalogLoadingScreen /> : null}
        {status === 'error' ? (
          <CatalogErrorScreen
            errorMessage={errorMessage}
            onRetry={() => void fetchSubjects()}
          />
        ) : null}
        {(status === 'ready' || status === 'loading-quiz') && (
          <SubjectSelectionScreen
            status={status}
            subjects={filteredSubjects}
            totalSubjects={subjects.length}
            searchQuery={subjectQuery}
            selectedSubject={selectedSubject}
            errorMessage={errorMessage}
            onSearchChange={(value) =>
              startTransition(() => {
                setSubjectQuery(value)
              })
            }
            onStartQuiz={(subject) => void startQuiz(subject)}
          />
        )}
        {status === 'quiz' && currentQuestion ? (
          <QuizScreen
            subject={selectedSubject}
            question={currentQuestion}
            questions={questions}
            answers={answers}
            currentQuestionIndex={currentQuestionIndex}
            questionDuration={questionDuration}
            timeRemaining={timeRemaining}
            onChooseAnswer={answerCurrentQuestion}
          />
        ) : null}
        {status === 'results' ? (
          <ResultsScreen
            subject={selectedSubject}
            questions={questions}
            answers={answers}
            score={score}
            attemptedCount={attemptedCount}
            unansweredCount={unansweredCount}
            incorrectCount={incorrectCount}
            scorePercent={scorePercent}
            onRetake={() => {
              if (selectedSubject) {
                void startQuiz(selectedSubject)
              }
            }}
            onTakeAnother={resetToSubjectSelection}
          />
        ) : null}
      </div>
    </main>
  )
}

export default App
