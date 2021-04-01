import { ReactNode } from 'react';
import { CardContent } from '@material-ui/core';
import { FullSizeCard } from './FullSizeCard';
import styled from 'styled-components/macro';
import { colors } from '../../style/colors';
import { DEFAULT_PROGRAM_BREAKPOINT } from '../../constants/style';

const StyledFullSizeCard = styled(FullSizeCard)`
  position: relative;
  // TODO: Look into needing to set a height for mobile because of the absolutley positioned content below
  height: 300px;

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
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  will-change: transform, opacity;
  overflow: auto;
`;

interface CardWithGradientBackgroundProps {
  children?: ReactNode;
  background: string;
}

export const CardWithBackground = ({ children, background }: CardWithGradientBackgroundProps) => {
  return (
    <StyledFullSizeCard>
      <Background background={background} />
      <CardWithBackgroundContent>{children}</CardWithBackgroundContent>
    </StyledFullSizeCard>
  );
};
