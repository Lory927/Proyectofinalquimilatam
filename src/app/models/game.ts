export const GAME_IDS = [
  'cuestionario-periodico',
  'memorama-formulas',
  'memorama-moleculas',
  'balanceo-ecuaciones',
] as const;

export type GameId = (typeof GAME_IDS)[number];

export interface GameDefinition {
  id: GameId;
  name: string;
  description: string;
}
