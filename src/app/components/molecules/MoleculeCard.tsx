import MoleculeVisual from '@/app/components/molecules/MoleculeVisual';
import type { Molecule } from '@/app/models/chemistry';
import { MOLECULE_KIND_LABELS } from '@/app/services/molecule-explorer.service';

interface MoleculeCardProps {
  molecule: Molecule;
  onSelect: (molecule: Molecule) => void;
}

export default function MoleculeCard({ molecule, onSelect }: MoleculeCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(molecule)}
      className="card flex h-full w-full flex-col gap-4 p-5 text-left transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="aspect-[6/5] w-full rounded-card bg-canvas p-3">
        <MoleculeVisual molecule={molecule} />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg">{molecule.name}</h3>
        <p className="font-heading text-xl font-bold text-primary">{molecule.formula}</p>
        <p className="text-base text-ink-muted">{MOLECULE_KIND_LABELS[molecule.kind]}</p>
      </div>
    </button>
  );
}
