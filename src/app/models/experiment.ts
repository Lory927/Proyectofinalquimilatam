export interface ExperimentOption {
  value: string;
  label: string;
}

export interface ExperimentVariable {
  id: string;
  label: string;
  options: ExperimentOption[];
}

export interface PhSolution {
  id: string;
  name: string;
  // Valores aproximados con fines educativos
  ph: {
    concentrated: number;
    diluted: number;
  };
  note: string;
}

export interface ReactionSpecies {
  formula: string;
  molarMass: number;
  coefficient: number;
}

export type ExperimentModel =
  | { kind: 'ph'; solutions: PhSolution[] }
  | {
      kind: 'conservacion-masa';
      reactants: ReactionSpecies[];
      products: ReactionSpecies[];
    };

export interface Experiment {
  id: string;
  name: string;
  description: string;
  variables: ExperimentVariable[];
  model: ExperimentModel;
  explanation: string;
  safetyNotes: string[];
  simulationNotice: string;
}
