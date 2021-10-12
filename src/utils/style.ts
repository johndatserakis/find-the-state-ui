import { theme } from '../styles/theme';

export const {
  typography: { pxToRem },
} = theme;

export const getGradient = (color1: string, color2: string): string => {
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
};
