import { COMPOUND_PAIRS } from '@/app/data/compound-pairs';
import { ELEMENTS } from '@/app/data/elements';
import { EQUATIONS } from '@/app/data/equations';
import { EXPERIMENTS } from '@/app/data/experiments';
import { GAMES } from '@/app/data/games';
import { MOLECULES } from '@/app/data/molecules';
import { PERIODIC_QUESTIONS } from '@/app/data/periodic-questions';
import { THEORY_ARTICLES } from '@/app/data/theory-content';
import type { GameDefinition } from '@/app/models/game';
import type { CompoundPair, Equation, Question } from '@/app/models/quiz';
import type { ChemicalElement, Molecule } from '@/app/models/chemistry';
import type { Experiment } from '@/app/models/experiment';
import type { TheoryArticle } from '@/app/models/theory';

export function getElements(): ChemicalElement[] {
  return ELEMENTS;
}

export function getElementBySymbol(symbol: string): ChemicalElement | undefined {
  return ELEMENTS.find((element) => element.symbol === symbol);
}

export function getMolecules(): Molecule[] {
  return MOLECULES;
}

export function getMoleculeById(id: string): Molecule | undefined {
  return MOLECULES.find((molecule) => molecule.id === id);
}

export function getMoleculesWithElement(symbol: string): Molecule[] {
  return MOLECULES.filter((molecule) => molecule.composition.some((part) => part.element === symbol));
}

export function getElementsOfMolecule(molecule: Molecule): ChemicalElement[] {
  return molecule.composition.flatMap((part) => {
    const element = getElementBySymbol(part.element);
    return element ? [element] : [];
  });
}

export function getExperiments(): Experiment[] {
  return EXPERIMENTS;
}

export function getExperimentById(id: string): Experiment | undefined {
  return EXPERIMENTS.find((experiment) => experiment.id === id);
}

export function getTheoryArticles(): TheoryArticle[] {
  return THEORY_ARTICLES;
}

export function getTheoryArticleById(id: string): TheoryArticle | undefined {
  return THEORY_ARTICLES.find((article) => article.id === id);
}

export function getGames(): GameDefinition[] {
  return GAMES;
}

export function getCompoundPairs(): CompoundPair[] {
  return COMPOUND_PAIRS;
}

export function getEquations(): Equation[] {
  return EQUATIONS;
}

export function getPeriodicQuestions(): Question[] {
  return PERIODIC_QUESTIONS;
}

export function getGameById(id: string): GameDefinition | undefined {
  return GAMES.find((game) => game.id === id);
}
