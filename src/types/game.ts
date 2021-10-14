export interface Score {
  score: string;
  streak_high: number;
}

export type Scores = Score[];

export type Items = string[];

export type LastSelectionResult = 'correct' | 'incorrect' | 'none';

export interface State {
  image: string;
  link: string;
  name: string;
  summary: string;
}

export enum GameStatus {
  UNPLAYED = 'unplayed',
  ACTIVE = 'active',
  GAME_OVER = 'game-over',
  GAME_OVER_MANUAL_END_GAME = 'game-over-manual-end-game',
}

export type Guesses = Record<string, number>;
export type IsGameOver = boolean;
export type SelectedItem = string | undefined;
export type Streak = number;
export type StreakHigh = number;
export type TargetItem = string | undefined;
export type Timer = number;
export type TimerGameOver = number | undefined;
export type AvailableItemsCount = number;
