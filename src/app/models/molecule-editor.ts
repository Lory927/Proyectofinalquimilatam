import type { MoleculeBond } from '@/app/models/chemistry';

export const EDITOR_ELEMENTS = ['H', 'C', 'N', 'O', 'F', 'Cl'] as const;

export type EditorElement = (typeof EDITOR_ELEMENTS)[number];

export interface EditorAtom {
  id: number;
  element: EditorElement;
  x: number;
  y: number;
}

export type EditorBond = MoleculeBond;

export type EditorMode = 'add' | 'bond' | 'erase';
