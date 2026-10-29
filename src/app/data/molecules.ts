import type { Molecule } from '@/app/models/chemistry';

export const MOLECULES: Molecule[] = [
  {
    id: 'agua',
    name: 'Agua',
    formula: 'H₂O',
    kind: 'molecula',
    composition: [
      { element: 'H', count: 2 },
      { element: 'O', count: 1 },
    ],
    atomCount: 3,
    description:
      'Molécula polar con forma angular. Sus átomos comparten electrones con el oxígeno, que atrae con más fuerza.',
    uses: ['Disolvente universal de la vida', 'Hidratación y reacciones en laboratorio'],
    representation: {
      style: 'estructural',
      note: 'Representación estructural esquemática: los ángulos reales son cercanos a 104,5°.',
    },
    structure: {
      atoms: ['O', 'H', 'H'],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
      ],
    },
  },
  {
    id: 'dioxido-de-carbono',
    name: 'Dióxido de carbono',
    formula: 'CO₂',
    kind: 'molecula',
    composition: [
      { element: 'C', count: 1 },
      { element: 'O', count: 2 },
    ],
    atomCount: 3,
    description:
      'Molécula lineal con dos enlaces dobles. Es un gas incoloro que se produce al respirar y al quemar combustibles.',
    uses: ['Bebidas gaseosas', 'Extintores de incendios', 'Hielo seco para refrigeración'],
    representation: {
      style: 'estructural',
      note: 'Representación estructural esquemática: la molécula es lineal, con ángulo de 180°.',
    },
    structure: {
      atoms: ['C', 'O', 'O'],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 2 },
      ],
    },
  },
  {
    id: 'oxigeno',
    name: 'Oxígeno',
    formula: 'O₂',
    kind: 'molecula',
    composition: [{ element: 'O', count: 2 }],
    atomCount: 2,
    description:
      'Molécula diatómica formada por dos átomos de oxígeno unidos con un enlace doble. Es indispensable para la respiración.',
    uses: ['Respiración en medicina', 'Soldadura con llama', 'Tratamiento de agua'],
    representation: {
      style: 'estructural',
      note: 'Representación estructural esquemática de una molécula diatómica.',
    },
    structure: {
      atoms: ['O', 'O'],
      bonds: [{ from: 0, to: 1, order: 2 }],
    },
  },
  {
    id: 'nitrogeno',
    name: 'Nitrógeno',
    formula: 'N₂',
    kind: 'molecula',
    composition: [{ element: 'N', count: 2 }],
    atomCount: 2,
    description:
      'Molécula diatómica con un enlace triple, muy estable. Por eso es un gas poco reactivo que domina el aire.',
    uses: ['Atmósfera inerte en envasado', 'Fabricación de amoníaco', 'Congelación rápida en criogenia'],
    representation: {
      style: 'estructural',
      note: 'Representación estructural esquemática con enlace triple.',
    },
    structure: {
      atoms: ['N', 'N'],
      bonds: [{ from: 0, to: 1, order: 3 }],
    },
  },
  {
    id: 'amoniaco',
    name: 'Amoníaco',
    formula: 'NH₃',
    kind: 'molecula',
    composition: [
      { element: 'N', count: 1 },
      { element: 'H', count: 3 },
    ],
    atomCount: 4,
    description:
      'Molécula con forma de pirámide con base triangular. Tiene olor penetrante y es básico.',
    uses: ['Fertilizantes', 'Limpiadores domésticos', 'Fabricación de plásticos'],
    representation: {
      style: 'estructural',
      note: 'Representación estructural esquemática; la pirámide real no se dibuja en 2D.',
    },
    structure: {
      atoms: ['N', 'H', 'H', 'H'],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
      ],
    },
  },
  {
    id: 'metano',
    name: 'Metano',
    formula: 'CH₄',
    kind: 'molecula',
    composition: [
      { element: 'C', count: 1 },
      { element: 'H', count: 4 },
    ],
    atomCount: 5,
    description:
      'Hidrocarburo más simple. Su molécula es tetraédrica, con cuatro enlaces sencillos iguales.',
    uses: ['Gas natural como combustible', 'Materia prima para hidrógeno industrial'],
    representation: {
      style: 'estructural',
      note: 'Representación estructural esquemática; en 3D sus enlaces forman un tetraedro.',
    },
    structure: {
      atoms: ['C', 'H', 'H', 'H', 'H'],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
      ],
    },
  },
  {
    id: 'peroxido-de-hidrogeno',
    name: 'Peróxido de hidrógeno',
    formula: 'H₂O₂',
    kind: 'molecula',
    composition: [
      { element: 'H', count: 2 },
      { element: 'O', count: 2 },
    ],
    atomCount: 4,
    description:
      'Molécula con un enlace oxígeno-oxígeno que la vuelve inestable. Se descompone fácilmente en agua y oxígeno.',
    uses: ['Desinfectante de heridas en dosis bajas', 'Blanqueador de telas y pelo'],
    representation: {
      style: 'estructural',
      note: 'Representación estructural esquemática; la molécula real no es plana.',
    },
    structure: {
      atoms: ['O', 'O', 'H', 'H'],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 1, to: 3, order: 1 },
      ],
    },
  },
  {
    id: 'etanol',
    name: 'Etanol',
    formula: 'C₂H₆O',
    kind: 'molecula',
    composition: [
      { element: 'C', count: 2 },
      { element: 'H', count: 6 },
      { element: 'O', count: 1 },
    ],
    atomCount: 9,
    description:
      'Alcohol con un grupo OH unido a una cadena de dos carbonos (CH₃–CH₂–OH). Es el alcohol de las bebidas y de los desinfectantes.',
    uses: ['Desinfectante de manos', 'Disolvente en perfumes', 'Combustible y bebidas alcohólicas'],
    representation: {
      style: 'estructural',
      note: 'Representación estructural esquemática con todos los átomos, incluidos los hidrógenos.',
    },
    structure: {
      atoms: ['C', 'C', 'O', 'H', 'H', 'H', 'H', 'H', 'H'],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 1, to: 6, order: 1 },
        { from: 1, to: 7, order: 1 },
        { from: 2, to: 8, order: 1 },
      ],
    },
  },
  {
    id: 'glucosa',
    name: 'Glucosa',
    formula: 'C₆H₁₂O₆',
    kind: 'molecula',
    composition: [
      { element: 'C', count: 6 },
      { element: 'H', count: 12 },
      { element: 'O', count: 6 },
    ],
    atomCount: 24,
    description:
      'Azúcar simple que las células usan como fuente de energía. En solución forma un anillo de seis átomos (anillo piranósico).',
    uses: ['Energía para las células', 'Ingrediente de jarabes y alimentos'],
    representation: {
      style: 'esqueleto',
      note: 'Esqueleto simplificado: solo se dibujan carbonos y oxígenos. Los hidrógenos se omiten, pero la fórmula C₆H₁₂O₆ tiene 24 átomos.',
    },
    structure: {
      atoms: ['C', 'C', 'C', 'C', 'C', 'C', 'O', 'O', 'O', 'O', 'O', 'O'],
      bonds: [
        { from: 0, to: 6, order: 1 },
        { from: 6, to: 4, order: 1 },
        { from: 4, to: 3, order: 1 },
        { from: 3, to: 2, order: 1 },
        { from: 2, to: 1, order: 1 },
        { from: 1, to: 0, order: 1 },
        { from: 4, to: 5, order: 1 },
        { from: 5, to: 11, order: 1 },
        { from: 3, to: 10, order: 1 },
        { from: 2, to: 9, order: 1 },
        { from: 1, to: 8, order: 1 },
        { from: 0, to: 7, order: 1 },
      ],
    },
  },
  {
    id: 'cloruro-de-sodio',
    name: 'Cloruro de sodio',
    formula: 'NaCl',
    kind: 'compuesto-ionico',
    composition: [
      { element: 'Na', count: 1 },
      { element: 'Cl', count: 1 },
    ],
    atomCount: 2,
    description:
      'Compuesto iónico formado por iones Na⁺ y Cl⁻. No forma moléculas discretas: en el sólido, cada ion está rodeado por iones de carga opuesta.',
    uses: ['Sal de mesa', 'Conservación de alimentos', 'Regulación de líquidos en el cuerpo'],
    representation: {
      style: 'red-ionica',
      note: 'Esquema simplificado de iones: no es una molécula. La fórmula NaCl indica la proporción 1:1 de iones.',
    },
    structure: null,
  },
];
