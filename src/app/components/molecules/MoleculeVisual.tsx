import MoleculeDrawing from '@/app/components/memory/MoleculeDrawing';
import type { Molecule } from '@/app/models/chemistry';
import { layoutMolecule } from '@/app/services/molecule-layout.service';

interface MoleculeVisualProps {
  molecule: Molecule;
}

export default function MoleculeVisual({ molecule }: MoleculeVisualProps) {
  if (!molecule.structure) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-card bg-primary-soft text-primary">
        <span className="font-heading text-2xl font-bold">{molecule.formula}</span>
        <span className="text-base font-semibold">Red de iones</span>
      </div>
    );
  }

  return <MoleculeDrawing layout={layoutMolecule(molecule.structure)} />;
}
