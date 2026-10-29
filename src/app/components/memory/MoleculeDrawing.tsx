import type { LaidOutBond, MoleculeLayout } from '@/app/services/molecule-layout.service';

interface MoleculeDrawingProps {
  layout: MoleculeLayout;
}

const ATOM_COLORS: Record<string, string> = {
  C: '#1E1763',
  H: '#5B5580',
  O: '#DC2626',
  N: '#692FF4',
};
const DEFAULT_ATOM_COLOR = '#15803D';
const ATOM_RADIUS = 15;
const DOUBLE_BOND_OFFSET = 4;
const TRIPLE_BOND_OFFSET = 6;

function bondLines(bond: LaidOutBond): { x1: number; y1: number; x2: number; y2: number }[] {
  const { x1, y1, x2, y2, order } = bond;
  if (order === 1) {
    return [{ x1, y1, x2, y2 }];
  }
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy) || 1;
  const offsets = order === 2 ? [-DOUBLE_BOND_OFFSET, DOUBLE_BOND_OFFSET] : [-TRIPLE_BOND_OFFSET, 0, TRIPLE_BOND_OFFSET];
  return offsets.map((offset) => {
    const shiftX = (-dy / length) * offset;
    const shiftY = (dx / length) * offset;
    return { x1: x1 + shiftX, y1: y1 + shiftY, x2: x2 + shiftX, y2: y2 + shiftY };
  });
}

export default function MoleculeDrawing({ layout }: MoleculeDrawingProps) {
  return (
    <svg viewBox={`0 0 ${layout.width} ${layout.height}`} className="h-full w-full" aria-hidden="true" focusable="false">
      {layout.bonds.flatMap((bond, bondIndex) =>
        bondLines(bond).map((line, lineIndex) => (
          <line
            key={`bond-${bondIndex}-${lineIndex}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#1E1763"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )),
      )}
      {layout.atoms.map((atom, index) => {
        const color = ATOM_COLORS[atom.symbol] ?? DEFAULT_ATOM_COLOR;
        return (
          <g key={`atom-${index}`}>
            <circle cx={atom.x} cy={atom.y} r={ATOM_RADIUS} fill="#FFFFFF" stroke={color} strokeWidth="2.5" />
            <text
              x={atom.x}
              y={atom.y}
              dy="0.35em"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={color}
              className="font-heading"
            >
              {atom.symbol}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
