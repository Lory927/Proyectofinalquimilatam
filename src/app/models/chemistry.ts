export type ElementCategory =
  | 'metal-alcalino'
  | 'metal-alcalinoterreo'
  | 'metal-transicion'
  | 'metal-postransicion'
  | 'metaloide'
  | 'no-metal'
  | 'halogeno'
  | 'gas-noble';

export type PhysicalState = 'sólido' | 'líquido' | 'gas';

export interface ChemicalElement {
  // El símbolo es el identificador único del elemento
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: number;
  group: number;
  period: number;
  category: ElementCategory;
  properties: {
    stateAtRoomTemp: PhysicalState;
    electronegativity?: number;
  };
  uses: string[];
  funFact: string;
}

export interface MoleculeBond {
  from: number;
  to: number;
  order: 1 | 2 | 3;
}

export interface MoleculeStructure {
  // Símbolos químicos de cada átomo, indexados desde 0
  atoms: string[];
  bonds: MoleculeBond[];
}

export interface MoleculeComposition {
  element: string;
  count: number;
}

export interface Molecule {
  id: string;
  name: string;
  formula: string;
  kind: 'molecula' | 'compuesto-ionico';
  composition: MoleculeComposition[];
  atomCount: number;
  description: string;
  uses: string[];
  representation: {
    style: 'estructural' | 'esqueleto' | 'red-ionica';
    note: string;
  };
  structure: MoleculeStructure | null;
}
