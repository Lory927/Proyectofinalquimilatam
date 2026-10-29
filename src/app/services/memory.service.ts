import { getCompoundPairs, getMolecules } from '@/app/services/chemistry-data.service';
import { layoutMolecule, type MoleculeLayout } from '@/app/services/molecule-layout.service';
import { shuffle } from '@/app/services/random.service';

export type MemoryCardContent = { kind: 'text'; text: string } | { kind: 'structure'; layout: MoleculeLayout };

export interface MemoryPair {
  id: string;
  first: MemoryCardContent;
  second: MemoryCardContent;
}

export interface MemoryCard {
  id: string;
  pairId: string;
  content: MemoryCardContent;
}

const FORMULA_PAIR_COUNT = 8;
const MOLECULE_PAIR_COUNT = 6;
const MAX_STRUCTURE_ATOMS = 9;

export function buildDeck(pairs: MemoryPair[]): MemoryCard[] {
  const cards = pairs.flatMap((pair) => [
    { id: `${pair.id}-a`, pairId: pair.id, content: pair.first },
    { id: `${pair.id}-b`, pairId: pair.id, content: pair.second },
  ]);
  return shuffle(cards);
}

export function isMemoryMatch(a: MemoryCard, b: MemoryCard): boolean {
  return a.pairId === b.pairId;
}

export function createFormulaPairs(): MemoryPair[] {
  return shuffle(getCompoundPairs())
    .slice(0, FORMULA_PAIR_COUNT)
    .map((pair, index) => ({
      id: `formula-${index}`,
      first: { kind: 'text', text: pair.name },
      second: { kind: 'text', text: pair.formula },
    }));
}

export function createMoleculePairs(): MemoryPair[] {
  const candidates = getMolecules().flatMap((molecule) =>
    molecule.structure && molecule.structure.atoms.length <= MAX_STRUCTURE_ATOMS
      ? [{ molecule, structure: molecule.structure }]
      : [],
  );
  return shuffle(candidates)
    .slice(0, MOLECULE_PAIR_COUNT)
    .map(({ molecule, structure }, index) => ({
      id: `molecule-${index}`,
      first: { kind: 'structure', layout: layoutMolecule(structure) },
      second: { kind: 'text', text: Math.random() < 0.5 ? molecule.name : molecule.formula },
    }));
}
