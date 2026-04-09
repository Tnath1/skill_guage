import { useEffect } from 'react'

import { useSkillGaugeStore } from './store/useSkillGaugeStore'

function App() {
  const theme = useSkillGaugeStore((state) => state.theme)
  const questions = useSkillGaugeStore((state) => state.questions)
  const currentQuestionIndex = useSkillGaugeStore(
    (state) => state.currentQuestionIndex,
  )
  const answers = useSkillGaugeStore((state) => state.answers)
  const isComplete = useSkillGaugeStore((state) => state.isComplete)
  const toggleTheme = useSkillGaugeStore((state) => state.toggleTheme)
  const selectAnswer = useSkillGaugeStore((state) => state.selectAnswer)
  const nextQuestion = useSkillGaugeStore((state) => state.nextQuestion)
  const previousQuestion = useSkillGaugeStore((state) => state.previousQuestion)
  const submitQuiz = useSkillGaugeStore((state) => state.submitQuiz)
  const reviewAnswers = useSkillGaugeStore((state) => state.reviewAnswers)
  const restartQuiz = useSkillGaugeStore((state) => state.restartQuiz)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const totalQuestions = questions.length
  const answeredCount = Object.keys(answers).length
  const completionPercent = Math.round((answeredCount / totalQuestions) * 100)
  const currentQuestion = questions[currentQuestionIndex]
  const selectedOptionId = currentQuestion ? answers[currentQuestion.id] : undefined
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1
  const score = questions.reduce((total, question) => {
    const selected = question.options.find(
      (option) => option.id === answers[question.id],
    )

    return total + (selected?.score ?? 0)
  }, 0)
  const maxScore = questions.reduce((total, question) => {
    return total + Math.max(...question.options.map((option) => option.score))
  }, 0)
  const scorePercent = Math.round((score / maxScore) * 100)
  const result = getSkillResult(scorePercent)

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-100 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10rem] top-[-8rem] h-72 w-72 rounded-full bg-sky-300/35 blur-3xl dark:bg-sky-500/20" />
        <div className="absolute bottom-[-12rem] right-[-6rem] h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-500/15" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(241,245,249,0.92))] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.82),rgba(2,6,23,0.96))]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-10">
        <header className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-300/70 bg-white/80 text-slate-700 shadow-lg shadow-slate-200/50 transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:shadow-slate-950/40 dark:hover:bg-white/10"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <div className="flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 shadow-lg shadow-slate-200/50 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-slate-950/40">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white dark:bg-sky-400 dark:text-slate-950">
              <LogoMark />
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-600 dark:text-sky-300">
                Skill Gauge
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Quick capability check
              </p>
            </div>
          </div>
        </header>

        <section className="grid flex-1 gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-6 shadow-[0_25px_80px_-32px_rgba(15,23,42,0.28)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_30px_80px_-30px_rgba(2,6,23,0.85)] sm:p-8">
            {!isComplete && currentQuestion ? (
              <div className="flex h-full flex-col">
                <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-3">
                    <span className="inline-flex rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-200">
                      {currentQuestion.category}
                    </span>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Question {currentQuestionIndex + 1} of {totalQuestions}
                      </p>
                      <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                        {currentQuestion.prompt}
                      </h1>
                    </div>
                    <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                      {currentQuestion.context}
                    </p>
                  </div>

                  <div className="min-w-[12rem] rounded-3xl border border-slate-200/70 bg-slate-100/80 p-4 dark:border-white/10 dark:bg-slate-950/50">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                      Progress
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
                      {completionPercent}%
                    </p>
                    <div className="mt-4 h-2 rounded-full bg-slate-200 dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-slate-950 transition-all duration-300 dark:bg-sky-400"
                        style={{ width: `${completionPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedOptionId === option.id

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => selectAnswer(currentQuestion.id, option.id)}
                        className={`group flex w-full items-start gap-4 rounded-[1.5rem] border p-5 text-left transition duration-200 ${
                          isSelected
                            ? 'border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/20 dark:border-sky-300 dark:bg-sky-300/[0.14] dark:text-white dark:shadow-sky-950/30'
                            : 'border-slate-200/80 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10'
                        }`}
                      >
                        <span
                          className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                            isSelected
                              ? 'border-white/20 bg-white/10 text-white dark:border-sky-200/30 dark:bg-sky-200/10'
                              : 'border-slate-200 bg-slate-100 text-slate-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300'
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span className="block">
                          <span className="block text-lg font-semibold">
                            {option.label}
                          </span>
                          <span
                            className={`mt-2 block text-sm leading-6 ${
                              isSelected
                                ? 'text-slate-200 dark:text-sky-50/90'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {option.description}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 pt-6 dark:border-white/10">
                  <button
                    type="button"
                    onClick={previousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="rounded-full border border-slate-300/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                  >
                    Back
                  </button>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={restartQuiz}
                      className="rounded-full border border-slate-300/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                    >
                      Reset test
                    </button>
                    <button
                      type="button"
                      onClick={isLastQuestion ? submitQuiz : nextQuestion}
                      disabled={!selectedOptionId}
                      className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
                    >
                      {isLastQuestion ? 'See result' : 'Next question'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="space-y-5">
                  <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200">
                    Result
                  </span>
                  <div className="space-y-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Skills test complete
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                      {result.label}
                    </h1>
                    <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                      {result.summary}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.5rem] border border-slate-200/70 bg-slate-100/80 p-5 dark:border-white/10 dark:bg-slate-950/50">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Score
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
                      {scorePercent}%
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-slate-200/70 bg-slate-100/80 p-5 dark:border-white/10 dark:bg-slate-950/50">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Questions answered
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
                      {answeredCount}/{totalQuestions}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-slate-200/70 bg-slate-100/80 p-5 dark:border-white/10 dark:bg-slate-950/50">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Recommendation
                    </p>
                    <p className="mt-2 text-base font-medium leading-7 text-slate-950 dark:text-white">
                      {result.recommendation}
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-slate-200/70 bg-slate-100/70 p-6 dark:border-white/10 dark:bg-white/5">
                  <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
                    Answer review
                  </h2>
                  <div className="mt-5 grid gap-4">
                    {questions.map((question) => {
                      const selected = question.options.find(
                        (option) => option.id === answers[question.id],
                      )

                      return (
                        <div
                          key={question.id}
                          className="rounded-[1.25rem] border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-950/50"
                        >
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {question.category}
                          </p>
                          <p className="mt-2 font-medium text-slate-950 dark:text-white">
                            {question.prompt}
                          </p>
                          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                            {selected?.label}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={reviewAnswers}
                    className="rounded-full border border-slate-300/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                  >
                    Review answers
                  </button>
                  <button
                    type="button"
                    onClick={restartQuiz}
                    className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
                  >
                    Retake test
                  </button>
                </div>
              </div>
            )}
          </div>

          <aside className="grid gap-6">
            <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-6 shadow-[0_25px_80px_-32px_rgba(15,23,42,0.28)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_30px_80px_-30px_rgba(2,6,23,0.85)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                About this test
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                A quick read on product and frontend readiness
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                This flow checks planning, debugging, responsive thinking,
                testing habits, and shared state confidence. It is lightweight on
                purpose so you can adapt it into a real assessment quickly.
              </p>
            </section>

            <section className="rounded-[2rem] border border-slate-200/70 bg-white/80 p-6 shadow-[0_25px_80px_-32px_rgba(15,23,42,0.28)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_30px_80px_-30px_rgba(2,6,23,0.85)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                    Session
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
                    {answeredCount}/{totalQuestions}
                  </p>
                </div>
                <div className="rounded-full border border-slate-200/80 bg-slate-100/90 px-4 py-2 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-200">
                  {isComplete ? 'Completed' : 'In progress'}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {questions.map((question, index) => {
                  const isAnswered = Boolean(answers[question.id])
                  const isCurrent = index === currentQuestionIndex && !isComplete

                  return (
                    <div
                      key={question.id}
                      className={`rounded-[1.25rem] border p-4 transition ${
                        isCurrent
                          ? 'border-slate-950 bg-slate-950 text-white dark:border-sky-300/30 dark:bg-sky-300/10'
                          : isAnswered
                            ? 'border-emerald-500/20 bg-emerald-500/[0.08] dark:border-emerald-400/[0.15] dark:bg-emerald-400/[0.08]'
                            : 'border-slate-200/70 bg-slate-100/80 dark:border-white/10 dark:bg-slate-950/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p
                            className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                              isCurrent
                                ? 'text-white/70 dark:text-sky-100/70'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {question.category}
                          </p>
                          <p className="mt-2 text-sm font-medium leading-6">
                            {question.prompt}
                          </p>
                        </div>
                        <span
                          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                            isCurrent
                              ? 'bg-white/10 text-white dark:bg-sky-100/10 dark:text-sky-100'
                              : isAnswered
                                ? 'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-200'
                                : 'bg-white text-slate-500 shadow-sm dark:bg-white/5 dark:text-slate-400'
                          }`}
                        >
                          {isAnswered ? 'OK' : index + 1}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  )
}

function getSkillResult(scorePercent: number) {
  if (scorePercent >= 85) {
    return {
      label: 'Advanced operator',
      summary:
        'You are showing a strong mix of product thinking, implementation confidence, and delivery discipline.',
      recommendation:
        'A harder version of this app could branch into timed sections or category-specific scoring.',
    }
  }

  if (scorePercent >= 65) {
    return {
      label: 'Strong working level',
      summary:
        'You have a solid practical base and enough range to move through day-to-day product work with confidence.',
      recommendation:
        'Focus the next iteration on deeper diagnostics, stronger testing coverage, and richer question feedback.',
    }
  }

  if (scorePercent >= 45) {
    return {
      label: 'Growing confidence',
      summary:
        'You have workable instincts in place, with a few areas that would benefit from more repetition and structured practice.',
      recommendation:
        'This is a good place to add learning tips, result explanations, and role-based question packs.',
    }
  }

  return {
    label: 'Foundation stage',
    summary:
      'You are still building consistency across the core skills, which makes this format a helpful way to learn and measure growth over time.',
    recommendation:
      'Consider adding guided explanations after each answer so the app teaches as well as scores.',
  }
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
      <path
        d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
      <path
        d="M20.2 15.1A8.5 8.5 0 1 1 8.9 3.8a7 7 0 1 0 11.3 11.3Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M6 24.5h4V12H6Zm8 0h4V7h-4Zm8 0h4V16h-4Z" />
    </svg>
  )
}

export default App
