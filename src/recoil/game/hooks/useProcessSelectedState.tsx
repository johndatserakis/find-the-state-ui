import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  gameStatusState,
  guessesState,
  lastSelectionResultState,
  selectedItemState,
  streakState,
  streakHighState,
  targetItemState,
  timerGameOverState,
  usedItemsState,
} from '../game';
import { getAvailableItems } from '../../game/utils';
import { sample as _sample } from 'lodash';
import { GameStatus } from '../../game/types';
import { formatStopwatchForDatabase } from '../../../utils/stopwatch';
import { post as postScore } from '../../../api/score';

export const useProcessSelectedState = () => {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const [targetItem, setTargetItem] = useRecoilState(targetItemState);
  const [usedItems, setUsedItems] = useRecoilState(usedItemsState);
  const [gameStatus, setGameStatus] = useRecoilState(gameStatusState);
  const setStreak = useSetRecoilState(streakState);
  const [streakHigh, setStreakHigh] = useRecoilState(streakHighState);
  const setLastSelectionResult = useSetRecoilState(lastSelectionResultState);
  const [guesses, setGuesses] = useRecoilState(guessesState);
  const timerGameOver = useRecoilValue(timerGameOverState);
  const resetTimerGameOver = useResetRecoilState(timerGameOverState);
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

    setLastSelectionResult('correct');

    let newStreak: number = 0;

    setStreak((prevStreak) => {
      const s = prevStreak + 1;
      newStreak = s;

      return s;
    });

    setStreakHigh((prevStreakHigh) => {
      if (newStreak > prevStreakHigh) {
        return newStreak;
      }

      return prevStreakHigh;
    });

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
    isGameOver,
    selectedItem,
    setGameStatus,
    setGuesses,
    setLastSelectionResult,
    setSelectedItem,
    setStreak,
    setStreakHigh,
    setTargetItem,
    setUsedItems,
    targetItem,
    usedItems,
  ]);

  useEffect(() => {
    // https://github.com/facebook/react/issues/14326#issuecomment-441680293
    async function post() {
      if (gameStatus !== GameStatus.GAME_OVER) return;
      if (timerGameOver === undefined) return;

      const formattedTimeDatabase = formatStopwatchForDatabase(timerGameOver);

      try {
        await postScore({
          score: formattedTimeDatabase,
          streak_high: streakHigh,
        });

        resetTimerGameOver();
      } catch (error) {
        console.error(error);
      }
    }

    post();
  }, [gameStatus, resetTimerGameOver, streakHigh, timerGameOver]);
};
