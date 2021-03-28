import { CardContent, Chip, Typography } from '@material-ui/core';
import { FullSizeCard } from '../mui/FullSizeCard';
import { targetItemState, lastSelectionResultState } from '../../recoil/game/game';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/macro';
import { colors } from '../../style/colors';
import { getGradient } from '../../style/helpers';
import { CheckCircleOutlineRounded, HighlightOffRounded } from '@material-ui/icons';
import { LastSelectionResult } from '../../recoil/game/types';

const StyledFullSizeCard = styled(FullSizeCard)`
  position: relative;
`;

const Media = styled.div`
  width: 100%;
  height: 100%;
  background: ${getGradient(colors.blue[400], colors.purple[200])};
  color: ${colors.white};
`;

const StyledCardContent = styled(CardContent)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: ${colors.white};
`;

const StyledChip = styled(Chip)<{ type: 'success' | 'error' }>`
  margin-top: auto;
  background: ${({ type, theme }) => (type === 'success' ? theme.palette.success.main : theme.palette.error.main)};
  color: ${colors.white};

  svg {
    color: ${colors.white};
  }
`;

interface SelectionResultProps {
  result: LastSelectionResult;
}

export const SelectionResult = ({ result }: SelectionResultProps) => {
  if (!result) {
    return null;
  }

  if (result === 'correct') {
    return <StyledChip type="success" icon={<CheckCircleOutlineRounded />} label="That's the one!" />;
  }

  if (result === 'incorrect') {
    return <StyledChip type="error" icon={<HighlightOffRounded />} label="Hmm, that's not it." />;
  }

  return null;
};

export const ItemToFind = () => {
  const targetItem = useRecoilValue(targetItemState);
  const lastSelectionResult = useRecoilValue(lastSelectionResultState);

  return (
    <StyledFullSizeCard>
      <Media />
      <StyledCardContent>
        <Typography variant="subtitle1" gutterBottom>
          Find this state:
        </Typography>
        <Typography variant="h4">
          <strong>{targetItem}</strong>
        </Typography>
        <SelectionResult result={lastSelectionResult} />
      </StyledCardContent>
    </StyledFullSizeCard>
  );
};
