import { ErrorIcon } from './Icons'
import type { QuizCatalogItem } from '../store/useSkillGaugeStore'

export function CatalogLoadingScreen() {
  return (
    <section className="grid flex-1 place-items-center">
      <div className="w-full max-w-xl rounded-[2rem] border border-slate-200/80 bg-white/85 p-10 text-center shadow-[0_24px_80px_-38px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_80px_-38px_rgba(2,6,23,0.88)]">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-sky-500 dark:border-white/10 dark:border-t-sky-300" />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
          Loading quiz subjects
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
          Fetching the subject catalog so the user can choose a test before the
          timed session begins.
        </p>
      </div>
    </section>
  )
}

export function CatalogErrorScreen({
  errorMessage,
  onRetry,
}: {
  errorMessage: string | null
  onRetry: () => void
}) {
  return (
    <section className="grid flex-1 place-items-center">
      <div className="w-full max-w-xl rounded-[2rem] border border-rose-200/80 bg-white/88 p-10 text-center shadow-[0_24px_80px_-38px_rgba(15,23,42,0.35)] backdrop-blur dark:border-rose-500/20 dark:bg-white/5 dark:shadow-[0_24px_80px_-38px_rgba(2,6,23,0.88)]">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/12 text-rose-600 dark:bg-rose-400/12 dark:text-rose-200">
          <ErrorIcon />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
          The subject catalog could not be loaded
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
          {errorMessage}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-8 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
        >
          Try again
        </button>
      </div>
    </section>
  )
}

export function QuizLoadingScreen({
  selectedSubject,
}: {
  selectedSubject: QuizCatalogItem | null
}) {
  return (
    <section className="grid flex-1 place-items-center">
      <div className="w-full max-w-xl rounded-[2rem] border border-slate-200/80 bg-white/88 p-10 text-center shadow-[0_24px_80px_-38px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_80px_-38px_rgba(2,6,23,0.88)]">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-sky-500 dark:border-white/10 dark:border-t-sky-300" />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
          Preparing your assessment
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
          {selectedSubject
            ? `Loading ${selectedSubject.name} so you can continue straight into the quiz.`
            : 'Loading the selected subject so you can continue straight into the quiz.'}
        </p>
      </div>
    </section>
  )
}
