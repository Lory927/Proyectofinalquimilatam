import { Award, Flame, Star } from 'lucide-react';
import { useProgress } from '@/app/hooks/useProgress';

export default function ScorePanel() {
  const progress = useProgress();

  return (
    <div className="sticky top-0 z-20">
      <dl className="grid grid-cols-3 gap-2 rounded-card bg-ink p-4 text-white shadow-card md:p-5">
        <div className="flex items-center gap-3">
          <Star size={22} aria-hidden="true" className="shrink-0 text-highlight" />
          <div>
            <dt className="text-base text-white/80">Puntos</dt>
            <dd className="text-xl font-bold tabular-nums">{progress.xp}</dd>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Award size={22} aria-hidden="true" className="shrink-0 text-highlight" />
          <div>
            <dt className="text-base text-white/80">Nivel</dt>
            <dd className="text-xl font-bold tabular-nums">{progress.level}</dd>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Flame size={22} aria-hidden="true" className="shrink-0 text-highlight" />
          <div>
            <dt className="text-base text-white/80">Racha</dt>
            <dd className="text-xl font-bold tabular-nums">{progress.streak}</dd>
          </div>
        </div>
      </dl>
    </div>
  );
}
