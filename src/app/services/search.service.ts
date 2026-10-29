import {
  getElements,
  getExperiments,
  getGames,
  getMolecules,
  getTheoryArticles,
} from '@/app/services/chemistry-data.service';

export type SearchCategory = 'elementos' | 'moleculas' | 'teoria' | 'juegos' | 'experimentos';

export interface SearchResult {
  category: SearchCategory;
  id: string;
  title: string;
  subtitle: string;
}

export type SearchResults = Record<SearchCategory, SearchResult[]>;

const SUBSCRIPT_DIGITS = /[\u2080-\u2089]/g;
const COMBINING_MARKS = /[\u0300-\u036f]/g;

// Quita acentos, pasa a minúsculas y convierte subíndices (H₂O) en dígitos (h2o).
export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .replace(SUBSCRIPT_DIGITS, (digit) => String(digit.charCodeAt(0) - 0x2080))
    .toLowerCase()
    .trim();
}

function emptyResults(): SearchResults {
  return { elementos: [], moleculas: [], teoria: [], juegos: [], experimentos: [] };
}

export function searchChemistry(query: string): SearchResults {
  const results = emptyResults();
  const term = normalizeSearchText(query);
  if (term === '') {
    return results;
  }
  const matches = (value: string) => normalizeSearchText(value).includes(term);

  for (const element of getElements()) {
    if (
      normalizeSearchText(element.symbol) === term ||
      String(element.atomicNumber) === term ||
      matches(element.name)
    ) {
      results.elementos.push({
        category: 'elementos',
        id: element.symbol,
        title: element.name,
        subtitle: `${element.symbol} · Z = ${element.atomicNumber}`,
      });
    }
  }

  for (const molecule of getMolecules()) {
    if (matches(molecule.name) || matches(molecule.formula) || matches(molecule.id)) {
      results.moleculas.push({
        category: 'moleculas',
        id: molecule.id,
        title: molecule.name,
        subtitle: molecule.formula,
      });
    }
  }

  for (const article of getTheoryArticles()) {
    if (matches(article.title) || matches(article.category) || article.keywords.some(matches)) {
      results.teoria.push({
        category: 'teoria',
        id: article.id,
        title: article.title,
        subtitle: article.category,
      });
    }
  }

  for (const game of getGames()) {
    if (matches(game.name) || matches(game.description)) {
      results.juegos.push({
        category: 'juegos',
        id: game.id,
        title: game.name,
        subtitle: 'Juego',
      });
    }
  }

  for (const experiment of getExperiments()) {
    if (matches(experiment.name) || matches(experiment.description)) {
      results.experimentos.push({
        category: 'experimentos',
        id: experiment.id,
        title: experiment.name,
        subtitle: 'Laboratorio virtual',
      });
    }
  }

  return results;
}
