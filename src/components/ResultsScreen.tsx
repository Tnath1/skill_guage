import { useState } from 'react'

import type { QuizCatalogItem, QuizQuestion } from '../store/useSkillGaugeStore'

type ResultsScreenProps = {
  subject: QuizCatalogItem | null
  questions: QuizQuestion[]
  answers: Record<string, number | null>
  score: number
  attemptedCount: number
  unansweredCount: number
  incorrectCount: number
  scorePercent: number
  onRetake: () => void
  onTakeAnother: () => void
}

export function ResultsScreen({
  subject,
  questions,
  answers,
  score,
  attemptedCount,
  unansweredCount,
  incorrectCount,
  scorePercent,
  onRetake,
  onTakeAnother,
}: ResultsScreenProps) {
  const [showAnswers, setShowAnswers] = useState(false)
  const subjectName = subject?.name ?? 'Selected'
  const tone = getResultTone(scorePercent)

  return (
    <section className="flex flex-1 flex-col items-center gap-8 pb-8">
      <div className="w-full max-w-2xl rounded-[1.85rem] border border-slate-200/80 bg-white/92 px-8 py-10 text-center shadow-[0_28px_80px_-42px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-slate-900/78 dark:shadow-[0_28px_80px_-42px_rgba(2,6,23,0.92)] sm:px-12">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-400/12">
          <CompletionIcon />
        </div>

        <p className="mt-8 text-xl leading-9 text-slate-800 dark:text-slate-100">
          You've completed the {subjectName} assessment
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
          You scored: {score}/{questions.length}
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
          {tone}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAnswers((current) => !current)}
            className="min-w-44 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
          >
            {showAnswers ? 'Hide Answers' : 'View Answers'}
          </button>
          <button
            type="button"
            onClick={onRetake}
            className="min-w-44 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
          >
            Retake
          </button>
          <button
            type="button"
            onClick={onTakeAnother}
            className="min-w-44 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
          >
            Take another
          </button>
        </div>
      </div>

      {showAnswers ? (
        <div className="w-full max-w-5xl rounded-[1.85rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_28px_80px_-42px_rgba(15,23,42,0.28)] backdrop-blur dark:border-white/10 dark:bg-slate-900/72 dark:shadow-[0_28px_80px_-42px_rgba(2,6,23,0.92)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                Answer Review
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Review your completed assessment
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
              <span className="rounded-full bg-emerald-500/10 px-3 py-2 text-emerald-700 dark:text-emerald-200">
                Correct: {score}
              </span>
              <span className="rounded-full bg-amber-500/10 px-3 py-2 text-amber-700 dark:text-amber-200">
                Incorrect: {incorrectCount}
              </span>
              <span className="rounded-full bg-slate-200 px-3 py-2 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Unanswered: {unansweredCount}
              </span>
              <span className="rounded-full bg-sky-500/10 px-3 py-2 text-sky-700 dark:text-sky-200">
                Attempted: {attemptedCount}/{questions.length}
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {questions.map((question, index) => {
              const selectedIndex = answers[question.id]
              const selectedAnswer =
                selectedIndex === null || selectedIndex === undefined
                  ? 'No answer selected'
                  : question.options[selectedIndex]
              const correctAnswer = question.options[question.correctIndex]
              const isCorrect = selectedIndex === question.correctIndex

              return (
                <div
                  key={question.id}
                  className="rounded-[1.35rem] border border-slate-200/80 bg-slate-50/85 p-5 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Question {index + 1}
                      </p>
                      <p className="mt-2 text-base font-semibold leading-7 text-slate-950 dark:text-white">
                        {question.prompt}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${
                        isCorrect
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-200'
                          : 'bg-rose-500/10 text-rose-700 dark:text-rose-200'
                      }`}
                    >
                      {isCorrect ? 'Correct' : 'Missed'}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.1rem] border border-slate-200/70 bg-white/85 p-4 dark:border-white/10 dark:bg-slate-950/60">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                        Your answer
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                        {selectedAnswer}
                      </p>
                    </div>
                    <div className="rounded-[1.1rem] border border-emerald-500/20 bg-emerald-500/[0.1] p-4 dark:border-emerald-400/20 dark:bg-emerald-400/[0.08]">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-200">
                        Correct answer
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-100">
                        {correctAnswer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
    </section>
  )
}

function getResultTone(scorePercent: number) {
  if (scorePercent >= 85) {
    return 'Excellent work. You handled this assessment with a strong level of accuracy.'
  }

  if (scorePercent >= 65) {
    return 'A solid result. You got a good number of answers right and showed steady performance.'
  }

  if (scorePercent >= 45) {
    return 'A fair attempt. There are some good instincts here, with room to improve on the missed questions.'
  }

  return 'This result shows a few learning gaps, but the review screen should help you see exactly where to improve.'
}

function CompletionIcon() {
  return (
    <svg viewBox="0 0 80 80" className="h-14 w-14" aria-hidden="true">
      <circle cx="40" cy="40" r="34" fill="#FDBA2D" />
      <circle cx="28" cy="32" r="4.5" fill="#1F2937" />
      <circle cx="52" cy="32" r="4.5" fill="#1F2937" />
      <path
        d="M26 48c3.2 5.2 8 7.8 14 7.8S50.8 53.2 54 48"
        fill="none"
        stroke="#1F2937"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="21" cy="41" r="5" fill="#FB7185" opacity="0.75" />
      <circle cx="59" cy="41" r="5" fill="#FB7185" opacity="0.75" />
    </svg>
  )
}
