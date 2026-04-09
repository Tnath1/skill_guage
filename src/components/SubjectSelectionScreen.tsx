import { useEffect, useState } from "react";

import type { AppStatus, QuizCatalogItem } from "../store/useSkillGaugeStore";

type SubjectSelectionScreenProps = {
  status: AppStatus;
  subjects: QuizCatalogItem[];
  selectedSubject: QuizCatalogItem | null;
  errorMessage: string | null;
  onStartQuiz: (subject: QuizCatalogItem) => void;
};

export function SubjectSelectionScreen({
  status,
  subjects,
  selectedSubject,
  errorMessage,
  onStartQuiz,
}: SubjectSelectionScreenProps) {
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    if (selectedSubject) {
      setSelectedFileName(selectedSubject.fileName);
      return;
    }

    setSelectedFileName("");
  }, [selectedSubject]);

  const currentSelection =
    subjects.find((subject) => subject.fileName === selectedFileName) ?? null;
  const isLoadingQuiz = status === "loading-quiz";

  return (
    <section className="grid flex-1 place-items-start pt-6 sm:pt-10">
      <div className="w-full rounded-[2.2rem] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.56),rgba(255,255,255,0.28))] p-4 shadow-[0_20px_60px_-42px_rgba(14,116,144,0.35)] backdrop-blur-sm dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] sm:p-15">
        <div className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_26px_80px_-42px_rgba(15,23,42,0.24)] dark:border-white/10 dark:bg-slate-900/90 dark:shadow-[0_26px_80px_-42px_rgba(2,6,23,0.92)] sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700 dark:border-sky-400/15 dark:bg-sky-400/10 dark:text-sky-200">
                Skill Selection
              </span>
              <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-[1.85rem]">
                Choose the skill you want to assess
              </h1>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-right dark:border-white/10 dark:bg-slate-950/70">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                Question set
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                Up to 10 questions
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Select the skill carefully before you begin. Once the assessment
            starts, you will need to finish it before switching to another
            skill.
          </p>

          <div className="mt-5">
            <label
              htmlFor="skill-select"
              className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              Select skill
            </label>
            <select
              id="skill-select"
              value={selectedFileName}
              onChange={(event) => setSelectedFileName(event.target.value)}
              disabled={isLoadingQuiz}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 disabled:cursor-wait disabled:bg-slate-100 dark:border-white/12 dark:bg-slate-950 dark:text-white dark:focus:border-sky-400 dark:focus:ring-sky-400/10 dark:disabled:bg-slate-900"
            >
              <option value="">Select skill</option>
              {subjects.map((subject) => (
                <option key={subject.fileName} value={subject.fileName}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 text-sm leading-6 text-slate-600 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300">
            You will be given 10 questions or less, with 1 minute for each
            question.
          </div>

          {errorMessage ? (
            <div className="mt-4 rounded-[0.9rem] border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-amber-800 dark:text-amber-100">
              {errorMessage}
            </div>
          ) : null}

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {isLoadingQuiz ? (
                <span className="inline-flex items-center gap-3">
                  <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-600 dark:border-white/15 dark:border-t-sky-300" />
                  Preparing your assessment...
                </span>
              ) : (
                "Make sure you are ready before getting started."
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                if (currentSelection) {
                  onStartQuiz(currentSelection);
                }
              }}
              disabled={!currentSelection || isLoadingQuiz}
              className="rounded-full bg-sky-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 dark:disabled:bg-white/10 dark:disabled:text-slate-500"
            >
              {isLoadingQuiz ? "Getting started..." : "Get Started"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
