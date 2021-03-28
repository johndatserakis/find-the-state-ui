import { Button, CardActions, CardContent, Typography } from '@material-ui/core';
import { LinearProgressWithLabel } from '../mui/LinearProgressWithLabel';
import { FullSizeCard } from '../mui/FullSizeCard';
import { availableItemsCountState, isGameOverState, resetGameFunc } from '../../recoil/game/game';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const TOTAL_ITEM_COUNT = 48;

export const GameInformation = () => {
  const availableItemsCount = useRecoilValue(availableItemsCountState);
  const isGameOver = useRecoilValue(isGameOverState);
  const currentPercentage = ((TOTAL_ITEM_COUNT - availableItemsCount) / TOTAL_ITEM_COUNT) * 100;

  const resetGame = useSetRecoilState(resetGameFunc);

  const handleResetClick = () => {
    resetGame(undefined);
  };

  return (
    <FullSizeCard>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Streak: 10
        </Typography>
        <Typography variant="h5">{availableItemsCount} States Left</Typography>
        <LinearProgressWithLabel variant="determinate" value={currentPercentage} />
        <CardActions>
          <Button size="small" color="primary" onClick={handleResetClick}>
            {isGameOver ? 'New Game' : 'Reset Game'}
          </Button>
        </CardActions>
      </CardContent>
    </FullSizeCard>
  );
};
