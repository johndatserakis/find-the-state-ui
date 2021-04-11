import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  guessesState,
  isGameOverState,
  lastSelectionResultState,
  selectedItemState,
  streakState,
  targetItemState,
  usedItemsState,
} from '../game';
import { getAvailableItems } from '../../game/utils';
import { sample as _sample } from 'lodash';

export const useProcessSelectedState = () => {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const [targetItem, setTargetItem] = useRecoilState(targetItemState);
  const [usedItems, setUsedItems] = useRecoilState(usedItemsState);
  const [isGameOver, setIsGameOver] = useRecoilState(isGameOverState);
  const setStreak = useSetRecoilState(streakState);
  const setLastSelectionResult = useSetRecoilState(lastSelectionResultState);
  const [guesses, setGuesses] = useRecoilState(guessesState);

  useEffect(() => {
    if (isGameOver) return;
    if (!selectedItem) return;
    if (!targetItem) return;

    if (selectedItem !== targetItem) {
      setStreak(0);
      setLastSelectionResult('incorrect');

      const currentGuesses = { ...guesses };
      const guessCountForCurrentTarget = currentGuesses[targetItem] || 0;
      currentGuesses[targetItem] = guessCountForCurrentTarget + 1;
      setGuesses(currentGuesses);

      return;
    }

    setStreak((prevStreak) => prevStreak + 1);
    setLastSelectionResult('correct');

    const newUsedItems = [...usedItems, selectedItem];
    const availableItems = getAvailableItems(newUsedItems);
    const randomItem = _sample(availableItems);
    setUsedItems(newUsedItems);

    if (!randomItem) {
      setIsGameOver(true);
      setSelectedItem(undefined);
      setTargetItem(undefined);
      return;
    }

    setSelectedItem(undefined);
    setTargetItem(randomItem);

    // missing purposely: guesses
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isGameOver,
    selectedItem,
    setGuesses,
    setIsGameOver,
    setLastSelectionResult,
    setSelectedItem,
    setStreak,
    setTargetItem,
    setUsedItems,
    targetItem,
    usedItems,
  ]);
};
