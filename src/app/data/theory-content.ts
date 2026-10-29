import type { TheoryArticle } from '@/app/models/theory';

export const THEORY_ARTICLES: TheoryArticle[] = [
  {
    id: 'estructura-atomica',
    title: 'Estructura atómica',
    category: 'Fundamentos',
    body: [
      'Toda la materia está formada por átomos. Cada átomo tiene un núcleo central con protones, que tienen carga positiva, y neutrones, que no tienen carga. Alrededor del núcleo se mueven los electrones, con carga negativa.',
      'El número atómico (Z) es la cantidad de protones de un átomo y define de qué elemento se trata. El número másico (A) es la suma de protones y neutrones.',
      'En un átomo neutro, el número de electrones es igual al de protones. Los isótopos son átomos del mismo elemento que tienen distinto número de neutrones.',
    ],
    examples: [
      'El carbono tiene Z = 6, así que todos sus átomos tienen 6 protones.',
      'El carbono-12 tiene 6 protones y 6 neutrones; el carbono-14 tiene 6 protones y 8 neutrones.',
    ],
    keywords: ['núcleo', 'protón', 'neutrón', 'electrón', 'número atómico', 'isótopo'],
    reviewQuestions: [
      '¿Cuántos electrones tiene un átomo neutro de oxígeno (Z = 8)?',
      '¿Qué diferencia hay entre el número atómico y el número másico?',
    ],
    references: ['Chang, R. y Goldsby, K. Química. McGraw-Hill.'],
    relatedLinks: [
      { kind: 'elemento', id: 'C' },
      { kind: 'juego', id: 'cuestionario-periodico' },
    ],
  },
  {
    id: 'tabla-periodica',
    title: 'La tabla periódica',
    category: 'Fundamentos',
    body: [
      'La tabla periódica ordena los elementos según su número atómico, de menor a mayor. Las filas se llaman periodos y las columnas, grupos.',
      'Los elementos de un mismo grupo tienen propiedades parecidas porque tienen el mismo número de electrones en su capa externa. Por eso el litio, el sodio y el potasio (grupo 1) reaccionan de forma parecida con el agua.',
      'Las categorías principales son los metales, los no metales, los metaloides y los gases nobles. Los gases nobles (grupo 18) casi no reaccionan porque tienen su capa externa completa.',
    ],
    examples: [
      'El neón (grupo 18) casi no forma compuestos, mientras que el cloro (grupo 17) reacciona con muchos elementos.',
      'El sodio está en el periodo 3 y el carbono en el periodo 2.',
    ],
    keywords: ['periodo', 'grupo', 'metal', 'no metal', 'gas noble', 'electronegatividad'],
    reviewQuestions: [
      '¿Por qué el litio y el sodio tienen propiedades parecidas?',
      '¿En qué grupo están los gases nobles?',
    ],
    references: ['IUPAC. Gold Book (Compendium of Chemical Terminology).'],
    relatedLinks: [
      { kind: 'elemento', id: 'Na' },
      { kind: 'elemento', id: 'Ne' },
      { kind: 'juego', id: 'cuestionario-periodico' },
    ],
  },
  {
    id: 'enlaces-quimicos',
    title: 'Enlaces químicos',
    category: 'Enlaces y moléculas',
    body: [
      'Los átomos se unen para alcanzar una configuración más estable. Existen tres tipos principales de enlace: covalente, iónico y metálico.',
      'En el enlace covalente, dos átomos comparten uno o más pares de electrones. Ocurre sobre todo entre no metales, como en el agua o el oxígeno.',
      'En el enlace iónico, un átomo cede electrones a otro. Así se forman iones de carga opuesta que se atraen, como en el cloruro de sodio. En el enlace metálico, los electrones se mueven libremente entre muchos átomos de metal.',
    ],
    examples: [
      'En el H₂, los dos átomos comparten un par de electrones (enlace covalente).',
      'En el NaCl, el sodio cede un electrón al cloro: Na⁺ y Cl⁻ se atraen (enlace iónico).',
    ],
    keywords: ['enlace covalente', 'enlace iónico', 'enlace metálico', 'electrones', 'ion'],
    reviewQuestions: [
      '¿Qué diferencia hay entre compartir y ceder electrones?',
      '¿Qué tipo de enlace tiene el cloruro de sodio?',
    ],
    references: ['Chang, R. y Goldsby, K. Química. McGraw-Hill.'],
    relatedLinks: [
      { kind: 'molecula', id: 'agua' },
      { kind: 'molecula', id: 'cloruro-de-sodio' },
      { kind: 'molecula', id: 'oxigeno' },
      { kind: 'juego', id: 'memorama-moleculas' },
    ],
  },
  {
    id: 'moleculas-y-compuestos',
    title: 'Moléculas y compuestos',
    category: 'Enlaces y moléculas',
    body: [
      'Una molécula es un grupo de átomos unidos por enlaces covalentes que se comporta como una unidad. Por ejemplo, una molécula de agua tiene dos átomos de hidrógeno y uno de oxígeno.',
      'Un compuesto es una sustancia formada por dos o más elementos unidos químicamente en proporciones fijas. Todas las moléculas formadas por átomos distintos son compuestos, pero no todos los compuestos forman moléculas.',
      'Los compuestos iónicos, como el cloruro de sodio, no tienen moléculas discretas. En el sólido, los iones se ordenan en una red en la que cada uno está rodeado por iones de carga opuesta.',
    ],
    examples: [
      'El O₂ es una molécula, pero no es un compuesto porque solo tiene un elemento.',
      'El NaCl es un compuesto iónico: se representa con su fórmula, no como una molécula.',
    ],
    keywords: ['molécula', 'compuesto', 'compuesto iónico', 'red cristalina', 'átomo'],
    reviewQuestions: [
      '¿Por qué el O₂ es una molécula pero no un compuesto?',
      '¿Por qué el NaCl no se considera una molécula?',
    ],
    references: ['IUPAC. Gold Book (Compendium of Chemical Terminology).'],
    relatedLinks: [
      { kind: 'molecula', id: 'agua' },
      { kind: 'molecula', id: 'cloruro-de-sodio' },
      { kind: 'juego', id: 'memorama-moleculas' },
    ],
  },
  {
    id: 'formulas-y-nomenclatura',
    title: 'Fórmulas y nomenclatura',
    category: 'Enlaces y moléculas',
    body: [
      'La fórmula química indica qué elementos forman una sustancia y cuántos átomos de cada uno tiene. Los subíndices se refieren a la cantidad de átomos: en H₂O hay dos hidrógenos y un oxígeno.',
      'La fórmula molecular indica el número real de átomos. La fórmula empírica muestra la proporción más simple. La glucosa tiene fórmula molecular C₆H₁₂O₆ y fórmula empírica CH₂O.',
      'En la nomenclatura de Stock, el número romano entre paréntesis indica el estado de oxidación del metal. Por eso Fe₂O₃ se llama óxido de hierro(III). Los subíndices de una fórmula nunca se cambian al balancear una ecuación.',
    ],
    examples: [
      'NaCl se llama cloruro de sodio.',
      'CaO se llama óxido de calcio.',
    ],
    keywords: ['fórmula molecular', 'fórmula empírica', 'subíndice', 'nomenclatura', 'estado de oxidación'],
    reviewQuestions: [
      '¿Cuántos átomos de hidrógeno tiene una molécula de glucosa?',
      '¿Cómo se llama Fe₂O₃ según la nomenclatura de Stock?',
    ],
    references: ['IUPAC. Red Book, nomenclatura de química inorgánica.'],
    relatedLinks: [
      { kind: 'molecula', id: 'glucosa' },
      { kind: 'molecula', id: 'peroxido-de-hidrogeno' },
      { kind: 'juego', id: 'memorama-formulas' },
    ],
  },
  {
    id: 'reacciones-quimicas',
    title: 'Reacciones químicas',
    category: 'Reacciones',
    body: [
      'Una reacción química transforma unas sustancias, llamadas reactivos, en otras distintas, llamadas productos. Se escribe con una flecha: reactivos → productos.',
      'Algunas señales de que ocurre una reacción son el cambio de color, la formación de un gas, la aparición de un sólido o cambios de temperatura. Estas señales no siempre aparecen, así que la prueba más segura es el cambio de sustancias.',
      'En una reacción, los átomos no se crean ni se destruyen; solo se reorganizan. Por eso la ecuación debe tener la misma cantidad de átomos de cada elemento a ambos lados.',
    ],
    examples: [
      '2 H₂ + O₂ → 2 H₂O: el hidrógeno y el oxígeno se transforman en agua.',
      'CaCO₃ → CaO + CO₂: el carbonato de calcio se descompone en óxido de calcio y dióxido de carbono.',
    ],
    keywords: ['reactivo', 'producto', 'reacción', 'ecuación química', 'flecha'],
    reviewQuestions: [
      '¿Cuáles son los reactivos y los productos en la reacción del hidrógeno con el oxígeno?',
      '¿Por qué los átomos deben estar en la misma cantidad a ambos lados de la flecha?',
    ],
    references: ['Chang, R. y Goldsby, K. Química. McGraw-Hill.'],
    relatedLinks: [
      { kind: 'ecuacion', id: 'eq-01' },
      { kind: 'ecuacion', id: 'eq-09' },
      { kind: 'juego', id: 'balanceo-ecuaciones' },
    ],
  },
  {
    id: 'balanceo-ecuaciones',
    title: 'Balanceo de ecuaciones',
    category: 'Reacciones',
    body: [
      'Según la ley de conservación de la masa, formulada por Lavoisier, la materia no se crea ni se destruye en una reacción. Para reflejarlo, se ajustan los coeficientes: los números que van delante de cada fórmula.',
      'Para balancear, cuenta los átomos de cada elemento en ambos lados. Empieza por los elementos que aparecen en menos compuestos, y deja para el final los que están solos, como el oxígeno o el hidrógeno en su forma elemental.',
      'Solo puedes cambiar los coeficientes. Cambiar los subíndices cambiaría la sustancia misma, y eso sería otra reacción.',
    ],
    examples: [
      'H₂ + O₂ → H₂O se balancea como 2 H₂ + O₂ → 2 H₂O: hay 4 hidrógenos y 2 oxígenos en cada lado.',
      'CH₄ + 2 O₂ → CO₂ + 2 H₂O: 1 carbono, 4 hidrógenos y 4 oxígenos en cada lado.',
    ],
    keywords: ['coeficiente', 'balanceo', 'ley de conservación de la masa', 'Lavoisier'],
    reviewQuestions: [
      '¿Qué se puede cambiar al balancear una ecuación y qué no?',
      '¿Cuántos átomos de oxígeno hay en 2 H₂O?',
    ],
    references: ['Chang, R. y Goldsby, K. Química. McGraw-Hill.'],
    relatedLinks: [
      { kind: 'ecuacion', id: 'eq-03' },
      { kind: 'ecuacion', id: 'eq-06' },
      { kind: 'juego', id: 'balanceo-ecuaciones' },
      { kind: 'experimento', id: 'conservacion-masa' },
    ],
  },
  {
    id: 'acidos-y-bases',
    title: 'Ácidos y bases',
    category: 'Disoluciones y pH',
    body: [
      'Según la teoría de Brønsted-Lowry, un ácido es una sustancia que cede iones H⁺ (protones) y una base es una sustancia que los acepta.',
      'El ácido clorhídrico (HCl) es un ácido fuerte: en agua libera casi todos sus iones H⁺. El ácido acético, del vinagre, es un ácido débil: solo libera una parte.',
      'El hidróxido de sodio (NaOH) es una base fuerte que se disocia por completo en agua. El amoníaco (NH₃) es una base débil. Cuando un ácido y una base reaccionan, se forma una sal y, a menudo, agua.',
    ],
    examples: [
      'HCl + NaOH → NaCl + H₂O: un ácido y una base forman una sal y agua.',
      'El limón es ácido porque contiene ácido cítrico.',
    ],
    keywords: ['ácido', 'base', 'protón', 'Brønsted-Lowry', 'sal', 'neutralización'],
    reviewQuestions: [
      '¿Qué iones libera un ácido en agua?',
      '¿Qué productos se forman al neutralizar un ácido con una base?',
    ],
    references: ['Chang, R. y Goldsby, K. Química. McGraw-Hill.'],
    relatedLinks: [
      { kind: 'molecula', id: 'amoniaco' },
      { kind: 'experimento', id: 'ph-soluciones' },
      { kind: 'molecula', id: 'cloruro-de-sodio' },
    ],
  },
  {
    id: 'ph-y-disoluciones',
    title: 'pH y disoluciones',
    category: 'Disoluciones y pH',
    body: [
      'Una disolución está formada por un soluto, la sustancia que se disuelve, y un disolvente, que suele ser agua. La concentración indica cuánto soluto hay en una cantidad de disolución.',
      'El pH mide la concentración de iones H⁺ y se calcula como pH = −log[H⁺]. En el agua pura a 25 °C vale 7. Valores menores que 7 indican acidez y mayores que 7 indican basicidad. Cada unidad de pH representa un cambio de diez veces en la concentración de H⁺.',
      'El pH es una escala aproximada de 0 a 14. Aunque algunas sustancias quedan fuera de ese rango en casos extremos, para la mayoría de las disoluciones de uso escolar la escala es suficiente.',
    ],
    examples: [
      'El jugo de limón tiene un pH cercano a 2; el agua pura, 7.',
      'Si una disolución tiene pH 3 y otra pH 4, la primera tiene diez veces más iones H⁺.',
    ],
    keywords: ['pH', 'disolución', 'soluto', 'disolvente', 'concentración', 'escala de pH'],
    reviewQuestions: [
      '¿Cuánto más ácida es una disolución de pH 2 que una de pH 4?',
      '¿Qué pH tiene el agua pura a 25 °C?',
    ],
    references: ['IUPAC. Gold Book (Compendium of Chemical Terminology).'],
    relatedLinks: [
      { kind: 'experimento', id: 'ph-soluciones' },
      { kind: 'elemento', id: 'H' },
      { kind: 'juego', id: 'cuestionario-periodico' },
    ],
  },
];
