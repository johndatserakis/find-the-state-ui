import { ActionButton } from './ActionButton';
import { availableItemsCountState, gameStatusState } from '../../../../recoil/game/game';
import { bluePurpleGradient } from '../../../../style/program/colors';
import { Box, CardActions } from '@material-ui/core';
import { CardWithBackground } from '../../../mui/CardWithBackground';
import { confettiConfig } from '../../../../configs/confetti';
import { GameStatus } from '../../../../recoil/game/types';
import { GameStatusHeader } from './GameStatusHeader';
import { LinearProgressWithLabel } from '../../../mui/LinearProgressWithLabel';
import { Stopwatch } from './Stopwatch';
import { Streak } from './Streak';
import { TOTAL_ITEM_COUNT } from '../../../../constants/game';
import { useRecoilValue } from 'recoil';
import Confetti from 'react-dom-confetti';

export const GameInformation = () => {
  const availableItemsCount = useRecoilValue(availableItemsCountState);
  const gameStatus = useRecoilValue(gameStatusState);
  const currentPercentage = ((TOTAL_ITEM_COUNT - availableItemsCount) / TOTAL_ITEM_COUNT) * 100;

  if (gameStatus === GameStatus.UNPLAYED) {
    return (
      <CardWithBackground background={bluePurpleGradient}>
        <ActionButton />
      </CardWithBackground>
    );
  }

  return (
    <CardWithBackground background={bluePurpleGradient}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Confetti active={gameStatus === GameStatus.GAME_OVER} config={confettiConfig} />
      </Box>
      <Box mt={2} mb={3} width="100%">
        <Streak />
      </Box>
      <GameStatusHeader />
      <Box mb={1} width="100%" display="flex" alignItems="center">
        <Box width="100%">
          <Stopwatch />
        </Box>
        <LinearProgressWithLabel variant="determinate" value={currentPercentage} />
      </Box>
      <CardActions>
        <ActionButton />
      </CardActions>
    </CardWithBackground>
  );
};
