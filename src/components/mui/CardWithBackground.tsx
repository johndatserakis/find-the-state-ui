import { ReactNode } from 'react';
import { CardContent } from '@mui/material';
import styled from 'styled-components';
import { DEFAULT_PROGRAM_BREAKPOINT } from '../../constants/style';
import { colors } from '../../styles/colors';
import { FullSizeCard } from './FullSizeCard';

export const StyledFullSizeCard = styled(FullSizeCard)`
  // TODO: Look into needing to set a height for mobile because of the absolutley positioned content below
  height: 300px;
  overflow: auto;
  position: relative;

  @media (min-width: ${DEFAULT_PROGRAM_BREAKPOINT}px) {
    height: 100%;
  }
`;

const Background = styled.div<{ background: string }>`
  background: ${({ background }) => background};
  color: ${colors.white};
  height: 100%;
  width: 100%;
`;

export const CardWithBackgroundContent = styled(CardContent)`
  align-items: center;
  bottom: 0;
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  left: 0;
  overflow: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  will-change: transform, opacity;
`;

interface CardWithGradientBackgroundProps {
  background: string;
  children?: ReactNode;
}

export const CardWithBackground = ({ children, background }: CardWithGradientBackgroundProps) => {
  return (
    <StyledFullSizeCard>
      <Background background={background} />
      <CardWithBackgroundContent>{children}</CardWithBackgroundContent>
    </StyledFullSizeCard>
  );
};
