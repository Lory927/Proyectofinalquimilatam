import type { MouseEvent } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/app/services/molecule-editor.service';
import type { EditorAtom, EditorBond, EditorElement, EditorMode } from '@/app/models/molecule-editor';

interface EditorCanvasProps {
  atoms: EditorAtom[];
  bonds: EditorBond[];
  mode: EditorMode;
  pendingAtomId: number | null;
  onCanvasClick: (x: number, y: number) => void;
  onAtomClick: (atomId: number) => void;
  onBondClick: (bondIndex: number) => void;
}

const ATOM_RADIUS = 22;

const ATOM_FILLS: Record<EditorElement, string> = {
  H: '#475569',
  C: '#1F2937',
  N: '#1D4ED8',
  O: '#B91C1C',
  F: '#15803D',
  Cl: '#0F766E',
};

const BOND_OFFSETS: Record<1 | 2 | 3, number[]> = {
  1: [0],
  2: [-4, 4],
  3: [-6, 0, 6],
};

function bondLines(from: EditorAtom, to: EditorAtom, order: 1 | 2 | 3) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const perpX = -dy / length;
  const perpY = dx / length;
  return BOND_OFFSETS[order].map((offset) => ({
    x1: from.x + perpX * offset,
    y1: from.y + perpY * offset,
    x2: to.x + perpX * offset,
    y2: to.y + perpY * offset,
  }));
}

export default function EditorCanvas({
  atoms,
  bonds,
  mode,
  pendingAtomId,
  onCanvasClick,
  onAtomClick,
  onBondClick,
}: EditorCanvasProps) {
  const atomById = new Map(atoms.map((atom) => [atom.id, atom]));

  const handleBackgroundClick = (event: MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    onCanvasClick(
      ((event.clientX - rect.left) / rect.width) * CANVAS_WIDTH,
      ((event.clientY - rect.top) / rect.height) * CANVAS_HEIGHT,
    );
  };

  return (
    <div className="relative w-full overflow-hidden rounded-card bg-surface ring-1 ring-inset ring-ink/10 [background-image:radial-gradient(#D9D5F2_1px,transparent_1px)] [background-size:16px_16px]">
      <svg
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        role="application"
        aria-label="Lienzo de moléculas"
        onClick={handleBackgroundClick}
        className={`block h-auto w-full touch-manipulation ${mode === 'add' ? 'cursor-crosshair' : 'cursor-default'}`}
      >
        {bonds.map((bond, index) => {
          const from = atomById.get(bond.from);
          const to = atomById.get(bond.to);
          if (!from || !to) {
            return null;
          }
          const lines = bondLines(from, to, bond.order);
          const isErasable = mode === 'erase';
          return (
            <g
              key={`${bond.from}-${bond.to}`}
              onClick={(event) => {
                event.stopPropagation();
                if (isErasable) {
                  onBondClick(index);
                }
              }}
              className={isErasable ? 'cursor-pointer' : undefined}
              aria-label={`Enlace de orden ${bond.order}`}
            >
              <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="transparent" strokeWidth={18} />
              {lines.map((line, lineIndex) => (
                <line
                  key={lineIndex}
                  {...line}
                  stroke="#1E1763"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  className="pointer-events-none"
                />
              ))}
            </g>
          );
        })}

        {atoms.map((atom) => {
          const isPending = atom.id === pendingAtomId;
          return (
            <g
              key={atom.id}
              role="button"
              tabIndex={0}
              aria-label={`Átomo de ${atom.element}`}
              onClick={(event) => {
                event.stopPropagation();
                onAtomClick(atom.id);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onAtomClick(atom.id);
                }
              }}
              className="cursor-pointer focus:outline-none"
            >
              {isPending && (
                <circle cx={atom.x} cy={atom.y} r={ATOM_RADIUS + 6} fill="none" stroke="#692FF4" strokeWidth={3} />
              )}
              <circle cx={atom.x} cy={atom.y} r={ATOM_RADIUS} fill={ATOM_FILLS[atom.element]} />
              <text
                x={atom.x}
                y={atom.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#FFFFFF"
                fontSize={atom.element.length > 1 ? 15 : 18}
                fontWeight={700}
                className="pointer-events-none select-none"
              >
                {atom.element}
              </text>
            </g>
          );
        })}
      </svg>

      {atoms.length === 0 && (
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center p-6 text-center text-lg text-ink-muted">
          Tu lienzo está vacío. Elige un átomo y tócalo para empezar.
        </p>
      )}
    </div>
  );
}
