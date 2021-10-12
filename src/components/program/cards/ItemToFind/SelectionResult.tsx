import { CheckCircleOutlineRounded, HighlightOffRounded, Map } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import { LastSelectionResult } from '../../../../recoil/game/types';
import { colors } from '../../../../styles/colors';
import { shakeLeftRight } from '../../../../utils/animation/animations';
import { pxToRem } from '../../../../utils/style';

const StyledChip = styled(Chip)<{ result: LastSelectionResult }>`
  background: ${({ result, theme }) =>
    (result === 'correct' && theme.palette.success.main) ||
    (result === 'incorrect' && theme.palette.error.main) ||
    colors.gray[400]};
  color: ${colors.white};

  // Need this due to the "incorrect" animation movement
  margin-top: ${({ result }) => (result === 'incorrect' ? pxToRem(-6) : '')};

  svg {
    color: ${colors.white};
  }
`;

interface SelectionResultProps {
  result: LastSelectionResult;
}

export const SelectionResult = ({ result }: SelectionResultProps) => {
  const { springNumber } = useSpring({
    from: { springNumber: 0 },
    springNumber: result === 'incorrect' ? 1 : 0,
    reset: true, // https://stackoverflow.com/a/63972073/8014660
    config: { duration: 1000 },
  });

  switch (result) {
    case 'none':
      return <StyledChip result={result} icon={<Map />} label="Go ahead and take a guess." />;
    case 'correct':
      return <StyledChip result={result} icon={<CheckCircleOutlineRounded />} label="That's the one!" />;
    case 'incorrect':
      return (
        <animated.div style={shakeLeftRight(springNumber)}>
          <StyledChip result={result} icon={<HighlightOffRounded />} label="Hmm, that's not it." />
        </animated.div>
      );
  }
};
