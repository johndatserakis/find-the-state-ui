import { Box, Button, CardActions, CardContent, Chip, Typography } from '@material-ui/core';
import { LinearProgressWithLabel } from '../../mui/LinearProgressWithLabel';
import { FullSizeCard } from '../../mui/FullSizeCard';
import { availableItemsCountState, isGameOverState, resetGameFunc, streakState } from '../../../recoil/game/game';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ReplayRounded } from '@material-ui/icons';
import styled from 'styled-components/macro';

const TOTAL_ITEM_COUNT = 48;

const StyledCard = styled(FullSizeCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const GameInformation = () => {
  const availableItemsCount = useRecoilValue(availableItemsCountState);
  const isGameOver = useRecoilValue(isGameOverState);
  const streak = useRecoilValue(streakState);
  const resetGame = useSetRecoilState(resetGameFunc);
  const currentPercentage = ((TOTAL_ITEM_COUNT - availableItemsCount) / TOTAL_ITEM_COUNT) * 100;

  return (
    <StyledCard>
      <StyledCardContent>
        <Box visibility={streak > 0 ? 'visible' : 'hidden'}>
          <Typography color="textSecondary" align="center" gutterBottom>
            <Chip label={`Streak: ${streak}`} variant="outlined" color="primary" />
          </Typography>
        </Box>
        {isGameOver ? (
          <Typography variant="h4" align="center" gutterBottom>
            <strong>Game Over</strong>
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom>
            <strong>
              {availableItemsCount} State{availableItemsCount !== 1 ? 's' : ''} Left
            </strong>
          </Typography>
        )}
        <LinearProgressWithLabel variant="determinate" value={currentPercentage} />
      </StyledCardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<ReplayRounded />}
          onClick={() => resetGame(undefined)}
          fullWidth
        >
          {isGameOver ? 'New Game' : 'Reset Game'}
        </Button>
      </CardActions>
    </StyledCard>
  );
};
