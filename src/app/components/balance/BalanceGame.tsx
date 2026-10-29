import { ArrowRight } from 'lucide-react';
import BalanceFeedback from '@/app/components/balance/BalanceFeedback';
import EquationBoard from '@/app/components/balance/EquationBoard';
import GameHeader from '@/app/components/game/GameHeader';
import GameResults from '@/app/components/game/GameResults';
import ScorePanel from '@/app/components/score/ScorePanel';
import { useBalanceGame } from '@/app/hooks/useBalanceGame';

interface BalanceGameProps {
  onExit: () => void;
}

export default function BalanceGame({ onExit }: BalanceGameProps) {
  const { state, equation, total, changeInput, check, next, restart } = useBalanceGame('balanceo-ecuaciones');
  const solved = state.status === 'solved';
  const isLast = state.index + 1 >= total;

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <ScorePanel />

      <GameHeader
        title="Balanceo de ecuaciones"
        label={state.finished ? undefined : `Ecuación ${state.index + 1} de ${total}`}
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
          <EquationBoard
            equation={equation}
            inputs={state.inputs}
            locked={solved}
            onChange={changeInput}
            onCheck={check}
          />

          <BalanceFeedback
            status={state.status}
            invalid={state.invalid}
            lastPoints={state.lastPoints}
            hint={equation.hint}
          />

          {solved && (
            <button type="button" onClick={next} className="btn btn-primary w-full sm:w-auto sm:self-end">
              {isLast ? 'Ver resultados' : 'Siguiente ecuación'}
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          )}
        </>
      )}
    </div>
  );
}
