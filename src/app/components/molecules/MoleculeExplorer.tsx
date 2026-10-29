import { useState } from 'react';
import { Search } from 'lucide-react';
import GameHeader from '@/app/components/game/GameHeader';
import MoleculeCard from '@/app/components/molecules/MoleculeCard';
import MoleculeDetail from '@/app/components/molecules/MoleculeDetail';
import type { Molecule } from '@/app/models/chemistry';
import { getMolecules } from '@/app/services/chemistry-data.service';
import { filterMolecules, type MoleculeKindFilter } from '@/app/services/molecule-explorer.service';

interface MoleculeExplorerProps {
  onExit: () => void;
}

const KIND_FILTERS: { id: MoleculeKindFilter; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'molecula', label: 'Moléculas' },
  { id: 'compuesto-ionico', label: 'Compuestos iónicos' },
];

export default function MoleculeExplorer({ onExit }: MoleculeExplorerProps) {
  const molecules = getMolecules();
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<MoleculeKindFilter>('todas');
  const [selected, setSelected] = useState<Molecule | null>(null);

  const visible = filterMolecules(molecules, query, kind);

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <GameHeader
        title="Moléculas y compuestos"
        label={`${visible.length} de ${molecules.length} sustancias`}
        onExit={onExit}
      />

      <p className="max-w-prose text-lg text-ink-muted">
        Busca una sustancia por nombre o fórmula y abre su ficha para ver cómo está formada y dónde la usamos.
      </p>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="relative w-full md:max-w-sm">
          <span className="sr-only">Buscar sustancia</span>
          <Search size={20} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nombre o fórmula"
            className="w-full rounded-btn border border-ink/15 bg-surface py-3 pl-12 pr-4 text-base text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
          />
        </label>

        <div role="group" aria-label="Filtrar por tipo" className="flex flex-wrap gap-2">
          {KIND_FILTERS.map((filter) => {
            const isActive = kind === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setKind(filter.id)}
                className={`btn px-4 py-2 text-base ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="card p-8 text-center text-lg text-ink-muted">
          No encontramos sustancias con esa búsqueda. Prueba con otro nombre o cambia el filtro.
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((molecule) => (
            <li key={molecule.id}>
              <MoleculeCard molecule={molecule} onSelect={setSelected} />
            </li>
          ))}
        </ul>
      )}

      {selected && <MoleculeDetail molecule={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
