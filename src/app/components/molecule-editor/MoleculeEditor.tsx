import { useState } from 'react';
import GameHeader from '@/app/components/game/GameHeader';
import EditorCanvas from '@/app/components/molecule-editor/EditorCanvas';
import EditorSummary from '@/app/components/molecule-editor/EditorSummary';
import EditorToolbar from '@/app/components/molecule-editor/EditorToolbar';
import type { EditorAtom, EditorBond, EditorElement, EditorMode } from '@/app/models/molecule-editor';
import {
  addAtom,
  linkAtoms,
  removeAtom,
  removeBond,
} from '@/app/services/molecule-editor.service';

interface MoleculeEditorProps {
  onExit: () => void;
}

const HINTS: Record<EditorMode, string> = {
  add: 'Toca el lienzo para colocar un átomo del tipo que elegiste.',
  bond: 'Toca un átomo y luego otro para unirlos. Otro toque en el mismo par aumenta el enlace.',
  erase: 'Toca un átomo o un enlace para quitarlo.',
};

const NOTICES: Record<'no-valence' | 'missing-atom', string> = {
  'no-valence': 'Ese enlace no es posible: uno de los átomos ya usó todos sus enlaces.',
  'missing-atom': 'No encontramos ese átomo. Vuelve a intentarlo.',
};

export default function MoleculeEditor({ onExit }: MoleculeEditorProps) {
  const [atoms, setAtoms] = useState<EditorAtom[]>([]);
  const [bonds, setBonds] = useState<EditorBond[]>([]);
  const [mode, setMode] = useState<EditorMode>('add');
  const [element, setElement] = useState<EditorElement>('C');
  const [pendingAtomId, setPendingAtomId] = useState<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const changeMode = (next: EditorMode) => {
    setMode(next);
    setPendingAtomId(null);
    setNotice(null);
  };

  const handleCanvasClick = (x: number, y: number) => {
    if (mode !== 'add') {
      return;
    }
    setAtoms((previous) => addAtom(previous, element, x, y));
    setNotice(null);
  };

  const handleAtomClick = (atomId: number) => {
    setNotice(null);
    if (mode === 'erase') {
      const next = removeAtom(atoms, bonds, atomId);
      setAtoms(next.atoms);
      setBonds(next.bonds);
      return;
    }
    if (mode !== 'bond') {
      return;
    }
    if (pendingAtomId === null) {
      setPendingAtomId(atomId);
      return;
    }
    setPendingAtomId(null);
    if (pendingAtomId === atomId) {
      return;
    }
    const result = linkAtoms(atoms, bonds, pendingAtomId, atomId);
    if (result.ok) {
      setBonds(result.bonds);
    } else if (result.reason !== 'same-atom') {
      setNotice(NOTICES[result.reason]);
    }
  };

  const handleBondClick = (bondIndex: number) => {
    if (mode === 'erase') {
      setBonds(removeBond(bonds, bondIndex));
    }
  };

  const reset = () => {
    setAtoms([]);
    setBonds([]);
    setPendingAtomId(null);
    setNotice(null);
  };

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <GameHeader title="Editor de moléculas" onExit={onExit} />

      <p className="max-w-prose text-lg text-ink-muted">
        Construye una molécula sencilla uniendo átomos. Cada átomo solo puede tener tantos enlaces como su valencia
        permite.
      </p>

      <section aria-label="Lienzo y herramientas" className="flex flex-col gap-6">
        <EditorToolbar
          mode={mode}
          element={element}
          canReset={atoms.length > 0}
          onModeChange={changeMode}
          onElementChange={setElement}
          onReset={reset}
        />

        <p className="text-base text-ink-muted" aria-live="polite">
          {pendingAtomId !== null && mode === 'bond' ? 'Ahora toca el segundo átomo.' : HINTS[mode]}
        </p>

        <EditorCanvas
          atoms={atoms}
          bonds={bonds}
          mode={mode}
          pendingAtomId={pendingAtomId}
          onCanvasClick={handleCanvasClick}
          onAtomClick={handleAtomClick}
          onBondClick={handleBondClick}
        />

        {notice && (
          <p role="alert" className="rounded-btn bg-warning-soft p-4 text-base font-semibold text-warning-text">
            {notice}
          </p>
        )}
      </section>

      <EditorSummary atoms={atoms} bonds={bonds} />
    </div>
  );
}
