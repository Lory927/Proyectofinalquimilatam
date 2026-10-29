import type { GameId } from '@/app/models/game';
import type { Question } from '@/app/models/quiz';
import { shuffle } from '@/app/services/random.service';

export interface QuizSession {
  id: string;
  gameId: GameId;
  questions: Question[];
}

export function createSessionId(gameId: GameId): string {
  return `${gameId}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createQuizSession(gameId: GameId, questions: Question[]): QuizSession {
  return { id: createSessionId(gameId), gameId, questions: shuffle(questions) };
}

export function evaluateAnswer(question: Question, selectedIndex: number): boolean {
  return selectedIndex === question.correctIndex;
}
