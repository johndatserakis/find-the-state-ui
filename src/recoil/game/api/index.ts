import { selector } from 'recoil';
import { get as getState } from '../../../api/state';
import { targetItemState } from '../game';

export const currentState = selector({
  key: 'currentState',
  get: async ({ get }) => {
    const targetItem = get(targetItemState);
    if (!targetItem) return;

    return await getState(targetItem);
  },
});
