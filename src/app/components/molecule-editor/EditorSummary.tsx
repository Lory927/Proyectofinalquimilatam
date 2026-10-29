import { toSubscriptFormula, buildFormula, findKnownMolecule, totalFreeValence } from '@/app/services/molecule-editor.service';
import type { EditorAtom, EditorBond } from '@/app/models/molecule-editor';

interface EditorSummaryProps {
  atoms: EditorAtom[];
  bonds: EditorBond[];
}

export default function EditorSummary({ atoms, bonds }: EditorSummaryProps) {
  const isEmpty = atoms.length === 0;
  const formula = toSubscriptFormula(buildFormula(atoms));
  const known = findKnownMolecule(atoms);
  const freeBonds = totalFreeValence(atoms, bonds);

  return (
    <section aria-labelledby="editor-summary-title" className="card flex flex-col gap-5 p-6">
      <h2 id="editor-summary-title" className="text-lg">
        Tu molécula
      </h2>

      <dl className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <dt className="text-base text-ink-muted">Fórmula</dt>
          <dd className="font-heading text-2xl font-bold text-ink">{isEmpty ? '—' : formula}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-base text-ink-muted">Enlaces libres</dt>
          <dd className="font-heading text-2xl font-bold tabular-nums text-ink">{isEmpty ? '—' : freeBonds}</dd>
        </div>
      </dl>

      {known ? (
        <p className="rounded-btn bg-success-soft p-4 text-base font-semibold text-success-text">
          Es {known.name}. {known.description}
        </p>
      ) : (
        <p className="rounded-btn bg-canvas p-4 text-base text-ink-muted">
          {isEmpty
            ? 'Aún no hay átomos en el lienzo.'
            : 'Esta combinación no coincide con ninguna molécula de la biblioteca.'}
        </p>
      )}
    </section>
  );
}
