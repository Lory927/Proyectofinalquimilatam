import GameHeader from '@/app/components/game/GameHeader';
import GameResults from '@/app/components/game/GameResults';
import MemoryBoard from '@/app/components/memory/MemoryBoard';
import ScorePanel from '@/app/components/score/ScorePanel';
import { useMemoryGame } from '@/app/hooks/useMemoryGame';
import type { GameId } from '@/app/models/game';
import type { MemoryPair } from '@/app/services/memory.service';

interface MemoryGameProps {
  gameId: GameId;
  title: string;
  createPairs: () => MemoryPair[];
  onExit: () => void;
}

export default function MemoryGame({ gameId, title, createPairs, onExit }: MemoryGameProps) {
  const { state, flip, restart } = useMemoryGame(gameId, createPairs);

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <ScorePanel />

      <GameHeader
        title={title}
        label={state.finished ? undefined : `Parejas encontradas ${state.matched.length} de ${state.pairCount}`}
        onExit={onExit}
      />

      {state.finished ? (
        <GameResults
          correct={state.correct}
          incorrect={state.incorrect}
          points={state.points}
          total={state.pairCount}
          onRestart={restart}
          onExit={onExit}
        />
      ) : (
        <>
          <p className="text-lg text-ink-muted">
            Voltea dos cartas para buscar su pareja. Un acierto suma puntos; un error corta tu racha.
          </p>
          <MemoryBoard
            cards={state.cards}
            flipped={state.flipped}
            matched={state.matched}
            disabled={state.busy}
            onFlip={flip}
          />
        </>
      )}
    </div>
  );
}
