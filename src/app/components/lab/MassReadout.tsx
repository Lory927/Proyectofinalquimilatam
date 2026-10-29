import type { MassReactionResult } from '@/app/services/lab-simulation.service';

interface MassReadoutProps {
  result: MassReactionResult;
  equation: string;
}

function formatGrams(value: number): string {
  return `${value.toFixed(2)} g`;
}

export default function MassReadout({ result, equation }: MassReadoutProps) {
  const limitingText =
    result.limitingFormulas.length === result.reactants.length
      ? 'Ningún reactivo sobra: ambos se consumen por completo.'
      : `Se agota ${result.limitingFormulas.join(' y ')}.`;

  return (
    <section aria-labelledby="mass-result-title" className="card flex flex-col gap-6 p-6 md:p-8">
      <div className="flex flex-col gap-2">
        <h2 id="mass-result-title" className="text-lg">
          Resultado
        </h2>
        <p className="font-heading text-xl font-bold text-primary">{equation}</p>
      </div>

      <ul className="flex flex-col gap-3">
        {result.reactants.map((reactant) => (
          <li key={reactant.formula} className="flex flex-wrap justify-between gap-2 rounded-btn bg-canvas p-4">
            <span className="font-bold text-ink">{reactant.formula} que queda</span>
            <span className="tabular-nums text-ink">
              {formatGrams(reactant.left)} de {formatGrams(reactant.given)}
            </span>
          </li>
        ))}
        <li className="flex flex-wrap justify-between gap-2 rounded-btn bg-canvas p-4">
          <span className="font-bold text-ink">Producto formado</span>
          <span className="tabular-nums text-ink">{formatGrams(result.productMass)}</span>
        </li>
      </ul>

      <p className="text-base text-ink">{limitingText}</p>

      <div
        className={`rounded-btn p-4 text-base font-semibold ${
          result.conserved ? 'bg-success-soft text-success-text' : 'bg-warning-soft text-warning-text'
        }`}
      >
        Masa antes: {formatGrams(result.totalBefore)} · Masa después: {formatGrams(result.totalAfter)}
        {result.conserved ? '. La materia se conserva.' : '. Revisa los valores.'}
      </div>
    </section>
  );
}
