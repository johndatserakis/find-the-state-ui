import { Card, FormControl, FormControlLabel, Switch } from '@material-ui/core';
import { Emoji } from '../Emoji';
import styled from 'styled-components/macro';
import { pxToRem } from '../../../utils/style';
import { Divider } from '../../mui/Divider';
import { Legend } from './Legend';

const DisplayCard = styled(Card)`
  bottom: ${pxToRem(16)};
  box-shadow: ${({ theme }) => theme.shadows[3]};
  display: flex;
  flex-direction: column;
  height: auto;
  left: ${pxToRem(16)};
  max-width: ${pxToRem(260)};
  opacity: 0.75;
  padding: ${pxToRem(8)} ${pxToRem(16)} ${pxToRem(8)};
  position: absolute;
  transition: opacity 0.4s ease-in-out;
  width: auto;
  z-index: 1;

  &:hover {
    opacity: 1;
  }

  label {
    margin-bottom: ${pxToRem(4)};
  }
`;

interface DisplayProps {
  lockMap: boolean;
  showGuessChoropleth: boolean;
  showLabels: boolean;
  onLockMapChecked: (lockMap: boolean) => void;
  onShowGuessChoroplethChecked: (showGuessChoropleth: boolean) => void;
  onShowLabelsChecked: (showLabels: boolean) => void;
}

export const Display = ({
  lockMap,
  showGuessChoropleth,
  showLabels,
  onLockMapChecked,
  onShowGuessChoroplethChecked,
  onShowLabelsChecked,
}: DisplayProps) => {
  const lockMapIcon = lockMap ? '🔒' : '🔓';
  const showGuessChoroplethIcon = '❓';
  const showLabelsIcon = showLabels ? '🐵' : '🙈';

  return (
    <DisplayCard>
      <FormControl>
        <div>
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
              <Switch
                size="small"
                checked={lockMap}
                onChange={(e) => onLockMapChecked(e.target.checked)}
                name="lockMap"
              />
            }
            label={
              <>
                <Emoji symbol={lockMapIcon} label="Lock" /> Lock Map
              </>
            }
          />
        </div>
      </FormControl>
      <Divider tight={true} />
      <FormControl>
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={showGuessChoropleth}
              onChange={(e) => onShowGuessChoroplethChecked(e.target.checked)}
              name="showGuessChoropleth"
            />
          }
          label={
            <>
              <Emoji symbol={showGuessChoroplethIcon} label="Lock" /> Show Wrong Answers
            </>
          }
        />
      </FormControl>
      {showGuessChoropleth && <Legend />}
    </DisplayCard>
  );
};
