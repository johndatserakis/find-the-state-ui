import { Chip } from '@mui/material';
import { useTransition } from 'react-spring';
import { useRecoilValue } from 'recoil';
import { streakHighState, streakState } from '../../../../recoil/game';
import { slideUpInSlideDownOut } from '../../../../utils/animation/animations';
import { AnimationContainerNormalizer, TextAnimationContainer } from '../../../../utils/animation/components';

export const Streak = () => {
  const streak = useRecoilValue(streakState);
  const streakHigh = useRecoilValue(streakHighState);
  const hasActiveStreak = streak > 0;
  const transitions = useTransition(hasActiveStreak, slideUpInSlideDownOut);

  const animatedStreakContent = transitions((props, item) => {
    return (
      item && (
        <AnimationContainerNormalizer>
          <TextAnimationContainer style={props}>
            <Chip label={`Streak: ${streak} / High Streak: ${streakHigh}`} color="primary" size="small" />
          </TextAnimationContainer>
        </AnimationContainerNormalizer>
      )
    );
  });

  return animatedStreakContent;
};
