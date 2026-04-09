import { useEffect, useMemo, useState } from 'react'

import type { QuizCatalogItem, QuizQuestion } from '../store/useSkillGaugeStore'

type QuizScreenProps = {
  subject: QuizCatalogItem | null
  question: QuizQuestion
  questions: QuizQuestion[]
  answers: Record<string, number | null>
  currentQuestionIndex: number
  questionDuration: number
  timeRemaining: number
  onChooseAnswer: (index: number) => void
}

export function QuizScreen({
  subject,
  question,
  questions,
  answers,
  currentQuestionIndex,
  questionDuration,
  timeRemaining,
  onChooseAnswer,
}: QuizScreenProps) {
  const [pendingIndex, setPendingIndex] = useState<number | null>(null)

  const totalQuestions = questions.length
  const attemptedCount = Object.keys(answers).length
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = String(timeRemaining % 60).padStart(2, '0')
  const isCriticalTime = timeRemaining <= 10
  const completedPercent = useMemo(() => {
    return totalQuestions ? (attemptedCount / totalQuestions) * 100 : 0
  }, [attemptedCount, totalQuestions])

  useEffect(() => {
    setPendingIndex(null)
  }, [question.id])

  function handleNext() {
    if (pendingIndex === null) {
      return
    }

    onChooseAnswer(pendingIndex)
  }

  return (
    <section className="flex flex-1 justify-center pb-6">
      <div className="w-full max-w-5xl">
        <div className="overflow-hidden rounded-[1.85rem] border border-slate-200/80 bg-white/90 shadow-[0_30px_90px_-48px_rgba(15,23,42,0.38)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_30px_90px_-48px_rgba(2,6,23,0.92)]">
          <div className="bg-[linear-gradient(180deg,#626973,#575d66)] px-6 py-6 text-center text-white dark:bg-[linear-gradient(180deg,#3b4653,#2e3642)] sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-200/80">
              Assessment in progress
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {subject?.name ?? 'Selected subject'} Assessment
            </h1>
          </div>

          <div className="border-b border-slate-200/80 bg-white/90 px-6 py-8 dark:border-white/10 dark:bg-slate-900/70 sm:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
              <div
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  isCriticalTime
                    ? 'bg-rose-500/12 text-rose-700 dark:bg-rose-400/12 dark:text-rose-200'
                    : 'bg-slate-100 text-slate-600 dark:bg-white/8 dark:text-slate-200'
                }`}
              >
                {minutes}:{seconds}
              </div>
            </div>

            <p className="mt-5 text-lg leading-9 text-slate-800 dark:text-slate-100 sm:text-[1.45rem]">
              {question.prompt}
            </p>
          </div>

          <div className="px-6 py-6 dark:bg-slate-950/20 sm:px-10 sm:py-8">
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isPendingSelection = pendingIndex === index

                return (
                  <button
                    key={`${question.id}-${index}`}
                    type="button"
                    onClick={() => setPendingIndex(index)}
                    disabled={pendingIndex !== null}
                    className={`flex w-full items-center gap-4 rounded-[1.2rem] border px-5 py-4 text-left transition ${
                      isPendingSelection
                        ? 'border-sky-500 bg-sky-50 shadow-lg shadow-sky-100/70 dark:border-sky-300 dark:bg-sky-400/10 dark:shadow-sky-950/40'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10'
                    } disabled:cursor-wait`}
                  >
                    <span
                      className={`inline-flex h-6 w-6 shrink-0 rounded-full border-2 transition ${
                        isPendingSelection
                          ? 'border-sky-500 bg-sky-500 ring-4 ring-sky-100 dark:border-sky-300 dark:bg-sky-300 dark:ring-sky-400/15'
                          : 'border-slate-300 bg-transparent dark:border-slate-500'
                      }`}
                    />
                    <span className="text-lg text-slate-800 dark:text-slate-100">
                      {option}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="border-t border-slate-200/80 bg-slate-50/90 px-6 py-5 dark:border-white/10 dark:bg-slate-900/80 sm:px-10">
            <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-slate-500 transition-all duration-300 dark:bg-sky-400"
                style={{ width: `${completedPercent}%` }}
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
                <span>
                  Q{currentQuestionIndex + 1}/{totalQuestions}
                </span>
                <span>{minutes}:{seconds}</span>
                <span>{questionDuration}s each</span>
                <span>
                  {attemptedCount}/{totalQuestions} completed
                </span>
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={pendingIndex === null}
                className="rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300 dark:disabled:bg-white/10 dark:disabled:text-slate-500"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
