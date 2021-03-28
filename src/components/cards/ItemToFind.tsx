import { CardContent, Chip, Typography } from '@material-ui/core';
import { FullSizeCard } from '../mui/FullSizeCard';
import { targetItemState } from '../../recoil/game/game';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/macro';
import { colors } from '../../style/colors';
import { getGradient } from '../../style/helpers';
import { CheckCircleOutlineRounded, HighlightOffRounded } from '@material-ui/icons';

const StyledFullSizeCard = styled(FullSizeCard)`
  position: relative;
`;

const Media = styled.div`
  width: 100%;
  height: 100%;
  // background: ${({ theme }) => getGradient(theme.palette.primary.main, theme.palette.primary.light)};
  background: ${getGradient(colors.blue[400], colors.blue[300])};
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

const StyledChip = styled(Chip)`
  margin-top: auto;
  background: ${({ theme }) => theme.palette.success.main};
  color: ${colors.white};

  svg {
    color: ${colors.white};
  }
`;

export const ItemToFind = () => {
  const targetItem = useRecoilValue(targetItemState);

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
        <StyledChip icon={<CheckCircleOutlineRounded />} label="That's the one!" />
        <StyledChip icon={<HighlightOffRounded />} label="Hmm, that's not it." />
      </StyledCardContent>
    </StyledFullSizeCard>
  );
};
