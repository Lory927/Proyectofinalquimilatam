interface LevelSummaryProps {
  level: number;
  currentXp: number;
  levelSpan: number;
  percent: number;
  streak: number;
}

export default function LevelSummary({ level, currentXp, levelSpan, percent, streak }: LevelSummaryProps) {
  const roundedPercent = Math.round(percent);
  return (
    <section aria-labelledby="level-summary-title" className="card flex flex-col gap-4 p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-ink-muted">Tu avance</p>
          <h2 id="level-summary-title" className="text-2xl">
            Nivel {level}
          </h2>
        </div>
        <p className="font-semibold tabular-nums text-ink">
          {currentXp} / {levelSpan} XP
        </p>
      </div>

      <div
        role="progressbar"
        aria-label="Progreso hacia el siguiente nivel"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={roundedPercent}
        className="h-4 w-full overflow-hidden rounded-full bg-primary-soft"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${roundedPercent}%` }}
        />
      </div>

      <p className="text-base text-ink-muted">
        Racha actual: <span className="font-semibold tabular-nums text-ink">{streak}</span>{' '}
        {streak === 1 ? 'acierto seguido' : 'aciertos seguidos'}
      </p>
    </section>
  );
}
