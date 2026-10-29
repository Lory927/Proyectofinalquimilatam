import { CircleCheck, CircleX } from 'lucide-react';
import type { AnswerFeedback } from '@/app/hooks/useQuizSession';

interface FeedbackBannerProps {
  feedback: AnswerFeedback;
}

export default function FeedbackBanner({ feedback }: FeedbackBannerProps) {
  const isCorrect = feedback.isCorrect;
  const Icon = isCorrect ? CircleCheck : CircleX;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-start gap-4 rounded-card p-5 md:p-6 ${
        isCorrect ? 'bg-success-soft text-success-text' : 'bg-error-soft text-ink'
      }`}
    >
      <Icon size={28} aria-hidden="true" className="mt-1 shrink-0" />
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold">
          {isCorrect ? `¡Correcto! +${feedback.points} puntos` : `Incorrecto. La respuesta es ${feedback.correctAnswer}`}
        </p>
        <p className="text-lg text-ink">{feedback.explanation}</p>
      </div>
    </div>
  );
}
