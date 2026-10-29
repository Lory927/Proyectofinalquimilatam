import type { Experiment } from '@/app/models/experiment';

export const EXPERIMENTS: Experiment[] = [
  {
    id: 'ph-soluciones',
    name: 'Explorador de pH',
    description:
      'Elige una disolución y observa cómo cambia su pH al diluirla. El pH indica qué tan ácida, neutra o básica es una disolución.',
    variables: [
      {
        id: 'solucion',
        label: 'Disolución',
        options: [
          { value: 'agua', label: 'Agua destilada' },
          { value: 'limon', label: 'Jugo de limón' },
          { value: 'vinagre', label: 'Vinagre blanco' },
          { value: 'bicarbonato', label: 'Bicarbonato de sodio' },
          { value: 'jabon', label: 'Disolución de jabón' },
          { value: 'amoniaco', label: 'Amoníaco doméstico diluido' },
        ],
      },
      {
        id: 'dilucion',
        label: 'Concentración',
        options: [
          { value: 'concentrated', label: 'Original' },
          { value: 'diluted', label: 'Diluida' },
        ],
      },
    ],
    model: {
      kind: 'ph',
      solutions: [
        {
          id: 'agua',
          name: 'Agua destilada',
          ph: { concentrated: 7.0, diluted: 7.0 },
          note: 'El agua pura es neutra: tiene la misma cantidad de iones H⁺ y OH⁻.',
        },
        {
          id: 'limon',
          name: 'Jugo de limón',
          ph: { concentrated: 2.3, diluted: 3.3 },
          note: 'Contiene ácido cítrico, que libera iones H⁺.',
        },
        {
          id: 'vinagre',
          name: 'Vinagre blanco',
          ph: { concentrated: 2.5, diluted: 3.5 },
          note: 'Su componente principal es el ácido acético, un ácido débil.',
        },
        {
          id: 'bicarbonato',
          name: 'Bicarbonato de sodio',
          ph: { concentrated: 8.3, diluted: 8.0 },
          note: 'Es una base débil; al diluirse, su pH se acerca un poco a 7.',
        },
        {
          id: 'jabon',
          name: 'Disolución de jabón',
          ph: { concentrated: 10.0, diluted: 9.0 },
          note: 'Muchos jabones son básicos porque contienen sales de ácidos grasos.',
        },
        {
          id: 'amoniaco',
          name: 'Amoníaco doméstico diluido',
          ph: { concentrated: 11.5, diluted: 10.5 },
          note: 'El amoníaco es una base. Sus disoluciones concentradas son irritantes.',
        },
      ],
    },
    explanation:
      'El pH va de 0 a 14. Menos de 7 indica una disolución ácida, 7 una disolución neutra y más de 7 una disolución básica. Cada unidad de pH equivale a diez veces más o menos iones H⁺.',
    safetyNotes: [
      'Esta es una simulación educativa con valores aproximados. No reemplaza una medición real.',
      'Los productos de limpieza y el amoníaco son irritantes: en la vida real no se deben manipular sin supervisión de un adulto.',
    ],
    simulationNotice:
      'Resultados simulados con fines educativos. No son mediciones experimentales reales.',
  },
  {
    id: 'conservacion-masa',
    name: 'Conservación de la materia',
    description:
      'Simula la formación de agua a partir de hidrógeno y oxígeno en un recipiente cerrado. Cambia las masas de partida y observa qué reactivo se agota.',
    variables: [
      {
        id: 'hidrogeno',
        label: 'Masa de hidrógeno (g)',
        options: [
          { value: '2', label: '2 g' },
          { value: '4', label: '4 g' },
          { value: '6', label: '6 g' },
        ],
      },
      {
        id: 'oxigeno',
        label: 'Masa de oxígeno (g)',
        options: [
          { value: '16', label: '16 g' },
          { value: '32', label: '32 g' },
          { value: '48', label: '48 g' },
        ],
      },
    ],
    model: {
      kind: 'conservacion-masa',
      reactants: [
        { formula: 'H₂', molarMass: 2.016, coefficient: 2 },
        { formula: 'O₂', molarMass: 31.998, coefficient: 1 },
      ],
      products: [{ formula: 'H₂O', molarMass: 18.015, coefficient: 2 }],
    },
    explanation:
      'La ecuación 2 H₂ + O₂ → 2 H₂O muestra que se necesitan 2 moles de hidrógeno por cada mol de oxígeno. La masa total de los reactivos siempre es igual a la masa total de los productos: la materia se conserva.',
    safetyNotes: [
      'La reacción real entre hidrógeno y oxígeno puede ser explosiva. Este experimento solo se muestra como simulación y no debe reproducirse.',
    ],
    simulationNotice:
      'Resultados simulados con fines educativos. No son mediciones experimentales reales.',
  },
];
