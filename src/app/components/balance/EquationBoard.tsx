import { ArrowRight } from 'lucide-react';
import type { Equation } from '@/app/models/quiz';

interface EquationBoardProps {
  equation: Equation;
  inputs: string[];
  locked: boolean;
  onChange: (position: number, value: string) => void;
  onCheck: () => void;
}

interface SpeciesFieldProps {
  formula: string;
  position: number;
  value: string;
  locked: boolean;
  onChange: (position: number, value: string) => void;
}

function SpeciesField({ formula, position, value, locked, onChange }: SpeciesFieldProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        inputMode="numeric"
        value={value}
        readOnly={locked}
        placeholder="?"
        aria-label={`Coeficiente de ${formula}`}
        onChange={(event) => onChange(position, event.target.value)}
        className="h-14 w-16 rounded-btn border-2 border-ink/20 bg-surface text-center text-2xl font-bold text-ink read-only:bg-canvas"
      />
      <span className="font-heading text-2xl font-bold text-ink">{formula}</span>
    </div>
  );
}

export default function EquationBoard({ equation, inputs, locked, onChange, onCheck }: EquationBoardProps) {
  const reactantCount = equation.reactants.length;

  return (
    <form
      className="card flex flex-col gap-8 p-6 md:p-10"
      onSubmit={(event) => {
        event.preventDefault();
        onCheck();
      }}
    >
      <p className="text-lg text-ink-muted">Escribe el número que va delante de cada sustancia para que los átomos queden iguales a ambos lados.</p>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6">
        {[...equation.reactants, ...equation.products].map((formula, position) => (
          <div key={`${formula}-${position}`} className="flex items-center gap-4">
            {position === reactantCount && (
              <ArrowRight size={28} aria-hidden="true" className="text-ink-muted" />
            )}
            {position > 0 && position !== reactantCount && (
              <span aria-hidden="true" className="text-2xl font-bold text-ink-muted">
                +
              </span>
            )}
            <SpeciesField
              formula={formula}
              position={position}
              value={inputs[position] ?? ''}
              locked={locked}
              onChange={onChange}
            />
          </div>
        ))}
      </div>

      {!locked && (
        <button type="submit" className="btn btn-primary w-full sm:w-auto sm:self-end">
          Comprobar
        </button>
      )}
    </form>
  );
}
