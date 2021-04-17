import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { theme } from '../style/theme';

interface WrapperProps {
  children?: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>{children}</RecoilRoot>
    </ThemeProvider>
  );
};
