const BASE_POINTS_PER_CORRECT = 10;
const STREAK_BONUS_PER_STEP = 2;
const MAX_STREAK_STEPS = 5;
const LEVEL_XP_FACTOR = 50;
const MAX_LEVEL = 100;

export interface LevelProgress {
  level: number;
  currentXp: number;
  levelSpan: number;
  percent: number;
}

export function calculateAnswerPoints(streak: number): number {
  const bonusSteps = Math.min(Math.max(streak - 1, 0), MAX_STREAK_STEPS);
  return BASE_POINTS_PER_CORRECT + bonusSteps * STREAK_BONUS_PER_STEP;
}

export function xpRequiredForLevel(level: number): number {
  return LEVEL_XP_FACTOR * (level - 1) * level;
}

export function levelFromXp(xp: number): number {
  let level = 1;
  while (level < MAX_LEVEL && xp >= xpRequiredForLevel(level + 1)) {
    level += 1;
  }
  return level;
}

export function getLevelProgress(xp: number): LevelProgress {
  const level = levelFromXp(xp);
  const levelStart = xpRequiredForLevel(level);
  const levelSpan = xpRequiredForLevel(level + 1) - levelStart;
  const currentXp = xp - levelStart;
  return {
    level,
    currentXp,
    levelSpan,
    percent: Math.min((currentXp / levelSpan) * 100, 100),
  };
}
