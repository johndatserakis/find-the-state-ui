import { Box, Chip, Typography } from '@material-ui/core';
import { CheckCircleOutlineRounded, HighlightOffRounded, Map } from '@material-ui/icons';
import { colors } from '../../../style/colors';
import {
  AnimationContainerNormalizer,
  ContentAnimationContainer,
  TextAnimationContainer,
} from '../../../utils/animation/components';
import { Emoji } from '../../common/Emoji';
import { isGameOverState, lastSelectionResultState, targetItemState } from '../../../recoil/game/game';
import { LastSelectionResult } from '../../../recoil/game/types';
import { useRecoilValue } from 'recoil';
import { useTransition } from 'react-spring';
import styled from 'styled-components/macro';
import { CardWithBackground, CardWithBackgroundContent } from '../../mui/CardWithBackground';
import { bluePurpleGradient } from '../../../style/program/colors';
import { slideUpInSlideUpOut, slideRightInSlideRightOut } from '../../../utils/animation/animations';
import Confetti from 'react-dom-confetti';

const StyledChip = styled(Chip)<{ result: LastSelectionResult }>`
  background: ${({ result, theme }) =>
    (result === 'correct' && theme.palette.success.main) ||
    (result === 'incorrect' && theme.palette.error.main) ||
    colors.gray[400]};
  color: ${colors.white};

  svg {
    color: ${colors.white};
  }
`;

interface ChipSelectionResultProps {
  result: LastSelectionResult;
}

export const ChipSelectionResult = ({ result }: ChipSelectionResultProps) => {
  switch (result) {
    case 'none':
      return <StyledChip result={result} icon={<Map />} label="Go ahead and take a guess." />;
    case 'correct':
      return <StyledChip result={result} icon={<CheckCircleOutlineRounded />} label="That's the one!" />;
    case 'incorrect':
      return <StyledChip result={result} icon={<HighlightOffRounded />} label="Hmm, that's not it." />;
  }
};

const GameOverCardContent = () => (
  <CardWithBackgroundContent>
    <Typography variant="h2">
      <Emoji symbol="🎉" label="Celebration" />
    </Typography>
    <Typography variant="subtitle1">Nice Job!</Typography>
  </CardWithBackgroundContent>
);

const GameActiveCardContent = () => {
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
      <ChipSelectionResult result={lastSelectionResult} />
    </CardWithBackgroundContent>
  );
};

export const ItemToFind = () => {
  const isGameOver = useRecoilValue(isGameOverState);
  const transitions = useTransition(isGameOver, slideUpInSlideUpOut);

  const animatedCardContent = transitions((props, item) =>
    item ? (
      <ContentAnimationContainer style={props}>
        <GameOverCardContent />
      </ContentAnimationContainer>
    ) : (
      <ContentAnimationContainer style={props}>
        <GameActiveCardContent />
      </ContentAnimationContainer>
    ),
  );

  return (
    <>
      <CardWithBackground background={bluePurpleGradient}>{animatedCardContent}</CardWithBackground>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Confetti active={isGameOver} />
      </Box>
    </>
  );
};
