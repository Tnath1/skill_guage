import type { QuizCatalogItem, Theme } from '../store/useSkillGaugeStore'
import { MoonIcon, SunIcon } from './Icons'

type AppHeaderProps = {
  theme: Theme
  selectedSubject: QuizCatalogItem | null
  onToggleTheme: () => void
}

export function AppHeader({
  theme,
  selectedSubject,
  onToggleTheme,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 mb-8 pt-4">
      <div className="flex items-center justify-between rounded-[1.85rem] border border-slate-200/80 bg-white/88 px-4 py-3 shadow-[0_22px_48px_-26px_rgba(15,23,42,0.22)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/78 dark:shadow-[0_22px_48px_-26px_rgba(2,6,23,0.9)] sm:px-5">
        <button
          type="button"
          onClick={onToggleTheme}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-300/70 bg-white/80 text-slate-700 shadow-lg shadow-slate-200/50 transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:shadow-slate-950/40 dark:hover:bg-white/10"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-600 dark:text-sky-300">
              Skill Gauge
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {selectedSubject ? selectedSubject.name : 'Choose your assessment'}
            </p>
          </div>
          <img
            src="/skillgauge_ogo.png"
            alt="Skill Gauge logo"
            className="h-11 w-auto rounded-2xl object-contain sm:h-12"
          />
        </div>
      </div>
    </header>
  )
}
