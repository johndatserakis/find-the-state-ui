import { Box, Button, CardActions, Chip, Typography } from '@material-ui/core';
import { LinearProgressWithLabel } from '../../mui/LinearProgressWithLabel';
import { availableItemsCountState, isGameOverState, resetGameFunc, streakState } from '../../../recoil/game/game';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ReplayRounded } from '@material-ui/icons';
import { useTransition } from 'react-spring';
import { AnimationContainerNormalizer, TextAnimationContainer } from '../../../utils/animation/components';
import { CardWithBackground } from '../../mui/CardWithBackground';
import { bluePurpleGradient } from '../../../style/program/colors';
import { slideUpInSlideDownOut } from '../../../utils/animation/animations';
import Confetti from 'react-dom-confetti';

const TOTAL_ITEM_COUNT = 48;

export const GameInformation = () => {
  const availableItemsCount = useRecoilValue(availableItemsCountState);
  const isGameOver = useRecoilValue(isGameOverState);
  const streak = useRecoilValue(streakState);
  const hasActiveStreak = streak > 0;
  const resetGame = useSetRecoilState(resetGameFunc);
  const currentPercentage = ((TOTAL_ITEM_COUNT - availableItemsCount) / TOTAL_ITEM_COUNT) * 100;
  const transitions = useTransition(hasActiveStreak, slideUpInSlideDownOut);

  const animatedStreakContent = transitions((props, item) => {
    return (
      item && (
        <AnimationContainerNormalizer>
          <TextAnimationContainer style={props}>
            <Chip label={`Streak: ${streak}`} color="primary" size="small" />
          </TextAnimationContainer>
        </AnimationContainerNormalizer>
      )
    );
  });

  const MainContent = () => {
    return isGameOver ? (
      <Typography variant="h5" align="center" gutterBottom>
        <strong>Game Over</strong>
      </Typography>
    ) : (
      <Typography variant="h5" align="center" gutterBottom>
        <strong>
          {availableItemsCount} State{availableItemsCount !== 1 ? 's' : ''} Left
        </strong>
      </Typography>
    );
  };

  // https://daniel-lundin.github.io/react-dom-confetti/
  const confettiConfig = {
    angle: 214,
    spread: 360,
    startVelocity: 27,
    elementCount: 130,
    dragFriction: 0.12,
    duration: 5710,
    stagger: 3,
    width: '15px',
    height: '16px',
  };

  return (
    <CardWithBackground background={bluePurpleGradient}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Confetti active={isGameOver} config={confettiConfig} />
      </Box>
      <Box mt={2} mb={3} width="100%">
        {animatedStreakContent}
      </Box>
      <MainContent />
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
