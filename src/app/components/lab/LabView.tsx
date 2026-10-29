import { useState } from 'react';
import ExperimentBench from '@/app/components/lab/ExperimentBench';
import GameHeader from '@/app/components/game/GameHeader';
import { getExperiments } from '@/app/services/chemistry-data.service';

interface LabViewProps {
  onExit: () => void;
}

export default function LabView({ onExit }: LabViewProps) {
  const experiments = getExperiments();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = experiments.find((experiment) => experiment.id === selectedId);

  if (selected) {
    return <ExperimentBench key={selected.id} experiment={selected} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <GameHeader title="Laboratorio virtual" label={`${experiments.length} experimentos`} onExit={onExit} />

      <p className="max-w-prose text-lg text-ink-muted">
        Cambia las condiciones de cada experimento simulado y observa qué ocurre. Los resultados son aproximados y
        con fines educativos.
      </p>

      <ul className="grid gap-6 md:grid-cols-2">
        {experiments.map((experiment) => (
          <li key={experiment.id}>
            <article className="card flex h-full flex-col gap-5 p-6 md:p-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl">{experiment.name}</h2>
                <p className="text-ink-muted">{experiment.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(experiment.id)}
                className="btn btn-primary mt-auto w-fit"
              >
                Abrir experimento
              </button>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
