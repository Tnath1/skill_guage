import type { QuizCatalogItem, QuizQuestion } from '../store/useSkillGaugeStore'
import { InfoCard, MiniMetric } from './UiBits'

type ResultsScreenProps = {
  subject: QuizCatalogItem | null
  questions: QuizQuestion[]
  answers: Record<string, number | null>
  score: number
  attemptedCount: number
  unansweredCount: number
  incorrectCount: number
  scorePercent: number
  onReset: () => void
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
  onReset,
}: ResultsScreenProps) {
  const resultTone = getResultTone(scorePercent)

  return (
    <section className="grid flex-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_26px_90px_-44px_rgba(15,23,42,0.32)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_26px_90px_-44px_rgba(2,6,23,0.9)] sm:p-8">
        <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200">
          Test complete
        </span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          {resultTone.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          {resultTone.summary}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MiniMetric label="Subject" value={subject?.name ?? 'Unknown'} />
          <MiniMetric label="Score" value={`${score}/${questions.length}`} />
          <MiniMetric label="Percent" value={`${scorePercent}%`} />
          <MiniMetric label="Attempted" value={`${attemptedCount}/${questions.length}`} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onReset}
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
          >
            Choose subject again
          </button>
          <span className="inline-flex items-center rounded-full border border-slate-200/80 bg-slate-100/80 px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300">
            Retaking returns the user to the subject picker first.
          </span>
        </div>

        <div className="mt-8 rounded-[1.8rem] border border-slate-200/80 bg-slate-100/80 p-5 dark:border-white/10 dark:bg-slate-950/60">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
              Answer review
            </h2>
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.22em]">
              <span className="rounded-full bg-emerald-500/10 px-3 py-2 text-emerald-700 dark:text-emerald-200">
                Correct: {score}
              </span>
              <span className="rounded-full bg-amber-500/10 px-3 py-2 text-amber-700 dark:text-amber-200">
                Incorrect: {incorrectCount}
              </span>
              <span className="rounded-full bg-slate-300/50 px-3 py-2 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Unanswered: {unansweredCount}
              </span>
            </div>
          </div>

          <div className="mt-5 grid gap-4">
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
                  className="rounded-[1.35rem] border border-slate-200/80 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5"
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
                    <div className="rounded-[1.1rem] border border-slate-200/70 bg-slate-100/80 p-4 dark:border-white/10 dark:bg-slate-950/60">
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
      </div>

      <aside className="grid gap-6">
        <InfoCard
          eyebrow="Score summary"
          title={`${scorePercent}% overall`}
          description="The final score only increases when the chosen answer index matches the `_ps` value from the quiz data."
        >
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <MiniMetric label="Correct" value={`${score}`} />
            <MiniMetric label="Incorrect" value={`${incorrectCount}`} />
            <MiniMetric label="Timed out" value={`${unansweredCount}`} />
          </div>
        </InfoCard>

        <InfoCard
          eyebrow="Next step"
          title="Ready for another subject?"
          description="Resetting clears the current attempt and returns the user to the starting screen to choose a new subject."
        >
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-slate-300/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
          >
            Back to subject picker
          </button>
        </InfoCard>
      </aside>
    </section>
  )
}

function getResultTone(scorePercent: number) {
  if (scorePercent >= 85) {
    return {
      title: 'Outstanding result',
      summary:
        'This score shows strong accuracy across the randomized question set and a solid response pace under time pressure.',
    }
  }

  if (scorePercent >= 65) {
    return {
      title: 'Strong result',
      summary:
        'The user handled most of the questions well and kept a dependable level of accuracy through the timed session.',
    }
  }

  if (scorePercent >= 45) {
    return {
      title: 'Developing result',
      summary:
        'There is a workable foundation here, with a few missed opportunities that can improve with more repetition on the chosen subject.',
    }
  }

  return {
    title: 'Early-stage result',
    summary:
      'This attempt surfaced some clear learning gaps, which makes the retake flow and subject switching especially useful.',
  }
}
