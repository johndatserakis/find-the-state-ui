import { selector } from 'recoil';
import { targetItemState } from '../game';
import { get as getState } from '../../../api/state';

export const currentState = selector({
  key: 'currentState',
  get: async ({ get }) => {
    const targetItem = get(targetItemState);
    if (!targetItem) return;

    return await getState(targetItem);
  },
});
