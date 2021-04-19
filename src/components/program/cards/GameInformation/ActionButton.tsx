import { Button } from '@material-ui/core';
import { ReplayRounded } from '@material-ui/icons';
import { endGameFunc, gameStatusState, startGameFunc } from '../../../../recoil/game/game';
import { GameStatus } from '../../../../recoil/game/types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { event } from '../../../../utils/gtag';

export const ActionButton = () => {
  const gameStatus = useRecoilValue(gameStatusState);
  const endGame = useSetRecoilState(endGameFunc);
  const startGame = useSetRecoilState(startGameFunc);

  const onClickFromUnplayed = () => {
    startGame(undefined);
    event({ action: 'click', category: 'Start new game from unplayed', label: 'Success' });
  };

  const onClickFromActiveGame = () => {
    endGame(undefined);
    event({ action: 'click', category: 'End game from active', label: 'Success' });
  };

  const onClickFromGameOver = () => {
    startGame(undefined);
    event({ action: 'click', category: 'Start new game from game over', label: 'Success' });
  };

  switch (gameStatus) {
    case GameStatus.UNPLAYED:
      return (
        <Button size="small" color="primary" variant="contained" onClick={onClickFromUnplayed}>
          Start Game
        </Button>
      );
    case GameStatus.ACTIVE:
      return (
        <Button size="small" color="primary" variant="contained" onClick={onClickFromActiveGame}>
          End Game
        </Button>
      );
    case GameStatus.GAME_OVER:
      return (
        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<ReplayRounded />}
          onClick={onClickFromGameOver}
        >
          Start New Game
        </Button>
      );
  }
};
