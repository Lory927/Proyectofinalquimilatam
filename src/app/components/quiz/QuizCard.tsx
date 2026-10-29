import { Check, X } from 'lucide-react';
import type { Question } from '@/app/models/quiz';
import type { AnswerFeedback } from '@/app/hooks/useQuizSession';

interface QuizCardProps {
  question: Question;
  feedback: AnswerFeedback | null;
  onSelect: (index: number) => void;
}

function optionClasses(index: number, feedback: AnswerFeedback | null): string {
  const base =
    'flex w-full items-center gap-4 rounded-btn border-2 px-5 py-4 text-left text-lg font-semibold transition duration-200 ease-out';
  if (!feedback) {
    return `${base} border-ink/15 bg-surface text-ink hover:-translate-y-0.5 hover:border-primary hover:bg-primary-soft`;
  }
  if (index === feedback.correctIndex) {
    return `${base} border-success bg-success-soft text-success-text`;
  }
  if (index === feedback.selectedIndex) {
    return `${base} border-error bg-error-soft text-ink`;
  }
  return `${base} border-ink/10 bg-canvas text-ink-muted`;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function QuizCard({ question, feedback, onSelect }: QuizCardProps) {
  return (
    <section aria-labelledby="quiz-question" className="card flex flex-col gap-6 p-6 md:p-8">
      <h2 id="quiz-question" className="text-2xl md:text-3xl">
        {question.question}
      </h2>
      <ul className="grid gap-3 md:grid-cols-2">
        {question.options.map((option, index) => (
          <li key={option}>
            <button
              type="button"
              disabled={feedback !== null}
              onClick={() => onSelect(index)}
              className={optionClasses(index, feedback)}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-canvas text-base font-bold text-ink ring-1 ring-inset ring-ink/10">
                {LETTERS[index]}
              </span>
              <span className="flex-1">{option}</span>
              {feedback && index === feedback.correctIndex && (
                <Check size={22} aria-hidden="true" className="shrink-0" />
              )}
              {feedback && index === feedback.selectedIndex && index !== feedback.correctIndex && (
                <X size={22} aria-hidden="true" className="shrink-0" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
