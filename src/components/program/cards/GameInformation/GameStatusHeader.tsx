import { Typography } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { availableItemsCountState, gameStatusState } from '../../../../recoil/game/game';
import { GameStatus } from '../../../../recoil/game/types';

export const GameStatusHeader = () => {
  const availableItemsCount = useRecoilValue(availableItemsCountState);
  const gameStatus = useRecoilValue(gameStatusState);

  return gameStatus === GameStatus.GAME_OVER ? (
    <Typography variant="h6" align="center" gutterBottom>
      <strong>Game Over</strong>
    </Typography>
  ) : (
    <Typography variant="h6" align="center" gutterBottom>
      <strong>
        {availableItemsCount} State{availableItemsCount !== 1 ? 's' : ''} Left
      </strong>
    </Typography>
  );
};
