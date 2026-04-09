# Skill Gauge

<p align="center">
  A modern skill assessment app for selecting a subject, taking a timed test, and reviewing performance with clarity.
</p>

<p align="center">
  <a href="https://skillguage.vercel.app/"><strong>View Demo</strong></a>
  ·
  <a href="https://github.com/Tnath1/skill_guage/issues"><strong>Report Bug</strong></a>
  ·
  <a href="https://github.com/Tnath1/skill_guage/issues"><strong>Request Feature</strong></a>
</p>

## About The Project

Skill Gauge is a frontend quiz application built for quick skill testing. A user selects a subject, starts a timed assessment, answers up to 10 randomized questions, and receives a final score with answer review at the end.

The experience is designed to feel focused and polished, with dark and light mode support, a sticky header, clear loading states, and a simple flow from subject selection to results.

## Key Features

- Subject-based assessments
- Up to 10 randomized questions per test
- 60-second timer for each question
- Circular countdown indicator with a red warning state in the final 15 seconds
- Progress tracking based on completed questions
- Final score summary with answer review
- Retake flow for the same subject
- Option to return and choose another skill
- Light and dark mode toggle
- Zustand-powered global state management

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Zustand

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### Installation

Clone the repository and move into the project folder:

```bash
git clone https://github.com/Tnath1/skill_guage.git
cd skill_guage
```

Install dependencies:

```bash
npm install
```

### Run The App

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal to view the app in your browser.

### Build For Production

```bash
npm run build
```

### Preview The Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` starts the local development server
- `npm run build` creates the production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint

## How The App Works

1. The app loads the available quiz subjects.
2. The user selects a skill to assess.
3. A question set is prepared for that subject.
4. The quiz runs with one minute per question.
5. The user moves through the assessment and submits answers question by question.
6. At the end, the app calculates the score and shows the result screen.
7. The user can review answers, retake the same test, or choose another subject.

## Project Structure

```text
src/
  components/
  store/
  App.tsx
  index.css
  main.tsx
public/
```

## Highlights

- Clean assessment flow from selection to results
- Responsive interface for desktop and mobile
- Persistent theme preference
- Focused quiz UI with modern dark and light styling

## Demo

- Live app: [https://skillguage.vercel.app/](https://skillguage.vercel.app/)

## Contributing

Contributions, improvements, and suggestions are welcome.

If you would like to contribute:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push your branch
5. Open a pull request

You can also open an issue to report a bug or suggest a feature.

## Contact

- Built by [Tnath1](https://github.com/Tnath1).
- Project link: [https://github.com/Tnath1/skill_guage](https://github.com/Tnath1/skill_guage)
- Demo link: [https://skillguage.vercel.app/](https://skillguage.vercel.app/)


