import { X } from 'lucide-react';

interface GameHeaderProps {
  title: string;
  label?: string;
  progress?: { value: number; max: number };
  onExit: () => void;
}

export default function GameHeader({ title, label, progress, onExit }: GameHeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-ink-muted">{title}</p>
          {label && <p className="text-xl font-bold tabular-nums text-ink">{label}</p>}
        </div>
        <button type="button" onClick={onExit} className="btn btn-secondary">
          <X size={20} aria-hidden="true" />
          Salir
        </button>
      </div>
      {progress && (
        <div
          role="progressbar"
          aria-label="Avance del juego"
          aria-valuemin={0}
          aria-valuemax={progress.max}
          aria-valuenow={progress.value}
          className="h-3 w-full overflow-hidden rounded-full bg-primary-soft"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
            style={{ width: `${(progress.value / progress.max) * 100}%` }}
          />
        </div>
      )}
    </header>
  );
}
