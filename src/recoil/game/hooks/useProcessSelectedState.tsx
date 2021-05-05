import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  gameStatusState,
  guessesState,
  lastSelectionResultState,
  selectedItemState,
  streakState,
  streakHighState,
  targetItemState,
  timerState,
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
  const setStreakHigh = useSetRecoilState(streakHighState);
  const setLastSelectionResult = useSetRecoilState(lastSelectionResultState);
  const [guesses, setGuesses] = useRecoilState(guessesState);
  const timer = useRecoilValue(timerState);
  const isGameOver = gameStatus === GameStatus.GAME_OVER || gameStatus === GameStatus.GAME_OVER_MANUAL_END_GAME;

  // TODO: Fix the timer so it doesn't force a rerender each second when a wrong answer is made. I already tried
  // putting it into a `useRecoilCallback` but that made the high score submit twice - only in prod.
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

    /*
      TODO: Take a look at what can be done about state data from recoil being one render late. I'd like to avoid having many excessive useEffects just to grab differences in a single value. The issue below is that I need the up-to-date `streak` to set the `streakHigh`, but my `streak` value is a render late here, that's why I have to use the `prevStreak` from the recoil setter. That's all fine, but the issue is componded when I need *that* value later as is the  case here, for example, the API call to store the `streakHigh`.

      To add, I've tried using `useRecoilCallback` to retrieve the `streakHigh`, but it seems like because I'm updating that value in this very same useEffect, I still have the "one render late" problem.

      Similarly, the `timer` gave me trouble when using it in a callback here - it made the high score get submitted twice.
    */

    let newStreak: number = 0;
    let newStreakHigh: number = 0;

    setStreak((prevStreak) => {
      const s = prevStreak + 1;
      newStreak = s;

      return s;
    });

    setStreakHigh((prevStreakHigh) => {
      if (newStreak > prevStreakHigh) {
        newStreakHigh = newStreak;
        return newStreak;
      }

      newStreakHigh = prevStreakHigh;
      return prevStreakHigh;
    });

    const newUsedItems = [...usedItems, selectedItem];
    setUsedItems(newUsedItems);

    const availableItems = getAvailableItems(newUsedItems);
    const randomItem = _sample(availableItems);

    // Capture proper GameStatus.GAME_OVER (not from end button)
    if (!randomItem) {
      const formattedTimeDatabase = formatStopwatchForDatabase(timer);

      try {
        postScore({
          score: formattedTimeDatabase,
          streak_high: newStreakHigh,
        });
      } catch (error) {
        console.error(error);
      }

      setGameStatus(GameStatus.GAME_OVER);
      setSelectedItem(undefined);
      setTargetItem(undefined);
      return;
    }

    setSelectedItem(undefined);
    setTargetItem(randomItem);

    // missing purposely: guesses, timer
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
};
