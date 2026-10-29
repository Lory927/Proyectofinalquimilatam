import type { Equation } from '@/app/models/quiz';
import type { LinkKind, LinkTarget, TheoryArticle, TheoryCategory } from '@/app/models/theory';
import {
  getElementBySymbol,
  getEquations,
  getExperimentById,
  getGameById,
  getMoleculeById,
} from '@/app/services/chemistry-data.service';
import { normalizeSearchText } from '@/app/services/search.service';

export type TheoryCategoryFilter = 'todas' | TheoryCategory;

export const LINK_KIND_LABELS: Record<LinkKind, string> = {
  elemento: 'Elemento',
  molecula: 'Molécula',
  ecuacion: 'Ecuación',
  juego: 'Juego',
  experimento: 'Experimento',
};

export interface ResolvedLink {
  kind: string;
  name: string;
}

export function getTheoryCategories(articles: TheoryArticle[]): TheoryCategory[] {
  return [...new Set(articles.map((article) => article.category))];
}

export function filterTheoryArticles(
  articles: TheoryArticle[],
  query: string,
  category: TheoryCategoryFilter,
): TheoryArticle[] {
  const term = normalizeSearchText(query);

  return articles.filter((article) => {
    if (category !== 'todas' && article.category !== category) {
      return false;
    }
    if (term === '') {
      return true;
    }
    return [article.title, article.category, ...article.keywords].some((value) =>
      normalizeSearchText(value).includes(term),
    );
  });
}

function formatEquation(equation: Equation): string {
  return `${equation.reactants.join(' + ')} → ${equation.products.join(' + ')}`;
}

function resolveName(link: LinkTarget): string {
  switch (link.kind) {
    case 'elemento':
      return getElementBySymbol(link.id)?.name ?? link.id;
    case 'molecula':
      return getMoleculeById(link.id)?.name ?? link.id;
    case 'ecuacion': {
      const equation = getEquations().find((item) => item.id === link.id);
      return equation ? formatEquation(equation) : link.id;
    }
    case 'juego':
      return getGameById(link.id)?.name ?? link.id;
    case 'experimento':
      return getExperimentById(link.id)?.name ?? link.id;
  }
}

export function resolveLink(link: LinkTarget): ResolvedLink {
  return { kind: LINK_KIND_LABELS[link.kind], name: resolveName(link) };
}
