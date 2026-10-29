export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CompoundPair {
  name: string;
  formula: string;
}

// solution: coeficientes en el orden de reactivos y luego productos
export interface Equation {
  id: string;
  reactants: string[];
  products: string[];
  solution: number[];
  hint: string;
}
