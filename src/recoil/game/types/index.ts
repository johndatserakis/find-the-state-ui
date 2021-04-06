export type Items = string[];

export type LastSelectionResult = 'correct' | 'incorrect' | 'none';

export interface State {
  image: string;
  link: string;
  name: string;
  summary: string;
}
