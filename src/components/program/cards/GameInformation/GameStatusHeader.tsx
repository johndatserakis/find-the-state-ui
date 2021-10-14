import { Typography } from '@mui/material';
import { AvailableItemsCount, IsGameOver } from '../../../../types/game';

interface GameStatusHeaderProps {
  availableItemsCount: AvailableItemsCount;
  isGameOver: IsGameOver;
}

export const GameStatusHeader = ({ availableItemsCount, isGameOver }: GameStatusHeaderProps) => {
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
