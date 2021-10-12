import { Box, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { gameStatusState } from '../../../../recoil/game/game';
import { GameStatus } from '../../../../recoil/game/types';
import { Emoji } from '../../../common/Emoji';
import { CardWithBackgroundContent } from '../../../mui/CardWithBackground';

export const GameOverCardContent = () => {
  const gameStatus = useRecoilValue(gameStatusState);
  const isGameOver = gameStatus === GameStatus.GAME_OVER;
  const icon = isGameOver ? '🎉' : '🗺';

  return (
    <CardWithBackgroundContent>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h1" gutterBottom={isGameOver}>
          <Emoji symbol={icon} label="Celebration" />
        </Typography>
        {isGameOver && <Typography variant="subtitle1">Nice Job!</Typography>}
      </Box>
    </CardWithBackgroundContent>
  );
};
