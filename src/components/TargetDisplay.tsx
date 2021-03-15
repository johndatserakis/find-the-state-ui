import { availableItemsCount, targetItemState } from '../recoil/game';
import { useRecoilValue } from 'recoil';

export const TargetDisplay = () => {
  const targetItem = useRecoilValue(targetItemState);
  const availableItems = useRecoilValue(availableItemsCount);

  return (
    <p>
      🔍 Find this state: <strong>{targetItem}</strong> <em>(States left: {availableItems})</em>
    </p>
  );
};
