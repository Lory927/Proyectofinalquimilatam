import { Eraser, Link2, MousePointer2, RotateCcw } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getElementBySymbol } from '@/app/services/chemistry-data.service';
import { EDITOR_ELEMENTS, type EditorElement, type EditorMode } from '@/app/models/molecule-editor';

interface EditorToolbarProps {
  mode: EditorMode;
  element: EditorElement;
  canReset: boolean;
  onModeChange: (mode: EditorMode) => void;
  onElementChange: (element: EditorElement) => void;
  onReset: () => void;
}

const MODES: { id: EditorMode; label: string; icon: LucideIcon }[] = [
  { id: 'add', label: 'Añadir átomo', icon: MousePointer2 },
  { id: 'bond', label: 'Unir átomos', icon: Link2 },
  { id: 'erase', label: 'Borrar', icon: Eraser },
];

export default function EditorToolbar({
  mode,
  element,
  canReset,
  onModeChange,
  onElementChange,
  onReset,
}: EditorToolbarProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Herramienta" className="flex flex-wrap gap-2">
          {MODES.map((item) => {
            const Icon = item.icon;
            const isActive = mode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onModeChange(item.id)}
                className={`btn px-4 py-2 text-base ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              >
                <Icon size={20} aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </div>
        <button type="button" onClick={onReset} disabled={!canReset} className="btn btn-secondary px-4 py-2 text-base">
          <RotateCcw size={20} aria-hidden="true" />
          Limpiar
        </button>
      </div>

      {mode === 'add' && (
        <div role="group" aria-label="Átomo a colocar" className="flex flex-wrap gap-2">
          {EDITOR_ELEMENTS.map((symbol) => {
            const isActive = element === symbol;
            const name = getElementBySymbol(symbol)?.name ?? symbol;
            return (
              <button
                key={symbol}
                type="button"
                aria-pressed={isActive}
                onClick={() => onElementChange(symbol)}
                className={`btn px-4 py-2 text-base ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              >
                <span className="font-heading text-lg font-bold">{symbol}</span>
                <span className="hidden sm:inline">{name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
