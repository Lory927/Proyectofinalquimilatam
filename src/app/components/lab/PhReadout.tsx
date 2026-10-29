import type { PhCategory, PhReading } from '@/app/services/lab-simulation.service';

interface PhReadoutProps {
  reading: PhReading;
}

const CATEGORY_LABELS: Record<PhCategory, string> = {
  acida: 'Ácida',
  neutra: 'Neutra',
  basica: 'Básica',
};

export default function PhReadout({ reading }: PhReadoutProps) {
  const position = `${(reading.ph / 14) * 100}%`;

  return (
    <section aria-labelledby="ph-result-title" className="card flex flex-col gap-6 p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="ph-result-title" className="text-lg">
          Resultado
        </h2>
        <p className="flex items-baseline gap-3">
          <span className="font-heading text-3xl font-bold tabular-nums text-ink">pH {reading.ph.toFixed(1)}</span>
          <span className="rounded-btn bg-primary-soft px-3 py-1 text-base font-semibold text-primary">
            {CATEGORY_LABELS[reading.category]}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="relative h-4 w-full rounded-full bg-gradient-to-r from-error via-success to-primary">
          <span
            aria-hidden="true"
            className="absolute top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-surface bg-ink shadow-card transition-[left] duration-500 ease-out motion-reduce:transition-none"
            style={{ left: position }}
          />
        </div>
        <div className="flex justify-between text-base text-ink-muted">
          <span>0 · ácida</span>
          <span>7 · neutra</span>
          <span>14 · básica</span>
        </div>
      </div>

      <p className="text-lg text-ink">{reading.note}</p>
    </section>
  );
}
