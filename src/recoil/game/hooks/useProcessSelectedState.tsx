import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isGameOverState, selectedItemState, streakState, targetItemState, usedItemsState } from '../game';
import { getAvailableItems } from '../../game/utils';
import { sample as _sample } from 'lodash';

export const useProcessSelectedState = () => {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const [targetItem, setTargetItem] = useRecoilState(targetItemState);
  const [usedItems, setUsedItems] = useRecoilState(usedItemsState);
  const setIsGameOver = useSetRecoilState(isGameOverState);
  const setStreak = useSetRecoilState(streakState);

  useEffect(() => {
    if (!selectedItem) return;

    if (selectedItem !== targetItem) {
      setStreak(0);
      return;
    }

    setStreak((prevStreak) => prevStreak + 1);

    const newUsedItems = [...usedItems, selectedItem];

    const availableItems = getAvailableItems(newUsedItems);

    const randomItem = _sample(availableItems);

    if (!randomItem) {
      setIsGameOver(true);
      setSelectedItem(undefined);
      setTargetItem(undefined);
      return;
    }

    setSelectedItem(undefined);
    setTargetItem(randomItem);
    setUsedItems(newUsedItems);
  }, [selectedItem, setIsGameOver, setSelectedItem, setTargetItem, setUsedItems, targetItem, usedItems]);
};
