import { ReactNode } from 'react';
import { CardContent } from '@material-ui/core';
import { FullSizeCard } from './FullSizeCard';
import styled from 'styled-components/macro';
import { colors } from '../../style/colors';

const StyledFullSizeCard = styled(FullSizeCard)`
  position: relative;
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
  justify-content: space-between;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  will-change: transform, opacity;
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
