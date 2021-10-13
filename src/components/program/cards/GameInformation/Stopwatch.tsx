import { Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useGameStopwatch } from '../../../../hooks/useGameStopwatch';
import { gameStatusState, timerState } from '../../../../recoil/game';
import { GameStatus } from '../../../../recoil/types';
import { formatNumberToStopwatch } from '../../../../utils/stopwatch';

export const Stopwatch = () => {
  // We init this hook here instad of Home.tsx so it can adopt the lifecyle of this view.
  useGameStopwatch();

  const gameStatus = useRecoilValue(gameStatusState);
  const timer = useRecoilValue(timerState);
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
