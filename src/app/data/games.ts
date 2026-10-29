import type { GameDefinition } from '@/app/models/game';

export const GAMES: GameDefinition[] = [
  {
    id: 'cuestionario-periodico',
    name: 'Cuestionario de la tabla periódica',
    description: 'Responde preguntas sobre símbolos, grupos, periodos y propiedades de los elementos.',
  },
  {
    id: 'memorama-formulas',
    name: 'Memorama de fórmulas',
    description: 'Une el nombre de cada compuesto con su fórmula química.',
  },
  {
    id: 'memorama-moleculas',
    name: 'Memorama de moléculas',
    description: 'Relaciona el nombre o la fórmula de una sustancia con su representación visual.',
  },
  {
    id: 'balanceo-ecuaciones',
    name: 'Balanceo de ecuaciones',
    description: 'Ajusta los coeficientes para que los átomos se conserven en la reacción.',
  },
];
