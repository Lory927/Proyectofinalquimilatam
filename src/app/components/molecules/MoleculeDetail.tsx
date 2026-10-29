import { X } from 'lucide-react';
import Dialog from '@/app/components/layout/Dialog';
import MoleculeVisual from '@/app/components/molecules/MoleculeVisual';
import type { Molecule } from '@/app/models/chemistry';
import { getElementBySymbol } from '@/app/services/chemistry-data.service';
import { MOLECULE_KIND_LABELS } from '@/app/services/molecule-explorer.service';

interface MoleculeDetailProps {
  molecule: Molecule;
  onClose: () => void;
}

const TITLE_ID = 'molecule-detail-title';

export default function MoleculeDetail({ molecule, onClose }: MoleculeDetailProps) {
  return (
    <Dialog titleId={TITLE_ID} onClose={onClose}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-base text-ink-muted">{MOLECULE_KIND_LABELS[molecule.kind]}</p>
          <h2 id={TITLE_ID} className="text-2xl md:text-3xl">
            {molecule.name}
          </h2>
          <p className="font-heading text-xl font-bold text-primary">{molecule.formula}</p>
        </div>
        <button type="button" onClick={onClose} className="btn btn-secondary shrink-0">
          <X size={20} aria-hidden="true" />
          Cerrar
        </button>
      </div>

      <div className="mx-auto aspect-[6/5] w-full max-w-xs rounded-card bg-canvas p-4">
        <MoleculeVisual molecule={molecule} />
      </div>
      {molecule.representation.note && (
        <p className="-mt-2 text-center text-base text-ink-muted">{molecule.representation.note}</p>
      )}

      <p className="text-lg text-ink">{molecule.description}</p>

      <div className="grid gap-6 md:grid-cols-2">
        <section aria-labelledby="molecule-composition-title" className="flex flex-col gap-3 rounded-btn bg-canvas p-5">
          <h3 id="molecule-composition-title" className="text-lg">
            Composición
          </h3>
          <ul className="flex flex-col gap-2 text-base text-ink">
            {molecule.composition.map((part) => (
              <li key={part.element} className="flex justify-between gap-4">
                <span>{getElementBySymbol(part.element)?.name ?? part.element}</span>
                <span className="font-bold tabular-nums">
                  {part.element} × {part.count}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="molecule-uses-title" className="flex flex-col gap-3 rounded-btn bg-canvas p-5">
          <h3 id="molecule-uses-title" className="text-lg">
            Usos cotidianos
          </h3>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-base text-ink">
            {molecule.uses.map((use) => (
              <li key={use}>{use}</li>
            ))}
          </ul>
        </section>
      </div>
    </Dialog>
  );
}
