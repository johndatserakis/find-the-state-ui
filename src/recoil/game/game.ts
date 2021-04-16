import { atom, selector } from 'recoil';
import { getAvailableItems } from './utils';
import { Items, LastSelectionResult } from './types';
import { sample as _sample } from 'lodash';

// TODO: Add another atom that holds the current state of the game - pending, active - perhaps that can help reduce
// the overreliance on isGameOverState and lastSelectionResultState's "none"

// Atoms

export const isGameOverState = atom({
  key: 'isGameOverState',
  default: false,
});

// You can watch for 'none' to determine if a new game is being started
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

export const resetGameFunc = selector({
  key: 'resetGame',
  get: () => undefined,
  set: ({ set, reset }) => {
    reset(isGameOverState);
    reset(selectedItemState);
    reset(streakState);
    reset(usedItemsState);
    reset(lastSelectionResultState);

    const availableItems = getAvailableItems([]);
    const randomItem = _sample(availableItems);
    if (randomItem) {
      set(targetItemState, randomItem);
    }
  },
});
