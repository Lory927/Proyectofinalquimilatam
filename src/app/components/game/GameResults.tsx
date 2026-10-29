import { RotateCcw, ArrowLeft } from 'lucide-react';

interface GameResultsProps {
  correct: number;
  incorrect: number;
  points: number;
  total: number;
  onRestart: () => void;
  onExit: () => void;
}

export default function GameResults({ correct, incorrect, points, total, onRestart, onExit }: GameResultsProps) {
  return (
    <section aria-labelledby="results-title" className="card flex flex-col gap-8 p-6 md:p-10">
      <div className="flex flex-col gap-2">
        <p className="text-base font-semibold text-ink-muted">Juego terminado</p>
        <h2 id="results-title" className="text-2xl md:text-3xl">
          Estos son tus resultados
        </h2>
      </div>

      <dl className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-btn bg-success-soft p-5">
          <dt className="text-base font-semibold text-success-text">Aciertos</dt>
          <dd className="text-3xl font-bold tabular-nums text-ink">
            {correct} de {total}
          </dd>
        </div>
        <div className="rounded-btn bg-error-soft p-5">
          <dt className="text-base font-semibold text-ink">Errores</dt>
          <dd className="text-3xl font-bold tabular-nums text-ink">{incorrect}</dd>
        </div>
        <div className="rounded-btn bg-primary-soft p-5">
          <dt className="text-base font-semibold text-primary">Puntos ganados</dt>
          <dd className="text-3xl font-bold tabular-nums text-ink">{points}</dd>
        </div>
      </dl>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={onRestart} className="btn btn-primary">
          <RotateCcw size={20} aria-hidden="true" />
          Jugar de nuevo
        </button>
        <button type="button" onClick={onExit} className="btn btn-secondary">
          <ArrowLeft size={20} aria-hidden="true" />
          Volver a juegos
        </button>
      </div>
    </section>
  );
}
