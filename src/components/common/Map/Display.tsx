import { Card, FormControlLabel, Switch } from '@material-ui/core';
import { Emoji } from '../Emoji';
import styled from 'styled-components/macro';

const DisplayCard = styled(Card)`
  z-index: 1;
  position: absolute;
  top: 1rem;
  left: 1rem;
  height: auto;
  width: auto;
  padding: 0.25rem 1rem;
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
