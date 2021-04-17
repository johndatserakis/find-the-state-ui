import { AnimationContainerNormalizer, TextAnimationContainer } from '../../../../utils/animation/components';
import { CardWithBackgroundContent } from '../../../mui/CardWithBackground';
import { lastSelectionResultState, targetItemState } from '../../../../recoil/game/game';
import { SelectionResult } from './SelectionResult';
import { slideRightInSlideRightOut } from '../../../../utils/animation/animations';
import { Typography } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { useTransition } from 'react-spring';

export const GameActiveCardContent = () => {
  const targetItem = useRecoilValue(targetItemState);
  const lastSelectionResult = useRecoilValue(lastSelectionResultState);
  const transitions = useTransition(targetItem, slideRightInSlideRightOut);

  const animatedTargetStateContent = transitions((props, item) => (
    <TextAnimationContainer style={props}>
      <Typography variant="h4">
        <strong>{item}</strong>
      </Typography>
    </TextAnimationContainer>
  ));

  return (
    <CardWithBackgroundContent>
      <Typography variant="subtitle1">Find this state:</Typography>
      <AnimationContainerNormalizer>{animatedTargetStateContent}</AnimationContainerNormalizer>
      <SelectionResult result={lastSelectionResult} />
    </CardWithBackgroundContent>
  );
};
