import { atom, selector } from 'recoil';
import { getAvailableItems } from './utils';
import { GameStatus, Items, LastSelectionResult } from './types';
import { sample as _sample } from 'lodash';

// Atoms

export const gameStatusState = atom<GameStatus>({
  key: 'gameStatusState',
  default: GameStatus.UNPLAYED,
});

export const lastSelectionResultState = atom<LastSelectionResult>({
  key: 'lastSelectionResultState',
  default: 'none',
});

export const targetItemState = atom<string | undefined>({
  key: 'targetItemState',
  default: undefined,
});

export const selectedItemState = atom<string | undefined>({
  key: 'selectedItemState',
  default: undefined,
});

export const usedItemsState = atom({
  key: 'usedItemsState',
  default: [] as Items,
});

export const streakState = atom({
  key: 'streakState',
  default: 0,
});

export const streakHighState = atom({
  key: 'streakHighState',
  default: 0,
});

export const timerState = atom({
  key: 'timerState',
  default: 0,
});

// timerGameOver is reset in useProcessSelectedState in order to clear it out right away after posting to API
// to prevent dupes
export const timerGameOverState = atom<number | undefined>({
  key: 'timerGameOverState',
  default: undefined,
});

// Note: guesses are reset in MapContainer currently due to the required Map Choropleth connection
export const guessesState = atom<Record<string, number>>({
  key: 'guessesState',
  default: {},
});

// Selectors

export const availableItemsCountState = selector({
  key: 'availableItemsCountState',
  get: ({ get }) => {
    const usedItems = get(usedItemsState);
    const availableItems = getAvailableItems(usedItems);
    return availableItems.length;
  },
});

// Functions

export const endGameFunc = selector({
  key: 'endGameFunc',
  get: () => undefined,
  set: ({ set, reset }) => {
    set(gameStatusState, GameStatus.GAME_OVER);
  },
});

export const endGameManualFunc = selector({
  key: 'endGameManualFunc',
  get: () => undefined,
  set: ({ set, reset }) => {
    set(gameStatusState, GameStatus.GAME_OVER_MANUAL_END_GAME);
  },
});

export const startGameFunc = selector({
  key: 'startGameFunc',
  get: () => undefined,
  set: ({ set, reset }) => {
    reset(selectedItemState);
    reset(streakState);
    reset(streakHighState);
    reset(usedItemsState);
    reset(lastSelectionResultState);
    reset(timerState);

    set(gameStatusState, GameStatus.ACTIVE);

    const availableItems = getAvailableItems([]);
    const randomItem = _sample(availableItems);
    if (randomItem) {
      set(targetItemState, randomItem);
    }
  },
});
