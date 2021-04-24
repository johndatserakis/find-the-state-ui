import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  gameStatusState,
  guessesState,
  lastSelectionResultState,
  selectedItemState,
  streakState,
  targetItemState,
  usedItemsState,
} from '../game';
import { getAvailableItems } from '../../game/utils';
import { sample as _sample } from 'lodash';
import { GameStatus } from '../../game/types';

export const useProcessSelectedState = () => {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const [targetItem, setTargetItem] = useRecoilState(targetItemState);
  const [usedItems, setUsedItems] = useRecoilState(usedItemsState);
  const [gameStatus, setGameStatus] = useRecoilState(gameStatusState);
  const setStreak = useSetRecoilState(streakState);
  const setLastSelectionResult = useSetRecoilState(lastSelectionResultState);
  const [guesses, setGuesses] = useRecoilState(guessesState);
  const isGameOver = gameStatus === GameStatus.GAME_OVER || gameStatus === GameStatus.GAME_OVER_MANUAL_END_GAME;

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
    setUsedItems(newUsedItems);

    const availableItems = getAvailableItems(newUsedItems);
    const randomItem = _sample(availableItems);

    // Capture proper GameStatus.GAME_OVER (not from end button)
    if (!randomItem) {
      setGameStatus(GameStatus.GAME_OVER);
      setSelectedItem(undefined);
      setTargetItem(undefined);
      return;
    }

    setSelectedItem(undefined);
    setTargetItem(randomItem);

    // missing purposely: guesses
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    gameStatus,
    selectedItem,
    setGuesses,
    setGameStatus,
    setLastSelectionResult,
    setSelectedItem,
    setStreak,
    setTargetItem,
    setUsedItems,
    targetItem,
    usedItems,
  ]);
};
