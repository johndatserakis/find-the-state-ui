import { Typography } from '@mui/material';
import { useGameStopwatch } from '../../../../hooks/useGameStopwatch';
import { GameStatus, IsGameOver, Timer } from '../../../../types/game';
import { formatNumberToStopwatch } from '../../../../utils/stopwatch';

interface StopwatchProps {
  gameStatus: GameStatus;
  isGameOver: IsGameOver;
  setTimer: (time: number) => void;
  setTimerGameOver: (time: number) => void;
  timer: Timer;
}

export const Stopwatch = ({ gameStatus, isGameOver, setTimer, setTimerGameOver, timer }: StopwatchProps) => {
  // Init this hook here instad of the main page so it can adopt the lifecyle of this view
  useGameStopwatch({ gameStatus, isGameOver, setTimer, setTimerGameOver });

  const formattedTime = formatNumberToStopwatch(timer);
  const isGameOverNotUserInitiated = gameStatus === GameStatus.GAME_OVER;

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
