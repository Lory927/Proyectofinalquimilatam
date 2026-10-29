import { useState } from 'react';
import GameHeader from '@/app/components/game/GameHeader';
import MassReadout from '@/app/components/lab/MassReadout';
import PhReadout from '@/app/components/lab/PhReadout';
import VariableControls from '@/app/components/lab/VariableControls';
import type { Experiment } from '@/app/models/experiment';
import {
  formatReaction,
  readPhFromSelections,
  simulateMassFromSelections,
} from '@/app/services/lab-simulation.service';

interface ExperimentBenchProps {
  experiment: Experiment;
  onBack: () => void;
}

function initialSelections(experiment: Experiment): Record<string, string> {
  return Object.fromEntries(
    experiment.variables.map((variable) => [variable.id, variable.options[0]?.value ?? '']),
  );
}

export default function ExperimentBench({ experiment, onBack }: ExperimentBenchProps) {
  const [selections, setSelections] = useState(() => initialSelections(experiment));
  const model = experiment.model;

  const changeSelection = (variableId: string, value: string) =>
    setSelections((previous) => ({ ...previous, [variableId]: value }));

  const phReading = model.kind === 'ph' ? readPhFromSelections(model, selections) : null;
  const massResult = model.kind === 'conservacion-masa' ? simulateMassFromSelections(model, selections) : null;
  const hasResult = model.kind === 'ph' ? phReading !== null : massResult !== null;

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <GameHeader title={experiment.name} onExit={onBack} />

      <p className="max-w-prose text-lg text-ink-muted">{experiment.description}</p>

      <section aria-labelledby="variables-title" className="card flex flex-col gap-6 p-6 md:p-8">
        <h2 id="variables-title" className="text-lg">
          Cambia las variables
        </h2>
        <VariableControls variables={experiment.variables} selections={selections} onChange={changeSelection} />
      </section>

      {!hasResult && (
        <p role="alert" className="rounded-btn bg-error-soft p-4 text-base font-semibold text-error">
          No pudimos calcular este resultado. Prueba con otra combinación de variables.
        </p>
      )}
      {model.kind === 'ph' && phReading && <PhReadout reading={phReading} />}
      {model.kind === 'conservacion-masa' && massResult && (
        <MassReadout result={massResult} equation={formatReaction(model.reactants, model.products)} />
      )}

      <section aria-labelledby="explanation-title" className="flex flex-col gap-3">
        <h2 id="explanation-title" className="text-lg">
          ¿Qué está pasando?
        </h2>
        <p className="text-lg text-ink">{experiment.explanation}</p>
      </section>

      <section aria-labelledby="safety-title" className="rounded-card bg-highlight-soft p-6">
        <h2 id="safety-title" className="mb-3 text-lg">
          Seguridad
        </h2>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-base text-ink">
          {experiment.safetyNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <p className="text-base text-ink-muted">{experiment.simulationNotice}</p>
    </div>
  );
}
