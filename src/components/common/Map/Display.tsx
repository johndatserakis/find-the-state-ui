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
  padding: ${pxToRem(4)} ${pxToRem(16)} ${pxToRem(3)};
  box-shadow: ${({ theme }) => theme.shadows[3]};
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: ${pxToRem(4)};
  }
`;

interface DisplayProps {
  lockMap: boolean;
  showLabels: boolean;
  onLockMapChecked: (lockMap: boolean) => void;
  onShowLabelsChecked: (showLabels: boolean) => void;
}

export const Display = ({ lockMap, showLabels, onLockMapChecked, onShowLabelsChecked }: DisplayProps) => {
  const showLabelsIcon = showLabels ? '🐵' : '🙈';
  const lockMapIcon = lockMap ? '🔒' : '🔓';

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
            <Emoji symbol={showLabelsIcon} label="Search" /> Cheat
          </>
        }
      />
      <FormControlLabel
        control={
          <Switch size="small" checked={lockMap} onChange={(e) => onLockMapChecked(e.target.checked)} name="lockMap" />
        }
        label={
          <>
            <Emoji symbol={lockMapIcon} label="Lock" /> Lock Map
          </>
        }
      />
    </DisplayCard>
  );
};
