import type { Theme } from '../store/useSkillGaugeStore'
import { MoonIcon, SunIcon } from './Icons'

type AppHeaderProps = {
  theme: Theme
  onToggleTheme: () => void
}

export function AppHeader({
  theme,
  onToggleTheme,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 mb-8 pt-4">
      <div className="flex items-center justify-between rounded-[1.85rem] border border-slate-200/80 bg-white/88 px-4 py-3 shadow-[0_22px_48px_-26px_rgba(15,23,42,0.22)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/78 dark:shadow-[0_22px_48px_-26px_rgba(2,6,23,0.9)] sm:px-5">
        <div className="flex items-center gap-3">
          <div>
            <div
              className="flex items-center text-[1.9rem] leading-none sm:text-[2.05rem]"
              style={{
                fontFamily:
                  '"Aptos", "Segoe UI Variable Display", "Segoe UI", sans-serif',
              }}
            >
              <span className="font-light tracking-[-0.04em] text-slate-800 dark:text-slate-100">
                Skill
              </span>
              <span className="relative mx-1 inline-flex h-7 w-2 items-center justify-center">
                <span className="block h-7 w-[1.5px] rotate-24 rounded-full bg-sky-500/80 dark:bg-sky-300/85" />
              </span>
              <span className="font-extralight tracking-[-0.05em] text-sky-500 dark:text-sky-300">
                Gauge
              </span>
            </div>
            <p className="mt-1 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Measure skills with clarity
            </p>
          </div>
          {/*
          <img
            src="/skillgauge_ogo.png"
            alt="Skill Gauge logo"
            className="h-11 w-auto rounded-2xl object-contain sm:h-12"
          />
          */}
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-300/70 bg-white/80 text-slate-700 shadow-lg shadow-slate-200/50 transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:shadow-slate-950/40 dark:hover:bg-white/10"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  )
}
