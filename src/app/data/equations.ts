import type { Equation } from '@/app/models/quiz';

export const EQUATIONS: Equation[] = [
  {
    id: 'eq-01',
    reactants: ['H₂', 'O₂'],
    products: ['H₂O'],
    solution: [2, 1, 2],
    hint: 'Hay 2 átomos de oxígeno en el O₂. Empieza por ajustar el agua.',
  },
  {
    id: 'eq-02',
    reactants: ['N₂', 'H₂'],
    products: ['NH₃'],
    solution: [1, 3, 2],
    hint: 'Hay 2 nitrógenos en el reactivo. Cada NH₃ tiene un solo nitrógeno.',
  },
  {
    id: 'eq-03',
    reactants: ['CH₄', 'O₂'],
    products: ['CO₂', 'H₂O'],
    solution: [1, 2, 1, 2],
    hint: 'Balancea primero el carbono y luego el hidrógeno; el oxígeno va al final.',
  },
  {
    id: 'eq-04',
    reactants: ['Fe', 'O₂'],
    products: ['Fe₂O₃'],
    solution: [4, 3, 2],
    hint: 'Cada Fe₂O₃ tiene 2 hierros. Busca un número común para los hierros.',
  },
  {
    id: 'eq-05',
    reactants: ['Al', 'O₂'],
    products: ['Al₂O₃'],
    solution: [4, 3, 2],
    hint: 'Cada Al₂O₃ tiene 2 aluminios y 3 oxígenos.',
  },
  {
    id: 'eq-06',
    reactants: ['C₃H₈', 'O₂'],
    products: ['CO₂', 'H₂O'],
    solution: [1, 5, 3, 4],
    hint: 'Balancea el carbono, luego el hidrógeno (8 en el propano) y termina con el oxígeno.',
  },
  {
    id: 'eq-07',
    reactants: ['Na', 'Cl₂'],
    products: ['NaCl'],
    solution: [2, 1, 2],
    hint: 'El Cl₂ tiene 2 cloros; cada NaCl tiene uno.',
  },
  {
    id: 'eq-08',
    reactants: ['H₂O₂'],
    products: ['H₂O', 'O₂'],
    solution: [2, 2, 1],
    hint: 'Hay 2 oxígenos en cada H₂O₂. Empieza por el hidrógeno.',
  },
  {
    id: 'eq-09',
    reactants: ['CaCO₃'],
    products: ['CaO', 'CO₂'],
    solution: [1, 1, 1],
    hint: 'Esta ecuación ya está balanceada: un calcio, un carbono y tres oxígenos en cada lado.',
  },
  {
    id: 'eq-10',
    reactants: ['Mg', 'HCl'],
    products: ['MgCl₂', 'H₂'],
    solution: [1, 2, 1, 1],
    hint: 'El MgCl₂ tiene 2 cloros, así que necesitas 2 HCl.',
  },
];
