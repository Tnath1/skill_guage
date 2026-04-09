import type { ReactNode } from 'react'

type InfoCardProps = {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}

export function InfoCard({
  eyebrow,
  title,
  description,
  children,
}: InfoCardProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200/80 bg-white/86 p-6 shadow-[0_26px_90px_-44px_rgba(15,23,42,0.32)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_26px_90px_-44px_rgba(2,6,23,0.9)]">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
        {description}
      </p>
      <div className="mt-6">{children}</div>
    </section>
  )
}

type MiniMetricProps = {
  label: string
  value: string
}

export function MiniMetric({ label, value }: MiniMetricProps) {
  return (
    <div className="rounded-[1.35rem] border border-slate-200/80 bg-slate-100/85 p-4 dark:border-white/10 dark:bg-slate-950/60">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">
        {value}
      </p>
    </div>
  )
}

export function RulePill({ label }: { label: string }) {
  return (
    <div className="rounded-full border border-slate-200/80 bg-slate-100/80 px-4 py-3 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-200">
      {label}
    </div>
  )
}
