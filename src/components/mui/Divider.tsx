import { Divider as MuiDivider } from '@mui/material';
import styled from 'styled-components';
import { pxToRem } from '../../utils/style';

interface DividerProps {
  tight: boolean;
}

// styled-components transient props https://medium.com/@probablyup/introducing-transient-props-f35fd5203e0c
const StyledDivider = styled(MuiDivider)<{ $tight: boolean }>`
  margin-top: ${({ $tight }) => ($tight ? pxToRem(6) : pxToRem(16))};
  margin-bottom: ${({ $tight }) => ($tight ? pxToRem(6) : pxToRem(16))};
`;

export const Divider = ({ tight }: DividerProps) => {
  return <StyledDivider $tight={tight} />;
};
