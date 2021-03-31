import { Box, Button, CardActions, CardContent, Chip, Typography } from '@material-ui/core';
import { LinearProgressWithLabel } from '../../mui/LinearProgressWithLabel';
import { FullSizeCard } from '../../mui/FullSizeCard';
import { availableItemsCountState, isGameOverState, resetGameFunc, streakState } from '../../../recoil/game/game';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ReplayRounded } from '@material-ui/icons';
import styled from 'styled-components/macro';
import { useTransition, config } from 'react-spring';
import { AnimationContainerNormalizer, TextAnimationContainer } from '../../../utils/animation';
import { getGradient } from '../../../style/helpers';
import { colors } from '../../../style/colors';

const TOTAL_ITEM_COUNT = 48;

const StyledFullSizeCard = styled(FullSizeCard)`
  position: relative;
`;

const Media = styled.div`
  background: ${getGradient(colors.blue[400], colors.purple[200])};
  color: ${colors.white};
  height: 100%;
  width: 100%;
`;

const StyledCardContent = styled(CardContent)`
  align-items: center;
  bottom: 0;
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  will-change: transform, opacity;
`;

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
    <StyledFullSizeCard>
      <Media />
      <StyledCardContent>
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
      </StyledCardContent>
    </StyledFullSizeCard>
  );
};
