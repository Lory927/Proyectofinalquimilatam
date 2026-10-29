import { ACHIEVEMENTS } from '@/app/data/achievements';
import { GAME_IDS, type GameId } from '@/app/models/game';
import type { GameResult, Progress } from '@/app/models/progress';
import { unlockAchievements } from '@/app/services/achievement.service';
import { calculateAnswerPoints, levelFromXp } from '@/app/services/score.service';

const STORAGE_KEY = 'quimilatam-progress';
const MAX_RESULTS = 50;
const MAX_COMPLETED_SESSIONS = 100;

type Listener = () => void;

export interface GameSummary {
  gameId: GameId;
  correct: number;
  incorrect: number;
  points: number;
}

function createEmptyProgress(): Progress {
  return {
    xp: 0,
    level: 1,
    streak: 0,
    bestStreak: 0,
    results: [],
    unlockedAchievements: [],
    completedSessions: [],
    stats: {
      correctAnswers: 0,
      gamesCompleted: 0,
      perfectGames: 0,
      equationsBalanced: 0,
      elementsViewed: [],
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toCount(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

function toStringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function isGameId(value: unknown): value is GameId {
  return typeof value === 'string' && (GAME_IDS as readonly string[]).includes(value);
}

function toResults(value: unknown): GameResult[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .flatMap((item): GameResult[] => {
      if (!isRecord(item) || !isGameId(item.gameId) || typeof item.completedAt !== 'string') {
        return [];
      }
      return [
        {
          gameId: item.gameId,
          correct: toCount(item.correct),
          incorrect: toCount(item.incorrect),
          points: toCount(item.points),
          completedAt: item.completedAt,
        },
      ];
    })
    .slice(-MAX_RESULTS);
}

function sanitizeProgress(raw: unknown): Progress {
  if (!isRecord(raw)) {
    return createEmptyProgress();
  }
  const stats = isRecord(raw.stats) ? raw.stats : {};
  const xp = toCount(raw.xp);
  return {
    xp,
    level: levelFromXp(xp),
    streak: toCount(raw.streak),
    bestStreak: toCount(raw.bestStreak),
    results: toResults(raw.results),
    unlockedAchievements: toStringList(raw.unlockedAchievements),
    completedSessions: toStringList(raw.completedSessions).slice(-MAX_COMPLETED_SESSIONS),
    stats: {
      correctAnswers: toCount(stats.correctAnswers),
      gamesCompleted: toCount(stats.gamesCompleted),
      perfectGames: toCount(stats.perfectGames),
      equationsBalanced: toCount(stats.equationsBalanced),
      elementsViewed: toStringList(stats.elementsViewed),
    },
  };
}

function readStoredProgress(): Progress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw === null ? createEmptyProgress() : sanitizeProgress(JSON.parse(raw));
  } catch {
    return createEmptyProgress();
  }
}

let state: Progress = readStoredProgress();
const listeners = new Set<Listener>();

function commit(next: Progress) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Sin almacenamiento disponible, el progreso se mantiene solo en memoria.
  }
  listeners.forEach((listener) => listener());
}

function update(change: (current: Progress) => Progress) {
  commit(unlockAchievements(change(state), ACHIEVEMENTS));
}

export function getProgress(): Progress {
  return state;
}

export interface GameProgressSummary {
  plays: number;
  bestPoints: number;
}

export function getGameProgressSummary(progress: Progress, gameId: GameId): GameProgressSummary {
  const plays = progress.results.filter((result) => result.gameId === gameId);
  return {
    plays: plays.length,
    bestPoints: plays.reduce((best, result) => Math.max(best, result.points), 0),
  };
}

export function subscribeProgress(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Suma los puntos de la respuesta de inmediato y devuelve los puntos ganados.
export function recordAnswer(correct: boolean): number {
  const streak = correct ? state.streak + 1 : 0;
  const points = correct ? calculateAnswerPoints(streak) : 0;
  update((current) => {
    const xp = current.xp + points;
    return {
      ...current,
      xp,
      level: levelFromXp(xp),
      streak,
      bestStreak: Math.max(current.bestStreak, streak),
      stats: {
        ...current.stats,
        correctAnswers: current.stats.correctAnswers + (correct ? 1 : 0),
      },
    };
  });
  return points;
}

// Registra una actividad terminada. Un mismo sessionId solo se contabiliza una vez.
export function finishGame(sessionId: string, summary: GameSummary): boolean {
  if (state.completedSessions.includes(sessionId)) {
    return false;
  }
  const perfect = summary.incorrect === 0 && summary.correct > 0;
  update((current) => ({
    ...current,
    results: [...current.results, { ...summary, completedAt: new Date().toISOString() }].slice(-MAX_RESULTS),
    completedSessions: [...current.completedSessions, sessionId].slice(-MAX_COMPLETED_SESSIONS),
    stats: {
      ...current.stats,
      gamesCompleted: current.stats.gamesCompleted + 1,
      perfectGames: current.stats.perfectGames + (perfect ? 1 : 0),
    },
  }));
  return true;
}

export function recordEquationBalanced() {
  update((current) => ({
    ...current,
    stats: { ...current.stats, equationsBalanced: current.stats.equationsBalanced + 1 },
  }));
}

export function markElementViewed(symbol: string) {
  if (state.stats.elementsViewed.includes(symbol)) {
    return;
  }
  update((current) => ({
    ...current,
    stats: { ...current.stats, elementsViewed: [...current.stats.elementsViewed, symbol] },
  }));
}
