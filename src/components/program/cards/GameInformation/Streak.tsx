import { Chip } from '@material-ui/core';
import { useTransition } from 'react-spring';
import { AnimationContainerNormalizer, TextAnimationContainer } from '../../../../utils/animation/components';
import { slideUpInSlideDownOut } from '../../../../utils/animation/animations';
import { useRecoilValue } from 'recoil';
import { streakHighState, streakState } from '../../../../recoil/game/game';

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
