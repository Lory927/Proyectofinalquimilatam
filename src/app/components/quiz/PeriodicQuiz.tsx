import { ArrowRight } from 'lucide-react';
import FeedbackBanner from '@/app/components/quiz/FeedbackBanner';
import QuizCard from '@/app/components/quiz/QuizCard';
import GameHeader from '@/app/components/game/GameHeader';
import GameResults from '@/app/components/game/GameResults';
import ScorePanel from '@/app/components/score/ScorePanel';
import { useQuizSession } from '@/app/hooks/useQuizSession';
import { getPeriodicQuestions } from '@/app/services/chemistry-data.service';

interface PeriodicQuizProps {
  onExit: () => void;
}

export default function PeriodicQuiz({ onExit }: PeriodicQuizProps) {
  const questions = getPeriodicQuestions();
  const { state, question, total, answer, next, restart } = useQuizSession('cuestionario-periodico', questions);
  const isLast = state.index + 1 >= total;

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <ScorePanel />

      <GameHeader
        title="Cuestionario de la tabla periódica"
        label={state.finished ? undefined : `Pregunta ${state.index + 1} de ${total}`}
        progress={state.finished ? undefined : { value: state.index, max: total }}
        onExit={onExit}
      />

      {state.finished ? (
        <GameResults
          correct={state.correct}
          incorrect={state.incorrect}
          points={state.points}
          total={total}
          onRestart={restart}
          onExit={onExit}
        />
      ) : (
        <>
          <QuizCard question={question} feedback={state.feedback} onSelect={answer} />

          {state.feedback && (
            <div className="flex flex-col gap-4">
              <FeedbackBanner feedback={state.feedback} />
              <button type="button" onClick={next} className="btn btn-primary w-full sm:w-auto sm:self-end">
                {isLast ? 'Ver resultados' : 'Siguiente pregunta'}
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
