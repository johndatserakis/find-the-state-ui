import { useEffect } from 'react';
import { usePrevious } from 'react-use';
import { GameStatus, IsGameOver } from '../program/types/game';
import { useTimer } from './useTimer';

interface UseGameStopwatchProps {
  gameStatus: GameStatus;
  isGameOver: IsGameOver;
  setTimer: (time: number) => void;
}

export const useGameStopwatch = ({ gameStatus, isGameOver, setTimer }: UseGameStopwatchProps) => {
  const { timer, handlePause, handleReset, handleStart } = useTimer(0);
  const prevGameStatus = usePrevious(gameStatus);

  const isPrevGameOver =
    prevGameStatus === GameStatus.GAME_OVER || prevGameStatus === GameStatus.GAME_OVER_MANUAL_END_GAME;
  const isStartingNewGameFromGameOver = gameStatus === GameStatus.ACTIVE && isPrevGameOver;

  // TODO: The functions exported from the useTimer hook need to be thrown into some useCallbacks I believe,
  // because they cause unnecessary rerenders that force me to exclude them in the useEffects below.
  // And actually, that issue is what's not allowing me to ditch the useEffects completely.
  // When I get some time I'll look into it.

  // Initial load
  useEffect(() => {
    handleStart();

    return () => {
      handleReset();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Main game handling
  useEffect(() => {
    if (isGameOver) {
      handlePause();
    }

    if (isStartingNewGameFromGameOver) {
      handleReset();
      handleStart();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

  // Sync the store's timer value with the local timer value
  useEffect(() => {
    setTimer(timer);
  }, [setTimer, timer]);
};
