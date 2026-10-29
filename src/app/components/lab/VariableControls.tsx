import type { ExperimentVariable } from '@/app/models/experiment';

interface VariableControlsProps {
  variables: ExperimentVariable[];
  selections: Record<string, string>;
  onChange: (variableId: string, value: string) => void;
}

export default function VariableControls({ variables, selections, onChange }: VariableControlsProps) {
  return (
    <div className="flex flex-col gap-6">
      {variables.map((variable) => (
        <fieldset key={variable.id} className="flex flex-col gap-3">
          <legend className="mb-3 text-lg font-bold text-ink">{variable.label}</legend>
          <div className="flex flex-wrap gap-2">
            {variable.options.map((option) => {
              const isActive = selections[variable.id] === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onChange(variable.id, option.value)}
                  className={`btn px-4 py-2 text-base ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
