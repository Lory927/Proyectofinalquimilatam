export type TheoryCategory =
  | 'Fundamentos'
  | 'Enlaces y moléculas'
  | 'Reacciones'
  | 'Disoluciones y pH';

export type LinkKind = 'elemento' | 'molecula' | 'ecuacion' | 'juego' | 'experimento';

export interface LinkTarget {
  kind: LinkKind;
  id: string;
}

export interface TheoryArticle {
  id: string;
  title: string;
  category: TheoryCategory;
  body: string[];
  examples: string[];
  keywords: string[];
  reviewQuestions: string[];
  references: string[];
  relatedLinks: LinkTarget[];
}
