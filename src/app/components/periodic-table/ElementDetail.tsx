import { X } from 'lucide-react';
import Dialog from '@/app/components/layout/Dialog';
import { ELEMENT_CATEGORY_LABELS, ELEMENT_CATEGORY_STYLES } from '@/app/config/element-categories';
import type { ChemicalElement } from '@/app/models/chemistry';

interface ElementDetailProps {
  element: ChemicalElement;
  onClose: () => void;
}

const TITLE_ID = 'element-detail-title';

export default function ElementDetail({ element, onClose }: ElementDetailProps) {
  const electronegativity = element.properties.electronegativity;
  const facts = [
    { label: 'Número atómico', value: String(element.atomicNumber) },
    { label: 'Masa atómica', value: String(element.atomicMass) },
    { label: 'Grupo', value: String(element.group) },
    { label: 'Periodo', value: String(element.period) },
    { label: 'Estado a temperatura ambiente', value: element.properties.stateAtRoomTemp },
    {
      label: 'Electronegatividad',
      value: electronegativity === undefined ? 'No disponible' : String(electronegativity),
    },
  ];

  return (
    <Dialog titleId={TITLE_ID} onClose={onClose}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-5">
          <span
            className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-card font-heading ${ELEMENT_CATEGORY_STYLES[element.category]}`}
          >
            <span className="text-xs font-semibold">{element.atomicNumber}</span>
            <span className="text-3xl font-bold leading-none">{element.symbol}</span>
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-base text-ink-muted">{ELEMENT_CATEGORY_LABELS[element.category]}</p>
            <h2 id={TITLE_ID} className="text-2xl md:text-3xl">
              {element.name}
            </h2>
          </div>
        </div>
        <button type="button" onClick={onClose} className="btn btn-secondary shrink-0">
          <X size={20} aria-hidden="true" />
          Cerrar
        </button>
      </div>

      <dl className="grid grid-cols-2 gap-4 rounded-btn bg-canvas p-5 md:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1">
            <dt className="text-base text-ink-muted">{fact.label}</dt>
            <dd className="text-lg font-bold tabular-nums text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="element-uses-title" className="flex flex-col gap-3">
        <h3 id="element-uses-title" className="text-lg">
          Usos cotidianos
        </h3>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-base text-ink">
          {element.uses.map((use) => (
            <li key={use}>{use}</li>
          ))}
        </ul>
      </section>

      <p className="rounded-btn bg-highlight-soft p-5 text-base text-ink">
        <span className="font-bold">Dato curioso: </span>
        {element.funFact}
      </p>
    </Dialog>
  );
}
