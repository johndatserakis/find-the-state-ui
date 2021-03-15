import { atom, selector } from 'recoil';
import _states from '../data/states.json';

type Items = string[];

const items = _states as Items;

export const targetItemState = atom({
  key: 'targetItemState',
  default: '',
});

export const usedItemsState = atom({
  key: 'usedItemsState',
  default: [] as Items,
});

export const availableItemsState = selector({
  key: 'availableItems',
  get: ({ get }) => {
    const usedItems = get(usedItemsState);
    const available = items.filter((item) => !usedItems.includes(item));

    return available;
  },
});

export const availableItemsCount = selector({
  key: 'availableItemsCount',
  get: ({ get }) => {
    const availableItems = get(availableItemsState);
    return availableItems.length;
  },
});
