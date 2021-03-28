import { atom, selector } from 'recoil';
import { getAvailableItems } from './utils';
import { Items } from './types';
import { sample as _sample } from 'lodash';

export const isGameOverState = atom({
  key: 'isGameOverState',
  default: false,
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
  set: ({ get, set, reset }) => {
    reset(isGameOverState);
    reset(selectedItemState);
    reset(streakState);
    reset(targetItemState);
    reset(usedItemsState);

    const availableItems = getAvailableItems([]);
    const randomItem = _sample(availableItems);
    if (randomItem) {
      set(targetItemState, randomItem);
    }
  },
});
