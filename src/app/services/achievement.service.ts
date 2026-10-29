import type { Achievement, AchievementCondition, Progress } from '@/app/models/progress';
import { levelFromXp } from '@/app/services/score.service';

function isConditionMet(progress: Progress, condition: AchievementCondition): boolean {
  switch (condition.type) {
    case 'correct-answers':
      return progress.stats.correctAnswers >= condition.min;
    case 'best-streak':
      return progress.bestStreak >= condition.min;
    case 'level':
      return progress.level >= condition.min;
    case 'games-completed':
      return progress.stats.gamesCompleted >= condition.min;
    case 'equations-balanced':
      return progress.stats.equationsBalanced >= condition.min;
    case 'elements-viewed':
      return progress.stats.elementsViewed.length >= condition.min;
    case 'perfect-game':
      return progress.stats.perfectGames >= 1;
  }
}

// Desbloquea los logros cumplidos una sola vez y suma su recompensa de XP.
export function unlockAchievements(progress: Progress, achievements: Achievement[]): Progress {
  let current = progress;
  while (true) {
    const pending = achievements.filter(
      (achievement) =>
        !current.unlockedAchievements.includes(achievement.id) &&
        isConditionMet(current, achievement.condition),
    );
    if (pending.length === 0) {
      return current;
    }
    const xp = current.xp + pending.reduce((sum, achievement) => sum + achievement.reward.xp, 0);
    current = {
      ...current,
      xp,
      level: levelFromXp(xp),
      unlockedAchievements: [...current.unlockedAchievements, ...pending.map((achievement) => achievement.id)],
    };
  }
}
