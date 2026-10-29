import type { Molecule } from '@/app/models/chemistry';
import { normalizeSearchText } from '@/app/services/search.service';

export type MoleculeKindFilter = 'todas' | Molecule['kind'];

export const MOLECULE_KIND_LABELS: Record<Molecule['kind'], string> = {
  molecula: 'Molécula',
  'compuesto-ionico': 'Compuesto iónico',
};

export function filterMolecules(molecules: Molecule[], query: string, kind: MoleculeKindFilter): Molecule[] {
  const term = normalizeSearchText(query);

  return molecules.filter((molecule) => {
    if (kind !== 'todas' && molecule.kind !== kind) {
      return false;
    }
    if (term === '') {
      return true;
    }
    return [molecule.name, molecule.formula].some((value) => normalizeSearchText(value).includes(term));
  });
}
