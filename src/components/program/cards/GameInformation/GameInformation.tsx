import { Box, CardActions } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { TOTAL_ITEM_COUNT } from '../../../../constants/game';
import { availableItemsCountState, gameStatusState } from '../../../../recoil/game';
import { GameStatus } from '../../../../recoil/types';
import { bluePurpleGradient } from '../../../../styles/program/colors';
import { CardWithBackground } from '../../../mui/CardWithBackground';
import { LinearProgressWithLabel } from '../../../mui/LinearProgressWithLabel';
import { ActionButton } from './ActionButton';
import { GameStatusHeader } from './GameStatusHeader';
import { GameUnplayedCardContent } from './GameUnplayedCardContent';
import { Stopwatch } from './Stopwatch';
import { Streak } from './Streak';

export const GameInformation = () => {
  const availableItemsCount = useRecoilValue(availableItemsCountState);
  const gameStatus = useRecoilValue(gameStatusState);
  const currentPercentage = ((TOTAL_ITEM_COUNT - availableItemsCount) / TOTAL_ITEM_COUNT) * 100;

  if (gameStatus === GameStatus.UNPLAYED) {
    return <GameUnplayedCardContent />;
  }

  return (
    <CardWithBackground background={bluePurpleGradient}>
      <Box display="flex" alignItems="center" justifyContent="center"></Box>
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
