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
