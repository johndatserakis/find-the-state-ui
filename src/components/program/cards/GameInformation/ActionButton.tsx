import { Button } from '@material-ui/core';
import { AddRounded, CloseRounded, ReplayRounded } from '@material-ui/icons';
import { endGameFunc, gameStatusState, startGameFunc } from '../../../../recoil/game/game';
import { GameStatus } from '../../../../recoil/game/types';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const ActionButton = () => {
  const gameStatus = useRecoilValue(gameStatusState);
  const endGame = useSetRecoilState(endGameFunc);
  const startGame = useSetRecoilState(startGameFunc);

  switch (gameStatus) {
    case GameStatus.UNPLAYED:
      return (
        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<AddRounded />}
          onClick={() => startGame(undefined)}
        >
          Start Game
        </Button>
      );
    case GameStatus.ACTIVE:
      return (
        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<CloseRounded />}
          onClick={() => endGame(undefined)}
        >
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
          onClick={() => startGame(undefined)}
        >
          Start New Game
        </Button>
      );
  }
};
