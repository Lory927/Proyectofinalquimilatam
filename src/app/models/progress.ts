import type { GameId } from '@/app/models/game';

export type AchievementCondition =
  | { type: 'correct-answers'; min: number }
  | { type: 'best-streak'; min: number }
  | { type: 'level'; min: number }
  | { type: 'games-completed'; min: number }
  | { type: 'equations-balanced'; min: number }
  | { type: 'elements-viewed'; min: number }
  | { type: 'perfect-game' };

export interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: AchievementCondition;
  reward: {
    xp: number;
    badge: string;
  };
}

export interface GameResult {
  gameId: GameId;
  correct: number;
  incorrect: number;
  points: number;
  completedAt: string;
}

export interface ProgressStats {
  correctAnswers: number;
  gamesCompleted: number;
  perfectGames: number;
  equationsBalanced: number;
  elementsViewed: string[];
}

export interface Progress {
  xp: number;
  level: number;
  streak: number;
  bestStreak: number;
  results: GameResult[];
  unlockedAchievements: string[];
  completedSessions: string[];
  stats: ProgressStats;
}
