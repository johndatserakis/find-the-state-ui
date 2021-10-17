import { Typography } from '@mui/material';
import { uniqueId as _uniqueId } from 'lodash';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { pxToRem } from '../../../utils/style';
import { CHOROPLETH_WRONG_ANSWERS_COLORS } from '../../constants/map';

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
`;

const LegendColorContainer = styled.div`
  border-radius: ${pxToRem(4)};
  display: flex;
  margin-bottom: ${pxToRem(4)};
  overflow: hidden;
`;

const LegendTextContainer = styled.div`
  color: ${theme.palette.text.secondary};
  display: flex;
  justify-content: space-between;
  margin-bottom: ${pxToRem(2)};
  padding: 0 ${pxToRem(6)};
  text-align: center;

  > p {
    font-size: ${pxToRem(12)};
    width: ${pxToRem(20)};
  }
`;

const LegendColorBlock = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  flex: 1;
  height: ${pxToRem(20)};
  width: ${pxToRem(20)};
`;

export const Legend = () => {
  return (
    <LegendContainer>
      <Typography variant="overline">
        <strong>Wrong Answer Count</strong>
      </Typography>
      <LegendColorContainer>
        {CHOROPLETH_WRONG_ANSWERS_COLORS.map((c) => {
          return <LegendColorBlock key={_uniqueId()} color={c} />;
        })}
      </LegendColorContainer>
      <LegendTextContainer>
        <Typography variant="body2">0</Typography>
        <Typography variant="body2">5</Typography>
        <Typography variant="body2">10</Typography>
        <Typography variant="body2">15</Typography>
        <Typography variant="body2">20+</Typography>
      </LegendTextContainer>
      <Typography variant="caption" color="textSecondary">
        Use the <strong>Wrong Answer Choropleth</strong> to see which states gave you the most trouble.
      </Typography>
    </LegendContainer>
  );
};
