import { useEffect } from 'react';
import { usePrevious } from 'react-use';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gameStatusState, timerState, timerGameOverState } from '../recoil/game';
import { GameStatus } from '../recoil/types';
import { useTimer } from './useTimer';

export const useGameStopwatch = () => {
  const { timer, handlePause, handleReset, handleStart } = useTimer(0);
  const gameStatus = useRecoilValue(gameStatusState);
  const prevGameStatus = usePrevious(gameStatus);
  const setTimer = useSetRecoilState(timerState);
  const setTimerGameOver = useSetRecoilState(timerGameOverState);
  const isGameOver = gameStatus === GameStatus.GAME_OVER || gameStatus === GameStatus.GAME_OVER_MANUAL_END_GAME;
  const isGameOverNotUserInitiated = gameStatus === GameStatus.GAME_OVER;
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

    if (isGameOverNotUserInitiated) {
      setTimerGameOver(timer);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

  // Sync the store's timer value with the local timer value
  useEffect(() => {
    setTimer(timer);
  }, [setTimer, timer]);
};
