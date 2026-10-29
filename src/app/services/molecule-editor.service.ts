import type { Molecule } from '@/app/models/chemistry';
import type { EditorAtom, EditorBond, EditorElement } from '@/app/models/molecule-editor';
import { getMolecules } from '@/app/services/chemistry-data.service';
import { normalizeSearchText } from '@/app/services/search.service';

export const CANVAS_WIDTH = 480;
export const CANVAS_HEIGHT = 320;
const CANVAS_MARGIN = 28;

export const VALENCE: Record<EditorElement, number> = {
  H: 1,
  C: 4,
  N: 3,
  O: 2,
  F: 1,
  Cl: 1,
};

const SUBSCRIPT_MAP: Record<string, string> = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
};

export function usedValence(atomId: number, bonds: EditorBond[]): number {
  return bonds
    .filter((bond) => bond.from === atomId || bond.to === atomId)
    .reduce((sum, bond) => sum + bond.order, 0);
}

export function freeValence(atom: EditorAtom, bonds: EditorBond[]): number {
  return VALENCE[atom.element] - usedValence(atom.id, bonds);
}

export function addAtom(atoms: EditorAtom[], element: EditorElement, x: number, y: number): EditorAtom[] {
  const id = atoms.reduce((max, atom) => Math.max(max, atom.id), 0) + 1;
  const clamp = (value: number, max: number) => Math.min(max - CANVAS_MARGIN, Math.max(CANVAS_MARGIN, value));
  return [...atoms, { id, element, x: clamp(x, CANVAS_WIDTH), y: clamp(y, CANVAS_HEIGHT) }];
}

export type BondResult =
  | { ok: true; bonds: EditorBond[] }
  | { ok: false; reason: 'same-atom' | 'missing-atom' | 'no-valence' };

export function linkAtoms(atoms: EditorAtom[], bonds: EditorBond[], fromId: number, toId: number): BondResult {
  if (fromId === toId) {
    return { ok: false, reason: 'same-atom' };
  }
  const from = atoms.find((atom) => atom.id === fromId);
  const to = atoms.find((atom) => atom.id === toId);
  if (!from || !to) {
    return { ok: false, reason: 'missing-atom' };
  }

  const existing = bonds.find(
    (bond) => (bond.from === fromId && bond.to === toId) || (bond.from === toId && bond.to === fromId),
  );
  if (existing) {
    if (existing.order >= 3) {
      return { ok: false, reason: 'no-valence' };
    }
    if (freeValence(from, bonds) < 1 || freeValence(to, bonds) < 1) {
      return { ok: false, reason: 'no-valence' };
    }
    return {
      ok: true,
      bonds: bonds.map((bond) => (bond === existing ? { ...bond, order: (bond.order + 1) as 1 | 2 | 3 } : bond)),
    };
  }

  if (freeValence(from, bonds) < 1 || freeValence(to, bonds) < 1) {
    return { ok: false, reason: 'no-valence' };
  }
  return { ok: true, bonds: [...bonds, { from: fromId, to: toId, order: 1 }] };
}

export function removeAtom(atoms: EditorAtom[], bonds: EditorBond[], atomId: number) {
  return {
    atoms: atoms.filter((atom) => atom.id !== atomId),
    bonds: bonds.filter((bond) => bond.from !== atomId && bond.to !== atomId),
  };
}

export function removeBond(bonds: EditorBond[], index: number): EditorBond[] {
  return bonds.filter((_, bondIndex) => bondIndex !== index);
}

// Notación de Hill: carbono primero, hidrógeno después y el resto en orden alfabético.
const HILL_RANK: Record<string, number> = { C: 0, H: 1 };

export function buildFormula(atoms: EditorAtom[]): string {
  const counts = new Map<string, number>();
  for (const atom of atoms) {
    counts.set(atom.element, (counts.get(atom.element) ?? 0) + 1);
  }
  const order = [...counts.keys()].sort(
    (a, b) => (HILL_RANK[a] ?? 2) - (HILL_RANK[b] ?? 2) || a.localeCompare(b),
  );
  return order
    .map((symbol) => {
      const count = counts.get(symbol) ?? 0;
      return count > 1 ? `${symbol}${count}` : symbol;
    })
    .join('');
}

export function toSubscriptFormula(formula: string): string {
  return formula.replace(/[0-9]/g, (digit) => SUBSCRIPT_MAP[digit] ?? digit);
}

export function findKnownMolecule(atoms: EditorAtom[]): Molecule | undefined {
  if (atoms.length === 0) {
    return undefined;
  }
  const formula = normalizeSearchText(buildFormula(atoms));
  return getMolecules().find((molecule) => normalizeSearchText(molecule.formula) === formula);
}

export function totalFreeValence(atoms: EditorAtom[], bonds: EditorBond[]): number {
  return atoms.reduce((sum, atom) => sum + freeValence(atom, bonds), 0);
}
