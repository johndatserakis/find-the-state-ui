import { Typography } from '@mui/material';
import { AvailableItemsCount, IsGameOver } from '../../../types/game';

interface GameStatusHeaderProps {
  availableItemsCount: AvailableItemsCount;
  isGameOver: IsGameOver;
}

export const GameStatusHeader = ({ availableItemsCount, isGameOver }: GameStatusHeaderProps) => {
  if (isGameOver) {
    return (
      <Typography align="center" variant="h6">
        <strong>Game Over</strong>
      </Typography>
    );
  }

  return (
    <Typography align="center" variant="h6">
      <strong>
        {availableItemsCount} State{availableItemsCount !== 1 ? 's' : ''} Left
      </strong>
    </Typography>
  );
};
