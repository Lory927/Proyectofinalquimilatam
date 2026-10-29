import { useState } from 'react';
import GameHeader from '@/app/components/game/GameHeader';
import ElementDetail from '@/app/components/periodic-table/ElementDetail';
import { ELEMENT_CATEGORY_LABELS, ELEMENT_CATEGORY_STYLES } from '@/app/config/element-categories';
import type { ChemicalElement, ElementCategory } from '@/app/models/chemistry';
import { getElements } from '@/app/services/chemistry-data.service';
import { markElementViewed } from '@/app/services/progress.service';

interface PeriodicTableProps {
  onExit: () => void;
}

const LEGEND_CATEGORIES = Object.keys(ELEMENT_CATEGORY_LABELS) as ElementCategory[];

export default function PeriodicTable({ onExit }: PeriodicTableProps) {
  const elements = getElements();
  const [selected, setSelected] = useState<ChemicalElement | null>(null);

  const selectElement = (element: ChemicalElement) => {
    markElementViewed(element.symbol);
    setSelected(element);
  };

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <GameHeader title="Tabla periódica" label={`${elements.length} elementos`} onExit={onExit} />

      <p className="max-w-prose text-lg text-ink-muted">
        Cada casilla es un elemento. Toca uno para conocer su número atómico, su estado y para qué se usa.
      </p>

      <div className="flex flex-col gap-4">
        <div className="-mx-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          <ul
            aria-label="Elementos de la tabla periódica"
            className="grid min-w-[720px] gap-1.5 md:gap-2"
            style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}
          >
            {elements.map((element) => (
              <li
                key={element.symbol}
                className="aspect-square"
                style={{ gridColumn: element.group, gridRow: element.period }}
              >
                <button
                  type="button"
                  onClick={() => selectElement(element)}
                  aria-label={`${element.name}, número atómico ${element.atomicNumber}`}
                  className={`flex h-full w-full flex-col items-center justify-center rounded-btn shadow-btn transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${ELEMENT_CATEGORY_STYLES[element.category]}`}
                >
                  <span className="text-xs font-semibold leading-none">{element.atomicNumber}</span>
                  <span className="font-heading text-base font-bold leading-tight md:text-lg">{element.symbol}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-base text-ink-muted md:hidden">Desliza la tabla hacia los lados para verla completa.</p>
      </div>

      <section aria-labelledby="legend-title" className="card flex flex-col gap-4 p-6">
        <h2 id="legend-title" className="text-lg">
          Tipos de elementos
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LEGEND_CATEGORIES.map((category) => (
            <li key={category} className="flex items-center gap-3 text-base text-ink">
              <span className={`h-6 w-6 shrink-0 rounded-md ${ELEMENT_CATEGORY_STYLES[category]}`} aria-hidden="true" />
              {ELEMENT_CATEGORY_LABELS[category]}
            </li>
          ))}
        </ul>
      </section>

      {selected && <ElementDetail element={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
