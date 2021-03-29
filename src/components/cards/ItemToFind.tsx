import { CardContent, Chip, Typography } from '@material-ui/core';
import { FullSizeCard } from '../mui/FullSizeCard';
import { isGameOverState, lastSelectionResultState, targetItemState } from '../../recoil/game/game';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/macro';
import { colors } from '../../style/colors';
import { getGradient } from '../../style/helpers';
import { CheckCircleOutlineRounded, HighlightOffRounded, Map } from '@material-ui/icons';
import { LastSelectionResult } from '../../recoil/game/types';
import { useTransition, animated, config } from 'react-spring';
import { Emoji } from '../Emoji';

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
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  will-change: transform, opacity;
`;

const StyledChip = styled(animated(Chip))<{ result: LastSelectionResult }>`
  background: ${({ result, theme }) =>
    (result === 'correct' && theme.palette.success.main) ||
    (result === 'incorrect' && theme.palette.error.main) ||
    colors.gray[400]};
  color: ${colors.white};
  margin-top: auto;

  svg {
    color: ${colors.white};
  }
`;

interface SelectionResultProps {
  result: LastSelectionResult;
}

export const SelectionResult = ({ result }: SelectionResultProps) => {
  if (result === 'none') {
    return <StyledChip result={result} icon={<Map />} label="Go ahead and take a guess." />;
  }

  if (result === 'correct') {
    return <StyledChip result={result} icon={<CheckCircleOutlineRounded />} label="That's the one!" />;
  }

  if (result === 'incorrect') {
    return <StyledChip result={result} icon={<HighlightOffRounded />} label="Hmm, that's not it." />;
  }

  return <></>;
};

const GameOverCardContent = () => (
  <StyledCardContent>
    <Typography variant="h2" gutterBottom>
      <Emoji symbol="🎉" label="Celebration" />
    </Typography>
    <Typography variant="subtitle1">Nice Job!</Typography>
  </StyledCardContent>
);

const ContentAnimationContainer = styled(animated.div)`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
`;

const TextAnimationContainer = styled(animated.div)`
  position: absolute;
`;

const GameActiveCardContent = () => {
  const targetItem = useRecoilValue(targetItemState);
  const lastSelectionResult = useRecoilValue(lastSelectionResultState);

  const transitions = useTransition(targetItem, {
    from: {
      opacity: 0,
      transform: 'translate3d(-100%,0,0)',
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0%,0,0)',
    },
    leave: {
      opacity: 0,
      transform: 'translate3d(75%,0,0)',
    },
    config: config.gentle,
  });

  const animatedContent = transitions((props, item) => (
    <TextAnimationContainer style={props}>
      <Typography variant="h4">
        <strong>{item}</strong>
      </Typography>
    </TextAnimationContainer>
  ));

  return (
    <StyledCardContent>
      <Typography variant="subtitle1" gutterBottom>
        Find this state:
      </Typography>
      {animatedContent}
      <SelectionResult result={lastSelectionResult} />
    </StyledCardContent>
  );
};

export const ItemToFind = () => {
  const isGameOver = useRecoilValue(isGameOverState);
  // useTransition docs haven't been updated yet
  // https://github.com/pmndrs/react-spring/issues/1052#issuecomment-805398650
  const transitions = useTransition(isGameOver, {
    from: {
      opacity: 0,
      transform: 'translate3d(0,-100%,0)',
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

  const animatedContent = transitions((props, item) =>
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
    <StyledFullSizeCard>
      <Media />
      {animatedContent}
    </StyledFullSizeCard>
  );
};
