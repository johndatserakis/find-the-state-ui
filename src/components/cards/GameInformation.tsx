import { Button, CardActions, CardContent, Typography } from '@material-ui/core';
import { LinearProgressWithLabel } from '../mui/LinearProgressWithLabel';
import { FullSizeCard } from '../mui/FullSizeCard';
import { availableItemsCountState, isGameOverState, resetGameFunc, streakState } from '../../recoil/game/game';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const TOTAL_ITEM_COUNT = 48;

export const GameInformation = () => {
  const availableItemsCount = useRecoilValue(availableItemsCountState);
  const isGameOver = useRecoilValue(isGameOverState);
  const streak = useRecoilValue(streakState);
  const resetGame = useSetRecoilState(resetGameFunc);
  const currentPercentage = ((TOTAL_ITEM_COUNT - availableItemsCount) / TOTAL_ITEM_COUNT) * 100;

  return (
    <FullSizeCard>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Streak: {streak}
        </Typography>
        <Typography variant="h5">
          {isGameOver ? (
            <>Game Over</>
          ) : (
            <>
              {availableItemsCount} State{availableItemsCount !== 1 ? 's' : ''} Left
            </>
          )}
        </Typography>
        <LinearProgressWithLabel variant="determinate" value={currentPercentage} />
        <CardActions>
          <Button size="small" color="primary" onClick={() => resetGame(undefined)}>
            {isGameOver ? 'New Game' : 'Reset Game'}
          </Button>
        </CardActions>
      </CardContent>
    </FullSizeCard>
  );
};
