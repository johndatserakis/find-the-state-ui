import { Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { availableItemsCountState, gameStatusState } from '../../../../recoil/game/game';
import { GameStatus } from '../../../../recoil/game/types';

export const GameStatusHeader = () => {
  const availableItemsCount = useRecoilValue(availableItemsCountState);
  const gameStatus = useRecoilValue(gameStatusState);
  const isGameOver = gameStatus === GameStatus.GAME_OVER || gameStatus === GameStatus.GAME_OVER_MANUAL_END_GAME;

  if (isGameOver) {
    return (
      <Typography variant="h6" align="center" gutterBottom>
        <strong>Game Over</strong>
      </Typography>
    );
  }

  return (
    <Typography variant="h6" align="center" gutterBottom>
      <strong>
        {availableItemsCount} State{availableItemsCount !== 1 ? 's' : ''} Left
      </strong>
    </Typography>
  );
};
