import { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useTimer } from '../../../../hooks/useTimer';
import { formatNumberToStopwatch } from '../../../../utils/stopwatch';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gameStatusState, timerState } from '../../../../recoil/game/game';
import { GameStatus } from '../../../../recoil/game/types';
import { usePrevious } from 'react-use';

export const Stopwatch = () => {
  const { timer, handlePause, handleReset, handleStart } = useTimer(0);
  const gameStatus = useRecoilValue(gameStatusState);
  const prevGameStatus = usePrevious(gameStatus);
  const setTimer = useSetRecoilState(timerState);
  const isGameOver = gameStatus === GameStatus.GAME_OVER || gameStatus === GameStatus.GAME_OVER_MANUAL_END_GAME;
  const isGameOverNotUserInitiated = gameStatus === GameStatus.GAME_OVER;
  const isPrevGameOver =
    prevGameStatus === GameStatus.GAME_OVER || prevGameStatus === GameStatus.GAME_OVER_MANUAL_END_GAME;
  const isStartingNewGameFromGameOver = gameStatus === GameStatus.ACTIVE && isPrevGameOver;
  const formattedTime = formatNumberToStopwatch(timer);

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

  // To display the timer in the GameInformation card, we're using the timer local to this component. Additionally,
  // we're saving the timer to our store here so we can send it to the API on game over.
  useEffect(() => {
    setTimer(timer);
  }, [setTimer, timer]);

  if (gameStatus === GameStatus.ACTIVE) {
    return (
      <Typography variant="body1" align="center" gutterBottom>
        ⏱ {formattedTime}
      </Typography>
    );
  }

  if (isGameOverNotUserInitiated) {
    return (
      <Typography variant="body1" align="center" gutterBottom>
        ✅{' '}
        <strong>
          <em>{formattedTime}</em>
        </strong>
      </Typography>
    );
  }

  return (
    <Typography variant="body1" align="center" gutterBottom>
      {formattedTime}
    </Typography>
  );
};
