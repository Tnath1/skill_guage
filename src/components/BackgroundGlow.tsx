export function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-14rem] top-[-8rem] h-80 w-80 rounded-full bg-sky-300/35 blur-3xl dark:bg-sky-500/18" />
      <div className="absolute bottom-[-12rem] right-[-6rem] h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.88),rgba(238,244,255,0.96)_32%,rgba(236,253,245,0.72)_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(8,47,73,0.3),rgba(2,6,23,0.96)_45%,rgba(2,6,23,1)_100%)]" />
    </div>
  )
}
