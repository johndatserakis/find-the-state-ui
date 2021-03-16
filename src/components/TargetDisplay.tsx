import { availableItemsCount, targetItemState } from '../recoil/game';
import { useRecoilValue } from 'recoil';
import { Paragraph } from '../components/chakra/Paragraph';

export const TargetDisplay = () => {
  const targetItem = useRecoilValue(targetItemState);
  const availableItems = useRecoilValue(availableItemsCount);

  return (
    <Paragraph>
      🔍 Find this state: <strong>{targetItem}</strong> <em>(States left: {availableItems})</em>
    </Paragraph>
  );
};
