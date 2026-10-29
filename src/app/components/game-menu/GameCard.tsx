import { Clock } from 'lucide-react';
import { GAME_ICONS } from '@/app/config/modules';
import type { GameDefinition } from '@/app/models/game';
import type { GameProgressSummary } from '@/app/services/progress.service';

interface GameCardProps {
  game: GameDefinition;
  summary: GameProgressSummary;
  onPlay: () => void;
}

export default function GameCard({ game, summary, onPlay }: GameCardProps) {
  const Icon = GAME_ICONS[game.id];
  const hasPlays = summary.plays > 0;

  return (
    <article className="card flex h-full flex-col gap-5 p-6 md:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-btn bg-primary-soft text-primary">
          <Icon size={24} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="text-xl">{game.name}</h3>
          <p className="mt-1 text-ink-muted">{game.description}</p>
        </div>
      </div>

      <dl className="mt-auto grid grid-cols-2 gap-4 rounded-btn bg-canvas p-4">
        <div>
          <dt className="text-base text-ink-muted">Partidas</dt>
          <dd className="text-xl font-bold tabular-nums text-ink">{summary.plays}</dd>
        </div>
        <div>
          <dt className="text-base text-ink-muted">Mejor puntaje</dt>
          <dd className="text-xl font-bold tabular-nums text-ink">{summary.bestPoints}</dd>
        </div>
      </dl>

      <p className="flex items-center gap-2 text-base text-ink-muted">
        <Clock size={18} aria-hidden="true" />
        {hasPlays ? 'Sigue practicando para subir tu puntaje' : 'Aún no has jugado este reto'}
      </p>

      <button type="button" onClick={onPlay} className="btn btn-primary w-fit">
        Jugar ahora
      </button>
    </article>
  );
}
