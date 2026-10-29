import type { ElementCategory } from '@/app/models/chemistry';

export const ELEMENT_CATEGORY_LABELS: Record<ElementCategory, string> = {
  'metal-alcalino': 'Metal alcalino',
  'metal-alcalinoterreo': 'Metal alcalinotérreo',
  'metal-transicion': 'Metal de transición',
  'metal-postransicion': 'Metal postransición',
  metaloide: 'Metaloide',
  'no-metal': 'No metal',
  halogeno: 'Halógeno',
  'gas-noble': 'Gas noble',
};

export const ELEMENT_CATEGORY_STYLES: Record<ElementCategory, string> = {
  'metal-alcalino': 'bg-highlight-soft text-ink',
  'metal-alcalinoterreo': 'bg-warning-soft text-ink',
  'metal-transicion': 'bg-accent-soft text-ink',
  'metal-postransicion': 'bg-primary-soft text-ink',
  metaloide: 'bg-success-soft text-ink',
  'no-metal': 'bg-canvas text-ink ring-1 ring-inset ring-ink/20',
  halogeno: 'bg-error-soft text-ink',
  'gas-noble': 'bg-ink/10 text-ink',
};
