import { selector } from 'recoil';
import { targetItemState } from '../game';
import { get as getState } from '../../../api/state';
import { pinkyPromise } from '../../../utils/general';

export const currentState = selector({
  key: 'currentState',
  get: async ({ get }) => {
    const targetItem = get(targetItemState);
    if (!targetItem) return;

    await pinkyPromise(3000);

    return await getState(targetItem);
  },
});
