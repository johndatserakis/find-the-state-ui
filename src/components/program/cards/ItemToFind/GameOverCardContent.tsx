import { Box, Typography } from '@material-ui/core';
import { CardWithBackgroundContent } from '../../../mui/CardWithBackground';
import { Emoji } from '../../../common/Emoji';
import { GameStatus } from '../../../../recoil/game/types';
import { useRecoilValue } from 'recoil';
import { gameStatusState } from '../../../../recoil/game/game';

export const GameOverCardContent = () => {
  const gameStatus = useRecoilValue(gameStatusState);
  const isGameOver = gameStatus === GameStatus.GAME_OVER;

  return (
    <CardWithBackgroundContent>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h1" gutterBottom={isGameOver}>
          <Emoji symbol="🎉" label="Celebration" />
        </Typography>
        {isGameOver && <Typography variant="subtitle1">Nice Job!</Typography>}
      </Box>
    </CardWithBackgroundContent>
  );
};
