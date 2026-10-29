import { useState } from 'react';
import Dialog from '@/app/components/layout/Dialog';
import type { SectionId } from '@/app/config/sections';
import { searchChemistry, type SearchCategory } from '@/app/services/search.service';

interface GlobalSearchDialogProps {
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
}

const TITLE_ID = 'global-search-title';

const CATEGORIES: { id: SearchCategory; label: string }[] = [
  { id: 'elementos', label: 'Elementos' },
  { id: 'moleculas', label: 'Moléculas' },
  { id: 'teoria', label: 'Teoría' },
  { id: 'juegos', label: 'Juegos' },
  { id: 'experimentos', label: 'Experimentos' },
];

export default function GlobalSearchDialog({ onClose, onNavigate }: GlobalSearchDialogProps) {
  const [query, setQuery] = useState('');
  const results = searchChemistry(query);
  const total = CATEGORIES.reduce((sum, category) => sum + results[category.id].length, 0);
  const hasQuery = query.trim() !== '';

  const openModules = () => {
    onNavigate('modulos');
    onClose();
  };

  return (
    <Dialog titleId={TITLE_ID} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h2 id={TITLE_ID} className="text-2xl">
          Buscar
        </h2>
        <label className="flex flex-col gap-2">
          <span className="sr-only">Escribe un elemento, molécula, tema o experimento</span>
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Por ejemplo: oxígeno, agua, pH, enlace"
            className="w-full rounded-btn border border-ink/15 bg-surface px-4 py-3 text-base text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
          />
        </label>
        <p className="text-base text-ink-muted">
          Al elegir un resultado se abre la sección de Módulos, donde lo encontrarás.
        </p>
      </div>

      {hasQuery && total === 0 && (
        <p className="rounded-btn bg-canvas p-5 text-center text-lg text-ink-muted">
          No encontramos coincidencias para &ldquo;{query.trim()}&rdquo;.
        </p>
      )}

      {total > 0 && (
        <div className="flex flex-col gap-6">
          {CATEGORIES.map((category) => {
            const items = results[category.id];
            if (items.length === 0) {
              return null;
            }
            return (
              <section key={category.id} aria-label={category.label} className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-ink-muted">{category.label}</h3>
                <ul className="flex flex-col gap-2">
                  {items.map((item) => (
                    <li key={`${item.category}-${item.id}`}>
                      <button
                        type="button"
                        onClick={openModules}
                        className="flex w-full flex-wrap items-center justify-between gap-2 rounded-btn bg-canvas px-4 py-3 text-left transition duration-200 ease-out hover:bg-primary-soft focus:outline-none"
                      >
                        <span className="text-lg font-semibold text-ink">{item.title}</span>
                        <span className="text-base text-ink-muted">{item.subtitle}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </Dialog>
  );
}
