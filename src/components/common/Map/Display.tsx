import { Card, FormControlLabel, Switch } from '@material-ui/core';
import { Emoji } from '../Emoji';
import styled from 'styled-components/macro';
import { pxToRem } from '../../../utils/style';

const DisplayCard = styled(Card)`
  z-index: 1;
  position: absolute;
  top: ${pxToRem(16)};
  left: ${pxToRem(16)};
  height: auto;
  width: auto;
  padding: ${pxToRem(4)} ${pxToRem(16)};
  box-shadow: ${({ theme }) => theme.shadows[3]};
`;

interface DisplayProps {
  showLabels: boolean;
  onShowLabelsChecked: (showLabels: boolean) => void;
}

export const Display = ({ showLabels, onShowLabelsChecked }: DisplayProps) => {
  const icon = showLabels ? '🐵' : '🙈';

  return (
    <DisplayCard>
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={showLabels}
            onChange={(e) => onShowLabelsChecked(e.target.checked)}
            name="showLabels"
          />
        }
        label={
          <>
            <Emoji symbol={icon} label="Search" /> Cheat
          </>
        }
      />
    </DisplayCard>
  );
};
