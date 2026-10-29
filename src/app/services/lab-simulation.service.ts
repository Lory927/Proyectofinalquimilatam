import type { ExperimentModel, PhSolution, ReactionSpecies } from '@/app/models/experiment';

export type PhModel = Extract<ExperimentModel, { kind: 'ph' }>;
export type MassConservationModel = Extract<ExperimentModel, { kind: 'conservacion-masa' }>;

export const PH_VARIABLE_IDS = { solution: 'solucion', dilution: 'dilucion' } as const;
export const MASS_VARIABLE_IDS = { hydrogen: 'hidrogeno', oxygen: 'oxigeno' } as const;

export type PhDilution = 'concentrated' | 'diluted';
export type PhCategory = 'acida' | 'neutra' | 'basica';

export interface PhReading {
  ph: number;
  category: PhCategory;
  note: string;
}

export interface ReactantOutcome {
  formula: string;
  given: number;
  left: number;
}

export interface MassReactionResult {
  reactants: ReactantOutcome[];
  limitingFormulas: string[];
  productMass: number;
  totalBefore: number;
  totalAfter: number;
  conserved: boolean;
}

const EMPTY_TOLERANCE = 1e-9;
const CONSERVATION_TOLERANCE = 1e-6;

export function classifyPh(ph: number): PhCategory {
  if (ph < 7) {
    return 'acida';
  }
  if (ph > 7) {
    return 'basica';
  }
  return 'neutra';
}

export function readPh(solution: PhSolution, dilution: PhDilution): PhReading {
  const ph = solution.ph[dilution];
  return { ph, category: classifyPh(ph), note: solution.note };
}

export function readPhFromSelections(model: PhModel, selections: Record<string, string>): PhReading | null {
  const solution = model.solutions.find((item) => item.id === selections[PH_VARIABLE_IDS.solution]);
  const dilution = selections[PH_VARIABLE_IDS.dilution];
  if (!solution || (dilution !== 'concentrated' && dilution !== 'diluted')) {
    return null;
  }
  return readPh(solution, dilution);
}

export function simulateMassReaction(
  reactants: ReactionSpecies[],
  products: ReactionSpecies[],
  masses: number[],
): MassReactionResult {
  const moles = reactants.map((reactant, index) => masses[index] / reactant.molarMass);
  const extent = Math.min(...reactants.map((reactant, index) => moles[index] / reactant.coefficient));

  const outcomes: ReactantOutcome[] = reactants.map((reactant, index) => ({
    formula: reactant.formula,
    given: masses[index],
    left: Math.max(0, (moles[index] - reactant.coefficient * extent) * reactant.molarMass),
  }));

  const productMass = products.reduce(
    (sum, product) => sum + product.coefficient * extent * product.molarMass,
    0,
  );
  const totalBefore = masses.reduce((sum, mass) => sum + mass, 0);
  const totalAfter = productMass + outcomes.reduce((sum, outcome) => sum + outcome.left, 0);

  return {
    reactants: outcomes,
    limitingFormulas: outcomes
      .filter((outcome) => outcome.left < EMPTY_TOLERANCE)
      .map((outcome) => outcome.formula),
    productMass,
    totalBefore,
    totalAfter,
    conserved: Math.abs(totalBefore - totalAfter) < CONSERVATION_TOLERANCE,
  };
}

export function simulateMassFromSelections(
  model: MassConservationModel,
  selections: Record<string, string>,
): MassReactionResult | null {
  const masses = [Number(selections[MASS_VARIABLE_IDS.hydrogen]), Number(selections[MASS_VARIABLE_IDS.oxygen])];
  if (!masses.every((mass) => Number.isFinite(mass) && mass > 0)) {
    return null;
  }
  return simulateMassReaction(model.reactants, model.products, masses);
}

export function formatReaction(reactants: ReactionSpecies[], products: ReactionSpecies[]): string {
  const side = (species: ReactionSpecies[]) =>
    species.map((item) => (item.coefficient > 1 ? `${item.coefficient} ${item.formula}` : item.formula)).join(' + ');
  return `${side(reactants)} → ${side(products)}`;
}
