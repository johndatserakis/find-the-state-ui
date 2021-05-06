import { Typography } from '@material-ui/core';
import { GameStatus } from '../../../../recoil/game/types';
import { formatNumberToStopwatch } from '../../../../utils/stopwatch';
import { useRecoilValue } from 'recoil';
import { gameStatusState, timerState } from '../../../../recoil/game/game';
import { useGameStopwatch } from '../../../../hooks/useGameStopwatch';

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
