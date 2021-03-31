import { Box, Button, CardActions, Chip, Typography } from '@material-ui/core';
import { LinearProgressWithLabel } from '../../mui/LinearProgressWithLabel';
import { availableItemsCountState, isGameOverState, resetGameFunc, streakState } from '../../../recoil/game/game';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ReplayRounded } from '@material-ui/icons';
import { useTransition, config } from 'react-spring';
import { AnimationContainerNormalizer, TextAnimationContainer } from '../../../utils/animation/components';
import { CardWithBackground } from '../../mui/CardWithBackground';
import { bluePurpleGradient } from '../../../style/program/colors';

const TOTAL_ITEM_COUNT = 48;

export const GameInformation = () => {
  const availableItemsCount = useRecoilValue(availableItemsCountState);
  const isGameOver = useRecoilValue(isGameOverState);
  const streak = useRecoilValue(streakState);
  const hasActiveStreak = streak > 0;
  const resetGame = useSetRecoilState(resetGameFunc);
  const currentPercentage = ((TOTAL_ITEM_COUNT - availableItemsCount) / TOTAL_ITEM_COUNT) * 100;

  const transitions = useTransition(hasActiveStreak, {
    from: {
      opacity: 0,
      transform: 'translate3d(0,75%,0)',
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0,0%,0)',
    },
    leave: {
      opacity: 0,
      transform: 'translate3d(0,75%,0)',
    },
    config: config.gentle,
  });

  const animatedContent = transitions((props, item) => {
    return (
      item && (
        <TextAnimationContainer style={props}>
          <Chip label={`Streak: ${streak}`} color="primary" size="small" />
        </TextAnimationContainer>
      )
    );
  });

  return (
    <CardWithBackground background={bluePurpleGradient}>
      <Box mt={2} mb={3} width="100%">
        <AnimationContainerNormalizer>{animatedContent}</AnimationContainerNormalizer>
      </Box>
      {isGameOver ? (
        <Typography variant="h4" align="center" gutterBottom>
          <strong>Game Over</strong>
        </Typography>
      ) : (
        <Typography variant="h4" align="center" gutterBottom>
          <strong>
            {availableItemsCount} State{availableItemsCount !== 1 ? 's' : ''} Left
          </strong>
        </Typography>
      )}
      <Box mb={1} width="100%">
        <LinearProgressWithLabel variant="determinate" value={currentPercentage} />
      </Box>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<ReplayRounded />}
          onClick={() => resetGame(undefined)}
          fullWidth
        >
          {isGameOver ? 'New Game' : 'Reset Game'}
        </Button>
      </CardActions>
    </CardWithBackground>
  );
};
