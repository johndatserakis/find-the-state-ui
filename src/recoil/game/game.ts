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

// Note: guesses are reset in MapContainer.tsx currently due to the Map Choropleth connection
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
    reset(usedItemsState);
    reset(lastSelectionResultState);

    set(gameStatusState, GameStatus.ACTIVE);

    const availableItems = getAvailableItems([]);
    const randomItem = _sample(availableItems);
    if (randomItem) {
      set(targetItemState, randomItem);
    }
  },
});
