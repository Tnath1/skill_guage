function App() {
  // 
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_30%),linear-gradient(160deg,_#020617,_#0f172a_48%,_#111827)] px-6 py-10 text-slate-100">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-sky-950/30 backdrop-blur md:p-12">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
            Tailwind Ready
          </span>
          <span className="text-sm text-slate-400">React + Vite starter reset</span>
        </div>

        <section className="grid gap-10 py-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-sky-300/80">
              Skill Gauge
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Vite project is reset and ready for Tailwind-based styling.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              The default starter content has been removed. This placeholder layout
              is here just to confirm Tailwind is working and to give you a clean
              base for whatever we build next.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300">
                Start building
              </button>
              <button className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-sky-300/60 hover:bg-white/5">
                Edit src/App.tsx
              </button>
            </div>
          </div>

          <div className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Setup status
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">Complete</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Framework</p>
                <p className="mt-2 font-medium text-white">React 19</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Bundler</p>
                <p className="mt-2 font-medium text-white">Vite 8</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Styling</p>
                <p className="mt-2 font-medium text-white">Tailwind 4</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
