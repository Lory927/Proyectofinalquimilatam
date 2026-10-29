import { useState } from 'react';
import BalanceGame from '@/app/components/balance/BalanceGame';
import GameCard from '@/app/components/game-menu/GameCard';
import ModuleLinkCard from '@/app/components/game-menu/ModuleLinkCard';
import LabView from '@/app/components/lab/LabView';
import MemoryGame from '@/app/components/memory/MemoryGame';
import MoleculeExplorer from '@/app/components/molecules/MoleculeExplorer';
import MoleculeEditor from '@/app/components/molecule-editor/MoleculeEditor';
import PeriodicTable from '@/app/components/periodic-table/PeriodicTable';
import PeriodicQuiz from '@/app/components/quiz/PeriodicQuiz';
import TheoryLibrary from '@/app/components/theory/TheoryLibrary';
import { EXPLORER_MODULES, type ExplorerId } from '@/app/config/modules';
import { useProgress } from '@/app/hooks/useProgress';
import type { GameId } from '@/app/models/game';
import { getGames } from '@/app/services/chemistry-data.service';
import { getGameProgressSummary } from '@/app/services/progress.service';
import { createFormulaPairs, createMoleculePairs } from '@/app/services/memory.service';

export default function GameMenu() {
  const progress = useProgress();
  const games = getGames();
  const [activeGameId, setActiveGameId] = useState<GameId | null>(null);
  const [activeExplorerId, setActiveExplorerId] = useState<ExplorerId | null>(null);

  const exitGame = () => setActiveGameId(null);
  const exitExplorer = () => setActiveExplorerId(null);

  if (activeExplorerId === 'tabla-periodica') {
    return <PeriodicTable onExit={exitExplorer} />;
  }
  if (activeExplorerId === 'moleculas') {
    return <MoleculeExplorer onExit={exitExplorer} />;
  }
  if (activeExplorerId === 'laboratorio') {
    return <LabView onExit={exitExplorer} />;
  }
  if (activeExplorerId === 'teoria') {
    return <TheoryLibrary onExit={exitExplorer} />;
  }
  if (activeExplorerId === 'editor') {
    return <MoleculeEditor onExit={exitExplorer} />;
  }

  if (activeGameId === 'cuestionario-periodico') {
    return <PeriodicQuiz onExit={exitGame} />;
  }
  if (activeGameId === 'balanceo-ecuaciones') {
    return <BalanceGame onExit={exitGame} />;
  }
  if (activeGameId === 'memorama-formulas') {
    return (
      <MemoryGame
        gameId="memorama-formulas"
        title="Memorama de fórmulas"
        createPairs={createFormulaPairs}
        onExit={exitGame}
      />
    );
  }
  if (activeGameId === 'memorama-moleculas') {
    return (
      <MemoryGame
        gameId="memorama-moleculas"
        title="Memorama de moléculas"
        createPairs={createMoleculePairs}
        onExit={exitGame}
      />
    );
  }

  return (
    <div className="flex flex-col gap-10 md:gap-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl md:text-3xl">Módulos</h1>
        <p className="max-w-prose text-lg text-ink-muted">
          Elige un reto para practicar. Tus puntos y tu progreso se guardan en este dispositivo.
        </p>
      </header>

      <section aria-labelledby="explorer-title" className="flex flex-col gap-6">
        <h2 id="explorer-title" className="text-xl md:text-2xl">
          Explora
        </h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {EXPLORER_MODULES.map((module) => (
            <li key={module.id}>
              <ModuleLinkCard module={module} actionLabel="Explorar" onOpen={() => setActiveExplorerId(module.id)} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="games-title" className="flex flex-col gap-6">
        <h2 id="games-title" className="text-xl md:text-2xl">
          Juegos
        </h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {games.map((game) => (
            <li key={game.id}>
              <GameCard
                game={game}
                summary={getGameProgressSummary(progress, game.id)}
                onPlay={() => setActiveGameId(game.id)}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
