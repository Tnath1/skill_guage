import type {
  AppStatus,
  QuizCatalogItem,
} from '../store/useSkillGaugeStore'
import { ArrowIcon, SearchIcon, SpinnerIcon } from './Icons'
import { InfoCard, MiniMetric, RulePill } from './UiBits'

type SubjectSelectionScreenProps = {
  status: AppStatus
  subjects: QuizCatalogItem[]
  totalSubjects: number
  searchQuery: string
  selectedSubject: QuizCatalogItem | null
  errorMessage: string | null
  onSearchChange: (value: string) => void
  onStartQuiz: (subject: QuizCatalogItem) => void
}

export function SubjectSelectionScreen({
  status,
  subjects,
  totalSubjects,
  searchQuery,
  selectedSubject,
  errorMessage,
  onSearchChange,
  onStartQuiz,
}: SubjectSelectionScreenProps) {
  const isLoadingQuiz = status === 'loading-quiz'

  return (
    <section className="grid flex-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[2rem] border border-slate-200/80 bg-white/86 p-6 shadow-[0_26px_90px_-44px_rgba(15,23,42,0.32)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_26px_90px_-44px_rgba(2,6,23,0.9)] sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-200">
              Step 1
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Pick the subject you want to test.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              The app fetches the live subject list from your endpoint, loads the
              selected quiz file, randomizes 10 questions, and starts a fresh
              one-minute timer for every question.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-100/85 px-5 py-4 dark:border-white/10 dark:bg-slate-950/60">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">
              Catalog size
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
              {totalSubjects}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Search subjects
          </label>
          <div className="mt-3 flex items-center gap-3 rounded-[1.4rem] border border-slate-200/80 bg-slate-100/80 px-4 py-3 dark:border-white/10 dark:bg-slate-950/60">
            <SearchIcon />
            <input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by skill, tool, platform, or topic"
              className="w-full bg-transparent text-base text-slate-950 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        {errorMessage ? (
          <div className="mt-5 rounded-[1.3rem] border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-amber-800 dark:text-amber-100">
            {errorMessage}
          </div>
        ) : null}

        <div className="mt-6 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <p>
            {subjects.length} {subjects.length === 1 ? 'subject' : 'subjects'}{' '}
            available
          </p>
          <p>Choose one to begin</p>
        </div>

        <div className="mt-6 grid max-h-[34rem] gap-3 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">
          {subjects.map((subject) => {
            const isPending =
              isLoadingQuiz && selectedSubject?.fileName === subject.fileName

            return (
              <button
                key={subject.fileName}
                type="button"
                onClick={() => onStartQuiz(subject)}
                disabled={isLoadingQuiz}
                className="group rounded-[1.35rem] border border-slate-200/80 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/70 disabled:cursor-wait disabled:opacity-70 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:shadow-slate-950/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-950 dark:text-white">
                      {subject.name}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Randomized timed quiz with instant scoring.
                    </p>
                  </div>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-hover:bg-slate-950 group-hover:text-white dark:bg-slate-900 dark:text-slate-300 dark:group-hover:bg-sky-400 dark:group-hover:text-slate-950">
                    {isPending ? <SpinnerIcon /> : <ArrowIcon />}
                  </span>
                </div>
              </button>
            )
          })}

          {subjects.length === 0 ? (
            <div className="col-span-full rounded-[1.4rem] border border-dashed border-slate-300/80 bg-slate-100/70 p-8 text-center text-sm leading-7 text-slate-500 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-400">
              No subjects match your search. Try a broader keyword.
            </div>
          ) : null}
        </div>
      </div>

      <aside className="grid gap-6">
        <InfoCard
          eyebrow="How it works"
          title="A quick path from selection to score."
          description="The user starts by choosing a subject, then gets a focused 10-question assessment with automatic timing and scoring."
        >
          <div className="grid gap-3">
            <RulePill label="10 random questions" />
            <RulePill label="60 seconds per question" />
            <RulePill label="Auto-advance on answer" />
            <RulePill label="Auto-skip on timeout" />
            <RulePill label="Final score at the end" />
          </div>
        </InfoCard>

        <InfoCard
          eyebrow="Built for clarity"
          title="Good UX with less friction."
          description="The layout keeps the subject picker obvious, the timed flow focused, and the result review easy to understand."
        >
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <MiniMetric label="Mode" value="Timed" />
            <MiniMetric label="Data" value="Remote JSON" />
            <MiniMetric label="State" value="Zustand" />
          </div>
        </InfoCard>
      </aside>
    </section>
  )
}
