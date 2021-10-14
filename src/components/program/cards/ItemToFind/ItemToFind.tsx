import { Box, Typography } from '@mui/material';
import { bluePurpleGradient } from '../../../../styles/program/colors';
import { GameStatus, IsGameOver, LastSelectionResult, TargetItem } from '../../../../types/game';
import { Emoji } from '../../../common/Emoji';
import { CardWithBackground, CardWithBackgroundContent } from '../../../mui/CardWithBackground';
import { SelectionResult } from './SelectionResult';

interface ItemToFindProps {
  gameStatus: GameStatus;
  isGameOver: IsGameOver;
  lastSelectionResult: LastSelectionResult;
  targetItem: TargetItem;
}

export const ItemToFind = ({ isGameOver, gameStatus, lastSelectionResult, targetItem }: ItemToFindProps) => {
  if (gameStatus === GameStatus.UNPLAYED) {
    return null;
  }

  const icon = isGameOver ? '🎉' : '🗺';

  return (
    <CardWithBackground background={bluePurpleGradient}>
      {isGameOver ? (
        <CardWithBackgroundContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h1" gutterBottom={isGameOver}>
              <Emoji symbol={icon} label="Celebration" />
            </Typography>
            {isGameOver && <Typography variant="subtitle1">Nice Job!</Typography>}
          </Box>
        </CardWithBackgroundContent>
      ) : (
        <CardWithBackgroundContent>
          <Typography variant="subtitle1">Find this state:</Typography>
          <Typography variant="h4">
            <strong>{targetItem}</strong>
          </Typography>
          <SelectionResult result={lastSelectionResult} />
        </CardWithBackgroundContent>
      )}
    </CardWithBackground>
  );
};
