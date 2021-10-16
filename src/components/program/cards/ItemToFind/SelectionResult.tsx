import { CheckCircleOutlineRounded, HighlightOffRounded, Map } from '@mui/icons-material';
import { Chip } from '@mui/material';
import styled from 'styled-components';
import { colors } from '../../../../styles/colors';
import { theme } from '../../../../styles/theme';
import { LastSelectionResult } from '../../../../types/game';
import { pxToRem } from '../../../../utils/style';

const StyledChip = styled(Chip)<{ result: LastSelectionResult }>`
  background: ${({ result }) =>
    (result === 'correct' && theme.palette.success.main) ||
    (result === 'incorrect' && theme.palette.error.main) ||
    theme.palette.success.main};
  color: ${colors.white};

  // Need this due to the "incorrect" animation movement
  margin-top: ${({ result }) => (result === 'incorrect' ? pxToRem(-6) : '')};

  svg {
    color: ${colors.white} !important;
  }
`;

interface SelectionResultProps {
  result: LastSelectionResult;
}

export const SelectionResult = ({ result }: SelectionResultProps) => {
  switch (result) {
    case 'none':
      return <StyledChip result={result} icon={<Map />} label="Go ahead and take a guess." />;
    case 'correct':
      return <StyledChip result={result} icon={<CheckCircleOutlineRounded />} label="That's the one!" />;
    case 'incorrect':
      return <StyledChip result={result} icon={<HighlightOffRounded />} label="Hmm, that's not it." />;
  }
};
