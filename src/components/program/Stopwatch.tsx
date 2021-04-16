import { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useTimer } from '../../hooks/useTimer';
import { formatTime } from '../../utils/time';
import { useRecoilValue } from 'recoil';
import { isGameOverState, lastSelectionResultState } from '../../recoil/game/game';

export const Stopwatch = () => {
  const { timer, handlePause, handleReset, handleStart } = useTimer(0);
  const isGameOver = useRecoilValue(isGameOverState);
  const lastSelectionResult = useRecoilValue(lastSelectionResultState);

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
      // Handle game over
      handlePause();
    } else {
      // Handle new game
      handleReset();
      handleStart();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameOver]);

  // Listen for a new game being started
  useEffect(() => {
    if (lastSelectionResult === 'none') {
      handleReset();
      handleStart();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSelectionResult]);

  return (
    <Typography variant="body1" align="center" gutterBottom>
      {formatTime(timer)}
    </Typography>
  );
};
