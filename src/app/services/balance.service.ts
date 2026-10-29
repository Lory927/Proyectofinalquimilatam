import type { Equation } from '@/app/models/quiz';
import { getEquations } from '@/app/services/chemistry-data.service';
import { shuffle } from '@/app/services/random.service';

export function createEquationDeck(): Equation[] {
  return shuffle(getEquations());
}

export function speciesCount(equation: Equation): number {
  return equation.reactants.length + equation.products.length;
}

export function parseCoefficients(inputs: string[]): number[] | null {
  const values = inputs.map((value) => value.trim());
  if (values.some((value) => !/^\d+$/.test(value))) {
    return null;
  }
  const numbers = values.map(Number);
  return numbers.every((value) => value >= 1) ? numbers : null;
}

export function isBalanced(equation: Equation, coefficients: number[]): boolean {
  return coefficients.length === equation.solution.length && coefficients.every((value, i) => value === equation.solution[i]);
}
