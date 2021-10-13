import { useEffect } from 'react';
import { sample as _sample } from 'lodash';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { post as postScore } from '../../api/score';
import { formatStopwatchForDatabase } from '../../utils/stopwatch';
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
import { GameStatus } from '../types';
import { getAvailableItems } from '../utils';

export const GameLoop = () => {
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

  // Main game loop
  useEffect(() => {
    if (isGameOver) return;
    if (!selectedItem) return;
    if (!targetItem) return;

    // Wrong guess
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

    let newStreak = 0;

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

    // Missing purposely: guesses
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

  // Putting this seperate to isolate the game over API call
  useEffect(() => {
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
      } catch (error) {}
    }

    post();
  }, [gameStatus, resetTimerGameOver, streakHigh, timerGameOver]);

  return <></>;
};
