import { useEffect, useState } from 'react'

import type {
  AppStatus,
  QuizCatalogItem,
} from '../store/useSkillGaugeStore'

type SubjectSelectionScreenProps = {
  status: AppStatus
  subjects: QuizCatalogItem[]
  selectedSubject: QuizCatalogItem | null
  errorMessage: string | null
  onStartQuiz: (subject: QuizCatalogItem) => void
}

export function SubjectSelectionScreen({
  status,
  subjects,
  selectedSubject,
  errorMessage,
  onStartQuiz,
}: SubjectSelectionScreenProps) {
  const [selectedFileName, setSelectedFileName] = useState('')

  useEffect(() => {
    if (selectedSubject) {
      setSelectedFileName(selectedSubject.fileName)
      return
    }

    setSelectedFileName('')
  }, [selectedSubject])

  const currentSelection =
    subjects.find((subject) => subject.fileName === selectedFileName) ?? null
  const isLoadingQuiz = status === 'loading-quiz'

  return (
    <section className="grid flex-1 place-items-start pt-6 sm:pt-10">
      <div className="w-full rounded-[1.9rem] border border-slate-200/80 bg-white/30 p-4 backdrop-blur-sm dark:border-white/8 dark:bg-white/[0.02]">
        <div className="mx-auto w-full max-w-2xl rounded-[1.25rem] border border-slate-200/80 bg-white/95 p-5 shadow-[0_26px_80px_-42px_rgba(15,23,42,0.24)] dark:border-white/10 dark:bg-slate-900/88 dark:shadow-[0_26px_80px_-42px_rgba(2,6,23,0.92)] sm:p-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Select Skill
          </h1>

          <div className="mt-5">
            <label
              htmlFor="skill-select"
              className="sr-only"
            >
              Select skill
            </label>
            <select
              id="skill-select"
              value={selectedFileName}
              onChange={(event) => setSelectedFileName(event.target.value)}
              disabled={isLoadingQuiz}
              className="w-full rounded-[0.9rem] border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 disabled:cursor-wait disabled:bg-slate-100 dark:border-white/12 dark:bg-slate-950 dark:text-white dark:focus:border-sky-400 dark:focus:ring-sky-400/10 dark:disabled:bg-slate-900"
            >
              <option value="">Select skill</option>
              {subjects.map((subject) => (
                <option key={subject.fileName} value={subject.fileName}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
            You will be given 10 questions or less, with 1 minute for each
            question.
          </p>

          {errorMessage ? (
            <div className="mt-4 rounded-[0.9rem] border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-amber-800 dark:text-amber-100">
              {errorMessage}
            </div>
          ) : null}

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (currentSelection) {
                  onStartQuiz(currentSelection)
                }
              }}
              disabled={!currentSelection || isLoadingQuiz}
              className="rounded-full bg-sky-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 dark:disabled:bg-white/10 dark:disabled:text-slate-500"
            >
              {isLoadingQuiz ? 'Starting...' : 'Start'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
