import { ReplayRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { event } from '../../../../utils/gtag';
import { GameStatus } from '../../../types/game';

interface ActionButtonProps {
  endGameManual: () => void;
  gameStatus: GameStatus;
  startGame: () => void;
}

export const ActionButton = ({ endGameManual, gameStatus, startGame }: ActionButtonProps) => {
  const onClickFromUnplayed = () => {
    startGame();
    event({
      action: 'click',
      category: 'Start new game from unplayed',
      label: 'Success',
    });
  };

  const onClickFromActiveGame = () => {
    endGameManual();
    event({
      action: 'click',
      category: 'End game from active',
      label: 'Success',
    });
  };

  const onClickFromGameOver = () => {
    startGame();
    event({
      action: 'click',
      category: 'Start new game from game over',
      label: 'Success',
    });
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
          color="primary"
          onClick={onClickFromGameOver}
          size="small"
          startIcon={<ReplayRounded />}
          variant="contained"
        >
          Start New Game
        </Button>
      );
    case GameStatus.GAME_OVER_MANUAL_END_GAME:
      return (
        <Button
          color="primary"
          onClick={onClickFromGameOver}
          size="small"
          startIcon={<ReplayRounded />}
          variant="contained"
        >
          Start New Game
        </Button>
      );
  }
};
